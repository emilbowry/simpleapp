import { useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useDynamicLink } from "../../hooks/DynamicLink";
import { AppDispatch, RootState } from "../../store";
import { dark_midnight_green } from "../../utils/defaultColours";
import { getFields } from "./Appointments";
import {
	DEFAULT_EVENT_CONFIG,
	useCalanderEvent,
	useCalendarLink,
} from "./CalanderHooks";
import {
	FormContext,
	useInitializeFormMetadata,
	useMetadata,
} from "./OutReachForm";
import { initialState, submitFormAndGeneratePdf } from "./OutReachForm.slice";
import { SubmitContainerStyle } from "./OutReachForm.styles";
import { IOutreachFormFields } from "./OutReachForm.types";

const _AddToCalender: React.FC<{ date_key: keyof IOutreachFormFields }> = ({
	date_key,
}) => {
	const date = useSelector(
		(state: RootState) => state.outreachForm.fields[date_key]
	);
	const icsContent = useCalanderEvent({
		date_string: date,
		config: DEFAULT_EVENT_CONFIG,
	});
	const { blobUrl } = useCalendarLink(icsContent);
	const link_props = useDynamicLink({
		useDefaultDecoration: true,
		style_args: ["3px"],
		StyleOverrides: {
			color: dark_midnight_green,
		},
	});
	return (
		<>
			{date && (
				<button>
					<a
						href={blobUrl}
						target="_blank"
						{...link_props}
					>
						Add booked slot to calender
					</a>
				</button>
			)}
		</>
	);
};
const AddToCalender: React.FC<{ date_key?: string }> = ({ date_key }) => {
	return (
		<>
			{date_key && (
				<_AddToCalender
					date_key={date_key as keyof IOutreachFormFields}
				/>
			)}
		</>
	);
};
const TEST_CHECKOUT_URL = "https://buy.stripe.com/test_dRm14m7i5b2b0XgdOz0VO00";

const CheckoutButton: React.FC = () => {
	const { submitted } = useContext(FormContext);
	const link_props = useDynamicLink({
		useDefaultDecoration: true,
		style_args: ["3px"],
		StyleOverrides: {
			color: dark_midnight_green,
		},
	});
	const props = !submitted
		? { onClick: (e: React.MouseEvent) => e.preventDefault() }
		: { href: TEST_CHECKOUT_URL, ...link_props };

	return (
		<button disabled={!submitted}>
			<a {...props}>Buy Now</a>
		</button>
	);
};

const useRequiredFields = (
	form_type?: string,
	remove_bools: boolean = false,
	remove_text_areas: boolean = false
) => {
	const currentInputs = [...getFields(), ...getFields(form_type)];

	const requiredFieldNames = currentInputs
		.filter(
			(config) =>
				config.required &&
				remove_text_areas &&
				config.type !== "checkbox" &&
				remove_bools &&
				config.type
		)
		.map((config) => config.name);
	return requiredFieldNames;
};
const validateEmail = (email: string) => {
	return String(email)
		.toLowerCase()
		.match(
			/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
		);
};

const validateNumber = (maybeNum: string) => !isNaN(+maybeNum);

const useDirtyFields = () => {
	const currentFields = useSelector(
		(state: RootState) => state.outreachForm.fields
	);

	const defaultFields = initialState.fields; // Assuming this is imported

	const dirtyFieldNames: any[] = [];

	Object.keys(currentFields).forEach((fieldName) => {
		const currentValue = (currentFields as any)[fieldName];
		const defaultValue = (defaultFields as any)[fieldName];
		if (typeof currentValue === "boolean") {
			return;
		}
		if (currentValue !== defaultValue) {
			dirtyFieldNames.push(fieldName);
		}
	});

	return dirtyFieldNames;
};
// const useValidation = (form_type?: string) => {
// 	const requiredFieldNames = useRequiredFields(form_type);
// 	let err_state: string | undefined = undefined;
// 	const fields = useSelector((state: RootState) => state.outreachForm.fields);
// 	/* Function that returns the fieldNames of every position that is no longer at its initial value*/
// 	const isFormValid = requiredFieldNames.every((fieldName) => {
// 		const value = fields[fieldName];

// 		let selector = true;
// 		if (fieldName === "email") {
// 			selector = !!validateEmail(value);
// 			if (!selector) {
// 				err_state = "invalid email";
// 			}
// 		} else if (fieldName === "participants") {
// 			selector = !!validateNumber(value);
// 			if (!selector) {
// 				err_state = "invalid participants (non numerical)";
// 			}
// 		}
// 		return (!!value || typeof value === "boolean") && selector;
// 	});

// 	return { isInvalid: !isFormValid, err_state };
// };
// const useValidation = (form_type?: string, current_err_state?: string) => {
// 	const requiredFieldNames = useRequiredFields(form_type, true, true);
// 	const allDirtyFieldNames = useDirtyFields();

// 	let err_state: string | undefined = current_err_state;

// 	const fields = useSelector((state: RootState) => state.outreachForm.fields);

// 	const isValidLength =
// 		allDirtyFieldNames.length >= requiredFieldNames.length;
// 	const selector_check = allDirtyFieldNames.every((fieldName) => {
// 		const value = (fields as any)[fieldName];

// 		let selector = true;

// 		if (fieldName === "email" && !validateEmail(value)) {
// 			err_state = "Invalid email";
// 			selector = false;
// 		} else if (fieldName === "participants" && !validateNumber(value)) {
// 			err_state = "invalid participants (non numerical)";
// 			selector = false;
// 		} else if (!isValidLength) {
// 			err_state = "Required fields are marked *";
// 			selector = false;
// 		} else if (isValidLength) {
// 			err_state = undefined;
// 		}

// 		return selector;
// 	});
// 	console.log(`Selector Check - Validity: ${selector_check}`);
// 	console.log(
// 		`Err_State external: ${err_state}, isValidLength: ${isValidLength},`
// 	);
// 	console.log(`Validity: ${selector_check}`);
// 	return { isInvalid: !selector_check, err_state };
// };
import { useEffect, useState } from "react";

const useValidation = (form_type?: string) => {
	const [err_state, setErrorState] = useState<string | undefined>(undefined);

	const [selectorCheckResult, setSelectorCheckResult] = useState(false);

	const requiredFieldNames = useRequiredFields(form_type, true, true);
	const allDirtyFieldNames = useDirtyFields();

	const fields = useSelector((state: RootState) => state.outreachForm.fields);

	const isValidLength =
		allDirtyFieldNames.length >= requiredFieldNames.length;

	useEffect(() => {
		allDirtyFieldNames.forEach((n) => {
			const value = (fields as any)[n];

			if (n === "email" && !validateEmail(value)) {
				setErrorState("Invalid email");
				setSelectorCheckResult(false);
			} else if (n === "participants" && !validateNumber(value)) {
				setErrorState("Non-numerical number of participents");
				setSelectorCheckResult(false);
			} else if (!isValidLength) {
				setErrorState("Required Fields are marked with *");

				setSelectorCheckResult(false);
			} else if (isValidLength) {
				setErrorState(undefined);
			}
		});
	}, [fields, allDirtyFieldNames, requiredFieldNames, isValidLength]);

	return { isInvalid: !selectorCheckResult, err_state };
};

const SubmitButton: React.FC<{
	isDisabled: boolean;
	includeMetaData?: boolean;
}> = ({ isDisabled, includeMetaData = false }) => {
	const dispatch = useDispatch<AppDispatch>();
	const { status, pdfDownloadUrl } = useSelector(
		(state: RootState) => state.outreachForm
	);
	const isLoading = status === "loading";
	const _setSubmitted = useContext(FormContext).setSubmitted;
	const handleSubmit = (e: React.MouseEvent) => {
		e.preventDefault();
		_setSubmitted(true);
		if (!isDisabled && !isLoading) {
			dispatch(submitFormAndGeneratePdf(includeMetaData));
		}
	};

	const buttonText = isLoading ? "Submitting..." : "Submit";

	const pdfLinkProps = useDynamicLink({
		useDefaultDecoration: true,
		style_args: ["3px"],
		StyleOverrides: {
			color: dark_midnight_green,
			marginLeft: "10px",
		},
	});

	return (
		<div style={{ display: "flex", alignItems: "center" }}>
			<button
				type="submit"
				disabled={isDisabled || isLoading}
				onClick={handleSubmit}
			>
				{buttonText}
			</button>

			{status === "succeeded" && pdfDownloadUrl && (
				<a
					href={pdfDownloadUrl}
					download="outreach_form_submission.pdf"
					{...pdfLinkProps}
				>
					Download PDF
				</a>
			)}
		</div>
	);
};

const Submission: React.FC<{
	includeMetaData?: boolean;
}> = ({ includeMetaData }) => {
	const { form_type, isFormError = false } = useContext(FormContext);
	const MetaData = useMetadata();
	useInitializeFormMetadata(MetaData);

	const data_val_key =
		form_type === "BookCall"
			? "call_time"
			: form_type === "BookService"
			? "preliminary_date"
			: undefined;

	return (
		<div style={SubmitContainerStyle}>
			<SubmitButton
				isDisabled={isFormError}
				includeMetaData={includeMetaData}
			/>
			{form_type === "BookCall" || form_type === "BookService" ? (
				<AddToCalender date_key={data_val_key} />
			) : null}
			{form_type === "BookService" && !isFormError ? (
				<CheckoutButton />
			) : null}
		</div>
	);
};

export { Submission, useValidation };

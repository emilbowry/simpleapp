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
import { submitFormAndGeneratePdf } from "./OutReachForm.slice";
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
	// const disabled = isDisabled;
	const { submitted } = useContext(FormContext);
	const props = submitted
		? { onClick: (e: React.MouseEvent) => e.preventDefault() }
		: { href: TEST_CHECKOUT_URL };
	const link_props = useDynamicLink({
		useDefaultDecoration: true,
		style_args: ["3px"],
		StyleOverrides: {
			color: dark_midnight_green,
		},
	});
	return (
		<button disabled={!submitted}>
			<a
				{...props}
				{...link_props}
			>
				Buy Now
			</a>
		</button>
	);
};

const useRequiredFields = (form_type?: string) => {
	const currentInputs = [...getFields(), ...getFields(form_type)];

	const requiredFieldNames = currentInputs
		.filter((config) => config.required && config.type)
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
const useValidation = (form_type?: string) => {
	const requiredFieldNames = useRequiredFields(form_type);
	let validation_err: string | undefined = undefined;
	const fields = useSelector((state: RootState) => state.outreachForm.fields);

	const isFormValid = requiredFieldNames.every((fieldName) => {
		const value = fields[fieldName];

		let selector = true;
		if (fieldName === "email") {
			console.log(fieldName);

			selector = !!validateEmail(value);
			if (!selector) {
				validation_err = "invalid email";
			}
		} else if (fieldName === "participants") {
			selector = !!validateNumber(value);
			if (!selector) {
				validation_err = "invalid participants (non numerical)";
			}
		}
		return (!!value || typeof value === "boolean") && selector;
	});

	return { isValidated: !isFormValid, validation_err };
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
	const { form_type, submit_disabled, setIsValidated, setValidationErr } =
		useContext(FormContext);
	const MetaData = useMetadata();
	const { isValidated, validation_err } = useValidation(form_type);
	setIsValidated(isValidated);
	setValidationErr(validation_err);

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
				isDisabled={isValidated}
				includeMetaData={includeMetaData}
			/>
			{form_type === "BookCall" || form_type === "BookService" ? (
				<AddToCalender date_key={data_val_key} />
			) : null}
			{form_type === "BookService" && !isValidated ? (
				<CheckoutButton />
			) : null}
		</div>
	);
};

export { Submission, useValidation };

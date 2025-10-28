import { useContext, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHref } from "react-router-dom";
import { user_agent } from "../../hooks/BrowserDependant";
import { AppDispatch, RootState } from "../../store";
import { initializeMetadata, updateField } from "./OutReachForm.slice";
import {
	CheckboxInputStyle,
	DescriptionStyle,
	FormContainerStyle,
	FormGroupStyle,
	InputBaseStyle,
	LabelStyle,
	OptionalInputStyle,
	TextAreaStyle,
	TitleStyle,
} from "./OutReachForm.styles";
import type {
	IFormMetaData,
	TFormConfigProps,
	TOutreachFormGeneralFields,
} from "./OutReachForm.types";
import { PortalContext } from "./PopOver";
const NameInput: TFormConfigProps<"name"> = {
	name: "name",
	label: "Name",
	required: true,
	type: "text",
};

const ForTeamCheckbox: TFormConfigProps<"isMailingListable"> = {
	name: "isMailingListable",
	label: "Join Mailing List",
	required: true,
	type: "checkbox",
};
const EmailInput: TFormConfigProps<"email"> = {
	name: "email",
	label: "Email",
	required: true,
	type: "email",
};

const NotesTextArea: TFormConfigProps<"notes"> = {
	name: "notes",
	label: "Notes",
	required: true,
	type: undefined,
};

const OrganisationInput: TFormConfigProps<"organisation"> = {
	name: "organisation",
	label: "Organisation",
	required: false,
	type: "text",
};
const JobInput: TFormConfigProps<"job_title"> = {
	name: "job_title",
	label: "Job Title",
	required: false,
	type: "text",
};

const PhoneInput: TFormConfigProps<"raw_phone_number"> = {
	name: "raw_phone_number",
	label: "Phone Number",
	required: false,
	type: "tel",
};

const CallTimeInput: TFormConfigProps<"call_time"> = {
	name: "call_time",
	label: "If you want a call scheduled, please indicate when works for you",
	type: "datetime-local",
	required: true,
};

// const EmailRequest: TFormConfigProps<"request_email"> = {
// 	name: "request_email",
// 	label: "Join Our Mailing List",
// 	type: "checkbox",
// 	required: true,
// };
const OptionalInputs = [OrganisationInput, JobInput, PhoneInput];

const RequiredInputs = [NameInput, ForTeamCheckbox, EmailInput, NotesTextArea];

const AllDefaultInputs = [...RequiredInputs, ...OptionalInputs];

const BookCallInputs = [CallTimeInput];

const useFormField = (
	fieldName: TOutreachFormGeneralFields,
	type: string | undefined
) => {
	const dispatch = useDispatch<AppDispatch>();

	const value = useSelector(
		(state: RootState) => state.outreachForm.fields[fieldName]
	);

	const onChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		const target = e.target;
		const newValue =
			type === "checkbox"
				? (target as HTMLInputElement).checked
				: target.value;

		dispatch(updateField({ field: fieldName, value: newValue }));
	};

	return type === "checkbox"
		? {
				checked: value,
				onChange,
		  }
		: {
				value,
				onChange,
		  };
};
const _FormField: React.FC<TFormConfigProps<TOutreachFormGeneralFields>> = (
	config
) => {
	const props = config;

	const { type, required, name: key } = props;

	const OtherProps = { ...useFormField(key, type), id: key };
	const FieldProps = { ...props, ...OtherProps } as any;
	const El =
		type === undefined ? (
			<textarea
				{...FieldProps}
				style={TextAreaStyle}
			/>
		) : type === "checkbox" ? (
			<input
				{...FieldProps}
				style={CheckboxInputStyle}
			/>
		) : required === true ? (
			<input
				{...(FieldProps as any)}
				style={InputBaseStyle}
			/>
		) : (
			<input
				{...(FieldProps as any)}
				style={OptionalInputStyle}
			/>
		);

	return El;
};

const FormLabel: React.FC<{
	htmlFor: string;
	label: string;
	required?: boolean;
}> = ({ htmlFor, label, required }) => (
	<label
		htmlFor={htmlFor}
		style={LabelStyle}
	>
		{required && "*"}

		{label}
	</label>
);

const FormField: React.FC<TFormConfigProps<TOutreachFormGeneralFields>> = (
	config
) => {
	const { name: key, label, description, required, type } = config;

	return (
		<>
			<div style={FormGroupStyle}>
				<FormLabel
					htmlFor={key}
					label={label}
					required={required && type != "checkbox"}
				/>
				<_FormField {...config} />
				{description && (
					<label
						htmlFor={key}
						style={DescriptionStyle}
					>
						{description}
					</label>
				)}
			</div>
		</>
	);
};

const FormFields: React.FC<{ inputs?: TFormConfigProps<any>[] }> = ({
	inputs = AllDefaultInputs,
}) => (
	<>
		{inputs.map((field) => (
			<FormField
				key={field.name}
				{...field}
			/>
		))}
	</>
);

const FormContainer: React.FC<{ inputs?: TFormConfigProps<any>[] }> = ({
	inputs = AllDefaultInputs,
}) => {
	return (
		<form className="no-aos">
			<FormFields inputs={inputs} />
		</form>
	);
};

const useMetadata = (): IFormMetaData => {
	const source = useContext(PortalContext)?.source || useHref("");
	const form_identifier: IFormMetaData["form_identifier"] =
		source === "/demo_and_testing" ? "ContactUs" : "Footer";
	const MetaData = {
		source,
		form_identifier,
		user_agent,
		client_ip: "0.0.0.0",
		account_id: undefined,
	};
	return MetaData;
};

export const useInitializeFormMetadata = (MetaData: IFormMetaData) => {
	const dispatch = useDispatch<AppDispatch>();

	useEffect(() => {
		// Ensure MetaData is defined before dispatching (e.g., if it's async or based on context)
		if (MetaData) {
			dispatch(initializeMetadata(MetaData));
		}
	}, [MetaData, dispatch]);
};

const ContactForm2: React.FC<{ form_type?: string }> = ({ form_type }) => {
	const MetaData = useMetadata();
	useInitializeFormMetadata(MetaData);
	const optInput = form_type === "BookCall" ? BookCallInputs : null;
	return (
		<div style={FormContainerStyle}>
			<h2 style={TitleStyle}>Contact Us</h2>
			<FormContainer />
			{optInput && <FormContainer inputs={BookCallInputs} />}
		</div>
	);
};

export { ContactForm2 };

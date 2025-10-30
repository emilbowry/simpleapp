src / features / contact - form / ContactForm.tsx;

import React, { useContext, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store";
import {
	ButtonDisabledStyle,
	ButtonStyle,
	CallTimeStyle,
	CheckboxInputStyle,
	ErrorMessageStyle,
	FormContainerStyle,
	FormGroupStyle,
	InputBaseStyle,
	LabelStyle,
	SuccessMessageStyle,
	TextAreaStyle,
	TitleStyle,
} from "./ContactForm.styles";
import {
	IFormState,
	TDataKeys,
	TValidationCheck,
	setIsForTeam,
	submitContactForm,
	updateField,
} from "./formSlice";

interface FieldConfig {
	name: TDataKeys;
	label: string;
	as: "input" | "textarea" | "checkbox";
	required?: boolean;

	type: string | undefined;
	description?: string;
	style?: React.CSSProperties;
}

const formConfig: FieldConfig[] = [
	{ name: "name", label: "Name", required: true, as: "input", type: "text" },
	{ name: "jobTitle", label: "Job title", as: "input", type: "text" },
	{ name: "organisation", label: "Organisation", as: "input", type: "text" },
	{
		name: "email",
		label: "Work email address",
		required: true,
		as: "input",
		type: "email",
	},
	{
		name: "isForTeam",
		label: "I am enquiring for my team",
		as: "checkbox",
		type: "checkbox",
		description: "(Leave unchecked if enquiring for yourself)",
		style: CheckboxInputStyle,
	},
	{
		name: "reason",
		label: "Reason for enquiring / Notes",
		required: true,
		type: undefined,
		as: "textarea",
		style: TextAreaStyle,
	},
	{
		name: "callTime",
		label: "If you want a call scheduled, please indicate when works for you",
		as: "input",
		type: "datetime-local",
		style: CallTimeStyle,
	},
];

interface FormContextValue {
	formState: IFormState;

	handleChange: (field: TDataKeys, value: string | boolean) => void;
	handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

const FormContext = React.createContext<FormContextValue | undefined>(
	undefined
);

const useFormContext = () => {
	const context = useContext(FormContext);
	if (!context) {
		throw new Error(
			"Form components must be used within the ContactFormProvider."
		);
	}
	return context;
};

const useContactForm = () => {
	const formState = useSelector((state: RootState) => state.form);
	const dispatch = useDispatch<AppDispatch>();

	const handleChange = (field: TDataKeys, value: string | boolean) => {
		if (field === "isForTeam") {
			dispatch(setIsForTeam(value as boolean));
		} else {
			dispatch(
				updateField({
					field: field as Exclude<TDataKeys, "isForTeam">,
					value: value as string,
				})
			);
		}
	};

	const validateForm: TValidationCheck = (state) => {
		const requiredFields = formConfig.filter((field) => field.required);
		const missingField = requiredFields.find(
			(field) => !state.form[field.name as TDataKeys]
		);

		if (missingField) {
			const prettyLabel = missingField.label.replace(
				"Work email address",
				"Email"
			);
			return {
				isValid: false,
				errorMessage: `${prettyLabel} is a required field.`,
			};
		}
		return { isValid: true };
	};

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		dispatch(submitContactForm(validateForm));
	};

	return { formState, handleChange, handleSubmit };
};

const FormLabel: React.FC<{ htmlFor: string; label: string }> = ({
	htmlFor,
	label,
}) => (
	<label
		htmlFor={htmlFor}
		style={LabelStyle}
	>
		{label}
	</label>
);

const FormInput: React.FC<React.InputHTMLAttributes<HTMLInputElement>> = (
	props
) => {
	return <input {...props} />;
};

const FormTextarea: React.FC<
	React.TextareaHTMLAttributes<HTMLTextAreaElement>
> = (props) => {
	return <textarea {...props} />;
};

const FormField: React.FC<{ config: FieldConfig }> = ({ config }) => {
	const { formState, handleChange } = useFormContext();
	const { name: key, type, style, required, description, label } = config;

	const opt = type === "checkbox" ? "checked" : "value";
	const Comp = config.as === "textarea" ? FormTextarea : FormInput;

	return (
		<>
			<div style={FormGroupStyle}>
				<FormLabel
					htmlFor={key}
					label={label}
				/>
				<Comp
					{...{
						id: key,
						name: key,
						onChange: (
							e: React.ChangeEvent<
								HTMLInputElement | HTMLTextAreaElement
							>
						) => {
							handleChange(
								key,
								(e.target as HTMLInputElement)[opt]
							);
						},
						type: type,
						[opt]:
							opt === "checked"
								? (formState[key] as boolean)
								: (formState[key] as string),
						style: style ?? InputBaseStyle,
						required: required ?? false,
					}}
				/>
				{description && (
					<label
						htmlFor={key}
						style={{
							color: "#606770",
						}}
					>
						{description}
					</label>
				)}
			</div>
		</>
	);
};

const FormFields: React.FC = () => (
	<>
		{formConfig.map((field) => (
			<FormField
				key={field.name}
				config={field}
			/>
		))}
	</>
);

const FormStatus: React.FC = () => {
	const { formState } = useFormContext();
	return (
		<>
			{formState.status === "success" && (
				<div style={SuccessMessageStyle}>
					Message sent successfully! We'll get back to you soon.
				</div>
			)}
			{formState.status === "error" && formState.errorMessage && (
				<div style={ErrorMessageStyle}>{formState.errorMessage}</div>
			)}
		</>
	);
};

const FormSubmit: React.FC = () => {
	const { formState } = useFormContext();
	const [isHovered, setIsHovered] = useState(false);
	const isSubmitting = formState.status === "submitting";
	const combinedButtonStyle = {
		...ButtonStyle,
		...(isSubmitting ? ButtonDisabledStyle : {}),
		...(isHovered && !isSubmitting ? { backgroundColor: "#0069d9" } : {}),
	};

	return (
		<button
			type="submit"
			style={combinedButtonStyle}
			disabled={isSubmitting}
			onMouseEnter={() => setIsHovered(true)}
			onMouseLeave={() => setIsHovered(false)}
		>
			{isSubmitting ? "Sending..." : "Send Enquiry"}
		</button>
	);
};

const FormContainer: React.FC = () => {
	const { handleSubmit } = useFormContext();
	return (
		<form
			onSubmit={handleSubmit}
			noValidate
		>
			<FormFields />
			<FormSubmit />
		</form>
	);
};

const ContactForm: React.FC = () => {
	const { formState, handleChange, handleSubmit } = useContactForm();

	const contextValue = { formState, handleChange, handleSubmit };

	return (
		<div style={FormContainerStyle}>
			<h2 style={TitleStyle}>Contact Us</h2>

			<FormContext.Provider value={contextValue}>
				<FormStatus />
				<FormContainer />
			</FormContext.Provider>
		</div>
	);
};

// import { ContactForm2 } from "../outreach-form/OutReachForm";
export { ContactForm };

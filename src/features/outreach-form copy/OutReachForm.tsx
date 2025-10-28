// import React from "react";
// import {
// 	CheckboxInputStyle,
// 	DescriptionStyle,
// 	FormGroupStyle,
// 	InputBaseStyle,
// 	LabelStyle,
// 	TextAreaStyle,
// } from "./OutReachForm.styles";
// import {
// 	isCheckable,
// 	TFormConfig,
// 	TInputType,
// 	TOptionalFormInputs,
// 	TOutreachFormBoolInputs,
// 	TOutreachFormStrInputs,
// 	TRequiredInputProps,
// 	TTextAreaProps,
// } from "./OutReachForm.types";

// const _FormInput: React.FC<
// 	TRequiredInputProps<TInputType, HTMLInputElement> & {
// 		// | TOptionalInputProps // | TRequiredInputProps<TInputType, HTMLInputElement>
// 		style: React.CSSProperties;
// 	}
// > = (props) => {
// 	return <input {...props} />;
// };
// // const FormOptStrInput: React.FC<TOptionalInputProps> = (props) => {
// // 	return (
// // 		<_FormInput
// // 			{...props}
// // 			style={InputBaseStyle}
// // 		/>
// // 	);
// // };
// const FormBoolInput: React.FC<
// 	TRequiredInputProps<"checkbox", HTMLInputElement>
// > = (props) => {
// 	return (
// 		<_FormInput
// 			{...props}
// 			style={CheckboxInputStyle}
// 		/>
// 	);
// };

// const FormStrInput: React.FC<
// 	TRequiredInputProps<Exclude<TInputType, "checkbox">, HTMLInputElement>
// > = (props) => {
// 	return (
// 		<_FormInput
// 			{...props}
// 			style={InputBaseStyle}
// 		/>
// 	);
// };

// const FormTextArea: React.FC<TTextAreaProps> = (props) => {
// 	return (
// 		<textarea
// 			{...props}
// 			style={TextAreaStyle}
// 		/>
// 	);
// };

// const FormLabel: React.FC<{
// 	htmlFor: string;
// 	label: string;
// 	isDescription?: boolean;
// }> = ({ htmlFor, label, isDescription = false }) => (
// 	<label
// 		htmlFor={htmlFor}
// 		style={isDescription ? LabelStyle : DescriptionStyle}
// 	>
// 		{label}
// 	</label>
// );

// /* dummy */

// const formState = <
// 	T extends
// 		| TOutreachFormBoolInputs
// 		| TOutreachFormStrInputs
// 		| TOptionalFormInputs
// >(
// 	key: T
// ) => {
// 	return (
// 		(checkable_keys as any).includes(key) ? true : "false"
// 	) as T extends TOutreachFormBoolInputs ? boolean : string;
// };

// type t_some_strs = "a" | "b";
// type t_other_strs = "c" | "d";

// const select_strs: t_some_strs[] = ["a", "b"];
// const e = (s: t_other_strs | t_some_strs) => select_strs.includes(s);

// // const all_strs:t_some_strs|t_other_strs= [...select_strs,"c","d"]

// const optional_keys = ["job_title", "organisation", "raw_phone_number"];
// const checkable_keys = [
// 	"isMailingListable",
// 	"isRequestingFollowUpMessage",
// ] as TOutreachFormBoolInputs[];

// type TFormField<T extends TInputType> =React.FC<{
// 	config: TFormConfig<T, true>;
// }>
// const FormField: TFormField<TInputType>= ({ config }) => {
// 	const { name: key, label, type: _type } = config;
// 	const props = { onChange: (e: any) => {}, id: key };

// 	return (
// 		<>
// 			<div style={FormGroupStyle}>
// 				<FormLabel
// 					htmlFor={key}
// 					label={label}
// 				/>
// 				{isCheckable(key) ? (
// 					<FormBoolInput
// 						{...{
// 							// ...config,
// 							...props,
// 							checked: false,
// 							name: key,
// 							id: key,
// 							required: config.required,
// 							type: "checkbox",
// 						}}
// 						key={_type}
// 					/>
// 				) : null}
// 				{/* {!_type ? (
// 					<FormTextArea
// 						{...{
// 							...config,
// 							...props,
// 							value: "true",
// 						}}
// 					/>
// 				) : _type === "checkbox" ? (
// 					<FormBoolInput
// 						{...{
// 							...config,
// 							...props,
// 							checked: formState(key),
// 						}}
// 					/>
// 				) : (
// 					<FormStrInput
// 						{...{
// 							...config,
// 							...props,
// 							value: formState(_type),
// 						}}
// 					/>
// 				)}
// 				{description && (
// 					<FormLabel
// 						htmlFor={key}
// 						isDescription={true}
// 						label={description}
// 					/>
// 				)} */}
// 			</div>
// 		</>
// 	);
// };

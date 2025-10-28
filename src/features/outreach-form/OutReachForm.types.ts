/* type TStatus = "Paid" | "Unpaid" | "Free";
type TConsultancyService = "1_to_1_consulting" | "group_consulting";
type TTrainingService = "1_to_1_training" | "group_training";
type TOutreachService = "Inquiry_Call" | "Email_Request";
type TService = TConsultancyService | TTrainingService | TOutreachService;
type TAppointment<T extends TService, S extends TStatus = TStatus> = {
	appointment_type: T;
	appointment_date: Date | null;
	participents: number;
	status: S;
	pricing: number;
};

interface IOutreachAppointment<T extends TOutreachService>
	extends TAppointment<TOutreachService, "Free"> {
	appointment_type: T;
	status: "Free";
	pricing: 0;
}

interface TCallAppointement extends IOutreachAppointment<"Inquiry_Call"> {
	appointment_date: Date;
}

interface TEmailAppointement extends IOutreachAppointment<"Request_Email"> {
	appointment_date: null;
} */

type TOutreachFormTextAreas = "notes";
type TOutreachFormStrInputs = "name" | "email";
type TOutreachFormBoolInputs = "isMailingListable";
/* | "isRequestingFollowUpMessage"; */
type TOptionalFormInputs = "job_title" | "organisation" | "raw_phone_number";
type TOutreachFormRequiredFields =
	| TOutreachFormTextAreas
	| TOutreachFormStrInputs
	| TOutreachFormBoolInputs;

type TConditionalFields = "call_time";
// type TOtherBoolInputs = "request_email";
type TOutreachFormGeneralFields =
	| TOutreachFormRequiredFields
	| TOptionalFormInputs
	| TConditionalFields;
// | TOtherBoolInputs;

type TOutreachFormNormalFields<T extends TOutreachFormGeneralFields> = {
	[k in Exclude<TOutreachFormGeneralFields, T>]: Capitalize<k>;
};

type TOutreachFormCustomFields<T extends TOutreachFormGeneralFields> = {
	[k in Extract<T, TOutreachFormGeneralFields>]: string;
};

type TOutreachFormFields<T extends Partial<TOutreachFormGeneralFields>> =
	TOutreachFormNormalFields<T> & TOutreachFormCustomFields<T>;

type TFormConfigProps<T extends TOutreachFormGeneralFields> = {
	label: TOutreachFormFields<TOutreachFormGeneralFields>[T];
	name: T;
	description?: string;
} & (T extends TOutreachFormRequiredFields | TConditionalFields
	? /* 	| TOtherBoolInputs */
	  { required: true }
	: { required: false }) &
	(T extends TOutreachFormBoolInputs /* | TOtherBoolInputs */
		? { type: "checkbox" }
		: T extends TOutreachFormTextAreas
		? { type: undefined }
		: T extends "email"
		? { type: "email" }
		: T extends "raw_phone_number"
		? { type: "tel" }
		: T extends "call_time"
		? { type: "datetime-local" }
		: { type: "text" });
/* 
type TFormFieldProps<
	T extends TOutreachFormGeneralFields,
	E extends HTMLElement
> = Omit<TFormConfigProps<T>, "label" | "description"> & {
	onChange: React.ChangeEvent<E>;
	id: TFormConfigProps<T>["name"];
} & (T extends TOutreachFormBoolInputs
		? { checked: boolean }
		: { value: string }); */

type TClientIP = string;
/* type TRawPhoneNumber = string; */

/* type TRegion = "other" | "UK";

type TPhoneNumber = number;
type TCountryCode = number;

type TgetCountryCode<T extends TRawPhoneNumber> = (
	raw_phone_number: T
) => TCountryCode;

type TgetPhoneNumber<T extends TRawPhoneNumber> = (raw_phone_number: T) =>
	| {
			phone_number: TPhoneNumber;
			country_code: ReturnType<TgetCountryCode<T>>;
	  }
	| undefined;
type TgetRegion<I extends TClientIP, T extends TRawPhoneNumber> = (
	clientip: I,
	country_code: NonNullable<ReturnType<TgetPhoneNumber<T>>> extends infer R
		? R extends { country_code: infer C }
			? C
			: never
		: never
) => TRegion; */
interface IFormMetaData {
	// submission_datetime?: Date;
	source: string;
	client_ip: TClientIP;
	user_agent: string;
	account_id: string | undefined;
	form_identifier: "Footer" | "ContactUs" | "other";
}

type TFormInput<K extends string, T> = Record<K, T>;
type TFormOptionalInput<K extends string, T> = Partial<Record<K, T>>;
type TFormTextArea<K extends string> = Record<K, string | undefined>;
/* type TFormDate<K extends string> = Record<K, Date>; */

interface IOptionalFormFields
	extends TFormOptionalInput<TOptionalFormInputs, string> {}

interface IOutreachFormTextAreas
	extends TFormTextArea<TOutreachFormTextAreas> {}

interface IOutreachFormStrInputs
	extends TFormInput<TOutreachFormStrInputs, string> {}

interface IOutreachFormBoolInputs
	extends TFormInput<
		TOutreachFormBoolInputs /* | TOtherBoolInputs */,
		boolean
	> {}

interface IOutreachFormInputs
	extends IOutreachFormStrInputs,
		IOutreachFormBoolInputs {}

interface IOutreachFormFields
	extends IOutreachFormInputs,
		IOutreachFormTextAreas,
		IOptionalFormFields,
		Partial<TFormInput<TConditionalFields, string>> {}
/* 
interface IOutreachForm<S extends TService, T extends TStatus>
	extends IOptionalFormFields {
	appointment: TAppointment<S, T>;
}

type THasPaid<F extends IOutreachForm<any, any>> =
	F["appointment"]["status"] extends "Paid" ? true : false;

type TOutreachForm<S extends TService, T extends TStatus> = IFormMetaData &
	IOutreachForm<S, T>;

type TInferredFormData<OF extends TOutreachForm<any, any>> = {
	isNeedingFollowUp: THasPaid<OF> extends true ? false : true;
	transaction_id: THasPaid<OF> extends true ? string : undefined;
	region: ReturnType<
		TgetRegion<OF["client_ip"], NonNullable<OF["raw_phone_number"]>>
	>;
};
 */
export {
	IFormMetaData,
	// TFormFieldProps,
	// TOptionalFormInputs,
	// TOutreachFormBoolInputs,
	IOutreachFormFields,
	TFormConfigProps,
	TFormInput,
	TOutreachFormGeneralFields,
};

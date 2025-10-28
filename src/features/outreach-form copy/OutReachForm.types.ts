// // src/features/outreach-form/OutReachForm.types.ts

// type TConsultancyService = "1_to_1_consulting" | "group_consulting";
// type TTrainingService = "1_to_1_training" | "group_training";

// type TService = TConsultancyService | TTrainingService;
// type TClientIP = string;
// type TRawPhoneNumber = string;

// type TStatus = "Paid" | "Unpaid";
// type TRegion = "other" | "UK";

// type TPhoneNumber = number;
// type TCountryCode = number;

// type TgetCountryCode<T extends TRawPhoneNumber> = (
// 	raw_phone_number: T
// ) => TCountryCode;

// type TgetPhoneNumber<T extends TRawPhoneNumber> = (raw_phone_number: T) =>
// 	| {
// 			phone_number: TPhoneNumber;
// 			country_code: ReturnType<TgetCountryCode<T>>;
// 	  }
// 	| undefined;
// type TgetRegion<I extends TClientIP, T extends TRawPhoneNumber> = (
// 	clientip: I,
// 	country_code: NonNullable<ReturnType<TgetPhoneNumber<T>>> extends infer R
// 		? R extends { country_code: infer C }
// 			? C
// 			: never
// 		: never
// ) => TRegion;

// interface IAppointment<S extends TStatus = TStatus> {
// 	appointment_type: "Inquiry_Call" | "Email_Request" | TService;
// 	appointment_date: Date;
// 	participents: number;
// 	status: S;
// }

// interface IFormMetaData {
// 	submission_datetime: Date;
// 	source: string;
// 	client_ip: TClientIP;
// 	user_agent: string;
// 	account_id: string | undefined;
// 	form_identifier: "Footer" | "ContactUs" | "other";
// }

// type TFormInput<K extends string, T> = Record<K, T>;
// type TFormOptionalInput<K extends string, T> = Partial<Record<K, T>>;

// type TFormTextArea<K extends string> = Record<K, string | undefined>;
// type TFormDate<K extends string> = Record<K, Date>;
// type TOutreachFormTextAreas = "notes";

// type TOutreachFormStrInputs = "name" | "email";
// type TOutreachFormBoolInputs =
// 	| "isMailingListable"
// 	| "isRequestingFollowUpMessage";
// const checkable_keys = ["isMailingListable", "isRequestingFollowUpMessage"];
// const isCheckable = (
// 	s: TOutreachFormBoolInputs | TOutreachFormStrInputs | TOptionalFormInputs
// ): s is TOutreachFormBoolInputs => checkable_keys.includes(s);
// type TOptionalFormInputs = "job_title" | "organisation" | "raw_phone_number";
// const optional_keys = ["job_title", "organisation", "raw_phone_number"];
// const isOptional = (
// 	s: TOutreachFormBoolInputs | TOutreachFormStrInputs | TOptionalFormInputs
// ): s is TOptionalFormInputs => optional_keys.includes(s);

// interface IOptionalFormFields
// 	extends TFormOptionalInput<TOptionalFormInputs, string> {}

// interface IOutreachFormTextAreas
// 	extends TFormTextArea<TOutreachFormTextAreas> {}

// interface IOutreachFormStrInputs
// 	extends TFormInput<TOutreachFormStrInputs, string> {}

// interface IOutreachFormBoolInputs
// 	extends TFormInput<TOutreachFormBoolInputs, boolean> {}

// interface IOutreachFormInputs
// 	extends IOutreachFormStrInputs,
// 		IOutreachFormBoolInputs {}

// // interface
// interface IOutreachFormFields
// 	extends IOutreachFormInputs,
// 		IOutreachFormTextAreas {}

// interface IOutreachForm<S extends TStatus> extends IOptionalFormFields {
// 	appointment: IAppointment<S>;
// }

// type THasPaid<F extends IOutreachForm<any>> =
// 	F["appointment"]["status"] extends "Paid" ? true : false;

// type TOutreachForm<S extends TStatus> = IFormMetaData & IOutreachForm<S>;

// type TInferredFormData<OF extends TOutreachForm<any>> = {
// 	isNeedingFollowUp: THasPaid<OF> extends true ? false : true;
// 	transaction_id: THasPaid<OF> extends true ? string : undefined;
// 	region: ReturnType<
// 		TgetRegion<OF["client_ip"], NonNullable<OF["raw_phone_number"]>>
// 	>;
// };
// type TForm<S extends TStatus, OF extends TOutreachForm<S>> = Omit<
// 	OF,
// 	"raw_phone_number"
// > &
// 	TInferredFormData<OF>;

// type TInputValueType =
// 	| "checkbox"
// 	| "text"
// 	| "email"
// 	| "datetime-local"
// 	| "freeform";
// type TInputType = Exclude<TInputValueType, "freeform">;

// type TStringValueType = Exclude<TInputType, "checkbox">;

// type TName<T extends TInputValueType> = T extends "checkbox"
// 	? TOutreachFormBoolInputs
// 	: TOutreachFormStrInputs | TOptionalFormInputs;

// // type aaf = TOutreachFormBoolInputs & TOptionalFormInputs;
// // type TCheckabl<T extends TInputValueType> = T extends "checkbox"
// // 	? TOptionalFormInputs
// // 	: string;
// type TFormConfig<T extends TInputValueType, R extends boolean = true> = {
// 	name: TName<T>;
// 	required: R;
// 	// type: T extends "freeform" ? undefined : T;
// 	label: string;
// 	description: string | undefined;
// } & (T extends "freeform" ? { type: undefined } : { type: T });

// // type TName<T extends TOutreachFormStrInputs|TOutreachFormBoolInputs|TOutreachFormTextAreas> = T extends TOutreachFormTextAreas ? "Reason for enquiring / Notes": T extends
// type TFormConfig<
// 	T extends TInputValueType,
// 	R extends boolean
// > = TFormBaseConfig<T, R> & { label: string; description: string | undefined };

// type TRequiredInputProps<
// 	T extends TInputType,
// 	E extends HTMLElement,
// 	F = TFormBaseConfig<T, true>
// > = F & {
// 	onChange: (e: React.ChangeEvent<E>) => void;
// 	id: TFormBaseConfig<T, true>["name"];
// } & (T extends "checkbox" ? { checked: boolean } : { value: string });

// type TTextAreaProps = Omit<
// 	TRequiredInputProps<"text", HTMLTextAreaElement>,
// 	"type"
// >;
// type TOptionalInputProps = Omit<
// 	TRequiredInputProps<TStringValueType, HTMLInputElement>,
// 	"required"
// > & { required: false };

// export { isCheckable, isOptional };
// export type {
// 	TFormConfig,
// 	TInputType,
// 	TInputValueType,
// 	TOptionalFormInputs,
// 	TOptionalInputProps,
// 	TOutreachFormBoolInputs,
// 	TOutreachFormStrInputs,
// 	TRequiredInputProps,
// 	TStringValueType,
// 	TTextAreaProps,
// };
// /*
// I always start a feature by defining the expected shaped of my objects and function, given above are some type definitions that describe the general shape of the some of the objects I need.

// My aim is to refactor and improve a simple contact page, it currently has 3 buttons:
// * **Button One:**
// ```
// Book a free 20 minute
// chat to find out how we
// could help you or your
// business
// ```
// * **Button Two:**
// ```
// Request an email of our
// services and offering
// and keep up to date with
// our mailing
// list
// ```
// * **Button Three:**
// ```
// Buy 1-1 consultancy and
// training
// ```

// Each which simply are a <a> element with a mailto link.

// **Improvements**
// My improvements go as such:
// 1. First I spotted an error, that is, the services offered also consist of group consultancy, and both 1-1 and group training, this was ambiguous.
// 	- Resolution: See IAppointment["appointment_type"]
// 2. Purchasing of services must offer an option to directly and instantly purchase from the site, the current method must go via email first.
// 	- 2.a There will be variations on pricing based on appointment type, hence we need to compute some general data structure to infer the pricing from:
// 		- Resolution: See IAppointment
// 	- 2.b This must be invoiced and tracked, and also chased up on:
// 		- Resolution: See TInferredFormData
// 3. Insights and Leads must be analysable:
// 	- Resolution: See IFormMetaData
// 4. We want to be able to store the information about interactions, purchases, and appointments. These have many overlapping fields so it makes sense to keep them as one data_type
// 	- Resolution: See TForm

// **Solution**
// My solution will be to design one consistent form component, rendering a selection of fields defined by the access point, these would be somewhat analagous to the original buttons.
// It shall:
// i) Render the relevant form fields
// 	i.a) Process relevent meta-data
// ii) compose the data as a JSON object
// iii) offer relevant endpoints, a non exhaustive list is:
// 	iii.a) "adding to calander" for chat bookings
// 	iii.b) immediate purchase option via something like a stripe checkout
// iv) Compose an invoice or order form as a PDF

// So far i've designed the site as a front end only SPA, as such some of these are not implementable immediately. Immediately designable options are:
// - Solution i.a,ii, iii.a, and iv

// Discuss this design idea, give no code. I am using React and Typescript

// */

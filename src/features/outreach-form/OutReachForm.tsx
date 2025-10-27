const NameInput: TFormConfigProps<"name"> = {
	name: "name",
	label: "Name",
	required: true,
	type: "text",
};

const JobInput: TFormConfigProps<"job_title"> = {
	name: "job_title",
	label: "Job Title",
	required: false,
	type: "text",
};

const OrganisationInput: TFormConfigProps<"organisation"> = {
	name: "organisation",
	label: "Organisation",
	required: false,
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

const PhoneInput: TFormConfigProps<"raw_phone_number"> = {
	name: "raw_phone_number",
	label: "Phone Number",
	required: false,
	type: "tel",
};

// const ForFollowUpCheckbox: TFormConfigProps<"isMailingListable"> = {
// 	name: "isMailingListable",
// 	label: "Join Mailing List",
// 	required: true,
// 	type: "checkbox",
// };

const RequiredFields: TOutreachFormFields<
	TOutreachFormBoolInputs | TOptionalFormInputs
> = {
	name: "Name",
	email: "Email",
	notes: "Notes",
	isMailingListable: "Join Mailing List",
	// isRequestingFollowUpMessage: "I am enquiring for my team",
	job_title: "Job title",
	raw_phone_number: "Phone Number",
	organisation: "Organisation",
};

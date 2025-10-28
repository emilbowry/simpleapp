import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { IFormMetaData, IOutreachFormFields } from "./OutReachForm.types";

interface ContactFormState {
	fields: IOutreachFormFields;
	metadata: IFormMetaData;
}

const initialState: ContactFormState = {
	fields: {
		name: "",
		email: "",
		notes: undefined,
		isMailingListable: false,
		job_title: undefined,
		organisation: undefined,
		raw_phone_number: undefined,
		call_time: "",
	},
	metadata: {
		source: "",
		client_ip: "",
		user_agent: "",
		account_id: undefined,
		form_identifier: "other",
	},
};

export const outreachFormSlice = createSlice({
	name: "outreachForm",
	initialState,
	reducers: {
		updateField: (
			state,
			action: PayloadAction<{
				field: keyof IOutreachFormFields;
				value: IOutreachFormFields[keyof IOutreachFormFields];
			}>
		) => {
			const { field, value } = action.payload;
			(state.fields[field] as any) = value;
		},
		initializeMetadata: (state, action: PayloadAction<IFormMetaData>) => {
			state.metadata = action.payload;
		},
		resetForm: (state) => {
			state.fields = initialState.fields;
			state.metadata = initialState.metadata;
		},
	},
});

export const { updateField, initializeMetadata, resetForm } =
	outreachFormSlice.actions;

export default outreachFormSlice.reducer;

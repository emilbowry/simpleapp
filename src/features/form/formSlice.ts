// src/features/form/formSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type FormStatus = "idle" | "submitting" | "success" | "error";

interface FormState {
	name: string;
	email: string;
	message: string;
	status: FormStatus;
	errorMessage: string | null;
}

const initialState: FormState = {
	name: "",
	email: "",
	message: "",
	status: "idle",
	errorMessage: null,
};

interface UpdateFieldPayload {
	field: keyof Omit<FormState, "status" | "errorMessage">;
	value: string;
}

const formSlice = createSlice({
	name: "contactForm",
	initialState,
	reducers: {
		updateField: (state, action: PayloadAction<UpdateFieldPayload>) => {
			const { field, value } = action.payload;
			state[field] = value;
		},
		setFormStatus: (state, action: PayloadAction<FormStatus>) => {
			state.status = action.payload;
		},
		setErrorMessage: (state, action: PayloadAction<string | null>) => {
			state.errorMessage = action.payload;
		},
		resetForm: () => initialState,
	},
});

export const { updateField, setFormStatus, setErrorMessage, resetForm } =
	formSlice.actions;

export default formSlice.reducer;

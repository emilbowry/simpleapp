// src/features/contact-form/formSlice.ts

import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import type { RootState } from "../../store";

// --- TYPES ---
type FormStatus = "idle" | "submitting" | "success" | "error";

export interface FormState {
	name: string;
	jobTitle: string;
	organisation: string;
	email: string;
	isForTeam: boolean;
	reason: string;
	callTime: string;
	status: FormStatus;
	errorMessage: string | null;
}

const initialState: FormState = {
	name: "",
	jobTitle: "",
	organisation: "",
	email: "",
	isForTeam: false,
	reason: "",
	callTime: "",
	status: "idle",
	errorMessage: null,
};

export interface UpdateFieldPayload {
	field: keyof Omit<FormState, "status" | "errorMessage" | "isForTeam">;
	value: string;
}

export type DataKeys = Exclude<keyof FormState, "status" | "errorMessage">;

// --- ASYNC LOGIC (createAsyncThunk) ---
export type ValidationCheck = (
	state: RootState
) => { isValid: true } | { isValid: false; errorMessage: string };

export const submitContactForm = createAsyncThunk<void, ValidationCheck>(
	"contactForm/submit",
	async (validationCheck, { getState, dispatch, rejectWithValue }) => {
		const state = getState() as RootState;
		const formState = state.form;

		const validationResult = validationCheck(state);

		if (!validationResult.isValid) {
			dispatch(setErrorMessage(validationResult.errorMessage));
			dispatch(setFormStatus("error"));
			return rejectWithValue(validationResult.errorMessage);
		}

		console.log("Submitting data:", {
			...formState,
			enquiryType: formState.isForTeam ? "For my team" : "For myself",
		});

		await new Promise((resolve) => setTimeout(resolve, 2000));

		setTimeout(() => dispatch(resetForm()), 3000);
		return;
	}
);

// --- SLICE ---
const formSlice = createSlice({
	name: "contactForm",
	initialState,
	reducers: {
		updateField: (state, action: PayloadAction<UpdateFieldPayload>) => {
			const { field, value } = action.payload;
			(state as any)[field] = value;
		},
		setIsForTeam: (state, action: PayloadAction<boolean>) => {
			state.isForTeam = action.payload;
		},
		setFormStatus: (state, action: PayloadAction<FormStatus>) => {
			state.status = action.payload;
		},
		setErrorMessage: (state, action: PayloadAction<string | null>) => {
			state.errorMessage = action.payload;
		},
		resetForm: () => initialState,
	},

	extraReducers: (builder) => {
		builder
			.addCase(submitContactForm.pending, (state) => {
				state.status = "submitting";
				state.errorMessage = null;
			})
			.addCase(submitContactForm.fulfilled, (state) => {
				state.status = "success";
			})
			.addCase(submitContactForm.rejected, (state, action) => {
				if (state.status !== "error") {
					state.status = "error";
					state.errorMessage =
						(action.payload as string) ||
						action.error.message ||
						"An unexpected error occurred.";
				}
			});
	},
});

export const {
	updateField,
	setIsForTeam,
	setFormStatus,
	setErrorMessage,
	resetForm,
} = formSlice.actions;

export default formSlice.reducer;

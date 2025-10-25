// src/features/contact-form/formSlice.ts

import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../../store";

// --- TYPES ---
type TFormStatus = "idle" | "submitting" | "success" | "error";

interface IFormState {
	name: string;
	jobTitle: string;
	organisation: string;
	email: string;
	isForTeam: boolean;
	reason: string;
	callTime: string;
	status: TFormStatus;
	errorMessage: string | null;
}

const InitialState: IFormState = {
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
interface IUpdateFieldPayload {
	field: keyof Omit<IFormState, "status" | "errorMessage" | "isForTeam">;
	value: string;
}
type TDataKeys = Exclude<keyof IFormState, "status" | "errorMessage">;

type TValidationCheck = (
	State: RootState
) => { isValid: true } | { isValid: false; errorMessage: string };

const submitContactForm = createAsyncThunk<void, TValidationCheck>(
	"contactForm/submit",
	async (validationCheck, { getState, dispatch, rejectWithValue }) => {
		const State = getState() as RootState;
		const FormState = State.form;

		const ValidationResult = validationCheck(State);

		if (!ValidationResult.isValid) {
			dispatch(setErrorMessage(ValidationResult.errorMessage));
			dispatch(setFormStatus("error"));
			return rejectWithValue(ValidationResult.errorMessage);
		}

		console.log("Submitting data:", {
			...FormState,
			enquiryType: FormState.isForTeam ? "For my team" : "For myself",
		});

		await new Promise((resolve) => setTimeout(resolve, 2000));

		setTimeout(() => dispatch(resetForm()), 3000);
		return;
	}
);

// --- SLICE ---
const FormSlice = createSlice({
	name: "contactForm",
	initialState: InitialState,
	reducers: {
		updateField: (state, action: PayloadAction<IUpdateFieldPayload>) => {
			const { field, value } = action.payload;
			(state as any)[field] = value;
		},
		setIsForTeam: (state, action: PayloadAction<boolean>) => {
			state.isForTeam = action.payload;
		},
		setFormStatus: (state, action: PayloadAction<TFormStatus>) => {
			state.status = action.payload;
		},
		setErrorMessage: (state, action: PayloadAction<string | null>) => {
			state.errorMessage = action.payload;
		},
		resetForm: () => InitialState,
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
} = FormSlice.actions;

export type { IFormState, IUpdateFieldPayload, TDataKeys, TValidationCheck };

export { submitContactForm };
export default FormSlice.reducer;

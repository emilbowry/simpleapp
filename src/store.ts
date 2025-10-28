// src/store.ts
import { configureStore } from "@reduxjs/toolkit";
import formReducer from "./features/contact-form/formSlice";

import outreachFormReducer from "./features/outreach-form/OutReachForm.slice";

const store = configureStore({
	reducer: {
		form: formReducer,
		outreachForm: outreachFormReducer,
	},
});

export { store };

type RootState = ReturnType<typeof store.getState>;
type AppDispatch = typeof store.dispatch;
export type { AppDispatch, RootState };

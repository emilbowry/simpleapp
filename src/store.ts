// src/store.ts
import { configureStore } from "@reduxjs/toolkit";
import formReducer from "./features/contact-form/formSlice";
const store = configureStore({
	reducer: {
		form: formReducer,
	},
});

export { store };

type RootState = ReturnType<typeof store.getState>;
type AppDispatch = typeof store.dispatch;
export type { AppDispatch, RootState };

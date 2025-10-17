// src/components/ContactForm.tsx
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../../store";
import {
	updateField,
	setFormStatus,
	setErrorMessage,
	resetForm,
} from "../../features/form/formSlice";

const formContainerStyle: React.CSSProperties = {
	backgroundColor: "#ffffff",
	padding: "40px",
	borderRadius: "8px",
	boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
	width: "100%",
	maxWidth: "500px",
};

const titleStyle: React.CSSProperties = {
	marginBottom: "24px",
	fontSize: "28px",
	fontWeight: 600,
	textAlign: "center",
	color: "#1c1e21",
};

const formGroupStyle: React.CSSProperties = {
	marginBottom: "20px",
};

const labelStyle: React.CSSProperties = {
	display: "block",
	marginBottom: "8px",
	fontWeight: 500,
	color: "#606770",
};

const inputBaseStyle: React.CSSProperties = {
	width: "100%",
	padding: "12px 14px",
	fontSize: "16px",
	border: "1px solid #ccd0d5",
	borderRadius: "6px",
	boxSizing: "border-box",
	transition: "border-color 0.2s, box-shadow 0.2s",
	fontFamily: "inherit",
};

const textareaStyle: React.CSSProperties = {
	...inputBaseStyle, // Inherit base styles
	minHeight: "120px",
	resize: "vertical",
};

const buttonStyle: React.CSSProperties = {
	width: "100%",
	padding: "12px",
	fontSize: "18px",
	fontWeight: "bold",
	color: "#ffffff",
	backgroundColor: "#007bff",
	border: "none",
	borderRadius: "6px",
	cursor: "pointer",
	transition: "background-color 0.2s",
};

const buttonDisabledStyle: React.CSSProperties = {
	backgroundColor: "#a0c7e4",
	cursor: "not-allowed",
};

const successMessageStyle: React.CSSProperties = {
	color: "#28a745",
	backgroundColor: "#e9f7ef",
	border: "1px solid #a8dfbb",
	padding: "12px",
	borderRadius: "6px",
	textAlign: "center",
	marginBottom: "20px",
};

const errorMessageStyle: React.CSSProperties = {
	color: "#dc3545",
	backgroundColor: "#fbe9eb",
	border: "1px solid #f5c6cb",
	padding: "12px",
	borderRadius: "6px",
	textAlign: "center",
	marginBottom: "20px",
};

// --- The React Component ---

const ContactForm: React.FC = () => {
	const formState = useSelector((state: RootState) => state.form);
	const dispatch = useDispatch<AppDispatch>();
	const [isButtonHovered, setIsButtonHovered] = useState(false);

	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		const { name, value } = e.target;
		dispatch(updateField({ field: name as any, value }));
	};

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		dispatch(setErrorMessage(null));

		if (!formState.name || !formState.email || !formState.message) {
			dispatch(setErrorMessage("All fields are required."));
			dispatch(setFormStatus("error"));
			return;
		}

		dispatch(setFormStatus("submitting"));

		console.log("Submitting data:", { ...formState });

		setTimeout(() => {
			dispatch(setFormStatus("success"));
			setTimeout(() => dispatch(resetForm()), 3000);
		}, 2000);
	};

	const combinedButtonStyle = {
		...buttonStyle,
		...(formState.status === "submitting" ? buttonDisabledStyle : {}),
		...(isButtonHovered && formState.status !== "submitting"
			? { backgroundColor: "#0069d9" }
			: {}),
	};

	return (
		<div style={formContainerStyle}>
			<h2 style={titleStyle}>Contact Us</h2>

			{formState.status === "success" && (
				<div style={successMessageStyle}>
					Message sent successfully! We'll get back to you soon.
				</div>
			)}

			{formState.status === "error" && formState.errorMessage && (
				<div style={errorMessageStyle}>{formState.errorMessage}</div>
			)}

			<form
				onSubmit={handleSubmit}
				noValidate
			>
				<div style={formGroupStyle}>
					<label
						htmlFor="name"
						style={labelStyle}
					>
						Full Name
					</label>
					<input
						type="text"
						id="name"
						name="name"
						value={formState.name}
						onChange={handleChange}
						style={inputBaseStyle}
						required
					/>
				</div>

				<div style={formGroupStyle}>
					<label
						htmlFor="email"
						style={labelStyle}
					>
						Email Address
					</label>
					<input
						type="email"
						id="email"
						name="email"
						value={formState.email}
						onChange={handleChange}
						style={inputBaseStyle}
						required
					/>
				</div>

				<div style={formGroupStyle}>
					<label
						htmlFor="message"
						style={labelStyle}
					>
						Message
					</label>
					<textarea
						id="message"
						name="message"
						value={formState.message}
						onChange={handleChange}
						style={textareaStyle}
						required
					></textarea>
				</div>

				<button
					type="submit"
					style={combinedButtonStyle}
					disabled={formState.status === "submitting"}
					onMouseEnter={() => setIsButtonHovered(true)}
					onMouseLeave={() => setIsButtonHovered(false)}
				>
					{formState.status === "submitting"
						? "Sending..."
						: "Send Message"}
				</button>
			</form>
		</div>
	);
};

export { ContactForm };

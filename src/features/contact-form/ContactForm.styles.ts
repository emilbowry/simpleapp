// src/features/contact-form/ContactForm.styles.ts

const formContainerStyle: React.CSSProperties = {
	backgroundColor: "#ffffff",
	padding: "2%",
	borderRadius: "2%",
	boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
	width: "100%",
	// maxWidth: "500px",
};
const titleStyle: React.CSSProperties = {
	marginBottom: "5%",
	fontSize: "3rem",
	fontWeight: 600,
	textAlign: "center",
	color: "#1c1e21",
};

const formGroupStyle: React.CSSProperties = {
	marginBottom: "2%",
};

const labelStyle: React.CSSProperties = {
	display: "block",
	marginBottom: "2%",
	fontWeight: 500,
	color: "#606770",
};

const inputBaseStyle: React.CSSProperties = {
	width: "100%",
	padding: "1rem",
	// height: "100%",
	fontSize: "2rem",
	border: "1px solid #ccd0d5",
	borderRadius: "1%",
	boxSizing: "border-box",
	transition: "border-color 0.2s, box-shadow 0.2s",
	fontFamily: "inherit",
};

const textareaStyle: React.CSSProperties = {
	...inputBaseStyle,
	minHeight: "120px",
	resize: "vertical",
};

const checkboxGroupStyle: React.CSSProperties = {
	display: "flex",
	alignItems: "center",
	gap: "10px",
};

const checkboxInputStyle: React.CSSProperties = {
	height: "100%",
	aspectRatio: 1,
	zoom: 2,

	accentColor: "#007bff",
};

const checkboxLabelStyle: React.CSSProperties = {
	marginBottom: 0,
	fontWeight: 400,
	color: "#1c1e21",
};

const buttonStyle: React.CSSProperties = {
	width: "100%",
	padding: "2%",
	fontSize: "18px",
	fontWeight: "bold",
	color: "#ffffff",
	backgroundColor: "#007bff",
	border: "none",
	cursor: "pointer",
	transition: "background-color 0.2s",
	marginTop: "2%",
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
const callTimeStyle: React.CSSProperties = {};
export {
	formContainerStyle,
	titleStyle,
	formGroupStyle,
	labelStyle,
	inputBaseStyle,
	textareaStyle,
	checkboxGroupStyle,
	checkboxInputStyle,
	callTimeStyle,
	buttonStyle,
	successMessageStyle,
	errorMessageStyle,
	buttonDisabledStyle,
	checkboxLabelStyle,
};

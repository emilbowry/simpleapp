// src/features/outreach-form/OutReachForm.styles.ts

import React from "react";
const InputBaseStyle: React.CSSProperties = {
	width: "100%",
	padding: "1rem",
	fontSize: "2rem",
	border: "1px solid #ccd0d5",
	borderRadius: "1%",
	boxSizing: "border-box",
	transition: "border-color 0.2s, box-shadow 0.2s",
	fontFamily: "inherit",
};

const TextAreaStyle: React.CSSProperties = {
	...InputBaseStyle,
	minHeight: "120px",
	resize: "vertical",
};

const CheckboxInputStyle: React.CSSProperties = {
	height: "100%",
	aspectRatio: 1,
	zoom: 2,
	accentColor: "#007bff",
};

const LabelStyle: React.CSSProperties = {
	display: "block",
	marginBottom: "2%",
	fontWeight: 500,
	color: "#606770",
};

const FormGroupStyle: React.CSSProperties = {
	marginBottom: "2%",
};
const DescriptionStyle = {
	color: "#606770",
};
export {
	CheckboxInputStyle,
	DescriptionStyle,
	FormGroupStyle,
	InputBaseStyle,
	LabelStyle,
	TextAreaStyle,
};

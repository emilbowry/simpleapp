// src/pages/dpotool/tool.tsx

import React from "react";
import ReactMarkdown from "react-markdown";

// 1. Define the interface for the component's props
interface MarkdownRendererProps {
	/** An array of markdown strings to be concatenated and rendered. */
	markdownStrings: string[];
}
const documentParts: string[] = [
	"# My Document Title",
	"This is the first paragraph. It comes from the first string in the array.",
	"## A Subheading\n\nHere are some features:\n\n- Feature 1: **Bolded**\n- Feature 2: *Italicized*\n- Feature 3: `inline code`",
	'Here is a code block:\n\n```javascript\nfunction greet(name) {\n  return `Hello, ${name}!`;\n}\nconsole.log(greet("World"));\n```',
	"And this is the final paragraph from the last string.",
];

/**
 * A React functional component that takes an array of markdown strings,
 * concatenates them with a double newline separator, and renders the
 * resulting markdown document.
 */
export const MarkdownRenderer: React.FC = () => {
	// 2. Concatenate the array into a single string.
	// We use a double newline ('\n\n') as a separator.
	// This ensures that each string in the array is treated as a distinct
	// block or paragraph in the final markdown document.
	const combinedMarkdown = documentParts.join("\n\n");

	// 3. Render the combined string using the ReactMarkdown component.
	// This library safely parses the markdown and converts it into
	// React elements, preventing XSS attacks.
	return <ReactMarkdown>{combinedMarkdown}</ReactMarkdown>;
};

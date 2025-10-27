import { writeFile } from "fs/promises";

const escapePdfString = (text: string): string => {
	return text
		.replaceAll("\\", "\\\\")
		.replaceAll("(", "\\(")
		.replaceAll(")", "\\)");
};

const generatePdf = async (): Promise<void> => {
	const data = {
		title: "My TypeScript PDF Title (Arrow Functions)",
		content:
			"This is the body text, generated from TypeScript.\nIt has multiple lines.\nAnd even (parentheses) and backslashes \\ must work!",
	};

	const titleText = escapePdfString(data.title);
	const bodyTextLines = data.content.split("\n").map(escapePdfString);

	const pdfObjects: string[] = [];

	pdfObjects.push("1 0 obj\n<< /Type /Catalog /Pages 2 0 R >>\nendobj");
	pdfObjects.push(
		"2 0 obj\n<< /Type /Pages /Kids [3 0 R] /Count 1 >>\nendobj"
	);
	pdfObjects.push(
		"3 0 obj\n<< /Type /Page /Parent 2 0 R /MediaBox [0 0 595 842] /Contents 4 0 R /Resources << /Font << /F1 5 0 R >> >> >>\nendobj"
	);

	const streamLines: string[] = [
		"BT",
		"/F1 24 Tf",
		"28 TL",
		"100 780 Td",
		`(${titleText}) Tj`,
		"T*",
		"/F1 12 Tf",
		"15 TL",
		"0 -15 Td",
	];

	for (const line of bodyTextLines) {
		streamLines.push(`(${line}) Tj`);
		streamLines.push("T*");
	}

	streamLines.push("ET");
	const streamData = streamLines.join("\n");

	pdfObjects.push(
		`4 0 obj\n<< /Length ${streamData.length} >>\nstream\n${streamData}\nendstream\nendobj`
	);
	pdfObjects.push(
		"5 0 obj\n<< /Type /Font /Subtype /Type1 /Name /F1 /BaseFont /Helvetica >>\nendobj"
	);

	const offsets: number[] = [];
	const pdfChunks: Buffer[] = [];

	const headerBuffer = Buffer.from("%PDF-1.4\n", "latin1");
	pdfChunks.push(headerBuffer);
	let currentOffset = headerBuffer.length;

	for (const obj of pdfObjects) {
		offsets.push(currentOffset);
		const objBuffer = Buffer.from(obj + "\n", "latin1");
		pdfChunks.push(objBuffer);
		currentOffset += objBuffer.length;
	}

	const xrefStart = currentOffset;

	let xrefTable = `xref\n0 ${pdfObjects.length + 1}\n`;
	xrefTable += "0000000000 65535 f \n";
	for (const offset of offsets) {
		xrefTable += `${offset.toString().padStart(10, "0")} 00000 n \n`;
	}
	pdfChunks.push(Buffer.from(xrefTable, "latin1"));

	const trailer = `trailer\n<< /Size ${
		pdfObjects.length + 1
	} /Root 1 0 R >>\nstartxref\n${xrefStart}\n%%EOF\n`;
	pdfChunks.push(Buffer.from(trailer, "latin1"));

	const finalPdfBuffer = Buffer.concat(pdfChunks);

	await writeFile("simple-ts-arrow.pdf", finalPdfBuffer);
	console.log("PDF created: simple-ts-arrow.pdf");
};

(async () => {
	try {
		await generatePdf();
	} catch (error) {
		console.error("Failed to generate PDF:", error);
	}
})();

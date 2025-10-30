import React, { useEffect, useState } from "react";

// --- I. TYPING AND CONFIGURATION ---

export type IcsDateTime = string;
export type IcsUid = string;

export interface IcsVEvent {
	uid: IcsUid;
	dtStamp: IcsDateTime;
	summary: string;
	dtStart: IcsDateTime;
	dtEnd: IcsDateTime;
	description?: string;
	location?: string;
	status?: "CONFIRMED" | "TENTATIVE" | "CANCELLED";
	class?: "PUBLIC" | "PRIVATE" | "CONFIDENTIAL";
	tzid?: string;
}

export interface IcsConfig {
	title: string;
	description: string;
	location: string;
	durationMinutes: number;
}

interface IcsContentResult {
	icsContent: string;
	icsBlob: Blob;
}

// --- II. ICS HELPER FUNCTIONS ---

const pad = (num: number): string => num.toString().padStart(2, "0");
const escapeIcsText = (text: string): string =>
	text
		.replace(/\\/g, "\\\\")
		.replace(/,/g, "\\,")
		.replace(/;/g, "\\;")
		.replace(/\n/g, "\\n");

const formatLocalIcsDate = (date: Date): string => {
	return `${date.getFullYear()}${pad(date.getMonth() + 1)}${pad(
		date.getDate()
	)}T${pad(date.getHours())}${pad(date.getMinutes())}${pad(
		date.getSeconds()
	)}`;
};

const formatIcsStampDate = (date: Date): string => {
	return `${date.getUTCFullYear()}${pad(date.getUTCMonth() + 1)}${pad(
		date.getUTCDate()
	)}T${pad(date.getUTCHours())}${pad(date.getUTCMinutes())}${pad(
		date.getUTCSeconds()
	)}Z`;
};

const serializeIcsToString = (event: IcsVEvent): string => {
	const lines: string[] = [
		"BEGIN:VCALENDAR",
		"VERSION:2.0",
		"PRODID:-//Minimal React ICS Generator//EN",
		"CALSCALE:GREGORIAN",
		"METHOD:PUBLISH",
		"BEGIN:VEVENT",
		`UID:${event.uid}`,
		`DTSTAMP:${event.dtStamp}`,
		`SUMMARY:${escapeIcsText(event.summary)}`,
		`DTSTART:${event.dtStart}`,
		`DTEND:${event.dtEnd}`,
		event.description && `DESCRIPTION:${escapeIcsText(event.description)}`,
		event.location && `LOCATION:${escapeIcsText(event.location)}`,
		event.status && `STATUS:${event.status}`,
		event.class && `CLASS:${event.class}`,
		"END:VEVENT",
		"END:VCALENDAR",
	].filter(Boolean) as string[];
	return lines.join("\n");
};

const getDefaultDateTimeLocal = (): string => {
	const now = new Date();
	const datePart = `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(
		now.getDate()
	)}`;
	const timePart = `${pad(now.getHours())}:${pad(now.getMinutes())}`;
	return `${datePart}T${timePart}`;
};

// --- III. THE CUSTOM HOOK: useCalendarForm (Dynamic Update via useEffect) ---

interface CalendarFormHookResult {
	blobUrl: string; // Stores the generated, revocable Object URL
}

export const useCalendarLink = (
	config: IcsConfig,
	selectedDateTime: string
): CalendarFormHookResult => {
	const [blobUrl, setBlobUrl] = useState<string>("#");

	const generateContent = (
		dateTimeString: string
	): IcsContentResult | null => {
		if (!dateTimeString || isNaN(new Date(dateTimeString).getTime()))
			return null;

		const startTime = new Date(dateTimeString);
		const endTime = new Date(
			startTime.getTime() + config.durationMinutes * 60000
		);

		const eventData: IcsVEvent = {
			uid: `${Date.now()}-${Math.random()
				.toString(36)
				.substring(2, 9)}@minimal-app.com`,
			dtStamp: formatIcsStampDate(new Date()),
			dtStart: formatLocalIcsDate(startTime),
			dtEnd: formatLocalIcsDate(endTime),
			summary: config.title,
			description: config.description,
			location: config.location,
			status: "CONFIRMED",
			class: "PUBLIC",
		};

		const icsContent = serializeIcsToString(eventData);
		const icsBlob = new Blob([icsContent], {
			type: "text/calendar;charset=utf-8",
		});

		return { icsContent, icsBlob };
	};

	useEffect(() => {
		const result = generateContent(selectedDateTime);
		// setIcsResult(result);

		let newUrl = "#";
		let oldUrl = blobUrl;

		if (result?.icsBlob) {
			newUrl = URL.createObjectURL(result.icsBlob);
			setBlobUrl(newUrl);
		} else {
			setBlobUrl("#");
		}

		return () => {
			if (oldUrl && oldUrl !== "#" && oldUrl !== newUrl) {
				URL.revokeObjectURL(oldUrl);
			}
		};
	}, [
		selectedDateTime,
		config.durationMinutes,
		config.title,
		config.description,
		config.location,
	]);

	return {
		blobUrl,
	};
};

// --- IV. THE MINIMAL COMPONENT (Testing Dynamic URL) ---

const EVENT_CONFIG: IcsConfig = {
	title: "Dynamic URL Test",
	description: "URL updates on every input change.",
	location: "Browser Console",
	durationMinutes: 60,
};

const MinimalCalendarForm: React.FC = () => {
	const [selectedDateTime_test, setSelectedDateTime_test] = useState(
		getDefaultDateTimeLocal
	);
	const handleDateTimeChange = (
		event: React.ChangeEvent<HTMLInputElement>
	) => {
		setSelectedDateTime_test(event.target.value);
	};
	const { blobUrl } = useCalendarLink(EVENT_CONFIG, selectedDateTime_test);
	return (
		<form
			style={{
				padding: "20px",
				border: "1px solid #ddd",
				borderRadius: "8px",
				maxWidth: "400px",
				margin: "50px auto",
			}}
		>
			<h2>Create Event (Dynamic Hook)</h2>

			<div style={{ marginBottom: "15px" }}>
				<label
					htmlFor="appointment-time"
					style={{ display: "block", marginBottom: "5px" }}
				>
					Select Date and Time:
				</label>
				<input
					type="datetime-local"
					id="appointment-time"
					value={selectedDateTime_test}
					onChange={handleDateTimeChange}
					style={{
						width: "100%",
						padding: "8px",
						boxSizing: "border-box",
					}}
					required
				/>
			</div>

			<p style={{ marginTop: "20px", fontWeight: "bold" }}>
				{selectedDateTime_test}
			</p>

			{/* CORRECTED: Removed 'download' attribute to enable "Add to Calendar" prompt */}
			<a
				href={blobUrl}
				target="_blank"
				style={{ wordBreak: "break-all" }}
			>
				{blobUrl === "#" ? "Select a valid time..." : blobUrl}
			</a>
		</form>
	);
};

export { MinimalCalendarForm };

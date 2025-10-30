import { useState } from "react";
import {
	DEFAULT_EVENT_CONFIG,
	getDefaultDateTimeLocal,
	useCalanderEvent,
	useCalendarLink,
} from "./CalanderHooks";

const MinimalCalendarForm: React.FC = () => {
	const [selectedDateTime_test, setSelectedDateTime_test] = useState(
		getDefaultDateTimeLocal()
	);
	const handleDateTimeChange = (
		event: React.ChangeEvent<HTMLInputElement>
	) => {
		setSelectedDateTime_test(event.target.value);
	};
	const icsContent = useCalanderEvent({
		date_string: selectedDateTime_test,
		config: DEFAULT_EVENT_CONFIG,
	});
	const { blobUrl } = useCalendarLink(icsContent);
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

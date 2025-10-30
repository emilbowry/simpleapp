import { useContext, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useHref } from "react-router-dom";
import { user_agent } from "../../hooks/BrowserDependant";
import { AppDispatch } from "../../store";
import { Appointment } from "./Appointments";
import { getDefaultDateTimeLocal } from "./CalanderHooks";
import { FormContainer } from "./FormUI";
import { initializeMetadata } from "./OutReachForm.slice";
import { FormContainerStyle, TitleStyle } from "./OutReachForm.styles";
import type { IFormMetaData } from "./OutReachForm.types";
import { PortalContext } from "./PopOver";
import { Submission } from "./SubmissionButton";

const useMetadata = (): IFormMetaData => {
	const source = useContext(PortalContext)?.source || useHref("");
	const form_identifier: IFormMetaData["form_identifier"] =
		source === "/demo_and_testing" ? "ContactUs" : "Footer";
	const MetaData = {
		source,
		form_identifier,
		user_agent,
		client_ip: "0.0.0.0",
		account_id: undefined,
		submission_datetime: getDefaultDateTimeLocal(),
	};
	return MetaData;
};

const useInitializeFormMetadata = (MetaData: IFormMetaData) => {
	const dispatch = useDispatch<AppDispatch>();

	useEffect(() => {
		if (MetaData) {
			dispatch(initializeMetadata(MetaData));
		}
	}, [MetaData, dispatch]);
};

export { useInitializeFormMetadata, useMetadata };

const OutReachForm: React.FC<{
	form_type?: string;
	includeMetaData?: boolean;
}> = ({ form_type, includeMetaData }) => {
	return (
		<div style={FormContainerStyle}>
			<h2 style={TitleStyle}>Contact Us</h2>
			<FormContainer />
			{form_type && <Appointment form_type={form_type} />}
			<Submission
				form_type={form_type}
				includeMetaData={includeMetaData}
			/>
		</div>
	);
};

export { OutReachForm };

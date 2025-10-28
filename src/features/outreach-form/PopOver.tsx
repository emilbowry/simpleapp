import React, {
	createContext,
	ReactNode,
	useEffect,
	useRef,
	useState,
} from "react";
import ReactDOM from "react-dom";
import { useHref } from "react-router-dom";

// Get the dedicated root element for the modal
const modalRoot = document.getElementById("modal-root");

// --- INLINE STYLE OBJECTS (Using React.CSSProperties) ---

const modalBackdropStyle: React.CSSProperties = {
	position: "fixed",
	top: 0,
	left: 0,
	right: 0,
	bottom: 0,
	backgroundColor: "rgba(0, 0, 0, 0.75)",
	display: "flex",
	justifyContent: "center",
	alignItems: "center",
	zIndex: 1000,
};

const modalContentStyle: React.CSSProperties = {
	backgroundColor: "white",
	padding: "20px",
	borderRadius: "8px",
	boxShadow: "0 4px 12px rgba(0, 0, 0, 0.2)",
	maxWidth: "90%",
	maxHeight: "90%",
	overflowY: "auto",
	position: "relative",
};

const closeButtonStyle: React.CSSProperties = {
	position: "absolute",
	top: "10px",
	right: "10px",
	background: "none",
	border: "none",
	fontSize: "24px",
	cursor: "pointer",
	lineHeight: "1",
	color: "#333",
	padding: "5px",
};

// --- Component Props Interface ---

interface ToggleablePortalProps {
	node?: ReactNode;
	text?: string;
	styling?: React.CSSProperties;
	default_open?: boolean;
}

const PortalContext = createContext<undefined | { source: string }>(undefined);

const ModalBody: React.FC<{
	closeModal: () => void;
	node?: React.ReactNode;
}> = ({ closeModal, node }) => {
	const elRef = useRef<HTMLDivElement | null>(null);

	if (elRef.current === null) {
		elRef.current = document.createElement("div");
	}

	useEffect(() => {
		if (!modalRoot || !elRef.current) {
			console.error(
				"Modal Root element not found! Ensure index.html has <div id='modal-root'></div>"
			);
			return;
		}

		modalRoot.appendChild(elRef.current);
		document.body.style.overflow = "hidden";

		return () => {
			if (elRef.current) {
				modalRoot.removeChild(elRef.current);
			}
			document.body.style.overflow = "unset";
		};
	}, []);

	const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
		if (e.target === e.currentTarget) {
			closeModal();
		}
	};

	if (!elRef.current) return null;

	return ReactDOM.createPortal(
		<div
			style={modalBackdropStyle}
			onClick={handleBackdropClick}
			className="no-aos"
		>
			<div style={modalContentStyle}>
				<button
					onClick={closeModal}
					style={closeButtonStyle}
				>
					&times;
				</button>

				{node}
			</div>
		</div>,
		elRef.current
	);
};

const ToggleablePortal: React.FC<ToggleablePortalProps> = ({
	node,
	text = "open",
	styling = {},
	default_open = false,
}) => {
	const [isOpen, setIsOpen] = useState(default_open);
	const source = useHref("");
	const openModal = () => setIsOpen(true);
	const closeModal = () => setIsOpen(false);

	// console.log(source);
	return (
		<>
			<PortalContext value={{ source }}>
				<a
					onClick={openModal}
					style={styling}
				>
					{text}
				</a>

				{isOpen && (
					<ModalBody
						closeModal={closeModal}
						node={node}
					/>
				)}
			</PortalContext>
		</>
	);
};

export { PortalContext, ToggleablePortal };

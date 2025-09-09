// src/pages/DemoLayout.tsx

import React from "react";

export const DemoLayout: React.FC = () => {
	const genericSectionStyle: React.CSSProperties = {
		border: "1px solid black",
		backgroundColor: "rgba(255, 0, 0, 0.2)",
		boxSizing: "border-box",
	};

	const containerStyle: React.CSSProperties = {
		...genericSectionStyle,
		display: "flex",
		flexDirection: "column",
		width: "100%",
		fontFamily: "sans-serif",
	};

	const headerContainerStyle: React.CSSProperties = {
		...genericSectionStyle,
		width: "100%",

		display: "flex",
		justifyContent: "center",
		alignItems: "center",
	};

	const headerContentStyle: React.CSSProperties = {
		...genericSectionStyle,

		width: "70%",
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		boxSizing: "border-box",
	};

	const lowerContainerStyle: React.CSSProperties = {
		...genericSectionStyle,
		flexGrow: 1,
		marginTop: "1%",

		display: "flex",
		borderTop: "4px solid blue",
	};
	const lowerHalfWrapperStyle: React.CSSProperties = {
		...genericSectionStyle,

		paddingTop: "2%",

		flexGrow: 1,
		display: "flex",
	};

	const leftBodyColumnStyle: React.CSSProperties = {
		...genericSectionStyle,
		display: "flex",
		flexDirection: "column",
		width: `${100 / 3}%`,
	};

	const titleContainerStyle: React.CSSProperties = {
		...genericSectionStyle,
		width: "50%",

		marginBottom: "2%",
		display: "flex",
		alignItems: "center",
	};

	const titleTextStyle: React.CSSProperties = {
		textAlign: "left",
		margin: 0,
	};

	const textBodyContainerStyle: React.CSSProperties = {
		...genericSectionStyle,
		height: "100%",
		marginBottom: "1%",
		display: "flex",
		alignItems: "flex-start",
	};

	const textBodyContentStyle: React.CSSProperties = {
		textAlign: "left",
		margin: 0,
	};

	const rightBodyColumnStyle: React.CSSProperties = {
		...genericSectionStyle,
		flexGrow: 1,
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
	};

	const otherBodyGraphicsGridStyle: React.CSSProperties = {
		...genericSectionStyle,
		width: "100%",
		display: "grid",
		gridTemplateColumns: "repeat(auto-fit, minmax(100px, 1fr))",
		justifyItems: "center",
		alignItems: "center",
		textAlign: "center",
	};

	const gridItemStyle: React.CSSProperties = {
		...genericSectionStyle,

		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		boxSizing: "border-box",
	};

	// just to give visual dimensions
	const _TitleElStyle: React.CSSProperties = {
		height: "50px",
	};

	const _HeaderElStyle: React.CSSProperties = {
		height: "100px",
	};
	const _GridElStyle: React.CSSProperties = {
		width: "200px",
		height: "400px",
	};
	return (
		<div style={containerStyle}>
			<div style={headerContainerStyle}>
				<div style={headerContentStyle}>
					<div style={_HeaderElStyle}>Header Element</div>
				</div>
			</div>
			<div style={lowerContainerStyle}>
				<div style={lowerHalfWrapperStyle}>
					<div style={leftBodyColumnStyle}>
						<div style={titleContainerStyle}>
							<div style={_TitleElStyle}>
								<p style={titleTextStyle}>Title Element</p>
							</div>
						</div>
						<div style={textBodyContainerStyle}>
							<p style={textBodyContentStyle}>Text Body</p>
						</div>
					</div>
					<div style={rightBodyColumnStyle}>
						<div style={otherBodyGraphicsGridStyle}>
							<div style={gridItemStyle}>
								<div style={_GridElStyle}>Item 1</div>
							</div>
							<div style={gridItemStyle}>
								<div style={_GridElStyle}>Item 2</div>
							</div>
							<div style={gridItemStyle}>
								<div style={_GridElStyle}>Item 3</div>
							</div>
							<div style={gridItemStyle}>
								<div style={_GridElStyle}>Item 4</div>
							</div>
							<div style={gridItemStyle}>
								<div style={_GridElStyle}>Item 5</div>
							</div>
							<div style={gridItemStyle}>
								<div style={_GridElStyle}>Item 6</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

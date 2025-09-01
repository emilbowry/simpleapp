import React from "react";
import { wrapLink, getImageEl } from "../../utils/reactUtils";
import { Theme } from "../../styles";
import { PartnerStyles, imageStyle } from "./PartnershipBar.styles";
import {
	PartnershipBarProps,
	IPartner,
	TPartnerSize,
} from "./PartnershipBar.types";
import { light_grey } from "../../utils/defaultColours";

const keyframes = `
  @keyframes slide-in {
    from {
      transform: translateX(0%);
    }
    to {
      transform: translateX(-100%);
    }
  }
`;

const MarqueeKeyframes = () => {
	React.useEffect(() => {
		const styleTag = document.createElement("style");
		styleTag.innerHTML = keyframes;
		document.head.appendChild(styleTag);
		return () => {
			document.head.removeChild(styleTag);
		};
	}, []);
	return null;
};

interface PartnerImageProps {
	partner: IPartner;
	size: TPartnerSize;
}
interface PartnerImageState {
	isHovered: boolean;
}

class PartnerImage extends React.Component<
	PartnerImageProps,
	PartnerImageState
> {
	constructor(props: PartnerImageProps) {
		super(props);
		this.state = {
			isHovered: false,
		};
	}
	handleMouseOver = () => this.setState({ isHovered: true });
	handleMouseOut = () => this.setState({ isHovered: false });

	render() {
		const { partner } = this.props;
		const { image, link } = partner;
		// const imageEl = getImageEl(image, imageStyle);
		const imageEl = (
			<img
				src={image}
				width={"400px"}
				onMouseOver={this.handleMouseOver}
				onMouseOut={this.handleMouseOut}
				style={{
					filter: this.state.isHovered
						? "saturate(1)"
						: "saturate(0)",
					transition: "filter 0.3s ease-in-out",
				}}
				// height={"auto"}
				// height={"400px"}
				// style={imageStyle}
			></img>
		);

		const linkedEl = wrapLink(link, imageEl);
		return linkedEl;
	}
}

export class PartnershipBar extends React.Component<PartnershipBarProps> {
	render() {
		const { partners, size = "Small", index = 0 } = this.props;
		const theme = Theme(index);
		const isMarquee = size === "Small";

		if (!isMarquee) {
			let staticStyle: React.CSSProperties = { ...PartnerStyles[size] };
			staticStyle.borderColor = theme.tertiaryColor;
			return (
				// alignSelf: "center",
				<div style={staticStyle}>
					{partners.map((partner, _index) => (
						<PartnerImage
							key={_index}
							partner={partner}
							size={size}
						/>
					))}
				</div>
			);
		}

		// const animationDuration =  * 6;

		const marqueeFrameStyle: React.CSSProperties = {
			isolation: "isolate",

			// borderTop: PartnerStyles.Small.borderTop,
			// borderBottom: PartnerStyles.Small.borderBottom,
			border: "1px solid",
			borderColor: light_grey,
			height: "10vh",
			// marginTop: "5vw",
			// marginBottom: "5vw",
			alignItems: "center",
			// alignContent: "center",
			backgroundColor: "white",
			borderRadius: "10vh",
			overflow: "hidden",
			// padding: PartnerStyles.Small.padding,
		};

		const marqueeWindowStyle: React.CSSProperties = {
			// isolation: "isolate",
			position: "relative",
			// marginTop: "5vw",
			// marginBottom: "5vw",
			// top: "0",
			// top: "1vh",
			height: "10vh",
			maskImage:
				"linear-gradient(to right, transparent 1%, black 10%, black 90%, transparent 99%)",
			// bottom: "1vh",
			// bottom: "5vh",

			display: "grid",

			// overflow: "hidden",
			// width: "100%",
			// alignItems: "center",
			alignContent: "center",
			// alignSelf: "center",
		};

		const marqueeContentStyle: React.CSSProperties = {
			display: "flex",
			// gap: "3 rem",
			// top: "-50%",

			// alignContent: "center",
			alignItems: "center",
			// alignSelf: "center",

			// animation: `30s linear -${30 / partners.length}s infinite slide-in`,
			animation: `90s linear infinite slide-in`,
		};

		const partnerWrapperStyle: React.CSSProperties = {
			flexShrink: 0,
			// width: "100%",
			// gap: "3 rem",
			marginRight: "50px",
			// paddingRight: "20px",

			// marginTop: "-3%",
			// marginTop: "-3%",
			// display: "grid",
			// alignItems: "center",
			// alignContent: "center",
			// alignSelf: "center",

			justifyContent: "space-between",
		};

		return (
			<div className="no-aos">
				<MarqueeKeyframes />
				<div style={marqueeFrameStyle}>
					<div style={marqueeWindowStyle}>
						<div style={marqueeContentStyle}>
							{partners.map((partner, _index) => (
								<div
									key={`a-${_index}`}
									style={partnerWrapperStyle}
								>
									<PartnerImage
										partner={partner}
										size={size}
									/>
								</div>
							))}
							{partners.map((partner, _index) => (
								<div
									key={`b-${_index}`}
									style={partnerWrapperStyle}
								>
									<PartnerImage
										partner={partner}
										size={size}
									/>
								</div>
							))}
							{partners.map((partner, _index) => (
								<div
									key={`c-${_index}`}
									style={partnerWrapperStyle}
								>
									<PartnerImage
										partner={partner}
										size={size}
									/>
								</div>
							))}
						</div>
					</div>
				</div>
			</div>
		);
	}
}

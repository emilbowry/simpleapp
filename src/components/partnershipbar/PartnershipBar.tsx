// src/components/partnershipbar/PartnershipBar.tsx

import React from "react";
import { wrapLink, getImageEl } from "../../utils/reactUtils";
import { Theme } from "../../styles";
import {
	PartnerStyles,
	imageStyle,
	// keyframes,
	marqueeContentStyle,
	marqueeFrameStyle,
	marqueeWindowStyle,
	partnerWrapperStyle,
	rowLayout,
} from "./PartnershipBar.styles";
import {
	IPartnershipBarProps,
	IPartnerImageProps,
	IPartnerImageState,
	IPartnershipBarState,
} from "./PartnershipBar.types";
import { genericSectionStyle } from "../../styles";
export const WallLayout = (n: number): [number, number, number] => {
	const a = (((n % 3) + 1) % 2) + Math.floor(n / Math.min(n, 3)); // Calculates the top row
	const c = Math.floor((n + 1) / 3) - (((n + 1) % Math.min(n, 3)) % 2); // Calculates the bottom row
	return [a, n - (a + c), c]; // invariant: exists x in {a, n-(a+c)} s.t c <= x
};
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

class PartnerImage extends React.Component<
	IPartnerImageProps,
	IPartnerImageState
> {
	constructor(props: IPartnerImageProps) {
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

		const imageEl = (
			<div
				style={{
					aspectRatio: "2.5", // ensures we can appropriately brick them
					justifyContent: "center",
					alignContent: "center",
				}}
			>
				<img
					src={image}
					width={"250"}
					onMouseOver={this.handleMouseOver}
					onMouseOut={this.handleMouseOut}
					style={{
						// ...genericSectionStyle,

						filter: this.state.isHovered
							? "saturate(1)"
							: "saturate(0)",
						transition: "filter 0.3s ease-in-out",
						justifyContent: "center",
					}}
				/>
			</div>
		);

		const linkedEl = wrapLink(link, imageEl); // No op since no link
		return linkedEl;
	}
}

export class PartnershipBar extends React.Component<
	IPartnershipBarProps,
	IPartnershipBarState
> {
	constructor(props: IPartnershipBarProps) {
		super(props);
		this.state = {
			smallViewPort: false,
		};
	}

	checkViewportWidth = () => {
		if (this.props.size !== "Large") return;

		const { partners } = this.props;
		const bricks = partners.length;
		const layout = WallLayout(bricks);
		let maxBricks = layout[1] > layout[0] ? layout[1] : layout[0];
		if (maxBricks % 2 == 0) {
			maxBricks = maxBricks + 1;
		}

		const threshold = 350 * maxBricks;
		const currentIsSmallViewport = window.innerWidth < threshold;

		if (currentIsSmallViewport !== this.state.smallViewPort) {
			this.setState({ smallViewPort: currentIsSmallViewport });
		}
	};

	componentDidMount() {
		if (this.props.size === "Large") {
			this.checkViewportWidth();
			window.addEventListener("resize", this.checkViewportWidth);
		}
	}

	componentWillUnmount() {
		if (this.props.size === "Large") {
			window.removeEventListener("resize", this.checkViewportWidth);
		}
	}

	render() {
		const { partners, size = "Small", index = 0 } = this.props;
		const theme = Theme(index);
		const { smallViewPort } = this.state;

		if (size === "Large") {
			let staticStyle: React.CSSProperties = { ...PartnerStyles[size] };
			staticStyle.borderColor = theme.tertiaryColor;

			if (smallViewPort) {
				return (
					<div
						style={{
							...staticStyle,
							display: "flex",
							flexWrap: "wrap",

							gap: "20px",
						}}
					>
						{partners.map((partner, _index) => (
							<PartnerImage
								key={_index}
								partner={partner}
								size={size}
							/>
						))}
					</div>
				);
			} else {
				const bricks = partners.length;
				const [topCount, midCount, bottomCount] = WallLayout(bricks);

				let offset = 0;
				const topRow = partners.slice(offset, (offset += topCount));
				const midRow = partners.slice(offset, (offset += midCount));
				const bottomRow = partners.slice(offset, offset + bottomCount);
				let maxBricks = Math.max(topCount, midCount);
				if (maxBricks % 2 == 0) {
					maxBricks = maxBricks + 1; // increasing this seems to work
				}

				return (
					<div
						className="no-aos"
						style={{
							...staticStyle,
							// gap: "-100px",
							backgroundColor: "transparent",
						}}
					>
						<div style={rowLayout(topCount, maxBricks)}>
							{topRow.map((partner, _index) => (
								/* 		<div //used for debugging
									style={{
										width: "200px",
										height: "100px",

										backgroundColor: "red",
									}}
								/> */
								<PartnerImage
									key={_index}
									partner={partner}
									size={size}
								/>
							))}
						</div>
						<div style={rowLayout(midCount, maxBricks)}>
							{midRow.map((partner, _index) => (
								<PartnerImage
									key={_index}
									partner={partner}
									size={size}
								/>
								/* 	<div //used for debugging
									style={{
										width: "200px",
										height: "100px",
										backgroundColor: "red",
									}}
								/> */
							))}
						</div>
						<div style={rowLayout(bottomCount, maxBricks)}>
							{bottomRow.map((partner, _index) => (
								<PartnerImage
									key={_index}
									partner={partner}
									size={size}
								/>
								/* 	<div //used for debugging
									style={{
										width: "200px",
										height: "100px",
										backgroundColor: "red",
									}}
								/> */
							))}
						</div>
					</div>
				);
			}
		} else if (size === "Small") {
			const numSets = Array.from({ length: 3 }, (_, i) => i);
			return (
				<div className="no-aos">
					<MarqueeKeyframes />
					<div style={marqueeFrameStyle}>
						<div style={marqueeWindowStyle}>
							<div style={marqueeContentStyle}>
								{numSets.map((setIndex) => (
									<React.Fragment key={`set-${setIndex}`}>
										{partners.map(
											(partner, partnerIndex) => (
												<div
													key={`partner-${setIndex}-${partnerIndex}`}
													style={partnerWrapperStyle}
												>
													<PartnerImage
														partner={partner}
														size={size}
													/>
												</div>
											)
										)}
									</React.Fragment>
								))}
							</div>
						</div>
					</div>
				</div>
			);
		}
	}
}

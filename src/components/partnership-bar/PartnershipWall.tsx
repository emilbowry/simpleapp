import React, { useEffect, useState } from "react";
import { Theme } from "../../styles";
import { PartnerImage } from "./PartnershipBar";
import {
	CompactViewStyle,
	PartnerStyles,
	rowLayout,
} from "./PartnershipBar.styles";
import {
	IPartner,
	IPartnershipBar,
	IRows,
	PartnershipBarCompactWallProps,
	PartnershipBarFullWallProps,
} from "./PartnershipBar.types";
const PartnerWallRow: React.FC<{
	partners: readonly IPartner[];
	style: React.CSSProperties;
}> = ({ partners, style }) => (
	<div style={style}>
		{partners.map((partner, index) => (
			<PartnerImage
				key={index}
				partner={partner}
			/>
		))}
	</div>
);

/*
This is extremely efficient for some reason
 const cumSumSlices =
	(sum = 0) =>
	(value = 0) =>
		[sum, (sum += value)]; 
*/

/* 

calculate rows
 */

const calculateRows = (
	counts: number[],
	partners: readonly IPartner[],
	sum = 0
) =>
	counts.reduce<{
		[key: string]: IPartner[];
	}>(
		(acc, val, i) => (
			(acc[keys[i]] = partners.slice(sum, (sum += val))), acc
		),
		{}
	);

const calculateRows2 = (
	counts: number[],
	partners: readonly IPartner[],
	sum = 0,
	acc = {} as IRows
) => (
	counts.forEach(
		(val, i) => ((acc as any)[keys[i]] = partners.slice(sum, (sum += val)))
	),
	acc
);
const keys = ["top", "mid", "bottom"];
const getRows = (p: readonly IPartner[], sum = 0, r = {} as IRows) => (
	WallLayout(p.length).forEach(
		(val, i, _) => (r[keys[i]] = p.slice(sum, (sum += val)))
	),
	r
);
const getLayoutData = (partners: readonly IPartner[]) => {
	const rows = getRows(partners);
	const maxBricks = Math.max(rows.top.length, rows.mid.length);
	return {
		rows: rows,
		maxBricks: maxBricks + +!(maxBricks % 2 === 0),
	};
};
const PartnershipWall: React.FC<IPartnershipBar> = ({
	partners,
	index = 0,
}) => {
	const isCompactView = useResponsiveLayout(partners.length);
	const theme = Theme(index);

	const { rows, maxBricks } = getLayoutData(partners);

	const staticStyle: React.CSSProperties = {
		...PartnerStyles["Large"],
		borderColor: theme.tertiaryColor,
	};

	return isCompactView ? (
		<PartnershipBarCompactWall
			partners={partners}
			staticStyle={staticStyle}
		/>
	) : (
		<PartnershipBarFullWall
			staticStyle={staticStyle}
			maxBricks={maxBricks}
			rows={rows as any}
		/>
	);
};

const PartnershipBarCompactWall: React.FC<PartnershipBarCompactWallProps> = ({
	partners,
	staticStyle,
}) => {
	return (
		<div
			style={{
				...staticStyle,
				...CompactViewStyle,
			}}
		>
			{partners.map((partner, _index) => (
				<PartnerImage
					key={_index}
					partner={partner}
				/>
			))}
		</div>
	);
};

const useResponsiveLayout = (partnerCount: number) => {
	const [isCompactView, setIsCompactView] = useState(false);

	useEffect(() => {
		const checkViewportWidth = () => {
			const layout = WallLayout(partnerCount);
			let maxBricks = Math.max(layout[0], layout[1]);
			if (maxBricks % 2 === 0) {
				maxBricks = maxBricks + 1;
			}
			const PARTNER_EFFECTIVE_WIDTH = 350;
			const threshold = PARTNER_EFFECTIVE_WIDTH * maxBricks;

			setIsCompactView(window.innerWidth < threshold);
		};

		checkViewportWidth();
		window.addEventListener("resize", checkViewportWidth);
		return () => window.removeEventListener("resize", checkViewportWidth);
	}, [partnerCount]);

	return isCompactView;
};

const PartnershipBarFullWall: React.FC<PartnershipBarFullWallProps> = ({
	maxBricks,
	rows,
	staticStyle,
}) => {
	return (
		<div style={{ ...staticStyle, backgroundColor: "transparent" }}>
			<PartnerWallRow
				partners={rows.top}
				style={rowLayout(rows.top.length, maxBricks)}
			/>
			<PartnerWallRow
				partners={rows.mid}
				style={rowLayout(rows.mid.length, maxBricks)}
			/>
			<PartnerWallRow
				partners={rows.bottom}
				style={rowLayout(rows.bottom.length, maxBricks)}
			/>
		</div>
	);
};

/**  

	Calculates a "bricked" wall tiling, maximum of 3 rows, given n bricks that is strictly not bottom heavy
	@returns as tuple [a,b,c]
	a := top row
	c := bottom row
	b = n - (a+c)

	invariant: exists x in {a, n-(a+c)} s.t c <= x 


	I wonder since sign(x) =`floor(x / (abs(x) + 1))
		- floor(-x / (abs(x) + 1))` if we can join it somehow with  
		`max(1, floor(x / 3)))` since that is a rectified version of ` floor(x / min(x, 3))`


	*/

const WallLayout = (n: number): [number, number, number] => {
	const a =
		Math.sign(n) * ((((n % 3) + 1) % 2) + Math.max(1, Math.floor(n / 3)));
	const c =
		Math.floor((n + 1) / 3) - (((n + 1) % Math.max(1, Math.min(n, 3))) % 2);
	return [a, n - (a + c), c];
};

export { PartnershipWall };

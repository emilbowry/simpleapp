import React, { useEffect, useState } from "react";
import { Theme } from "../../styles";
import { PartnerImage } from "./PartnershipBar";
import { PARTNER_EFFECTIVE_WIDTH } from "./PartnershipBar.consts";
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
import { useNarrowLayout } from "../../hooks/WindowSizeDependent";
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

const useResponsiveLayout = (partnerCount: number) => {
	const layout = WallLayout(partnerCount);
	const maxBricks = Math.max(layout[0], layout[1]);

	const threshold =
		PARTNER_EFFECTIVE_WIDTH * (maxBricks + +!(maxBricks % 2 === 0));
	return useNarrowLayout(threshold);
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

*/

const WallLayout = (n: number): [number, number, number] => {
	const a =
		Math.sign(n) * ((((n % 3) + 1) % 2) + Math.max(1, Math.floor(n / 3)));
	const c =
		Math.floor((n + 1) / 3) - (((n + 1) % Math.max(1, Math.min(n, 3))) % 2);
	return [a, n - (a + c), c];
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
const PartnershipWall: React.FC<IPartnershipBar> = ({
	partners,
	index = 0,
}) => {
	const staticStyle: React.CSSProperties = {
		...PartnerStyles["Large"],
		borderColor: Theme(index).tertiaryColor,
	};

	return useResponsiveLayout(partners.length) ? (
		<PartnershipBarCompactWall
			partners={partners}
			staticStyle={staticStyle}
		/>
	) : (
		<PartnershipBarFullWall
			staticStyle={staticStyle}
			{...getLayoutData(partners)}
		/>
	);
};
export { PartnershipWall };

// src/utils/animationTagging.ts
export const animationTagging = () => {
	const io = new IntersectionObserver(
		(entries) => {
			for (const entry of entries) {
				if (entry.isIntersecting) {
					entry.target.classList.add("is-visible");
					io.unobserve(entry.target);
				}
			}
		},
		{ threshold: 0.1, root: null, rootMargin: "0px 0px -20px 0px" }
	);
	const isHTMLElement = (el: Element): el is HTMLElement =>
		el instanceof HTMLElement;
	const isInSVG = (el: Element) =>
		el.namespaceURI === "http://www.w3.org/2000/svg" || !!el.closest("svg");
	// !!el.querySelector("svg");
	const cleanSVGAccidents = () => {
		document.querySelectorAll("svg.aos, svg .aos").forEach((el) => {
			el.classList.remove("aos", "is-visible");
		});
	};
	const shouldSkip = (el: Element) =>
		!!el.closest(".no-aos") || isInSVG(el) || !isHTMLElement(el);

	const tagAllUnderMain = (): void => {
		const main = document.querySelector("main");
		if (!main) return;

		type Pos = [
			baseDepth: number,
			nextChildIndex: number,
			orderIndex: number
		];
		const pos = new WeakMap<Element, Pos>();

		pos.set(main, [-1, 0, -1]);

		const nearestUnskippedParent = (el: Element): Element => {
			let p = el.parentElement;
			while (p && p !== main && shouldSkip(p)) p = p.parentElement;
			return p ?? main;
		};

		let orderCounter = 0;
		const existing = Array.from(main.querySelectorAll(".aos"));
		for (const el of existing) {
			if (!(el instanceof HTMLElement)) continue;
			const oi = Number(el.dataset.orderIndex);
			if (Number.isFinite(oi) && oi + 1 > orderCounter)
				orderCounter = oi + 1;
		}

		const nextChildIndexByParent = new Map<Element, number>();
		for (const el of existing) {
			if (shouldSkip(el)) continue;
			const parent = nearestUnskippedParent(el);
			nextChildIndexByParent.set(
				parent,
				(nextChildIndexByParent.get(parent) ?? 0) + 1
			);
		}

		const ensureParentSeeded = (parent: Element) => {
			if (pos.has(parent)) return;
			let baseDepth = -1;
			if (parent !== main && parent instanceof HTMLElement) {
				const bd = Number(parent.dataset.baseDepth);
				if (Number.isFinite(bd)) baseDepth = bd;
			}
			const nextIdx = nextChildIndexByParent.get(parent) ?? 0;
			pos.set(parent, [baseDepth, nextIdx, -1]);
		};

		if (nextChildIndexByParent.has(main)) {
			pos.set(main, [-1, nextChildIndexByParent.get(main)!, -1]);
		}

		main.querySelectorAll("*:not(.aos)").forEach((el) => {
			if (shouldSkip(el)) return;

			const parent = nearestUnskippedParent(el);
			ensureParentSeeded(parent);

			const [parentBase, nextChildIndex] = pos.get(parent)!;

			const baseDepth = parentBase + 1;
			const siblingIndex = nextChildIndex;
			const orderIndex = orderCounter++;

			// Advance parent's next-child counter
			const [, , pOrder] = pos.get(parent)!;
			pos.set(parent, [parentBase, nextChildIndex + 1, pOrder]);

			// Store this element's tuple (its own nextChildIndex starts at 0)
			pos.set(el, [baseDepth, 0, orderIndex]);

			el.classList.add("aos");

			if (el instanceof HTMLElement) {
				el.dataset.baseDepth = String(baseDepth);
				el.dataset.siblingIndex = String(siblingIndex);
				el.dataset.orderIndex = String(orderIndex);

				const displayDepth = baseDepth + siblingIndex + orderIndex;
				el.dataset.depth = String(displayDepth);
				el.style.setProperty("--aos-base-depth", String(baseDepth));
				el.style.setProperty(
					"--aos-sibling-index",
					String(siblingIndex)
				);
				el.style.setProperty("--aos-order-index", String(orderIndex));
				el.style.setProperty("--aos-depth", String(displayDepth));
			}
		});
	};

	const observeAll = () => {
		cleanSVGAccidents();
		tagAllUnderMain();
		document.querySelectorAll(".aos").forEach((el) => {
			io.observe(el as HTMLElement);
		});
	};

	observeAll();

	const mo = new MutationObserver(() => observeAll());
	mo.observe(document.body, { childList: true, subtree: true });

	return () => {
		io.disconnect();
		mo.disconnect();
	};
};

// M100.273 69.36h203.579v108.124H100.273Zm0 0
// M165.906 177.484h137.946L238.215 69.36H100.27Zm0 0

// M101.367 177.492h202.48v106.875h-202.48Zm0 0
// M239.3 284.367H101.317l64.547-106.875h137.985Zm0 0
// M303.852 177.484V69.36H100.273v108.125Zm0 0
// M303.848 284.367V177.492h-202.48v106.875Zm0 0
// M37.5 101.438h91.637v152.128H37.5Zm0 0

// M37.5 101.438h91.637v152.128H37.5Zm0 0
// m83.316 101.438 45.82 76.054-45.82 76.055L37.5 177.492Zm0 0

// M100.273 69.36h203.579v108.124H100.273Zm0 0
// M165.906 177.484h137.946L238.215 69.36H100.27Zm0 0
// M101.367 177.492h202.48v106.875h-202.48Zm0 0
// M239.3 284.367H101.317l64.547-106.875h137.985Zm0 0
// M303.852 177.484V69.36H100.273v108.125Zm0 0
// M303.848 284.367V177.492h-202.48v106.875Zm0 0

// M37.5 101.438h91.637v152.128H37.5Zm0 0
// m83.316 101.438 45.82 76.054-45.82 76.055L37.5 177.492Zm0 0

// m 18.75

// M 0 0 h 200 v 100 h -200
// M 0 100 h 200 v 100 h -200
// M 70 100, l  -70 -100 v 100 z
// M 0 200, l 70 -100 h -70
// M 0 100 v-75

// M 25 0  l 50 -86.6025 l -50 -86.6025 h -25  l 50 86.6025   l -50 86.6025 h 25

// M -25 0  l 50 -86.6025 l -50 -86.6025 h25 l 50 86.6025 l -50 86.6025
// M 0 -173.205  l 50 86.6025 l -50 86.6025  m -25 0 M -25 0 l 50  -86.6025 l -50  -86.6025

// M 0 0 l 100 0 l 50 -86.6025 l -50 -86.6025 l -100 0 l -50 86.6025 z

// M 0 0 L 50 -86.6025 L 0 -173.205 H -25 L 25 -86.6025 L -25 0 M -25 0 L 25 -86.6025 L -25 -173.205 H 0 L 50 -86.6025 L 0 0
// m -25 0 M -25 0 l 50  -86.6025 l -50  -86.6025   h 25  l 50  86.6025  l -50  86.6025

// <svg width="300" height="300" viewBox="-150 -200 300 300" xmlns="http://www.w3.org/2000/svg">
//   <defs>
//     <!-- Mask: white = keep, black = cut out -->
//     <mask id="cutout">
//       <!-- Hexagon (white = visible) -->
//       <path
//         d="M 0 0 l 100 0 l 50 -86.6025 l -50 -86.6025 l -100 0 l -50 86.6025 z"
//         fill="white" />

//       <!-- Stripe (black = removed) -->
//       <path
//         d="M -25 0 L 25 -86.6025 L -25 -173.205 H 0 L 50 -86.6025 L 0 0 Z"
//         fill="black" />
//     </mask>
//   </defs>

//   <!-- Apply the mask to the hexagon -->
//   <path
//     d="M 0 0 l 100 0 l 50 -86.6025 l -50 -86.6025 l -100 0 l -50 86.6025 z"
//     fill="blue"
//     mask="url(#cutout)"/>
// </svg>

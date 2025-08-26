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

			const [, , pOrder] = pos.get(parent)!;
			pos.set(parent, [parentBase, nextChildIndex + 1, pOrder]);

			pos.set(el, [baseDepth, 0, orderIndex]);

			el.classList.add("aos");

			if (el instanceof HTMLElement) {
				el.dataset.baseDepth = String(baseDepth);
				el.dataset.siblingIndex = String(siblingIndex);
				el.dataset.orderIndex = String(orderIndex);
				const displayDepth = baseDepth + siblingIndex + orderIndex;
				// console.log(displayDepth);
				// el.style.backgroundColor = `hsl(${displayDepth}, 90%, 70%)`;
				el.dataset.depth = String(displayDepth);
				el.style.setProperty("--aos-base-depth", String(baseDepth));
				el.style.setProperty(
					"--aos-sibling-index",
					String(siblingIndex)
				);
				el.style.setProperty("--aos-order-index", String(orderIndex));
				el.style.setProperty("--aos-depth", String(displayDepth * 10));
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

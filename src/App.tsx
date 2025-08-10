// src/App.tsx
import React, { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { TitleBar } from "./components/titlebar/TitleBar";
import { DemoPage } from "./pages/demopage/DemoPage";
import { Footer } from "./components/footer/Footer";
import { FounderPage } from "./pages/founderpage/FounderPage"; // <-- Import the new page
import styles from "./GlobalStyles.module.css";
import { HomePage } from "./pages/homepage/HomePage";
import { ContactPage } from "./pages/contactpage/ContactPage";
function snapXToDevicePixel(el: HTMLElement) {
	const r = el.getBoundingClientRect();
	// amount to move so left rounds to nearest device pixel
	const dx =
		Math.round(r.left * window.devicePixelRatio) / window.devicePixelRatio -
		r.left;
	// avoid micro-jitters
	const epsilon = 0.01;
	el.style.setProperty(
		"--snap-x",
		Math.abs(dx) > epsilon ? `${dx}px` : "0px"
	);
}

const App: React.FC = () => {
	const location = useLocation();

	useEffect(() => {
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
			el.namespaceURI === "http://www.w3.org/2000/svg" ||
			!!el.closest("svg");
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

			// Root tuple: baseDepth=-1 so first top-level child gets 0
			pos.set(main, [-1, 0, -1]);

			const nearestUnskippedParent = (el: Element): Element => {
				let p = el.parentElement;
				while (p && p !== main && shouldSkip(p)) p = p.parentElement;
				return p ?? main;
			};

			// --- Rehydrate minimal state from already-tagged nodes ---
			// 1) Global order continues after the max seen so far
			let orderCounter = 0;
			const existing = Array.from(main.querySelectorAll(".aos"));
			for (const el of existing) {
				if (!(el instanceof HTMLElement)) continue;
				const oi = Number(el.dataset.orderIndex);
				if (Number.isFinite(oi) && oi + 1 > orderCounter)
					orderCounter = oi + 1;
			}

			// 2) For each parent, how many already-tagged (unskipped) children does it have?
			const nextChildIndexByParent = new Map<Element, number>();
			for (const el of existing) {
				if (shouldSkip(el)) continue;
				const parent = nearestUnskippedParent(el);
				nextChildIndexByParent.set(
					parent,
					(nextChildIndexByParent.get(parent) ?? 0) + 1
				);
			}

			// Helper to ensure a parent tuple exists in `pos`
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

			// Make sure <main> has the correct next child index (top-level)
			if (nextChildIndexByParent.has(main)) {
				pos.set(main, [-1, nextChildIndexByParent.get(main)!, -1]);
			}

			// --- Process NEW (not yet .aos) elements in document order ---
			main.querySelectorAll("*:not(.aos)").forEach((el) => {
				// IMPORTANT: skip early; don't mutate state for elements we ignore
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
					// purely for debugging visibility
					// el.style.backgroundColor = `hsl(${
					// 	displayDepth + 10
					// }, 90%, 70%)`;
					el.style.setProperty("--aos-base-depth", String(baseDepth));
					el.style.setProperty(
						"--aos-sibling-index",
						String(siblingIndex)
					);
					el.style.setProperty(
						"--aos-order-index",
						String(orderIndex)
					);
					el.style.setProperty("--aos-depth", String(displayDepth));
				}
			});
		};

		const observeAll = () => {
			cleanSVGAccidents();
			tagAllUnderMain();
			// const snapTargets =
			// 	document.querySelectorAll<HTMLElement>(".no-aos");
			// snapTargets.forEach(snapXToDevicePixel);
			// let snapTO: number | undefined;
			// window.addEventListener("resize", () => {
			// 	clearTimeout(snapTO);
			// 	snapTO = window.setTimeout(() => {
			// 		document
			// 			.querySelectorAll<HTMLElement>(".no-aos")
			// 			.forEach(snapXToDevicePixel);
			// 	}, 60);
			// });

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
	}, [location.pathname]);

	return (
		<>
			<TitleBar />

			<main className={styles.animated} key={location.pathname}>
				<Routes>
					<Route path="/" element={<HomePage />} />
					<Route path="/founder" element={<FounderPage />} />
					<Route path="/contact" element={<ContactPage />} />
					<Route path="/demo_page" element={<DemoPage />} />
				</Routes>
			</main>
			<Footer />
		</>
	);
};

export default App;

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

		const shouldSkip = (el: Element) =>
			!!el.closest(".no-aos") || isInSVG(el) || !isHTMLElement(el);

		const cleanSVGAccidents = () => {
			document.querySelectorAll("svg.aos, svg .aos").forEach((el) => {
				el.classList.remove("aos", "is-visible");
			});
		};

		// const tagAllUnderMain = () => {
		// 	const main = document.querySelector("main");
		// 	if (!main) return;
		// 	const baseDelay = 400;
		// 	let depth = 0;

		// 	main.querySelectorAll("*:not(.aos)").forEach((el) => {
		// 		// let depth = 0;

		// 		let parent = el.parentElement;
		// 		if (shouldSkip(el)) {
		// 			depth = 0;
		// 			return;
		// 		}
		// 		depth++;

		// 		el.classList.add("aos");

		// 		if (el instanceof HTMLElement) {
		// 			// while (parent && parent !== main) {
		// 			// 	depth++;
		// 			// 	parent = parent.parentElement;
		// 			// }
		// 			let parent = el.parentElement;
		// 			let offset: any = "0";
		// 			if (parent instanceof HTMLElement) {
		// 				offset = el.style.setProperty(
		// 					"--custom-offset",
		// 					offset
		// 				);
		// 				// offset = parent.style["--custom-offset"] || "0";
		// 				console.log(offset);
		// 			} else {
		// 				offset = "0";
		// 				// el.style.setProperty("offset", String(offset));
		// 			}
		// 			let p_offset = Number(offset) || 0;
		// 			const hue = p_offset + 5;

		// 			const staggeredDelay = depth * baseDelay;
		// 			// el.style.transitionDelay = `${staggeredDelay}ms`;
		// 			el.style.backgroundColor = `hsl(${hue}, 90%, 70%)`;
		// 			// 	const randomDelay = Math.random() * 500;
		// 			// 	el.style.transitionDelay = `${randomDelay}ms`;
		// 		}
		// 	});
		// };

		// const tagAllUnderMain = () => {
		// 	const main = document.querySelector("main");
		// 	if (!main) return;
		// 	const baseDelay = 400;
		// 	let depth = 0;

		// 	main.querySelectorAll("*:not(.aos)").forEach((el) => {
		// 		// let depth = 0;

		// 		let parent = el.parentElement;
		// 		if (shouldSkip(el)) {
		// 			depth = 0;
		// 			return;
		// 		}
		// 		depth++;

		// 		el.classList.add("aos");

		// 		if (el instanceof HTMLElement) {
		// 			let depth = 0;
		// 			// while (parent && parent !== main) {
		// 			// 	depth++;
		// 			// 	parent = parent.parentElement;
		// 			// }
		// 			const hue = depth + 5;

		// 			const staggeredDelay = depth * baseDelay;
		// 			// el.style.transitionDelay = `${staggeredDelay}ms`;
		// 			el.style.backgroundColor = `hsl(${hue}, 90%, 70%)`;
		// 			// 	const randomDelay = Math.random() * 500;
		// 			// 	el.style.transitionDelay = `${randomDelay}ms`;
		// 		}
		// 	});
		// };
		// const tagAllUnderMain = () => {
		// 	const main = document.querySelector("main");
		// 	if (!main) return;
		// 	let depth = 0;

		// 	main.querySelectorAll("*:not(.aos)").forEach((el) => {
		// 		if (!shouldSkip(el)) {
		// 			depth++;
		// 			el.classList.add("aos");

		// 			if (el instanceof HTMLElement) {
		// 				const hue = depth + 10;
		// 				el.style.backgroundColor = `hsl(${hue}, 90%, 70%)`;
		// 			}
		// 		}

		// 		if (shouldSkip(el) || !el.hasChildNodes()) {
		// 			depth = 0;
		// 			return;
		// 		}
		// 	});
		// };
		const tagAllUnderMain = (): void => {
			const main = document.querySelector("main");
			if (!main) return;

			// Position tuple: [baseDepth, siblingIndex, orderIndex]
			const pos = new WeakMap<Element, [number, number, number]>();

			// Initialize root <main>
			pos.set(main, [-1, 0, -1]); // baseDepth=-1 so first child gets 0, siblingIndex=0, orderIndex=-1

			let orderCounter = 0;

			const nearestUnskippedParent = (el: Element): Element => {
				let p = el.parentElement;
				while (p && p !== main && shouldSkip(p)) p = p.parentElement;
				return p ?? main;
			};

			main.querySelectorAll("*:not(.aos)").forEach((el) => {
				const parent = nearestUnskippedParent(el);
				const [parentBase, ,] = pos.get(parent)!;

				const baseDepth = parentBase + 1;
				const siblingIndex = pos.get(parent)?.[1] ?? 0; // parent's child count so far
				const orderIndex = orderCounter++;

				const [pBase, pCount, pOrder] = pos.get(parent)!;
				pos.set(parent, [pBase, pCount + 1, pOrder]);

				pos.set(el, [baseDepth, siblingIndex, orderIndex]);
				if (shouldSkip(el)) return;

				el.classList.add("aos");

				if (el instanceof HTMLElement) {
					el.dataset.baseDepth = String(baseDepth);
					el.dataset.siblingIndex = String(siblingIndex);
					el.dataset.orderIndex = String(orderIndex);

					const displayDepth = baseDepth + siblingIndex + orderIndex;
					el.dataset.depth = String(displayDepth);
					el.style.backgroundColor = `hsl(${
						displayDepth + 10
					}, 90%, 70%)`;
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

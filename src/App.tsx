// src/App.tsx
import React, { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { TitleBar } from './components/titlebar/TitleBar';
import { DemoPage } from './pages/demopage/DemoPage';
import { Footer } from './components/footer/Footer';
import { FounderPage } from './pages/founderpage/FounderPage'; // <-- Import the new page
import styles from './GlobalStyles.module.css';
import { HomePage } from './pages/homepage/HomePage'
import { ContactPage } from './pages/contactpage/ContactPage';
const App: React.FC = () => {
  const location = useLocation();
  // useEffect(() => {
  //   const observer = new IntersectionObserver(
  //     (entries) => {
  //       entries.forEach((entry) => {
  //         if (entry.isIntersecting) {
  //           entry.target.classList.add(styles.isVisible);
  //           observer.unobserve(entry.target);
  //         }
  //       });
  //     },
  //     { threshold: 0.1 }
  //   );

  //   const timeoutId = setTimeout(() => {
  //     const elements = document.querySelectorAll(`.${styles.animateOnScroll}`);
  //     elements.forEach((el) => observer.observe(el));
  //   }, 100); // 100ms is usually a safe delay

  //   return () => {
  //     clearTimeout(timeoutId);
  //     observer.disconnect();
  //   };
  // }, [location.pathname]); // Re-run this effect every time the URL pathname changes

  // useEffect(() => {
  //   const selector = '.aos';

<<<<<<< Updated upstream
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            io.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.1, root: null, rootMargin: '0px 0px -20% 0px' }
    );

    const tagAllUnderMain = () => {
      const main = document.querySelector('main');
      if (!main) return;
      main.querySelectorAll('*:not(.aos):not(.no-aos)').forEach((el) => {
        el.classList.add('aos');
      });
    };

    const observeAll = () => {
      tagAllUnderMain();
      document.querySelectorAll('.aos').forEach((el) => io.observe(el));
    };
    // Observe anything currently on the page
    observeAll();
=======
  //   const io = new IntersectionObserver(
  //     (entries) => {
  //       for (const entry of entries) {
  //         if (entry.isIntersecting) {
  //           entry.target.classList.add('is-visible');
  //           io.unobserve(entry.target);
  //         }
  //       }
  //     },
  //     { threshold: 0.1, root: null, rootMargin: '0px 0px -20px 0px' }
  //   );
  //   const isHTMLElement = (el: Element): el is HTMLElement => el instanceof HTMLElement;
  //   const isInSVG = (el: Element) =>
  //     el.namespaceURI === 'http://www.w3.org/2000/svg' || !!el.closest('svg');

  //   const shouldSkip = (el: Element) =>
  //     !!el.closest('.no-aos') || isInSVG(el) || !isHTMLElement(el);

  //   const cleanSVGAccidents = () => {
  //     document.querySelectorAll('svg.aos, svg .aos').forEach((el) => {
  //       el.classList.remove('aos', 'is-visible');
  //     });
  //   };

  //   const tagAllUnderMain = () => {
  //     const main = document.querySelector('main');
  //     if (!main) return;
  //     main.querySelectorAll('*').forEach((el) => {
  //       if (shouldSkip(el)) return;
  //       if (!el.classList.contains('aos')) el.classList.add('aos');
  //     });
  //   };

  //   const observeAll = () => {
  //     cleanSVGAccidents(); // in case they were tagged previously
  //     tagAllUnderMain();
  //     document.querySelectorAll('.aos').forEach((el) => {
  //       if (shouldSkip(el)) return;
  //       // el is an HTMLElement here
  //       io.observe(el as HTMLElement);
  //     });
  //   };
  //   // const tagAllUnderMain = () => {
  //   //   const main = document.querySelector('main');
  //   //   if (!main) return;
  //   //   main.querySelectorAll('*:not(.aos):not(.no-aos)').forEach((el) => {
  //   //     el.classList.add('aos');
  //   //   });
  //   // };

  //   // const observeAll = () => {
  //   //   tagAllUnderMain();
  //   //   document.querySelectorAll('.aos').forEach((el) => io.observe(el));
  //   // };

  //   // const observeAll = () => {
  //   //   document.querySelectorAll(selector).forEach((el) => io.observe(el));
  //   // };
  //   // Observe anything currently on the page
  //   observeAll();
>>>>>>> Stashed changes

  //   // Also observe elements that get added later
  //   const mo = new MutationObserver(() => observeAll());
  //   mo.observe(document.body, { childList: true, subtree: true });

  //   return () => {
  //     io.disconnect();
  //     mo.disconnect();
  //   };
  // }, [location.pathname]); // re-run after navigation (safe; MO will catch late renders too)

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
}

export default App;

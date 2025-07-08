// src/App.tsx
import React from 'react';
import { Hero } from '../../components/hero/Hero';
import {Timeline} from '../../components/timeline/Timeline';
import { AccordionSection } from '../../components/accordion/Accordion';
import globalstyles from '../../GlobalStyles.module.css' ;

import backgroundPattern from '/src/assets/background.png';


export const HomePage: React.FC = () => {

  return (
    <section>

      <Hero/>
      <div
        className={globalstyles.backgroundPattern}
        style={{ backgroundImage: `url(${backgroundPattern})` }}
      ></div>
      <AccordionSection />
      <div
        className={globalstyles.backgroundPattern}
        style={{ backgroundImage: `url(${backgroundPattern})` }}
      ></div>
      <Timeline />
      <div
        className={globalstyles.backgroundPattern}
        style={{ backgroundImage: `url(${backgroundPattern})` }}
      ></div>
    </section>
  );
}


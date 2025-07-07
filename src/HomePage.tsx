// src/App.tsx
import React from 'react';
import { Hero } from './features/hero/Hero';
import {Timeline} from './components/timeline/Timeline';
import { AccordionSection } from './components/accordion/Accordion';



export const HomePage: React.FC = () => {

  return (
    <section>
      <Hero/>
      <AccordionSection />
      <Timeline />
    </section>
  );
}


// src/App.tsx
import React from 'react';
import { Hero } from './features/hero/Hero';
// import other features as you build them
// import { Steps } from './features/steps/Steps';
// import { Timeline } from './features/timeline/Timeline';

// If you do have global styles, point at the real file:
// import './styles/global.css';

const App: React.FC = () => (
  <div className="app">
    <Hero />
    {/* <Steps /> */}
    {/* <Timeline /> */}
  </div>
);

export default App;

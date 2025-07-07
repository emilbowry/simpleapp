// src/App.tsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { TitleBar } from './components/titlebar/TitleBar';
import {Footer} from './components/footer/Footer';
// import other features as you build them
// import { Steps } from './features/steps/Steps';
// import { Timeline } from './features/timeline/Timeline';
import { FounderPage } from './pages/founderpage/FounderPage'; // <-- Import the new page
// If you do have global styles, point at the real file:
// import './styles/global.css';
import globalstyles from './global.module.css';
import {HomePage} from './HomePage'
import { ContactPage } from './pages/contactpage/ContactPage'; 
const App: React.FC = () => (
  <>
    <TitleBar />
    <main>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/founder" element={<FounderPage />} />
        <Route path="/contact" element={<ContactPage />} />
      </Routes>``
    </main>

    <Footer />
  </>
);

export default App;

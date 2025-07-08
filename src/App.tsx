// src/App.tsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { TitleBar } from './components/titlebar/TitleBar';
import {Footer} from './components/footer/Footer';
import { FounderPage } from './pages/founderpage/FounderPage'; // <-- Import the new page
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

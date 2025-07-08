import React from 'react';
import styles from './Hero.module.css';

import { Features } from './body/Features';
import { Tagline } from './body/Tagline';
import { Title } from './body/Title';

export const Body: React.FC = () => {

  return (
      <div>
        <Title />
        <Features />
        <Tagline />
      </div>

  );
}
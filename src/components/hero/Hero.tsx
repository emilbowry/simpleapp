// src/features/hero/Hero.tsx
import React from 'react';
import { Body } from './Body';
import { createCallingCard } from '../callingcard/CallingCard';

export const Hero: React.FC = () => {
  const ccElement = createCallingCard({ Body: Body, ratio: 0.5 });

  return ccElement
};
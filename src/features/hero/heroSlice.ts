// src/features/hero/heroSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface HeroState {
  title: string;
  subtitle: string;
}

const initialState: HeroState = {
  title: '',
  subtitle: '',
};

const heroSlice = createSlice({
  name: 'hero',
  initialState,
  reducers: {
    setHeroText(state, action: PayloadAction<HeroState>) {
      state.title = action.payload.title;
      state.subtitle = action.payload.subtitle;
    },
  },
});

export const { setHeroText } = heroSlice.actions;
export default heroSlice.reducer;

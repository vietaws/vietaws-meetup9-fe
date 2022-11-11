import { configureStore } from '@reduxjs/toolkit';

import surveyReducers from './survey-slice';

const store = configureStore({
  reducer: { survey: surveyReducers },
});

export default store;

import { createSlice } from '@reduxjs/toolkit';

const surveyState = { isSubmitted: false };
const surveySlice = createSlice({
  name: 'survey',
  initialState: surveyState,
  reducers: {
    setSubmittedSurveyStatus(state) {
      state.isSubmitted = true;
      //   console.log('SUbmitted from reducers', state.isSubmitted);
    },
  },
});

export const surveyActions = surveySlice.actions;
export default surveySlice.reducer;

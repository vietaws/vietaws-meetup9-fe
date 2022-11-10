import { createStore } from 'redux';

const submitSurveyState = { isSubmitted: false };

const submitSurveyReducer = (state = submitSurveyState, action) => {
  if (action.type === 'SUBMIT') {
    return { isSubmitted: true };
  }
  return state;
};

const store = createStore(submitSurveyReducer);

export default store;

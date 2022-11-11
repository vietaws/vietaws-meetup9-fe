import { ComponentPropsToStylePropsMap } from '@aws-amplify/ui-react';
import { API, Auth } from 'aws-amplify';
import React, { useEffect, useState } from 'react';
import SurveyForm from './SurveyForm';
import Thankyou from './Thankyou';
import { useDispatch } from 'react-redux';
import { surveyActions } from '../store/survey-slice';

const SurveyComponent = (props) => {
  //check the user is existed or not. if not, load the SurveyForm, or say thank you.
  //   const [showSurvey, setShowSurvey] = useState(true);
  const dispatch = useDispatch();
  useEffect(() => {
    const isSubmmited = async () => {
      const user = await Auth.currentAuthenticatedUser();
      console.log('cognito object:', user);
      const idToken = user.signInUserSession.idToken.jwtToken;
      const requestHeader = {
        headers: {
          Authorization: idToken,
        },
        queryStringParameters: {
          id: user.attributes.email,
        },
      };
      const data = await API.get(
        'survey-vietaws-event-apigw',
        '/questions',
        requestHeader
      );
      if (data.length !== 0) {
        // setShowSurvey(false);
        console.log('isSubmitted: YES ', data);
        // props.onSubmitHandler(false);
        dispatch(surveyActions.setSubmittedSurveyStatus());
      } else {
        console.log('isSubmitted: NO ', data);
      }
    };

    isSubmmited();
  }, [dispatch]);

  return (
    <>
      <SurveyForm />
    </>
  );
};

export default SurveyComponent;

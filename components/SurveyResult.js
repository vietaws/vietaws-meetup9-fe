import { API, Auth } from 'aws-amplify';
import React, { useEffect, useState } from 'react';

const SurveyResult = () => {
  const [total, setTotal] = useState(1);
  // const [avg, setAvgScore] = useState(0);
  useEffect(() => {
    const getFeedbacks = async () => {
      const user = await Auth.currentAuthenticatedUser();
      const idToken = user.signInUserSession.idToken.jwtToken;
      const requestHeader = {
        headers: {
          Authorization: idToken,
        },
      };
      const data = await API.get(
        'survey-vietaws-event-apigw',
        '/questions',
        requestHeader
      );
      console.log('Data: ', data);
      // setTotal(data.total);
    };
    getFeedbacks();
  }, []);

  return (
    <div>
      {/* <button onClick={getSurveyData}>See Results</button> */}
      <p>Total: {total}</p>
    </div>
  );
};

export default SurveyResult;

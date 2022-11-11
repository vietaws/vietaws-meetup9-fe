import { API, Auth } from 'aws-amplify';
import React, { useEffect, useState } from 'react';

const Thankyou = () => {
  const [total, setTotal] = useState(0);
  const [avg, setAvgScore] = useState(0);
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
      // console.log('Data: ', data);
      setTotal(data.total);
      setAvgScore(data.overallScore.toFixed(2));
    };
    getFeedbacks();
  }, []);

  return (
    <div>
      <h3>Thank YOU. You have submitted your feedbacks!</h3>
      <p>See You At Our Next Events</p>
      {/* <button onClick={getSurveyData}>See Results</button> */}
      {/* {total != 0 && (
        <div>
          <p>Total: {total}</p>
        </div>
      )} */}
      <p>Total Feedbacks: {total}</p>
      <p>Overall Score: {avg}</p>
    </div>
  );
};

export default Thankyou;

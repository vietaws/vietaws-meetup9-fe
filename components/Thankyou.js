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
          Authtication: idToken,
        },
      };
      const data = await API.get(
        'survey-vietaws-event-apigw',
        'questions',
        requestHeader
      );
      console.log('Data: ', data);
      setTotal(data.total);
    };
    getFeedbacks();
  }, []);
  return (
    <div>
      <h3>Thank YOU. You have submitted your feedbacks!</h3>
      <p>See You At Our Next Events</p>
      <p>Score: {total}</p>
    </div>
  );
};

export default Thankyou;

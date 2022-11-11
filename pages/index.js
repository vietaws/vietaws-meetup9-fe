import { Authenticator } from '@aws-amplify/ui-react';
import Head from 'next/head';
import styles from '../styles/Home.module.css';
import '@aws-amplify/ui-react/styles.css';
import Amplify from 'aws-amplify';
import SurveyComponent from '../components/SurveyComponent';
import Thankyou from '../components/Thankyou';
import { config } from '../config';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { Auth, API } from 'aws-amplify';
import SurveyResult from '../components/SurveyResult';

Amplify.configure(config);

export default function Home() {
  const submitted = useSelector((state) => state.survey.isSubmitted);
  console.log('submitted in Index.js', submitted);
  const [numResponses, setNumResponses] = useState(0);
  useEffect(() => {
    const getSurvey = async () => {
      const user = await Auth.currentAuthenticatedUser();
      const idToken = user.signInUserSession.idToken.jwtToken;
      const requestHeader = {
        headers: {
          Authtication: idToken,
        },
      };
      const data = await API.get(
        'survey-vietaws-event-apigw',
        '/questions',
        requestHeader
      );
      console.log('Data: ', data.Items);
      // setNumResponses(data.total);
    };
    // getSurvey();
  }, []);

  return (
    <div className={styles.container}>
      <Head>
        <title>VietAWS | Meeting #9 | Serverless Workshop on AWS</title>
      </Head>
      <h1>VietAWS | Meetup #9 | Serverless Workshop on AWS</h1>
      <Authenticator signUpAttributes={['name']}>
        {({ signOut, user }) => (
          <div>
            <h3>
              Congratulations! Welcome {user.attributes.name} (
              {user.attributes.email})
            </h3>

            {!submitted && <SurveyComponent />}
            {/* <p>There are {numResponses} responses.</p> */}
            {submitted && <Thankyou />}
            <button onClick={signOut} style={{ background: 'tomato' }}>
              Sign out
            </button>
          </div>
        )}
      </Authenticator>
    </div>
  );
}

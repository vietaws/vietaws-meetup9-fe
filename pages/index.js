import { Authenticator } from '@aws-amplify/ui-react';
import Head from 'next/head';
import styles from '../styles/Home.module.css';
import '@aws-amplify/ui-react/styles.css';
import Amplify from 'aws-amplify';
// import SurveyForm from '../components/SurveyForm';
import SurveyComponent from '../components/SurveyComponent';
import { useState } from 'react';
import Thankyou from '../components/Thankyou';
import { config } from '../config';
import { Provider } from 'react-redux';
import store from '../store/index';
import { useSelector } from 'react-redux';

Amplify.configure(config);

export default function Home() {
  const [showSurvey, setShowSurvey] = useState(true);
  const submitted = useSelector((state) => state.isSubmitted);
  const onSubmitHandler = (e) => {
    console.log('submitted event: ', e);
    setShowSurvey(e);
  };
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

            {!submitted && (
              <SurveyComponent onSubmitHandler={onSubmitHandler} />
            )}
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

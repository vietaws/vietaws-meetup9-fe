import { Authenticator } from '@aws-amplify/ui-react';
import Head from 'next/head';
import styles from '../styles/Home.module.css';
import '@aws-amplify/ui-react/styles.css';
import Amplify from 'aws-amplify';
import SurveyComponent from '../components/SurveyComponent';
import Thankyou from '../components/Thankyou';
import { config } from '../config';
import { useSelector } from 'react-redux';

Amplify.configure(config);

export default function Home() {
  const submitted = useSelector((state) => state.survey.isSubmitted);

  return (
    <div className={styles.container}>
      <Head>
        <title>VietAWS</title>
      </Head>
      <h1>VietAWS | See you at my next AWSome Builds!</h1>
      {/* <Authenticator signUpAttributes={['name']}>
        {({ signOut, user }) => (
          <div>
            <h3>
              Congratulations! Welcome {user.attributes.name} (
              {user.attributes.email})
            </h3>

            {!submitted && <SurveyComponent />}
            {submitted && <Thankyou />}
            <button onClick={signOut} style={{ background: 'tomato' }}>
              Sign out
            </button>
          </div>
        )}
      </Authenticator> */}
    </div>
  );
}

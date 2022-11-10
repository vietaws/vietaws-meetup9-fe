import { Authenticator } from '@aws-amplify/ui-react';
import Head from 'next/head';
import styles from '../styles/Home.module.css';
import '@aws-amplify/ui-react/styles.css';
import Amplify from 'aws-amplify';
import SurveyForm from '../components/SurveyForm';
import SurveyComponent from '../components/SurveyComponent';
import { useState } from 'react';
import Thankyou from '../components/Thankyou';

Amplify.configure({
  aws_project_region: 'ap-southeast-1',
  aws_cognito_region: 'ap-southeast-1',
  aws_user_pools_id: 'ap-southeast-1_uBiHMBn8D',
  aws_user_pools_web_client_id: '2g8stq37f2kteavm3soj1httrg',
  aws_mandatory_sign_in: 'enable',
  aws_cloud_logic_custom: [
    {
      name: 'survey-vietaws-event-apigw',
      endpoint:
        'https://1j40svxeg3.execute-api.ap-southeast-1.amazonaws.com/prod/',
      region: 'ap-southeast-1',
    },
  ],
});

export default function Home() {
  const [showSurvey, setShowSurvey] = useState(true);
  const onSubmitHandler = (e) => {
    console.log('submitted event: ', e);
    setShowSurvey(e);
  };
  return (
    <div className={styles.container}>
      <Head>
        <title>VietAWS | Meeting #9 | Serverless Security on AWS</title>
      </Head>
      <h1>VietAWS | Meetup #9 | Serverless Security Event on AWS</h1>
      <Authenticator
        signUpAttributes={[
          // 'address',
          // 'birthdate',
          // 'email',
          // 'family_name',
          // 'gender',
          // 'given_name',
          // 'locale',
          // 'middle_name',
          'name',
          // 'nickname',
          // 'phone_number',
          // 'picture',
          // 'preferred_username',
          // 'profile',
          // 'updated_at',
          // 'website',
          // 'zoneinfo',
        ]}
        socialProviders={['amazon', 'google', 'apple', 'facebook']}
      >
        {({ signOut, user }) => (
          <div>
            <h3>Congratulations! Welcome {user.attributes.email}</h3>

            {showSurvey && (
              <SurveyComponent onSubmitHandler={onSubmitHandler} />
            )}
            {!showSurvey && <Thankyou />}
            <button onClick={signOut} style={{ background: 'tomato' }}>
              Sign out
            </button>
          </div>
        )}
      </Authenticator>
    </div>
  );
}

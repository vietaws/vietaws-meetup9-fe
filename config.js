export const config = {
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
};

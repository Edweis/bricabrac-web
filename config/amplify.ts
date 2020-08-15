const AWS_SINGAPORE_REGION = 'ap-southeast-1';
export default {
  s3: {
    REGION: AWS_SINGAPORE_REGION,
    BUCKET: 'YOUR_S3_UPLOADS_BUCKET_NAME',
  },
  apiGateway: {
    REGION: AWS_SINGAPORE_REGION,
    URL: 'YOUR_API_GATEWAY_URL',
  },
  cognito: {
    REGION: AWS_SINGAPORE_REGION,
    USER_POOL_ID: 'ap-southeast-1_gLJs3GqPG',
    APP_CLIENT_ID: '7i29tbrjd5s4cpvs12s4t1ip8l',
    // IDENTITY_POOL_ID: 'YOUR_IDENTITY_POOL_ID',
  },
};

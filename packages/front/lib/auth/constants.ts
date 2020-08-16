const AWS_SINGAPORE_REGION = 'ap-southeast-1';
export default {
  s3: {
    REGION: AWS_SINGAPORE_REGION,
    BUCKET: 'YOUR_S3_UPLOADS_BUCKET_NAME',
  },
  apiGateway: {
    REGION: AWS_SINGAPORE_REGION,
    URL: 'https://5zythygl31.execute-api.ap-southeast-1.amazonaws.com/',
  },
  cognito: {
    REGION: AWS_SINGAPORE_REGION,
    USER_POOL_ID: 'ap-southeast-1_cpnFxrBhd',
    APP_CLIENT_ID: '6v5df39k2hcdji9qmqi2lpn6n8',
    // IDENTITY_POOL_ID: 'YOUR_IDENTITY_POOL_ID',
  },
};

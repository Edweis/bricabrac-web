const AWS_SINGAPORE_REGION = 'ap-southeast-1';
export const TOKEN_STORAGE_KEY = 'bricabrac-jwt';
export const TOKEN_EXPIRE_DAYS = 30;
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
    USER_POOL_ID: 'ap-southeast-1_jAdu30S0K',
    APP_CLIENT_ID: '3bfdu5fo22mgdqnk5m9cfp98s2',
    // IDENTITY_POOL_ID: 'YOUR_IDENTITY_POOL_ID',
  },
};
export const OFFLINE_IDENTITY = '88888888-fd4e-47eb-904d-4c37849b3db5';

// utils/oauthUrls.ts
export const NAVER_AUTH_URL = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=FXmn63c4JEW3_uMt_9sK&state=${Math.random().toString(36).substring(2, 15)}&redirect_uri=https://api.ma-ping.com/api/v1/auth/signup/naver`;

export const GOOGLE_AUTH_URL = `https://accounts.google.com/o/oauth2/auth?client_id=57030810261-lchn2518e3r4h2phih6picav5cqfnh59.apps.googleusercontent.com&redirect_uri=https://api.ma-ping.com/api/v1/auth/signup/google&response_type=code&scope=openid%20email%20profile&access_type=offline`;

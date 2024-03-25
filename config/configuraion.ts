export default {
    port: parseInt(process.env.PORT) || 3000,
    secretToken: process.env.secretToken,
    userUid : process.env.userUid,
    frontendUrl : process.env.FRONTEND_URL
}
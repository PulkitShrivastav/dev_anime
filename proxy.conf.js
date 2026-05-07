const target = process.env.API_URL;

module.exports = {
    '/api': {
        target,
        "secure": false,
        "changeOrigin": true,
        "logLevel": "debug"
    }
};
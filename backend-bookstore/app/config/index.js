const config = {
    app: {
        port: process.env.PORT || 5000,
    },
    db: {
        uri: process.env.MONGO_URI || "mongodb+srv://bachb2014640:bachle24@cluster0.ksanqyk.mongodb.net/?retryWrites=true&w=majority", name : "giftshop"
    }
};
module.exports = config;
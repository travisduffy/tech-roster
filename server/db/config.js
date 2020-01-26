module.exports = {
    DB_URL: `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@mycluster-rm18v.mongodb.net/test?retryWrites=true&w=majority`,
    DB_NAME: process.env.DB_NAME
};
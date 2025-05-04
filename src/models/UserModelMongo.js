const connectToDB = require('../models/MongoModel');


const UserModelMongo = {
    findOrCreateUser: async ({user}) =>
    {
        const db =await connectToDB();
    }
}

module.exports = UserModelMongo
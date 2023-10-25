const mongoose = require('mongoose')
const mongoURI = 'mongodb+srv://gofood:gofood@cluster0.xu4xtmg.mongodb.net/gofood?retryWrites=true&w=majority'  
module.exports = function (callback) {
    mongoose.connect(mongoURI, { useNewUrlParser: true }, async (err, result) => {
        try {
            await mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true, });
            mongoose.set('strictQuery', false);
            console.log("Successfully Connected to Database");
            const foodCollection = await mongoose.connection.db.collection("fooditems");
            foodCollection.find({}).toArray(async function (err, data) {
                const categoryCollection = await mongoose.connection.db.collection("foodcategories");
                categoryCollection.find({}).toArray(async function (err, Catdata) {
                    callback(err, data, Catdata);
                })
            });
            
        }
    catch (err) {
        console.error("Error connecting to Database:", err);
      }
    })
};

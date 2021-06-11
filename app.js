require('dotenv').config;
const app = Express();
const controllers = require('./controllers');
const {CharacterModel} = require('./models');
const dbconnection = require('./db');

dbConnection.authenticate()
.then(() => dbConnection.sync())
.then(() => { 
app.listen(3000, () => {
    console.log(`[Server]: App is listening on 3000.`);
});
})
.catch((err) => {
    console.log(`[Server]: Server crashed. Error = ${err}`);
})
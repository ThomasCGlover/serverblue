// require('dotenv').config();
const Express = require("express");
const app = Express();
app.use(Express.json());
const controllers = require('./controllers');
const dbConnection = require('./db');

app.use('/character', controllers.charactercontroller);


// app.use('/test', (req, res) =>{
//     res.send("This is a message from the test endpoint on the server!")
// });
dbConnection.authenticate()
    .then(() =>dbConnection.sync())
    .then(() =>{
        app.listen(3000, () =>{
            console.log(`[Server]: App is listening on 3000`);
    })
})
.catch((err) =>{
    console.log(`[Server]: Server crashed. Error =${err}`);
})
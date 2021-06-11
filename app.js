require('dotenv').config();
const Express = require('express');
const app = Express();
const dbConnection = require("./db");
const middleware = require('./middleware');

app.use(Express.json());
const controllers = require('./controllers');

app.use(middleware.headers);
app.use("/user", controllers.userController);

app.use('/character', controllers.charactercontroller);

dbConnection.authenticate()
    .then(() => dbConnection.sync())
    .then(() => {
        app.listen(3000, () => {
            console.log(`[Server]: App is listening on 3000.`)
        });
    })
    .catch((err) => {
        console.log(`[Server]: Server crashed. Error = ${err}`)
    });
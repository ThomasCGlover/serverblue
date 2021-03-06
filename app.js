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
    .then(() => dbConnection.sync(
        // {alter: true}
    ))
    .then(() => {
        app.listen(process.env.PORT, () => {
            console.log(`[Server]: App is listening on ${process.env.PORT}.`)
        });
    })
    .catch((err) => {
        console.log(`[Server]: Server crashed. Error = ${err}`)
    });
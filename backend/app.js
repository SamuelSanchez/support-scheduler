//  Imports
const
    express = require('express'),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose'),
    swaggerUi = require('swagger-ui-express'),
    swaggerDoc = require('./swagger.json'),
    local = require('./constants');

//  RestAPI requirements
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));


//  Routes/APIs
const
    groupRoutes = require('./api/GroupRoutes'),
    userRoutes = require('./api/UserRoutes');

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc));
app.use('/api/v1/groups', groupRoutes);
app.use('/api/v1/users', userRoutes);


//  Start App
mongoose.connect(local.mongoUrl);

app.listen(local.port, (err) => {
    if(!err) {
        console.log("Listening to port: %d", local.port);
    } else {
        console.log("Error starting server!", err);
    }
});
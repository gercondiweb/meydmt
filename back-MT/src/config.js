require('dotenv').config();
const appsetting = require('../appsettings.json');

module.exports ={
    app: appsetting.app,
    jwt: appsetting.jwtSecret,
    mysql: appsetting.connectionDB
}


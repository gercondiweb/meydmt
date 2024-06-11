require('dotenv').config();

module.exports ={
    app:{
        port: process.env.PORT || 4002,
    },
    jwt:{
        secret: process.env.JET_SECRET || 'notaSecreta'
    },
    mysql:{
        host: process.env.DB_HOST || 'localhost',
        user: process.env.DB_USER || 'root',
        port: process.env.DB_PORT || 3306,
        password: process.env.DB_PASSWORD || '123456',
        database: process.env.DB_NAME || 'meydmt'

    }
}


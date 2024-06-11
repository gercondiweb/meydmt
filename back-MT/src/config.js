require('dotenv').config();

module.exports ={
    app:{
        port: process.env.PORT || 4002,
    },
    jwt:{
        secret: process.env.JET_SECRET || 'notaSecreta'
    },
    /*mysql:{
        host: process.env.DB_HOST || 'localhost',
        user: process.env.DB_USER || 'root',
        port: process.env.DB_PORT || 3306,
        password: process.env.DB_PASSWORD || '123456',
        database: process.env.DB_NAME || 'meydmt'

    }*/
    mysql:{
        host: process.env.DB_HOST || 'database-1.cv2mw8skajbw.us-east-2.rds.amazonaws.com',
        user: process.env.DB_USER || 'admin',
        port: process.env.DB_PORT || 3306,
        password: process.env.DB_PASSWORD || 'M4r14n4D3b0+$',
        database: process.env.DB_NAME || 'meydmt'

    }
    
}


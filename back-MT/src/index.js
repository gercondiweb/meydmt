const app = require('./app');

app.listen(app.get('port'), ()=>{
    console.log("Escuchando el puerto", app.get('port'));
});
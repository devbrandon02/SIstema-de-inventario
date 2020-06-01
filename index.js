const express = require('express');
const body = require('body-parser');
const hbs = require('hbs');
const app = express();
const port = 3000;

//Middleware para convertir entradas de datos a JSON 
app.use(body.urlencoded({ extended: false }));
app.use(body.json());


app.use(require('./Controllers/loginController'));

//Middleware para renderizar .hbs
app.set('view engine', 'hbs');
app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
    res.render('login');
})


//Conexion a base de datos
app.use(require('./db/db'))

app.listen(port, () => {
    console.log('Server funcionando correctamente en el puerto ' + port);
})



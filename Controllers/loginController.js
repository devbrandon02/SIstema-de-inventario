const Dbconnection = require('../db/db');
const { verificaToken } = require('../middlewares/verificaToken');
const jwt = require('jsonwebtoken');
const express = require('express');
const connect = Dbconnection();
const bcrypt = require('bcrypt');
const app = express();

//Ruta que maneja los registros de usuarios
app.post('/api/registro', verificaToken,  (req, res) => {
    let body = req.body;
    let passwordEncryp = bcrypt.hashSync(body.password, 10);
    
    let SQL = "INSERT INTO Empleados (cedula, nombre, apellido, email, password, role) VALUES(?,?,?,?,?,?)"

    let value = [ body.cedula, body.nombre, body.apellido, body.email, passwordEncryp , body.role];

    connect.query(SQL, value , (err) => {
        if(err){
            if(err.code === 'ER_DUP_ENTRY' || err){
                return res.status(500).json({
                    ok: false,
                    err: '¡Este usuario ya existe!',
                    error: err.sqlMessage
                })
        }
        } else{
            return res.status(200).json({
                ok: true,
                mensaje: 'Usuario registrado exitosamente',

                usuarioRegistrado: {
                    cedula: body.cedula, 
                    nombre: body.nombre, 
                    apellido: body.apellido,
                    email: body.email,
                    role: body.role
                },
            })
        }
    })
})

//Ruta que maneja el inicio de sesion del usuario

app.post('/api/login', (req, res) => {
    let email = req.body.email;
    let password = req.body.password;

    let SQL = 'SELECT * FROM Empleados WHERE email = ?';
    connect.query(SQL, email, (err, result, fields) => {
        let passwordDb = result[0].password;

        usuarioDb = {
            id: result[0].id,
            cedula: result[0].cedula,
            nombre: result[0].nombre,
            apellido: result[0].apellido,
            email: result[0].email,
            role: result[0].role
        }

        if(err){
            return res.status(500).json({
                ok: false,
                err: err
            })
        }

        if(!bcrypt.compareSync(password, passwordDb)){
            return res.status(400).json({
                ok: false,
                err: 'Usuario o contraseña incorrecta'
            })

        } else{
            let token = jwt.sign({
                usuario: usuarioDb
            }, 'Secret-semilla-cow-02', {expiresIn: 60 * 60 * 24 * 30}) 
            
            res.status(200).json({
                ok: true,
                mensaje: 'Inicio de sesion exitoso',
                usuarioDb,
                token
            })

        }
    })      
})
module.exports = app;
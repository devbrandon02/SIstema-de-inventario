const jwt = require('jsonwebtoken');


let verificaToken = (req, res, next) => {
    let token = req.get('token');

    jwt.verify(token, 'Secret-semilla-cow-02', (err, decoded) => {
        if(err){
            res.status(401).json({
                ok: false,
                err: 'Usted no esta autenticado'
            })

        } else{
            req.usuarioDb = decoded.usuario;
            next();
        }
    })
}


module.exports = {
    verificaToken
}
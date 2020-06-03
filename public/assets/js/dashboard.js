import * as UI from './interfaz.js';
import * as tokenLogin from './main.js';

let token = localStorage.getItem('token');

VerificarTokenLocal(token)
// ===========================================
// EVENT LISTENER DEL BOTON CERRAR SESION
//============================================

console.log();

UI.botonCerrar.addEventListener('click', (evt) => {
    evt.preventDefault();
    localStorage.removeItem('token');

    window.location.replace = '/';
});


    function VerificarTokenLocal(token) {
        if(token != tokenLogin.token){
            window.location ='/'
        }

};
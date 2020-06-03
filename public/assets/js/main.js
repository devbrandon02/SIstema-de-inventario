import { ApiLogin } from './api.js';
import * as UI from './interfaz.js';
export var token_recibido = '';

// ===========================================
// EVENT LISTENER DEL LOGIN
//============================================

//Eventos para validar el campo email
UI.loginBtn.addEventListener('click', (evt) =>{
    evt.preventDefault();
    let mensaje = 'Por favor rellene todos los valores';

    const email = document.getElementById('email').value,
          password = document.getElementById('password').value

    const mensajeError = UI.mensajeError,
          mensajeCorrecto = UI.mensajeCorrecto

    if(mensajeError.textContent = null){
        mensajeError.style.display = 'none';
    
    }else if(email.length <= 0 || email == null || password === '' || password == null || password.length < 4){

        mensajeError.append(document.createTextNode(mensaje));    
        mensajeError.style.display = 'block';
    }
    else{
        const api = new ApiLogin(email, password);
            api.InicioSesion()
                .then(data => {
                    //Validamos que el inicio de sesion sea exitoso
                    console.log()
                    if(data.ok){
                        mensaje = 'Inicio de Sesion Exitoso...';
                        mensajeCorrecto.textContent = ''
                        mensajeError.style.display = 'none';
                        mensajeCorrecto.append(document.createTextNode(mensaje));
                        mensajeCorrecto.style.display = 'block'

                        window.location = '/dashboard'
                        setTimeout(() => {
                            mensajeCorrecto.style.display = 'none'
                        }, 3000)  
                        
                        guardarTokenLocalStorage(data)

                        
                    }else{
                        mensajeError.append(document.createTextNode('Usuario o contraseña incorrectas'));    
                        mensajeError.style.display = 'block';
                        UI.formulario.reset();
                    }


                }).catch((err) => {
                        mensajeError.style.display = 'none';
                        mensajeError.append(document.createTextNode(err));    
                        mensajeError.style.display = 'block';
            })
    }
})

// ===========================================
// Guardamos datos del login en localstorage
//============================================

function guardarTokenLocalStorage(data){
    localStorage.setItem('token', data.token);
    
    return data.token;
}




    
    





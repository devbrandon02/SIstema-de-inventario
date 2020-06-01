const mensajeCorrecto = document.querySelector('.mensaje-correcto');
const mensajeError = document.querySelector('.mensaje-error');
const loginBtn = document.querySelector('.loginBtn');
let url = 'http://localhost:3000';
// ===========================================
// EVENT LISTENER DEL LOGIN
//============================================

//Eventos para validar el campo email
loginBtn.addEventListener('click', validarFormulario);




// ===========================================
// FUNCIONES DE LOS EVENTOS
//============================================

//Funcion para validar los campos
function validarFormulario(evt){
    evt.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    let mensaje = 'Por favor rellene todos los valores';

    if(mensajeError.textContent = null){
        mensajeError.style.display = 'none';

    }else if(email.length <= 0 || email == null || password.length < 6 || password == null){
        mensajeError.append(document.createTextNode(mensaje));    
        mensajeError.style.display = 'block';
    
    } else{
        enviarDatos(email, password);
    }
    
    
}
    //Funcion que enviara datos a la apiREST
    async function enviarDatos(email, password){
        const formulario  = document.querySelector(".form");
        let mensaje = 'Usuario o contraseña incorrectas';

        
            await fetch(`${url}/api/login`, {
            method: 'POST',
            body: JSON.stringify({email: email, password: password}),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              }
        })
        .then(res => res.json())
        .then((data) => {
                //Validamos que el inicio de sesion sea exitoso
                if(data.ok){
                    mensaje = 'Inicio de Sesion Exitoso...';

                    mensajeCorrecto.textContent = ''
                    mensajeError.style.display = 'none';
                    mensajeCorrecto.append(document.createTextNode(mensaje));
                    mensajeCorrecto.style.display = 'block'  
                    
                    setTimeout(() => {
                        mensajeCorrecto.style.display = 'none'
                    }, 2000)  
                    
                    localStorage.setItem('token', data.token);
                    
                } else{
                    
                    mensajeError.append(document.createTextNode(mensaje));    
                    mensajeError.style.display = 'block';
                    formulario.reset();
                }


            }).catch((err) => {
                mensajeError.append(document.createTextNode(err));    
                mensajeError.style.display = 'block';
            })
}

export class ApiLogin {
    constructor(email, password){
        this.email = email;
        this.password = password
    }

    //Metodo que hace peticion del login al backend
    async InicioSesion(){
            let url = 'http://localhost:3000';

            const urlPeticion = await fetch(`${url}/api/login`, {
            method: 'POST',
            body: JSON.stringify({email: this.email, password: this.password}),
            headers: {'Accept': 'application/json','Content-Type': 'application/json'}
        })
            const respuesta = await urlPeticion.json();
            
            return respuesta;
    }
}
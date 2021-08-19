window.onload = function (){
    btnRegistrar = document.getElementById("btnRegistrar");
    ingreso = document.getElementById("ingreso");
    registro = document.getElementById("registro");
    principal = document.getElementById("principal");
    mensajes = document.getElementById("redactar");
    txtCorreo = document.getElementById("correoR");
    txtNombre = document.getElementById("nombreR");
    txtContrasena = document.getElementById("contrasenaR");
    txtConfirmacion = document.getElementById("confirmacionR");
    txtFecha = document.getElementById("fechaR");
    btnRegistro = document.getElementById("btnRegistro");
    btnIngresar = document.getElementById("btnIngresar");
    txtCorreoI = document.getElementById("correoI");
    txtContrasenaI = document.getElementById("contrasenaI");
    nombreP = document.getElementById("nombreP");
    btnEnviarM = document.getElementById("enviarM");
    photo = document.getElementById("photo");
    camera = document.getElementById("camera");
    opens = document.getElementById("opens");
    //txtcorreoM = document.getElementById("correoM");
    //txtmensajeM = document.getElementById("mensajeM");
    if (localStorage.getItem("login")!="1"){
        ingreso.style.display = "block";
        principal.style.display = "none";
        mensajes.style.display = "none";
        document.getElementById("camara").style.display = "none";
    }
    else{
        ingreso.style.display = "none";
        principal.style.display = "none";
        mensajes.style.display = "none";
        nombre = localStorage.getItem("nombre");
        correo = localStorage.getItem("correo");
        document.getElementById("nombreP").innerHTML = nombre;
        leerM();
    }
}

btnRegistrar.addEventListener("click",function() {
    ingreso.style.display = "none";
    registro.style.display = "block";
});

btnRegistro.addEventListener("click", function() {
    if (txtCorreo.value == "") {
        alert("Debe escribir un correo");
        txtCorreo.classList.add("errorCampo");
        return false;
    }
    else{
        txtCorreo.classList.remove("errorCampo");
    }
    if (txtNombre.value ==""){
        alert("Debe colocar su nombre");
        txtNombre.classList.add("errorCampo");
        return false;
    }
    else{
        txtNombre.classList.remove("errorCampo");
    }
    if (txtContrasena.value ==""){
        alert("Debe colocar la contraseña");
        txtContrasena.classList.add("errorCampo");
        return false;
    }
    else{
        txtContrasena.classList.remove("errorCampo");
    }
    if (txtConfirmacion.value == ""){
        alert("Debe confirmar su contraseña");
        txtConfirmacion.classList.add("errorCampo");
        return false;
    }
    else{
        txtConfirmacion.classList.remove("errorCampo");
    }
    if(txtContrasena.value !== document.getElementById("confirmacionR").value){
        alert("La contraseña y la confirmacion no coiciden");
        txtConfirmacion.classList.add("errorCampo");
        return false;
    }else{
        txtConfirmacion.classList.remove("errorCampo");
    }
    if (txtFecha.value ==""){
        alert("Debe colocar su fecha de nacimiento");
        txtFecha.classList.add("errorCampo");
        return false;
    }
    else{
        txtFecha.classList.remove("errorCampo");
    }

    let datos =new FormData();
    datos.append("correoR", txtCorreo.value);
    datos.append("nombreR", txtNombre.value);
    datos.append("contrasenaR",txtContrasena.value);
    datos.append("fechaR",txtFecha.value);

    fetch("http://tparvs.orgfree.com/registro.php",{
       method: 'POST', //*GET, POST, PUT, DELETE,ETC.
       body: datos
    })
    .then(function (response){
        if(response.ok){
            alert("Usuario registrado");
        }
        else{
            alert("Ocurrio un error al registrar");
            console.log(response);
        }
    })
    .catch(function(err){
        alert("Ocurrio un error inesperado");
        console.log(err)
    });

});

btnIngresar.addEventListener("click", function(){
    if (txtCorreoI.value =="") {
        alert("Debe escribir un correo");
        txtCorreoI.classList.add("errorCampo");
        return false;
    }
    else{
        txtCorreoI.classList.remove("errorCampo");
    }
    if (txtContrasenaI.value ==""){
        alert("Debe colocar la contraseña");
        txtContrasenaI.classList.add("errorCampo");
        return false;
    }
    else{
        txtContrasenaI.classList.remove("errorCampo");
    }
    let datosI =new FormData();
    datosI.append("correoI", txtCorreoI.value);
    datosI.append("contrasenaI",txtContrasenaI.value);

    fetch("http://tparvs.orgfree.com/ingreso.php",{
       method: 'POST', //*GET, POST, PUT, DELETE,ETC.
       body: datosI
    })
    .then(function (response){
        return response.json();
    })
    .then(function(data){
        if (data.fallo == "contasena"){
            alert("Debe escribir la contraseña correcta");
        }
        else{
            nombre = data.nombre;
            correo = data.correo;
            ingreso.style.display = "none";
            principal.style.display = "block";
            nombreP.innerHTML = nombre;
            localStorage.setItem("login", 1); //localStorage guarda valores aislados
            localStorage.setItem("nombre", nombre);
            localStorage.setItem("correo", correo);
            leerM();
        }
    })
    .catch(function(err){
        alert("Ocurrio un error inesperado");
        console.log(err)
    });
});
document.getElementById("enviarM").addEventListener("click", function(){
    if(txtcorreoM==""){
        alert("Debe colocar el correo del otro usuario");
        txtcorreoM.classList.add("errorCampo");
        return false;
    }
    else{
        txtcorreoM.classList.remove("errorCampo");
    }
});

function abrirBarra(){
    document.getElementById("barraMenu").style.width="250px";
}//abirBarra
function cerrarBarra(){
    document.getElementById("barraMenu").style.width="0";
}//cerrarBarra

function leerM(){
    let datosLM =new FormData();
    datosLM.append("correoUsuario", correo);
    fetch("http://tparvs.orgfree.com/leerMensajes.php",{
       method: 'POST', //*GET, POST, PUT, DELETE,ETC.
       body: datosLM
    })
    .then(function (response){
        return response.json();
    })
    .then(function(data){
        for(let x = 0; x<data.length; x++) {
            document.getElementById("mensajes").innerHTML = document.getElementById("mensajes").innerHTML + data[x].mensaje + "<br>" + data[x].fechahora + "<br>";
        }
    });
}//leerMensaje
opens.addEventListener("click",function(){
    camera.click();//se le da click por codigo
});
camera.addEventListener("change", function(e){
    obtenerLugar();
    photo.src = URL.createObjectURL(e.target.files[0]);//basicamente convierte la foto que tomo la camara en un url, que el navegador lo puede traducir en una imagen
    let link = document.createElement('a');//mete una etiqueta de html dentro de la pagina automaticamente cuando se ejecuta la instruccion
    if (obtenerSO()=="iOS"){
        link.download = "test.ping";
        link.href = photo.toDataURL("image/png").replace("image/png", "iamge/octet-stream");//la va a descargar mediante la transmicion de datos
        link.click();//termina el proceso de tomar la foto
        alert("Foto capturada");
    }
});
function obtenerSO(){
    let so = null;
    let platform = window.navigator.platform,
    iosPlatforms = ['iPhone', 'iPad', 'iPod'];
    if (iosPlatforms.includes(platform)){
        so = 'iOS';
    }
    return so;
}//obtenerSO
mapa.addEventListener('click', function(){
    window.open("http://nominatim.openstreetmap.org/?mlat=" + coordenadas.lat + "&mlon=" + coordenadas.lon + "&zoom=20");
});
function obtenerLugar(){
    coordenadas = {lat: 0, lon: 0};
    navigator.geolocation.getCurrentPosition(function(position){
        coordenadas = {lat: position.coords.latitude, lon: position.coords.longitude}

        fetch("http://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=" + coordenadas.lat + "&lon" + coordenadas.lon)
        .then(response => response.json())
        .then(data => {
            document.getElementById("lugar").value = data.address.country + " " + data.address.state;
        })
        .catch(error =>{
            console.log(error);
            coordenadas = {lat: 0, lon: 0};
        });
    });
}
function cerrarSesion(){
    cerrarBarra();
    localStorage.removeItem("nombre");
    localStorage.removeItem("correo");
    localStorage.setItem("login", 0);
    //localStorage.clear();
    mensajes.style.display = "none";
    document.getElementById("principal").style.display = "none";
    document.getElementById("mensajes").style.display = "none";
    document.getElementById("camara").style.display = "none";
    document.getElementById("ingreso").style.display = "block";
} //cerrarSesion

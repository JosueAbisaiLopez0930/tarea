// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// No Node.js APIs are available in this process because
// `nodeIntegration` is turned off. Use `preload.js` to
// selectively enable features needed in the rendering
// process.
const mysql = require('mysql');
const conexion = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'Mognor19',
    database:'sakila',
});

conexion.connect(function(error){
    if(error){
        console.log(error);
        return;
    }
    console.log('Conexion Exitosa');
});
const txtBusqueda = document.getElementById('txt-busqueda');
const formFiltrar = document.getElementById('form-filtrar');
const resultados = document.getElementById('resultados')
formFiltrar.addEventListener('submit', function(ext) {
    ext.preventDefault();
});

txtBusqueda.addEventListener('keyup',function(evt) {
    if(evt.code === "Enter") {
        //Realizar la busqueda en la base de datos
        conexion.query("select * from actor where firs_name like ?", [`%${txtBusqueda.value}%`], function(err, filas, campos) {
            if(er){
                console.log(`Algo salio mal: ${err}`);
            }
            let html = '<div>';
            for(let fila of filas){
                html += `<h3>${fila.first_name}</h3>`;
                html += `<h4>${fila.last_name}</h4>`;
            }
            html +="</div>"
            resultados.innerHTML = html;
        });
    }
});
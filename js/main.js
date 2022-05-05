(function()  {
    "use strict";

    var regalo = document.getElementById('regalo');

    document.addEventListener('DOMContentLoaded', function(){
        
        // Campos datos de usuario
        var nombre = document.getElementById('nombre');
        var apellido = document.getElementById('apellido');
        var email = document.getElementById('email');

        // Campos pases
        var pase_dia = document.getElementById('pase_dia');
        var pase_dosdias = document.getElementById('pase_dosdias');
        var pase_completo = document.getElementById('pase_completo');

        //Botones y divs
        var calcular = document.getElementById('calcular');
        var errorDiv = document.getElementById('error');
        var botonRegistro = document.getElementById('btnRegistro');
        var lista_productos = document.getElementById('lista-productos');
        var totales = document.getElementById('suma-total');

        //Extras
        var etiquetas = document.getElementById('etiquetas');
        var camisas = document.getElementById('camisa_evento');


        calcular.addEventListener('click', calcularMontos);

        pase_dia.addEventListener('blur', mostrarDias);
        pase_dosdias.addEventListener('blur', mostrarDias);
        pase_completo.addEventListener('blur', mostrarDias);

        nombre.addEventListener('blur', validarCampos);
        apellido.addEventListener('blur', validarCampos);
        email.addEventListener('blur', validarCampos);
        // email.addEventListener('blur', validarMail);

        function validarCampos(event){
            if(event.srcElement.value ===''){
                errorDiv.style.display = 'block';
                errorDiv.innerHTML = 'El campo ' + event.srcElement.name + ' es obligatorio';
                event.srcElement.classList.add('error_campo');
            }else{
                errorDiv.style.display = 'none';
                event.srcElement.classList.remove('error_campo');
                if(event.srcElement.type === 'email'){
                    validarMail(event.srcElement);
                }
            }
            
        }

        function validarMail(element){
            if(element.value.indexOf("@") === -1){
                errorDiv.style.display = 'block';
                errorDiv.innerHTML = 'El Email no es válido, debe contener una @';
                element.classList.add('error_campo');
            }else{
                errorDiv.style.display = 'none';
                element.classList.remove('error_campo');
            }
        }



        function calcularMontos(event){
            event.preventDefault();
            if(regalo.value === '') {
                alert("Debes elegir un regalo");
                regalo.focus();
            }else{
                var boletosDia = parseInt(pase_dia.value, 10) || 0,
                    boletosDosDias = parseInt(pase_dosdias.value, 10) || 0,
                    boletosCompleto = parseInt(pase_completo.value, 10) || 0,
                    cantCamisas = parseInt(camisas.value, 10) || 0,
                    cantEtiquetas = parseInt(etiquetas.value, 10) || 0;
    
                var totalPagar = (boletosDia * 30) + (boletosDosDias * 45) + (boletosCompleto * 50) + (cantCamisas * 9.3) + (cantEtiquetas * 2);
                var listadoProductos = [];

                if(boletosDia !== 0){ 
                    listadoProductos.push(boletosDia + ' Pases por día');
                }
                if(boletosDosDias !== 0){ 
                    listadoProductos.push(boletosDosDias + ' Pases para 2 días');
                }
                if(boletosCompleto !== 0){ 
                    listadoProductos.push(boletosCompleto + ' Pases para todos los días');
                }
                if(cantCamisas !== 0){ 
                    listadoProductos.push(cantCamisas + ' Camisetas');
                }
                if(cantEtiquetas !== 0){ 
                    listadoProductos.push(cantEtiquetas + ' Etiquetas');
                }

                switch(regalo.value){
                    case 'ETI':
                        console.log(regalo.value);
                        listadoProductos.push(' Elegiste Un regalo de Etiquetas');
                        break;
                    case 'PLU':
                        console.log(regalo.value);
                        listadoProductos.push(' Elegiste Un regalo de Pluma');
                        break;
                    case 'PUL':
                        console.log(regalo.value);
                        listadoProductos.push(' Elegiste Un regalo de Pulsera');
                        break;
                }

                var listadoResumen = '';
                listadoProductos.forEach(producto => {
                    listadoResumen += producto + '<br>' 
                });
                lista_productos.innerHTML = listadoResumen;

                totales.innerHTML = '€ ' + totalPagar.toFixed(2);
            }
        }

        function mostrarDias(){
            vaciarTabla(['viernes', 'sabado', 'domingo'])
            var boletosDia = parseInt(pase_dia.value, 10) || 0,
                boletosDosDias = parseInt(pase_dosdias.value, 10) || 0,
                boletosCompleto = parseInt(pase_completo.value, 10) || 0;

            var diasElegidos = [];

            if (boletosCompleto > 0){
                diasElegidos.push('viernes','sabado','domingo');
            }else if (boletosDosDias > 0){
                diasElegidos.push('viernes','sabado');
            }else if (boletosDia > 0){
                diasElegidos.push('viernes');
            }
            
            

            diasElegidos.forEach(dia=>{
                document.getElementById(dia).style.display = 'block';
            
            });
            
        }

        function vaciarTabla(tabla){
            
            tabla.forEach(elemento=>{
                document.getElementById(elemento).style.display = 'none';
            });
        }
        

    }); // DOM CONTENT LOADED

    


})();
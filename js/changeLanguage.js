fetch('../html/components/header.html')
        .then((res) => {
            return res.text();
        })
        .then(async (text) => {
            $(document).ready(function() {
                var lang = localStorage.getItem('lang') || 'es'; 
                var fullLang = localStorage.getItem('fullLang') || 'Español'; 
                var headerData; 
                $('.selectpicker').val('#' + lang);
                $('.selectpicker option:selected').text(fullLang);
                var estado = 0;
                var estadoSiguiente = estado;
                window.onbeforeunload = function() {
                    this.estado+=1;
                }
                function loadHeaderData(lang) {
                var headerFile;
                if (lang === 'es') {
                    headerFile = '../staticData/language/esp.json';
                } else if (lang === 'en') {
                    headerFile = '../staticData/language/eng.json';
                } else if (lang === 'de') {
                    headerFile = '../staticData/language/deu.json';
                }else if (lang === 'fr') {
                    headerFile = '../staticData/language/fr.json';
                }
                else if (lang === 'pt') {
                    headerFile = '../staticData/language/por.json';
                }
                else if (lang === 'ru'){
                    headerFile = '../staticData/language/rus.json';
                }else {
                    headerFile = '../staticData/language/ch.json';
                }
                $.getJSON(headerFile, function(data) {
                    headerData = data;
            
                    $('#perfil-header').text(headerData.header.perfil);
                    $('#nombre-header').text(headerData.header.usuario);
                    $('#login-header').text(headerData.header.iniciarSesion);
                    $('#cerrar-sesion').text(headerData.header.cerrarSesión);
                    $('#registrarse-header').text(headerData.header.registro);
                    $('#mis-eventos-header').text(headerData.header.misEventos);
                    $('#crear-evento-header').text(headerData.header.crearEventos);
                    $('#input-search-head').attr('placeholder', headerData.header.buscar);
                    $('#gestionar-eventos-header').text(headerData.header.gestionarEventos);                   

                    let titulofecha = headerData.filtro.fecha;
                    let tituloaforo = headerData.filtro.aforo;
                    let textadd = headerData.filtro.aplicarFiltros;
                    let titulofiltros = headerData.filtro.categoria;
                    let textdelete = headerData.filtro.borrarFiltros;

                    $('#title-filter').text(headerData.index.verFiltros);

                    $('#otros-category').text(headerData.filtro.otros);
                    $('#charla-category').text(headerData.filtro.charla);
                    $('#asadero-category').text(headerData.filtro.asadero);
                    $('#header-desde-category').text(headerData.filtro.desde);
                    $('#header-hasta-category').text(headerData.filtro.hasta);
                    $('#curso-formativo-category').text(headerData.filtro.cursoFormativo);
                    $('#reunion-informativa-category').text(headerData.filtro.reunionInformativa);
                    $('#header-aforo-category').html('<i class="fa-solid fa-person"></i>'+" "+ tituloaforo);
                    $('#header-fecha-category').html('<i class="fa-solid fa-calendar-days"></i> '+" "+ titulofecha);
                    $('#header-category').html('<i class="fa-solid fa-magnifying-glass-plus"></i> '+ titulofiltros);
                    $('#aplicar-filtros').html('<i class="fa-solid fa-magnifying-glass"></i>'+" <b>"+ textadd+"</b>");
                    $('#borrar-filtros').html('<i class="fa-solid fa-eraser"></i>'+" <b>"+ textdelete+"</b>");

                    let userFooter = headerData.footer.eventosPropios;
                    let calendarFooter = headerData.footer.calendario;
                    let searchFooter = headerData.footer.buscarEventos;
                    let tikTokFooter = headerData.footer.tiktok;
                    let twitterFooter = headerData.footer.twitter;
                    let youtubeFooter = headerData.footer.youtube;
                    let gitHubFooter = headerData.footer.github;
                    let trelloFooter = headerData.footer.trello;
                    let figmaFooter = headerData.footer.figma;
                    let correoFooter = headerData.footer.correo;
                    let whatsappFooter = headerData.footer.whatsapp;
                    let telefonoFooter = headerData.footer.teléfono;

                    $('#develop-footer').text(headerData.footer.desarrollo);
                    $('#contact-footer').text(headerData.footer.contáctanos);
                    $('#about-us-footer').text(headerData.footer.sobreNosotros);
                    $('#planify-footer').text(headerData.footer.planificarEventos);
                    $('#buscar-evento').html('<i class="fa-brands fa-searchengin links-footer"></i>'+ userFooter);
                    $('#planificar-evento').html('<i class="fa-regular fa-user links-footer"></i>'+ calendarFooter);
                    $('#calendario').html('<i class="fas fa-calendar links-footer"></i>'+searchFooter);
                    $('#tik-tok').html('<i class="fa-brands fa-tiktok links-footer"></i>'+ tikTokFooter);
                    $('#twitter').html('<i class="fa-brands fa-twitter links-footer"></i>'+ twitterFooter);
                    $('#youtube').html('<i class="fa-brands fa-youtube links-footer"></i>'+youtubeFooter);
                    $('#git-hub').html('<i class="fa-brands fa-github links-footer"></i>'+ gitHubFooter);
                    $('#trello').html('<i class="fa-brands fa-trello links-footer"></i>'+ trelloFooter);
                    $('#figma').html('<i class="fa-brands fa-figma links-footer"></i>'+figmaFooter);                
                    $('#correo-footer').html('<i class="fa-regular fa-envelope  links-footer"></i>'+ correoFooter);
                    $('#whatsapp-footer').html('<i class="fa-brands fa-whatsapp links-footer"></i>'+ whatsappFooter);
                    $('#telefono-footer').html('<i class="fa-solid fa-phone links-footer"></i> '+telefonoFooter);
                    

                    let modificarPerfil = headerData.perfil.modificarPerfil;
                    let eliminarPerfil = headerData.perfil.eliminarPerfil;
                    let saveChanges = headerData.perfil.guardarCambios;
                    let deleteChanges = headerData.perfil.eliminarCambios;
                    $('#information-profile').text(headerData.perfil.informacionUsuario);
                    $('#nombre-profile').text(headerData.perfil.nombre);
                    $('#correo-profile').text(headerData.perfil.correo);
                    $('#contra-profile').text(headerData.perfil.contraseña);
                    $('#tele-profile').text(headerData.perfil.teléfono);
                    $('#button-edit-perfil').html('<i class="fa-solid fa-pen-to-square"></i>'+ modificarPerfil);
                    $('#delete-profile').html('<i class="fa-solid fa-trash"></i> '+eliminarPerfil);
                    $('#button-save-perfil').html('<i class="fa-solid fa-floppy-disk"></i> '+ saveChanges);
                    $('#button-delete-perfil').html('<i class="fa-solid fa-trash"></i> '+deleteChanges);

                    $('#nombre-registrarse-label').text(headerData.modalHeader.nombre);
                    $('#telefono-registrarse-label').text(headerData.modalHeader.teléfono);
                    $('#correo-registrarse-label').text(headerData.modalHeader.correo);
                    $('#correo-contra-label').text(headerData.modalHeader.contraseña);
                    $('#correo-repetir-registrarse-label').text(headerData.modalHeader.repetirContraseña);
                    $('#aceptar-condiciones-label').text(headerData.modalHeader.condiciones);
                    $('#exampleModalLabel').text(headerData.modalHeader.registro);
                    $('#registrar-btn').text(headerData.modalHeader.registro);
                    $('.logeate-etiqueta-label').text(headerData.modalHeader.iniciarSesion);
                    $('#correo-logearse-label').text(headerData.modalHeader.correo);
                    $('#contra-logearse-label').text(headerData.modalHeader.contraseña);
                    $('#btn-logearse-modal').text(headerData.modalHeader.iniciarSesion);
                    $('#registrar-correo').attr('placeholder', headerData.modalHeader.ejemploCorreo);
                    $('#registrar-nombre').attr('placeholder', headerData.modalHeader.ejemploNombre);
                    $('#registrar-telefono').attr('placeholder', headerData.modalHeader.ejemploTeléfono);
                    $('#login-correo').attr('placeholder', headerData.modalHeader.ejemploCorreo);

                    $('.crear-event-form-title').text(headerData.crearEvento.crearEvento);
                    $('.modify-event-form-title').text(headerData.crearEvento.modificar);
                    $('#nombre-evento-crear').text(headerData.crearEvento.nombre);
                    $('#lugar-evento-crear').text(headerData.crearEvento.lugar);
                    $('#tipo-evento-crear').text(headerData.crearEvento.tipo);

                    $('#descripcion-evento-crear').text(headerData.crearEvento.descripcion);
                    $('#aforo-evento-crear').text(headerData.crearEvento.aforo);
                    $('#fecha-evento-crear').text(headerData.crearEvento.fecha);
                    $('#hora-evento-crear').text(headerData.crearEvento.hora);
                    $('#foto-evento-crear').text(headerData.crearEvento.foto);
                    $('#info-adicional-evento-crear').text(headerData.crearEvento.informacionAdicional);

                    $('#charla-form-crear-evento').text(headerData.crearEvento.charla);
                    $('#asadero-form-crear-evento').text(headerData.crearEvento.asadero);
                    $('#curso-form-crear-evento').text(headerData.crearEvento.cursoFormativo);
                    $('#otros-form-crear-evento').text(headerData.crearEvento.otros);
                    $('#reunion-form-crear-evento').text(headerData.crearEvento.reunionInformativa);

                    $('#input-create-event-nombre').attr('placeholder', headerData.crearEvento.ejemploNombre);
                    $('#input-create-event-lugar').attr('placeholder', headerData.crearEvento.ejemploLugar);
                    $('#input-create-event-aforo').attr('placeholder', headerData.crearEvento.ejemploAforo);
                    $('#crear_evento_confirm_event-confirm').text(headerData.crearEvento.crear);
                    $('#modify_evento_confirm_event-confirm').text(headerData.crearEvento.modify);

                    $('#confirmar-creacion-titulo').text(headerData.modalCrearEvento.tituloModal);
                    $('#contenido-body-crear-evento').text(headerData.modalCrearEvento.preguntaModal);
                    $('#deleteEventButton-Cancel').text(headerData.modalCrearEvento.cancelar); 
                    $('#CreateEventButtonCreate').text(headerData.modalCrearEvento.crearEvento);

                    $('#nombre-tabla-evento').text(headerData.listaEventos.nombre);
                    $('#fecha-tabla-evento').text(headerData.listaEventos.fecha);
                    $('#tipo-evento-tabla-evento').text(headerData.listaEventos.tipoDeEvento);
                    $('#estado-tabla-evento').text(headerData.listaEventos.estado);
                    $('#header-lista-eventos-usuario').text(headerData.listaEventos.listaDeEventos);
                    $('#excel-button').text(headerData.listaEventos.descargarListaEventos);
                    fetch('../html/eventView.html')
                        .then((res) => {
                            return res.text();
                        })
                        .then(async (text) => {
                                setTimeout(function() {
                                const variable = document.querySelector("#inscripcion-info-event");
                                if(variable){
                                    variable.textContent = headerData.infoEvento.inscripcion;
                                }
                                const variabl =  document.querySelector("#entradas-disponibles-event");
                                if(variabl){
                                variabl.textContent = headerData.infoEvento.entradasDisponibles;}

                                const variable3 = document.querySelector("#info-show-event");
                                if(variable3){
                                variable3.textContent = headerData.infoEvento.infoEvento;}

                                const variable1 = document.querySelector("#disponible-hasta-texto");
                                if(variable1){
                                variable1.textContent = headerData.infoEvento.disponibleHasta;}

                                const variable4 = document.querySelector("#info-show-aditional");
                                if(variable4){
                                variable4.textContent = headerData.infoEvento.infoAdicionalEvento;
                                }
                                const variable5 = document.querySelector("#button-inscription");
                                if(variable5){
                                    variable5.textContent = headerData.infoEvento.inscripcion;}
                            }, 2000);
                        });
                });
                }
            
                $('.selectpicker').val('#' + lang);

                $('.selectpicker option:selected').text(fullLang);

                setInterval(checkLanguage, 500);
                

                
                function checkLanguage() {
            
                var newLang = $('.selectpicker').val().substring(1);     
                var registrarseValue = $('#registrarse-header').text();
                if (newLang !== lang || registrarseValue.length == 0) { 
                    localStorage.setItem('lang', newLang);
                    localStorage.setItem('fullLang', $('.selectpicker option:selected').text());
                    lang = newLang;
                    loadHeaderData(lang); 
                }
                }
                setInterval(checkLanguage, 500);
            });
        }
    );
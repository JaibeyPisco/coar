import Loader from './LoaderStatic.js';
import HELPER from './Helper.js';
import requireFilesApp from './requireFilesApp.js';

const contenedor_principal = document.getElementById('contenedor_principal');


let Main = {

    tiempo_inicial: 0,

    calcular_tiempo: () => {

        if (Main.tiempo_inicial >= 3) {
            let menu = document.querySelector('#mensaje_lento');
            menu.style.display = "block";
        }

        Main.tiempo_inicial++;

    },

    initialize: async () => {

        let interval_function = setInterval(() => {
            Main.calcular_tiempo();

            if (Main.tiempo_inicial > 3) {
                clearInterval(interval_function);
            }
        }, 1000);

        axios({
            method: 'post',
            url: BASE_API + 'app/initial',
            headers: {
                'Token': localStorage.getItem("Token"),
                'tipo': 'initial'
            },
        })
            .then(function (response) {

                clearInterval(interval_function);

                var data = response.data;


                if (data.usuario.tipo_persona == 'CLIENTE') {
                    /** VIEW APP SYSTEM*/
                    Main.body('app_cliente', data);

                } else if (data.usuario.tipo_persona == 'ESTUDIANTE') {

                    Main.body('app_estudiante', data);
                }
                else {
                    /** VIEW APP SYSTEM*/
                    Main.body('app', data);
                }

            }).catch(error => {

                clearInterval(interval_function);

                /*** VIEW LOGIN */
                Main.body('autenticacion', error.response.data);
            });
    },

    body: async (tipo, data_user = null) => {
        await (async () => {


            if (tipo != 'autenticacion') {
                let html_main = null;

                switch (tipo) {

                    case 'app_cliente':

                        html_main = await import('../views_cliente/componentes/Main_app.js');
                        await $('#contenedor_principal').html(html_main.default.render(data_user));

                        break;

                    case 'app':

                        html_main = await import('../views/componentes/Main_app.js');
                        await $('#contenedor_principal').html(html_main.default.render(data_user));
                        break;

                    case 'app_estudiante':

                        // DRAW BODY APP
                        // html_main = await import('../views_estudiante/componentes/Main_app.js');
                        // await $('#contenedor_principal').html(html_main.default.render(data_user));
                }

                const rutas = requireFilesApp(BASE_ASSETS);

                Loader.requireFiles(rutas, async function () {


                    setConfigClientRequest();
                    setConfigLibrary();

                    html_main.default.after_render(data_user);

                    // ENRUTADOR        
                    let modulo = await import('./Sammy_router.js');
                    await modulo.default.run(tipo, data_user);
                    contenedor_principal.style.display = 'block';

                    Main.hide_preloader();


                });

            } else if (tipo == 'app') {
                // DRAW BODY APP
                let html_main = await import('../views/componentes/Main_app.js');
                await $('#contenedor_principal').html(html_main.default.render(data_user));
                html_main.default.after_render(data_user);

                // ENRUTADOR        
                let modulo = await import('./Sammy_router.js');
                await modulo.default.run(tipo, data_user);
                contenedor_principal.style.display = 'block';

                Main.hide_preloader();
            } else {
                const rutas = [

                    `${BASE_ASSETS}library/bootstrap-notify.min.js`,
                    `${BASE_ASSETS}css/autenticacion.css`,

                    'https://unpkg.com/nprogress@0.2.0/nprogress.js',
                    'https://unpkg.com/nprogress@0.2.0/nprogress.css'
                ];

                Loader.requireFiles(rutas, async function () {

                    setConfigClientRequest();

                    // ENRUTADOR        
                    let modulo = await import('./Sammy_router.js');
                    await modulo.default.run(tipo, data_user);
                    contenedor_principal.style.display = 'block';

                    Main.hide_preloader();

                });

                // DRAW BODY AUTENTICATION
                let html_main = await import('../views/componentes/Main_autenticacion.js');
                await $('#contenedor_principal').html(html_main.default.render(data_user));
            }


        })();
    },


    hide_preloader: async () => {

        // DESACTIVAR PRELOADER
        var preloader = document.getElementById('loader');
        if (!preloader.classList.contains('done')) {
            preloader.classList.add('done');
        }

    }

}

function setConfigClientRequest() {

    function loaderProcess(text = 'Procesando...') {

        let mensaje = `
            <div>
                <div class="lds-ellipsis"><div></div><div></div><div></div><div></div></div>
            </div>
            <div style="margin-bottom:10px; font-weight:600; font-size:16px;">`+ text + `</div>
        `;


        $.blockUI({ message: mensaje });
    }

    window.LOADER = loaderProcess;

    function show_loader() {

        if (typeof NProgress !== 'undefined') {
            NProgress.start();
        }

        document.body.style.cursor = 'wait';
    }

    function hide_loader() {

        document.body.style.cursor = 'default';

        Ladda.stopAll();

        if ($.unblockUI) {
            $.unblockUI();
        }

        if (typeof NProgress !== 'undefined') {
            NProgress.done();
        }

    }

    /** AXIOS INTERCEPCIONES */
    axios.interceptors.request.use(function (config) {

        let fl_loader = true;

        if (config.hasOwnProperty('fl_loader')) {
            fl_loader = config.fl_loader;
        }


        if (fl_loader == true) {
            show_loader();
        }

        let fl_token = true;

        if (config.hasOwnProperty('fl_token')) {
            fl_token = config.fl_token;
        }

        if (fl_token == true) {
            /** ENVIAR TOKEN HEADER AUTORIZATION */
            config.headers.Token = localStorage.getItem("Token");
        }


        return config;
    }, function (error) {
        hide_loader();
        return Promise.reject(error);
    });

    axios.interceptors.response.use(function (response) {
        hide_loader();

        return response;
    }, function (error) {

        hide_loader();

        if (error.response.status == '401') {
            if (error.response.data.tipo != 'initial') {
                location.reload();
            }
            else {
                alert(error.response.data.mensaje);
            }
        } else {

           
        }


        return Promise.reject(error);
    });

    /** AJAX JQUERY GLOBAL */

    $.ajaxSetup({

        beforeSend: function (xhr, content = null) {
            xhr.setRequestHeader('Token', localStorage.getItem("Token"));
            show_loader();
        },
        complete: function (data) {

            if (data.status == 401) {
                location.reload();
            }

            hide_loader();
        },

        error: function (x, status, error) {
            if (x.status == 401) {
                location.reload();
            } else {
                console.log("AJAX - Error: " + status + "nError: " + error)
            }

            hide_loader();
        }
    });

    $.ajaxSetup({
        statusCode: {
            401: function (response) {
                location.reload;
            }
        }
    });
}

function setConfigLibrary() {

    /** DATATABLE */
    $.extend(true, $.fn.dataTable.defaults, {
        dom: 'Bfrtip',
        dom: "<'row'<'col-md-6'B><'col-md-6'f>>" +
            "<'row'<'col-sm-12'tr>>" +
            "<'row'<'col-sm-12 col-md-5'i><'col-sm-12 col-md-7'p>>",
        buttons: [
            {
                extend: 'print',
                exportOptions: { columns: ':visible', stripHtml: false },
                text: '<i class="fadeIn animated bx bx-printer"></i>Imprimir',
                className: 'btn-sm',
                footer: true,
            },
            {
                extend: 'excelHtml5',
                exportOptions: { columns: ':visible' },
                text: '<i class="fadeIn animated bx bx-spreadsheet"></i>Excel',
                className: 'btn-sm ',
                footer: true,
            },
            {
                extend: 'colvis',
                className: 'btn-sm',
                text: "Mostrar Columnas",
            }
        ],

       // responsive: true,
        paginate: false,
        scrollY: (window.innerHeight - 320) + "px",
        scrollX: true,
        scrollCollapse: false,
        colReorder: true,

        createdRow: function (row, data, indice) {

            $(row).attr('data-json', JSON.stringify(data));
            row.setAttribute('data-fila', 'true');

            if (data.fl_estado == 0) {
                $(row).find('td').css('text-decoration', 'line-through').css('color', 'red');
            }
        },
    });

    // DESHABILITAR ALERTAS DATATABLE
    //$.fn.dataTable.ext.errMode = 'throw';

    $.fn.dataTable.ext.errMode = function (settings, helpPage, message) {
        console.log(settings);
        console.log(helpPage);
        console.log(message);
    };


    moment.locale('es', {
        months: 'Enero_Febrero_Marzo_Abril_Mayo_Junio_Julio_Agosto_Septiembre_Octubre_Noviembre_Diciembre'.split('_'),
        monthsShort: 'Enero._Feb._Mar_Abr._May_Jun_Jul._Ago_Sept._Oct._Nov._Dec.'.split('_'),
        weekdays: 'Domingo_Lunes_Martes_Miercoles_Jueves_Viernes_Sabado'.split('_'),
        weekdaysShort: 'Dom._Lun._Mar._Mier._Jue._Vier._Sab.'.split('_'),
        weekdaysMin: 'Do_Lu_Ma_Mi_Ju_Vi_Sa'.split('_')
    }
    );


    // SELECT2

    $.fn.select2.defaults.set("language--noResults", function (args) {
        return "Sin resultados";
    });

    $.fn.select2.defaults.set("language--searching", function (args) {
        return "Buscando...";
    });

    /*** JQUERY VALIDATOR */

    jQuery.validator.setDefaults({

        ignore: '*:not([name])',
        onkeyup: false,
        onclick: false,
        onfocusout: false,
        event: "blur",
        debug: true,

        showErrors: function (errorMap, errorList) {
            var mensaje = '<div style="text-align:left;"><strong>Existe campos vacíos que son requeridos</strong> <br>';

            $.each(errorList, function (key, entry) {
                mensaje += '- ' + entry.message + ' <br>';
            });

            mensaje += '</div>'

            if (errorList.length > 0) {
                HELPER.notificacion(mensaje, 'warning');
            }
        }
    });


}

export default Main;
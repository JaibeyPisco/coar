import Menu_sidebar from './Menu_sidebar.js'
import Helper from '../../../app/config/Helper.js'
import Header from './Header.js';  
 
 

import HELPER from '../../config/Helper.js';

 window.HELPER = Helper;

 let Main = {
    
    render: (data) => {
         
        let usuario = data.usuario;
        let ajuste = data.ajuste;
        let empresa = data.empresa;

        let style_change_color = '';
        let logo_sistema = 'assets/images/icono_brand.png';

        if(usuario.tipo != 'SUPER USUARIO')
        {
             
            GLOBAL.moneda_sistema = ajuste.moneda_sistema;
            GLOBAL.ajuste = ajuste;
            GLOBAL.usuario = usuario;
            GLOBAL.empresa = empresa;

            /**** AJUSTES PERSONALIZADOS VISUAL */
            if(ajuste.fl_sistema_change_color == 1)
            {
                style_change_color = `style="background-color:`+ajuste.sistema_color_bg+`;"`;
            }

            if(ajuste.fl_sistema_logo == 1)
            {
                logo_sistema = BASE_FILES+'images/'+empresa.logo;
            }
        }
         
 
        let part_nombre = usuario.nombre.split(' ');
        let nombre = part_nombre[0];

        let part_apellido = usuario.apellido.split(' ');
        let apellido = part_apellido[0];         
        
        
        let html = `
         
         <!-- =====================CARGAR ESTILOS===================== -->
         

        <style>
            .hidden {
                display: none;
                visibility: hidden;
                height: 0;
                overflow: hidden;
            }
            .chat-window {
                position: fixed;
                bottom: -400px;
                right: 20px;
                width: 300px;
                height: 400px;
                background-color: white;
                border: 1px solid #ccc;
                z-index: 1000;
                transition: all 0.5s ease-in-out;
            }
              
            .chat-window.show {
                bottom: 0;
            }
        </style>
        <!--wrapper-->
        <div class="wrapper">
            <!--sidebar wrapper -->
            <div class="sidebar-wrapper" data-simplebar="true">
                <div class="sidebar-header">

                    <div>
                        <img src="assets/images/logos/logo_coar_transprarente_icono.png" class="logo-icon" alt="logo icon">
                    </div>

                    <div>
                        <h4 class="logo-text">COAR SM</h4>
                    </div>

                    <div class="toggle-icon ms-auto"><i class='bx bx-arrow-back'></i></div>

                </div>`;
                html += Menu_sidebar.render(usuario)+`
            </div>

            <!-- ======================CARGAR EL HEADER=================== -->
            ${Header(BASE_URL, style_change_color, usuario)}
            <!-- =============================================== -->
    
            <!-- Content Wrapper. Contains page content -->
            <div class="page-wrapper">
                <div class="page-content modal-fondo">
                    <div class="row row-cols-12 row-cols-md-12 row-cols-xl-12">
                        <div id="app">
                            <div style="width:100%; text-align:center; margin-top:10%;">
                                <div style="margin:auto; font-size:20px;">Preparando...</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!-- /.content-wrapper -->

            <!--start overlay-->
            <div class="overlay toggle-icon"></div>
            <!--end overlay-->

            <!--Start Back To Top Button--> <a href="javaScript:;" class="back-to-top"><i class='bx bxs-up-arrow-alt'></i></a>

            <footer class="page-footer">
                <p class="mb-0">Derechos Reservados © 2024</p>
            </footer>
        </div>
 
         </div>
         <!-- ./wrapper -->
         
                <!---  MODAL SAVE -->
                    <div class="modal fade" id="main-save_password" data-backdrop="static" style="display:none;">
                        <div class="modal-dialog modal-dialog-centered">
                            <div class="modal-content">
                            <div class="modal-header">
                                <h5 name="save" class="modal-title">Cambiar Contraseña</h5>
                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <form name="save">
                                <div class="modal-body modal-fondo">
                                    <div class="card">
                                        <div class="card-body">
                                            <div class="row">   
                                                <div class="col-md-12">
                                                    <div class="form-group mb-3">
                                                        <label for="password_actual" class="form-label">Contraseña Actual<span class="text-danger"> (*)</span></label>
                                                        <div class="input-group"> <span class="input-group-text bg-transparent"><i class='bx bxs-key' ></i></span>
                                                            <input id="password_actual" type="password" name="password_actual" class="form-control border-start-0 form-control-sm" required maxlength="50" autocomplete="off" />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="col-md-12">
                                                    <div class="form-group mb-3">
                                                        <label for="password_nuevo" class="form-label">Nueva Contraseña <span class="text-danger"> (*)</span></label>
                                                        <div class="input-group"> <span class="input-group-text bg-transparent"><i class='bx bxs-key' ></i></span>
                                                            <input id="password_nuevo" type="password" name="password_nuevo" class="form-control border-start-0 form-control-sm" required maxlength="50" autocomplete="off" />                         
                                                        </div>
                                                    </div>
                                                </div>                                     
                                                <div class="col-md-12">
                                                    <div class="form-group">
                                                        <label for="re_password_nuevo" class="form-label">Repita nueva Contraseña <span class="text-danger"> (*)</span></label>
                                                        <div class="input-group"> <span class="input-group-text bg-transparent"><i class='bx bxs-key' ></i></span>
                                                            <input id="re_password_nuevo" type="password" name="re_password_nuevo" class="form-control border-start-0 form-control-sm" required maxlength="50" autocomplete="off" />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    </div>
                                    <div class="modal-footer">
                                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                                    <button type="submit" class="btn btn-primary">Guardar</button>
                                    </div>
                                </form>
                            </div>
                            <!-- /.modal-content -->
                        </div>
                        <!-- /.modal-dialog -->
                    </div>
                    <!-- /.modal -->
            `;
         return html;
 
     },

    fl_auto_event: true,
 
    after_render: async (data_user) => {
                 
        Menu_sidebar.after_render(data_user);
        /* FIN NOTIFICACIONES */
          
        /** SUBMIT SAVE PASSWORD*/
        $('#main-save_password form[name="save"]').validate({
            submitHandler: function() {
                cambiar_password.submit();
            }
        });   
        
        /** SUBMIT SAVE GLOBAL */
        $('#main-save_global form[name="save"]').validate({
            submitHandler: function() {
                parametro_global.submit();
            }
        });
         
        document.querySelector('#cerrar_sesion').addEventListener('click', function() { 
             cerrar_sesion();
        });
 
        document.querySelector('#cambiar_password').addEventListener('click', function() { 
             cambiar_password.show_modal();
        });

        $(document).on('change', '#select_local_global', function(e) {
            e.stopImmediatePropagation();
            cambiar_local.submit();
        });

        $(document).on('click', 'a[name="link_soporte_cliente"]', function(e) {
            e.stopImmediatePropagation();
            soporte_cliente();
        });

        /*** AUTO OPEN SELECT2 FOCUS */
        $(document).on('focus', '.select2-selection.select2-selection--single', function (e) {
            $(this).closest(".select2-container").siblings('select:enabled').select2('open');
        });

        $('select.select2').on('select2:closing', function (e) {
            $(e.target).data("select2").$selection.one('focus focusin', function (e) {
            e.stopPropagation();
            });
        });
        
        let select = $('#select_local_global');
        select.empty();
        select.append('<option value="">Seleccione...</option>');

        axios.get(BASE_API + 'configuracion/local/get_select')
        .then(function (response) {
            response.data.forEach(row => {
                select.append('<option value="'+row.id_area+'">'+row.nombre_area+'</option>');
            });

            select.select2();
        }).catch(error => {
            console.log(error);
        });
    }

}
 
 export default Main;
 
 // FUNCIONES DEL MAIN

 let soporte_cliente = () => {
    
    axios.get(BASE_API + 'soporte_cliente/get_token')
    .then(function(response) {

        let a = document.createElement('a');
        a.target="_blank";
        a.href= response.data.url;
        a.click();
    }).catch(error => {
    });
 }
 
 let cerrar_sesion = () => {
 
     axios.get(BASE_API + 'autenticacion/logout')
     .then(function(response) {
         localStorage.removeItem('Token');
         location.href = BASE_URL;
 
     }).catch(error => {
         localStorage.removeItem('Token');
         location.href = BASE_URL;
     });
 
 }
 
 let cambiar_password = {
     
     accion_submit: null,
 
     show_modal: () => {
         var accion = 'save_my_password';
         var form = $('#main-save_password form[name="save"]');
 
         /** DATA */
         HELPER.reset_form(form);
         cambiar_password.accion_submit = accion;
 
         $('#main-save_password').modal('show');
     },
 
     submit: () => {
         
         const form = document.querySelector('#main-save_password form[name="save"]');
 
         const data = Object.fromEntries(new FormData(form).entries());
 
         if(data.password_nuevo !== data.re_password_nuevo)
         {
             alert("Las contraseñas no coinciden");
             return false;
         }
 
         var formData = new FormData(form);
 
         axios({
             method: 'post',
             url: BASE_API + 'configuracion/usuario/save_my_password',
             data: formData
         })
         .then(function(response) {
             $('#main-save_password').modal('hide');
             alert("Completado");
             cerrar_sesion();
         }).catch(error => {
             ladda.stop();
         });
     }
 };

 let cambiar_local = {
     
    submit: () => {
        
        const form = document.querySelector('#main-save_local form[name="save_local"]');

        var formData = new FormData(form);

        axios({
            method: 'post',
            url: BASE_API + 'configuracion/usuario/save_local',
            data: formData
        })
        .then(function(response) {
            location.reload();
        }).catch(error => {
            
        });
    }
};
 
 let parametro_global = {
     
     accion_submit: null,
 
     show_modal: () => {
         var accion = 'save_global';
         var form = $('#main-save_global form[name="save"]');
 
         /** DATA */
         HELPER.reset_form(form);
         cambiar_password.accion_submit = accion;
 
         $('#main-save_global').modal('show');
     },
 
     submit: () => {
         
         const form = document.querySelector('#main-save_global form[name="save"]');
 
         const data = Object.fromEntries(new FormData(form).entries());
 
         if(data.password_nuevo !== data.re_password_nuevo)
         {
             alert("Las contraseñas no coinciden");
             return false;
         }
 
         var formData = new FormData(form);
 
         axios({
             method: 'post',
             url: BASE_API + 'configuracion/ajuste_avanzado/save_global',
             data: formData
         })
         .then(function(response) {
             $('#main-save_global').modal('hide');
             location.href = BASE_URL;
         }).catch(error => {
             ladda.stop();
         });
     }
 }
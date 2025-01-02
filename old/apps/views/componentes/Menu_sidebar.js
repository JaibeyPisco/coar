// import Menu_sistema from "./MenuItems/Menu_sistema.js";
// import Menu_tesoreria from './MenuItems/TesoreriaItems.js'
// import Menu_almacen from "./MenuItems/Menu_almacen.js";
import ConfiguracionItems from "./MenuItems/ConfiguracionItems.js";
import OperacionItems from "./MenuItems/OperacionItems.js";

let Menu = {
  render: (usuario, permisos) => {

    if (usuario.tipo == 'SUPER USUARIO') {

      return   /*html*/`
          <ul class="metismenu" id="menu">
              
              <li name="modulo" id="sidebar-reporte">
                <a href="javascript:;" class="has-arrow">
                  <div class="parent-icon"><i class="fadeIn animated bx bx-spreadsheet"></i></div>
                  <div class="menu-title">Configuracion</div>
                </a>
                  <ul >
                    <li id="sidebar-configuracion-general">
                      <a href="#/configuracion/general">
                        <i class="bx bx-right-arrow-alt"></i>General
                      </a>
                    </li>
                  </ul>
                  <ul >
                    <li id="sidebar-configuracion-usuario">
                      <a href="#/usuario">
                        <i class="bx bx-right-arrow-alt"></i>Usuario
                      </a>
                    </li>
                  </ul>
                  <ul >
                    <li id="sidebar-configuracion-membresia">
                      <a href="#/membresia">
                        <i class="bx bx-right-arrow-alt"></i>Membresia
                      </a>
                    </li>
                  </ul>
              </li>
          </ul>      
      `;
    }

    return /*html*/`
      <ul class="metismenu" id="menu">
        <li name="modulo" id="sidebar-dashboard">
          <a href="javascript:;" class="has-arrow">
            <div class="parent-icon"><i class="bx bx-home-circle"></i></div>
            <div class="menu-title">Dashboard</div>
          </a>
          <ul>
            <li id="sidebar-dashboard-general">
              <a href="#/dashboard/general">
                <i class="bx bx-right-arrow-alt"></i>General
              </a>
            </li>
          </ul>
        </li>
        
        ${ConfiguracionItems}
        ${OperacionItems}

        <li name="modulo" id="sidebar-reporte">
          <a href="javascript:;" class="has-arrow">
            <div class="parent-icon"><i class="fadeIn animated bx bx-spreadsheet"></i></div>
            <div class="menu-title">Reportes Generales</div>
          </a>
          <ul >
            <li id="sidebar-reporte-movimiento_informacion">
              <a href="#/reporte/movimiento_informacion">
                <i class="bx bx-right-arrow-alt"></i>Movimiento de Información
              </a>
            </li>
            <li id="sidebar-reporte-incidencias">
              <a href="#/reporte/incidencias">
                <i class="bx bx-right-arrow-alt"></i>Incidencias
              </a>
            </li>
          </ul>
        </li>
      </ul>          
    `;

  },

  after_render: (data_user) => {


    if (data_user.usuario.tipo != 'SUPER ADMINISTRADOR' && data_user.usuario.tipo != 'SUPER USUARIO') {
      let json_permisos = data_user.permisos;

      let sidebar = $('#menu li');

      /** ELIMINAR SUB MODULOS */
      sidebar.each(function (index, value) {

        let encontrado = false;

        //MENU ENCONTRADOS

        json_permisos.forEach(row => {

          if ($(value).attr("id") == 'sidebar-' + row.menu && row.view == 1) {
            encontrado = true;
          }

        });

        // NO ENCONTRADO
        if (encontrado == false) {
          let menu = $(value).attr("id");

          let particion = menu.split("-");

          if (particion.length > 2 && $(value).attr("name") != 'modulo') {
            $(value).remove();
          }

        }

      });

      /** ELIMINAR MODULOS */
      let sidebar_delete = $('#menu li[name="modulo"]');

      sidebar_delete.each(function (index, value) {

        let id = $(value).attr("id");

        if ($('#' + id + ' li').length == 0) {
          $('#' + id).remove();
        }
        else {
          let cantidad_existente = $('#' + id + ' li').length;
          let cantidad_encontrado = 0;

          $('#' + id + ' li[name="modulo"]').each(function () {
            let name = $(this).attr("name");

            if (name == 'modulo') {
              cantidad_encontrado++;
            }

          });

          if (cantidad_encontrado == cantidad_existente) {
            $('#' + id).remove();
          }
        }
      });
    }
    else {

    }
    $('#menu').fadeIn();

    Menu.tree_initial();
  },

  tree_initial: () => {
    /*$(".sidebar-menu").tree();
    $(".sidebar").slimScroll({
        height: ($(window).height()-50)+'px'
    });*/
  }
};

export default Menu;

let Menu = {
  render: (usuario, permisos) => {
    let html = /*html*/`
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

        <li name="modulo" id="sidebar-mensajeria">
          <a href="javascript:;" class="has-arrow">
            <div class="parent-icon"><i class="fadeIn animated bx bx-chat"></i></div>
            <div class="menu-title">Mensajeria</div>
          </a>
          <ul>
            <li id="sidebar-mensajeria-chat">
              <a href="#/mensajeria/chat">
                <i class="bx bx-right-arrow-alt"></i>Chat
              </a>
            </li>
          </ul>
        </li>


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
          </ul>
        </li>
      </ul>          
      `;
      return html;
  },

  after_render: (data_user) => {

    $('#side-menu').fadeIn();

    Menu.tree_initial();
  },

  tree_initial: () => {
    
    // $(".sidebar-menu").tree();
    // $(".sidebar").slimScroll({
    //     height: ($(window).height()-50)+'px'
    // });
    
    
  },
};

export default Menu;

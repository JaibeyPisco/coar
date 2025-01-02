export default function Menu_almacen(){
    return /*html*/`
    <li name="modulo" class="treeview" id="sidebar-almacen">
      <a href="javascript:;" class="has-arrow">
        <div class="parent-icon"><i class="fadeIn animated bx bx-cabinet"></i></div>
        <div class="menu-title">Almacén</div>
      </a>
      <ul>
        <li id="sidebar-almacen-equipo">
          <a href="#/almacen/equipo">
            <i class="bx bx-right-arrow-alt"></i>Equipo
          </a>
        </li>
        <li id="sidebar-almacen-compra_equipo">
          <a href="#/almacen/compra_equipo">
            <i class="bx bx-right-arrow-alt"></i>Compra Equipos
          </a>
        </li>
      </ul>
    </li> 
    `
}
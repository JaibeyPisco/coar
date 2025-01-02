export default function Menu_sistema(){
    return /*html*/`
    <li name="modulo" id="sidebar-sistema">
      <a href="javascript:;" class="has-arrow">
        <div class="parent-icon"><i class='fadeIn animated bx bx-book-content'></i></div>
        <div class="menu-title">Sistema</div>
      </a>
      <ul>
        <li id="sidebar-sistema-categoria">
          <a href="#/sistema/categoria">
            <i class="bx bx-right-arrow-alt"></i>Categoria
          </a>
        </li>
        <li id="sidebar-sistema-curso">
          <a href="#/sistema/curso">
            <i class="bx bx-right-arrow-alt"></i>Curso
          </a>
        </li>
        <li id="sidebar-sistema-compra">
          <a href="#/sistema/compra">
            <i class="bx bx-right-arrow-alt"></i>Compra
          </a>
        </li>
        <li id="sidebar-sistema-entradasalidaproducto">
          <a href="#/sistema/entradasalidaproducto">
            <i class="bx bx-right-arrow-alt"></i>Entrada y <br> Salida Productos
          </a>
        </li>
        <li id="sidebar-sistema-horario">
          <a href="#/sistema/horario">
            <i class="bx bx-right-arrow-alt"></i>Horario <br> SOLPE (Calendario)
          </a>
        </li>
        <li id="sidebar-sistema-incidencia">
          <a href="#/sistema/incidencia">
            <i class="bx bx-right-arrow-alt"></i>Incidencias
          </a>
        </li>
        <li id="sidebar-sistema-planificacion_laboratorios">
          <a href="#/sistema/planificacion_laboratorios">
            <i class="bx bx-right-arrow-alt"></i>Planificación <br> de Laboratorios
          </a>
        </li>
        <li id="sidebar-sistema-producto">
          <a href="#/sistema/producto">
            <i class="bx bx-right-arrow-alt"></i>Producto
          </a>
        </li>
        <li id="sidebar-sistema-proveedor">
          <a href="#/sistema/proveedor">
            <i class="bx bx-right-arrow-alt"></i>Proveedor
          </a>
        </li>
        <li id="sidebar-sistema-unidad_medida">
          <a href="#/sistema/unidad_medida">
            <i class="bx bx-right-arrow-alt"></i>Unidad medida
          </a>
        </li>
      </ul>
    </li>  
    `
}
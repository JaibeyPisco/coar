import AlmacenRol from "./rolesModulos/AlmacenRolHTML.js";
import ConfiguracionRolHTML from "./rolesModulos/ConfiguracionRolHTML.js";
import DashboardRolHTML from "./rolesModulos/DashboardRolHTML.js";
import MensajeriaRolHTML from "./rolesModulos/MensajeriaRolHTML.js";
import OperacionRolHTML from "./rolesModulos/OperacionRolHTML.js";
import ReporteRolHTML from "./rolesModulos/ReporteRolHTML.js";
import TesoreriaRolHTML from "./rolesModulos/TesoreriaRolHTML.js";

export default function () {
    return /*html*/`

        <style>
            .tabla_permiso td{
                padding:0 !important;
            }
        </style>

        <div id="main">
            <!--breadcrumb-->
            <div class="page-breadcrumb d-none d-sm-flex align-items-center mb-3">
                <div class="breadcrumb-title pe-3">Configuración</div>
                <div class="ps-3">
                    <nav aria-label="breadcrumb">
                        <ol class="breadcrumb mb-0 p-0">
                            <li class="breadcrumb-item"><a href="javascript:;"><i class="fadeIn animated bx bx-slider-alt"></i></a>
                            </li>
                            <li class="breadcrumb-item active" aria-current="page">Roles y Permisos</li>
                        </ol>
                    </nav>
                </div>
                <div class="ms-auto">
                    <div class="btn-group">
                        <button type="button" class="btn btn-success btn-success-dark px-4" style="font-size:15px;" name="nuevo"><i class="lni lni-circle-plus" style="font-size:15px;"></i>Nuevo</button>
                    </div>
                </div>
            </div>
            <!--end breadcrumb-->

            <hr/>

            <!-- Main content -->
            <section class="content">
                <div class="card   radius-10 w-100">
                    <div class="card-body">
                        <div class="table-responsive">
                            <table name="registros" class="table table-striped table-hover table-bordered border-default border-2" style="width:100%; font-weight: 500; font-size: 13px; vertical-align: middle;"></table>
                        </div>
                    </div>
                </div>
            </section>
            <!-- /.content -->

            <!-- MODAL SAVE -->
            <div class="modal inmodal fade" name="modal-save" data-backdrop="static"  role="dialog" aria-hidden="true">
                <div class="modal-dialog modal-lg">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 name="save" class="modal-title">Modal title</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <form name="save">
                            <div class="modal-body modal-fondo" style="max-height:` + (window.innerHeight - 140) + `px; overflow:auto;">
                                <div class="card">
                                    <div class="card-body">    
                                        <div class="row">
                                            <div class="col-md-8">
                                                <div class="form-group">
                                                    <label for="nombre" class="form-label">Nombre</label>
                                                    <div class="input-group"> <span class="input-group-text bg-transparent"><i class='bx bxs-book' ></i></span>
                                                        <input type="text" id="nombre" name="nombre" class="form-control border-start-0 form-control-sm" autocomplete="off">
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-md-4" style="padding-top:20px;">
                                                <div class="form-group">
                                                    <label for="fl_no_dashboard" class="form-label"><input id="fl_no_dashboard" type="checkbox" name="fl_no_dashboard" autocomplete="off"> Ocultar Dashboard</label>
                                                </div>
                                            </div>
                                            <div class="col-md-12">
                                                <table class="table tabla_permiso">
                                                    <thead>
                                                        <tr>
                                                            <th>SECCIONES</th>
                                                            <th class="text-center" style="width:80px;">VER</th>
                                                            <th class="text-center" style="width:80px;">CREAR</th>
                                                            <th class="text-center" style="width:80px;">EDITAR</th>
                                                            <th class="text-center" style="width:80px;">ELIMINAR</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody name="tabla-permiso">
                                                        <tr>
                                                            <td class="font-weight-bold"></td>
                                                            <td class="text-center"><input type="checkbox" name="check_all" value="view"></td>
                                                            <td class="text-center"><input type="checkbox" name="check_all" value="new"></td>
                                                            <td class="text-center"><input type="checkbox" name="check_all" value="edit"></td>
                                                            <td class="text-center"><input type="checkbox" name="check_all" value="delete"></td>
                                                        </tr>
                                                        ${DashboardRolHTML}
                                                        ${ConfiguracionRolHTML}
                                                        ${OperacionRolHTML}
                                                        <!-- ${TesoreriaRolHTML}  -->
                                                        <!-- ${AlmacenRol} -->
                                                        ${ReporteRolHTML}
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="modal-footer" align="center" style="display:block">
                                <button type="button" class="btn btn-secondary pull-left" data-bs-dismiss="modal">Cerrar</button>
                                <button type="submit" class="btn btn-success btn-success-dark">Guardar</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

            <!-- MODAL DELETE -->
            <div class="modal inmodal fade" name="modal-delete" data-backdrop="static" tabindex="-1" role="dialog" aria-hidden="true">
                <div class="modal-dialog modal-sm">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 name="delete" class="modal-title">Modal title</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <form name="delete">
                            <div class="modal-body"  >
                                 <div class="row">
                                            <div class="col-md-12 m-0" align="center">
                                                <i class="fadeIn animated bx bx-trash" style="font-size:100px;"></i><br/>
                                            </div>
                                            <div class="col-md-12"  align="center">
                                                <label><input type="checkbox" name="confirmacion" required/>
                                                    Confirmo realizar la eliminación de la incidencia</label>
                                                <p style="color:red;">Esta acción no se podrá revertir</p>
                                            </div>
                                        </div>
                            </div>
                            <div class="modal-footer" align="center" style="display:block">
                                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                                <button type="submit" name="submit" class="btn btn-danger btn-danger-dark">Eliminar Ahora!</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

        </div>            
        `;

}
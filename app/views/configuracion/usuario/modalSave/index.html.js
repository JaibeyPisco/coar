export  default  /*html*/`
        <!-- MODAL SAVE -->
            <div class="modal inmodal fade" name="modal-save-usuario" data-backdrop="static"  role="dialog" aria-hidden="true">
                <div class="modal-dialog modal-lg">
                    <div class="modal-content">
                        <div class="modal-header">
                             <h5 name="save-usuario" class="modal-title">Nuevo usuario</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <form name="save-usuario">
                            <div class="modal-body">
                                 
                                <div class="tab-content">
                                    <div class="tab-pane active" id="usuario-basico">
                                        <div class="row">
                                            <div class="col-md-3"> 
                                                <div class="row">
                                                    <div class="col-md-12">
                                                        <div class="form-group">
                                                            <label>Tipo Persona</label>
                                                            <select name="tipo_persona" class="form-control form-control-sm" autocomplete="off">
                                                                <option value="">USUARIO STANDARD</option>
                                                                <option value="DOCENTE">DOCENTE</option>
                                                                <option value="ESTUDIANTE">ESTUDIANTE</option>
                                                            </select>
                                                        </div>
                                                    </div>
                                                    <div class="col-md-12" align="center">
                                                        <div>
                                                            <img name="imagen" style="max-width:100%;" class="img_rectangle">
                                                        </div>
                                                        <div>
                                                            <label class="btn btn-default btn-sm" style="width:100%;">
                                                                <i class="fa fa-search"></i> Imagen de Perfil
                                                                <input type="file" name="imagen" style="display:none;">
                                                            </label>
                                                        </div>
                                                    </div>                                                                   
                                                </div>
                                            </div>
                                            <div class="col-md-6">
                                                <div class="row">
                                                    <div class="col-md-12" name="contenedor-personal">
                                                        <div class="form-group">
                                                            <label>Docente <span class="text-red">(*)</span></label>
                                                            <select data-select="PERSONAL" name="id_personal" class="form-control form-control-sm" autocomplete="off" ></select>
                                                        </div>
                                                    </div>
                                                    <div class="col-md-12" name="contenedor-cliente">
                                                        <div class="form-group">
                                                            <label>Estudiante <span class="text-red">(*)</span></label>
                                                            <select data-select="ESTUDIANTE" name="id_estudiante" class="form-control form-control-sm" autocomplete="off" ></select>
                                                        </div>
                                                    </div>
                                                    <div class="col-md-12" name="contenedor-nombre">
                                                        <div class="row">
                                                            <div class="col-md-12">
                                                            <div class="form-group">
                                                                <label>Nombre <span class="text-red">(*)</span></label>
                                                                <input type="text" name="nombre" class="form-control form-control-sm" autocomplete="off" required>
                                                            </div>
                                                            </div>
                                                            <div class="col-md-12">
                                                            <div class="form-group">
                                                                <label>Apellidos <span class="text-red">(*)</span></label>
                                                                <input type="text" name="apellido" class="form-control form-control-sm" autocomplete="off" required>
                                                            </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="col-md-12">
                                                        <div class="form-group">
                                                            <label>Correo Electrónico <span class="text-red">(*)</span><small>(Recuperar Contraseña)</small></label>
                                                            <input type="email" name="email" class="form-control form-control-sm" autocomplete="off" required>
                                                        </div>
                                                    </div>
                                                    <div class="col-md-6">
                                                        <div class="form-group">
                                                            <label>Usuario <span class="text-red">(*)</span></label>
                                                            <input type="text" data-mayus="false" name="usuario" class="form-control form-control-sm" autocomplete="off" required>
                                                        </div>
                                                    </div>
                                                    <div class="col-md-6">
                                                        <div class="form-group">
                                                            <label>Contraseña <span class="text-red">(*)</span></label>
                                                            <input type="text" name="clave" class="form-control form-control-sm" data-mayus="false" autocomplete="off" required>
                                                        </div>
                                                    </div>
                                                    <div class="col-md-12" data-no_cliente="true">
                                                        <div class="form-group">
                                                            <label>Rol y Permisos</label>
                                                            <select name="id_rol" data-select="rol" class="form-control select2 form-control-sm"></select>
                                                        </div>
                                                    </div>
                                                    
                                                </div>
                                            </div>
                                            <div class="col-md-3">
                                                <div class="widget-user-header">
                                                    <h6 style="margin-top:0px; text-align:center; ">Funciones de Usuario</h6>
                                                </div>
                                                <ul class="nav nav-stacked">
                                                    <!-- <li>
                                                        <a href="javascript:" style="padding-left:0;">
                                                            <label><input type="checkbox" name="fl_cambio_local" /> Permitir cambio de local</label>
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <a href="javascript:" style="padding-left:0;">
                                                            <label><input type="checkbox" name="fl_supervisor" /> Supervisor </label>
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <a href="javascript:" style="padding-left:0;">
                                                            <label><input type="checkbox" name="fl_fechas_caja" /> Modificar fechas caja </label>
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <a href="javascript:" style="padding-left:0;">
                                                            <label><input type="checkbox" name="fl_clave" /> Visualizar clave de entrega</label>
                                                        </a>
                                                    </li>

                                                    <li>
                                                        <a href="javascript:" style="padding-left:0;">
                                                            <label><input type="checkbox" name="fl_soporte_cliente" /> Acceso Soporte al Cliente</label>
                                                        </a>
                                                    </li> -->
                                                </ul>
                                            </div>
                                            
                                        </div>
                                    </div>
                                    
                                </div>
                                
                            </div>
                            <div class="modal-footer" align="center" style="display:block">
                                <button type="button" name="cerrar" class="btn btn-white pull-left btn-sm" data-bs-dismiss="modal">Cerrar</button>
                                <button type="submit" class="btn btn-primary btn-sm">Guardar</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>


`;
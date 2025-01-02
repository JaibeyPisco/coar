export default /*html*/`
<div id="main">
    <!--breadcrumb-->
    <div class="page-breadcrumb d-none d-sm-flex align-items-center mb-3">
        <div class="breadcrumb-title pe-3">Configuración</div>
        <div class="ps-3">
            <nav aria-label="breadcrumb">
                <ol class="breadcrumb mb-0 p-0">
                    <li class="breadcrumb-item"><a href="javascript:;"><i
                                class='fadeIn animated bx bx-slider-alt'></i></a>
                    </li>
                    <li class="breadcrumb-item active" aria-current="page">Estudiantes</li>
                </ol>
            </nav>
        </div>
        <div class="ms-auto">
            <div class="btn-group">
                <button type="button" class="btn btn-primary btn-primary-dark px-4" style="font-size:15px;" name="btnModalImportar"><i
                        class="lni lni-cloud-upload" style="font-size:15px;"></i>Importar</button>

                <button type="button" class="btn btn-success btn-success-dark px-4" style="font-size:15px;" name="nuevo"><i
                        class="lni lni-circle-plus" style="font-size:15px;"></i>Nuevo</button>
            </div>
        </div>
    </div>
    <!--end breadcrumb-->

    <hr />

    <!-- Main content -->
    <section class="content">
        <div class="card border-default border-bottom border-3 radius-10 w-100">
            <div class="card-body">
                <div class="table-responsive">
                    <table name="registros"
                        class="table table-striped table-hover table-bordered border-default border-2"
                        style="width:100%; font-weight: 500; font-size: 13px; vertical-align: middle;"></table>
                </div>
            </div>
        </div>
    </section>
    <!-- /.content -->

    <!-- MODAL SAVE -->
    <div class="modal inmodal fade" name="modal-save" data-backdrop="static" role="dialog" aria-hidden="true">
        <div class="modal-dialog modal-fullscreen">
            <form name="save">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 name="save" class="modal-title">Modal title</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body modal-fondo">
                        <ul class="nav nav-tabs nav-primary" role="tablist">
                            <li class="nav-item" role="presentation">
                                <a class="nav-link active" data-bs-toggle="tab" href="#primaryhome" role="tab"
                                    aria-selected="true">
                                    <div class="d-flex align-items-center">
                                        <div class="tab-icon">
                                            <i class='bx bx-user font-18 me-1'></i>
                                        </div>
                                        <div class="tab-title">Personal</div>
                                    </div>
                                </a>
                            </li>
                            <li class="nav-item" role="presentation">
                                <a class="nav-link" data-bs-toggle="tab" href="#primaryprofile" role="tab"
                                    aria-selected="false">
                                    <div class="d-flex align-items-center">
                                        <div class="tab-icon">
                                            <i class='bx bx-user-plus font-18 me-1'></i>
                                        </div>
                                        <div class="tab-title">Padres</div>
                                    </div>
                                </a>
                            </li>
                            <li class="nav-item" role="presentation">
                                <a class="nav-link" data-bs-toggle="tab" href="#primarycontact" role="tab"
                                    aria-selected="false">
                                    <div class="d-flex align-items-center">
                                        <div class="tab-icon">
                                            <i class='bx bx-user-circle font-18 me-1'></i>
                                        </div>
                                        <div class="tab-title">Apoderados</div>
                                    </div>
                                </a>
                            </li>
                        </ul>
                        <div class="tab-content py-3">
                            <div class="tab-pane fade show active" id="primaryhome" role="tabpanel">
                                <div class="row">
                                    <div class="col-md-3">
                                        <div class="row mb-3">
                                            <div class="col-md-12" align="center">
                                                <div>
                                                    <img name="foto" style="max-width:100%;" class="img_rectangle">
                                                </div>
                                                <div class="mt-1">
                                                    <label class="btn btn-default btn-sm" style="width:100%;">
                                                        <i class="fa fa-search"></i> Imagen de Perfil
                                                        <input type="file" name="foto" style="display:none;">
                                                    </label>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-md-5">
                                        <div class="card border-primary border-top border-3">
                                            <div class="card-body">
                                                <span style="font-size: 18px;"><b>Información básica</b></span>
                                                <div class="row">
                                                    <div class="col-md-12" name="contenedor-personal">
                                                        <div class="form-group mt-3">
                                                            <label for="apellidos_nombres" class="form-label">Nombres y apellidos <span class="text-red">(*)</span></label>
                                                            <input id="apellidos_nombres" type="input" name="apellidos_nombres" class="form-control  form-control-sm" autocomplete="off">
                                                        </div>
                                                    </div>
                                                    <div class="col-md-12">
                                                        <div class="form-group mt-3 mb-3">
                                                            <label for="obsv" class="form-label">OBVS <span
                                                                    class="text-red">(*)</span></label>
                                                            <textarea id="obsv" type="input" name="obsv"
                                                                class="form-control  form-control-sm"
                                                                autocomplete="off"> </textarea>
                                                        </div>
                                                    </div>
                                                    <div class="col-md-12">
                                                        <div class="row">            
                                                            <div class="col-md-6">
                                                                <div class="form-group mb-3">
                                                                    <label for="grado" class="form-label">Grado <span
                                                                            class="text-red">(*)</span></label>
                                                                    <select id="grado" name="grado"
                                                                        class="form-select form-select-sm">
                                                                        <option value="" selected>Seleccionar</option>
                                                                        <option value="3">TERCERO</option>
                                                                        <option value="4">CUARTO</option>
                                                                        <option value="5">QUINTO</option>
                                                                    </select>
                                                                </div>
                                                            </div>
                                                            <div class="col-md-6">
                                                                <div class="form-group mb-3">
                                                                    <label for="seccion" class="form-label">Sección <span
                                                                            class="text-red">(*)</span></label>
                                                                    <select id="seccion" name="seccion"
                                                                        class="form-select form-select-sm">
                                                                        <option value="" selected>Seleccionar</option>
                                                                        <option value="A">A</option>
                                                                        <option value="B">B</option>
                                                                        <option value="C">C</option>
                                                                        <option value="D">D</option>
                                                                        <option value="E">E</option>
                                                                        <option value="F">F</option>
                                                                        <option value="G">G</option>
                                                                        <option value="H">H</option>
                                                                        <option value="I">I</option>
                                                                        <option value="J">J</option>
                                                                        <option value="K">K</option>
                                                                        <option value="L">L</option>
                                                                        <option value="M">M</option>
                                                                        <option value="N">N</option>
                                                                        <option value="O">O</option>
                                                                        <option value="P">P</option>
                                                                        <option value="Q">Q</option>
                                                                        <option value="R">R</option>
                                                                        <option value="S">S</option>
                                                                        <option value="T">T</option>
                                                                        <option value="U">U</option>
                                                                        <option value="V">V</option>
                                                                        <option value="W">W</option>
                                                                        <option value="X">X</option>
                                                                        <option value="Y">Y</option>
                                                                        <option value="Z">Z</option>
                                                                    </select>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="col-md-6">
                                                        <div class="form-group mb-3">
                                                            <label for="dni" class="form-label">DNI <span class="text-red">(*)</span></label>
                                                            <input id="dni" type="text" name="dni"
                                                                class="form-control form-control-sm mayus_false"
                                                                data-mayus="false" autocomplete="off">
                                                        </div>
                                                    </div>
                                                    <div class="col-md-6">
                                                        <div class="form-group mb-3">
                                                            <label for="sexo" class="form-label">Sexo <span
                                                                    class="text-red">(*)</span></label>
                                                            <select id="sexo" name="sexo"
                                                                class="form-select form-select-sm">
                                                                <option value="" selected>Seleccione</option>
                                                                <option value="MASCULINO">MASCULINO</option>
                                                                <option value="FEMENINO">FEMENINO</option>
                                                            </select>
                                                        </div>
                                                    </div>
                                                    <div class="col-md-6">
                                                        <div class="form-group mb-3">
                                                            <label for="correo_electronico" class="form-label">Correo Electrónico <span
                                                                    class="text-red">(*)</span></label>
                                                            <input id="correo_electronico" type="text" name="correo_electronico"
                                                                class="form-control form-control-sm mayus_false"
                                                                data-mayus="false" autocomplete="off">
                                                        </div>
                                                    </div>
                                                    <div class="col-md-6">
                                                        <div class="form-group mb-3">
                                                            <label for="fecha_nacimiento" class="form-label">Fecha Nac. <span
                                                                    class="text-red">(*)</span></label>
                                                            <input id="fecha_nacimiento" type="date" name="fecha_nacimiento"
                                                                class="form-control form-control-sm mayus_false"
                                                                data-mayus="false" autocomplete="off">
                                                        </div>
                                                    </div>
                                                    <div class="col-md-6">
                                                        <div class="form-group mb-3">
                                                            <label for="codigo_estudiante" class="form-label">Código de acceso padre. <span
                                                                    class="text-red">(*)</span></label>
                                                            <div class="input-group mb-3">
                                                                <input id="codigo_estudiante" type="text" class="form-control"
                                                                name="codigo_estudiante" readonly
                                                                    placeholder="Recipient's username"
                                                                    aria-label="Recipient's username"
                                                                    aria-describedby="button-addon2">
                                                                <button class="btn btn-primary" name="regenerate_password"
                                                                    type="button" id="button-addon2">
                                                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-repeat" viewBox="0 0 16 16">
                                                                        <path d="M11.534 7h3.932a.25.25 0 0 1 .192.41l-1.966 2.36a.25.25 0 0 1-.384 0l-1.966-2.36a.25.25 0 0 1 .192-.41zm-11 2h3.932a.25.25 0 0 0 .192-.41L2.692 6.23a.25.25 0 0 0-.384 0L.342 8.59A.25.25 0 0 0 .534 9z"/>
                                                                        <path fill-rule="evenodd" d="M8 3c-1.552 0-2.94.707-3.857 1.818a.5.5 0 1 1-.771-.636A6.002 6.002 0 0 1 13.917 7H12.9A5.002 5.002 0 0 0 8 3zM3.1 9a5.002 5.002 0 0 0 8.757 2.182.5.5 0 1 1 .771.636A6.002 6.002 0 0 1 2.083 9H3.1z"/>
                                                                        </svg>
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-md-4">
                                        <div class="card border-primary border-top border-3">
                                            <div class="card-body">
                                                <span style="font-size: 18px;" class="mb-3"><b>Residencia</b></span>
                                                <div class="row">
                                                    <div class="col-md-12">
                                                        <div class="row">
                                                            <div class="col-md-6">
                                                                <div class="form-group mt-3">
                                                                    <label for="lav" class="form-label">Lav <span
                                                                            class="text-red">(*)</span></label>
                                                                    <input id="lav" type="text" name="lav"
                                                                        class="form-control  form-control-sm"
                                                                        autocomplete="off">
                                                                </div>
                                                            </div>
                                                            <div class="col-md-6">
                                                                <div class="form-group mt-3">
                                                                    <label for="llaves" class="form-label">llaves <span
                                                                            class="text-red">(*)</span></label>
                                                                    <input id="llaves" type="text" name="llaves"
                                                                        class="form-control  form-control-sm"
                                                                        autocomplete="off">
                                                                </div>
                                                            </div>
                                                            <div class="col-md-6">
                                                                <div class="form-group mt-3">
                                                                    <label for="pabellon" class="form-label">Pabellon <span
                                                                            class="text-red">(*)</span></label>
                                                                    <input id="pabellon" type="text" name="pabellon"
                                                                        class="form-control  form-control-sm"
                                                                        autocomplete="off">
                                                                </div>
                                                            </div>
                                                            <div class="col-md-6 mt-3">
                                                                <div class="form-group">
                                                                    <label for="ala" class="form-label">ALA <span
                                                                            class="text-red">(*)</span></label>
                                                                    <input id="ala" type="text" name="ala"
                                                                        class="form-control  form-control-sm"
                                                                        autocomplete="off">
                                                                </div>
                                                            </div>
                                                            <div class="col-md-6 mt-3">
                                                                <div class="form-group">
                                                                    <label for="cama_ropero" class="form-label">Ropero y cama <span
                                                                            class="text-red">(*)</span></label>
                                                                    <input id="cama_ropero" type="text" name="cama_ropero"
                                                                        class="form-control  form-control-sm"
                                                                        autocomplete="off">
                                                                </div>
                                                            </div>
                                                            <div class="col-md-6 mt-3">
                                                                <div class="form-group">
                                                                    <label for="duchas" class="form-label">Duchas <span
                                                                            class="text-red">(*)</span></label>
                                                                    <input id="duchas" type="text" name="duchas"
                                                                        class="form-control  form-control-sm"
                                                                        autocomplete="off">
                                                                </div>
                                                            </div>
                                                            <div class="col-md-6 mt-3">
                                                                <div class="form-group">
                                                                    <label for="banos" class="form-label">Baños <span
                                                                            class="text-red">(*)</span></label>
                                                                    <input id="banos" type="text" name="banos"
                                                                        class="form-control  form-control-sm"
                                                                        autocomplete="off">
                                                                </div>
                                                            </div>
                                                            <div class="col-md-6 mt-3">
                                                                <div class="form-group">
                                                                    <label for="urinarios" class="form-label">Urinarios <span
                                                                            class="text-red">(*)</span></label>
                                                                    <input id="urinarios" type="text" name="urinarios"
                                                                        class="form-control  form-control-sm"
                                                                        autocomplete="off">
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="col-md-12">
                                                        <div class="form-group mt-3 mb-3">
                                                            <label for="monitor_acompana" class="form-label">Monitor que acompaña <span
                                                                    class="text-red">(*)</span></label>
                                                            <input id="monitor_acompana" type="input" name="monitor_acompana"
                                                                class="form-control  form-control-sm"
                                                                autocomplete="off">
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-md-12">
                                        <div class="card border-primary border-top border-3">
                                            <div class="card-body">
                                                <span style="font-size: 18px;"><b>Datos complementarios</b></span>
                                                <div class="row">
                                                    <div class="col-md-12">
                                                        <div class="row">
                                                            <div class="col-md-4">
                                                                <div class="form-group mt-3">
                                                                    <label for="lugar_nacimiento" class="form-label">Lugar de nacimiento
                                                                        (Región/Provincia/Distrito) <span
                                                                            class="text-red">(*)</span></label>
                                                                    <textarea id="lugar_nacimiento" type="text"
                                                                        name="lugar_nacimiento"
                                                                        class="form-control  form-control-sm"
                                                                        autocomplete="off"></textarea>
                                                                </div>
                                                            </div>
                                                            <div class="col-md-4">
                                                                <div class="form-group mt-3">
                                                                    <label for="fecha_caducidad_dni" class="form-label">Fecha de caducidad DNI <span
                                                                            class="text-red">(*)</span></label>
                                                                    <input id="fecha_caducidad_dni" type="date"
                                                                        name="fecha_caducidad_dni"
                                                                        class="form-control  form-control-sm"
                                                                        autocomplete="off" />
                                                                </div>
                                                            </div>
                                                            <div class="col-md-4">
                                                                <div class="form-group mt-3">
                                                                    <label for="num_telefonico" class="form-label">Número telefónico del estudiante <span
                                                                            class="text-red">(*)</span></label>
                                                                    <textarea id="num_telefonico" type="text" name="num_telefonico"
                                                                        class="form-control  form-control-sm"
                                                                        autocomplete="off"></textarea>
                                                                </div>
                                                            </div>

                                                            <div class="col-md-4 mt-3">
                                                                <div class="form-group">
                                                                    <label for="religion" class="form-label">Religión que profesa el
                                                                        estudiante <span
                                                                            class="text-red">(*)</span></label>
                                                                    <textarea id="religion" type="text" name="religion"
                                                                        class="form-control  form-control-sm"
                                                                        autocomplete="off"></textarea>
                                                                </div>
                                                            </div>
                                                            <div class="col-md-4 mt-3">
                                                                <div class="form-group">
                                                                    <label for="region_domicilio_actual" class="form-label">Región de domicilio actual (no el
                                                                        COAR) <span
                                                                            class="text-red">(*)</span></label>
                                                                    <textarea id="region_domicilio_actual" type="text"
                                                                        name="region_domicilio_actual"
                                                                        class="form-control  form-control-sm"
                                                                        autocomplete="off"></textarea>
                                                                </div>
                                                            </div>
                                                            <div class="col-md-4 mt-3">
                                                                <div class="form-group">
                                                                    <label for="provincia_domicilio_actual" class="form-label">Provincia de domicilio actual (no el
                                                                        COAR) <span
                                                                            class="text-red">(*)</span></label>
                                                                    <textarea id="provincia_domicilio_actual" type="text"
                                                                        name="provincia_domicilio_actual"
                                                                        class="form-control  form-control-sm"
                                                                        autocomplete="off"></textarea>
                                                                </div>
                                                            </div>
                                                            <div class="col-md-4 mt-3">
                                                                <div class="form-group">
                                                                    <label for="distrito_domicilio_actual" class="form-label"> Distrito de domicilio actual (no el
                                                                        COAR) <span
                                                                            class="text-red">(*)</span></label>
                                                                    <textarea id="distrito_domicilio_actual" type="text"
                                                                        name="distrito_domicilio_actual"
                                                                        class="form-control  form-control-sm"
                                                                        autocomplete="off"></textarea>
                                                                </div>
                                                            </div>
                                                            <div class="col-md-4 mt-3">
                                                                <div class="form-group">
                                                                    <label for="direccion_domicilio_actual" class="form-label">Dirección de domicilio actual (no el
                                                                        COAR) especificar
                                                                        avenida/jirón/calle/pasaje <span
                                                                            class="text-red">(*)</span></label>
                                                                    <textarea id="direccion_domicilio_actual" type="text"
                                                                        name="direccion_domicilio_actual"
                                                                        class="form-control  form-control-sm"
                                                                        autocomplete="off"> </textarea>
                                                                </div>
                                                            </div>
                                                            <div class="col-md-4 mt-3 mb-2">
                                                                <div class="form-group">
                                                                    <label for="referencia_domicilio_actual" class="form-label">Referencia de como llegar a su
                                                                        domicilio (plazuela, cancha deportiva,
                                                                        tienda comercial, etc) <span
                                                                            class="text-red">(*)</span></label>
                                                                    <textarea id="referencia_domicilio_actual" type="text"
                                                                        name="referencia_domicilio_actual"
                                                                        class="form-control  form-control-sm"
                                                                        autocomplete="off"></textarea>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="tab-pane fade" id="primaryprofile" role="tabpanel">
                                <div class="row">
                                    <!-- INICIO DATOS MADRE -->
                                    <div class="col-md-6">
                                        <div class="card border-primary border-top border-3">
                                            <div class="card-body">
                                                <span style="font-size: 18px;" class="mb-3"><b>Datos de la madre</b></span>
                                                <div class="row">
                                                    <div class="col-md-6" name="contenedor-personal">
                                                        <div class="form-group mt-3">
                                                            <div class="form-check form-switch"
                                                                bis_skin_checked="1">
                                                                <input id="madre_viva" class="form-check-input"
                                                                    name="madre_viva" type="checkbox" checked="">
                                                                <label for="madre_viva" class="form-label form-check-label">¿La madre está
                                                                    viva?</label>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="col-md-6" name="contenedor-personal">
                                                        <div class="form-group mt-3">
                                                            <div class="form-check form-switch"
                                                                bis_skin_checked="1">
                                                                <input id="madre_con_estudiante" class="form-check-input"
                                                                    name="madre_con_estudiante" type="checkbox" checked="">
                                                                <label for="madre_con_estudiante" class="form-label form-check-label">¿La madre vive
                                                                    con el estudiante?</label>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="col-md-12">
                                                        <div class="form-group mt-2 mb-3">
                                                            <label for="apellidos_nombres_madre" class="form-label">Apellidos y nombres de la madre<span
                                                                    class="text-red"></label>
                                                            <input id="apellidos_nombres_madre" type="input" name="apellidos_nombres_madre"
                                                                class="form-control  form-control-sm"
                                                                autocomplete="off" />
                                                        </div>
                                                    </div>

                                                    <div class="col-md-12">
                                                        <div class="row">
                                                            <div class="col-md-6">
                                                                <div class="form-group mb-3">
                                                                    <label for="dni_madre" class="form-label">N° de dni de la madre <span
                                                                            class="text-red"></label>
                                                                    <input id="dni_madre" type="input" name="dni_madre"
                                                                        class="form-control  form-control-sm"
                                                                        autocomplete="off" />
                                                                </div>
                                                            </div>
                                                            <div class="col-md-6">
                                                                <div class="form-group mb-3">
                                                                    <label for="grado_instruccion_madre" class="form-label">Grado de instrucción de la
                                                                        madre</label>
                                                                    <input id="grado_instruccion_madre" type="input"
                                                                        name="grado_instruccion_madre"
                                                                        class="form-control  form-control-sm"
                                                                        autocomplete="off" />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div class="col-md-12">
                                                        <div class="row">
                                                            <div class="col-md-6">
                                                                <div class="form-group mb-3">
                                                                    <label for="num_celular_madre" class="form-label">N° de teléfono celular de la
                                                                        madre</label>
                                                                    <input id="num_celular_madre" type="input" name="num_celular_madre"
                                                                        class="form-control  form-control-sm"
                                                                        autocomplete="off" />
                                                                </div>
                                                            </div>
                                                            <div class="col-md-6">
                                                                <div class="form-group mb-3">
                                                                    <label for="correo_electronico_madre" class="form-label">Correo electrónico de la
                                                                        madre</label>
                                                                    <input id="correo_electronico_madre" type="input"
                                                                        name="correo_electronico_madre"
                                                                        class="form-control  form-control-sm"
                                                                        autocomplete="off" />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div class="col-md-12">
                                                        <div class="form-group mb-3">
                                                            <label for="ocupacion_actual_madre" class="form-label">Ocupación actual de la madre</label>
                                                            <input id="ocupacion_actual_madre" type="text" name="ocupacion_actual_madre"
                                                                class="form-control form-control-sm mayus_false"
                                                                data-mayus="false" autocomplete="off">
                                                        </div>
                                                    </div>

                                                    <div class="col-md-12">
                                                        <div class="form-group">
                                                            <label for="motivo_madre_no_vive_con_estudiante" class="form-label">Motivo por el cual la madre no vive con el
                                                                estudiante </label>
                                                            <textarea id="motivo_madre_no_vive_con_estudiante" type="text"
                                                                name="motivo_madre_no_vive_con_estudiante"
                                                                class="form-control form-control-sm mayus_false"
                                                                data-mayus="false"
                                                                autocomplete="off"></textarea>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <!-- FIN  DATOS MADRE -->
                                    <!-- INICIO DATOS PADRE -->
                                    <div class="col-md-6">
                                        <div class="card border-primary border-top border-3">
                                            <div class="card-body">
                                                <span style="font-size: 18px;" class="mb-3"><b>Datos del padre</b></span>
                                                <div class="row">
                                                    <div class="col-md-6" name="contenedor-personal">
                                                        <div class="form-group mt-3">
                                                            <div class="form-check form-switch"
                                                                bis_skin_checked="1">
                                                                <input class="form-check-input"
                                                                    name="padre_vivo" type="checkbox"
                                                                    id="padre_vivo" checked="">
                                                                <label class="form-label form-check-label"
                                                                    for="padre_vivo">¿El padre está
                                                                    vivo?</label>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="col-md-6" name="contenedor-personal">
                                                        <div class="form-group mt-3">
                                                            <div class="form-check form-switch"
                                                                bis_skin_checked="1">
                                                                <input class="form-check-input"
                                                                    name="padre_con_estudiante" type="checkbox"
                                                                    id="padre_con_estudiante" checked="">
                                                                <label class="form-label form-check-label"
                                                                    for="padre_con_estudiante">¿El padre vive
                                                                    con el estudiante?</label>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="col-md-12">
                                                        <div class="form-group mt-2 mb-3">
                                                            <label for="apellidos_nombres_padre" class="form-label">Apellidos y nombres del padre<span
                                                                    class="text-red"></label>
                                                            <input id="apellidos_nombres_padre" type="input" name="apellidos_nombres_padre"
                                                                class="form-control  form-control-sm"
                                                                autocomplete="off" />
                                                        </div>
                                                    </div>
                                                    <div class="col-md-12">
                                                        <div class="row">
                                                            <div class="col-md-6">
                                                                <div class="form-group mb-3">
                                                                    <label for="dni_padre" class="form-label">N° de dni del padre <span
                                                                            class="text-red"></label>
                                                                    <input id="dni_padre" type="input" name="dni_padre"
                                                                        class="form-control  form-control-sm"
                                                                        autocomplete="off" />
                                                                </div>
                                                            </div>
                                                            <div class="col-md-6">
                                                                <div class="form-group mb-3">
                                                                    <label for="grado_instruccion_padre" class="form-label">Grado de instrucción del
                                                                        padre</label>
                                                                    <input id="grado_instruccion_padre" type="input"
                                                                        name="grado_instruccion_padre"
                                                                        class="form-control  form-control-sm"
                                                                        autocomplete="off" />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="col-md-12">
                                                        <div class="row">
                                                            <div class="col-md-6">
                                                                <div class="form-group mb-3">
                                                                    <label for="num_celular_padre" class="form-label">N° de teléfono celular del
                                                                        padre</label>
                                                                    <input id="num_celular_padre" type="input" name="num_celular_padre"
                                                                        class="form-control  form-control-sm"
                                                                        autocomplete="off" />
                                                                </div>
                                                            </div>
                                                            <div class="col-md-6">
                                                                <div class="form-group mb-3">
                                                                    <label for="correo_electronico_padre" class="form-label">Correo electrónico del padre</label>
                                                                    <input id="correo_electronico_padre" type="input"
                                                                        name="correo_electronico_padre"
                                                                        class="form-control  form-control-sm"
                                                                        autocomplete="off" />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="col-md-12">
                                                        <div class="form-group mb-3">
                                                            <label for="ocupacion_actual_padre" class="form-label">Ocupación actual del padre</label>
                                                            <input id="ocupacion_actual_padre" type="text" name="ocupacion_actual_padre"
                                                                class="form-control form-control-sm mayus_false"
                                                                data-mayus="false" autocomplete="off">
                                                        </div>
                                                    </div>
                                                    <div class="col-md-12">
                                                        <div class="form-group">
                                                            <label for="motivo_padre_no_vive_con_estudiante" class="form-label">Motivo por el cual el padre no vive con el
                                                                estudiante </label>
                                                            <textarea id="motivo_padre_no_vive_con_estudiante" type="text"
                                                                name="motivo_padre_no_vive_con_estudiante"
                                                                class="form-control form-control-sm mayus_false"
                                                                data-mayus="false"
                                                                autocomplete="off"></textarea>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <!-- FIN  DATOS PADRE -->
                                    <!-- INICIO DATOS PADRE -->
                                    <div class="col-md-12">
                                        <div class="card border-primary border-top border-3">
                                            <div class="card-body">
                                                <span style="font-size: 18px;" class="mb-3"><b>Datos del
                                                        apoderado que cumple el rol de padre o madre</b></span>
                                                <div class="row">

                                                    <div class="col-md-12">
                                                        <div class="form-group mt-3 mb-3">
                                                            <label for="parentesco_con_apoderado" class="form-label">Parentesco con tu apoderado<span
                                                                    class="text-red"></label>
                                                            <input id="parentesco_con_apoderado" type="input" name="parentesco_con_apoderado"
                                                                class="form-control  form-control-sm"
                                                                autocomplete="off" />
                                                        </div>
                                                    </div>
                                                    <div class="col-md-12">
                                                        <div class="form-group mb-3">
                                                            <label for="apellidos_nombres_apoderado" class="form-label">Apellidos y Nombres del apoderado (a)
                                                                <span class="text-red"></label>
                                                            <input id="apellidos_nombres_apoderado" type="input"
                                                                name="apellidos_nombres_apoderado"
                                                                class="form-control  form-control-sm"
                                                                autocomplete="off" />
                                                        </div>
                                                    </div>

                                                    <div class="col-md-12">
                                                        <div class="row">
                                                            <div class="col-md-6">
                                                                <div class="form-group mb-3">
                                                                    <label for="dni_apoderado" class="form-label">N° de dni del apoderado <span
                                                                            class="text-red"></label>
                                                                    <input id="dni_apoderado" type="input" name="dni_apoderado"
                                                                        class="form-control  form-control-sm"
                                                                        autocomplete="off" />
                                                                </div>
                                                            </div>
                                                            <div class="col-md-6">
                                                                <div class="form-group mb-3">
                                                                    <label for="num_celular_apoderado" class="form-label">N° de teléfono celular del apoderado
                                                                    </label>
                                                                    <input id="num_celular_apoderado" type="input"
                                                                        name="num_celular_apoderado"
                                                                        class="form-control  form-control-sm"
                                                                        autocomplete="off" />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="col-md-12">
                                                        <div class="form-group mb-3">
                                                            <label for="tipo_familia" class="form-label">Elige tu tipo de familia</label>
                                                            <input id="tipo_familia"
                                                                class="form-control form-control-sm mayus_false"
                                                                list="datalistOptions" name="tipo_familia"
                                                                id="exampleDataList"
                                                                placeholder="Elige tu tipo de familia...">
                                                            <datalist id="datalistOptions">
                                                                <option value="FAMILA MONOPARENTAL">
                                                                <option value="FAMILIA NUCLEAR">
                                                                <option value="FAMILIA RECONSTITUÍDA">
                                                                <option value="FAMILIA EXTENSA">
                                                            </datalist>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <!-- FIN  DATOS PADRE -->
                                </div>
                            </div>
                            <div class="tab-pane fade" id="primarycontact" role="tabpanel">
                                <div class="card border-primary border-top border-3">
                                    <div class="card-body">
                                        <span style="font-size: 18px;" class="mb-3"><b>Datos del apoderado</b></span>
                                        <div class="row mt-3">
                                            <div class="col-md-12">
                                                <table class="table table-striped table-hover table-bordered">
                                                    <thead>
                                                        <tr>
                                                            <th>Apellidos y nombres</th>
                                                            <th>DNI</th>
                                                            <th>NUMERO TELEFÓNICO</th>
                                                            <th>GRADO DE PARENTESCO</th>
                                                            <th>¿LEGALIZADO?</th>
                                                            <th></th>
                                                        </tr>
                                                    </thead>
                                                    <tbody name="tabla_agregar_apoderado"></tbody>
                                                    <tfoot>
                                                        <tr>
                                                            <td colspan="6" align="center">
                                                                <button type="button" name="agregar_apoderado" style="font-size: 14px;" class="btn btn-primary"><i class="fadeIn animated bx bx-plus" style="font-size: 14px;"></i> Agregar Apoderado</button>
                                                            </td>
                                                        </tr>
                                                    </tfoot>
                                                </table>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer" align="center" style="display:block">
                        <button type="button" name="cerrar" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                        <button type="submit" class="btn btn-primary btn-primary-dark">Guardar</button>
                    </div>
                </div>
            </form>
        </div>
    </div>

    <!-- MODAL IMPORTAR -->
    <div class="modal inmodal fade" name="modal-importarEstudiantes" data-backdrop="static" tabindex="-1" role="dialog"
        aria-hidden="true">
        <div class="modal-dialog modal-md">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 name="importarEstudiantes" class="modal-title">Modal title</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <form name="importarEstudiantes">
                    <div class="modal-body">
                        <div class="row">
                            <div class="col-md-12 mb-4" align="center">
                                <i class="fadeIn animated lni lni-cloud-upload text-primary"
                                    style="font-size:100px;"></i><br />

                                <a style="" class="btn btn-outline-primary px-5" target="_blank"
                                    href="${BASE_FILES}formatos/formato_exportacion_estudiantes.xlsx">
                                    <i class="fadeIn animated fa fa-download">
                                    </i>
                                    Descarga formato
                                </a>
                            </div>
                            <div class="col-md-12" align="center" style="padding-top:10px;">
                                <input name="fileexportar" type="file" accept=".xlsx,.xls" multiple>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer" align="center" style="display:block">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                        <button type="submit" name="submit" class="btn btn-success btn-success-dark">Procesar</button>
                    </div>
                </form>
            </div>
        </div>
    </div>

    <!-- MODAL DELETE -->
    <div class="modal inmodal fade" name="modal-delete" data-backdrop="static" tabindex="-1" role="dialog"
        aria-hidden="true">
        <div class="modal-dialog modal-sm">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 name="delete" class="modal-title">Modal title</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <form name="delete">
                    <div class="modal-body">
                        <div class="row">
                            <div class="col-md-12 m-0" align="center">
                                <i class="fadeIn animated bx bx-trash" style="font-size:100px;"></i><br />
                            </div>
                            <div class="col-md-12" align="center" style="padding-top:10px;">
                                <label><input type="checkbox" name="confirmacion" />
                                    Confirmo realizar la eliminación del Estudiane</label>
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
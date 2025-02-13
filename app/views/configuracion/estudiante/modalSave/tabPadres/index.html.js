export default /*html*/`
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
                    <div class="col-md-6">
                        <div class="form-group mt-2 mb-3">
                            <label for="apellidos_madre" class="form-label">Apellidos y de la madre<span
                                    class="text-red"></label>
                            <input id="apellidos_madre" type="input" name="apellidos_madre"
                                class="form-control  form-control-sm"
                                autocomplete="off" />
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="form-group mt-2 mb-3">
                            <label for="nombres_madre" class="form-label">Nombres de la madre<span
                                    class="text-red"></label>
                            <input id="nombres_madre" type="input" name="nombres_madre"
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
                                    <input id="dni_madre" type="number" name="dni_madre"
                                        class="form-control  form-control-sm"
                                        autocomplete="off" />
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="form-group mb-3">
                                    <label for="grado_instruccion_madre" class="form-label">Grado de instrucción de la
                                        madre</label>

                                    <select name="grado_instruccion_madre" class="form-control form-select-sm">
                                        <option value="">Seleccione...</option>
                                        <option value="SIN_INSTRUCCION">Sin Instrucción</option>
                                        <option value="PRIMARIA_INCOMPLETA">Primaria Incompleta</option>
                                        <option value="PRIMARIA_COMPLETA">Primaria Completa</option>
                                        <option value="SECUNDARIA_INCOMPLETA">Secundaria Incompleta</option>
                                        <option value="SECUNDARIA_COMPLETA">Secundaria Completa</option>
                                        <option value="TECNICO_INCOMPLETO">Técnico Incompleto</option>
                                        <option value="TECNICO_COMPLETO">Técnico Completo</option>
                                        <option value="SUPERIOR_NO_UNIVERSITARIA_INCOMPLETA">Superior No Universitaria Incompleta</option>
                                        <option value="SUPERIOR_NO_UNIVERSITARIA_COMPLETA">Superior No Universitaria Completa</option>
                                        <option value="UNIVERSITARIA_INCOMPLETA">Universitaria Incompleta</option>
                                        <option value="UNIVERSITARIA_COMPLETA">Universitaria Completa</option>
                                        <option value="POSTGRADO_MAESTRIA">Postgrado (Maestría)</option>
                                        <option value="POSTGRADO_DOCTORADO">Postgrado (Doctorado)</option>
                                    </select>
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
                    <div class="col-md-6">
                        <div class="form-group mt-2 mb-3">
                            <label for="apellidos_padre" class="form-label">Apellidos del padre<span
                                    class="text-red"></label>
                            <input id="apellidos_padre" type="input" name="apellidos_padre"
                                class="form-control  form-control-sm"
                                autocomplete="off" />
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="form-group mt-2 mb-3">
                            <label for="nombres_padre" class="form-label">Nombres del padre<span
                                    class="text-red"></label>
                            <input id="nombres_padre" type="input" name="nombres_padre"
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
                                    <input id="dni_padre" type="number" name="dni_padre"
                                        class="form-control  form-control-sm"
                                        autocomplete="off" />
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="form-group mb-3">
                                    <label for="grado_instruccion_padre" class="form-label">Grado de instrucción del
                                        padre</label>
                                   
                                    <select name="grado_instruccion_padre" class="form-control form-select-sm">
                                        <option value="">Seleccione...</option>
                                        <option value="SIN_INSTRUCCION">Sin Instrucción</option>
                                        <option value="PRIMARIA_INCOMPLETA">Primaria Incompleta</option>
                                        <option value="PRIMARIA_COMPLETA">Primaria Completa</option>
                                        <option value="SECUNDARIA_INCOMPLETA">Secundaria Incompleta</option>
                                        <option value="SECUNDARIA_COMPLETA">Secundaria Completa</option>
                                        <option value="TECNICO_INCOMPLETO">Técnico Incompleto</option>
                                        <option value="TECNICO_COMPLETO">Técnico Completo</option>
                                        <option value="SUPERIOR_NO_UNIVERSITARIA_INCOMPLETA">Superior No Universitaria Incompleta</option>
                                        <option value="SUPERIOR_NO_UNIVERSITARIA_COMPLETA">Superior No Universitaria Completa</option>
                                        <option value="UNIVERSITARIA_INCOMPLETA">Universitaria Incompleta</option>
                                        <option value="UNIVERSITARIA_COMPLETA">Universitaria Completa</option>
                                        <option value="POSTGRADO_MAESTRIA">Postgrado (Maestría)</option>
                                        <option value="POSTGRADO_DOCTORADO">Postgrado (Doctorado)</option>
                                    </select>
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
                            <label for="apellidos_apoderado" class="form-label">Apellidos del apoderado (a)
                                <span class="text-red"></label>
                            <input id="apellidos_apoderado" type="input"
                                name="apellidos_apoderado"
                                class="form-control  form-control-sm"
                                autocomplete="off" />
                        </div>
                    </div>
                    
                    <div class="col-md-12">
                        <div class="form-group mb-3">
                            <label for="nombres_apoderado" class="form-label">Nombres del apoderado (a)
                                <span class="text-red"></label>
                            <input id="nombres_apoderado" type="input"
                                name="nombres_apoderado"
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
    <!-- FIN  DATOS APODERADO -->
    </div>



`;
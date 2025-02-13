export default /*html*/`

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
                        <div class="col-md-6" name="contenedor-personal">
                            <div class="form-group mt-3">
                                <label for="apellidos" class="form-label">Apellidos <span
                                        class="text-red">(*)</span></label>
                                <input id="apellidos" type="input" name="apellidos"
                                    class="form-control  form-control-sm" autocomplete="off">
                            </div>
                        </div>
                        <div class="col-md-6" name="contenedor-personal">
                            <div class="form-group mt-3">
                                <label for="nombres" class="form-label">Nombres <span
                                        class="text-red">(*)</span></label>
                                <input id="nombres" type="input" name="nombres"
                                    class="form-control  form-control-sm" autocomplete="off">
                            </div>
                        </div>
                        <div class="col-md-12">
                            <div class="form-group mt-3 mb-3">
                                <label for="obsv" class="form-label">OBVS <span class="text-red">(*)</span></label>
                                <textarea id="obsv" type="input" name="obsv" class="form-control  form-control-sm"
                                    autocomplete="off"> </textarea>
                            </div>
                        </div>
                        <div class="col-md-12">
                            <div class="row">
                                <div class="col-md-6">
                                    <div class="form-group mb-3">
                                        <label for="grado" class="form-label">Grado <span
                                                class="text-red">(*)</span></label>
                                        <select id="grado" name="grado" class="form-select form-select-sm">
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
                                        <select id="seccion" name="seccion" class="form-select form-select-sm">
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
                                <input id="dni" type="number" name="dni" class="form-control form-control-sm mayus_false"  maxlength="8"  minlength="8"
                                    data-mayus="false" autocomplete="off">
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="form-group mb-3">
                                <label for="sexo" class="form-label">Sexo <span class="text-red">(*)</span></label>
                                <select id="sexo" name="sexo" class="form-select form-select-sm">
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
                                    class="form-control form-control-sm mayus_false" data-mayus="false" autocomplete="off">
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="form-group mb-3">
                                <label for="fecha_nacimiento" class="form-label">Fecha Nac. <span
                                        class="text-red">(*)</span></label>
                                <input id="fecha_nacimiento" type="date" name="fecha_nacimiento"
                                    class="form-control form-control-sm mayus_false" data-mayus="false" autocomplete="off">
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="form-group mb-3">
                                <label for="codigo_estudiante" class="form-label">Código de acceso padre. <span
                                        class="text-red">(*)</span></label>
                                <div class="input-group mb-3">
                                    <input id="codigo_estudiante" type="text" class="form-control" name="codigo_estudiante"
                                        readonly placeholder="Recipient's username" aria-label="Recipient's username"
                                        aria-describedby="button-addon2">
                                    <button class="btn btn-primary" name="regenerate_password" type="button"
                                        id="button-addon2">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                            class="bi bi-arrow-repeat" viewBox="0 0 16 16">
                                            <path
                                                d="M11.534 7h3.932a.25.25 0 0 1 .192.41l-1.966 2.36a.25.25 0 0 1-.384 0l-1.966-2.36a.25.25 0 0 1 .192-.41zm-11 2h3.932a.25.25 0 0 0 .192-.41L2.692 6.23a.25.25 0 0 0-.384 0L.342 8.59A.25.25 0 0 0 .534 9z" />
                                            <path fill-rule="evenodd"
                                                d="M8 3c-1.552 0-2.94.707-3.857 1.818a.5.5 0 1 1-.771-.636A6.002 6.002 0 0 1 13.917 7H12.9A5.002 5.002 0 0 0 8 3zM3.1 9a5.002 5.002 0 0 0 8.757 2.182.5.5 0 1 1 .771.636A6.002 6.002 0 0 1 2.083 9H3.1z" />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                            <div class="col-md-6">
                            <div class="form-group mb-3">
                                <label for="fecha_nacimiento" class="form-label">Condicion <span
                                        class="text-red">(*)</span></label>
                                <input id="fecha_nacimiento" type="input" name="condicion_estudiante"
                                    class="form-control form-control-sm mayus_false" data-mayus="false" autocomplete="off">
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
                                        <label for="lav" class="form-label">Lav <span class="text-red">(*)</span></label>
                                        <input id="lav" type="text" name="lav" class="form-control  form-control-sm"
                                            autocomplete="off">
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="form-group mt-3">
                                        <label for="llaves" class="form-label">llaves <span
                                                class="text-red">(*)</span></label>
                                        <input id="llaves" type="text" name="llaves" class="form-control  form-control-sm"
                                            autocomplete="off">
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="form-group mt-3">
                                        <label for="pabellon" class="form-label">Pabellon <span
                                                class="text-red">(*)</span></label>
                                        <input id="pabellon" type="text" name="pabellon"
                                            class="form-control  form-control-sm" autocomplete="off">
                                    </div>
                                </div>
                                <div class="col-md-6 mt-3">
                                    <div class="form-group">
                                        <label for="ala" class="form-label">ALA <span class="text-red">(*)</span></label>
                                        <input id="ala" type="text" name="ala" class="form-control  form-control-sm"
                                            autocomplete="off">
                                    </div>
                                </div>
                                <div class="col-md-6 mt-3">
                                    <div class="form-group">
                                        <label for="cama_ropero" class="form-label">Ropero y cama <span
                                                class="text-red">(*)</span></label>
                                        <input id="cama_ropero" type="text" name="cama_ropero"
                                            class="form-control  form-control-sm" autocomplete="off">
                                    </div>
                                </div>
                                <div class="col-md-6 mt-3">
                                    <div class="form-group">
                                        <label for="duchas" class="form-label">Duchas <span
                                                class="text-red">(*)</span></label>
                                        <input id="duchas" type="text" name="duchas" class="form-control  form-control-sm"
                                            autocomplete="off">
                                    </div>
                                </div>
                                <div class="col-md-6 mt-3">
                                    <div class="form-group">
                                        <label for="banos" class="form-label">Baños <span
                                                class="text-red">(*)</span></label>
                                        <input id="banos" type="text" name="banos" class="form-control  form-control-sm"
                                            autocomplete="off">
                                    </div>
                                </div>
                                <div class="col-md-6 mt-3">
                                    <div class="form-group">
                                        <label for="urinarios" class="form-label">Urinarios <span
                                                class="text-red">(*)</span></label>
                                        <input id="urinarios" type="text" name="urinarios"
                                            class="form-control  form-control-sm" autocomplete="off">
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-12">
                            <div class="form-group mt-3 mb-3">
                                <label for="monitor_acompana" class="form-label">Monitor que acompaña <span
                                        class="text-red">(*)</span></label>
                                <input id="monitor_acompana" type="input" name="monitor_acompana"
                                    class="form-control  form-control-sm" autocomplete="off">
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
                                            (Región/Provincia/Distrito) <span class="text-red">(*)</span></label>
                                        <textarea id="lugar_nacimiento" type="text" name="lugar_nacimiento"
                                            class="form-control  form-control-sm" autocomplete="off"></textarea>
                                    </div>
                                </div>
                                <div class="col-md-4">
                                    <div class="form-group mt-3">
                                        <label for="fecha_caducidad_dni" class="form-label">Fecha de caducidad DNI <span
                                                class="text-red">(*)</span></label>
                                        <input id="fecha_caducidad_dni" type="date" name="fecha_caducidad_dni"
                                            class="form-control  form-control-sm" autocomplete="off" />
                                    </div>
                                </div>
                                <div class="col-md-4">
                                    <div class="form-group mt-3">
                                        <label for="num_telefonico" class="form-label">Número telefónico del estudiante
                                            <span class="text-red">(*)</span></label>
                                        <textarea id="num_telefonico" type="text" name="num_telefonico"
                                            class="form-control  form-control-sm" autocomplete="off"></textarea>
                                    </div>
                                </div>

                                <div class="col-md-4 mt-3">
                                    <div class="form-group">
                                        <label for="religion" class="form-label">Religión que profesa el
                                            estudiante <span class="text-red">(*)</span></label>
                                        <textarea id="religion" type="text" name="religion"
                                            class="form-control  form-control-sm" autocomplete="off"></textarea>
                                    </div>
                                </div>
                                <div class="col-md-4 mt-3">
                                    <div class="form-group">
                                        <label for="region_domicilio_actual" class="form-label">Región de domicilio actual
                                            (no el
                                            COAR) <span class="text-red">(*)</span></label>
                                        <textarea id="region_domicilio_actual" type="text" name="region_domicilio_actual"
                                            class="form-control  form-control-sm" autocomplete="off"></textarea>
                                    </div>
                                </div>
                                <div class="col-md-4 mt-3">
                                    <div class="form-group">
                                        <label for="provincia_domicilio_actual" class="form-label">Provincia de domicilio
                                            actual (no el
                                            COAR) <span class="text-red">(*)</span></label>
                                        <textarea id="provincia_domicilio_actual" type="text"
                                            name="provincia_domicilio_actual" class="form-control  form-control-sm"
                                            autocomplete="off"></textarea>
                                    </div>
                                </div>
                                <div class="col-md-4 mt-3">
                                    <div class="form-group">
                                        <label for="distrito_domicilio_actual" class="form-label"> Distrito de domicilio
                                            actual (no el
                                            COAR) <span class="text-red">(*)</span></label>
                                        <textarea id="distrito_domicilio_actual" type="text"
                                            name="distrito_domicilio_actual" class="form-control  form-control-sm"
                                            autocomplete="off"></textarea>
                                    </div>
                                </div>
                                <div class="col-md-4 mt-3">
                                    <div class="form-group">
                                        <label for="direccion_domicilio_actual" class="form-label">Dirección de domicilio
                                            actual (no el
                                            COAR) especificar
                                            avenida/jirón/calle/pasaje <span class="text-red">(*)</span></label>
                                        <textarea id="direccion_domicilio_actual" type="text"
                                            name="direccion_domicilio_actual" class="form-control  form-control-sm"
                                            autocomplete="off"> </textarea>
                                    </div>
                                </div>
                                <div class="col-md-4 mt-3 mb-2">
                                    <div class="form-group">
                                        <label for="referencia_domicilio_actual" class="form-label">Referencia de como
                                            llegar a su
                                            domicilio (plazuela, cancha deportiva,
                                            tienda comercial, etc) <span class="text-red">(*)</span></label>
                                        <textarea id="referencia_domicilio_actual" type="text"
                                            name="referencia_domicilio_actual" class="form-control  form-control-sm"
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

`;
export default (eName) => {

    return `
    <div class="modal fade" name="modal-reporte_incidencia" tabindex="-1"
        aria-hidden="true">
        <div class="modal-dialog modal-fullscreen">
            <div class="modal-content" style="height: ${(window.innerHeight - 200)}px !important">
                <div class="modal-header">
                    <h1 class="modal-title fs-4">Monitoreos</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body" >
                        <div class="row">

                            <div class="col-md-8">
                                <div class="card   radius-10 w-100 scrollable-card" >
                                    <div class="card-body">
                                         <table name="listar-estudiantes">
                                        </table>
                                    </div>
                                </div>
                            </div>

                            <div class="col-md-4">
                                <div class="card  radius-10 w-100" style="background: #76d7c4 !important">
                                    <div class="card-body">
                                      <form name="save-reporte_incidencia">
                                        <div class="row">
                                            <div class="col-md-6">
                                                <div class="form-group mb-3">
                                                    <label for="nombre" class="form-label">Grado y sección</label>
                                                        <select type="text" name="grado_seccion" class="form-control select form-control-sm" required autocomplete="off">

                                                            <option value="">Seleccione</option>
                                                       <!-- 3er Grado -->
                                                       <option value="3A">3A</option>
                                                       <option value="3B">3B</option>
                                                       <option value="3C">3C</option>
                                                       <option value="3D">3D</option>

                                                       <!-- 4to Grado -->
                                                       <option value="4A">4A</option>
                                                       <option value="4B">4B</option>
                                                       <option value="4C">4C</option>
                                                       <option value="4D">4D</option>

                                                       <!-- 5to Grado -->
                                                       <option value="5A">5A</option>
                                                       <option value="5B">5B</option>
                                                       <option value="5C">5C</option>
                                                       <option value="5D">5D</option>

                                                        </select>
                                                </div>
                                            </div>

                                            <div class="col-md-6">
                                                <div class="form-group mb-3">
                                                    <label for="nombre" class="form-label" > Fecha de emisión</label>
                                                        <input type="date" name="fecha_hora" class="form-control border-start-0 form-control-sm" autocomplete="off" required>
                                                </div>
                                            </div>


                                            <div class="col-md-6">
                                                <div class="form-group mb-3">
                                                    <label for="nombre" class="form-label" > Mes de Inicio</label>
                                                        <input type="month" name="mes_inicio" class="form-control border-start-0 form-control-sm" autocomplete="off" required>
                                                </div>
                                            </div>
                                            <div class="col-md-6">
                                                <div class="form-group mb-3">
                                                    <label for="nombre" class="form-label" > Mes fin</label>
                                                        <input type="month" name="mes_fin" class="form-control border-start-0 form-control-sm" autocomplete="off" required>
                                                </div>
                                            </div>


                                        </div>
                                        </form>
                                    </div>
                                </div>
                            </div>

                        </div>
                </div>
                <div class="modal-footer" align="center" style="display:block">
                <button type="button" class="btn btn-white pull-left btn-sm"
                            data-bs-dismiss="modal">Cerrar</button>
                        <button name="submit" type="submit"
                            class="btn btn-primary btn-primary-dark btn-sm">Guardar</button>
                </div>
            </div>
        </div>
         <modal-fotos-components></modal-fotos-components>
    </div>

    `;

}
export  default  `
        <!-- MODAL SAVE -->
        <div class="modal inmodal fade" name="modal-save-tipo-incidencia" data-backdrop="static" role="dialog" aria-hidden="true">
            <div class="modal-dialog modal-sm">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 name="save-tipo-incidencia" class="modal-title">Modal title</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <form name="save-tipo-incidencia">
                        <div class="modal-body">
                            <div class="row">
                                <div class="col-md-12 form-group mb-3">
                                    <label for="nombre_incidencia" class="form-label">Nombre Incidencia</label>
                                    <input type="text" name="nombre_incidencia" class="form-control border-start-0 form-control-sm" autocomplete="off" required>
                                             
                                </div>
                                
                                <div class="col-md-12 form-group mb-3">
                                    <label for="nivel_incidencia" class="form-label">Nivel de Incidencia</label>
                                    <select id="nivel_incidencia" name="nivel_incidencia" class="form-select form-select-sm border-start-0" autocomplete="off" required>
                                        <option value="" selected>Seleccionar...</option>
                                        <option value="NEGATIVO">NEGATIVO</option>
                                        <option value="POSIVITA">POSIVITA</option>
                                       
                                    </select>
                                </div>  
                        </div>
                        <div class="modal-footer" align="center" style="display:block">
                            <button type="button" name="cerrar" class="btn btn-white btn-sm pull-left" data-bs-dismiss="modal">Cerrar</button>
                            <button type="submit" class="btn btn-primary btn-sm">Guardar</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>

`;
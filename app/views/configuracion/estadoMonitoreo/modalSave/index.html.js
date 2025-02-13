export default (eName) => {
     return /*html*/`
         <!-- MODAL SAVE -->
        <div class="modal inmodal fade" name="modal-estado-monitoreo" data-backdrop="static"  role="dialog" aria-hidden="true">
            <div class="modal-dialog modal-md">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5  class="modal-title">Modal title</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <form name="save-estado-monitoreo">
                        <div class="modal-body">
                            <div class="row">     
                                    <div class="col-md-12">
                                        <div class="form-group">
                                            <label>Tipo </label>
                                            <select name="tipo" class="form-control form-control-sm" autocomplete="off">
                                                <option value="">Seleccione...</option>
                                                <option value="INCIDENCIA">INCIDENCIA</option>
                                                <option value="DERIVACION">DERIVACION</option>
                                            </select>
                                        </div>
                                    </div>           
                                    <div class="col-md-12">
                                        <div class="form-group">
                                            <label>Nombre </label>
                                            <input type="text" name="nombre" class="form-control form-control-sm" autocomplete="off" >
                                        </div>
                                    </div>       
                                    <div class="col-md-12" align="center">
                                        <div class="form-item">
                                            <label for="color">Color:</label>
                                            <input type="text" id="color" class="form-control form-control-sm" name="color_bg" value="#000000">
                                        </div>
                                        <div id="picker"></div>
                                    </div>                             
                            </div> 
                            
                        </div>
                        <div class="modal-footer" align="center" style="display:block">
                            <button type="button" class="btn btn-white pull-left btn-sm" data-bs-dismiss="modal">Cerrar</button>
                            <button name="submit" type="submit" class="btn btn-primary btn-primary-dark btn-sm">Guardar</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    `;
}
export default (eName) => {
     return /*html*/`
         <!-- MODAL SAVE -->
        <div class="modal inmodal fade" name="modal-save-lugar" data-backdrop="static"  role="dialog" aria-hidden="true">
            <div class="modal-dialog modal-md">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5  class="modal-title">Modal title</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <form name="save-lugar">
                        <div class="modal-body">
                            <div class="col-md-12">
                                <div class="form-group mb-3">
                                    <label for="nombre" class="form-label">Nombre <span class="text-danger">(*)</span></label>
                                    
                                    <div class="input-group"> 
                                        <span class="input-group-text bg-transparent"><i class='bx bxs-book' ></i></span>
                                        <input type="text" name="nombre" class="form-control border-start-0 form-control-sm" autocomplete="off" required/> 
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-12">
                                <div class="form-group mb-3">
                                    <label for="referencia" class="form-label">Referencia <span class="text-danger"></span></label>
                                    <div class="input-group">
                                            <span class="input-group-text bg-transparent"><i class='bx bxs-book' ></i></span>
                                        <input type="text"  name="referencia" class="form-control border-start-0 form-control-sm" autocomplete="off" />
                                    </div>
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
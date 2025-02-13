export default /*html*/`
       <!-- MODAL DELETE -->
       <div class="modal inmodal fade" name="modal-personal-delete" data-backdrop="static" tabindex="-1" role="dialog"
        aria-hidden="true">
        <div class="modal-dialog modal-sm">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 name="modal-personal-delete" class="modal-title">Eliminar Tipo Personal</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <form name="personal-delete">
                    <div class="modal-body">
                        <div class="card">
                            <div class="card-body">
                                <div class="row">
                                    <div class="col-md-12 m-0" align="center">
                                        <i class="fadeIn animated bx bx-trash" style="font-size:100px;"></i><br />
                                    </div>
                                    <div class="col-md-12" align="center">
                                        <label><input type="checkbox" name="confirmacion" required />
                                            Confirmo realizar la eliminación del Personal</label>
                                        <p style="color:red;">Esta acción no se podrá revertir</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer" align="center" style="display:block">
                        <button type="button" class="btn btn-default btn-sm pull-left" data-bs-dismiss="modal">Cerrar</button>
                        <button type="submit" name="submit" class="btn btn-danger btn-danger btn-sm">Eliminar Ahora!</button>
                    </div>
                </form>
            </div>
        </div>
    </div>

    
`;
export default /*html*/`
       <!-- MODAL DELETE -->
       <div class="modal inmodal fade" name="modal-incidencia-derivar" data-backdrop="static" tabindex="-1" role="dialog"
    aria-hidden="true">
    <div class="modal-dialog modal-sm">
        <div class="modal-content">
            <div class="modal-header">
                <h5 name="modal-incidencia-derivar" class="modal-title">Derivar Incidencia</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <form name="incidencia-derivar">
                <div class="modal-body">

                    <div class="row">
                        <div class="col-md-12 mb-2" align="center">
                            <i class="fadeIn animated lni lni-forward" style="font-size:100px;"></i><br />
                        </div>
                        <div class="col-md-12 mb-2" align="center">
                            <textarea class="form-control form-control-sm" name="motivo_derivacion" autocomplete="off"
                                required></textarea>
                        </div>
                        <div class="col-md-12 mb-2" align="center">
                            <label><input type="checkbox" name="confirmacion" required />
                                Confirmo realizar la anulacion de la incidencias</label>
                            <p style="color:red;">Esta acción no se podrá revertir</p>
                        </div>
                    </div>
                    
                </div>
                <div class="modal-footer" align="center" style="display:block">
                    <button type="button" class="btn btn-default btn-sm pull-left"
                        data-bs-dismiss="modal">Cerrar</button>
                    <button type="submit" name="submit" class="btn  btn-danger btn-sm">Derivar
                        Ahora!</button>
                </div>
            </form>
        </div>
    </div>
</div>
`;
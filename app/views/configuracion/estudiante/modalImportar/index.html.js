export default /*html*/`
        <!-- MODAL IMPORTAR -->
    <div class="modal inmodal fade" name="modal-importar" data-backdrop="static" tabindex="-1" role="dialog"
        aria-hidden="true">
        <div class="modal-dialog modal-md">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 name="importarEstudiantes" class="modal-title">Importar estudiantes</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <form name="save-importar">
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
                        <button type="button" class="btn btn-secondary btn-sm pull-left" data-bs-dismiss="modal">Cerrar</button>
                        <button type="submit" name="submit" class="btn btn-success btn-success-dark btn-sm">Procesar</button>
                    </div>
                </form>
            </div>
        </div>
    </div>

`;
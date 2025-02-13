export default /*html*/`
<div class="modal fade" name="modal-save-estudiante" tabindex="-1" aria-hidden="true">
    <div class="modal-dialog modal-fullscreen">
        <div class="modal-content">
            <div class="modal-header">
                <h1 class="modal-title fs-4">Guardar estudiante</h1>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <!-- Ajustar el form -->
            <form name="save-estudiante" class="d-flex flex-column" style="max-height: 100%; overflow: hidden;">
                <div class="modal-body flex-grow-1 overflow-auto">
                    <ul class="nav nav-tabs nav-primary" role="tablist">
                        <li class="nav-item" role="presentation">
                            <a class="nav-link active" data-bs-toggle="tab" href="#informacionGeneral" role="tab"
                                aria-selected="true">
                                <div class="d-flex align-items-center">
                                    <div class="tab-icon">
                                        <i class='bx bx-user font-18 me-1'></i>
                                    </div>
                                    <div class="tab-title">Informacion General</div>
                                </div>
                            </a>
                        </li>
                        <li class="nav-item" role="presentation">
                            <a class="nav-link" data-bs-toggle="tab" href="#informacionPadres" role="tab"
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
                            <a class="nav-link" data-bs-toggle="tab" href="#informacionApoderados" role="tab"
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
                        <div class="tab-pane fade show active" id="informacionGeneral" role="tabpanel">
                            <tab-informacion-general></tab-informacion-general>
                        </div>
                        <div class="tab-pane fade" id="informacionPadres" role="tabpanel">
                            <tab-informacion-padres></tab-informacion-padres>
                        </div>
                        <div class="tab-pane fade" id="informacionApoderados" role="tabpanel">
                            <tab-informacion-apoderados></tab-informacion-apoderados>
                        </div>
                    </div>
                </div>
                <div class="modal-footer" style="display: block;">
                    <button type="button" class="btn btn-white btn-sm pull-left" data-bs-dismiss="modal">Cerrar</button>
                    <button type="submit" class="btn btn-primary btn-primary-dark btn-sm">Guardar</button>
                </div>
            </form>
        </div>
    </div>
</div>

    

`;
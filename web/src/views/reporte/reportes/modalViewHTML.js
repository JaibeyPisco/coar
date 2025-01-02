export default `

    <div class="modal" name="modalViewGuia" tabindex="-1" role="dialog" aria-hidden="true" data-backdrop="static">
        <div class="modal-dialog modal-lg">
            <div class="modal-content" style="background:none !important;">
                <div class="text-center">
                    <button type="button" name="boton_cerrar_reporte_incidencia" class="btn btn-warning" data-bs-dismiss="modal">
                        <i class="fa fa-times"></i> Cerrar Vista
                    </button>
                    <button type="button" data-action="print" class="btn btn-default" style="margin-left:10px;">
                        <i class="fa fa-print"></i> Imprimir
                    </button>
                </div>
                <div class="modal-body">
                    <div name="contentView" style="padding:30px; border-radius:10px; background:#fff;"></div>
                </div>
            </div>
        </div>
    </div>

`;
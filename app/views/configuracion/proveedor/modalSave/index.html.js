export default /*html*/`
    
            <!-- MODAL SAVE -->
            <div class="modal inmodal fade" name="modal-save-proveedor" data-backdrop="static"  role="dialog" aria-hidden="true">
                <div class="modal-dialog modal-lg">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 name="save-proveedor" class="modal-title">Modal title</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <form name="save-proveedor">
                            <div class="modal-body">
                                
                                <div class="row">
                                    <div class="col-md-3">
                                        <div class="row">
                                            <div class="col-md-12" align="center">
                                                <div>
                                                    <img name="imagen" style="max-width:100%;" class="img_rectangle">
                                                </div>
                                                <div>
                                                    <label class="btn btn-default btn-sm" style="width:100%;">
                                                        <i class="fa fa-search"></i> Examinar
                                                        <input type="file" name="imagen" style="display:none;">
                                                    </label>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-md-9">
                                        <div class="row">
                                            <div class="col-md-6">
                                                <div class="form-group">
                                                    <label>Documento <span class="text-red">(*)</span></label>
                                                    <select data-select="DOCUMENTO_ENTIDAD" name="id_documento"class="form-control form-control-sm"></select>
                                                </div>
                                            </div>
                                            <div class="col-md-6">
                                            <label>Número DOc. <span class="text-red">(*)</span></label>
                                                <div class="input-group">
                                                    <input type="number" name="numero_documento" class="form-control form-control-sm" autocomplete="off">
                                                    
                                                </div>
                                            </div>
                                            <div class="col-md-12">
                                                <div class="form-group">
                                                    <label>Razón Social</label>
                                                    <input type="text" name="razon_social" class="form-control form-control-sm" autocomplete="off">
                                                </div>
                                            </div>
                                            <div class="col-md-12">
                                                <div class="form-group">
                                                    <label>Dirección</label>
                                                    <input type="text" name="direccion" class="form-control form-control-sm" autocomplete="off">
                                                </div>
                                            </div>
                                            <div class="col-md-12">
                                                <div class="form-group">
                                                <label>UBIGEO - (Departamento - Provincia - Distrito)</label>
                                                <div class="form-group">
                                                    <select name="id_ubigeo" data-select="UBIGEO"class="form-control select2"></select>
                                                </div>                              
                                                </div>
                                            </div>    
                                            <div class="col-md-12">
                                                <div class="form-group">
                                                    <label>Nombre (Contacto)</label>
                                                    <input type="text" name="contacto_nombre" class="form-control form-control-sm" autocomplete="off">
                                                </div>
                                            </div>
                                            <div class="col-md-12">
                                                <div class="form-group">
                                                    <label>Teléfono (Contacto)</label>
                                                    <input type="text" name="contacto_celular" class="form-control form-control-sm" autocomplete="off">
                                                </div>
                                            </div>        
                                        </div>
                                    </div>
                                </div>
                                     
                            </div>
                            <div class="modal-footer" align="center" style="display:block">
                                <button type="button" name="cerrar" class="btn btn-white pull-left btn-sm" data-bs-dismiss="modal">Cerrar</button>
                                <button type="submit" name="submit" class="btn btn-primary btn-sm">Guardar</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

`
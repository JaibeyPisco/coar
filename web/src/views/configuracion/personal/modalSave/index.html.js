export default /*html*/`
    <!-- MODAL SAVE -->
            <div class="modal inmodal fade" name="modal-personal-save" data-backdrop="static"  role="dialog" aria-hidden="true">
                <div class="modal-dialog modal-xl">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 name="save-personal" class="modal-title">Modal title</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <form name="save-personal">
                            <div class="modal-body modal-fondo">
                        
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
                                                        <div class="col-md-12" align="center">
                                                            <div>
                                                                <img name="imagen_firma" style="max-width:100%;" class="img_rectangle">
                                                            </div>
                                                            <div>
                                                                <label class="btn btn-default btn-sm" style="width:100%;">
                                                                    <i class="fa fa-search"></i> Firma Virtual
                                                                    <input type="file" name="imagen_firma" style="display:none;">
                                                                </label>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="col-md-9">
                                                    <div class="row">
                                                       

                                                        <div class="col-md-4">
                                                            <div class="form-group">
                                                                <label>Tipo de Personal <span class="text-red">(*)</span></label>
                                                                <select type="text" name="tipo_personal" data-select="TIPO_PERSONAL" class="form-control select form-control-sm" autocomplete="off">
                                                                </select>
                                                            </div>
                                                        </div>    

                                                        <div class="col-md-4">
                                                            <div class="form-group">
                                                                <label>Documento <span class="text-red">(*)</span></label>
                                                                <select data-select="DOCUMENTO_ENTIDAD" name="id_documento"class="form-control select form-control-sm"   ></select>
                                                            </div>
                                                        </div>
                                                        <div class="col-md-4">
                                                            <label>Número DOc. <span class="text-red">(*)</span></label>
                                                            <div class="input-group">
                                                                <input type="number" name="numero_documento" class="form-control form-control-sm" autocomplete="off">
                                                            </div>
                                                        </div>
                                                        <div class="col-md-6">
                                                            <div class="form-group">
                                                                <label>Nombres <span class="text-red">(*)</span></label>
                                                                <input type="text" name="nombre" class="form-control form-control-sm" autocomplete="off">
                                                            </div>
                                                        </div>
                                                        <div class="col-md-6">
                                                            <div class="form-group">
                                                                <label>Apellidos <span class="text-red">(*)</span></label>
                                                                <input type="text" name="apellido" class="form-control form-control-sm" autocomplete="off">
                                                            </div>
                                                        </div>
                                                        <div class="col-md-3">
                                                            <div class="form-group">
                                                                <label>Tipo Contratación <span class="text-red">(*)</span></label>
                                                                <div class="form-group">
                                                                    <select name="tipo_contratacion" class="form-control form-control-sm">
                                                                        <option value="">Seleccione...    
                                                                        </option><option value="DIRECTA" selected>DIRECTA
                                                                        </option><option value="TERCERO">TERCERO
                                                                    </option></select>
                                                                </div>                              
                                                            </div>
                                                        </div>   
                                                        <div class="col-md-9">
                                                            <div class="form-group">
                                                                <label>Dirección</label>
                                                                <input type="text" name="direccion" class="form-control form-control-sm" autocomplete="off">
                                                            </div>
                                                        </div>
                                                        <div class="col-md-12">
                                                        <div class="form-group">
                                                            <label>Proveedor </label>
                                                            <select data-select="PROVEEDOR" name="id_proveedor" class="form-control" disabled></select>
                                                            </div>
                                                        </div>

                                                        <div class="col-md-12">
                                                            <div class="form-group">
                                                                <label>UBIGEO - (Departamento - Provincia - Distrito)</label>
                                                                <select data-select="UBIGEO" name="id_ubigeo" class="form-select"></select>
                                                                                            
                                                            </div>
                                                        </div>    
                                                        <div class="col-md-12">
                                                            <div class="form-group">
                                                                <label>Comentario</label>
                                                                <input type="text" name="comentario1" class="form-control form-control-sm" autocomplete="off">
                                                            </div>
                                                        </div>        


                                                    </div>
                                                </div>
                                            </div>
                                    
                            </div>
                            <div class="modal-footer" align="center" style="display:block">
                                <button type="button" class="btn btn-default pull-left btn-sm" data-bs-dismiss="modal">Cerrar</button>
                                <button type="submit" class="btn btn-primary btn-primary btn-sm">Guardar</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
`;
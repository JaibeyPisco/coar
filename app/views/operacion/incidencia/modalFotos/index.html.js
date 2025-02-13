export  default  /*html*/`
                 <!-- MODAL ARCHIVO -->
                <div class="modal inmodal fade" name="modal-fotos" data-backdrop="static"  role="dialog" aria-hidden="true">
                    <div class="modal-dialog modal-lg">
                        <div class="modal-content">
                            <div class="modal-header">
                                 <h5  class="modal-title">Fotos adjunts</h5>
                                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                                <div class="modal-body">
                                <div class="row">  
                                    <div class="col-md-12">          
                                        <table class="table" style="width:100%;">
                                            <thead>
                                                <tr>
                                                  
                                                    <th>IMAGEN</th>
                                                    <th>DESCRIPCIÓN</th>
                                                    <th></th>
                                                </tr>
                                            </thead>
                                            <tbody name="lista_fotos"></tbody>
                                        </table> 
                                    </div>
                                </div>                              
                            </div>
                            <div class="modal-footer" align="center" style="display:block">
                                <button type="button" name="cerrar" class="btn btn-white pull-left" data-bs-dismiss="modal">Cerrar</button>
                            </div>
                        </div>
                    </div>
                </div>    
`
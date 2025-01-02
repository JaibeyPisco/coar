/**
 * @author Gerson Magán
 * @email gersonctk@hotmail.com
 * @create date 2021-02-04 15:09:03
 * @modify date 2021-02-04 15:09:03
 * @desc [description]
 */

import Imprimir_caja from './Imprimir.js'
import Comp_reporte_caja_chica from './reporte/CajaChicaReporte.js'

let DOM, DOM_ID ;
let Componente = {
    render: async (d) => {

        $('#main').off();
        d.innerHTML = `

        <div id="main">
            <!-- Content Header (Page header) -->
            <section class="content-header">
                <!--breadcrumb-->
                    <div class="page-breadcrumb d-none d-sm-flex align-items-center mb-3">
                        <div class="breadcrumb-title pe-3">Tesoreria</div>
                        <div class="ps-3">
                            <nav aria-label="breadcrumb">
                                <ol class="breadcrumb mb-0 p-0">
                                    <li class="breadcrumb-item"><a href="javascript:;"><i class="fadeIn animated bx bx-money"></i></a>
                                    </li>
                                    <li class="breadcrumb-item active" aria-current="page">Caja Chica</li>
                                </ol>
                            </nav>
                        </div>
                        <div class="ms-auto">
                            <div data-contenedor="caja_chica_abierto" align="right">
                                <!--<button type="button" class="btn btn-sm btn-primary" name="nuevo"><i class="fadeIn animated bx bx-list-plus"></i> Nuevo Movimiento</button>-->
                                <button type="button" class="btn btn-sm btn-danger" name="cerrar_caja"><i class="lni lni-money-protection"></i> Cerrar Caja</button>
                            </div>
                        </div>
                    </div>
                <!--end breadcrumb-->
            </section>

            <!-- Main content -->
            <section class="content">

                <div data-contenedor="caja_chica_abierto" style="display:none;">
                    <div class="card border-default border-bottom border-3 radius-10 w-100">
                        <div class="card-body">
                            <div class="row">        
                                <div class="col-md-4">
                                    <div class="info-box bg-yellow">
                                        <span class="info-box-icon">
                                            <i class="fa fa-flag"></i>
                                        </span>
                            
                                        <div class="info-box-content">
                                            <span class="info-box-text">INICIAL</span>
                                            <span class="info-box-number contador_animate" name="saldo_inicial">0.00</span>
                                
                                            <div class="progress">
                                                <div class="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100" id="progress_bar_inicial"></div>
                                            </div>
                                            <span class="progress-description">
                                                    
                                            </span>
                                        </div>
                                        <!-- /.info-box-content -->
                                    </div>
                                </div>
                                <!--
                                <div class="col-md-3">
                                    <div class="info-box bg-aqua">
                                        <span class="info-box-icon"><i class="fa fa-arrow-circle-up"></i></span>
                            
                                        <div class="info-box-content">
                                        <span class="info-box-text">INGRESOS</span>
                                        <span class="info-box-number contador_animate" name="total_ingreso">0.00</span>
                            
                                        <div class="progress">
                                            <div class="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100" id="progress_bar_ingreso"></div>
                                        </div>

                                        <span class="progress-description">
                                        
                                        </span>
                                        </div>
                                    </div>
                                </div>
                                -->
                                <div class="col-md-4">
                                    <div class="info-box bg-red">
                                        <span class="info-box-icon"><i class="fa fa-arrow-circle-down"></i></span>
                            
                                        <div class="info-box-content">
                                        <span class="info-box-text">EGRESOS</span>
                                        <span class="info-box-number contador_animate" name="total_egreso">0</span>
                            
                                        <div class="progress">
                                            <div class="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100" id="progress_bar_egreso"></div>
                                        </div>
                                        <span class="progress-description">
                                                
                                        </span>
                                        </div>
                                        <!-- /.info-box-content -->
                                    </div>
                                </div>
                                <div class="col-md-4">
                                    <div class="info-box bg-green">
                                        <span class="info-box-icon"><i class="fa fa-coins"></i></span>
                            
                                        <div class="info-box-content">
                                        <span class="info-box-text">SALDO</span>
                                        <span class="info-box-number contador_animate" name="total_saldo">0</span>
                            
                                        <div class="progress">
                                            <div class="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100" id="progress_bar_saldo"></div>
                                        </div>
                                        <span class="progress-description">
                                            
                                        </span>
                                        </div>
                                        <!-- /.info-box-content -->
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- Default box -->
                    <div class="box box-warning">
                        <div class="box-body">
                            <div class="card border-default border-bottom border-3 radius-10 w-100">
                                <div class="card-body">
                                    <div class="table-responsive">
                                        <table name="registros" class="table table-striped table-hover table-bordered border-default border-2" style="width:100%; font-weight: 500; font-size: 13px; vertical-align: middle;"></table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- /.box -->
                </div>

                <div data-contenedor="caja_chica_cerrado" style="display:none;">
                    
                    <div style="width:320px; margin:auto;">
                        <!-- Default box -->
                       
                        <div class="card">
                            <div class="card-body">
                                 
                                <form name="save_apertura">
                                    <div class="row">
                                        <div class="col-md-12">
                                            <div class="form-group mb-3">
                                                <label>Usuario de Sistema</label>
                                                <div class="form-group">
                                                    <input type="text" class="form-control" value="`+GLOBAL.usuario.nombre+` `+GLOBAL.usuario.apellido+`" readonly />
                                                </div>                              
                                            </div>
                                        </div>
                                        <div class="col-md-7">
                                            <div class="form-group">
                                                <label>Fecha <span class="text-red">(*)</span></label>
                                                <div class="form-group">
                                                    <input type="date" class="form-control" name="fecha" value="`+HELPER.fecha(null, 'YYYY-MM-DD')+`" required />
                                                </div>                              
                                            </div>
                                        </div>
                                        <div class="col-md-5">
                                            <div class="form-group">
                                                <label>Hora <span class="text-red">(*)</span></label>
                                                <div class="form-group">
                                                <input type="time" class="form-control" name="hora" value="`+HELPER.fecha(null, 'HH:mm')+`" required />
                                                </div>                              
                                            </div>
                                        </div>
                                        <div class="col-md-12 mt-3">
                                            <label>Importe Inicial <span class="text-red">(*)</span></label>
                                            <div class="form-group">
                                                <div class="input-group">
                                                    <span class="input-group-addon">`+GLOBAL.moneda_sistema.simbolo+`</span>
                                                    <input type="number" step="any" name="saldo_inicial" class="form-control" autocomplete="off" list="list-contacto_nombre">
                                                </div>                                   
                                            </div>   
                                        </div>
                                        <div class="col-md-12 mt-3 mb-3" align="center" style="padding:5px;">
                                            <label><input type="checkbox" required/> Acepto aperturar caja</label>
                                        </div>
                                        <div class="col-md-12">
                                            <button type="submit" class="btn btn-primary btn-lg" style="width:100%;"><i class="fa fa-plus-circle"></i>  APERTURAR CAJA</button>
                                        </div>
                                    </div>
                                </form>                                
                            </div>
                        </div>
                        <!-- /.box -->                           
                    </div>

                    
                </div>

            </section>
            <!-- /.content -->

            <!-- MODAL SAVE -->
            <div class="modal inmodal fade" name="modal-save" data-backdrop="static"  role="dialog" aria-hidden="true">
                <div class="modal-dialog modal-lg">
                    <div class="modal-content">
                        <div class="modal-header">
                            <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>
                            <h4 name="save" class="modal-title">Modal title</h4>
                        </div>
                        <form name="save">
                            <div class="modal-body">
                                <div class="row">
                                    <div class="col-md-4">
                                        <div class="form-group">
                                            <label>Tipo Movimiento<span class="text-red">(*)</span></label>
                                            <select name="tipo_movimiento" class="form-control select">
                                                <option value="">Seleccione...</option>
                                                <option value="INGRESO">INGRESO</option>
                                                <option value="EGRESO">EGRESO</option>
                                            </select>                           
                                        </div>
                                    </div>
                                    <div class="col-md-4">
                                        <div class="form-group">
                                            <label>Fecha <span class="text-red">(*)</span></label>
                                            <div class="form-group">
                                            <input type="date" class="form-control" name="fecha" />
                                            </div>                              
                                        </div>
                                    </div>
                                    <div class="col-md-4">
                                        <div class="form-group">
                                            <label>Motivo <span class="text-red">(*)</span></label>
                                            <input type="text" name="motivo" class="form-control" list="list-motivo_caja" autocomplete="off" />
                                            <datalist id="list-motivo_caja">
                                                <option value="GASTOS OPERATIVOS" />
                                                <option value="COMBUSTIBLE" />
                                                <option value="OTROS" />
                                            </datalist>
                                        </div>
                                    </div>
                                    <div class="col-md-8">
                                        <div class="form-group">
                                            <label>Descripción <span class="text-red">(*)</span></label>
                                            <input type="text" class="form-control" name="descripcion" autocomplete="off" />                             
                                        </div>
                                    </div>
                                    <div class="col-md-4">
                                        <div class="form-group">
                                            <label>Modalidad de Pago <span class="text-red">(*)</span></label>
                                            <input type="text" name="modalidad" class="form-control" list="list-modalidad" />
                                            <datalist id="list-modalidad">
                                                <option value="">
                                                <option value="TRANSFERENCIA" />
                                                <option value="EFECTIVO" />
                                                <option value="CHEQUE" />
                                                <option value="DEPÓSITO" />   
                                            </select>
                                        </div>
                                    </div>    
                                    <div class="col-md-4">
                                        <div class="form-group">
                                            <label>Importe <span class="text-red">(*)</span></label>
                                            <input type="text" name="importe" class="form-control" autocomplete="off">
                                        </div>                         
                                    </div> 
                                   
                                    <div class="col-md-4" data-campo="id_tipo_persona" data-contenedor="tipo_persona">
                                        <div class="form-group">
                                            <label>Persona <span class="text-red">(*)</span></label>
                                            <select name="id_tipo_persona" data-select="ID_TIPO_PERSONA" class="form-control"></select>                          
                                        </div>
                                    </div>
                                    <div class="col-md-12">
                                        <div class="form-group">
                                            <label>Observación</label>
                                            <textarea name="observacion" class="form-control"></textarea>                          
                                        </div>
                                    </div>
                                                    
                                </div>
                            </div>
                            <div class="modal-footer" align="center" style="display:block">
                                <button type="button" name="cerrar" class="btn btn-white pull-left" data-dismiss="modal">Cerrar</button>
                                <button type="submit" name="submit" class="btn btn-primary">Guardar</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

            <!-- MODAL ANULADO -->
            <div class="modal inmodal fade" name="modal-anular" data-backdrop="static" tabindex="-1" role="dialog" aria-hidden="true">
                <div class="modal-dialog modal-sm">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h4 name="anular" class="modal-title">ANULAR</h4>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <form name="anular">
                            <div class="modal-body">
                                <div class="card">
                                    <div class="card-body">
                                        <div class="row">
                                            <div class="col-md-12" align="center">
                                                <i class="lni lni-ban p-4" style="color: red; font-size: 100px;"></i>
                                            </div>                                           
                                            <div class="col-md-12">
                                                <div class="form-group">
                                                    <label>Comentario</label>
                                                    <textarea required name="comentario" class="form-control" rows="3"></textarea>
                                                </div>                         
                                            </div>
                                            <div class="col-md-12"  align="center" style="padding-top:10px;">
                                                <label><input type="checkbox" name="confirmacion" required/>
                                                    Confirmo realizar la denegación</label>
                                                <p style="color:red;">Esta acción no se podrá revertir</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>                               
                            </div>
                            <div class="modal-footer" align="center" style="display:block" >
                                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button> 
                                <button type="submit" name="submit" class="btn btn-danger">Anular Ahora!</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

            <!-- MODAL DELETE -->
            <div class="modal inmodal fade" name="modal-delete" data-backdrop="static" tabindex="-1" role="dialog" aria-hidden="true">
                <div class="modal-dialog modal-sm">
                    <div class="modal-content">
                        <div class="modal-header">
                            <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">×</span><span class="sr-only">Close</span></button>
                            <h4 name="delete" class="modal-title">Modal title</h4>
                        </div>
                        <form name="delete">
                            <div class="row">
                                <div class="col-md-12" align="center">
                                    <i class="fad fa-trash-alt fa-4x"></i><br/>
                                </div>
                                <div class="col-md-12"  align="center" style="padding-top:10px;">
                                    <label><input type="checkbox" name="confirmacion" required/>
                                        Confirmo realizar la anulación</label>
                                    <p style="color:red;">Esta acción no se podrá revertir</p>
                                </div>
                                <div class="col-md-12" name="texto" align="center">

                                </div>
                            </div>
                            <div class="modal-footer" align="center" style="display:block" >
                                <button type="button" name="cerrar" class="btn btn-white" data-dismiss="modal">Cerrar</button>
                                <button type="submit" name="submit" class="btn btn-danger">Anular Ahora!</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

            <!-- MODAL SAVE CIERRE -->
            <div class="modal inmodal fade" name="modal-save_cierre" data-backdrop="static" tabindex="-1" role="dialog" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h4 name="save_cierre" class="modal-title">Modal title</h4>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <form name="save_cierre">                            
                            <div class="modal-body" style="display:block" >
                                <div class="row">
                                    <div class="col-md-12">
                                        <div class="form-group mb-3">
                                            <label>Usuario de Sistema</label>
                                            <div class="form-group">
                                                <input type="text" class="form-control form-control-sm" value="`+GLOBAL.usuario.nombre+` `+GLOBAL.usuario.apellido+`" readonly />
                                            </div>                              
                                        </div>
                                    </div>

                                    <div class="col-md-4">
                                        <div class="form-group">
                                            <label>Fecha Apertura<span class="text-danger"> (*)</span></label>
                                            <div class="form-group">
                                                <input type="text" class="form-control form-control-sm" name="fecha_apertura" disabled />
                                            </div>                              
                                        </div>
                                    </div>
                                    <div class="col-md-4">
                                        <div class="form-group">
                                            <label>Fecha Cierre<span class="text-danger"> (*)</span></label>
                                            <div class="form-group">
                                                <input type="date" class="form-control form-control-sm" name="fecha" required />
                                            </div>                              
                                        </div>
                                    </div>
                                    <div class="col-md-4">
                                        <div class="form-group">
                                            <label>Hora Cierre<span class="text-danger"> (*)</span></label>
                                            <div class="form-group">
                                            <input type="time" class="form-control form-control-sm" name="hora" required />
                                            </div>                              
                                        </div>
                                    </div>
                                    
                                    <div class="col-md-12">
                                       <table class="table table-striped mt-3" style="width:100%;">
                                            <tr>
                                                <td>SALDO INICIAL</td>
                                                <td>`+GLOBAL.moneda_sistema.simbolo+` <span name="cierre-saldo_inicial" style="float:right;"></span></td>
                                            </tr>
                                            <!--
                                            <tr>
                                                <td>INGRESOS</td>
                                                <td>`+GLOBAL.moneda_sistema.simbolo+` <span name="cierre-total_ingreso" style="float:right;"></span></td>
                                            </tr>
                                            -->
                                            <tr>
                                                <td>EGRESOS</td>
                                                <td>`+GLOBAL.moneda_sistema.simbolo+` <span name="cierre-total_egreso" style="float:right;"></span></td>
                                            </tr>
                                            <tr>
                                                <td colspan="2" style="border-bottom:solid; border-width:1px;"></td>
                                            </tr>
                                            <tr>
                                                <td>SALDO FINAL</td>
                                                <td>`+GLOBAL.moneda_sistema.simbolo+` <span name="cierre-total_saldo" style="float:right;"></span></td>
                                            </tr>
                                       </table>
                                    </div>
                                    <div class="col-md-12"  align="center" style="padding-top:10px;">
                                        <label><input type="checkbox" name="confirmacion" required/>
                                            Confirmo realizar el cierre de caja</label>
                                    </div>
                                </div>
                            </div>
                            <div class="modal-footer" align="center" style="display:block" >
                                <button type="button" name="cerrar" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                                <button type="submit" name="submit" class="btn btn-danger">Cerrar Caja</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        

        </div>            
        `;

        Componente.after_render();     
        
    },

    after_render: async () => {

        DOM_ID = '#main';
        DOM = $(DOM_ID);

        /** SUBMIT SAVE */
        DOM.find('form[name="save"]').validate({

            /* REGLAS */
            rules: {
                tipo_movimiento: {required: true},
                fecha: {required: true},
                motivo: {required: true},
                modalidad: {required: true},
                id_moneda: {required: true},
                importe: {required: true},
                descripcion: {required: true},
                id_cuenta_bancaria_persona: {required: true},
                cuenta_bancaria_persona: {required: true},
                tipo_cambio: {required:true},
            },
          
            messages: {
                tipo_movimiento: 'Tipo de Movimiento',
                fecha: 'Fecha',
                motivo: 'Motivo',
                modalidad: 'Modalidad',
                id_moneda: 'Moneda',
                importe: 'Importe',
                descripcion: 'Descripción',
                id_cuenta_bancaria_persona: 'Cuenta Bancaria de la Persona',
                cuenta_bancaria_persona: 'Cuenta Bancaria de la Persona',
                tipo_cambio: 'Tipo Cambio'
            },

            submitHandler: function() {
                Componente.submit();
            }
          
        });

        /** SUBMIT APERTURA */
        DOM.find('form[name="save_apertura"]').validate({
            submitHandler: function() {
                console.log(GLOBAL.usuario)
                if (GLOBAL.usuario.id_local != null){
                    Componente.submit_apertura();
                }else {
                    const mensaje ="Debe estár vinculado a un local para abrir caja";
                    HELPER.notificacion(mensaje, 'danger');
                }

            }
          
        });

        /** SUBMIT CIERRE */
        DOM.find('form[name="save_cierre"]').validate({

            submitHandler: function() {
                Componente.submit_cierre();
            }
          
        });

        /* DATATABLE UPDATE*/
        DOM.on('click', 'button[name="update_datatable"]', function(e) {
            e.stopImmediatePropagation();
            Componente.table.ajax.reload(null, false);
        });

        /** SUBMIT DELETE */
        DOM.find('form[name="delete"]').validate({
            submitHandler: function() {
                Componente.submit();
            }
        });

        /** SUBMIT DENEGAR PETICION */
        DOM.find('form[name="anular"]').validate({
            submitHandler: function() {
                Componente.submit();
            }
        });

        /* NUEVO */
        DOM.on('click', 'button[name="nuevo"]', function(e) {
            e.stopImmediatePropagation();
            Componente.new();
        });

        /* CERRAR CAJA */
        DOM.on('click', 'button[name="cerrar_caja"]', function(e) {
            e.stopImmediatePropagation();
            Componente.cerrar_caja();
        });

        /* PRINT */
        DOM.on('click', 'button[name="row-print"]', function(e) {
            e.stopImmediatePropagation();
            
            let data = HELPER.get_attr_json($(this));
            Imprimir_caja.print(data.id);
        });

        /* ANULAR */
        DOM.on('click', 'button[name="row-anular"]', function(e) {
            e.stopImmediatePropagation();
            Componente.anular_compra($(this));
        });


        /* ELIMINAR */
        DOM.on('click', 'a[name="row-delete"]', function(e) {
            e.stopImmediatePropagation();
            Componente.delete($(this));
        });

        /* CHANGE TIPO  */
        DOM.on('change', 'select[name="tipo_movimiento"]', function(e) {
            e.stopImmediatePropagation();
            if(Componente.fl_auto_event == true)
            {
                Componente.change_tipo_movimiento();
            }            
        });

        

        /* CHANGE ID TIPO PERSONA */
        DOM.on('change', 'select[name="id_tipo_persona"]', function(e) {
            e.stopImmediatePropagation();
            if(Componente.fl_auto_event == true)
            {
                // Componente.select_cuenta_bancaria_persona();
             
            }            
        });

        /* CHANGE CUENTA BANCARIA PERSONA*/
        DOM.on('change', 'select[name="id_cuenta_bancaria_persona"]', function(e) {
            e.stopImmediatePropagation();
            if(Componente.fl_auto_event == true)
            {
                Componente.change_id_cuenta_bancaria_persona();
            }            
        });

        DOM.find('input[name="fecha_inicio"]').val(HELPER.fecha_actual());
        DOM.find('input[name="fecha_fin"]').val(HELPER.fecha_actual());

        await Componente.verificar_caja_chica_existente();        
        await Componente.select_tipo_persona();

        HELPER.load_component();
    },

    /**** DATA */
    id: null,
    action_submit: null,
    imagen_anterior: null,
    fl_auto_event: true,
    id_caja:null,
    id_compra: null,
    id_compra_equipo: null,

    /************ */

    change_tipo_movimiento: () => {

        let tipo = DOM.find('select[name="tipo_movimiento"]').val();

        if(tipo == 'EGRESO')
        {
            DOM.find('select[name="id_manifiesto"]').prop('disabled', false);
            DOM.find('input[name="modalidad"]').prop('readonly', false);
            DOM.find('div[data-contenedor="tipo_persona"]').show('slow');
        }
        else if(tipo == 'INGRESO')
        {
            DOM.find('select[name="id_manifiesto"]').prop('disabled', true);
            DOM.find('input[name="modalidad"]').val('EFECTIVO');
            DOM.find('input[name="modalidad"]').prop('readonly', true);
            DOM.find('div[data-contenedor="tipo_persona"]').hide('fast');
        }
 
    },

    verificar_caja_chica_existente: async () => {

        await axios.get(BASE_API + 'tesoreria/cajaChica/verificar_caja_chica_existente')
        .then(async function (response) {

            let mensaje = 'CAJA ABIERTA';
            let estilo = '#61c05f';

            DOM.find('div[data-contenedor="caja_chica_cerrado"]').hide('slow');
            DOM.find('div[data-contenedor="caja_chica_abierto"]').hide('slow');

            if(response.data.caja_chica == null)
            {

                mensaje = 'CAJA CERRADA',
                estilo = '#D10B1E';

                if(response.data.ultima_caja != null)
                {
                    DOM.find('input[name="saldo_inicial"]').val(response.data.ultima_caja.total_saldo);
                }
                
                DOM.find('div[data-contenedor="caja_chica_cerrado"]').show('slow');
            }
            else
            {
                if(response.data.caja_chica.estado == 'ABIERTO')
                {
                    Componente.id = response.data.caja_chica.id;
                    Componente.datatable();
                    DOM.find('div[data-contenedor="caja_chica_abierto"]').show('slow');

                    DOM.find('span[name="saldo_inicial"]').attr('value_contador_animate', response.data.caja_chica.saldo_inicial);
                    DOM.find('span[name="total_ingreso"]').attr('value_contador_animate', response.data.caja_chica.total_ingreso);
                    DOM.find('span[name="total_egreso"]').attr('value_contador_animate', response.data.caja_chica.total_egreso);
                    DOM.find('span[name="total_saldo"]').attr('value_contador_animate', response.data.caja_chica.total_saldo);

                    Componente.calcular_porcentajes_progress(response.data.caja_chica.saldo_inicial, response.data.caja_chica.total_ingreso, response.data.caja_chica.total_egreso, response.data.caja_chica.total_saldo);

                    HELPER.counter_animate(1000, 2);
                }
                else
                {                    
                    DOM.find('div[data-contenedor="caja_chica_cerrado"]').show('slow');
                }
                
            }

            document.querySelector('div[name="mensaje_caja"]').innerHTML = `
                <span style="font-weight: bold; font-size: 30px;color: ${estilo}">  ${mensaje}</span>
            `;
            
        }).catch(error => {
            console.log(error);
        }); 
    },

    actualizar_totales: () => {
        axios.get(BASE_API + 'tesoreria/cajaChica/get_totales/'+Componente.id)
        .then(async function (response) {

            DOM.find('span[name="saldo_inicial"]').text(response.data.saldo_inicial);
            DOM.find('span[name="total_ingreso"]').text(response.data.total_ingreso);
            DOM.find('span[name="total_egreso"]').text(response.data.total_egreso);
            DOM.find('span[name="total_saldo"]').text(response.data.total_saldo);

            Componente.calcular_porcentajes_progress(response.data.saldo_inicial, response.data.total_ingreso, response.data.total_egreso, response.data.total_saldo);
            
        }).catch(error => {
            console.log(error);
        }); 
    },

    calcular_porcentajes_progress: (inicial, ingreso, egreso, saldo) => {

        var porIngreso = (parseFloat(ingreso) / parseFloat(inicial)) * 100;
        var porEgreso = (parseFloat(egreso) / parseFloat(inicial)) * 100;
        var porSaldo = (parseFloat(saldo) / parseFloat(inicial)) * 100;

        DOM.find('div[id="progress_bar_inicial"]').css('width', '100%');
        DOM.find('div[id="progress_bar_ingreso"]').css('width', porIngreso.toFixed(0) + "%");
        DOM.find('div[id="progress_bar_egreso"]').css('width', porEgreso.toFixed(0) + "%");
        DOM.find('div[id="progress_bar_saldo"]').css('width', porSaldo.toFixed(0) + "%");

    },
 
    select_tipo_persona: async () => {

        try {
           
            HELPER.templateSelect(
                'data-select="ID_TIPO_PERSONA"',
                'configuracion/personal/get_select',
                true

            );
             
        } catch (error) {
            console.log(error)
        } 
 
    },

    datatable: function() {

        this.table = DOM.find('table[name="registros"]').DataTable({
            ajax:   {
                    url: BASE_API + 'tesoreria/caja/index_caja_chica',
                    data: function (d) {
                        d.fecha_inicio = DOM.find('input[name="fecha_inicio"]').val();
                        d.fecha_fin = DOM.find('input[name="fecha_fin"]').val();
                        d.id = Componente.id;
                    }
            },

            columns: [
                { title: 'ID_CAJA_CHICA', mData: 'id_caja_chica', visible:false },
                { title: 'ID_CAJA', mData: 'id', visible:false },
                { title: 'ID_COMPRA', mData: 'id_compra', visible:false },
                {
                    title: 'ACCIÓN',
                    defaultContent: ``,                    
                    render: function(data, type, row) {

                        var html = `

                            <div class="btn-group">
                                <button type="button" class="btn btn-default btn-sm"  name="row-print" href="javascript:;"><i class="fadeIn animated bx bx-printer" style="font-size: 18px;"></i> IMPRIMIR</button>
                                <button type="button" class="btn btn-primary btn-sm split-bg-primary dropdown-toggle dropdown-toggle-split" data-bs-toggle="dropdown"><span class="visually-hidden">Toggle Dropdown</span></button>
                                <div class="dropdown-menu dropdown-menu-right dropdown-menu-lg-end">	
                                    <button class="dropdown-item" type="button" class="btn btn-default btn-sm" style="font-size:14px;" name="row-anular"><i class="lni lni-ban" style="color: red; font-size: 14px;"></i> ANULAR</button> 
                                </div>
                            </div>
                        `;

                        const estado = {
                            'ANULADO': 0,
                            'ACEPTADO': 3
                        }


                        if (GLOBAL.usuario.fl_supervisor == 1){

                            if(row.fl_estado == estado.ANULADO){

                                html = `
                                    <button type="button" class="btn btn-default btn-sm" style="font-size:14px;" name="row-print"><i class="fadeIn animated bx bx-printer" style="font-size: 18px;"></i> IMPRIMIR</button> 
                                `;
                            }

                        } else if (GLOBAL.usuario.fl_supervisor != 1){

                            if(row.fl_estado == estado.REGISTRADO){
                                html = ``;
                            }

                        }

                        return html;
                    }
                },
                { title: 'ESTADO', defaultContent: ``,                    
                    render: function(data, type, row) {
                        
                        let html = ``;

                        if(row.fl_estado == 0)
                        {
                            html = `
                                <span class="badge bg-gradient-moonlit text-white shadow-sm w-100">ANULADO</span>
                            `;
                        }
                        else if(row.fl_estado == 1)
                        {
                            html = `
                                <span class="badge bg-gradient-lush text-white shadow-sm w-100">ACEPTADO</span>
                            `;
                        }
                        else if(row.fl_estado == 2)
                        {
                            html = `
                                <span class="badge bg-gradient-lush text-white shadow-sm w-100">ACEPTADO</span>
                            `;
                        }
                        else if(row.fl_estado == 3)
                        {
                            html = `
                                <span class="badge bg-gradient-lush text-white shadow-sm w-100">ACEPTADO</span>
                            `;
                        }

                        return html;
                    }
                },
                { title: 'T. MOV.', mData: 'tipo_movimiento' },
                { title: 'FECHA', render: function(data, type, row) { return HELPER.fecha(row.fecha); }},
                { title: 'TIPO COMPRA', mData: 'tipo_compra' },
                { title: 'CODIGO', mData: 'codigo' },                
                { title: 'IMPORTE', render: function(data, type, row) { return '<span style="float:left;">'+row.simbolo_moneda+'</span> '+row.importe; }, class:'text-right'},
                { title: 'PERSONA', mData: 'nombre_completo' },
            ],
            createdRow: function (row, data, indice) {
                $(row).attr('data-json', JSON.stringify(data));

                if(data.fl_estado == 0)
                {
                    $(row).css('text-decoration', 'line-through');
                    $(row).css('color', 'red');
                }
            },
        });

    },

    cerrar_caja: async () => {
        
        let accion = 'save_cierre';
        let form = DOM.find('form[name="save_cierre"]');

        DOM.find('h4[name="'+accion+'"]').text('Cierre de Caja ');

        /** DATA */
        HELPER.reset_form(form);

        await axios.get(BASE_API + 'tesoreria/cajaChica/get_totales/'+Componente.id)
        .then(async function (response) {

            DOM.find('span[name="cierre-saldo_inicial"]').text(response.data.saldo_inicial);
            //DOM.find('span[name="cierre-total_ingreso"]').text(response.data.total_ingreso);
            DOM.find('span[name="cierre-total_egreso"]').text('-'+response.data.total_egreso);
            DOM.find('span[name="cierre-total_saldo"]').text(response.data.total_saldo);
            form.find('input[name="fecha_apertura"]').val(HELPER.fecha(response.data.fecha_apertura, 'DD/MM/YYYY h:mm a'));

        }).catch(error => {
            console.log(error);
        }); 

        form.find('input[name="fecha"]').val(HELPER.fecha(null, 'YYYY-MM-DD'));
        form.find('input[name="hora"]').val(HELPER.fecha(null, 'HH:mm'));

        Componente.action_submit = accion;

        DOM.find('div[name="modal-'+accion+'"]').modal('show');
    },

    get_correlativo: async () => {

        await axios.get(BASE_API+'tesoreria/caja/get_correlativo')
        .then(function (response) {

            DOM.find('input[name="numero"]').val(response.data.numero);
            DOM.find('input[name="serie"]').val(response.data.serie);

        }).catch(error => {
            console.log(error);
        });

    },

    new: function() {

        let accion = 'save';
        let form = DOM.find('form[name="save"]');

        DOM.find('h4[name="'+accion+'"]').text('Nuevo ');

        /** DATA */
        HELPER.reset_form(form);

        form.find('input[name="fecha"]').val(HELPER.fecha_actual());
        
        this.get_correlativo();

        form.find('select[name="id_moneda"]').val(1).change();

        Componente.id = null;
        Componente.action_submit = accion;
        
        DOM.find('div[data-campo="fl_no_liquidacion_manifiesto"]').hide();
        DOM.find('tbody[name="detalle-cuenta_bancaria"]').html('');
        DOM.find('div[name="modal-'+accion+'"]').modal('show');
    },

    anular_compra: async (row) => {
        DOM.find('div[name="modal-save"]').modal('hide');

        let data = HELPER.get_attr_json(row);

        console.log(data);

        let accion = 'anular';

        Componente.id = data.id_caja_chica;

        Componente.id_caja = data.id;

        Componente.id_compra = data.id_compra;

        Componente.id_compra_equipo = data.id_compra_equipo;

        Componente.action_submit = accion;
        
        DOM.find('div[name="modal-'+accion+'"]').modal('show');
    },

    enviar_notificacion: (tipo, datos, message, array_agregar_noti) => {
        switch (tipo) {
            
            case 'anulado':
                GLOBAL.socket.emit('notificacion_privada', { userId: array_agregar_noti.id_receiver, message: message, row: array_agregar_noti })
                break;

            default:
                break;
        }
    },

    delete: function(row) {

        let accion = 'delete';
        let form = DOM.find('form[name="'+accion+'"]');

        DOM.find('h4[name="'+accion+'"]').text('Anular Caja');

        /** DATA */
        HELPER.reset_form(form);
        
        let data = HELPER.get_attr_json(row);

        form.find('div[name="texto"]').text(data.serie+'-'+data.numero);

        Componente.id = data.id;
        Componente.action_submit = accion;

        DOM.find('div[name="modal-'+accion+'"]').modal('show');
    },

    submit: function() {
        
        let ladda = HELPER.ladda(DOM_ID+' form[name="' + this.action_submit + '"] button[type="submit"]');
        let formData = new FormData(document.querySelector(DOM_ID+' form[name="' + this.action_submit + '"]'));

        if (Componente.id != null) { formData.append('id', Componente.id); }
        if (Componente.id_caja != null) { formData.append('id_caja', Componente.id_caja); }
        if (Componente.id_compra != null) { formData.append('id_compra', Componente.id_compra); }
        if (Componente.id_compra_equipo != null) { formData.append('id_compra_equipo', Componente.id_compra_equipo); }

        axios({
            method: 'post',
            url: BASE_API + 'tesoreria/cajaChica/' + this.action_submit,
            data: formData
        })
        .then(function(response) {

            Componente.table.ajax.reload(null, false);
            Componente.actualizar_totales();
            DOM.find('div[name="modal-'+Componente.action_submit+'"]').modal('hide');
            HELPER.notificacion(response.data.mensaje, response.data.tipo);

            if(Componente.action_submit == 'save')
            {
                Imprimir_caja.print(response.data.id_caja);
            }

            if(response.data.notificacion == 'anulado' && response.data.tipo_compra == 'compra'){
                /* ENVIAR NOTIFICACION */
                axios({
                    method: 'post',
                    url: BASE_API + 'notificacion/compra/compra/' + response.data.notificacion,
                    data: formData
                })
                .then(function(response) {
                    
                    /* ENVIAR NOTIFICACION */
                    Componente.enviar_notificacion(response.data.tipo, response.data.datos, response.data.message, response.data.array_agregar_noti);
                    /* FIN ENVIAR NOTIFICACION */

                }).catch(error => {
                    console.log(error);
                });
                /* FIN ENVIAR NOTIFICACION */
            }else if(response.data.notificacion == 'anulado' && response.data.tipo_compra == 'compra_equipo'){
                /* ENVIAR NOTIFICACION */
                axios({
                    method: 'post',
                    url: BASE_API + 'notificacion/compraequipo/compra/' + response.data.notificacion,
                    data: formData
                })
                .then(function(response) {
                    
                    /* ENVIAR NOTIFICACION */
                    Componente.enviar_notificacion(response.data.tipo, response.data.datos, response.data.message, response.data.array_agregar_noti);
                    /* FIN ENVIAR NOTIFICACION */

                }).catch(error => {
                    console.log(error);
                });
                /* FIN ENVIAR NOTIFICACION */
            }

            ladda.stop();
        }).catch(error => {
            ladda.stop();
        });
    },

    submit_apertura: function() {
        
        let ladda = HELPER.ladda(DOM_ID+' form[name="save_apertura"] button[type="submit"]');
        let formData = new FormData(document.querySelector(DOM_ID+' form[name="save_apertura"]'));

        if (Componente.id != null) { formData.append('id', Componente.id); }

        axios({
            method: 'post',
            url: BASE_API + 'tesoreria/cajaChica/save_apertura',
            data: formData
        })
        .then(function(response) {
            Componente.verificar_caja_chica_existente();
            HELPER.notificacion(response.data.mensaje, 'success');
            ladda.stop();
        }).catch(error => {
            ladda.stop();
        });
    },

    submit_cierre: function() {
        
        let ladda = HELPER.ladda(DOM_ID+' form[name="save_cierre"] button[type="submit"]');
        let formData = new FormData(document.querySelector(DOM_ID+' form[name="save_cierre"]'));

        formData.append('id_caja_chica', Componente.id);

        axios({
            method: 'post',
            url: BASE_API + 'tesoreria/cajaChica/save_cierre',
            data: formData
        })
        .then(function(response) { 
            Comp_reporte_caja_chica.imprimir(Componente.id);
            Componente.verificar_caja_chica_existente();
            DOM.find('div[name="modal-save_cierre"]').modal('hide');
            HELPER.notificacion(response.data.mensaje, 'success');
            Componente.table.destroy();
            ladda.stop();
        }).catch(error => {
            ladda.stop();
        });
    },

} 

export default Componente;
 

let DOM, DOM_ID, eView ;
let Componente = {
    render: (d) => {
        
        $('#main').off();

        eView = d;
        eView.innerHTML = /*html*/`

        <div id="main">
            <!--breadcrumb-->
            <div class="page-breadcrumb d-none d-sm-flex align-items-center mb-3">
                <div class="breadcrumb-title pe-3">Configuracion</div>
                <div class="ps-3">
                    <nav aria-label="breadcrumb">
                        <ol class="breadcrumb mb-0 p-0">
                            <li class="breadcrumb-item"><a href="javascript:;"><i class="fadeIn animated bx bx-slider-alt"></i></a>
                            </li>
                            <li class="breadcrumb-item active" aria-current="page">Empresa</li>
                        </ol>
                    </nav>
                </div>
            </div>
           
            <!-- Main content -->
            <section class="content">
                <!-- Default box -->
                <div class="card">
                    <form name="save">
                        <div class="card-body">                        
                            <div class="row">
                                <div class="col-md-3" align="center">
                                    <div class="row">
                                        <div class="col-md-12 mb-3" align="center">
                                            <div>
                                                <img name="imagen" style="max-width:100%;" class="img_rectangle">
                                            </div>
                                            <div class="mt-1">
                                                <label class="btn btn-default btn-sm" style="width:100%;">
                                                    <i class="fa fa-search"></i> Examinar Logo 
                                                    <input type="file" name="imagen" style="display:none;">
                                                </label>
                                            </div>
                                        </div>

                                        <div class="col-md-12 mb-3" align="center">
                                            <div>
                                                <img name="imagen_factura" style="max-width:100%;" class="img_rectangle">
                                            </div>
                                            <div class="mt-1">
                                                <label class="btn btn-default btn-sm" style="width:100%;">
                                                    <i class="fa fa-search"></i> Logo para documentos
                                                    <input type="file" name="imagen_factura" style="display:none;">
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-9">
                                    <div class="row">
                                        <div class="col-md-4">   
                                            <div class="form-group mb-3">
                                                <label for="numero_documento" class="form-label">Número RUC <span class="text-red">(*)</span></label>
                                                <div class="input-group"> <span class="input-group-text bg-transparent"><i class='bx bxs-detail' ></i></span>
                                                    <input id="numero_documento" type="number" name="numero_documento" class="form-control border-start-0 form-control-sm" autocomplete="off">
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-md-8">
                                            <div class="form-group">
                                                <label for="razon_social" class="form-label">Razón Social <span class="text-red">(*)</span></label>
                                                <div class="input-group"> <span class="input-group-text bg-transparent"><i class='bx bxs-coin' ></i></span>
                                                    <input id="razon_social" type="text" name="razon_social" class="form-control border-start-0 form-control-sm" autocomplete="off" >
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-md-12">
                                            <div class="form-group mb-3">
                                                <label for="nombre_comercial" class="form-label">Nombre Comercial <span class="text-red">(*)</span></label>
                                                <div class="input-group"> <span class="input-group-text bg-transparent"><i class='bx bxs-drink' ></i></span>
                                                    <input id="nombre_comercial" type="text" name="nombre_comercial" class="form-control form-control-sm" autocomplete="off" >
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-md-12">
                                            <div class="form-group mb-3">
                                                <label for="direccion" class="form-label">Dirección <span class="text-red">(*)</span></label>
                                                <div class="input-group"> <span class="input-group-text bg-transparent"><i class='bx bxs-home-circle' ></i></span>
                                                    <input id="direccion" type="text" name="direccion" class="form-control form-control-sm" autocomplete="off" >
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-md-6">
                                            <div class="form-group">
                                                <label for="telefono" class="form-label">Teléfono <span class="text-red">(*)</span></label>
                                                <div class="input-group"> <span class="input-group-text bg-transparent"><i class='bx bxs-phone-call' ></i></span>
                                                    <input id="telefono" type="text" name="telefono" data-minus="true" class="form-control form-control-sm minus" autocomplete="off" >
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-md-6">
                                            <div class="form-group">
                                                <label for="email" class="form-label">Correo electrónico <span class="text-red">(*)</span></label>
                                                <div class="input-group"> <span class="input-group-text bg-transparent"><i class='bx bxs-envelope' ></i></span>
                                                    <input id="email" type="email" name="email" data-minus="true" class="form-control form-control-sm minus" autocomplete="off" >
                                                </div>
                                            </div>
                                        </div>                                       
                                    </div>
                                </div>                        
                            </div>
                        </div>
                        <div class="card-footer d-flex align-items-end justify-content-end">
                            <button type="button" name="submit" class="btn btn-primary btn-primary-dark m-2 btn-sm">Guardar</button>
                        </div>
                    </form>
                </div>
                <!-- /.box -->

                <my-page></my-page>
            </section>
            <!-- /.content -->
        </div>            
        `;
        Componente.after_render();
 
    },

    after_render: () => {

        DOM_ID = '#main';
        DOM = $(DOM_ID);        

        
        /** VALIDATE SUBMIT SAVE */
        DOM.find('form[name="save"]').validate({
                          
            /* REGLAS */
            rules: {
              numero_documento: {required: true},
              razon_social: {required: true},
              nombre_comercial: {required: true},
              direccion: {required: true},
              telefono:{required: true},
              email: {required: true},
             
            },
          
            messages: {
                numero_documento: 'Número de Documento',
                razon_social: 'Razón Social',
                nombre_comercial: 'Nombre Comercial',
                direccion: 'Dirección',
                telefono: 'Teléfono',
                email: 'Correo Electrónico',
            }

        });

        DOM.on('click', 'form[name="save"] button[name="submit"]', function(e) {

            e.stopImmediatePropagation();

            if(DOM.find('form[name="save"]').valid())
            {
                Componente.submit();
            }
            
        });
      
        /* PREVIEW IMAGEN */
        DOM.find('input[name="imagen"]').change(function(e) {
            e.stopImmediatePropagation();
            HELPER.preview_image(this, DOM.find('img[name="imagen"]'));
        });

        /* PREVIEW IMAGEN */
        DOM.find('input[name="imagen_factura"]').change(function(e) {
            e.stopImmediatePropagation();
            HELPER.preview_image(this, DOM.find('img[name="imagen_factura"]'));
        });

        Componente.get();        
    },

    /**** DATA */
    id: null,
    action_submit: null,
    imagen_anterior: null,
    /************ */
    
    get: async function() {
        
        axios.get(BASE_API + 'configuracion/empresa')
        .then(function(response) {

            let data = response.data;

            let form = DOM.find('form[name="save"]');

            form.find('input[name="numero_documento"]').val(data.numero_documento);
            form.find('input[name="razon_social"]').val(data.razon_social);
            form.find('input[name="nombre_comercial"]').val(data.nombre_comercial);
            form.find('input[name="direccion"]').val(data.direccion);
            form.find('input[name="telefono"]').val(data.telefono);
            form.find('input[name="email"]').val(data.email);
            form.find('img[name="imagen"]').attr('src', BASE_FILES+'images/'+data.logo);
            form.find('img[name="imagen_factura"]').attr('src', BASE_FILES+'images/'+data.logo_factura);            
          
            Componente.imagen_anterior = data.logo;
            Componente.imagen_factura_anterior = data.logo_factura;
            Componente.action_submit = 'save';

        }).catch(error => {
            console.log(error);
        }); 
    },
    
    submit: function() {
        
        let ladda = HELPER.ladda(DOM_ID+' form[name="' + this.action_submit + '"] button[name="submit"]');
        let formData = new FormData(document.querySelector(DOM_ID+' form[name="' + this.action_submit + '"]'));

        if (this.id != null) { formData.append('id', this.id); }
        if (this.imagen_anterior != null) { formData.append('imagen_anterior', this.imagen_anterior); }
        if (this.imagen_factura_anterior != null) { formData.append('imagen_factura_anterior', this.imagen_factura_anterior); }

        axios({
            method: 'post',
            url: BASE_API + 'configuracion/empresa/' + this.action_submit,
            data: formData
        })
        .then(function(response) {
            Componente.get();
            DOM.find('div[name="modal-'+Componente.action_submit+'"]').modal('hide');
            HELPER.notificacion(response.data.mensaje, response.data.tipo);
            ladda.stop();
        }).catch(error => {
            HELPER.notificacion(response.data.mensaje, response.data.tipo);
            ladda.stop();
        });
    },
} 

export default Componente;
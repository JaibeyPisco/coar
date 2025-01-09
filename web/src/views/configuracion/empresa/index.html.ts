export default  /*html*/`

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
                                            <input id="numero_documento" type="number" name="numero_documento" class="form-control border-start-0 form-control-sm" autocomplete="off" required>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-8">
                                    <div class="form-group">
                                        <label for="razon_social" class="form-label">Razón Social <span class="text-red">(*)</span></label>
                                        <div class="input-group"> <span class="input-group-text bg-transparent"><i class='bx bxs-coin' ></i></span>
                                            <input id="razon_social" type="text" name="razon_social" class="form-control border-start-0 form-control-sm" autocomplete="off" required >
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-12">
                                    <div class="form-group mb-3">
                                        <label for="nombre_comercial" class="form-label">Nombre Comercial <span class="text-red">(*)</span></label>
                                        <div class="input-group"> <span class="input-group-text bg-transparent"><i class='bx bxs-drink' ></i></span>
                                            <input id="nombre_comercial" type="text" name="nombre_comercial" class="form-control form-control-sm" autocomplete="off" required>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-12">
                                    <div class="form-group mb-3">
                                        <label for="direccion" class="form-label">Dirección <span class="text-red">(*)</span></label>
                                        <div class="input-group"> <span class="input-group-text bg-transparent"><i class='bx bxs-home-circle' ></i></span>
                                            <input id="direccion" type="text" name="direccion" class="form-control form-control-sm" autocomplete="off" required >
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="form-group">
                                        <label for="telefono" class="form-label">Teléfono <span class="text-red">(*)</span></label>
                                        <div class="input-group"> <span class="input-group-text bg-transparent"><i class='bx bxs-phone-call' ></i></span>
                                            <input id="telefono" type="text" name="telefono" data-minus="true" class="form-control form-control-sm minus" autocomplete="off" required >
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="form-group">
                                        <label for="email" class="form-label">Correo electrónico <span class="text-red">(*)</span></label>
                                        <div class="input-group"> <span class="input-group-text bg-transparent"><i class='bx bxs-envelope' ></i></span>
                                            <input id="email" type="email" name="email" data-minus="true" class="form-control form-control-sm minus" autocomplete="off" required >
                                        </div>
                                    </div>
                                </div>                                       
                            </div>
                        </div>                        
                    </div>
                </div>
                <div class="card-footer d-flex align-items-end justify-content-end">
                    <button type="submit" name="submit" class="btn btn-primary btn-primary-dark m-2 btn-sm">Guardar</button>
                </div>
            </form>
        </div>
        <!-- /.box -->

        <my-page></my-page>
    </section>
    <!-- /.content -->
</div>            
`;

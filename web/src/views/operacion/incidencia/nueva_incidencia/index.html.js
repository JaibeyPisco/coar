export default /*html*/`
<div id="main">
    <!--breadcrumb-->
    <div class="page-breadcrumb d-none d-sm-flex align-items-center mb-3">
        <div class="breadcrumb-title pe-3">Operaciones</div>
        <div class="ps-3">
            <nav aria-label="breadcrumb">
                <ol class="breadcrumb mb-0 p-0">
                    <li class="breadcrumb-item"><a href="javascript:;"><i
                                class="fadeIn animated bx bx-slider-alt"></i></a>
                    </li>
                    <li class="breadcrumb-item active" aria-current="page">Nueva Incidencia</li>
                </ol>
            </nav>
        </div>

    </div>

    <!-- Main content -->
    <section class="content">
        <div class="row row-cols-1 row-cols-md-12 row-cols-lg-12 row-cols-xl-12   ">
            <div class="col">
                <div class="card">
                    <div class="card-body">
                        <ul class="nav nav-tabs nav-primary" role="tablist">
                            <li class="nav-item" role="presentation">
                                <a class="nav-link active" data-bs-toggle="tab" href="#primaryhome" role="tab" aria-selected="true">
                                    <div class="d-flex align-items-center">
                                        <div class="tab-icon"><i class='bx bx-book-add font-18 me-1'></i>
                                        </div>
                                        <div class="tab-title">Nuevo</div>
                                    </div>
                                </a>
                            </li>
                        </ul>
                        <div class="tab-content py-3">
                            <div class="tab-pane fade show active" id="primaryhome" role="tabpanel">
                                <form name="save-incidencia">
                                   
                                    <div class="row">
                                        <div class="col-md-2">
                                            <div class="form-group">
                                                <div class="form-group mb-3 ">
                                                    <label class="form-label" for="numero">N° Inicidencia</label>
                                                    <input id="numero" type="text" data-name="numero" class="form-control form-control-sm" autocomplete="off" readonly="">   
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-md-2">
                                            <div class="form-group">
                                                <div class="form-group mb-3 ">
                                                    <label class="form-label" for="numero">Fecha y hora</label>
                                                    <input   type="datetime-local" name="fecha_hora" class="form-control form-control-sm" autocomplete="off" required>   
                                                </div>
                                            </div>
                                        </div>
                                        
                                        <div class="col-md-4">
                                            <div class="form-group mb-3">
                                                <label class="form-label" for="id_tipo_incidencia">Tipo Incidencia</label>
                                                <select   name="id_tipo_incidencia" data-select="TIPOINCIDENCIA" class="form-control-sm form-control" autocomplete="off" required></select>
                                            </div>
                                        </div>
                
                                        <div class="col-md-4">
                                            <div class="form-group mb-3">
                                                <label class="form-label" >Lugar de la Incidencia</label>
                                                <select name="id_lugar_incidencia" data-select="LUGAR" class="form-control-sm form-control" autocomplete="off" required></select>
                                            </div>
                                        </div>
<!--                                        <div class="col-md-10">-->
<!--                                            <div class="form-group mb-3">-->
<!--                                                <label class="form-label" for="id_estudiante_principal">Estudiante (Responsable)</label>-->
<!--                                                <select id="id_estudiante_principal" name="id_estudiante_principal" data-select="ESTUDIANTE" class="form-control-sm form-control"-->
<!--                                                autocomplete="off" required></select>-->
<!--                                            </div>-->
<!--                                        </div>-->
                
                                        <div class="col-md-12">
                                            <div class="form-group mb-3">
                                                <label class="form-label">Añadir estudiante</label>
                                                <div name="estudiantes"></div>
                                                <button id="nuevo_item" type="button" class="btn btn-secondary btn-sm" name="nuevo_item"><i
                                                        class="fa fa-plus"></i> Agregar Alumno</button>
                                            </div>
                                        </div>
                
                                        <div class="col-md-6">
                                            <div class="form-group mb-3">
                                                <label class="form-label" for="descripcion">Describe la incidencia</label>
                                                <div id="descripcion" name="descripcion"></div>
                                            </div>
                                        </div>
                                        
                                        <div class="col-md-6">
                                              <foto-component></foto-component>
                                        </div>

                                        </div>

                                    <div class="modal-footer" align="center" style="display:block">
                                        <button type="submit" class="btn btn-primary btn-primary-dark btn-sm" style="width:100%;">Guardar</button>
                                    </div>
                                </form>
                            </div>       
                    </div>
                </div>
            </div>
          
    </section>
</div>
`;
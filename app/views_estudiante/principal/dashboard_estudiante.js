let DOM, DOM_ID ;
let Componente = {
    render: async (d, data) => {
        
        $('#main').off();
        d.innerHTML = `
        <style>
            h3{
                margin:0 !important;
            }

            p{
                margin:0 !important;
            }
        </style>
        <div id="main" style="display:none;">
            <!-- Main content -->
            <section class="content" name="contenedor-dashboard">
                <div class="card">
                    <div class="card-body">
                        <div class="row mb-3">
                            <div class="col-md-8 content-header" style="padding-top:5px;">
                                <h1 style="margin:0; font-size: 25px;">
                                    Hola <strong>`+data.usuario.nombre+`,</strong> te damos la bienvenida.
                                </h1>
                            </div>
                        </div>
                        <div class="row row-cols-1 row-cols-md-2 row-cols-xl-4">
                            <div class="col">
                                <div class="card radius-10 bg-primary bg-gradient">
                                    <div class="card-body">
                                        <div class="d-flex align-items-center">
                                            <div>
                                                <p class="mb-0 text-white">Total Usuarios</p>
                                                <h4 id="total_usuarios" class="my-1 text-white"></h4>
                                            </div>
                                            <div class="text-dark ms-auto font-35"><i class="bx bxs-group"></i>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="col">
                                <div class="card radius-10 bg-danger bg-gradient">
                                    <div class="card-body">
                                        <div class="d-flex align-items-center">
                                            <div>
                                                <p class="mb-0 text-white">Total Productos</p>
                                                <h4 id="total_productos" class="my-1 text-white">$89,245</h4>
                                            </div>
                                            <div class="text-dark ms-auto font-35"><i class="fadeIn animated bx bx-box"></i>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col">
                                <div class="card radius-10 bg-warning bg-gradient">
                                    <div class="card-body">
                                        <div class="d-flex align-items-center">
                                            <div>
                                                <p class="mb-0 text-dark">Total Users</p>
                                                <h4 class="text-dark my-1">24.5K</h4>
                                            </div>
                                            <div class="text-dark ms-auto font-35"><i class='bx bx-user-pin'></i>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col">
                                <div class="card radius-10 bg-success bg-gradient">
                                    <div class="card-body">
                                        <div class="d-flex align-items-center">
                                            <div>
                                                <p class="mb-0 text-white">Comments</p>
                                                <h4 class="my-1 text-white">8569</h4>
                                            </div>
                                            <div class="text-white ms-auto font-35"><i class='bx bx-comment-detail'></i>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col">
                                <div class="card radius-10 bg-success">
                                    <div class="card-body">
                                        <div class="d-flex align-items-center">
                                            <div>
                                                <p class="mb-0 text-white">Revenue</p>
                                                <h4 class="my-1 text-white">$4805</h4>
                                                <p class="mb-0 font-13 text-white"><i class="bx bxs-up-arrow align-middle"></i>$34 from last week</p>
                                            </div>
                                            <div class="widgets-icons bg-white text-success ms-auto"><i class="bx bxs-wallet"></i>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col">
                                <div class="card radius-10 bg-info">
                                    <div class="card-body">
                                        <div class="d-flex align-items-center">
                                            <div>
                                                <p class="mb-0 text-dark">Total Customers</p>
                                                <h4 class="my-1 text-dark">8.4K</h4>
                                                <p class="mb-0 font-13 text-dark"><i class="bx bxs-up-arrow align-middle"></i>$24 from last week</p>
                                            </div>
                                            <div class="widgets-icons bg-white text-dark ms-auto"><i class="bx bxs-group"></i>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col">
                                <div class="card radius-10 bg-danger">
                                    <div class="card-body">
                                        <div class="d-flex align-items-center">
                                            <div>
                                                <p class="mb-0 text-white">Store Visitors</p>
                                                <h4 class="my-1 text-white">59K</h4>
                                                <p class="mb-0 font-13 text-white"><i class="bx bxs-down-arrow align-middle"></i>$34 from last week</p>
                                            </div>
                                            <div class="widgets-icons bg-white text-danger ms-auto"><i class="bx bxs-binoculars"></i>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col">
                                <div class="card radius-10 bg-warning">
                                    <div class="card-body">
                                        <div class="d-flex align-items-center">
                                            <div>
                                                <p class="mb-0 text-dark">Bounce Rate</p>
                                                <h4 class="my-1 text-dark">34.46%</h4>
                                                <p class="mb-0 font-13 text-dark"><i class="bx bxs-down-arrow align-middle"></i>12.2% from last week</p>
                                            </div>
                                            <div class="widgets-icons bg-white text-dark ms-auto"><i class='bx bx-line-chart-down'></i>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>   
                        </div>
                    </div>
                </div>
            </section>


        </div>            
        `;

        await Componente.after_render();       
        
    },

    after_render: async () => {

        DOM_ID = '#main';
        DOM = $(DOM_ID);        

        Componente.dash_resumen_pro();
        
        if(GLOBAL.usuario.fl_no_dashboard == 1)
        {
            DOM.find('section[name="contenedor-dashboard"]').remove();
        }

        $('#main').fadeIn(500);
        HELPER.load_component();
    },
    

    dash_resumen_pro: () => {
        axios.get(BASE_API+'dashboard/dashboard/dash_resumen_pro')
        .then(function (response) {

            DOM.find('h4[id="total_usuarios"]').text(response.data.cantidad_usuarios);
            DOM.find('h4[id="total_productos"]').text(response.data.cantidad_productos);
            
        }).catch(error => {
            console.log(error);
        }); 
    }

} 

export default Componente;
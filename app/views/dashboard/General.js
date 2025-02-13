


let DOM, DOM_ID, eView ;
let Componente = {
    render: async (d, data) => {
        
        $('#main').off();
        eView = d;
        eView.innerHTML = /*html*/`

        <style>
            h3{
                margin:0 !important;
            }

            p{
                margin:0 !important;
            }
        </style>

        <div id="main" style="display:none;">
            <section class="content" name="contenedor-dashboard">
                <div class="row">
                    <div class="col-sm-12 col-md-12 col-lg-5 mb-3 content-header" style="padding-top:5px;">
                        <h1 style="margin:0; margin-top:10px;font-size: 25px;">
                            Hola <strong>SOPORTE,</strong> te damos la bienvenida.
                        </h1>
                    </div>
                    <div class="col-sm-12 col-md-12 col-lg-7">
                        <div class="card" style="border:0;">
                            <div class="card-body">
                                <div class="row">
                                    <div class="col-md-4 mt-1 mb-1">
                                        <div class="input-group"> 
                                            <span class="input-group-text" id="inputGroup-sizing-default">Desde</span>
                                            <input id="desde" type="date" class="form-control" data-filter="startDate"  aria-describedby="inputGroup-sizing-default">
                                        </div>
                                    </div>
                                    <div class="col-md-4 mt-1 mb-1">
                                        <div class="input-group"> 
                                            <span class="input-group-text" id="inputGroup-sizing-default">Desde</span>
                                            <input id="hasta" type="date" class="form-control" data-filter="endDate"  aria-describedby="inputGroup-sizing-default">
                                        </div>
                                    </div>
                                    <div class="col-md-4 mt-1">
                                        <button data-action="filter" class="btn btn-primary btn-primary-dark" style="width:100%;">
                                            <i class="far fa-filter"></i> Filtrar
                                        </button>
                                    </div>
                                </div>
                             </div>
                        </div>
                    </div>
                </div>
                <div class="card">
                    <div class="card-body">                   
                        <div class="row row-cols-1 row-cols-md-2 row-cols-xl-4">
                            <div class="col">
                                <div class="card radius-10 bg-primary bg-gradient">
                                    <div class="card-body">
                                        <div class="d-flex align-items-center">
                                            <div>
                                                <p class="mb-0 text-white">Total Incidencias</p>
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
                <div class="row">
                   <div class="col-12 col-lg-8 d-flex">
                      <div class="card radius-10 w-100">
						<div class="card-header">
							<div class="d-flex align-items-center">
								<div>
									<h6 class="mb-0">Estudiantes Con mayor Incidencia</h6>
								</div>
								<div class="dropdown ms-auto">
								</div>
							</div>
						</div>
						  <div class="card-body">
						     <table class="table table-striped">
                              <thead>
                                <tr>
                                  <th scope="col">#</th>
                                  <th scope="col">Nombre</th>
                                  <th scope="col">Cantidad Incidencia</th>
                                </tr>
                              </thead>
                              <tbody name="estudiantesConMayorIncidencias">
                                                                       
                                </tbody>
                            </table>   
						  </div>
					  </div>
				   </div>
				   <div class="col-12 col-lg-4 d-flex">
                       <div class="card radius-10 w-100">
						<div class="card-header">
							<div class="d-flex align-items-center">
								<div>
									<h6 class="mb-0">5 Tipos de incidencias</h6>
								</div>
								<div class="dropdown ms-auto">
									<a class="dropdown-toggle dropdown-toggle-nocaret" href="#" data-bs-toggle="dropdown"><i class='bx bx-dots-horizontal-rounded font-22 text-option'></i>
									</a>
									<ul class="dropdown-menu">
										<li><a class="dropdown-item" href="javascript:;">Action</a>
										</li>
										<li><a class="dropdown-item" href="javascript:;">Another action</a>
										</li>
										<li>
											<hr class="dropdown-divider">
										</li>
										<li><a class="dropdown-item" href="javascript:;">Something else here</a>
										</li>
									</ul>
								</div>
							</div>
						</div>
						   <div class="card-body">
							<div class="chart-container-2">
								<canvas id="tipo_incidencias_char" ></canvas>
							  </div>
						   </div>
						   <ul class="list-group list-group-flush" name="labelsCharTipoIncidencia">
						   
						    </ul>
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

        await  Componente.getCantidades();

       await  Componente.getData();

        if(GLOBAL.usuario.fl_no_dashboard == 1)
        {
            DOM.find('section[name="contenedor-dashboard"]').remove();
        }

        $('#main').fadeIn(500);

        document.querySelector('input[data-filter="startDate"]').value = HELPER.primer_dia_mes();
        document.querySelector('input[data-filter="endDate"]').value = HELPER.fecha_actual();

        document.querySelector('button[data-action="filter"]').addEventListener('click', function(){
            Componente.getData();
        });

        HELPER.load_component();
    },

    getData: async () =>{

        await  Componente.getEstudiantesIndenciaMayor();
        await Componente.tipoDeIncidenciasChar();
    },

    getCantidades: async function () {
        const cantidades = (await  axios.get(BASE_API + 'dashboard/dashboard/getCantidades')).data
        eView.querySelector('#total_usuarios').innerText  = cantidades.cantidad_incidencias;
    },

    getEstudiantesIndenciaMayor: async  () =>{

        let parametros = {
            startDate: eView.querySelector('input[data-filter="startDate"]').value,
            endDate: eView.querySelector('input[data-filter="endDate"]').value,
        };

        const  estudiantesConincidencias = (await  axios.get(BASE_API + 'dashboard/dashboard/getEstudiantesIndenciaMayor?'+ HELPER.objToUrl(parametros)) ).data
        let element = eView.querySelector('tbody[name="estudiantesConMayorIncidencias"]');

        let contador = 1;
        estudiantesConincidencias.forEach(incidencia => {
            element.innerHTML +=`
                <tr>
                  <th scope="row">${contador}</th>
                  <td>${incidencia.estudiante}</td>
                  <td>${incidencia.total_incidencias}</td>
                </tr> 
            
            `;

            contador += 1;
        })

    } ,

    tipoDeIncidenciasChar: async  () =>{
        let parametros = {
            startDate: eView.querySelector('input[data-filter="startDate"]').value,
            endDate: eView.querySelector('input[data-filter="endDate"]').value,
        };

        var ctx = document.getElementById("tipo_incidencias_char").getContext('2d');

        const  tiposDeIncidencias = (await  axios.get(BASE_API + 'dashboard/dashboard/getTiposDeIncidenciasChar?'+ HELPER.objToUrl(parametros))).data

        const labelsCharTipoIncidencia = eView.querySelector('ul[name="labelsCharTipoIncidencia"]');
        let elementosHTML = '';



        var data = {
            labels: [],
            datasets: [{
                label: 'Incidencias',
                data: [],
                backgroundColor: [],
                hoverBackgroundColor: [],
                borderWidth: 1
            }]
        };

        tiposDeIncidencias.forEach((incidencia, index) => {

            data.labels.push(incidencia.nombre_incidencia);
            data.datasets[0].data.push(incidencia.total_incidencias);

            const randomColor = Componente.getRandomColor();


            var gradientStroke = ctx.createLinearGradient(0, 0, 0, 300);
            gradientStroke.addColorStop(0, randomColor);
            gradientStroke.addColorStop(1, randomColor);


            data.datasets[0].backgroundColor.push(gradientStroke);
            data.datasets[0].hoverBackgroundColor.push(gradientStroke);

            elementosHTML += `
                <li class="list-group-item d-flex bg-transparent justify-content-between align-items-center border-top">
                    ${incidencia.nombre_incidencia} <span class="badge rounded-pill text-black-50" style="background-color: ${randomColor}">${incidencia.total_incidencias}</span>
                </li>
            `;


        });

        labelsCharTipoIncidencia.innerHTML = elementosHTML;

        var myChart = new Chart(ctx, {
            type: 'doughnut',
            data: data,
            options: {
                maintainAspectRatio: false,
                cutout: 82,
                plugins: {
                    legend: {
                        display: false,
                    },
                }
            }
        });
    },

    getRandomColor: function() {
        var h = Math.floor(Math.random() * 360); // Random hue
        var s = Math.floor(Math.random() * 20) + 80; // Random saturation between 80 and 100
        var l = Math.floor(Math.random() * 20) + 40; // Random lightness between 40 and 60
        return 'hsl(' + h + ',' + s + '%,' + l + '%)';
    }

} 

export default Componente;
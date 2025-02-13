export default async function(datos_estudiante, fechaDesde, fechaHasta, datasa){

    let data = {
        "logo": "/coar/icono_coar.png",
        "titulo": "INCIDENCIAS",
        "fechaDesde": fechaDesde,
        "fechaHasta": fechaHasta,
        "nombre_completo_estudiante": datos_estudiante.apellidos_nombres ? datos_estudiante.apellidos_nombres : "N/A",
        "grado_seccion_estudiante": datos_estudiante.grado_seccion ?  datos_estudiante.grado_seccion : "N/A",
        "sexo_estudiante": datos_estudiante.sexo ? datos_estudiante.sexo : "N/A",
        "religion_estudiante": datos_estudiante.religion ? datos_estudiante.religion : "N/A",
        "dni_estudiante": datos_estudiante.dni ? datos_estudiante.dni : "N/A",
        "correo_electronico_estudiante": datos_estudiante.correo_electronico ? datos_estudiante.correo_electronico : "N/A"
    };

    await HELPER.sleep(100);

    let bodyHtml = HELPER.template(body(), {

        logo: BASE_FILES+'/images'+data.logo,
        titulo: data.titulo,
        fechaDesde: HELPER.fecha(data.fechaDesde),
        fechaHasta: HELPER.fecha(data.fechaHasta),
        nombre_completo_estudiante: data.nombre_completo_estudiante,
        grado_seccion_estudiante: data.grado_seccion_estudiante,
        sexo_estudiante: data.sexo_estudiante,
        religion_estudiante: data.religion_estudiante,
        dni_estudiante: data.dni_estudiante,
        correo_electronico_estudiante: data.correo_electronico_estudiante,
        
    });
    
    let elementHTML = document.createElement('div');
    elementHTML.innerHTML = bodyHtml;

    let detalleHTML = '';

    datasa.forEach(row => {

        let estado_incidencia = null;

        if (row.necesita_abordaje_directa === "1") {
            estado_incidencia = '<div class="etiqueta-espera-abordaje">Espera de Abordaje</div>';
        } else if (row.se_soluciono == "1"){
            estado_incidencia = '<div class="etiqueta-solucionado">Solucionado</div>';
        } else if (row.incidencia_derivada == "1") {
            estado_incidencia = '<div class="etiqueta-espera-abordaje">Espera de Abordaje</div>';
        } else if (row.incidencia_cerrada == "1") {
            estado_incidencia = '<div class="etiqueta-cerrado">Cerrado</div>';
        } else {
            estado_incidencia = '<div class="etiqueta-pendiente">Pendiente</div>';
        }
        
        detalleHTML += HELPER.template(detail(), {
            fecha_incidencia: row.fecha,
            serie_numero: row.serie_numero,
            nombre_incidencia: row.nombre_incidencia,
            se_soluciono: row.se_soluciono == 1 ? "Si" : "No",
            nombre_completo_encargado_incidencia: row.nombre_completo_encargado_incidencia,
            descripcion_incidencia: row.describir_incidencia,
            estado_incidencia: estado_incidencia,
            esta_comentario_atencion_incidencia: row.comentario_atencion_incidencia ? "block" : "none", 
            comentario_atencion_incidencia: row.comentario_atencion_incidencia,
            esta_acuerdo_atencion_abordaje : row.acuerdos ? "block" : "none",
            acuerdo_atencion_abordaje: row.acuerdos
        });

    });    

    elementHTML.querySelector('div[name="detail"]').innerHTML = detalleHTML;

    return head() + elementHTML.innerHTML;

}

function body() {
    
    let html = /*html*/ `  

        <body>
            <div class="invoice-box">
                <table cellpadding="0" cellspacing="0" style="width:100%;">
                    <tr class="top">
                        <td colspan="2">
                            <table  style="width:100%;">
                                <tr>
                                    <td>
                                        <div style="display:flex; flex-direction: column; justity-content: center; align-items: center;">
                                            <img src="{{logo}}" style="max-width:140px; max-height:100px;" />
                                            <span style="font-weight:bold; font-size:16px; margin-top: 1px;">{{titulo}}</span>
                                        </div>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                    <tr>
                        <td colspan="2">
                            <table class="noPadding"   style="width:100%;">
                                <tr>
                                    <td style="width:15%;">Fecha Desde</td>
                                    <td style="width:35%;">: {{fechaDesde}}</td>
                                    <td style="width:15%;">Fecha Hasta</td>
                                    <td style="width:35%;">: {{fechaHasta}}</td>
                                </tr>
                                <tr>
                                    <td>Estudiante</td>
                                    <td>: {{nombre_completo_estudiante}}</td>
                                    <td>Grado y Sección</td>
                                    <td>: {{grado_seccion_estudiante}}</td>
                                </tr>
                                <tr>
                                    <td>Sexo</td>
                                    <td>: {{sexo_estudiante}}</td>
                                    <td>Religión</td>
                                    <td>: {{religion_estudiante}}</td>
                                </tr>
                                <tr>
                                    <td>DNI</td>
                                    <td>: {{dni_estudiante}}</td>
                                    <td>Correo Electronico</td>
                                    <td>: {{correo_electronico_estudiante}}</td>
                                </tr>              
                            </table>
                        </td>
                    </tr>             
                </table>
                <hr>
                <div name="detail"></div> 
            </div>
        </body>
    
    `;

    return html;

}

function detail() {
    
    return /*html*/ `
        <div class="incidencia">
            <div class="header-incidencia">
                <h4>{{fecha_incidencia}}</h4>
                <p>({{serie_numero}})</p>
            </div>
            <div class="content-incidencia">
                <div class="title">{{nombre_incidencia}} {{estado_incidencia}}</div>
                <div class="descripcion">
                    <p style="margin: 0px 0px 0px 0px; font-weight: bold; font-size:11px;">DESCRIPCIÓN</p>
                    <p style="margin: -12px 0px;">{{descripcion_incidencia}}</p> 
                </div>
                <div class="atencion" style='display: {{esta_comentario_atencion_incidencia}};'>
                    <p style="margin: 0px 0px 0px 0px; font-weight: bold; font-size:11px;">ATENCIÓN</p>
                    <p style="margin: -12px 0px;">{{comentario_atencion_incidencia}}</p> 
                </div>
                <div class="abordaje" style='display: {{esta_acuerdo_atencion_abordaje}};'>
                    <p style="margin: 0px 0px 0px 0px; font-weight: bold; font-size:11px;">ABORDAJE</p>
                    <p style="margin: -12px 0px;">{{acuerdo_atencion_abordaje}}</p> 
                </div>
            </div>                  
        </div>
    `;

}

function head() {
    
    return /*html*/ `
        <head>
            <link rel="stylesheet" href="https://assets.titanicsoft.com/css/normalize.min.css">          
            <style>  
                body{
                    font-family: 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif;
                    font-size: 12px;
                    line-height: 1.6;
                    color: #333;
                    margin: 0;
                    padding: 0;
                }
                .etiqueta-pendiente {
                    display: inline-block;
                    margin-left: 2px;
                    padding: 2px 7px;
                    background-color: #FFC107;
                    color: black;
                    font-weight: bold;
                    border-radius: 5px;
                }
                .etiqueta-cerrado {
                    display: inline-block;
                    margin-left: 2px;
                    padding: 2px 7px;
                    background-color: #525258;
                    color: white;
                    font-weight: bold;
                    border-radius: 5px;
                }
                .etiqueta-solucionado {
                    display: inline-block;
                    margin-left: 2px;
                    padding: 2px 7px;
                    background-color: #99C830;
                    color: white;
                    font-weight: bold;
                    border-radius: 5px;
                }
                .etiqueta-espera-abordaje {
                    display: inline-block;
                    margin-left: 2px;
                    padding: 2px 7px;
                    background-color: #0083CA;
                    color: white;
                    font-weight: bold;
                    border-radius: 5px;
                }
                .invoice-box {
                    max-width: 800px;
                    margin: 20px auto;
                    padding: 20px;
                    border: 1px solid #ccc;
                    border-radius: 5px;
                    background-color: #f9f9f9;
                }
                .invoice-box img {
                    max-width: 100%;
                    height: auto;
                }
                .invoice-box table {
                    width: 100%;
                    line-height: inherit;
                    text-align: left;
                }
                .invoice-box table td {
                    padding: 10px;
                    vertical-align: top;
                }
                .invoice-box table tr.heading td {
                    background: #f7f7f7;
                    border-bottom: 1px solid #ddd;
                    font-weight: bold;
                }
                .invoice-box table tr.details td {
                    padding-bottom: 20px;
                }
                .invoice-box table tr.item td {
                    border-bottom: 1px solid #eee;
                }
                .invoice-box table tr.item.last td {
                    border-bottom: none;
                }
                .invoice-box table tr.total td:nth-child(2) {
                    border-top: 2px solid #333;
                    font-weight: bold;
                }
                @media only screen and (max-width: 600px) {
                    .invoice-box table tr.top table td {
                        width: 100%;
                        display: block;
                        text-align: center;
                    }
                    .invoice-box table tr.information table td {
                        width: 100%;
                        display: block;
                        text-align: center;
                    }
                }
                hr {
                    border-top: 2px solid #EFC241;
                }
                .incidencia {
                    display: flex;
                    padding: 10px;
                    border-bottom: 1px solid #ddd;
                    align-items: flex-start;
                }
                .incidencia .header-incidencia {
                    color: #105F8F;
                    width: auto;
                    height: auto;
                    margin-right: 10px;
                    border-radius: 50%;
                    object-fit: cover;
                }
                .incidencia .header-incidencia p{
                    font-weight: bold;
                    text-align: center;
                    margin-top: -10px;
                }
                .incidencia .content-incidencia {
                    flex: 1;
                    display: flex;
                    flex-direction: column;
                }
                .incidencia .title {
                    font-weight: bold;
                    margin-bottom: 5px;
                }
                .incidencia .descripcion {
                    color: #666;
                }
            </style>
        </head>
    `;

}
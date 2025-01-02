import modalView from '../nuevaIncidenciaReporte/modalView.js' 
import viewComponent from '../nuevaIncidenciaReporte/view.js'

export async function viewGuia(datos_estudiante, data, datos_incidencia_atencion, datos_incidencia_abordaje, element, eView) {
    
    modalView(eView.querySelector(element), datos_estudiante, data, datos_incidencia_atencion, datos_incidencia_abordaje, async (datos_estudiante, data, datos_incidencia_atencion, datos_incidencia_abordaje) => {
              
        HELPER.print_html_pdf(await viewComponent(datos_estudiante, data, datos_incidencia_atencion, datos_incidencia_abordaje))

    });

};
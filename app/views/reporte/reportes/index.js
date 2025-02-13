import modalView from '../reportes/modalView.js' 
import viewComponent from '../reportes/view.js'

export async function viewGuia(datos_estudiante, fechaDesde, fechaHasta, data, element, eView) {

    modalView(eView.querySelector(element), datos_estudiante, fechaDesde, fechaHasta, data, async (datos_estudiante, fechaDesde, fechaHasta, data) => {
        
      //  print(idGuiaTransportista);
      
      HELPER.print_html_pdf(await viewComponent(datos_estudiante, fechaDesde, fechaHasta, data))

    });

}
import bodyHTML from './modalViewHTML.js'
import view from './view.js'

let eView, eModal;

export default async function(element, datos_estudiante, fechaDesde, fechaHasta, data, print){
     
    eView = element;
    
    eView.innerHTML = bodyHTML;

    eModal = eView.querySelector('div[name="modalViewGuia"]');
    
    let iframe = document.createElement('iframe');

    iframe.style.border = 'none';
    iframe.width = '100%;';
    iframe.height = window.innerHeight - 200+'px;'

    iframe.srcdoc = await view(datos_estudiante, fechaDesde, fechaHasta, data);

    eView.querySelector('div[name="contentView"]').insertAdjacentElement('beforeend', iframe);
    
    $(eModal).modal('show');

    eView.querySelector('button[data-action="print"]').addEventListener('click', () => {
        print(datos_estudiante, fechaDesde, fechaHasta, data);
    });
}



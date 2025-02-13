import indexHtml from "./index.html.js";
import modalSave from "./modalSave/index.js";

let eView;

export default function(d) {
    eView = d;

    eView.innerHTML = indexHtml;

    afterRender();
}

const afterRender = () => {
    modalSave.cargar(eView.querySelector('modal-save', (response) =>{
        console.log(response);
    }, 'save'))

events();
}

const events =  ()=> {

    eView.querySelector('button[name="nuevo"]').addEventListener('click', function(e){
        e.preventDefault();
        modalSave.crear();
    })
}
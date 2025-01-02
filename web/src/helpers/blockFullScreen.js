import progressCircle from "./progressCircle.js";

const show  = ({
    message = '',
    flLoader = false
} = {}) => {

    let eBlockFullScreen = document.querySelector('#blockfull');
  
    if(eBlockFullScreen == null){
  
      let element = document.createElement('div');
      element.setAttribute('id', 'blockfull');
  
      element.style.position = 'fixed';
      element.style.top = 0;
      element.style.width = '100%';
      element.style.height = '100%';
  
      element.style.zIndex = 10000000;
      

      if(message == '' && flLoader == true){
        
        element.innerHTML = `
            <div style="display:table; width:100%; height:100%;">
                <div style="display:table-cell; text-align:center; vertical-align:middle;">
                ${progressCircle()}
                </div>
            </div>
        `;
        
      }
  
      document.body.insertAdjacentElement('beforeend', element);
  
      eBlockFullScreen = element;
  
    }
  
}

const hide = async () => {

    if(document.querySelector('#blockfull') != null){
        document.querySelector('#blockfull').remove();
    }

}

export default {

    show,

    hide

}


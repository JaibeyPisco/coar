import blockFullScreen from "./blockFullScreen.js";
import progressCircle from "./progressCircle.js";

export default function(element, {
    size = 24,
    color ='#fff'
} = {}){

  blockFullScreen.show();

  element.setAttribute('disabled', 'disabled');
  element.querySelector('span[label]').style.display = 'none';

  element.querySelector('.eProgressCircle').innerHTML = /*html*/ progressCircle({
    color: color,
    size: size
  });  
  
  element.querySelector('.eProgressCircle').style.display = 'block';

  

  return function(){

    element.removeAttribute('disabled');
    element.querySelector('span[label]').style.display = 'block';
    element.querySelector('.eProgressCircle').style.display = 'none';

    blockFullScreen.hide();

  }

}


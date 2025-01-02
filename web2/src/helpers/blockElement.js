import progressCircle from "./progressCircle.js";

export default ({
    text = 'Procesando...',
    element,
    size = '64',
    color = '#3b71ca',
    bg = '#fff',
    opacity = 0.7
} = {}) => {

    element.innerHTML = /* html */  `
        <div>        
            <span data-loader-frame="loaderText" style="position:absolute; z-index:3; top: 50%; left: 50%; transform: translate(-50%, -50%);">
                <div style="text-align:center;">
                    <div>${progressCircle({size: size, color: color})}</div>
                    <div style="color:${color}; font-weight:500;">${text}</div>
                </div>
            </span>
            <div data-loader-frame="loader" style="background:${bg}; position:absolute; width:100%; height:100%; opacity:${opacity}; z-index:2; border-radius:0.5rem;"></div>
        </div>
    `;

    /*const animate = new Animate(element.querySelector('div[data-loader-frame="loader"]'), { 
        animation: 'zoom-in', 
        animationStart: 'onLoad',
        animationDuration:300
    }); 

    animate.init();  */ 
    
    const stopLoader = async () => {

        //await sleep(500);

        /*const animate2 = new Animate(element.querySelector('div[data-loader-frame="loader"]'), { 
            animation: 'fade-out', 
            animationStart: 'onLoad',
            animationDuration:400
        }); 

        const animate3 = new Animate(element.querySelector('span[data-loader-frame="loaderText"]'), { 
            animation: 'fade-out', 
            animationStart: 'onLoad',
            animationDuration:400
        }); 

        animate2.init();
        animate3.init();*/

        element.innerHTML = ''; 
    };
    

    return stopLoader;

}

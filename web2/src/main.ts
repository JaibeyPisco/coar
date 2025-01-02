
import Loader from './config/LoaderStatic.js';
// import Config    from '../../config.js'
import Main    from './config/Main.js'
import helper from "./config/Helper.js";

let env = import.meta.env;

const init = async () => {


    window.BASE_URL = env.VITE_BASE_URL;
    window.BASE_API = env.VITE_BASE_API;
    window.BASE_FILES = env.VITE_BASE_FILES;
    window.BASE_ASSETS = env.VITE_BASE_ASSETS;

    window.HELPER = helper;

    window.GLOBAL = {};

    const rutas = [

        '/assets/js/jquery.min.js',
        '/assets/library/axios/axios.min.js',
        '/assets/library/sammy/sammy.min.js',

        '/assets/library/ladda/spin.min.js',
        '/assets/library/ladda/ladda.min.js',
        '/assets/library/ladda/ladda.min.css',

    ];

    Loader.requireFiles(rutas, async function(){

        if(window.opener && !window.opener.closed)
        {
            document.querySelector('#href_loader').remove();
        }

        $.fn.html = (function($html) {
            return function() {
                var cache = $.ajaxSetup()['cache'];
                $.ajaxSetup({cache: true});

                var ret = $html.apply($(this), arguments);
                $.ajaxSetup({cache: cache});
                return ret;
            };
        }($.fn.html));

        Main.initialize();
    });

}

// Al cargar página
window.addEventListener('load', init);
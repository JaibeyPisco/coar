function show_loader() {
    $.LoadingOverlay("show", {
        image: "",
        background: "rgba(0, 0, 0, 0.1)",
        fontawesome: "fas fa-spinner-third fa-spin", // String/Boolean
        fontawesomeAnimation: "1000ms rotate_right", // String/Boolean
        fontawesomeAutoResize: false, // Boolean
        fontawesomeResizeFactor: 1, // Float
        fontawesomeColor: "#fff", // String/Boolean
        fontawesomeOrder: 2,
        size: 50,
        maxSize: 50,
        minSize: 50
    });
}

function hide_loader() {
    $.LoadingOverlay("hide");
}

/** AXIOS INTERCEPCIONES */
axios.interceptors.request.use(function(config) {

    let fl_loader = true;
    
    if(config.hasOwnProperty('fl_loader'))
    {
        fl_loader = config.fl_loader;
    }

    if(fl_loader == true)
    {
        show_loader();

        /*$.LoadingOverlay("show", {
            image: "",
            background: "rgba(0, 0, 0, 0.1)",
            fontawesome: "fas fa-spinner-third fa-spin", // String/Boolean
            fontawesomeAnimation: "1000ms rotate_right", // String/Boolean
            fontawesomeAutoResize: false, // Boolean
            fontawesomeResizeFactor: 1, // Float
            fontawesomeColor: "#fff", // String/Boolean
            fontawesomeOrder: 2,
            size: 50,
            maxSize: 50,
            minSize: 50
        });*/
    }   
    
    let fl_token = true;
    
    if(config.hasOwnProperty('fl_token'))
    {
        fl_token = config.fl_token;
    }

    if(fl_token == true)
    {
        /** ENVIAR TOKEN HEADER AUTORIZATION */
        config.headers.Token = localStorage.getItem("Token");
    }
    

    return config;
}, function(error) {
    $.LoadingOverlay("hide");
    return Promise.reject(error);
});

axios.interceptors.response.use(function(response) {
    $.LoadingOverlay("hide");
    
    return response;
}, function(error) {            
    $.LoadingOverlay("hide");
    if (error.response.status == '401') {
        if (error.response.data.tipo != 'initial') {
            location.reload();
        }
        else
        {
            alert(error.response.data.mensaje);
        }
    } else {
        HELPER.notificacion(error.response.data.mensaje, error.response.data.tipo);
    }

    
    return Promise.reject(error);
});

/** AJAX JQUERY GLOBAL */

$.ajaxSetup({

    beforeSend: function(xhr, content = null) {        
        xhr.setRequestHeader('Token', localStorage.getItem("Token"));
        show_loader();
    },
    complete: function(data) {

        if (data.status == 401) {
            location.reload();
        }

        hide_loader();
    },

    error: function(x, status, error) {
        if (x.status == 401) {
            location.reload();
        } else {
            console.log("AJAX - Error: " + status + "nError: " + error)
        }

        hide_loader();
    }
});

$.ajaxSetup({
    statusCode: {
        401: function(response) {
            /*location.href = BASE_URL;*/
        }
    }
});

/*** JQUERY VALIDATOR */

jQuery.validator.setDefaults({ 

    ignore: '*:not([name])', 
    onkeyup: false,
    onclick: false,
    onfocusout: false,
    event: "blur",
    debug: true,

    showErrors: function(errorMap, errorList){
        var mensaje = '<div style="text-align:left;"><strong>Existe campos vacíos que son requeridos</strong> <br>';
    
        $.each(errorList, function (key, entry) {
          mensaje += '- '+entry.message+' <br>';
        });

        mensaje += '</div>'
    
        if(errorList.length > 0)
        {
            HELPER.notificacion(mensaje, 'warning');
        }
    }
});


let HELPER = {

    modalInstance: (selector, tipo = 'name') => {

        if (tipo === 'elemento') {
            return bootstrap.Modal.getOrCreateInstance (selector);
        }
        if (tipo === 'name') {
            return bootstrap.Modal.getOrCreateInstance (document.querySelector ('div[name="' + selector + '"]'));
        }

        if (tipo === 'id') {
            return bootstrap.Modal.getOrCreateInstance (document.querySelector ('div[id="' + selector + '"]'))
        }
    },

    objToUrl: (obj) => {

        var str = [];
        for (var p in obj)
            if (obj.hasOwnProperty(p)) {
                str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
            }
        return str.join("&");
    },

    selectData: ({
                     data = [],
                     element = [],
                     flSelect2 = false,
                     placeholder = 'Seleccione...'
                 } = {}) => {



        let options = '<option value="">'+placeholder+'</option>';

        if(placeholder == null){
            options = '';

        }

        data.forEach(row => {

            options += `<option value="${row.id}" data-json='${JSON.stringify(row)}'>${row.text}</option>`;

        });

        element.innerHTML = options;

        if(flSelect2 == true){

            $(element).select2();

        }



    },


    templateSelect: async (element, ruta,  modal = "modal-save", flSelect2 = true, text = 'Seleccione...') => {
        try {
            let select = $(`select[${element}]`);

            select.empty().append($('<option></option>').val('').text(text).prop('selected', true));
    
            const data = (await axios.get(BASE_API + ruta)).data;
    
            data.forEach(row => {
                select.append($('<option></option>').val(row.id).text(row.text));
            });
    
            if (flSelect2) {
                let modalContent = $(`div[name=${modal}] div[class="modal-content"]`);
                select.select2({
                    dropdownParent: $(modalContent)
                });
            }
        } catch (error) {
            console.error(error);
        }
    },


    abr_medida: (nombre) => {
        let abreviado = '';

        switch (nombre) {
            case 'UNIDADES':
                abreviado = 'UND';
            break;
        
            case 'PESO':
                abreviado = 'KG';
            break;

            case 'VOLUMEN':
                abreviado = 'VOL';
            break;
        }

        return abreviado;
    },

    esNumero: (dato) => {
        /*Definición de los valores aceptados*/
        var valoresAceptados = /^[0-9]+$/;
        if (dato.indexOf(".") === -1 ){
            if (dato.match(valoresAceptados)){
                return true;
            }else{
                return false;
            }
        }else{
            //dividir la expresión por el punto en un array
            var particion = dato.split(".");
            //evaluamos la primera parte de la división (parte entera)
            if (particion[0].match(valoresAceptados) || particion[0]==""){
                if (particion[1].match(valoresAceptados)){
                    return true;
                }else {
                    return false;
                }
            }else{
                return false;
            }
        }
    },

    currency:(value) => {

        value = parseFloat(HELPER.round(value, 2));
        return value.toLocaleString('es-PE', {minimumFractionDigits: 2, maximumFractionDigits: 2});

    },

    round:(value, decimals) => {

        return Number(Math.round(value +'e'+ decimals) +'e-'+ decimals).toFixed(decimals);
    },

    array_unique: (array_data) => {

        function onlyUnique(value, index, self) {
            return self.indexOf(value) === index;
        }

        return array_data.filter(onlyUnique);
    },
    
    scanner_timer_waiting: (decodedText, time_interval = 1000) => {

        let fl_get_scanner = false;

        let tiempo_actual = moment().format('YYYY-MM-DD HH:mm:ss')

        if(localStorage.getItem('tiempo_ultimo_escaneo') === null)
        {  
            localStorage.setItem('tiempo_ultimo_escaneo', tiempo_actual);
            fl_get_scanner = true;
        }
        else
        {  
            let tiempo_ultimo_escaneo = moment(localStorage.getItem('tiempo_ultimo_escaneo'), "YYYY-MM-DD HH:mm:ss").format('YYYY-MM-DD HH:mm:ss');

            let diff  = moment(tiempo_actual).diff(moment(tiempo_ultimo_escaneo));

            let f = moment.utc(diff).format("x");

            if(f > time_interval)
            {
              
                
                fl_get_scanner = true;
                localStorage.setItem('tiempo_ultimo_escaneo', tiempo_actual);
            }
            
        }

        if(fl_get_scanner == true)
        {
            let audio = document.getElementById("scanner_beep"); 
            audio.play(); 

            return decodedText;
 

        }   
        else
        {
            return null;
        }

    },

    scanner_camera: async (id_element = 'qrcode') => {

        let comp_scanner = await import(BASE_URL+'app/config/Scanner_camera.js');

        let html5QrCode = new Html5QrcodeScanner(
            "qr-reader", { fps: 10});

        html5QrCode.render(comp_scanner.default.onScanSuccess,);        
    },

    
    counter_animate: (speed = 200, cantidad_decimal = 0) => {

        const counters = document.querySelectorAll('.contador_animate');

        counters.forEach( counter => {
        const animate = () => {
            const value = +counter.getAttribute('value_contador_animate');
            const data = +counter.innerText;
            
            const time = value / speed;
            if(data < value) {
                counter.innerText = Math.ceil(data + time).toFixed(cantidad_decimal);
                setTimeout(animate, 1);
            }else{
                counter.innerText = parseFloat(value).toFixed(cantidad_decimal);
            }
            
        }
        
        animate();
        });
    },

    sleep: (milliseconds=500) => new Promise(resolve => setTimeout(resolve, milliseconds)),

    zero_fill: (value, width, complete = '0') => {

        width -= value.toString().length;

        if ( width > 0 )
        {
          return new Array( width + (/\./.test( value ) ? 2 : 1) ).join( complete ) + value;
        }

        return value + ""; // always return a string
    },
    
    show_window_float: () => {
        $('header[class="main-header"]').remove();
        $('aside[class="main-sidebar"]').remove();
        $('body').removeAttr('class');
        $('body').attr('class', 'skin-blue layout-top-nav');
    },
    
    set_column_datatable: (columnas_datatable, response_server) => {

        if(response_server.data.view_datatable != null && response_server.data.view_datatable != '[]')
        {
            let columnas_create = columnas_datatable;
            
            let json_config =JSON.parse(response_server.data.view_datatable);

            let new_obj_column = [];
            
            for (let i=0; i<json_config.length; i++) {

                Object.keys(columnas_create).forEach(function (key){
                    if(json_config[i].title == columnas_create[key].title)
                    {
                        new_obj_column[i] = columnas_create[key];
                    }
                });  
            }

            columnas_datatable = new_obj_column;
        }
        
        return columnas_datatable;

    },

    get_tipo_cambio: async (id_moneda) => {

        let response_return = 0;

        await axios.get(BASE_API + 'configuracion/tipo_cambio/get/'+id_moneda)
        .then(function (response) {

            response_return = response.data.tipo_cambio; 

        }).catch(error => {
            console.log(error);
        }); 

        return response_return;
    },
    
    get_location: () => {
        if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {

            console.log(position);
            /*location['lat'] = position.coords.latitude;
            location['lng'] = position.coords.longitude;*/

        });

        } else { 
        x.innerHTML = "Geolocation is not supported by this browser.";
        }
    },

    print: async (content, fl_auto_print = false) =>{
        let codigo_aleatorio = Math.random().toString(36).substr(2);
        let html = `
            <html>
                <head>
                    <title>Impresión</title>    
                    <style>
                        body, td, tr, th, span, p{
                            font-family:Tahoma;
                            font-size:12px;
                        }

                        @media print
                        {
                            .noPrint{display:none;}
                        }

                        .btn_print {
                            margin-bottom:10px;
                            position:relative;
                            width: auto;
                            color:#ecf0f1;
                            text-decoration:none;
                            border-radius:5px;
                            border:solid 1px #f39c12;
                            background:#e67e22;
                            text-align:center;
                            padding:12px 18px 10px;
                            font-weight:bold;
                            font-size:14px !important;
                          
                            -webkit-transition: all 0.1s;
                            -moz-transition: all 0.1s;
                            transition: all 0.1s;
                          
                            -webkit-box-shadow: 0px 6px 0px #d35400;
                            -moz-box-shadow: 0px 6px 0px #d35400;
                            box-shadow: 0px 6px 0px #d35400;
                            cursor:pointer;
                          }

                          .btn_print:active{
                            -webkit-box-shadow: 0px 2px 0px #d35400;
                            -moz-box-shadow: 0px 2px 0px #d35400;
                            box-shadow: 0px 2px 0px #d35400;
                            position:relative;
                            top:4px;
                          }

                          @media all {
                            div.saltopagina{
                                display: none;
                            }
                          }
                            
                          @media print{
                            div.saltopagina{
                                display:block;
                                page-break-before:always;
                            }
                          }

                        .table-bordered {
                            border: 1px solid #f4f4f4;
                        }

                        .table-bordered>tbody>tr>td, .table-bordered>tbody>tr>th, .table-bordered>tfoot>tr>td, .table-bordered>tfoot>tr>th, .table-bordered>thead>tr>td, .table-bordered>thead>tr>th {
                            border: 1px solid #ddd;
                        }

                        table {
                            border-collapse: collapse;
                            border-spacing: 0;
                        }


                    </style>   
                    
                </head>
                <body>
                    <div class="noPrint" style="text-align:center;"> <button class="btn_print" onclick="window.print();">CLICK PARA IMPRIMIR</button></div>
                    <div style="width:100%;">
                        `+content+`
                    </div>
                </body>
            </html>
        `;

        let ventana = window.open(' ', 'popimpr'+codigo_aleatorio);
        ventana.document.write(html);
        ventana.document.close();

        if(fl_auto_print == true)
        {
            ventana.onload = function() {
                ventana.print();
            };
        }        

        ventana.onafterprint =  function(){
            ventana.close();
        }

        ventana.focus();

    },



    template: (template, variables) => {

        return template.replace(new RegExp("\{{([^\{]+)\}}", "g"), function(_unused, varName){
            return variables[varName];
        });
        
    },

    print_html_pdf: async (content, factura) =>{

        let codigo_aleatorio = Math.random().toString(36).substr(2);
        let html = `
            <html>
                <head>
                    <title>Impresión</title>    
                    <style>
                        body, td, tr, th, span, p{
                            font-family:Tahoma;
                            font-size:11px;
                        }

                        @media print
                        {
                            .noPrint{display:none;}
                        }

                        .btn_print {
                            margin-bottom:10px;
                            position:relative;
                            width: auto;
                            color:#ecf0f1;
                            text-decoration:none;
                            border-radius:5px;
                            border:solid 1px #f39c12;
                            background:#e67e22;
                            text-align:center;
                            padding:12px 18px 10px;
                            font-weight:bold;
                            font-size:14px !important;
                          
                            -webkit-transition: all 0.1s;
                            -moz-transition: all 0.1s;
                            transition: all 0.1s;
                          
                            -webkit-box-shadow: 0px 6px 0px #d35400;
                            -moz-box-shadow: 0px 6px 0px #d35400;
                            box-shadow: 0px 6px 0px #d35400;
                            cursor:pointer;
                          }

                          .btn_print:active{
                            -webkit-box-shadow: 0px 2px 0px #d35400;
                            -moz-box-shadow: 0px 2px 0px #d35400;
                            box-shadow: 0px 2px 0px #d35400;
                            position:relative;
                            top:4px;
                          }

                          @media all {
                            div.saltopagina{
                                display: none;
                            }
                          }
                            
                          @media print{
                            div.saltopagina{
                                display:block;
                                page-break-before:always;
                            }
                          }

                        .table-bordered {
                            border: 1px solid #f4f4f4;
                        }

                        .table-bordered>tbody>tr>td, .table-bordered>tbody>tr>th, .table-bordered>tfoot>tr>td, .table-bordered>tfoot>tr>th, .table-bordered>thead>tr>td, .table-bordered>thead>tr>th {
                            border: 1px solid #ddd;
                        }

                        table {
                            border-collapse: collapse;
                            border-spacing: 0;
                        }
                    </style>   

                    <script src="assets/library/html2pdf/html2pdf.bundle.min.js" type="text/javascript"></script>
          
                </head>
                <body>
                    <div class="noPrint" style="text-align:center;"> <button class="btn_print" onclick="window.print();">CLICK PARA IMPRIMIR</button></div>
                    <div style="width:100%;" id="contenido">
                        `+content+`
                    </div>
                </body>

                <script>

                    const $elementoParaConvertir = document.querySelector('#contenido');
                    html2pdf()
                        .set({
                            margin: 0.2,
                            bottom:1,
                            filename: '`+factura+`.pdf',
                            image: {
                                type: 'jpeg',
                                quality: 0.95
                            },
                            html2canvas: {
                                scale: 2, 
                              height:1000,
                                letterRendering: true,
                                allowTaint: true
                            },
                            jsPDF: {
                                unit: "in",
                                format: "a4",
                                orientation: 'portrait' ,
                            }
                        })
                        .from($elementoParaConvertir)
                        .save()
                        .catch(err => console.log(err));


                </script>
            </html>
        `;

        let ventana = window.open(' ', 'popimpr'+codigo_aleatorio);
        ventana.document.write(html);
        ventana.document.close(); 
        ventana.onafterprint =  function(){
            ventana.close();
        }

        ventana.focus();

    },


    // print_html_pdf: async (content, factura) =>{

    //     let codigo_aleatorio = Math.random().toString(36).substr(2);
    //     let html = `
    //         <html>
    //             <head>
    //                 <title>Impresión</title>    
    //                 <style>
    //                     body, td, tr, th, span, p{
    //                         font-family:Tahoma;
    //                         font-size:12px;
    //                     }

    //                     @media print
    //                     {
    //                         .noPrint{display:none;}
    //                     }

    //                     .btn_print {
    //                         margin-bottom:10px;
    //                         position:relative;
    //                         width: auto;
    //                         color:#ecf0f1;
    //                         text-decoration:none;
    //                         border-radius:5px;
    //                         border:solid 1px #f39c12;
    //                         background:#e67e22;
    //                         text-align:center;
    //                         padding:12px 18px 10px;
    //                         font-weight:bold;
    //                         font-size:14px !important;
                          
    //                         -webkit-transition: all 0.1s;
    //                         -moz-transition: all 0.1s;
    //                         transition: all 0.1s;
                          
    //                         -webkit-box-shadow: 0px 6px 0px #d35400;
    //                         -moz-box-shadow: 0px 6px 0px #d35400;
    //                         box-shadow: 0px 6px 0px #d35400;
    //                         cursor:pointer;
    //                       }

    //                       .btn_print:active{
    //                         -webkit-box-shadow: 0px 2px 0px #d35400;
    //                         -moz-box-shadow: 0px 2px 0px #d35400;
    //                         box-shadow: 0px 2px 0px #d35400;
    //                         position:relative;
    //                         top:4px;
    //                       }

    //                       @media all {
    //                         div.saltopagina{
    //                             display: none;
    //                         }
    //                       }
                            
    //                       @media print{
    //                         div.saltopagina{
    //                             display:block;
    //                             page-break-before:always;
    //                         }
    //                       }

    //                     .table-bordered {
    //                         border: 1px solid #f4f4f4;
    //                     }

    //                     .table-bordered>tbody>tr>td, .table-bordered>tbody>tr>th, .table-bordered>tfoot>tr>td, .table-bordered>tfoot>tr>th, .table-bordered>thead>tr>td, .table-bordered>thead>tr>th {
    //                         border: 1px solid #ddd;
    //                     }

    //                     table {
    //                         border-collapse: collapse;
    //                         border-spacing: 0;
    //                     }
    //                 </style>   

    //                 <script src="assets/library/html2pdf/html2pdf.bundle.min.js" type="text/javascript"></script>
          
    //             </head>
    //             <body>
    //                 <div class="noPrint" style="text-align:center;"> <button class="btn_print" onclick="window.print();">CLICK PARA IMPRIMIR</button></div>
    //                 <div style="width:100%;" id="contenido">
    //                     `+content+`
    //                 </div>
    //             </body>

    //             <script>

    //                 const $elementoParaConvertir = document.querySelector('#contenido');
    //                 html2pdf()
    //                     .set({
    //                         margin: 1,
    //                         filename: '`+factura+`.pdf',
    //                         image: {
    //                             type: 'jpeg',
    //                             quality: 0.98
    //                         },
    //                         html2canvas: {
    //                             scale: 3, 
    //                             letterRendering: true,
    //                         },
    //                         jsPDF: {
    //                             unit: "in",
    //                             format: "a4",
    //                             orientation: 'landscape' 
    //                         }
    //                     })
    //                     .from($elementoParaConvertir)
    //                     .save()
    //                     .catch(err => console.log(err));


    //             </script>
    //         </html>
    //     `;

    //     let ventana = window.open(' ', 'popimpr'+codigo_aleatorio);
    //     ventana.document.write(html);
    //     ventana.document.close(); 
    //     ventana.onafterprint =  function(){
    //         ventana.close();
    //     }

    //     ventana.focus();

    // },

    
    fecha_hora: (fecha_hora = null, formato = 'DD/MM/YYYY HH:mm') => {
        
        moment.locale('es');   

        let parsed = moment(fecha_hora, "YYYY-MM-DD HH:mm").format(formato);

        if(fecha_hora == null)
        {
            parsed = moment().format(formato);
        }        

        return parsed;
    },
    
    hora: (hora = null, formato = 'HH:mm:ss') => {
        
        moment.locale('es');   

        let parsed = moment(hora, "HH:mm:ss").format(formato);

        if(hora == null)
        {
            parsed = moment().format(formato);
        }

        return parsed;
    },


    fecha: (fecha = null, formato = 'DD/MM/YYYY') => {
        
        moment.locale('es');   

        let parsed = moment(fecha, "YYYY-MM-DD").format(formato);

        if(fecha == null)
        {
            parsed = moment().format(formato);
        }

        return parsed;
    },

    fecha_standar: (fecha = null, formato = 'YYYY-MM-DD') => {
        
        moment.locale('es');   

        let parsed = moment(fecha, "YYYY-MM-DD HH:mm:ss").format(formato);

        if(fecha == null)
        {
            parsed = moment().format(formato);
        }

        return parsed;
    },

    fecha_completo: (fecha_hora = null) => {
        
        moment.locale('es');   

        let parsed = moment(fecha_hora, "YYYY/MM/DD HH:mm:ss").format('LLLL');

        if(fecha_hora == null)
        {
            parsed = moment().format('LLLL');
        }
        

        return parsed;
    },

    fecha_ano: function()
    {
        moment.locale('es'); 

        let date = new Date();
        return date.getFullYear();
    },

    fecha_actual: function()
    {
        moment.locale('es'); 
        
        let date = new Date();

        let dia = date.getDate();
        let mes = date.getMonth()+1;

        if(dia<10){ dia='0'+dia; }
        if(mes<10){ mes='0'+mes; }

        return date.getFullYear()+'-'+mes+'-'+dia;
    },

    hora_actual: function()
    {
        moment.locale('es');   

        let parsed = moment().format('HH:mm');        

        return parsed;
    },

    primer_dia_mes: function()
    {
        moment.locale('es'); 
        
        let primerDia = new Date(new Date().getFullYear(), new Date().getMonth(), 1);   
        return moment(primerDia).format('YYYY-MM-DD');

    },

    primer_dia_semana: function()
    {
        moment.locale('es'); 
        let primerDia = moment().startOf('week').toDate();
        return moment(primerDia).format('YYYY-MM-DD');

    },

    ladda:(id_dom)  => {

        let ladda = Ladda.create(document.querySelector(id_dom));
        ladda.start();

        return ladda;

    },

    ladda2:(id_dom, element = null)  => {

        if(element != null){

            let ladda = Ladda.create(element);
            ladda.start();

            return ladda;

        }else{

            let ladda = Ladda.create(document.querySelector(id_dom));
            ladda.start();

        }


    },

    reset_form: function(d) {
        d = $(d);
        d.trigger("reset");
        d.get(0).reset();
        d.find('textarea').text('');
        d.find('select').val("").change();
    },

    load_component: function()
    {
        /** SCROLL 
        $('.modal-body').slimScroll({
            height: "auto"
        });

        $('.table-responsive').slimScroll({
            height: "auto"
        });
        */

        $('.select').select2({
            minimumResultsForSearch: -1
        });

        /** TODOS LOS INPUT A MAYÙSCULAS */

        // $(document).on('keyup', 'input[type="text"]', function(e) {
        //     e.stopImmediatePropagation();
        //     let input=$(this);

        //     /** EN MAYUSCULAS ALGUNOS CAMPOS NO */
        //     if(input.data('mayus') != false)
        //     {
        //         input.val(input.val().toUpperCase());
        //     }
        // });

        // $('[data-toggle="tooltip"]').tooltip();
    },

    preview_image: function(input, dom) {

        if (input.files && input.files[0]) {
            var reader = new FileReader();
            reader.onload = function(e) {
                dom.attr('src', e.target.result);
                dom.hide();
                dom.fadeIn(650);
            }
            reader.readAsDataURL(input.files[0]);
        }
    },

    previewImage: function(input, dom) {

        if (input.files && input.files[0]) {
            const reader = new FileReader();
            
            reader.onload = function(e) {
                
                dom.src = e.target.result;
                dom.style.display = 'none';
                dom.style.opacity = 0;
                dom.style.display = 'block';

                // Animación de fadeIn personalizada
                let opacity = 0;

                const fadeInEffect = setInterval(function() {
                    if (opacity >= 1) {
                        clearInterval(fadeInEffect);
                    } else {
                        opacity += 0.1;
                        dom.style.opacity = opacity;
                    }
                }, 50);
            };
            reader.readAsDataURL(input.files[0]);
        }
    },

    get_attr_json: function(row) {
        let tr = row.parents('tr');
        let obj = JSON.parse(tr[0].dataset.json);

        return obj;
    },

    notificacion: function(mensaje, tipo = 'info') {

        if (tipo == 'success') {
            success_noti('Éxito', mensaje);
        }
        if (tipo == 'info') {
            info_noti('Información', mensaje);
        }
        if (tipo == 'danger') {
            error_noti('Alerta Crítica', mensaje);
        }
        if (tipo == 'warning') {
            warning_noti('Adventencia', mensaje);
        }
    },

    strtrunc: (str, max, add) => {
        add = add || '...';
        return (typeof str === 'string' && str.length > max ? str.substring(0, max) + add : str);
    },

    download: function(url)
    {
        axios({
            url: url,
            method: 'GET',
            responseType: 'blob', // important
          }).then((response) => {
              console.log(response.headers);
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;

            var nombre_archivo = (response.headers["content-disposition"].split("filename=")[1]).slice(0, -1);
            nombre_archivo = nombre_archivo.substring(1)
            link.setAttribute('download', nombre_archivo);
            document.body.appendChild(link);
            link.click();
          });
    },

    isDark: function(color_hex) {
        
        var r = parseInt(((color_hex.charAt(0)=="#") ? color_hex.substring(1,7):color_hex).substring(0,2),16);
        var g = parseInt(((color_hex.charAt(0)=="#") ? color_hex.substring(1,7):color_hex).substring(2,4),16);
        var b = parseInt(((color_hex.charAt(0)=="#") ? color_hex.substring(1,7):color_hex).substring(4,6),16);

        var color_rgb = 'rgb('+r+','+g+','+b+')';

        var match = /rgb\((\d+).*?(\d+).*?(\d+)\)/.exec(color_rgb);
        var result = ( match[1] & 255 )
             + ( match[2] & 255 )
             + ( match[3] & 255 )
               < 3 * 256 / 2;

        if(result)
        {
            return '#fff';
        }
        else
        {
            return '#000';
        }
    },

    leerFecha: function(dateTimeString) {

            const date = new Date(dateTimeString);

        const days = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
        const months = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];

            const day = days[date.getDay()];
            const month = months[date.getMonth()];
            const dateSuffix = (d) => {
                if (d > 3 && d < 21) return ''; // Special case for 11-13
                switch (d % 10) {
                    case 1: return '';
                    case 2: return '';
                    case 3: return '';
                    default: return '';
                }
            };
            const dayOfMonth = date.getDate() + dateSuffix(date.getDate());
            const year = date.getFullYear();

            let hours = date.getHours();
            const minutes = date.getMinutes().toString().padStart(2, '0');
            const ampm = hours >= 12 ? 'PM' : 'AM';
            hours = hours % 12 || 12;

            return `${day}, ${dayOfMonth} de ${month} del ${year} ${hours}:${minutes} ${ampm}`;
        },


active_sidebar: function(menu) {

        menu = 'sidebar-'+menu;

        $('#side-menu li').removeClass('active');
        $('#side-menu li').removeClass('menu-open');
        $('.treeview-menu').css('display', 'none');


        var particion = menu.split("-");

        switch (particion.length) {
            case 3:
                $('#' + particion[0] + '-' + particion[1]).addClass('active');
                $('#' + particion[0] + '-' + particion[1]).addClass('menu-open');
                $('#' + particion[0] + '-' + particion[1] + ' > .treeview-menu').css('display', 'block');
                break;

            case 4:
                $('#' + particion[0] + '-' + particion[1]).addClass('active');
                $('#' + particion[0] + '-' + particion[1]).addClass('menu-open');
                $('#' + particion[0] + '-' + particion[1] + ' > .treeview-menu').css('display', 'block');

                $('#' + particion[0] + '-' + particion[1] + '-' + particion[2]).addClass('active');
                $('#' + particion[0] + '-' + particion[1] + '-' + particion[2]).addClass('menu-open');
                $('#' + particion[0] + '-' + particion[1] + '-' + particion[2] + ' > .treeview-menu').css('display', 'block');
                break;
            default:

        }

        $('#' + menu).addClass('active');
    },


}

export default HELPER;
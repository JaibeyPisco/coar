
import './loadJquery.js'
import configApp from '../config/app'
import loaderStatic from './loaderStatic.js';
import btnCircleProgress from './btnCircleProgress.js';
import date from './date'
import loaderFrame from './loaderFrame.js';
// import 'simple-notify.min.css'

import Notify from 'simple-notify'
import notificationMaterial from './notificationMaterial.js';
import searchDocumentNumber from './searchDocumentNumber.js';
import select2 from './select2.js';
import download from './download.js';
import select from './select.js';
import blockFullScreen from './blockFullScreen.js';
import blockElement from './blockElement.js';

let helper = {

    stopEvents: (e) => {
        e.preventDefault();
        e.stopImmediatePropagation();
    },

    blockElement,

    blockFullScreen,

    select,

    download,

    select2,
    urlStorage: () => {
        return configApp.baseStorage + GLOBAL.company.hashFiles + '/';
    },

    updateElements: (elementParent) => {

        elementParent.querySelectorAll('input').forEach(element => {        
            $(element).trigger("change");
        });
    
        elementParent.querySelectorAll('select').forEach(element => {       
            
            if((element.closest('div').classList.contains('floating-label'))){
                $(element).trigger("change");
            }
            
        });

    },

    searchDocumentNumber,    

    notificationMaterial,    
    
    click: function (elem) {
        // Create our event (with options)
        var evt = new MouseEvent('click', {
            bubbles: true,
            cancelable: true,
            view: window
        });
        // If cancelled, don't dispatch our event
        var canceled = !elem.dispatchEvent(evt);
    },

    loaderFrame,

    loadTextField: (elementParent) => {

        elementParent.querySelectorAll('.mdc-text-field').forEach((el) => { 
            mdc.textField.MDCTextField.attachTo(el);            
        });

    },

    date,    

    btnCircleProgress,

    loaderStatic,

    saveLogServer: () => {

    },

    notification: ({
        title = '',
        message = '',
        type = 'warning'
    }) => {

        new Notify({
            status: type,
            title: title,
            text: message,
            effect: 'fade',
            speed: 300,
            customClass: null,
            customIcon: null,
            showIcon: true,
            showCloseButton: true,
            autoclose: true,
            autotimeout: 3000,
            gap: 20,
            distance: 20,
            type: 1,
            position: 'right top'
        });
    },


    getCheckRadio: (elements) => {

        let response = '';

        elements.forEach(element => {
            
            if(element.checked == true){
                response = element.getAttribute('data-value');
            }

        });

        return response;

    },

    number: (value) => {

        return parseFloat((helper.isNumeric(value)) ? value : 0);

    },

    round:(value, decimals) => {

        let result = Math.round((value + Number.EPSILON) * 100) / 100;

        if(decimals != 2)
        {
            result = Number(Math.round(value +'e'+ decimals) +'e-'+ decimals);
        }

        return result.toFixed(decimals)
    },

    sleep: (milliseconds=500) => new Promise(resolve => setTimeout(resolve, milliseconds)),

    nameImage: (value) => {

        if(value == null){
            value = 'whithoutImage.jpg';
        }

        return value;
    },

    formReset: (element, flForm = true) => {

        element.querySelectorAll('input').forEach(element => {
            element.value = '';
        });

        if(flForm){
            element.reset();
        }       
        
        element.querySelectorAll('input[data-value]').forEach(element => {
            element.value = element.getAttribute('data-value');
        });

        $(element).trigger("reset");
        $(element).get(0).reset();
        $(element).find('textarea').text('');
        $(element).find('select').val("").change();

    },
    
    config: configApp,        

    isObject: (yourVariable) => {

        if(typeof yourVariable === 'object' && yourVariable !== null){

            return true;

        } else {

            return false;

        }

    },

    objUrl: (params) => {

       return Object.keys(params).map(key => key + '=' + params[key]).join('&');

    },
       
    text:(value) => {

        return (value == null || value == 'null') ? '' : String(value);

    },

    arrayUnique: (arrayValue) => {

        function onlyUnique(value, index, self) {
            return self.indexOf(value) === index;
        }

        return arrayValue.filter(onlyUnique);
    },

    previewImage: (input, imgElement) => {

        if (input.files && input.files[0]) {

            let reader = new FileReader();
            reader.onload = function(e) {
                imgElement.setAttribute('src', e.target.result);
            }

            reader.readAsDataURL(input.files[0]);
        }

    },

    isNumeric: (value) => {

        if(value === undefined){
            return false;
        }

        value = String(value);

        if(isNaN(value) || value == ''){
            return false;
        }
        else{
            return true;
        }

    },

    template: (template, variables) => {
        
        return template.replace(new RegExp("\{{([^\{]+)\}}", "g"), function(_unused, varName){  // eslint-disable-line
            return variables[varName];
        });
        
    },

    urlify : (text) => {

        let urlRegex = /(https?:\/\/[^\s]+)/g;

        return text.replace(urlRegex, function(url) {

          return '<a target="_blank" href="' + url + '">' + url + '</a>';

        });

    },

    currency: (number, decimals = null) => {

        number = parseFloat(number);

        if(decimals != null)
        {
            number = helper.round(number, decimals);
        }

        const exp = /(\d)(?=(\d{3})+(?!\d))/g;
        const rep = '$1,';
        let arr = number.toString().split('.');
        arr[0] = arr[0].replace(exp,rep);

        return arr[1] ? arr.join('.'): arr[0];
    },

};

export default helper;
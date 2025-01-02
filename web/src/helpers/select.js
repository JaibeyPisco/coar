import helper from "./index";

export default {

    getDataItemSelect: (element) => {

        let itemSelect = element.selectedIndex;

        let data = (element.querySelectorAll('option')[itemSelect]).getAttribute('data-json');

        if(data != null){

            return JSON.parse(data);

        } else {

            return data;

        }

    },

    setData: ({
        data = [], 
        elements = [],
        placeholder = 'Seleccione...',
        select2 = false
    } = {}) => {

        if(helper.isObject(elements)){
            elements = [elements];
        }

        elements.forEach(element => {           
            
            let options = ``;

            if(placeholder != null){              

                options = `<option value="">${placeholder}</otion>`;
            }

            data.forEach(row => {
                
                options += `<option value="${row.id}" data-json='${JSON.stringify(row)}'>${row.text}</otion>`;

            });

            element.innerHTML = options;

            if(select2){

                $(element).select2({
                    theme: 'outlined'
                });

            } else {
                $(element).trigger("change");
            }
            

        });

    },

    selectSetIndex: ({
        element, 
        itemIndex = 0,
        isSelect2 = false
    }) => {

        element.value = element.querySelectorAll('option')[itemIndex].value;

        if(isSelect2 == true){
            $(element).trigger('change');
        }        

    },

    default: ({
        element,
        isSelect2 = false
    } = {}) => {

        let idSelected = null;

        element.querySelectorAll('option').forEach(option => {
            
            let dataText = option.getAttribute('data-json');     
            
            if(dataText != undefined){

                let data = JSON.parse(dataText);

                if(data.isDefault == 1){
                    idSelected = data.id;
                }

            }

        });

        if(idSelected != null){

            element.value = idSelected;

        }

        if(isSelect2 == true){
            $(element).trigger('change');
        }

    },

    selectSetIndex: ({
        element, 
        itemIndex = 0,
        isSelect2 = false
    }) => {

        element.value = element.querySelectorAll('option')[itemIndex].value;

        if(isSelect2 == true){
            $(element).trigger('change');
        }        

    },

    selectUnique: ({
        element,
        isSelect2 = false
    } = {}) => {

        let count = 0;
        let valueSelect = '';

        element.querySelectorAll('option').forEach(option => {
            
            let dataValue = option.getAttribute('value');     
            
            if(dataValue != ''){

                count++;
                valueSelect = dataValue;

            }

        });

        if(count == 1){

            element.value = valueSelect;

            if(isSelect2 == true){
                $(element).trigger('change');
            }
            
        }
        

    },

}
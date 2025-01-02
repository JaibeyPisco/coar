const funCreate = ({
    element, 
    onCreate, 
    placeholder = '',
    textButton = 'Nuevo Registro'
} = {}) => {

    $('.select2-link2').remove();

    if(placeholder != ''){

        let a = $(element).data('select2');
        let parent = a.$results.parents('.select2-dropdown');        
        parent.find('input[type="search"]').attr('placeholder', placeholder);

    }

    if(onCreate != null){
      
        let a = $(element).data('select2');
        
        if (!$('.select2-link').length) {

            a.$results.parents('.select2-results')
            .append(`
                <div class="select2-link2 select2-close m-2"">
                    <button action="new" class="btn btn-outline-primary btn-sm">${textButton}</button>
                </div>
            `);

            document.querySelector('.select2-results button[action="new"]').addEventListener('click', () => {

                $(element).select2('close');
                onCreate();

            });
        }     
        
    }    
};

export default {

    search: ({
        url = '',
        element,
        onCreate = null,
        textButtonCreate = 'Nuevo Registro',
        onSelect = null,
        placeholder = 'Seleccione...',
        placeholderSearch = '',
        minimumInputLength = 3
    }) => {

        $(element).select2({
            ajax: {
              url: url,
              dataType: 'json',
              delay: 250,
              data: function(params) {
                return {search:params.term};
              },
              processResults: function(data, params) {      
                return {results: data};
              },
              cache: true,
            },
            escapeMarkup: function(markup) {
              return markup;
            },
            placeholder: placeholder,
            minimumInputLength: minimumInputLength,
            allowClear: true,
            language: {
              inputTooShort: function () {
                return 'Digite mínimo 3 caracteres';
              }
          }
        }).on('select2:open', function (e) {   

            funCreate({
                element: this, 
                onCreate: onCreate, 
                placeholder: placeholderSearch,
                textButton: textButtonCreate
            });   

        }).on('select2:select', function(e) {
            
            if(onSelect != null){
                onSelect(e.params.data);
            }
        });
    },

    select: ({
        data = [],
        element,
        onCreate = null,
        placeholder = 'Seleccione...',
        templateResult = null,
        textButtonCreate = 'Nuevo Registro',
    }) => {

        let options = `<option value="">${placeholder}</otion>`;

        if(placeholder == null){
            options = '';
        }

        data.forEach(row => {
            
            options += `<option value="${row.id}" data-json='${JSON.stringify(row)}'>${row.text}</otion>`;

        });

        element.innerHTML = options; 

        let optionSelect2 = {};

        if(templateResult != null){
            optionSelect2.templateResult = templateResult;
        } else {
            
        }

        $(element).select2(optionSelect2).on('select2:open', function (e) {    

            funCreate({
                element: this, 
                onCreate: onCreate,
                textButton: textButtonCreate
            });   

        });
    },

}
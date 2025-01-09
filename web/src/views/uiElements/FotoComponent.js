/*Lo escribio Jaibey Pisco*/

let eView, _callBackSubmit, _this;
export default class FotoComponent {

    constructor() {

        this.id = null;

        this.nombre = '';

        _this = this;

    }

    render(_get) {
        
        eView = _get.domElement;

        _callBackSubmit = _get.callBackSubmit;

        eView.innerHTML = `
                    <table class="table" style="width:100%;margin-top:20px">
                        <thead>
                            <tr>
                                <th> FOTO</th>
                                <th>  </th>
                                <th></th>
                            
                            </tr>
                        </thead>
                        <tbody name="detalle_foto"></tbody>
                        <tfoot>
                            <tr>
                                <th style="text-align:center;" colspan="12">
                                    <button type="button" name="btn-agregar_foto" class="btn btn-success btn-sm" style="width:100%;">
                                        <i class="fa fa-plus"></i> Agregar Nuevo Img
                                    </button>
                                </th>
                            </tr>
                        </tfoot>
                    </table>
        `;

        this.afterRender();
    }

    afterRender() {
        this.events();
    }

    events() {


        let btnAgregarFoto = eView.querySelector('button[name="btn-agregar_foto"]');

        btnAgregarFoto.addEventListener('click', () => {
            this.agregarFoto();
        });

        $(eView).on('click', 'button[name="quitar-detalle_foto"]', (e) => {
            e.stopImmediatePropagation();
            this.quitarFoto($(e.currentTarget));  // Pasar el elemento clicado a la función
        });


        $(eView).on('change', 'input[data-name="archivo"]',  (e) => {
            e.stopImmediatePropagation();

            let codigo = $(e.target).data('codigo');

            let fila = $(eView).find('tr[data-codigo="' + codigo + '"]');
            let nombre = 'archivo_' + codigo;
            let dom = fila.find('img[name="' + nombre + '"]');

            this.preview_image(e.target, dom);
        });

    }
    async agregarFoto(data = null) {

        if (data == null) {
            data = {
                id: '',
                archivo: '',
            };
        }

        let codigo = Math.random().toString(36).substr(2);

        let html = /*html*/`
            <tr data-codigo="${codigo}">
            <td style="display:none"><input type="text" class="form-control" data-name="id" value="${data.id}" /></td>
            <td style="width:50%; vertical-align:middle;">
                <a name="archivo_${codigo}"  style="width:100PX;" href="javascript:" target="_blank"><img data-name="imagen" name="archivo_${codigo}" src="${BASE_FILES}images/${data.archivo}" style="height:80px;" /></a>
            </td>
            <td>
                <label class="btn btn-default btn-sm" style="width:100%;">
                    <i class="fa fa-search"></i> Imagen 
                    <input  style="display:none;" data-codigo="${codigo}" type="file" data-name="archivo" name="archivo_${codigo}" class="form-control" value="${data.archivo}" title="${data.archivo}" />
                </label>
            </td>
            <td> <button type="button"  name="quitar-detalle_foto" class="btn btn-danger"><i class="fa fa-times"></i></button></td>
            </tr>
        `;

        $(eView.querySelector('tbody[name="detalle_foto"]')).append(html);

    }
    quitarFoto(dom) {

        var tr = dom.parents('tr');
        var codigo = tr[0].dataset.codigo;

        $('tr[data-codigo="' + codigo + '"]').remove();
    }

   
    getDetalleFoto() {

        let response = [];
    
        $(eView).find('tbody[name="detalle_foto"] tr').each( function (){

            response.push({
                name_archivo_actual: $(this).find('input[data-name="archivo"]').val(),
                codigo: $(this).data('codigo'),
            });
        });
    
        return response;
    }

    reset() {
       $(eView).find('tbody[name="detalle_foto"]').html('');

    }


    preview_image(input, dom) {


        if (input.files && input.files[0]) {
            console.log(dom);
            var reader = new FileReader();

            reader.onload = function (e) {
                console.log(dom);

                dom.attr('src', e.target.result);
                dom.hide();
                dom.fadeIn(650);
            }
            reader.readAsDataURL(input.files[0]);


        }
    }
}
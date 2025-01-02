export async function getTiposDeMantenimiento(element) {
    try {
        let select = $(document.querySelector('select[data-select="' + element + '"]'));
        
        select.empty();

        select.append($('<option></option>').attr('value', '').text('Seleccione...'));

        let data = (await axios.get(BASE_API + 'configuracion/tipos_mantenimiento/get_select')).data

        data.forEach(row => {

            select.append('<option value="' + row.id + '">' + row.text + '</option>');
        });

       $(select).select2();

    } catch (error) {
        console.log(error);
    }
}
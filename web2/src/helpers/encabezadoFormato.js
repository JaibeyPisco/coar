let formato = '';

export default async () => {

    if(formato == ''){

        let {data:resp} = await axios.get(BASE_API + 'recursos/formato/encabezado');

        formato = `
            <table style="max-width:600px;">
                <tr>
                    <td style="width:150px;">
                        <img src="`+BASE_FILES+`images/`+resp.logo_factura+`" style="max-width:150px;"/>
                    </td>
                    <td>
                        <div style="font-weight:bold; text-align:left;"><strong>`+resp.razon_social+`</strong></div>
                        <div>`+resp.direccion+`</div>
                        <div>`+resp.telefono+` | `+resp.email+`</div>
                    </td>
                </tr>
            </table>
        `;

        return formato;

    } else {

        return formato;

    }

}
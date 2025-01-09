import { EmpresaI } from "./Empresa";
import indexHtml from "./index.html";
let eView: HTMLDivElement;
let eForm: HTMLFormElement | null;


let imagen_anterior: string | null;
let imagen_factura_anterior: string | null;

export default (d: HTMLDivElement) => {

    eView = d;
    eView.innerHTML = indexHtml;

    eForm = eView.querySelector('form[name="save"]');

    afterRender();

}

const afterRender = async () => {
    await getEnterprice();
   
    eForm?.addEventListener('submit', async function (e) {
        e.preventDefault();
         
        let ladda = HELPER.ladda('form[name="save"] button[name="submit"]');

        if (!eForm) return;

        let formData = new FormData(eForm);
 
        if (imagen_anterior != null) { formData.append('imagen_anterior', imagen_anterior); }

        if (imagen_factura_anterior != null) { formData.append('imagen_factura_anterior', imagen_factura_anterior); }
        
        let resp: { tipo: string; mensaje: string } = {
            mensaje: '',
            tipo: ''
        };

        try {
 
            const {data} =  await axios({
                method: 'post',
                url: BASE_API + 'configuracion/empresa/save',
                data: formData
            });

            resp = data;

            HELPER.notificacion(resp.mensaje, resp.tipo);
            getEnterprice();

        } catch (error) {

            HELPER.notificacion(resp.mensaje, resp.tipo);
        }finally{
            ladda.stop();
        }
       

    })

    eForm?.querySelector('input[name="imagen"]')?.addEventListener('change', function (e) {
        e.preventDefault();

        HELPER.previewImage(e.target, eForm?.querySelector('img[name="imagen"]'));
    })

    eForm?.querySelector('input[name="imagen_factura"]')?.addEventListener('change', function (e) {
        e.preventDefault();

        HELPER.previewImage(e.target, eForm?.querySelector('img[name="imagen_factura"]'));
    })

     
}

const getEnterprice = async () => {

    const data: EmpresaI = (await axios.get(BASE_API + 'configuracion/empresa')).data;
 
    if (eForm == null) return;

    eForm.querySelector<HTMLInputElement>('input[name="numero_documento"]')!.value = data.numero_documento;
    eForm.querySelector<HTMLInputElement>('input[name="razon_social"]')!.value = data.razon_social;
    eForm.querySelector<HTMLInputElement>('input[name="nombre_comercial"]')!.value = data.nombre_comercial;
    eForm.querySelector<HTMLInputElement>('input[name="direccion"]')!.value = data.direccion;
    eForm.querySelector<HTMLInputElement>('input[name="telefono"]')!.value = data.telefono;
    eForm.querySelector<HTMLInputElement>('input[name="email"]')!.value = data.email;
    eForm.querySelector<HTMLInputElement>('input[name="telefono"]')!.value = data.telefono;
    eForm.querySelector<HTMLInputElement>('input[name="telefono"]')!.value = data.telefono;

    eForm.querySelector<HTMLImageElement>('img[name="imagen"]')!.src = BASE_FILES + 'images/' + data.logo;
    eForm.querySelector<HTMLImageElement>('img[name="imagen_factura"]')!.src = BASE_FILES + 'images/' + data.logo_factura;

    imagen_anterior = data.logo;
    imagen_factura_anterior = data.logo_factura;    
}
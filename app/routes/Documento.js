// import Personal from '../views/documento/Personal.js'
// import Vehiculo from '../views/documento/Vehiculo.js'

let prefijo = 'documento/';

let Obj_router = async (router, d, data) => {
    data.permisos.forEach(permiso => {
        
        if((permiso.menu == 'documento-documento_personal' && permiso.view == 1) || data.all_permiso)
        {
            router.get('#/'+prefijo+'documento_personal', async function() {
                HELPER.active_sidebar('documento-documento_personal');
				let modulo = await import('../views/documento/Personal.js');
                modulo.default.render(d);
            });
        }

        if((permiso.menu == 'documento-documento_vehiculo' && permiso.view == 1) || data.all_permiso)
        {
            router.get('#/'+prefijo+'documento_vehiculo', async function() {
                HELPER.active_sidebar('documento-documento_vehiculo');
                let modulo = await import('../views/documento/Vehiculo.js');
                modulo.default.render(d);
            });
        }


    }); 
}

export default Obj_router;
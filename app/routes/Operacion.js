let prefijo = 'operacion/';

let Componente = async (router, d, data) => {

    data.permisos.forEach(permiso => {
        
        if((permiso.menu == 'operacion-nueva_incidencia' && permiso.view == 1) || data.all_permiso)
        {
            router.get('#/'+prefijo+'nueva_incidencia', async function() {
                HELPER.active_sidebar('operacion-nueva_incidencia');
                let modulo = await import('../views/operacion/incidencia/nueva_incidencia/index.js');
                modulo.default(d);
            });
        }

        if((permiso.menu == 'operacion-incidencias' && permiso.view == 1) || data.all_permiso)
        {
            router.get('#/'+prefijo+'incidencias', async function() {
                HELPER.active_sidebar('operacion-incidencias');
                let modulo = await import('../views/operacion/incidencia/index.js');
                modulo.default(d);
            });
        }
        if((permiso.menu == 'operacion-abordajes' && permiso.view == 1) || data.all_permiso)
        {
            router.get('#/'+prefijo+'abordajes', async function() {
                HELPER.active_sidebar('operacion-abordajes');
                let modulo = await import('../views/operacion/abordaje/Abordaje.js');
                modulo.default(d);
            });
        }

        if((permiso.menu == 'operacion-derivacion' && permiso.view == 1) || data.all_permiso)
            {
                router.get('#/'+prefijo+'derivacion', async function() {
                    HELPER.active_sidebar('operacion-derivacion');
                    let modulo = await import('../views/operacion/derivacion/index.js');
                    modulo.default(d);
                });
            }

            if((permiso.menu == 'operacion-reporte_incidencia' && permiso.view == 1) || data.all_permiso)
                {
                    router.get('#/'+prefijo+'reporte_incidencia', async function() {
                        HELPER.active_sidebar('operacion-reporte_incidencia');
                        let modulo = await import('../views/operacion/reporte/incidencias/index.js');
                        modulo.default(d);
                    });
                }

        


    }); 
}

export default Componente;
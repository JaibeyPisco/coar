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
                let modulo = await import('../views/operacion/incidencia/index.ts');
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

        // if((permiso.menu == 'reporte-movimiento_informacion' && permiso.view == 1) || data.all_permiso)
        // {
        //     router.get('#/'+prefijo+'movimiento_informacion', async function() {
        //         HELPER.active_sidebar('reporte-movimiento_informacion');
        //         let modulo = await import('../views/reporte/Movimiento_informacion.js');
        //         modulo.default.render(d);
        //     });
        // }

        // if((permiso.menu == 'reporte-utilidad' && permiso.view == 1) || data.all_permiso)
        // {
        //     router.get('#/'+prefijo+'utilidad', async function() {
        //         HELPER.active_sidebar('reporte-utilidad');
        //         let modulo = await import('../views/reporte/Utilidad.js');
        //         modulo.default.render(d);
        //     });
        // }


    }); 
}

export default Componente;
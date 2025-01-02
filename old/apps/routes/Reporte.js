let prefijo = 'reporte/';

let Componente = async (router, d, data) => {

    data.permisos.forEach(permiso => {
        
        if((permiso.menu == 'reporte-general' && permiso.view == 1) || data.all_permiso)
        {
            router.get('#/'+prefijo+'general', async function() {
                HELPER.active_sidebar('reporte-general');
                let modulo = await import('../views/reporte/General.js');
                modulo.default.render(d);
            });
        }

        if((permiso.menu == 'reporte-movimiento_informacion' && permiso.view == 1) || data.all_permiso)
        {
            router.get('#/'+prefijo+'movimiento_informacion', async function() {
                HELPER.active_sidebar('reporte-movimiento_informacion');
                let modulo = await import('../views/reporte/Movimiento_informacion.js');
                modulo.default.render(d);
            });
        }

        if((permiso.menu == 'reporte-incidencias' && permiso.view == 1) || data.all_permiso)
        {
            router.get('#/'+prefijo+'incidencias', async function() {
                HELPER.active_sidebar('reporte-incidencias');
                let modulo = await import('../views/reporte/incidencias/Incidencias.js');
                modulo.default(d);
            });
        }

        if((permiso.menu == 'reporte-utilidad' && permiso.view == 1) || data.all_permiso)
        {
            router.get('#/'+prefijo+'utilidad', async function() {
                HELPER.active_sidebar('reporte-utilidad');
                let modulo = await import('../views/reporte/Utilidad.js');
                modulo.default.render(d);
            });
        }


    }); 
}

export default Componente;
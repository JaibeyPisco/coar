let prefijo = 'tesoreria/';

let Componente = async (router, d, data) => {
    data.permisos.forEach(permiso => {
        
        if((permiso.menu == 'tesoreria-caja_chica' && permiso.view == 1) || data.all_permiso)
        {
            router.get('#/'+prefijo+'caja_chica', async function() {
                HELPER.active_sidebar('caja_chica');
                let modulo = await import('../views/tesoreria/Caja/CajaChica.js');
                modulo.default.render(d);
            });
        }

        if((permiso.menu == 'tesoreria-reporte_caja_chica' && permiso.view == 1) || data.all_permiso)
        {
            router.get('#/'+prefijo+'reporte_caja_chica', async function() {
                HELPER.active_sidebar('reporte_caja_chica');
                let modulo = await import('../views/tesoreria/Caja/reporte/CajaChicaReporte.js');
                modulo.default.render(d);
            });
        }

        if((permiso.menu == 'tesoreria-reporte_consolidado_caja' && permiso.view == 1) || data.all_permiso)
        {
            router.get('#/'+prefijo+'reporte_consolidado_caja', async function() {
                HELPER.active_sidebar('reporte_consolidado_caja');
                let modulo = await import('../views/tesoreria/Caja/reporte/ConsolidadoCajaReporte.js');
                modulo.default.render(d);
            });
        }

    }); 
}

export default Componente;
let prefijo = 'almacen/';

let Componente = async (router, d, data) => {
    data.permisos.forEach(permiso => {

        if((permiso.menu == 'almacen-equipo' && permiso.view == 1) || data.all_permiso)
        {
            router.get('#/'+prefijo+'equipo', async function() {
                HELPER.active_sidebar('almacen-equipo');
                let modulo = await import('../views/almacen/Equipo.js');
                modulo.default.render(d);
            });
        }

        if((permiso.menu == 'almacen-compra_equipo' && permiso.view == 1) || data.all_permiso)
        {
            router.get('#/'+prefijo+'compra_equipo', async function() {
                HELPER.active_sidebar('almacen-compra_equipo');				
				let modulo = await import('../views/almacen/Compra_equipo.js');
                modulo.default.render(d);
            });
        }
        
        if((permiso.menu == 'almacen-tipo_articulo' && permiso.view == 1) || data.all_permiso)
        {
            router.get('#/'+prefijo+'tipo_articulo', async function() {
                HELPER.active_sidebar('almacen-tipo_articulo');				
				let modulo = await import('../views/almacen/Tipo_articulo.js');
                modulo.default.render(d);
            });
        }

        if((permiso.menu == 'almacen-marca' && permiso.view == 1) || data.all_permiso)
        {
            router.get('#/'+prefijo+'marca', async function() {
                HELPER.active_sidebar('almacen-marca');
                let modulo = await import('../views/almacen/Marca.js');
                modulo.default.render(d);
            });
        }

        if((permiso.menu == 'almacen-linea_sublinea' && permiso.view == 1) || data.all_permiso)
        {
            router.get('#/'+prefijo+'linea_sublinea', async function() {
                HELPER.active_sidebar('almacen-linea_sublinea');
                let modulo = await import('../views/almacen/Linea_sublinea.js');
                modulo.default.render(d);
            });
        }

        if((permiso.menu == 'almacen-articulo' && permiso.view == 1) || data.all_permiso)
        {
            router.get('#/'+prefijo+'articulo', async function() {
                HELPER.active_sidebar('almacen-articulo');
				let modulo = await import('../views/almacen/Articulo.js');
                modulo.default.render(d);
            });
        }

        if((permiso.menu == 'almacen-unidad_medida' && permiso.view == 1) || data.all_permiso)
        {
            router.get('#/'+prefijo+'unidad_medida', async function() {
                HELPER.active_sidebar('almacen-unidad_medida');
                let modulo = await import('../views/almacen/Unidad_medida.js');
                modulo.default.render(d);
            });
        }

        if((permiso.menu == 'almacen-orden_compra' && permiso.view == 1) || data.all_permiso)
        {
            router.get('#/'+prefijo+'orden_compra', async function() {
                HELPER.active_sidebar('almacen-orden_compra');
                let modulo = await import('../views/almacen/orden_compra/Orden_compra.js');
                modulo.default.render(d);
            });
        }

        if((permiso.menu == 'almacen-compra' && permiso.view == 1) || data.all_permiso)
        {
            router.get('#/'+prefijo+'compra', async function() {
                HELPER.active_sidebar('almacen-compra');
                let modulo = await import('../views/almacen/compra/Compra.js');
                modulo.default.render(d);
            });
        }

        if((permiso.menu == 'almacen-salida_articulo' && permiso.view == 1) || data.all_permiso)
        {
            router.get('#/'+prefijo+'salida_articulo', async function() {
                HELPER.active_sidebar('almacen-salida_articulo');
                let modulo = await import('../views/almacen/salida_articulo/Salida_articulo.js');
                modulo.default.render(d);
            });
        }

        if((permiso.menu == 'almacen-almacen' && permiso.view == 1) || data.all_permiso)
        {
            router.get('#/'+prefijo+'almacen', async function() {
                HELPER.active_sidebar('almacen-almacen');
                let modulo = await import('../views/almacen/Almacen.js');
                modulo.default.render(d);
            });
        }

        if((permiso.menu == 'almacen-checklist' && permiso.view == 1) || data.all_permiso)
        {
            router.get('#/'+prefijo+'checklist', async function() {
                HELPER.active_sidebar('almacen-checklist');
                let modulo = await import('../views/almacen/Checklist.js');
                modulo.default.render(d);
            });
        }


    }); 
}

export default Componente;
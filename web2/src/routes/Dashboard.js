
let prefijo = 'dashboard/';

let Componente = async (router, d, data) => {
    data.permisos.forEach(permiso => {
        
        if((permiso.menu == 'dashboard-general' && permiso.view == 1) || data.all_permiso)
        {
            router.get('#/'+prefijo+'general', async function() {
                HELPER.active_sidebar('dashboard-general');
                let modulo = await import('../views/dashboard/General.js');
                modulo.default.render(d, data);
            });
        }

        if((permiso.menu == 'dashboard-local' && permiso.view == 1) || data.all_permiso)
        {
            router.get('#/'+prefijo+'local', async function() {
                HELPER.active_sidebar('dashboard-local');
                let modulo = await import('../views/dashboard/Local.js');
                modulo.default.render(d, data);
            });
        }

        if((permiso.menu == 'dashboard-cliente' && permiso.view == 1) || data.all_permiso)
        {
            router.get('#/'+prefijo+'cliente', async function() {
                HELPER.active_sidebar('dashboard-cliente');
                let modulo = await import('../views/dashboard/Cliente.js');
                modulo.default.render(d, data);
            });
        }


    }); 
}

export default Componente;
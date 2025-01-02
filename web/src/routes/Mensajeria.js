
let prefijo = 'mensajeria/';

let Obj_router = async (router, d, data) => {
    data.permisos.forEach(permiso => {

        if((permiso.menu == 'mensajeria-chat' && permiso.view == 1) || data.all_permiso)
        {
            router.get('#/'+prefijo+'chat', async function() {
                HELPER.active_sidebar('mensajeria-chat');
				let modulo = await import('../views/mensajeria/Chat.js');
                modulo.default.render(d);
            });
        }

    });
}

export default Obj_router;
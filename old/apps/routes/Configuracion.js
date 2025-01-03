
let prefijo = 'configuracion/';

let Obj_router = async (router, d, data) => {
    data.permisos.forEach(permiso => {

        //EMPRESA
        if((permiso.menu == 'configuracion-empresa' && permiso.view == 1) || data.all_permiso)
        {
            router.get('#/'+prefijo+'empresa', async function() {     
                HELPER.active_sidebar('configuracion-empresa');   
                let modulo = await import('../views/configuracion/Empresa.js');
                modulo.default.render(d);
            });
        }  
        
        //AREA
        if((permiso.menu == 'configuracion-area' && permiso.view == 1) || data.all_permiso)
        {
            router.get('#/'+prefijo+'area', async function() {     
                HELPER.active_sidebar('configuracion-area');   
                let modulo = await import('../views/configuracion/Area.js');
                modulo.default.render(d);
            });
        }  

        //TIPO DE INCIDENCIA
        if((permiso.menu == 'configuracion-tipos_incidencia' && permiso.view == 1) || data.all_permiso)
        {
            router.get('#/'+prefijo+'tiposIncidencia', async function() {     
                HELPER.active_sidebar('configuracion-tipos_incidencia');   
                let modulo = await import('../views/configuracion/tipos_incidencia/index.js');
                modulo.default(d);
            });
        } 

        //TIPO DE PERSONAL
        if((permiso.menu == 'configuracion-tipo_personal' && permiso.view == 1) || data.all_permiso)
        {
            router.get('#/'+prefijo+'tipoPersonal', async function() {     
                HELPER.active_sidebar('configuracion-tipo_personal');   
                let modulo = await import('../views/configuracion/tipo_personal/index.js');
                modulo.default(d);
            });
        } 

        //ROL
        if((permiso.menu == 'configuracion-rol' && permiso.view == 1) || data.all_permiso)
        {
            router.get('#/'+prefijo+'rol', async function() {     
                HELPER.active_sidebar('configuracion-rol');   
                let modulo = await import('../views/configuracion/rolesypermisos/Rol.js');
                modulo.default(d);
            });
        }

        //PERSONAL
        if((permiso.menu == 'configuracion-personal' && permiso.view == 1) || data.all_permiso)
        {
            router.get('#/'+prefijo+'personal', async function() {     
                HELPER.active_sidebar('configuracion-personal');   
                let modulo = await import('../views/configuracion/personal/Personal.js');
                modulo.default(d);
            });
        } 

        //PROVEEDOR
        if((permiso.menu == 'configuracion-proveedor' && permiso.view == 1) || data.all_permiso)
        {
            router.get('#/'+prefijo+'proveedor', async function() {     
                HELPER.active_sidebar('configuracion-proveedor');   
                let modulo = await import('../views/configuracion/proveedor/index.js');
                modulo.default(d);
            });
        } 

        //ESTUDIANTE
        if((permiso.menu == 'configuracion-estudiante' && permiso.view == 1) || data.all_permiso)
        {
            router.get('#/'+prefijo+'estudiante', async function() {     
                HELPER.active_sidebar('configuracion-estudiante');   
                let modulo = await import('../views/configuracion/estudiante/Estudiante.js');
                modulo.default(d);
            });
        }
        
        // USUARIO   
        if((permiso.menu == 'configuracion-usuario' && permiso.view == 1) || data.all_permiso)
        {
            router.get('#/'+prefijo+'usuario', async function() {
                HELPER.active_sidebar('configuracion-usuario');
                let modulo = await import('../views/configuracion/usuario/index.js');
                modulo.default(d);
            });
        }

        
        /*
        
        if((permiso.menu == 'configuracion-materia_prima' && permiso.view == 1) || data.all_permiso)
        {
            router.get('#/'+prefijo+'materia_prima', async function() {     
                HELPER.active_sidebar('configuracion-materia_prima');   
                let modulo = await import('../views/configuracion/Materia_prima.js');
                modulo.default.render(d);
            });
        }  
        
        

        if((permiso.menu == 'configuracion-socio' && permiso.view == 1) || data.all_permiso)
        {
            router.get('#/'+prefijo+'socio', async function() {     
                HELPER.active_sidebar('configuracion-socio');   
                let modulo = await import('../views/configuracion/Socio.js');
                modulo.default.render(d, 'socio');
            });
        } 

        if((permiso.menu == 'configuracion-ajuste_avanzado' && permiso.view == 1) || data.all_permiso)
        {
            router.get('#/'+prefijo+'ajuste_avanzado', async function() {     
                HELPER.active_sidebar('configuracion-ajuste_avanzado');   
                let modulo = await import('../views/configuracion/Ajuste_avanzado.js');
                modulo.default.render(d);
            });            
        } 

        if((permiso.menu == 'configuracion-local' && permiso.view == 1) || data.all_permiso)
        {
            router.get('#/'+prefijo+'local', async function() {     
                HELPER.active_sidebar('configuracion-local');   
                let modulo = await import('../views/configuracion/Local.js');
                modulo.default.render(d);
            });            
        } 

        */

            if((permiso.menu == 'configuracion-lugar' && permiso.view == 1) || data.all_permiso)
            {
                router.get('#/'+prefijo+'lugar', async function() {     
                    HELPER.active_sidebar('configuracion-lugar');   
                    let modulo = await import('../views/configuracion/lugar/index.js');
                    modulo.default(d);
                });            
            } 

    }); 
}

export default Obj_router;
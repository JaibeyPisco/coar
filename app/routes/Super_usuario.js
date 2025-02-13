import Usuario from '../views/super_usuario/Usuario.js'
import Membresia from '../views/super_usuario/Membresia.js'
import Static_system from '../views/super_usuario/configuracion/Static_system.js'
import Moneda from '../views/super_usuario/configuracion/Moneda.js'
import Utilitarios from '../views/super_usuario/configuracion/Utilitarios.js'

let Componente = async (router, d, permisos) => {

    router.get('#/membresia', async function() {     
        HELPER.active_sidebar('membresia');   
        Membresia.render(d);
    });     

    router.get('#/usuario', async function() {  
        HELPER.active_sidebar('usuario');      
        Usuario.render(d);
    });
    
    router.get('#/configuracion/general', async function() {  
        HELPER.active_sidebar('configuracion-general');      
        Static_system.render(d);
    });

    router.get('#/configuracion/moneda', async function() {  
        HELPER.active_sidebar('configuracion-moneda');      
        Moneda.render(d);
    });

    router.get('#/configuracion/utilitarios', async function() {  
        HELPER.active_sidebar('configuracion-utilitarios');      
        Utilitarios.render(d);
    });
    
}

export default Componente;
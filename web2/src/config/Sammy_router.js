import Error404     from '../views/pages/Error404.js'
const d = document.getElementById('app');

let Sammy_router = {
    
    app_cliente: async (router, data_user) => {
        
        let modulo;

        modulo = await import('../routes_cliente/Principal.js');
        modulo.default(router, d, data_user);                      

        router.run('#/rastreo_unidad');
            
        
    },
    app_estudiante: async (router, data_user) => {
        
        let modulo;

        modulo = await import('../routes_estudiante/Principal.js');
        modulo.default(router, d, data_user);                      

        router.run('#/dashboard_estudiante');
            
        
    },

    app: async (router, data_user) => {
        
        // CARGAR RUTAS DE NAVEGACIÓN ROUTER
        let modulo;

        switch (data_user.usuario.tipo) {
            
            case 'SUPER USUARIO':
                
                modulo = await import('../routes/Super_usuario.js');
                await modulo.default(router, d, data_user);

                router.run('#/membresia');

            break;

            default:

                // RUTAS PARA USUARIOS DEL APP
                modulo = await import('../routes/Dashboard.js');
                modulo.default(router, d, data_user);
 
                // El nuevo sistema
                // modulo = await import('../routes/Sistema.js');
                // await modulo.default(router, d, data_user); 


                modulo = await import('../routes/Configuracion.js');
                await modulo.default(router, d, data_user);

                modulo = await import('../routes/Operacion.js');
                await modulo.default(router, d, data_user);
 
                // modulo = await import('../routes/Almacen.js');
                // await modulo.default(router, d, data_user);
 
                modulo = await import('../routes/Reporte.js');
                await modulo.default(router, d, data_user);  

                // modulo = await import('../routes/TesoreriaRouter.js');
                // await modulo.default(router, d, data_user);  
      
                router.run('#/dashboard/general');

            break;
        }
            
        
    },

    autenticacion: async (router, data_user) => {
        
        // AGREGAR ROUTERS
        let modulo;

        modulo = await import('../routes/Autenticacion.js');
        await modulo.default(router, d, data_user);
        
        // INICIAR
        
    },

    run: async(tipo, data_user = null) => {        
        
        window.DATA_USER = data_user;

        // Inicializa la libreria Sammy JS para rutas por hash
        let router = Sammy('#app', async function() {
            
            // Página no existente
            this.notFound = async function(c) {
            
                if(tipo == 'autenticacion')
                {
                    location.href = "#/login";
                } 
                else
                {
                    //alert("esta pagina no existe");
                    d.innerHTML = await Error404.render();
                }          
            
            }        
        
        });

        if(tipo === 'app_cliente')
        {
            // Llamar rutas para el sistema dentro
            Sammy_router.app_cliente(router, data_user);
        }
        else if(tipo === 'app_estudiante')
        {
            // Llamar rutas para el sistema dentro
            Sammy_router.app_estudiante(router, data_user);
        }
        else if(tipo === 'app')
        {
            // Llamar rutas para el sistema dentro
            Sammy_router.app(router, data_user);
        }
        else if(tipo === 'autenticacion')
        {
            // Llamar rutas para autenticación visitante
            await Sammy_router.autenticacion(router, data_user);            
        }
    },
}

export default Sammy_router;
import DashboardEstudiante from '../views_estudiante/principal/dashboard_estudiante.js';

let Componente = async (router, d, permisos) => {

    router.get('#/dashboard_estudiante', async function() {
        HELPER.active_sidebar('dashboard-general');
        DashboardEstudiante.render(d, permisos);     
    });    
    
}

export default Componente;
import indexHtml from "./index.html.js";

 
let eView;
const cargar = (element, callback) =>{
    eView = element;

    eView.innerHTML = indexHtml;
 

    afterRender();
}

const afterRender = ()=> {
      
}

const editar = (data) =>{

    eView.querySelector('img[name="foto"]').src = BASE_FILES+'images/'+data.foto;
        eView.querySelector('input[name="nombres"]').value = data.nombres; 
        eView.querySelector('input[name="apellidos"]').value = data.apellidos; 
        eView.querySelector('textarea[name="obsv"]').value = data.obsv; 
        eView.querySelector('input[name="condicion_estudiante"]').value = data.condicion_estudiante; 
    
        $(eView.querySelector('select[name="grado"]')).val(data.grado).change();
        $(eView.querySelector('select[name="seccion"]')).val(data.seccion).change();
        $(eView.querySelector('select[name="sexo"]')).val(data.sexo).change();
     
        eView.querySelector('input[name="dni"]').value = data.dni; 
        eView.querySelector('input[name="correo_electronico"]').value = data.correo_electronico; 
    
        eView.querySelector('input[name="fecha_nacimiento"]').value = data.fecha_nacimiento; 
        eView.querySelector('input[name="codigo_estudiante"]').value = data.codigo_estudiante; 
        
        eView.querySelector('input[name="lav"]').value = data.lav; 
        eView.querySelector('input[name="llaves"]').value = data.llaves; 
        eView.querySelector('input[name="pabellon"]').value = data.pabellon; 
        eView.querySelector('input[name="ala"]').value = data.ala; 
        eView.querySelector('input[name="banos"]').value = data.banos; 
        eView.querySelector('input[name="monitor_acompana"]').value = data.monitor_acompana; 
        eView.querySelector('input[name="cama_ropero"]').value = data.cama_ropero; 
        eView.querySelector('input[name="duchas"]').value = data.duchas; 
        eView.querySelector('input[name="urinarios"]').value = data.urinarios;
    
            eView.querySelector('textarea[name="lugar_nacimiento"]').value = data.lugar_nacimiento; 
        eView.querySelector('input[name="fecha_caducidad_dni"]').value = data.fecha_caducidad_dni; 
        eView.querySelector('textarea[name="num_telefonico"]').value = data.num_telefonico; 
        eView.querySelector('textarea[name="religion"]').value = data.religion; 
        eView.querySelector('textarea[name="region_domicilio_actual"]').value = data.region_domicilio_actual; 
        eView.querySelector('textarea[name="provincia_domicilio_actual"]').value = data.provincia_domicilio_actual; 
        eView.querySelector('textarea[name="distrito_domicilio_actual"]').value = data.distrito_domicilio_actual; 
        eView.querySelector('textarea[name="direccion_domicilio_actual"]').value = data.direccion_domicilio_actual; 
        eView.querySelector('textarea[name="referencia_domicilio_actual"]').value = data.referencia_domicilio_actual;
    
}


export default {
    cargar,editar
}
 
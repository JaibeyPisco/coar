 
import indexHtml from "./index.html.js";

 
let eView, identificadadores = [];

const cargar = (element, callback) =>{
    eView = element;
    
    eView.innerHTML = indexHtml;

    // callbackSubmit = callback;

    // eView = element.querySelector('div[name="modal-importar"]');
    // eForm = element.querySelector('form[name="save-importar"]');

    
}

 

const editarPadre = (data) => {
    eView.querySelector('input[name="padre_vivo"]').checked = data.vive == "1";
    eView.querySelector('input[name="padre_con_estudiante"]').checked = data.vive_con_estudiante == "1";

    eView.querySelector('input[name="apellidos_padre"]').value = data.apellidos;
    eView.querySelector('input[name="nombres_padre"]').value = data.nombres;
    eView.querySelector('input[name="dni_padre"]').value = data.dni;
    eView.querySelector('select[name="grado_instruccion_padre"]').value = data.grado_instruccion || "";
    eView.querySelector('input[name="num_celular_padre"]').value = data.telefono || "";
    eView.querySelector('input[name="correo_electronico_padre"]').value = data.correo_electronico || "";
    eView.querySelector('input[name="ocupacion_actual_padre"]').value = data.ocupacion_actual || "";
    eView.querySelector('textarea[name="motivo_padre_no_vive_con_estudiante"]').value = data.motivo_no_vive_con_estudiante || "";

    identificadadores.push({ tipo: "padre", id: data.id });
};

const editarMadre = (data) => {

    eView.querySelector('input[name="madre_viva"]').checked = data.vive == "1";
    eView.querySelector('input[name="madre_con_estudiante"]').checked = data.vive_con_estudiante == "1";

    eView.querySelector('input[name="apellidos_madre"]').value = data.apellidos;
    eView.querySelector('input[name="nombres_madre"]').value = data.nombres;
    eView.querySelector('input[name="dni_madre"]').value = data.dni;
    eView.querySelector('select[name="grado_instruccion_madre"]').value = data.grado_instruccion || "";
    eView.querySelector('input[name="num_celular_madre"]').value = data.telefono || "";
    eView.querySelector('input[name="correo_electronico_madre"]').value = data.correo_electronico || "";
    eView.querySelector('input[name="ocupacion_actual_madre"]').value = data.ocupacion_actual || "";
    eView.querySelector('textarea[name="motivo_madre_no_vive_con_estudiante"]').value = data.motivo_no_vive_con_estudiante || "";

    identificadadores.push({ tipo: "madre", id: data.id });
};


const editarApoderadoRolPadre = (data) => {

    identificadadores.push({ tipo: "apoderado_rol_padre", id: data.id });
    eView.querySelector('input[name="parentesco_con_apoderado"]').value = data.parentesco_estudiante ;
    eView.querySelector('input[name="apellidos_apoderado"]').value = data.apellidos  ;
    eView.querySelector('input[name="nombres_apoderado"]').value = data.nombres  ;
  
    eView.querySelector('input[name="dni_apoderado"]').value = data.dni || "";
    eView.querySelector('input[name="num_celular_apoderado"]').value = data.telefono || "";
    eView.querySelector('input[name="tipo_familia"]').value = data.tipo_familia || "";
    
};

 
 
export default {
    cargar, editarApoderadoRolPadre, editarPadre, editarMadre
}
 
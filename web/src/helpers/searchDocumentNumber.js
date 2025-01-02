import helper from "./index.js";

export default async function(documentNumber){

    let params = {
        documentNumber: documentNumber
    };

    let {data:resp} = await API.get('shared/searchDocument?'+ helper.objUrl(params));

    return resp;

}

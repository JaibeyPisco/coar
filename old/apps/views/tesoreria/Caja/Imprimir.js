/**
 * @author Gerson Magán
 * @email gersonctk@hotmail.com
 * @create date 2021-02-04 15:09:03
 * @modify date 2021-02-04 15:09:03
 * @desc [description]
 */

import Numero_letra from '../../recursivo/Numero_letras.js'
 
let Componente = {

   print: async (id) => {

       await axios.get(BASE_API + 'tesoreria/caja/print/'+id)
       .then(function (response) {
           
           let data = response.data;

           console.log(data);

           let html = '<div style="max-width:842px; margin:auto;">';

           if(data.fl_estado == 0)
           {
               html += `
               
               <style>
                   #marca_agua_anulado {
                       position: relative;
                   }

                   .rotar_texto
                   {                
                       position: absolute;
                       margin-top:30%;
                       top: 50%;
                       left: 50%;
                       transform: translate(-50%, -50%);
                       font-size:60px;
                       opacity: 0.5;
                   }
               </style>       

               <div id="marca_agua_anulado">
                   <span class="rotar_texto" style="color:#d5062a; font-weight:bold;">ANULADO</span>
               </div>`;
           }      
           
           html += `

            <table  style="width:100%;">
                <tr>
                    <td style="width:65%;">
                        <img src="`+BASE_FILES+`images/`+data.empresa.logo+`" style="max-height:70px;"/>
                        <div style="font-weight:bold; text-align:left;"><strong>`+data.empresa.razon_social+`</strong></div>
                        <div>`+data.empresa.direccion+`</div>
                        <div>`+data.empresa.telefono+`</div>
                        <div>`+data.empresa.email+`</div>
                    </td>
                    <td style="width:35%;">
                        <div style="text-align:center; background-color:#eeeeee !important; border: 1px solid #bebdbd !important; border-radius:8px; padding:8px;">
                            <div style="font-size:18px;" ><strong style="font-size:14px">RUC : `+data.empresa.numero_documento+`</strong></div>
                            <div style="font-weight:bold; font-size:18px;">RECIBO DE CAJA</div>
                            <div  style="font-weight:bold; font-size:18px;"><strong>`+data.caja+`</strong></div>
                        </div>
                    </td>
                </tr>
                <tr>
                    <td colspan="2" vertical-align:top;">
                        <div style="background-color:#fff !important; border: 1px solid #bebdbd !important; border-radius:8px; margin-top:10px; padding:5px; min-height:80px;">
                            <table style="width:100%;">
                               <tr>
                                    <td style="width:150px;"><strong>FECHA EMISIÓN :</strong></td>
                                    <td>`+HELPER.fecha(data.fecha)+`</td>
                                </tr>
                                <tr>
                                    <td colspan="2"><strong>NOMBRE COMPLETO</strong></td>
                                </tr>
                                <tr>
                                    <td colspan="2">`+data.nombre_persona+`</td>
                                </tr>
                            </table>
                        </div>                    
                    </td>
                </tr>
                <tr>
                    <td colspan="2">
                        <table class="detalle" style="width:100%; margin-top:10px; border-collapse:collapse;">
                            <thead>
                                <tr>
                                    <th style="font-weight:bold;  background-color:#eeeeee; border: 1px solid #bebdbd !important; border-width:1px 0 1px 1px !important; text-align:center;">SERIE Y NUMERO</th>
                                    <th style="font-weight:bold; background-color:#eeeeee; border: 1px solid #bebdbd !important; border-width:1px 0 1px 0 !important; text-align:left; min-width:250px !important;">TIPO MOVIMIENTO</th>
                                    <th style="font-weight:bold; width:130px; background-color:#eeeeee; border: 1px solid #bebdbd !important; border-width:1px 0 1px 0 !important; width:100px !important; text-align:right;">IMPORTE</th>
                                </tr>
                            </thead>                            
                            <tbody>
                                <tr>
                                    <td style="text-align:center;">`+data.caja+`</td>
                                    <td>`+data.tipo_movimiento+`</td>
                                    <td style="text-align:right;">`+data.importe+`</td>
                                </tr>
                           </tbody>
                            <tfoot>
                                <tr>
                                    <td colspan="2" name="informacion_adicional"></td>
                                    <td colspan="2" valign="top">
                                        <div style="border:none;  margin-top:5px;">
                                            <table style="width:100%; border-collapse:collapse;">
                                                <tr>
                                                    <td style="font-weight:bold; font-size:11px !important; border-collapse:collapse;" align="left">
                                                        <div><strong>TOTAL:</strong></div>
                                                    </td>
                                                    <td  align="right" style="font-size:11px !important; border-collapse:collapse;">
                                                        <div>`+data.simbolo_moneda+` `+data.importe+`</div>
                                                    </td>
                                                </tr>
                                            </table>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td colspan="8" align="center" style="padding-bottom:10px;">
                                        <strong>MONTO EN LETRAS: </strong> `+Numero_letra.convertir(data.importe, data.moneda)+`
                                    </td>
                                </tr>
                                <tr>
                                    <td colspan="8" align="center">`+data.observacion+`</td>
                                </tr>
                            </tfoot>
                        </table>
                    </td>
                </tr>
            </table>`;

           HELPER.print(html);

       }).catch(error => {
           console.log(error);
       }); 
   },
} 

export default Componente;
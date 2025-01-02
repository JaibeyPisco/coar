let Componente = {

    producto_unico: (data, anioBimestre, cantidad, ancho) => {

        let html = `
            <script type="text/javascript" src="assets/template/bower_components/jquery/dist/jquery.min.js"></script>
            <script type="text/javascript" src="assets/plugins/barcode/jquery-barcode.min.js"></script>

            <div style="max-width:1200px; margin:auto;"> 
        `;
                    
        html += `
                <div style="text-align: center; margin-top: 50px;">
                    <img src="assets/images/logo_tecsup_blanco_negro.png" style="max-height:100px;"/>
                    <div style="display: flex; justify-content: center; align-items: center;">
                        <div style="display: inline-block; vertical-align: top;">
                            <div class="barcode" data-id="`+data.id+`"></div>  
                            <p id="texto-inventariado" style="text-align: right; font-size: 18px; padding-right:50px;"></p>
                        </div>               
                        
                    </div>
                    
                </div>
                
                <script>

                    $('div[data-id="`+data.id+`"]').barcode("`+data.codigo+`", "code128", {
                        barWidth: 5,
                        barHeight: 180,
                        displayValue: true,
                        fontSize: 18
                    });
                    
                    $("#texto-inventariado").text('INVENTARIO `+data.nombre_area+` `+anioBimestre+`');

                </script>
            `;              
        
        html += `
            </div>                
        `;

        HELPER.print(html);
        

     }

};

export default Componente;
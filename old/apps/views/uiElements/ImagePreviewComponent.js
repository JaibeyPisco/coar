
export default class ImagePreviewComponent {
    constructor() {
        this.eView = '';
        this.imagen_anterior = null;

    }

    render(_get) {
        this.eView = _get.domElement;

        this.eView.innerHTML = /*html*/`
            
            <div style="margin-top:10px">
                <img name="imagen" style="max-width:100%;" class="img_rectangle" alt="Imagen de perfil">
            </div>
            <div>
                <label class="btn btn-teal-light btn-wave waves-effect waves-light" style="width:100%;">
                    <i class="fa fa-search"></i> Imagen de Perfil
                    <input type="file" name="imagen" style="display:none;">
                </label>
            </div>
        `;

        this.afterRender();
    }

    afterRender() {
        this.attachEvents();
    }
    
    set(imagen){
        const imageElement = this.eView.querySelector('img[name="imagen"]');
        imageElement.src = BASE_FILES + 'images/' + imagen;
    
        this.imagen_anterior = imagen;
    }
    
    get(){
        return this.imagen_anterior;
    }

    attachEvents() {

        const fileInput = this.eView.querySelector('input[name="imagen"]');
        const imageElement = this.eView.querySelector('img[name="imagen"]');

        fileInput.addEventListener('change', (e) => {

            this.previewImage(e.target, imageElement);
        });
    }

    previewImage(input, dom) {

        if (input.files && input.files[0]) {
            const reader = new FileReader();
            
            reader.onload = function(e) {
                
                dom.src = e.target.result;
                dom.style.display = 'none';
                dom.style.opacity = 0;
                dom.style.display = 'block';

                // Animación de fadeIn personalizada
                let opacity = 0;

                const fadeInEffect = setInterval(function() {
                    if (opacity >= 1) {
                        clearInterval(fadeInEffect);
                    } else {
                        opacity += 0.1;
                        dom.style.opacity = opacity;
                    }
                }, 50);
            };
            reader.readAsDataURL(input.files[0]);
        }
    }
}

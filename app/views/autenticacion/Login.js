let Login = {

    render: async (d, data) => {  

        let logo = './assets/images/logos/logo_dorado.png';
       
        d.innerHTML = `
            <style>
                header {              
                    position: absolute;
                    background-color: black;
                    height: 100%;
                    min-height: 25rem;
                    width: 100%;
                    overflow: hidden;
                }
                header video {
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    min-width: 100%;
                    min-height: 100%;
                    width: auto;
                    height: auto;
                    z-index: 0;
                    -ms-transform: translateX(-50%) translateY(-50%);
                    -moz-transform: translateX(-50%) translateY(-50%);
                    -webkit-transform: translateX(-50%) translateY(-50%);
                    transform: translateX(-50%) translateY(-50%);
                }
                body{
                    margin:0 !important;
                }
            </style>
            <header>
                <!-- This div is  intentionally blank. It creates the transparent black overlay over the video which you can modify in the CSS -->
                <div class="overlay"></div>
                <!-- The header content -->
                <div class="container h-100">
                    <div class="d-flex h-100 text-center align-items-center">
                        <div class="w-100 text-white">
                            <h1 class="display-3">Video Header</h1>
                            <p class="lead mb-0">Using HTML5 Video and Bootstrap</p>
                        </div>
                    </div>
                </div>
            </header>
            <div name="login" class="login">
                <div class="wrapper fadeInDown">
                    <div id="formContent">
                        <div class="fadeIn first">
                            <img src="`+logo+`" id="icon" alt="User Icon" style="max-width:150px; margin-top:40px;margin-right:20px"/>
                        </div>                  
                        <h2 style="margin-top:10px;">IDENTIFÍCATE</h2>                  
                        <!-- Login Form -->
                        <form id="formulario_login">
                            <input type="text" class="fadeIn second" name="usuario" placeholder="Usuario / Correo electrónico" autocomplete="off" required>
                            <input type="password" class="fadeIn third" name="password" placeholder="Contraseña" autocomplete="off" required>
                            <button type="submit" id="btn-login" class="fadeIn fourth" data-style="zoom-in" >Iniciar Sesión</button>
                        </form>             
                        <!-- Remind Passowrd -->
                        <div id="formFooter">
                            <a class="underlineHover" href="#/recuperacion">¿Olvidaste tu Contraseña?</a>
                        </div>
                    </div>
                </div>
            </div>
        `; 

        Login.after_render();

    },

    submit: () => {

        const ladda = HELPER.ladda('#btn-login');

        let form = document.querySelector('#formulario_login');
        var formData = new FormData(form);
        
        axios({
            method: 'post',
            url: BASE_API+'autenticacion/login',
            data: formData
        })
        .then(function(response) {

            localStorage.setItem('Token', response.data.Token);
            location.href = BASE_URL;
            
        }).catch(error => {

            ladda.stop();

        });

    },

    after_render: async () => {

        $('#formulario_login').validate({
            submitHandler: function() {
                Login.submit()
            }
        });

    }
}

export default Login;
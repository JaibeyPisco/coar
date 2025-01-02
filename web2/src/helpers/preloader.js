
import logo from '../assets/img/logoPreloader.png'

export default {

    show: () => {

        document.querySelector("body").classList.add("preloader_active");

        document.body.insertAdjacentHTML('beforeend', `
            <div id="preloader">
                <img src="${logo}" alt="logo" style={{"height": "calc(3.23625vw + 77.86408px)"}} />
                <div class="preloader_animation"></div>
            </div>
        `);

    },

    hide: () => {

        let body = document.querySelector("body");

        body.classList.add("preloader_ready");

        setTimeout(function () {
        body.classList.remove("preloader_active");
        body.classList.remove("preloader_ready");
        }, 500);

    }

}
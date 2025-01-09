import { GlobalI } from "./Interfaces/GLOBAL";
import axios, { AxiosInstance } from "axios";
import * as $ from "jquery";


declare global {
    var BASE_URL: string;
    var BASE_API: string;
    var BASE_FILES: string;
    var BASE_ASSETS: string;
    var HELPER: any;
    var GLOBAL: GlobalI | {};
    var axios: AxiosInstance; 

    var $: typeof $;  // Hace que `$` esté disponible globalmente
    var jQuery: typeof $;  // Hace que `jQuery` esté disponible globalmente

    interface Window {

      BASE_URL: string;
      BASE_API: string;
      BASE_FILES: string;
      BASE_ASSETS: string;
      HELPER: any;
      GLOBAL: GlobalI | {};
      axios: AxiosInstance;

      $: typeof $;
     jQuery: typeof $;
    }
  }

export {};

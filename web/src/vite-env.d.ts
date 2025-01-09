/// <reference types="vite/client" />
/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_BASE_URL: string;
    readonly VITE_BASE_API: string;
    readonly VITE_BASE_FILES: string;
    readonly VITE_BASE_ASSETS: string;
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}

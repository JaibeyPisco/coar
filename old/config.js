
let base = 'http://coar.test/';
// let base = 'http://localhost/inventariotecsup/inventario/';
// let base = 'https://72ab-177-91-254-18.ngrok-free.app/inventario_plus_general/';
let baseServer = base + 'server/public/';

export default {
    base_url: base,
    base_api: baseServer,
    base_files: baseServer + 'writable/',
    base_assets:  base + '/assets/'
}

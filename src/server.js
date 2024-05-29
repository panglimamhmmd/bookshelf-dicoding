import Hapi from '@hapi/hapi';
import router from '../routes/BooksRoute.js';
const init = async () => {
    const server = Hapi.server({
        port: 9000,
        host: 'localhost',
    });
    server.route(router);
    await server.start();
    console.log(`Server berjalan pada ${server.info.uri}`);
};

init();

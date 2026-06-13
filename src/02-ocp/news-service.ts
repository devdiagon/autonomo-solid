import { HttpAdapter } from './http-adapter';

export class NewsService {

    constructor(private http: HttpAdapter) {}

    async getLatestNews() {
        console.log('Obteniendo noticias de la reserva biológica...');
        return this.http.get('https://jsonplaceholder.typicode.com/posts');
    }
}

export class PhotosService {

    constructor(private http: HttpAdapter) {}

    async getGallery() {
        return this.http.get('https://jsonplaceholder.typicode.com/photos');
    }
}

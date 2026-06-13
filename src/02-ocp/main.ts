import { AxiosAdapter, FetchAdapter } from './http-adapter';
import { NewsService, PhotosService } from './news-service';

const httpAxios = new AxiosAdapter();
const httpFetch = new FetchAdapter();

const newsService = new NewsService(httpAxios);
const photosService = new PhotosService(httpFetch);

newsService.getLatestNews().then(news => {
    console.log('Últimas noticias (primeras 3):', (news as any[]).slice(0, 3));
});

photosService.getGallery().then(photos => {
    console.log('Galería de fotos (primeras 3):', (photos as any[]).slice(0, 3));
});

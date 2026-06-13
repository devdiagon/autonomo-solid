import { AxiosAdapter } from './http-adapter';
import { NewsService, PhotosService } from './news-service';

const http = new AxiosAdapter();

const newsService = new NewsService(http);
const photosService = new PhotosService(http);

newsService.getLatestNews().then(news => {
    console.log('Últimas noticias (primeras 3):', (news as any[]).slice(0, 3));
});

photosService.getGallery().then(photos => {
    console.log('Galería de fotos (primeras 3):', (photos as any[]).slice(0, 3));
});

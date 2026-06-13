import { AxiosAdapter, FetchAdapter } from './http-adapter';
import { NewsService, PhotosService } from './news-service';

(async () => {
    const newsService   = new NewsService(new AxiosAdapter());
    const photosService = new PhotosService(new FetchAdapter());

    const [news, photos] = await Promise.all([
        newsService.getLatestNews(),
        photosService.getGallery(),
    ]);

    console.group('02-OCP');
    console.log('Últimas noticias (primeras 3):', (news as any[]).slice(0, 3));
    console.log('Galería de fotos (primeras 3):', (photos as any[]).slice(0, 3));
    console.groupEnd();
})();

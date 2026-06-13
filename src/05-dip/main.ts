import { LocalDatabaseService, JsonDatabaseService } from '../data/local-database';
import { PostService } from './post-service';

const localService = new PostService(new LocalDatabaseService());
const jsonService  = new PostService(new JsonDatabaseService());

localService.getPosts().then(posts => {
    console.log('Posts desde LocalDatabase:', posts);
});

jsonService.getPosts().then(posts => {
    console.log('Posts desde JsonDatabase:', posts);
});

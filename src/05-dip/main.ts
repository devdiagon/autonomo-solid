import { LocalDatabaseService, JsonDatabaseService } from '../data/local-database';
import { PostService } from './post-service';

(async () => {
    const [localPosts, jsonPosts] = await Promise.all([
        new PostService(new LocalDatabaseService()).getPosts(),
        new PostService(new JsonDatabaseService()).getPosts(),
    ]);

    console.group('05-DIP');
    console.log('Posts desde LocalDatabase:', localPosts);
    console.log('Posts desde JsonDatabase:', jsonPosts);
    console.groupEnd();
})();

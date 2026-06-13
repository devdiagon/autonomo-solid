import { DatabaseProvider } from '../data/local-database';

export class PostService {

    constructor(private db: DatabaseProvider) {}

    async getPosts() {
        return this.db.getFakePosts();
    }
}

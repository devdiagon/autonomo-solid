import axios from 'axios';

export interface HttpAdapter {
    get<T>(url: string): Promise<T>;
}

export class AxiosAdapter implements HttpAdapter {
    async get<T>(url: string): Promise<T> {
        const resp = await axios.get<T>(url);
        return resp.data;
    }
}

export class FetchAdapter implements HttpAdapter {
    async get<T>(url: string): Promise<T> {
        const resp = await fetch(url);
        return resp.json() as Promise<T>;
    }
}

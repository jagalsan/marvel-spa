export type MarvelApiLayout<T> = {
    data: {
        count: number;
        results: T;
    }
}
import { ContentType } from '@/data/enums/content-types.enum';
import { HttpMethod } from '@/data/enums/method.enum';
import crypto from 'crypto';

interface ApiCallOptions {
    body?: any | null;
    contentType?: ContentType;
    queryParams?: Record<string, string | number>;
}

const PRIVATE_KEY = process.env.MARVEL_PRIVATE_KEY as string;
const PUBLIC_KEY = process.env.MARVEL_PUBLIC_KEY as string;

const getAuthParams = () => {
    const ts = new Date().getTime();
    const hash = crypto.createHash('md5').update(ts + PRIVATE_KEY + PUBLIC_KEY).digest('hex');
    return { ts, apikey: PUBLIC_KEY, hash };
};

export const fetchApi = async <T>(
    api: string,
    method: HttpMethod,
    options: ApiCallOptions = {}
): Promise<T> => {
    try {
        const { queryParams, contentType, body } = options;

        const authParams = getAuthParams();

        const allQueryParams = { ...queryParams, ...authParams };

        const queryString = new URLSearchParams(allQueryParams as any).toString();
        api += `?${queryString}`;

        const url = `${api}`;

        const headers: HeadersInit = {
            ...(contentType !== ContentType.MULTIPART && {
                'Content-Type': contentType || ContentType.JSON,
            }),
        };


        const response = await fetch(url, {
            method,
            headers,
            body: body ? JSON.stringify(body) : null,
        });


        if (!response.ok) {
            const errorBody = await response.text();
            throw new Error(`API Error: ${response.status} - ${errorBody}`);
        }

        const data = await response.json();
        return data as T;
    } catch (error) {
        throw error;
    }
};

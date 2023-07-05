import axios, { AxiosError, AxiosInstance, AxiosResponse } from 'axios';
import { URLSearchParams } from 'url';

export const axiosInstance: AxiosInstance = axios.create({
    baseURL: '/api/'
});

axiosInstance.interceptors.response.use(
    async (response) => response,
    (error: AxiosError<any>) => {
        if (error.response) {
            const errorDescription = {
                status: 500,
                title: 'Internal Server Error',
                message:
                    'The server encountered an unexpected condition that prevented it from fulfilling the request.'
            };

            if (errorDescription) {
                console.error(errorDescription.title);
            }

            return Promise.reject(error.response);
        }
    }
);

const responseBody = (response: AxiosResponse) => response.data;

const requests = {
    get: <T>(url: string, params?: URLSearchParams): Promise<T | any> =>
        axiosInstance.get<T>(url, { params }).then(responseBody),
    post: <T>(url: string, body: {}): Promise<T | any> =>
        axiosInstance.post<T>(url, body).then(responseBody)
};

const Data = {
    get: (id: string) => requests.get(`data/get?id=${id}`),
    save: (data: any) => requests.post(`data/save`, { data })
};
const agent = {
    Data
};

export default agent;

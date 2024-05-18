import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { TokenService } from './token.service';

export declare interface ResponseCustom<T> {
    state: 'success' | 'failure';
    message?: string;
    code?: string;
    error?: any;
    data?: T;
}

export type ResponseGeneral = ResponseCustom<any>;

export type ResponseList<T> = ResponseCustom<T[]>;

export declare interface ResponseFile extends ResponseGeneral {
    url?: string;
    name_file?: string;
}


@Injectable({
    providedIn: 'root'
})
export class ApiService {

    private httpService = inject(HttpClient);
    private tokenSevice = inject(TokenService);
    private toastrService = inject(ToastrService)

    /**
     * Sends a GET request to the specified URL with optional parameters.
     * This method is used for private requests.
     * @param URL - The URL to send the GET request to.
     * @param params - Optional parameters to include in the request.
     * @returns A promise that resolves to the response data.
     */
    getPrivate<T extends ResponseGeneral>(URL: string, params?: Object) {
        return this.get<T>(URL, params, true);
    }

    getFilePrivate(URL: string, params?: Object) {
        return this.getPrivate<ResponseFile>(URL, params);
    }
    getFile(URL: string, params?: Object) {
        return this.get<ResponseFile>(URL, params);
    }

    getDataPrivate<T>(URL: string, params?: Object) {
        return this.getPrivate<ResponseCustom<T>>(URL, params);
    }
    getData<T>(URL: string, params?: Object) {
        return this.get<ResponseCustom<T>>(URL, params);
    }

    /**
     * Sends a GET request to the specified URL with optional parameters.
     * This method is used for private requests.
     * @param URL - The URL to send the GET request to.
     * @param params - Optional parameters to include in the request.
     * @returns A promise that resolves to the response data.
     */
    getListPrivate<T>(URL: string, params?: Object) {
        return this.getPrivate<ResponseList<T>>(URL, params);
    }

    /**
     * Sends a GET request to the specified URL with optional parameters.
     * This method is used for private requests.
     * @param URL - The URL to send the GET request to.
     * @param params - Optional parameters to include in the request.
     * @returns A promise that resolves to the response data.
     */
    getList<T>(URL: string, params?: Object) {
        return this.get<ResponseList<T>>(URL, params);
    }

    /**
     * Sends a GET request to the specified URL with optional parameters.
     *
     * @param URL - The URL to send the GET request to.
     * @param params - Optional parameters to include in the request.
     * @param isPrivate - Indicates whether the request should be authenticated with a token. Default is false.
     * @returns A Promise that resolves to the response data.
     */
    get<T extends ResponseGeneral>(URL: string, params?: Object, isPrivate: boolean = false): Promise<T> {

        let options = {};

        if (isPrivate) {
            options = {
                headers: new HttpHeaders()
                    .set('Authorization', `Bearer ${this.tokenSevice.token}`)
                    .set('Content-Type', `application/json`),
                params: params
            };
        } else {
            options = {
                params: params
            };
        }

        return new Promise(async (resolve) => {
            const response = this.httpService.get<T>(`${URL}`, options);




            response.subscribe({
                next: (response => this.handleHttpResponse(response, resolve)),
                error: (error) => this.handleHttpError(error, resolve)
            })
        })
    }

    /**
     * Sends a POST request to the specified URL with optional parameters.
     * This method is used for private requests.
     * @param URL - The URL to send the request to.
     * @param params - Optional parameters to include in the request.
     * @returns A promise that resolves to the response data.
     */
    postPrivate<T extends ResponseGeneral>(URL: string, params?: Object): Promise<T> {
        return this.post<T>(URL, params, true);
    }

    /**
     * Sends a POST request to the specified URL with optional parameters.
     *
     * @param URL - The URL to send the request to.
     * @param params - Optional parameters to include in the request.
     * @param isPrivate - Indicates whether the request should be authenticated with a token. Default is false.
     * @returns A Promise that resolves to the response data.
     */
    post<T extends ResponseGeneral>(URL: string, params?: Object, isPrivate: boolean = false): Promise<T> {
        return new Promise((resolve, reject) => {

            let options = {};
            if (isPrivate) {
                options = {
                    headers: new HttpHeaders()
                        .set('Authorization', `Bearer ${this.tokenSevice.token}`)
                        .set('Content-Type', `application/json`),
                    //params: params
                };
            }

            this.httpService.post<T>(`${URL}`, params, options)
                .subscribe({
                    next: (response => this.handleHttpResponse(response, resolve)),
                    error: (error) => this.handleHttpError(error, resolve)
                })
        })
    }

    postData<T>(URL: string, params?: Object, isPrivate: boolean = false) {
        return this.post<ResponseCustom<T>>(URL, params, isPrivate);
    }
    postDataPrivate<T>(URL: string, params?: Object) {
        return this.post<ResponseCustom<T>>(URL, params, true);
    }

    putData<T>(URL: string, params?: Object, isPrivate: boolean = false) {
        return this.put<ResponseCustom<T>>(URL, params, isPrivate);
    }
    putDataPrivate<T>(URL: string, params?: Object) {
        return this.put<ResponseCustom<T>>(URL, params, true);
    }

    patchData<T>(URL: string, params?: Object, isPrivate: boolean = false) {
        return this.patch<ResponseCustom<T>>(URL, params, isPrivate);
    }
    patchDataPrivate<T>(URL: string, params?: Object) {
        return this.patch<ResponseCustom<T>>(URL, params, true);
    }

    deleteData<T>(URL: string, params?: Object, isPrivate: boolean = false) {
        return this.delete<ResponseCustom<T>>(URL, params, isPrivate);
    }
    deleteDataPrivate<T>(URL: string, params?: Object) {
        return this.delete<ResponseCustom<T>>(URL, params, true);
    }

    putPrivate<T extends ResponseGeneral>(URL: string, params?: Object): Promise<T> {
        return this.put<T>(URL, params, true);
    }

    /**
     * Sends a PUT request to the specified URL with optional parameters.
     *
     * @param URL - The URL to send the request to.
     * @param params - Optional parameters to include in the request.
     * @param isPrivate - Indicates whether the request should be authenticated with a token. Default is false.
     * @returns A promise that resolves to the response of type T.
     */
    put<T extends ResponseGeneral>(URL: string, params?: Object, isPrivate: boolean = false): Promise<T> {
        return new Promise((resolve, reject) => {

            let options = {};

            if (isPrivate) {
                options = {
                    headers: new HttpHeaders()
                        .set('Authorization', `Bearer ${this.tokenSevice.token}`)
                        .set('Content-Type', `application/json`)
                };
            }

            this.httpService.put<T>(`${URL}`, params, options)
                .subscribe({
                    next: (response => this.handleHttpResponse(response, resolve)),
                    error: (error) => this.handleHttpError(error, resolve)
                })
        })
    }

    deletePrivate<T extends ResponseGeneral>(URL: string, params?: Object): Promise<T> {
        return this.delete<T>(URL, params, true);
    }

    /**
     * Sends a DELETE request to the specified URL with optional parameters.
     *
     * @template T - The type of the response object.
     * @param {string} URL - The URL to send the DELETE request to.
     * @param {Object} [params] - Optional parameters to include in the request body.
     * @param {boolean} [isPrivate=false] - Indicates whether the request should be authenticated with a token.
     * @returns {Promise<T>} - A promise that resolves with the response object.
     */
    delete<T extends ResponseGeneral>(URL: string, params?: Object, isPrivate: boolean = false): Promise<T> {
        return new Promise((resolve, reject) => {

            let options = {};

            if (isPrivate) {
                options = {
                    headers: new HttpHeaders()
                        .set('Authorization', `Bearer ${this.tokenSevice.token}`)
                        .set('Content-Type', `application/json`),
                    body: params
                };
            } else {
                options = {
                    body: params
                };
            }

            this.httpService.delete<T>(`${URL}`, options)
                .subscribe({
                    next: (response => this.handleHttpResponse(response, resolve)),
                    error: (error) => this.handleHttpError(error, resolve)
                })
        })
    }

    // metodo patch
    patchPrivate<T extends ResponseGeneral>(URL: string, params?: Object): Promise<T> {
        return this.patch<T>(URL, params, true);
    }

    patch<T extends ResponseGeneral>(URL: string, params?: Object, isPrivate: boolean = false): Promise<T> {
        return new Promise((resolve, reject) => {

            let options = {};

            if (isPrivate) {
                options = {
                    headers: new HttpHeaders()
                        .set('Authorization', `Bearer ${this.tokenSevice.token}`)
                        .set('Content-Type', `application/json`)
                };
            }

            this.httpService.patch<T>(`${URL}`, params, options)
                .subscribe({
                    next: (response => this.handleHttpResponse(response, resolve)),
                    error: (error) => this.handleHttpError(error, resolve)
                })
        })
    }


    /**
     * Handles the HTTP response and resolves the promise with the response.
     * If the response state is not 'success', it displays an error message using ToastrService.
     * @param response - The HTTP response object.
     * @param resolve - The resolve function of the promise.
     */
    private handleHttpResponse<T extends ResponseGeneral>(response: T, resolve: (value: T | PromiseLike<T>) => void): void {
        //console.log("RESPUESTA DESDE BACKEND");
        // console.log(response);
        if (response.state !== 'success') {
            this.toastrService.error(response.message, 'Error');
        }
        // else {
        //     if (response.message) {
        //         this.toastrService.success(response.message)
        //     }
        // }
        resolve(response);
    }

    /**
     * Handles HTTP errors and displays an error message using ToastrService.
     * @param error - The error object.
     * @param resolve - The resolve function to handle the error.
     * @returns A Promise resolving to an object of type T with the error details.
     */
    private handleHttpError<T>(error: any, resolve: (value: T | PromiseLike<T>) => void): void {
        console.error(error);
        //this.toastrService.error(error.message, 'Error de Servidor');

        const messageError: string | string[] = error.error ? error.error.message : error.message;

        const mensajeFormateado = messageError instanceof Array ? messageError.join(', ') : messageError;

        this.toastrService.error(mensajeFormateado, 'Error de Servidor');

        resolve({
            state: 'failure',
            message: mensajeFormateado,
            error: error,
        } as T);
    }

}

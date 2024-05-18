import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class TokenService {
    token: string = '';

    constructor() {}

    setToken(token: string) {
        this.token = token;
    }

    removeToken() {
        this.token = '';
    }
}

import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class LoadingService {
    private _show = new BehaviorSubject<boolean>(false);
    //cola
    private pendding: boolean[] = []

    get show() {
        return this._show.asObservable();
    }
    open() {
        this.pendding.push(true)
        this._show.next(true);
    }

    hide() {
        this.pendding.pop()
        if (this.pendding.length == 0) this._show.next(false);
    }
}

import { Injectable } from "@angular/core";
import { Subject } from "rxjs";

@Injectable({
    providedIn: "root"
})
export class SpinnerService{
    isLoding$ = new Subject<boolean>();
    show(): void{
        this.isLoding$.next(true);
    }
    hide(): void{
        this.isLoding$.next(false);
    }
}
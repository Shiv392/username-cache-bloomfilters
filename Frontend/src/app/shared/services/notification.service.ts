import { Injectable } from "@angular/core";
import { Subject } from "rxjs";

export interface NotificationInterface{
    summary : string,
    detail : string
}
export interface NotificationEvent{
    type : string,
    data : NotificationInterface
}

@Injectable({
    providedIn : 'root'
})

export class NotificationService{

    public notificationSubject = new Subject<NotificationEvent>();

    public showSuccess(data : NotificationInterface) : void{
        this.notificationSubject.next({type : 'success', data : data});
    }

    public showError(data : NotificationInterface) : void{
        this.notificationSubject.next({type : 'error', data : data});
    }
}
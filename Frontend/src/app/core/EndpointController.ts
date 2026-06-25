import { Injectable } from "@angular/core";

@Injectable({
    providedIn : 'root'
})

export class EndpointControllerService{
    public signup : string = '/api/signup';
    public username : string = '/api/fetch/username';
}
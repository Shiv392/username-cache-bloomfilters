import { Injectable } from "@angular/core";

Injectable({
    providedIn : 'root'
})

export class EndpointControllerService{
    public signup : string = '/signup';
    public username : string = '/username';
}
import { inject, Injectable } from "@angular/core";
import { Enviroment } from "../../core/Environment";
import { catchError, Observable, throwError } from "rxjs";
import { EndpointControllerService } from "../../core/EndpointController";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";

@Injectable({
    providedIn : 'root'
})

export class SignupService{
    private environment = inject(Enviroment);
    private EndpointControllerService = inject(EndpointControllerService);
    private http = inject(HttpClient);

    public ValidateUserName(apibody:{username:string}) : Observable<any>{
        const url = this.environment.domain + this.EndpointControllerService.username;
        return this.http.get(url, {params : {username: apibody.username}}).pipe(
            catchError((error : HttpErrorResponse)=>{
                return throwError(()=> error.error)
            })
        )
    }
}
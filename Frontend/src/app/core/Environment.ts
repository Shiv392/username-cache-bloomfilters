import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class Enviroment {
   public readonly domain = 'http://localhost:5000';
}
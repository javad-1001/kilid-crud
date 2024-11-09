import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GurdServiceService {

  constructor() { }
  gettoken(){  
    return !!localStorage.getItem("619afcac863ef1d3c971f2f41956d0b4");  
    } 
}

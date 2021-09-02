import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {INews} from "./inews";
import {Observable, timer} from "rxjs";
import {mergeMap} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  constructor(private readonly httpClient: HttpClient) { }

  getUser(textLength?: string): Observable<INews>{
    /*return  timer(3000).pipe(
      mergeMap(() => this.httpClient.get<INews>('https://chroniclingamerica.loc.gov/search/titles/results/?terms=' + textLength + '&format=json'))
    )*/


    return this.httpClient.get<INews>('https://chroniclingamerica.loc.gov/search/titles/results/?terms=' + textLength + '&format=json');
  }
}

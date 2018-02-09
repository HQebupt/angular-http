import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import { catchError, retry } from 'rxjs/operators';

export interface Config {
  heroesUrl: string;
  textfile: string;
}

@Injectable()
export class ConfigService {
  configUrl = 'http://10.62.59.205:9090/api/2.0/nodes/5a7d140f667bfc01004f3ac6';
  // https://angular-http-guide.firebaseio.com/courses.json

  constructor(private http: HttpClient) { }


  getConfig() {
    console.log("configUrl:", this.configUrl);
    return this.http.get(this.configUrl)
    .pipe(
      catchError(this.handleError)
    );
  }

  // getConfig_2() {
  //   // now returns an Observable of Config
  //   return this.http.get<Config>(this.configUrl);
  // }

  // getConfig_3() {
  //   return this.http.get<Config>(this.configUrl)
  //     .pipe(
  //       catchError(this.handleError)
  //     );
  // }

  getConfigResponse(): Observable<HttpResponse<any>> {
    console.log("getConfigResponse. configUrl:", this.configUrl);
    return this.http.get<any>(
      this.configUrl, { observe: 'response' });
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an ErrorObservable with a user-facing error message
    return new ErrorObservable(
      'Something bad happened; please try again later.');
  };

  makeIntentionalError() {
    return this.http.get('not/a/real/url')
      .pipe(
        catchError(this.handleError)
      );
  }

}

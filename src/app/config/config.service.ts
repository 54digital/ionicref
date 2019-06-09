import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpClientModule } from '@angular/common/http';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

export interface Config {
  token: string;
}

@Injectable()
export class ConfigService {
  configUrl = 'http://www.trackingsat.com/ws/users/authenticate/?username=EFOTLINK&password=112233445566';
  header1 = new HttpHeaders({
    'Access-Control-Allow-Origin': '*',
    Authorization: 'authkey',
    userid: '1'
});

  constructor(private http: HttpClient) { }

  getConfigResponse(): Observable<HttpResponse<Config>> {

    console.log('consulta aqui 3');
    return this.http.get<Config>(
      this.configUrl, { headers: this.header1, observe: 'response' });
  }

  getConfig() {
    console.log('consulta aqui 4');
    return this.http.get(this.configUrl, { headers: this.header1});
  }


}

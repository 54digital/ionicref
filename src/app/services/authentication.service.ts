import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Platform } from '@ionic/angular';
import { CookieService } from 'ngx-cookie-service';
import { Config, ConfigService} from '../config/config.service';
import { HttpClient, HttpHeaders, HttpClientModule } from '@angular/common/http';
const TOKEN_KEY = 'auth-token';

@Injectable({
  providedIn: 'root'
})

export class AuthenticationService {
  cookieValue = 'false';
  config: Config;

  error: any;
  headers: string[];

  authenticationState = new BehaviorSubject(false);

  constructor(private plt: Platform,
              private cookieService: CookieService,
              private http: HttpClient,
              private configService: ConfigService) {
    this.plt.ready().then(() => {
      this.checkToken();
    });
  }

  checkToken() {
    this.cookieValue = this.cookieService.get('Test');

    console.log(this.cookieValue);

    this.showConfigResponse();

    if (this.cookieValue === 'true') { this.authenticationState.next(true); } else { this.authenticationState.next(false); }
  }

  login() {
    this.cookieService.set( 'Test', 'true' );
    return this.authenticationState.next(true);
  }

  logout() {
    this.cookieService.set( 'Test', 'false' );
    return this.authenticationState.next(false);
  }

  isAuthenticated() {
    return this.authenticationState.value;
  }


  showConfigResponse() {
    this.configService.getConfigResponse()
      // resp is of type `HttpResponse<Config>`
      .subscribe(resp => {
        // display its headers
        const keys = resp.headers.keys();
        this.headers = keys.map(key =>
          `${key}: ${resp.headers.get(key)}`);

        // access the body directly, which is typed as `Config`.
        this.config = { ... resp.body };
        console.log('respondio');
        console.log( this.config );
      });
  }


}

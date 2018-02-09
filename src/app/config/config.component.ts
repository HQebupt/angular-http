import { Component } from '@angular/core';
import { Config, ConfigService } from './config.service';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-config',
  templateUrl: './config.component.html',
  providers: [ ConfigService ],
  styles: ['.error {color: red;}']
})
export class ConfigComponent {
  error: any;
  headers: string[];
  config: Config;
  getData: any;

  constructor(private configService: ConfigService) {}

  clear() {
    this.config = undefined;
    this.error = undefined;
    this.headers = undefined;
  }

  showConfig() {
    this.configService.getConfig()
      .subscribe(
        data => this.getData = data,
        // data => this.config = { ...data }, // success path
        //error => this.error = error // error path
      );
  }

 

  showConfigResponse() {
    console.log("showConfigResponse.....");
    this.configService.getConfigResponse()
      // resp is of type `HttpResponse<Config>`
      .subscribe(resp => {
        console.log("=======", resp);
        console.log("resp.body:", resp.body);
        // display its headers
        const keys = resp.headers.keys();
        console.log("header keys:", keys);
        this.headers = keys.map(key =>
          `${key}: ${resp.headers.get(key)}`);
        console.log("headers is:", this.headers);

        // access the body directly, which is typed as `Config`.
        // this.config = { ... resp.body };
      });
  }
  makeError() {
    this.configService.makeIntentionalError().subscribe(null, error => this.error = error );
  }
}

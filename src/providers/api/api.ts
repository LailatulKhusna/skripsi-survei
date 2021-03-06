import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Settings } from '../settings/settings';

/**
 * Api is a generic REST Api handler. Set your API url first.
 */
@Injectable()
export class Api {
  url: string = 'http://skripsi-ela.ardata.co.id';
  client: any = {
    id:null,
    secret:null
  };

  header:any;

  constructor(public http: HttpClient,public settings:Settings) {
    this.settings.load().then(()=>{
      this.settings.getValue('token').then(res=>{
        if(res != null){
          this.header = new HttpHeaders({
             'Accept':'application/json',
             'Authorization':res.token_type+' '+res.access_token
          });
        }
      });
    });
  }

  secret(){
    this.http.get(this.url+'/api/oauthclients/2').subscribe(res=>{
      console.log(res);
      this.client = res;
    });
  }

  get(endpoint: string, params?: any, reqOpts?: any) {
    if (!reqOpts) {
      reqOpts = {
        headers: this.header,
        params: new HttpParams()
      };
    }

    // Support easy query params for GET requests
    if (params) {
      reqOpts.params = new HttpParams();
      for (let k in params) {
        reqOpts.params = reqOpts.params.set(k, params[k]);
      }
    }

    return this.http.get(this.url + '/' + endpoint, reqOpts);
  }

  post(endpoint: string, body: any, reqOpts?: any) {
    reqOpts = {
      headers:this.header
    }
    return this.http.post(this.url + '/' + endpoint, body, reqOpts);
  }

  put(endpoint: string, body: any, reqOpts?: any) {
    return this.http.put(this.url + '/' + endpoint, body, reqOpts);
  }

  delete(endpoint: string, reqOpts?: any) {
    return this.http.delete(this.url + '/' + endpoint, reqOpts);
  }

  patch(endpoint: string, body: any, reqOpts?: any) {
    return this.http.patch(this.url + '/' + endpoint, body, reqOpts);
  }
}

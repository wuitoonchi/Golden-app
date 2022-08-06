import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { StorageService } from './storageService.service';
import { AlertController, NavController } from '@ionic/angular';
@Injectable({
  providedIn: 'root'
})
export class ApiService {
  lang: string = 'en';
  constructor(
    public http: HttpClient,
    private localStorageService: StorageService,
    private navController: NavController,
    private alertController: AlertController
  ) {
    this.localStorageService.getItem('dataProfile').subscribe((data: any) => {
      if(data) {
        this.lang = data.lang;
      } else {
        this.lang = 'en';
      }
    })
  }

  getApiHost(){
    return environment.api.url;
  }

  getSourceHost(){
    return environment.api.source;
  }

  httpGet(url): Promise<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        lang: this.lang
      })
    };
    const promise = new Promise((resolve, reject) => {
      this.http.get(this.getApiHost() + '/' + url,httpOptions).subscribe(data => {
        resolve(data)
      },error=>{
        reject(error);
      });
    })
    return promise;
  }

  httpPost(url, data) {
    const promise = new Promise((resolve, reject) => {
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type':  'application/json',
          lang: this.lang
        })
      };
      this.http.post(this.getApiHost() + '/' + url, JSON.stringify(data), httpOptions).subscribe(data => {
        resolve(data)
      },error=>{
        reject(error);
      });
    })
    return promise;
  }

  httpGetToken(url): Promise<any> {
    var promise = new Promise(async (resolve,reject)=> {
      let token = JSON.parse(localStorage.getItem('authData')).access_token;
      if(token) {
        const httpOptions = {
          headers: new HttpHeaders({
            'Content-Type':  'application/json',
            Authorization: 'Bearer ' + token,
            lang: this.lang
          })
        };
        this.http.get(this.getApiHost()+ '/' +url,httpOptions).subscribe(data=> {
            resolve(data)
          },error=> {
            reject(error);
          });
      } else {
        this.navController.navigateRoot('/welcome')
      }
    })
    return promise;
  }

  httpPostToken(url, data) {
      var promise = new Promise(async (resolve,reject) => {
        let token = JSON.parse(localStorage.getItem('authData')).access_token;
        if(token) {
            const httpOptions = {
              headers: new HttpHeaders({
                'Content-Type':  'application/json',
                Authorization: 'Bearer ' + token,
                lang: this.lang
              })
            };
            this.http.post(this.getApiHost()+ '/' +url,data,httpOptions).subscribe(data=>{
              resolve(data)
            },error=>{
              reject(error);
            });
        } else {
          this.navController.navigateRoot('/welcome')
        }
      });
      return promise;
  }

  httpGetTokenCustome(url): Promise<any> {
    const promise = new Promise(async (resolve,reject) => {
      let token = JSON.parse(localStorage.getItem('authData')).access_token;
        if(token) {
        const httpOptions = {
          headers: new HttpHeaders({
            'Content-Type':  'application/json',
            Authorization: 'Bearer ' + token.access_token,
            lang: this.lang
          })
        };
        this.http.get(this.getApiHost()+ '/' + url, httpOptions).subscribe(data => {
            resolve(data)
          },error=> {
            reject(error);
          });
        } else {
          this.navController.navigateRoot('/welcome')
        }
    })
    return promise;
  }

  httpPostTokenCustome(url, data) {
      const promise = new Promise(async (resolve, reject) => {
        let token = JSON.parse(localStorage.getItem('authData')).access_token;
        if(token) {
            const httpOptions = {
              headers: new HttpHeaders({
                'Content-Type':  'application/json',
                Authorization: 'Bearer ' + token.access_token,
                lang: this.lang
              })
             };
            this.http.post(this.getApiHost() + '/' + url, data, httpOptions).subscribe( data => {
              resolve(data)
            }, error => {
              reject(error);
            });
          } else {
            this.navController.navigateRoot('/welcome')
          }
      });
      return promise;
  }
}

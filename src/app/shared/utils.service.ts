import { Injectable, NgZone } from '@angular/core';
import { ToastController, AlertController } from '@ionic/angular';
import { ApiService } from './api.service';
import { OneSignal } from '@awesome-cordova-plugins/onesignal/ngx';
import { environment } from '../../environments/environment';
import * as moment from 'moment';
import { Camera, CameraOptions } from '@awesome-cordova-plugins/camera/ngx';
import { StorageService } from './storageService.service';
declare var google: any;
@Injectable({
  providedIn: 'root'
})
export class UtilsService {
  langString:any;
  public moment = moment;
  constructor(
    private toastCtrl: ToastController,
    private alertCtrl: AlertController,
    private api: ApiService,
    private oneSignal: OneSignal,
    private storageService: StorageService,
    public ngZone: NgZone,
  ) {
    this.storageService.getItem('langString').subscribe((langString:any)=> {
      this.langString = langString;
    });
  }
  
  async syncSettingsSystem() {
    this.api.httpGetToken('settings').then((res)=> {
      this.storageService.setItem('settings',res);
    })
  }

  async getGeoLocation(lat: number, lng: number): Promise<any> {
    let promise = new Promise( async(resolve, reject) => {
      if (navigator.geolocation) {
        let geocoder = await new google.maps.Geocoder();
        let latlng = await new google.maps.LatLng(lat, lng);
        let request = { latLng: latlng };
        await geocoder.geocode(request, (results, status) => {
          if (status == google.maps.GeocoderStatus.OK) {
            let result = results[0];
            this.ngZone.run(() => {
              if (result != null) {
                resolve({
                  result: result,
                  coords:{
                    lat: lat,
                    lng: lng
                  }
                });
              } else {
                reject(false);
              }
            });
          } else {
            reject(false);
          }
        });
      } else {
        reject(false);
      }
    });
    return promise;
  }

  async showToast(message,duration = 2000){
    const toast = await  this.toastCtrl.create({
      message: message,
      duration: duration,
      mode:'ios'
    });
    toast.present();
  }

  async showAlert(message){
    const alert = await  this.alertCtrl.create({
      message: message,
      mode:'ios',
      buttons: [
        {
          text: 'Aceptar',
          handler: () => {
          }
        }
      ]
    });
    await alert.present();
  }

  getAppName(){
    return environment.app.name;
  }

  getCompanyName(){
    return environment.app.company;
  }

  getAppVersion(){
    return environment.app.version;
  }

  setLocalStorage(alias,value){
    localStorage.setItem(alias,value);
  }

  getLocalStorage(alias):Promise<any> {
    var promise = new Promise((resolve, reject)=>{
      var value = localStorage.getItem(alias);
      if(value){
        resolve(value);
      }else{
        reject(false);
      }
    });
    return promise;
  }

  getDistance(start, end,unit="K") {
    if(!start) {
      start = {
        lat:end.lat,
        lng:end.lng
      };
    }
    if ((start.lat == end.lat) && (start.lng == start.lng)) {
      return 0;
    }
    else {
      var radlat1 = Math.PI * start.lat/180;
      var radlat2 = Math.PI * end.lat/180;
      var theta = start.lng-end.lng;
      var radtheta = Math.PI * theta/180;
      var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
      if (dist > 1) {
        dist = 1;
      }
      dist = Math.acos(dist);
      dist = dist * 180/Math.PI;
      dist = dist * 60 * 1.1515;
      if (unit=="K") { dist = dist * 1.609344 }
      if (unit=="N") { dist = dist * 0.8684 }
      return dist;
    }
  }

  getTypeEnterprises():Promise<any> {
    return this.api.httpGet('/api/general/type_enterprises');
  }

  getBanners(data = null): Promise<any> {
    let city = JSON.parse(localStorage.getItem('dataProfile'));
    if(data == null) {
      if(city){
        return this.api.httpGet('/api/general/banners/'+city.city_id);
      }else{
        let promiseNull = new Promise(function(resolve) {
          resolve([]);
        });
        return promiseNull;
      }
    } else {
      return this.api.httpGet('/api/general/banners/'+data.id);
    }
  }

  getStates(): Promise<any> {
    return this.api.httpGet('/api/general/states');
  }

  getCities(state): Promise<any> {
    return this.api.httpGet('/api/general/states/' + state + '/cities');
  }

  enableNotifications(data:any)
  {
        this.oneSignal.startInit(environment.oneSignal, environment.firebase.messagingSenderId);

        this.oneSignal.inFocusDisplaying(this.oneSignal.OSInFocusDisplayOption.Notification);

        this.oneSignal.handleNotificationReceived().subscribe(() => {
         // do something when notification is received
        });

        this.oneSignal.handleNotificationOpened().subscribe(() => {
          // do something when a notification is opened
        });
        this.oneSignal.sendTags({
          type: 1, // Client
          user_id: data.id,
          state_id: data.state_id,
          city_id: data.city_id
        });
        this.oneSignal.endInit();
  }

  disableNotifications()
  {
    this.storageService.getItem('dataProfile').subscribe((data:any) => {
      this.oneSignal.startInit(environment.oneSignal, environment.firebase.messagingSenderId);
      this.oneSignal.setSubscription(false);
    })
  }

  checkIsOpenBranchOffice(branchoffice: any) {
    return ((moment() >= moment(branchoffice.time_open,["HH:mm"]) &&  moment() <= moment(branchoffice.time_close.toString(),["HH:mm"])
     || (branchoffice.time_open.toString()=='00:00' && branchoffice.time_close.toString() == '00:00') ) && branchoffice.closed==0)
  }

  sendPushNotification(data): Promise<any> {
    return this.api.httpPostToken('/send_notification', data);
  }

  takePhotoFromCamera(): Promise<any> {
    const promise = new Promise((resolve, reject) => {
      const camera = new Camera;
      const options: CameraOptions = {
        quality: 100,
        targetHeight: 512,
        targetWidth: 512,
        correctOrientation: true,
        destinationType: camera.DestinationType.DATA_URL,
        encodingType: camera.EncodingType.JPEG,
        mediaType: camera.MediaType.PICTURE
      }
      camera.getPicture(options).then((image) => {
        resolve('data:image/jpeg;base64,' + image)
      },(err) => {
        reject(err);
      })
    });
    return promise;
   }

   takePhotoFromGallery(): Promise<any> {
      const promise = new Promise((resolve, reject) => {
        const camera = new Camera;
        const options: CameraOptions = {
          quality: 100,
          targetHeight: 512,
          targetWidth: 512,
          correctOrientation: true,
          encodingType: camera.EncodingType.JPEG,
          destinationType: camera.DestinationType.DATA_URL,
          sourceType: camera.PictureSourceType.PHOTOLIBRARY,
          saveToPhotoAlbum: false
        }
        camera.getPicture(options).then((image) => {
          resolve('data:image/jpeg;base64,' + image);
        },(err) => {
          reject(err);
        })
    });
    return promise;
  }
}

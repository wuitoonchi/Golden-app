import { Injectable, NgZone } from '@angular/core';
import { ToastController, AlertController, Platform } from '@ionic/angular';
import { ApiService } from './api.service';
import { environment } from '../../environments/environment';
import * as moment from 'moment';
import { Camera, CameraOptions } from '@awesome-cordova-plugins/camera/ngx';
import { StorageService } from './storageService.service';
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
    private storageService: StorageService,
    public ngZone: NgZone,
    private platform: Platform,
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
    try {
      // Uncomment to set OneSignal device logging to VERBOSE  
      // window.plugins.OneSignal.setLogLevel(6, 0);
      // NOTE: Update the setAppId value below with your OneSignal AppId.
      window["plugins"].OneSignal.setAppId(environment.oneSignal);
      window["plugins"].OneSignal.sendTags({user_id:data.user.id, type:1});
      window["plugins"].OneSignal.setNotificationOpenedHandler(function(jsonData) {
          console.log('notificationOpenedCallback: ' + JSON.stringify(jsonData));
      });

      // iOS - Prompts the user for notification permissions.
      //    * Since this shows a generic native prompt, we recommend instead using an In-App Message to prompt for notification permission (See step 6) to better communicate to your users what notifications they will get.
      window["plugins"].OneSignal.promptForPushNotificationsWithUserResponse(function(accepted) {
          console.log("User accepted notifications: " + accepted);
      });
    } catch(e) {}
  }

  disableNotifications()
  {
    try {
    window["plugins"].OneSignal.setSubscription(false);
    } catch(e) {}
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

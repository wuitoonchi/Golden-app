import { Injectable, NgZone } from '@angular/core';
import { ToastController, AlertController } from '@ionic/angular';
import { ApiService } from './api.service';
import { environment } from '../../environments/environment';
import * as moment from 'moment';
import { Camera, CameraOptions } from '@awesome-cordova-plugins/camera/ngx';
import { StorageService } from './storageService.service';
import { OneSignal } from '@ionic-native/onesignal/ngx';
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
    private oneSignal: OneSignal
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
    if(data) {
      this.oneSignal.startInit(environment.oneSignal, environment.firebase.messagingSenderId);
      this.oneSignal.inFocusDisplaying(this.oneSignal.OSInFocusDisplayOption.Notification);
      this.oneSignal.handleNotificationReceived().subscribe(() => {
        // Notrhing
      });
      this.oneSignal.handleNotificationOpened().subscribe(()=> {
        // Nothing
      });
      this.oneSignal.sendTags({user_id:data.user.id, type:1});
      this.oneSignal.endInit();
    } 
  }

  disableNotifications()
  {
    this.oneSignal.startInit(environment.oneSignal, environment.firebase.messagingSenderId);
    this.oneSignal.setSubscription(false);
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

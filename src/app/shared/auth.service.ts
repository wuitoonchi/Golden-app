
import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { UtilsService } from './utils.service';
import { StorageService } from './storageService.service';
import { NavController } from '@ionic/angular';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(
      private storageService: StorageService,
      private utils: UtilsService,
      private api: ApiService,
      private navController: NavController
    ) { }

    sendEmailRecovery(email):Promise<any> {
      return this.api.httpPost('auth/recovery-account',{email})
    }

    sendEmailVerification(email): Promise<any> {
      return this.api.httpPost('auth/verification-account',{email});
    }

    login(email, password) {
      return this.api.httpPost('auth/login',{email: email, password: password});
    }

    register(data): Promise<any> {
      return this.api.httpPost('auth/register',data);
    }

    logout() {
      // remove all vars from localstorage
      localStorage.clear();
      this.utils.disableNotifications();
      this.navController.navigateRoot('/login')
    }

    get isLoggedIn(): boolean {
      const token = JSON.parse(localStorage.getItem('authData'));
      return (token !== null) ? true : false;
    }
}

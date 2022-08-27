import { StorageService } from 'src/app/shared/storageService.service';
import { Component } from '@angular/core';
import { AlertController, NavController, Platform } from '@ionic/angular';
import { AuthService } from './shared/auth.service';
import { UtilsService } from './shared/utils.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  dataUser;
  public pages : any[] = [
    { title: 'Home', url: '/home', icon: 'home' },
    { title: 'Wallet', url: '/home/wallet', icon: 'wallet' },
    { title: 'Referral', url: '/home/referrals', icon: 'people' },
    { title: 'Logout', icon: 'log-out', route: true },
  ];
  dataSettings;
  constructor(
    private auth: AuthService,
    private alertController: AlertController,
    private navController: NavController,
    private utils: UtilsService,
   private storageService: StorageService,
   private platform: Platform
  ) {
    this.platform.ready().then(()=> {
      if( this.auth.isLoggedIn ) {
        this.utils.syncSettingsSystem();
        this.storageService.getItem('authData').subscribe((res:any)=> {
          this.dataUser= res;
          this.utils.enableNotifications(res);
        });
        this.storageService.getItem('settings').subscribe((res:any)=> {
          this.dataSettings = res;
        })
        this.navController.navigateRoot( '/home/home' );
      }
    })
  }

  async logOut() {
    let alert = await this.alertController.create({
      message: 'Si cierra sessión dejara de recibir notificaciones, ¿Desea continuar?',
      mode:'ios',
      buttons: [
        {
          text: 'Cancelar',
          role:'cancel',
        },
        {
          text: 'Continuar',
          handler: ()=> {
            this.auth.logout();
          }
        }
      ]
    })
  alert.present();
  }
}
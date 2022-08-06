import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { ApiService } from 'src/app/shared/api.service';
import { StorageService } from 'src/app/shared/storageService.service';
import { UtilsService } from 'src/app/shared/utils.service';
import { SocialSharing } from '@awesome-cordova-plugins/social-sharing/ngx'
@Component({
  selector: 'app-referrals',
  templateUrl: './referrals.page.html',
  styleUrls: ['./referrals.page.scss'],
})
export class ReferralsPage implements OnInit {
  arrReferrals = [];
  dataSharing:any;
  constructor(
    private api: ApiService,
    private storageService: StorageService,
    private utils: UtilsService,
    private navController: NavController,
    private socialSharing: SocialSharing
  ) { }

  ngOnInit() {
    this.storageService.setItem('is-loading',true);
    this.api.httpGetToken('settings').then((res)=> {
      this.dataSharing = res;
    }).catch(()=> {
      this.utils.showAlert('De momento la función compartir no se encuentra disponible, intente más tarde.');
    }).finally(()=> {
      this.storageService.setItem('is-loading',false);
    })
  }

  async ionViewWillEnter() {
    this.storageService.setItem('is-loading',true);
    this.api.httpGetToken('referrals').then((res:any)=> {
      this.arrReferrals = res;
    }).catch(()=> {
      this.utils.showAlert('No ha sido posible cargar referidos');
    }).finally(()=> { this.storageService.setItem('is-loading',false); })
  }

  showDetails(referal) {
    this.storageService.setItem('referral',referal);
    this.navController.navigateForward('/home/referrals/details');
  }

  async addReferral() {
    let authData = JSON.parse(localStorage.getItem('authData'));
    console.log(authData);
    this.socialSharing.share( this.dataSharing.message + ', registrandote con mi código mediante el siguiente enlace '+authData.user.share_link,'Compartir '+this.dataSharing.site_name);
  }
}

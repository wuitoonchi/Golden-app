import { WithdrawalComponent } from './../../components/withdrawal/withdrawal.component';
import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController, NavController } from '@ionic/angular';
import { ApiService } from 'src/app/shared/api.service';
import { StorageService } from 'src/app/shared/storageService.service';

@Component({
  selector: 'app-wallet',
  templateUrl: './wallet.page.html',
  styleUrls: ['./wallet.page.scss'],
})
export class WalletPage implements OnInit {
  resumen = {
    rewards:0,
    referrals:0,
    progress:0,
    transactions:[]
  };
  dataUser:any;
  constructor(
    private api: ApiService,
    private storageService: StorageService,
    private navController: NavController,
    private modalController: ModalController,
    private alertController: AlertController
  ) { }

  ngOnInit() {
    this.storageService.getItem('authData').subscribe((res:any)=> {
      this.dataUser = res.user;
    })
  }
  
  async ionViewWillEnter() {
    this.storageService.getItem('load-transactions-wallet').subscribe(()=> {
      this.storageService.setItem('is-loading',true);
      this.api.httpGetToken('wallet').then((res:any)=> {
        this.resumen.rewards = res.rewards;
        this.resumen.referrals = res.referrals;
        this.resumen.progress = res.progress;
        this.resumen.transactions = res.transactions;
        this.storageService.setItem('resume-account',res);
      }).finally(()=> {
         this.storageService.setItem('is-loading',false);
      });
    });
 }

 showTransactionDetail(transaction) {
  this.storageService.setItem('transaction-details',transaction);
  this.navController.navigateForward('/home/transactions/details');
}

 async setUpWallet() {
  this.navController.navigateForward('/home/wallet/setting');
 }

 async withdrawal() {
  if(this.dataUser.wallet!=null) {
    const popover = await this.modalController.create({
      mode:'ios',
      component: WithdrawalComponent,
      breakpoints: [0, 0.3, 0.5, 0.8],
      initialBreakpoint: 0.9
    });
    
    await popover.present();
  } else {
      const alert = await this.alertController.create({
        header: 'Wallet no configurada',
        message: 'Para poder realizar un retiro debe ingresar su dirección wallet, Actualmente solo admitimos retiros a traves de la red <b>ERC20 Tron</b>.',
        mode:'ios',
        buttons: [
          {
            text: 'Cancelar',
            role: 'cancel',
            cssClass: 'secondary',
          }, {
            text: 'Continuar',
            handler: async () => {
              this.navController.navigateForward('/home/wallet/setting');
            }
          }
        ]
      });
    
      await alert.present();
  }
}
}

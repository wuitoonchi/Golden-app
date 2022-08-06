import { WithdrawalComponent } from './../../components/withdrawal/withdrawal.component';
import { Component, OnInit, ViewChild } from '@angular/core';
import { AlertController, IonSlides, ModalController, NavController } from '@ionic/angular';
import { ApiService } from 'src/app/shared/api.service';
import { StorageService } from 'src/app/shared/storageService.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  @ViewChild('slideWithNav', { static: false }) slideWithNav: IonSlides;
  resumen = {
    rewards:0,
    referrals:0,
    progress:0,
    transactions:[],
    iq:''
  };
  dataUser:any;
  sliderOne: any;
  arrTravels:any;
  arrIqs:any;
  arrEntertainments:any;
  notifications:any = 0;
  constructor(
    private api: ApiService,
    private storageService: StorageService,
    private navController: NavController,
    private modalController: ModalController,
    private alertController: AlertController
  ) { }

  ngOnInit() {
    //Item object for Nature
    this.sliderOne = {
      initialSlide: 0,
      slidesPerView: 3,
      spaceBetween: 0,
      autoplay:true
     };
  }
  async ionViewWillEnter() {
     this.storageService.setItem('is-loading',true);
      this.storageService.getItem('authData').subscribe((res:any)=> {
        this.dataUser = res.user;
      })
     this.api.httpGetToken('account/summary').then((res:any)=> {
       console.log(res);
       this.resumen.rewards = res.rewards;
       this.resumen.referrals = res.referrals;
       this.resumen.progress = res.progress;
       this.resumen.transactions = res.transactions;
       this.resumen.iq = res.iq!=null?res.iq.name:'';
       this.storageService.setItem('resume-account',res);
       this.arrIqs = res.iqs;
       this.arrEntertainments = res.entertainments;
       this.arrTravels = res.travels;
     }).finally(()=> {
        this.storageService.setItem('is-loading',false);
     });
  }
  
  showTransactionDetail(transaction) {
    this.storageService.setItem('transaction-details',transaction);
    this.navController.navigateForward('/home/transactions/details');
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

  openLeadership() {
    this.navController.navigateForward('/home/iqs')
  }

  goToIq(s) {
    s.item_type = 'iq'
    this.storageService.setItem('item-detail', s);
    this.navController.navigateForward('/home/iqs/buy');
  }

  goToEntertainment(s) {
    s.item_type = 'entertainment'
    this.storageService.setItem('item-detail', s);
    this.navController.navigateForward('/home/entertainments/buy');
  }

  goToTravel(s) {
    s.item_type = 'travel'
    this.storageService.setItem('item-detail', s);
    this.navController.navigateForward('/home/travels/buy');
  }
}

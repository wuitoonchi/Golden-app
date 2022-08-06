import { SendPaymentWithCoinPaymentComponent } from './../../../components/send-payment-with-coin-payment/send-payment-with-coin-payment.component';
import { SendPaymentWithBankTransferComponent } from './../../../components/send-payment-with-bank-transfer/send-payment-with-bank-transfer.component';
import { Component, OnInit } from '@angular/core';
import { AlertController, LoadingController, ModalController, NavController } from '@ionic/angular';
import { StorageService } from 'src/app/shared/storageService.service';
import * as moment from 'moment';
import { InAppBrowser } from '@awesome-cordova-plugins/in-app-browser/ngx';
import { ApiService } from 'src/app/shared/api.service';
import { UtilsService } from 'src/app/shared/utils.service';
@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
})
export class DetailsPage implements OnInit {
  public dataTransaction:any;
  constructor(
    private storageService: StorageService,
    private modalController: ModalController,
    private navController: NavController,
    private iab: InAppBrowser,
    private alertController: AlertController,
    private loadingController: LoadingController,
    private api: ApiService,
    private utils: UtilsService
  ) { 
    this.storageService.getItem('transaction-details').subscribe((data:any)=> {
      this.dataTransaction = data;
      if(this.dataTransaction.payment_method == '3' && this.dataTransaction.status == '0' && this.dataTransaction.cryptopay!=null ) {
        this.dataTransaction.cryptopay.expired = moment().diff(this.dataTransaction.cryptopay.created_at, 'minutes') > 59 ? true : false;
      }
      console.log(this.dataTransaction)
      });
  }

  ngOnInit() {
  }


  async sendTransfer() {
    const popover = await this.modalController.create({
      mode:'ios',
      component: SendPaymentWithBankTransferComponent,
      breakpoints: [0, 0.3, 0.5, 0.8],
      initialBreakpoint: 0.9
    });

    await popover.present();
  }

  async sendCoinPayment() {
    if(this.dataTransaction.payment_method == '3' && this.dataTransaction.cryptopay != null) {
      if(this.dataTransaction.cryptopay.expired == false) {
        this.iab.create(this.dataTransaction.cryptopay.checkout_url);
      } else {
        const popover = await this.modalController.create({
          mode:'ios',
          component: SendPaymentWithCoinPaymentComponent,
          breakpoints: [0, 0.3, 0.5, 0.8],
          initialBreakpoint: 0.9
        });
        await popover.present();
      }
    } else {
      const popover = await this.modalController.create({
        mode:'ios',
        component: SendPaymentWithCoinPaymentComponent,
        breakpoints: [0, 0.3, 0.5, 0.8],
        initialBreakpoint: 0.9
      });
      popover.present();
    }
  }

  async cancelTransaction () {
    const alert = await this.alertController.create({
      header: 'Cancelar transacción',
      message: 'Su transacción será cancelada y eliminada de su lista de transacciones, desea continuar?',
      mode:'ios',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary'
        }, {
          text: 'Continuar',
          handler: async() => {
            let loading = await this.loadingController.create({
                 message:'Eliminando transacción...',
                 animated:true,
                 spinner:'dots',
                 mode:'ios'
               });
             loading.present();
             this.api.httpGetToken('checkout/cancel/'+this.dataTransaction.id).then(()=> {
               this.utils.showToast('Transacción eliminada exitosamente!');
               this.storageService.setItem('load-transactions-wallet', Math.random());
              this.navController.back();
             })
             .catch(()=> {
               this.utils.showAlert('No ha sido posible eliminar transacción.')
             })
             .finally(()=> {
               loading.dismiss();
             })
          }
        }
      ]
    });
  
    await alert.present();
  }

  async verArticulo() {
    switch(this.dataTransaction.type) {
      case '0': {
          switch (this.dataTransaction.order.item.type) {
            case 'entertainment':
              this.dataTransaction.order.item_type = 'entertainment';
              this.storageService.setItem('item-detail', this.dataTransaction.item);
              this.navController.navigateForward('/home/entertainments/detail');
              break;
            case 'iq':
              this.dataTransaction.order.item_type = 'iq';
              this.storageService.setItem('item-detail', this.dataTransaction.item);
              this.navController.navigateForward('/home/iqs/detail');
              break;
            case 'product':
              this.dataTransaction.order.item_type = 'product';
              this.storageService.setItem('item-detail', this.dataTransaction.item);
              this.navController.navigateForward('/home/products/detail');
              break;
            case 'travel':
              this.dataTransaction.order.item_type = 'travel';
              this.storageService.setItem('item-detail', this.dataTransaction.item);
              this.navController.navigateForward('/home/travels/detail');
              break;
            default:
              break;
          }
      break;}
    }
  }
}

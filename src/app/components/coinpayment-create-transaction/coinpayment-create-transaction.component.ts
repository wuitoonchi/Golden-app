import { Component, OnInit } from '@angular/core';
import { LoadingController, ModalController, NavController } from '@ionic/angular';
import { ApiService } from 'src/app/shared/api.service';
import { StorageService } from 'src/app/shared/storageService.service';
import { Clipboard } from '@awesome-cordova-plugins/clipboard/ngx';
import { UtilsService } from 'src/app/shared/utils.service';
import { InAppBrowser } from '@awesome-cordova-plugins/in-app-browser/ngx';

@Component({
  selector: 'app-coinpayment-create-transaction',
  templateUrl: './coinpayment-create-transaction.component.html',
  styleUrls: ['./coinpayment-create-transaction.component.scss'],
})
export class CoinpaymentCreateTransactionComponent implements OnInit {
  dataItem:any;
  dataTransaction;
  walletAddress;
  constructor(
    private loadingController: LoadingController,
    private storageService: StorageService,
    private api: ApiService,
    private clipboard: Clipboard,
    private utils: UtilsService,
    private iab: InAppBrowser,
    private navController: NavController,
    private modalController: ModalController
  ) { }

  ngOnInit() {
    this.storageService.getItem('item-detail').subscribe((res)=> {
      this.dataItem = res;
    });
  }

  async createTransaction() {
    const loading = await this.loadingController.create({
      mode:'ios',
      message: 'Creando transacción...',
      spinner: 'bubbles'
    });
    await loading.present();
    this.api.httpPostToken('checkout/create-transaction',{
      type: this.dataItem.item_type,
      id: this.dataItem.id,
      payment_type: 'coinpayment',
      quantity: this.dataItem.quantity,
    }).then((res:any) => {
      this.dataTransaction = res;
    })
    .catch(()=> {

    })
    .finally(async ()=> {
      loading.dismiss();
    })
  }

  copyClipBoard() {
    this.clipboard.copy(this.dataTransaction.url);
    this.utils.showToast('Copiado al portapapeles');
  }

  async nextToPayment() {
    this.iab.create(this.dataTransaction.url);
    this.navController.navigateRoot('/home/home');
    this.modalController.dismiss();
  }
}

import { Component, OnInit } from '@angular/core';
import { AlertController, LoadingController, ModalController } from '@ionic/angular';
import { ApiService } from 'src/app/shared/api.service';
import { StorageService } from 'src/app/shared/storageService.service';
import { UtilsService } from 'src/app/shared/utils.service';
@Component({
  selector: 'app-send-payment-with-bank-transfer',
  templateUrl: './send-payment-with-bank-transfer.component.html',
  styleUrls: ['./send-payment-with-bank-transfer.component.scss'],
})
export class SendPaymentWithBankTransferComponent implements OnInit {
  arrBankAccounts = [];
  dataItem:any;
  constructor(
    private loadingController: LoadingController,
    private storageService: StorageService,
    private utils: UtilsService,
    private alertController: AlertController,
    private api: ApiService,
    private modalController: ModalController
  ) { }

  async ionViewWillEnter(){
    this.storageService.getItem('settings').subscribe((settiings:any)=> {
      this.arrBankAccounts = settiings.bank_accounts
    });
    this.storageService.getItem('transaction-details').subscribe((res)=> {
      this.dataItem = res;
    });
  }
  ngOnInit() {}

  async sendTicketTransaction() {
    this.utils.takePhotoFromCamera().then(async (res)=> {
        const alert = await this.alertController.create({
          header: 'Confirmar envio',
          message: 'Antes de enviar por favor asegure que la información sea correcta y la imagen sea legible y comprensible.',
          mode:'ios',
          buttons: [
            {
              text: 'Cancelar',
              role: 'cancel',
              cssClass: 'secondary',
            }, {
              text: 'Continuar',
              handler: async () => {
                let loading = await this.loadingController.create({
                     message:'Enviando comprobante...',
                     animated:true,
                     spinner:'dots',
                     mode:'ios'
                   });
                   loading.present();
                   this.api.httpPostToken('checkout/upload_banktransfer', {
                    'id': this.dataItem.id,
                    'image': res,
                   }).then(()=> {
                     this.modalController.dismiss();
                     this.utils.showToast('Comprobante enviado correctamente.');
                   }).catch(()=> {
                      this.utils.showAlert('No ha sido posible enviar el comprobante, intente nuevamente.');
                   }).finally(()=> {
                     loading.dismiss();
                   });
              }
            }
          ]
        });
        await alert.present();
    });
  }
}

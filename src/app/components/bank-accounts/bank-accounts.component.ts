import { Component, OnInit } from '@angular/core';
import { AlertController, LoadingController, ModalController, NavController } from '@ionic/angular';
import { ApiService } from 'src/app/shared/api.service';
import { StorageService } from 'src/app/shared/storageService.service';

@Component({
  selector: 'app-bank-accounts',
  templateUrl: './bank-accounts.component.html',
  styleUrls: ['./bank-accounts.component.scss'],
})
export class BankAccountsComponent implements OnInit {
  arrAccounts = [];
  dataItem;
  constructor(
    private storageService: StorageService,
    private modalController: ModalController,
    private api: ApiService,
    private alertController: AlertController,
    private loadingController: LoadingController,
    private navController: NavController
  ) {
    this.storageService.getItem('settings').subscribe((res:any)=> {
      this.arrAccounts = res.bank_accounts;
      console.log(res.bank_accounts);
    });
    this.storageService.getItem('item-detail').subscribe((res:any)=> {
      this.dataItem = res;
    });
   }

  ngOnInit() {}

  async buyItem() {
    const alert = await this.alertController.create({
      mode:'ios',
      header: 'Importante',
      message: 'Su órden se agregará a su lista de transacciones, posteriormente deberá accederla para cargar su comprobante de pago, ¿Desea continuar?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary'
        }, {
          text: 'Continuar',
          handler: async () => {
            let loading = await this.loadingController.create({
                 mode:'ios',
                 message:'Procesando ordén',
                 animated:true,
                 spinner:'dots'
               });
             loading.present();
             this.api.httpPostToken('checkout/create-transaction',{
               type: this.dataItem.item_type,
               id: this.dataItem.id,
               payment_type: 'wiretransfer',
               quantity: this.dataItem.quantity,
             }).then(async ()=> {
                this.modalController.dismiss();
                this.navController.navigateRoot('/home/home');
                const alert = await this.alertController.create({
                  mode:'ios',
                  header: 'Ordén creada con exito',
                  subHeader: 'Cargue su comprobante de pago',
                  message: 'La órden solo será valida por 24 horas.',
                  buttons: ['Aceptar']
                });
                alert.present();
                alert.onDidDismiss();
             }).catch(async ()=> {
                 const alert = await this.alertController.create({
                   mode:'ios',
                   header: 'Lo sentimos',
                   subHeader: 'Error al procesar la órden',
                   message: 'Lo sentimos, de momento no hemos podido procesar su órden, por favor verifique su conexión a internet e intente nuevamente.',
                   buttons: ['Aceptar']
                 });
                 await alert.present();
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

  close() {
    this.modalController.dismiss();
  }
}

import { Component, OnInit } from '@angular/core';
import { AlertController, LoadingController, ModalController, NavController, PopoverController } from '@ionic/angular';
import { BankAccountsComponent } from 'src/app/components/bank-accounts/bank-accounts.component';
import { CoinpaymentCreateTransactionComponent } from 'src/app/components/coinpayment-create-transaction/coinpayment-create-transaction.component';
import { ApiService } from 'src/app/shared/api.service';
import { StorageService } from 'src/app/shared/storageService.service';

@Component({
  selector: 'app-buy',
  templateUrl: './buy.page.html',
  styleUrls: ['./buy.page.scss'],
})
export class BuyPage implements OnInit {
  itemData;
  dataUser;
  dataResumeAccount;
  dataItem;
  constructor(
    private storageService: StorageService,
    private navController: NavController,
    private api: ApiService,
    private modalController: ModalController,
    private alertController: AlertController,
    private loadingController: LoadingController
  ) { }

  ngOnInit() {
    this.storageService.getItem('authData').subscribe((res:any)=> {
      this.dataUser = res.user;
    });
    this.storageService.getItem('item-detail').subscribe((res)=> {
      this.itemData = res;
    });
    this.storageService.getItem('resume-account').subscribe((res)=> {
      this.dataResumeAccount = res;
    });
  }

  async buyTransfer() {
    let bankAccounts = await this.modalController.create({
      mode:'ios',
      component: BankAccountsComponent,
      breakpoints: [0, 0.3, 0.5, 0.8],
      initialBreakpoint: 0.9
    });
    bankAccounts.present();
  }

  async buyWithCripto() {
    let coinPayment = await this.modalController.create({
      mode:'ios',
      component: CoinpaymentCreateTransactionComponent,
      breakpoints: [0, 0.3, 0.5, 0.8],
      initialBreakpoint: 0.9
    });
    coinPayment.present();
  }

  async buyWallet() {
    const alert = await this.alertController.create({
      mode:'ios',
      header: 'Confirmar compra',
      message: 'Se hará un cargo a su wellet, los datelles de su compra aparecerán en su lista de transacciones, ¿Desea continuar?',
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
                 message:'Procesando órden',
                 animated:true,
                 spinner:'dots'
               });
             loading.present();
             this.api.httpPostToken('checkout/create-transaction',{
               type: this.dataItem.type,
               id: this.dataItem.id,
               payment_type: 'wiretransfer'
             }).then(async ()=> {
                this.modalController.dismiss();
                this.navController.navigateRoot('/home/home');
                const alert = await this.alertController.create({
                  mode:'ios',
                  header: 'Ordén creada con exito',
                  message: 'Se ha descontado de su wallet el monto del articulo.',
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
}

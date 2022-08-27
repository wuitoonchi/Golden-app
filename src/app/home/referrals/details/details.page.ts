import { Component, OnInit } from '@angular/core';
import { AlertController, LoadingController, NavController } from '@ionic/angular';
import { ApiService } from 'src/app/shared/api.service';
import { StorageService } from 'src/app/shared/storageService.service';
import { UtilsService } from 'src/app/shared/utils.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
})
export class DetailsPage implements OnInit {
  dataReferral:any;
  constructor(
    private storageService: StorageService,
    private alertController: AlertController,
    private api: ApiService,
    private loadingController: LoadingController,
    private navController: NavController,
    private utils: UtilsService
  ) { 
    this.storageService.getItem('referral').subscribe((data:any)=> {
      this.dataReferral = data;
    });
  }

  ngOnInit() {
    this.storageService.getItem('referral').subscribe((data:any)=> {
      this.dataReferral = data;
    });
  }

  async removeAfiliate() {
    const alert = await this.alertController.create({
      header: 'Importante',
      message: 'Al remover al su referido ya no recibira beneficios de la aplicación cuando este realize una compra.',
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
              message:'Removiendo referido...',
              mode:'ios'
            });
            loading.present();
            this.api.httpGetToken('referrals/destroy/'+this.dataReferral.id).then(()=> {
              this.utils.showAlert('Referido removido con exito!');
              this.navController.back();
            })
            .catch(()=> {
              this.utils.showAlert('Lo sentimos no ha sido posible remover referido, intente nuevamente.');
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

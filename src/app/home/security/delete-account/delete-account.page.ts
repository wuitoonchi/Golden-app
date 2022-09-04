import { AuthService } from 'src/app/shared/auth.service';
import { Component, OnInit } from '@angular/core';
import { LoadingController, AlertController } from '@ionic/angular';
import { ApiService } from 'src/app/shared/api.service';
import { StorageService } from 'src/app/shared/storageService.service';
import { UtilsService } from 'src/app/shared/utils.service';

@Component({
  selector: 'app-delete-account',
  templateUrl: './delete-account.page.html',
  styleUrls: ['./delete-account.page.scss'],
})
export class DeleteAccountPage implements OnInit {

  constructor(
    private api: ApiService,
    private storageService: StorageService,
    private auth: AuthService,
    private loading: LoadingController,
    private alertCtrl: AlertController,
    private utils: UtilsService
  ) { }

  ngOnInit() {
  }

  async deleteMyAccount() {
    let confirm = await this.alertCtrl.create({
      message: '¿Está seguro que desea eliminar su cuenta?',
      mode: 'ios',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
        text: 'Continuar',
        handler: async () => {
          let loading = await this.loading.create({
            message: 'Eliminando cuenta',
            mode: 'ios'
          });
          loading.present();
          this.auth.deleteAccount().then((res:any)=> {
            loading.dismiss();
            this.auth.logout();
            this.utils.showAlert('Solicitud de eliminación de cuenta procesada correctamente');
          }).catch((err)=> {
            console.log(err);
            this.utils.showAlert('Lo sentimos, no ha sido posible procesar su solicitud, por favor intente dentro de un momento más.')
          }).finally(()=> {
            loading.dismiss();
          });
        }}
      ]
    });
    confirm.present();
  }
}

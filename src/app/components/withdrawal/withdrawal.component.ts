import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { StorageService } from 'src/app/shared/storageService.service';
import { AlertController, LoadingController, ModalController } from '@ionic/angular';
import { ApiService } from 'src/app/shared/api.service';
import { UtilsService } from 'src/app/shared/utils.service';

@Component({
  selector: 'app-withdrawal',
  templateUrl: './withdrawal.component.html',
  styleUrls: ['./withdrawal.component.scss'],
})
export class WithdrawalComponent implements OnInit {
  dataResume:any;
  amount = 0;
  form: FormGroup;
  Google2FAEnabled = false;
  dataSettings:any;
  constructor(
    private storageService: StorageService,
    private formBuilder: FormBuilder,
    private loadingController: LoadingController,
    private api: ApiService,
    private utils: UtilsService,
    private alertController: AlertController,
    private modalController: ModalController
  ) {}

  ngOnInit() {
    this.dataSettings = JSON.parse(localStorage.getItem('settings'));
    this.form = this.formBuilder.group({
      'amount':[0, [Validators.required, Validators.min(parseFloat(this.dataSettings.min_withdrawal))]],
      'code':['']
    });
    this.storageService.getItem('resume-account').subscribe((res)=> { this.dataResume = res; });
    this.storageService.getItem('authData').subscribe((res:any)=> {
      this.Google2FAEnabled = res.user.google2fa_enabled == true ? true : false;
    });
  }

  all() {
    this.amount = parseFloat(this.dataResume.rewards);
    this.form.get('amount').setValue(parseFloat(this.dataResume.rewards_unformatted));
  }

  async withDrawal() {
    const alert = await this.alertController.create({
      header: 'Retiro de fondos',
      message: 'Por favor ingrese su contraseña actual para confirmar retiro.',
      mode:'ios',
      inputs: [
        {
          name: 'password',
          type: 'password',
          placeholder: 'Password'
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
        }, {
          text: 'Continuar',
          handler: async (res) => {
            if(res.password!='') { 
              let loading = await this.loadingController.create({
                message:'Creando transacción',
                animated:true,
                spinner:'dots',
                mode:'ios'
              });
              loading.present();
              let data = this.form.value;
              data.password = res.password;
              this.api.httpPostToken('wallet/create-withdrawal',data).then(()=> {
                this.utils.showAlert('Se ha creado la transacción para retiro de fondos, pronto recibirá notificacion sobre su estado.');
                this.modalController.dismiss();
                this.storageService.setItem('load-transactions-wallet', Math.random());
              })
              .catch((err)=> {
                  this.utils.showAlert(err.error.error.message);
              })
              .finally(()=> {
                loading.dismiss();
              })
            }
        }
      }]
    });
    alert.present();
  }
}

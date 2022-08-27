import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { BarcodeScanner } from '@awesome-cordova-plugins/barcode-scanner/ngx';
import { AlertController, LoadingController, NavController } from '@ionic/angular';
import { ApiService } from 'src/app/shared/api.service';
import { StorageService } from 'src/app/shared/storageService.service';
import { UtilsService } from 'src/app/shared/utils.service';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.page.html',
  styleUrls: ['./setting.page.scss'],
})
export class SettingPage implements OnInit {
  form:FormGroup;
  dataUser:any;
  Google2FAEnabled = false;
  constructor(
    private navController: NavController,
    private barcodeScanner: BarcodeScanner,
    private formBuilder: FormBuilder,
    private alertController: AlertController,
    private loadingController: LoadingController,
    private api: ApiService,
    private storageService: StorageService,
    private utils: UtilsService
  ) { 
    this.form = this.formBuilder.group({
      'wallet': ['', Validators.required],
      'code': ['']
    })
  }

  ngOnInit() {
    this.storageService.getItem('authData').subscribe((res:any)=> {
      this.dataUser = res.user;
      this.form.get('wallet').setValue(this.dataUser.wallet);
      this.Google2FAEnabled = res.user.google2fa_enabled == true ? true : false;
    })
  }

  back() {
    this.navController.back();
  }

  openScanner() {
    this.barcodeScanner.scan().then(barcodeData => {
      console.log(barcodeData);
      this.form.controls['wallet'].setValue(barcodeData.text);
    }).catch(err => {
      console.log('Error', err);
    });
  }

  async save() {
    const alert = await this.alertController.create({
      header: 'Confirmar configuración',
      message: 'Por favor inrese su contraseña para confirmar modificaciones.',
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
            let loading = await this.loadingController.create({
                 message:'Procesando...',
                 animated:true,
                 spinner:'dots',
                 mode:'ios'
               });
             loading.present();
             this.api.httpPostToken('wallet/update/'+this.dataUser.id,{
               password: res.password,
               wallet: this.form.value.wallet,
               code: this.form.value.code
             })
             .then(()=> {
               this.utils.showAlert('Wallet actualizada correctamente.');
               let authData = JSON.parse(localStorage.getItem('authData'));
               authData.user.wallet = this.form.value.wallet;
               this.storageService.setItem('authData',authData);
             })
             .catch((err)=> {
                this.utils.showAlert(err.error.error.message);
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

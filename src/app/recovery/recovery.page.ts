import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NavController, LoadingController } from '@ionic/angular';
import { environment } from 'src/environments/environment';
import { AuthService } from '../shared/auth.service';
import { StorageService } from '../shared/storageService.service';
import { UtilsService } from '../shared/utils.service';

@Component({
  selector: 'app-recovery',
  templateUrl: './recovery.page.html',
  styleUrls: ['./recovery.page.scss'],
})
export class RecoveryPage implements OnInit {

  form: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private navController: NavController,
    private loadingController: LoadingController,
    private auth: AuthService,
    private utils: UtilsService,
    private storageService: StorageService
  ) {
    this.form = this.formBuilder.group({
      email: [environment.access.email, [Validators.email, Validators.required]]
    });
  }

  async recovery() {
    let loading = await this.loadingController.create({
      message: 'Procesando solicitud...',
      spinner: 'dots',
      mode:'ios'
    });
    loading.present();
    this.auth.sendEmailRecovery(this.form.get('email').value).then((res:any)=> {
      this.utils.showAlert('Se ha enviado un correo electrónico a su cuenta con las instrucciones para recuperar su contraseña');
      this.back();
    }).catch((err)=> {
      console.log(err.error);
      this.utils.showAlert(err.error.error.message);
    }).finally(()=> {
      loading.dismiss();
    });
  }

  ngOnInit() {
  }

  back() {
    this.navController.navigateBack('/welcome');
  }

}

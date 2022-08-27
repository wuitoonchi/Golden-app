import { environment } from 'src/environments/environment';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoadingController, NavController } from '@ionic/angular';
import { AuthService } from 'src/app/shared/auth.service';
import { UtilsService } from '../shared/utils.service';
import { StorageService } from '../shared/storageService.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

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
      name: [environment.access.name, Validators.required],
      email: [environment.access.email, [Validators.email, Validators.required]],
      password: [environment.access.password, [Validators.required, Validators.minLength(6)]],
      code: ['']
    });
  }

  ngOnInit() {
  }

  async next() {
    let loading = await this.loadingController.create({
      message: 'Procesando solicitud...',
      mode:'ios'
    });
    await loading.present();
    this.auth.register(this.form.value).then((res) => {
        this.navController.navigateForward('/register-confirm');
        this.storageService.setItem('authData', res);
        this.navController.navigateForward('/home');
      }).catch(err => {
        this.utils.showAlert(err.error.error.message);
      }).finally(()=> {
        loading.dismiss();
      });
  }

  back() {
    this.navController.navigateBack('/welcome');
  }
}

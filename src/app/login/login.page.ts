import { environment } from 'src/environments/environment';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoadingController, NavController } from '@ionic/angular';
import { AuthService } from '../shared/auth.service';
import { UtilsService } from '../shared/utils.service';
import { StorageService } from '../shared/storageService.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
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
      email: [environment.access.email, [Validators.email, Validators.required]],
      password: [environment.access.password, [Validators.required, Validators.minLength(6)]]
    });
  }

  async login() {
    let loading = await this.loadingController.create({
      message: 'Procesando solicitud...',
      spinner: 'dots',
      mode:'ios'
    });
    loading.present();
    this.auth.login(this.form.get('email').value, this.form.get('password').value).then((res:any)=> {
      console.log(res);
      this.storageService.setItem('authData', res.data);
      this.navController.navigateForward('/home/home').then(()=> {
        this.utils.enableNotifications(res.data);
        this.utils.syncSettingsSystem();
      });
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

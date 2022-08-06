import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiService } from 'src/app/shared/api.service';
import { StorageService } from 'src/app/shared/storageService.service';
import { UtilsService } from 'src/app/shared/utils.service';

@Component({
  selector: 'app-settings-password',
  templateUrl: './settings-password.page.html',
  styleUrls: ['./settings-password.page.scss'],
})
export class SettingsPasswordPage implements OnInit {
  frm: FormGroup;
  Google2FAEnabled = false;
  constructor(
    private storageService: StorageService,
    private api: ApiService,
    private utils: UtilsService,
    private formBuilder: FormBuilder
  ) {
    this.storageService.getItem('authData').subscribe((res: any) => {
      this.Google2FAEnabled = res.user.google2fa_enabled == true ? true : false;
    });
    this.frm = this.formBuilder.group({
      'code': [''],
      'password': ['', Validators.required],
      'newpassword': ['', Validators.required],
    });
   }

  ngOnInit() {
  }


  updatePassword() {
    this.storageService.setItem('is-loading',true);
    this.api.httpPostToken('account/change-password', this.frm.value).then((res: any) => {
      this.utils.showAlert('Felicidades! Su contraseña ha sido cambiada con exito.');
    }).catch((err: any) => {
      this.utils.showToast(err.error.error.message);
    }).finally(() => {
      this.storageService.setItem('is-loading',false);
    });
  }
}

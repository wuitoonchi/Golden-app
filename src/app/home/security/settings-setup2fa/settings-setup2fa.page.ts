import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/app/shared/api.service';
import { StorageService } from 'src/app/shared/storageService.service';
import { UtilsService } from 'src/app/shared/utils.service';

@Component({
  selector: 'app-settings-setup2fa',
  templateUrl: './settings-setup2fa.page.html',
  styleUrls: ['./settings-setup2fa.page.scss'],
})
export class SettingsSetup2faPage implements OnInit {
  Google2FAEnabled = false;
  googleData:any;
  // forms
  frm2FA: FormGroup;
  dataResponse2FA:any = {
    image: '',
  };
  constructor(
    private storageService: StorageService,
    private api: ApiService,
    private utils: UtilsService,
    private formBuilder: FormBuilder
  ) {
    this.storageService.getItem('authData').subscribe((res: any) => {
      this.Google2FAEnabled = res.user.google2fa_enabled == true ? true : false;
    });
    this.frm2FA = this.formBuilder.group({
      'code': ['', Validators.required],
      'password': ['', Validators.required]
    });
   }

  ngOnInit() {
    this.storageService.getItem('authData').subscribe((res: any) => {
      this.Google2FAEnabled = res.user.google2fa_enabled == true ? true : false;
    });
    this.api.httpGetToken('account/two-factor/2fa').then((res: any) => {
      this.dataResponse2FA = res.data;
    });
  }

  setup2FA() {
    this.storageService.setItem('is-loading',true);
    if(this.Google2FAEnabled == false) {
      this.api.httpPostToken('account/two-factor/2fa/confirm', this.frm2FA.value).then((res: any) => {
        this.Google2FAEnabled = true;
        this.utils.showAlert('Felicidades! Ahora su cuenta es más segura.');
        let authData = JSON.parse(localStorage.getItem('authData')??'{}');
        authData.user.google2fa_enabled = true;
        this.storageService.setItem('authData', authData);
        this.ngOnInit();
      }).catch((err: any) => {
        this.utils.showToast(err.error.message);
      }).finally(() => {
        this.storageService.setItem('is-loading',false);
      });
    } else {
      this.api.httpPostToken('account/two-factor/2fa/disable', this.frm2FA.value).then((res: any) => {
        let authData = JSON.parse(localStorage.getItem('authData')??'{}');
        this.Google2FAEnabled = false;
        authData.user.google2fa_enabled = false;
        this.storageService.setItem('authData', authData);
        this.utils.showAlert('Ahora su cuenta es menos, segura y pueden realizase retiros sin confirmacón.');
        this.ngOnInit();
      }).catch((err: any) => {
        this.utils.showToast(err.error.message);
      }).finally(() => {
        this.storageService.setItem('is-loading',false);
      });
    }
  }
}

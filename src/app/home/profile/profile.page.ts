import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { NavController, ModalController, AlertController, LoadingController } from '@ionic/angular';
import { ApiService } from 'src/app/shared/api.service';
import { StorageService } from 'src/app/shared/storageService.service';
import { UtilsService } from 'src/app/shared/utils.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  captureDataUrl = './assets/img/default_user.png';
  resumen;
  dataUser:any;
  form: FormGroup
  arrCountries = [];
  constructor(
    private api: ApiService,
    private storageService: StorageService,
    private navController: NavController,
    private alertController: AlertController,
    private formBuilder: FormBuilder,
    private utils: UtilsService,
    private loadingController: LoadingController
  ) { 
    this.form = this.formBuilder.group({
      'image':[''],
      'name':['', Validators.required],
      'email':['', Validators.required],
      'phone':[''],
      'country_id': ['', Validators.required],
      'state': [''],
      'city':[''],
    })
  }

  ngOnInit() {
    this.storageService.getItem('authData').subscribe((res:any)=> {
      this.dataUser = res.user;
      this.captureDataUrl = res.user.image;
      this.form.get('name').setValue(this.dataUser.name);
      this.form.get('email').setValue(this.dataUser.email);
      this.form.get('phone').setValue(this.dataUser.phone);
      this.form.get('country_id').patchValue(this.dataUser.country_id);
      this.form.get('state').setValue(this.dataUser.state);
      this.form.get('city').setValue(this.dataUser.city);
    })
  }

  async ionViewWillEnter() {
     this.storageService.setItem('is-loading',true);
      this.storageService.getItem('settings').subscribe((res:any)=> {
        this.arrCountries = res.countries;
      })
     this.api.httpGetToken('account/summary').then((res:any)=> {
       this.resumen = res;
       this.storageService.setItem('resume-account',res);
     }).finally(()=> {
        this.storageService.setItem('is-loading',false);
     });
  }

  openLeadership() {
    this.navController.navigateForward('/home/iqs')
  }

  async fromCamera() {
    this.utils.takePhotoFromCamera().then((photo) => {
      this.captureDataUrl = photo;
      this.form.get('image').setValue(this.captureDataUrl);
     }).catch(() => {
       this.utils.showToast('No ha sido posible capturar imagen, por favor verifique los permisos de aplicación');
     });
  }


  async fromGallery() {
    this.utils.takePhotoFromGallery().then((photo) => {
        this.captureDataUrl = photo;
        this.form.get('image').setValue(this.captureDataUrl);
    }).catch((err) => {
      console.log(err);
      this.utils.showToast('No ha sido posible capturar imagen, por favor verifique los permisos de aplicación');
    });
  }

  async update() {
    const alert = await this.alertController.create({
      header: 'Actualización de perfil',
      message: 'Por favor ingrese su contraseña actual para confirmar los cambios.',
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
                message:'Procesando...',
                animated:true,
                spinner:'dots',
                mode:'ios'
              });
              loading.present();
              let dataPost = this.form.value;
              dataPost.password = res.password;
              this.api.httpPostToken('account/update', dataPost)
              .then((res:any)=> {
                this.utils.showAlert('Perfil actualizado correctamente.');
                let dataAuth = JSON.parse(localStorage.getItem('authData'));
                dataAuth.user = res.data
                this.storageService.setItem('authData',dataAuth);
              })
              .catch(()=> {
                this.utils.showAlert('Error al actualizar datos de perfil, por favor intente nuevamente.');
              })
              .finally(()=> {
                loading.dismiss();
              })
            }
          }
        }
      ]
    });
  
    await alert.present();
  }
}

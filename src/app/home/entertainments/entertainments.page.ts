import { Component, OnInit } from '@angular/core';
import { AlertController, NavController } from '@ionic/angular';
import * as moment from 'moment';
import { ApiService } from 'src/app/shared/api.service';
import { StorageService } from 'src/app/shared/storageService.service';

@Component({
  selector: 'app-entertaiments',
  templateUrl: './entertainments.page.html',
  styleUrls: ['./entertainments.page.scss'],
})
export class EntertainmentsPage implements OnInit {

  arrItems:Array<any> = [];
  dataUser:any;
  dateNow;
  constructor(
    private api: ApiService,
    private storageService: StorageService,
    private alertController: AlertController,
    private navController: NavController
  ) { }
  ngOnInit() { }
  
  ionViewWillEnter() {
    this.dateNow = moment.now();
    this.storageService.setItem('is-loading',true);
    this.api.httpGetToken('shop/entertainments').then((res)=> {
      this.arrItems = res.data;
      console.log(this.arrItems)
    }).finally(()=> {
      this.storageService.setItem('is-loading',false);
    });
    this.storageService.getItem('authData').subscribe((res:any)=> {
      this.dataUser = res.user;
      console.log(this.dataUser);
    });
  }

  async showInfo(item) {
    if(!item.promotional_vigence) {
      let alert = await this.alertController.create({
        subHeader:"Importante",
        message:"Para comprar a un menor costo puede comprar un bono de liderazgo. <br> <br> <strong>¿Desea adquirir un bono de liderazgo?</strong>",
        mode:'ios',
        buttons:[
          {
            role:'cancel',
            text:'Cerrar',
          },
          {
            text:'Comprar Bono',
            handler:async ()=> {
              this.navController.navigateForward('/home/leaderships');
            }
          }
        ]
      });
      alert.present();
    } else {
      if(this.dataUser.active != 1) {
        let alert = await this.alertController.create({
          subHeader:"Importante",
          message:"Su bono de liderazgo ha caducado, Para comprar a un menor costo puede comprar un nuevo bono de liderazgo. <br> <br> <strong>¿Desea comprar un bono de liderazgo?</strong>",
          mode:'ios',
          buttons:[
            {
              role:'cancel',
              text:'Cerrar',
            },
            {
              text:'Comprar Bono',
              handler:async ()=> {
                this.navController.navigateForward('/home/leaderships');
              }
            }
          ]
        });
        alert.present();
      }
    }
  }

  showDetails(item) {
    item.item_type = 'entertainment'
    this.storageService.setItem('item-detail', item);
    this.navController.navigateForward('/home/entertainments/detail');
  }

  buy(item) {
    item.item_type = 'entertainment'
    this.storageService.setItem('item-detail', item);
    this.navController.navigateForward('/home/entertainments/buy');
  }

}

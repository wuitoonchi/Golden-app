import { Component, OnInit } from '@angular/core';
import { AlertController, NavController } from '@ionic/angular';
import * as moment from 'moment';
import { ApiService } from 'src/app/shared/api.service';
import { StorageService } from 'src/app/shared/storageService.service';

@Component({
  selector: 'app-iqs',
  templateUrl: './iqs.page.html',
  styleUrls: ['./iqs.page.scss'],
})
export class IqsPage implements OnInit {

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
    this.api.httpGetToken('shop/iqs').then((res)=> {
      this.arrItems = res.data;
      console.log(this.arrItems)
    });
    this.storageService.getItem('authData').subscribe((res:any)=> {
      this.dataUser = res.user;
      console.log(this.dataUser);
    });
  }

  showDetails(item) {
    item.item_type = 'iq'
    this.storageService.setItem('item-detail', item);
    this.navController.navigateForward('/home/iqs/detail');
  }

  buy(item) {
    item.item_type = 'iq'
    this.storageService.setItem('item-detail', item);
    this.navController.navigateForward('/home/iqs/buy');
  }

}

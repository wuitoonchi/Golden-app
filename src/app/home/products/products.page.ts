import { Component, OnInit } from '@angular/core';
import { AlertController, NavController } from '@ionic/angular';
import * as moment from 'moment';
import { ApiService } from 'src/app/shared/api.service';
import { StorageService } from 'src/app/shared/storageService.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.page.html',
  styleUrls: ['./products.page.scss'],
})
export class ProductsPage implements OnInit {

  arrItems:Array<any> = [];
  dataUser:any;
  dateNow;
  constructor(
    private api: ApiService,
    private storageService: StorageService,
    private navController: NavController
  ) { }
  ngOnInit() { }
  
  ionViewWillEnter() {
    this.dateNow = moment.now();
    this.storageService.setItem('is-loading',true);
    this.api.httpGetToken('shop/products').then((res)=> {
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

  showDetails(item) {
    item.item_type = 'product'
    this.storageService.setItem('item-detail', item);
    this.navController.navigateForward('/home/products/detail');
  }

  buy(item) {
    item.item_type = 'product'
    this.storageService.setItem('item-detail', item);
    this.navController.navigateForward('/home/products/buy');
  }

}

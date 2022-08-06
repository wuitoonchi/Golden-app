import { Component, OnInit } from '@angular/core';
import { AlertController, NavController } from '@ionic/angular';
import { StorageService } from 'src/app/shared/storageService.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.page.html',
  styleUrls: ['./detail.page.scss'],
})
export class DetailPage implements OnInit {
  itemData;
  dataUser;
  constructor(
    private storageService: StorageService,
    private navController: NavController
  ) { }

  ngOnInit() {
    this.storageService.getItem('authData').subscribe((res:any)=> {
      this.dataUser = res.user;
    });
    this.storageService.getItem('item-detail').subscribe((res)=> {
      this.itemData = res;
    });
  }


  buy() {
    this.navController.navigateForward('/home/products/buy')
  }
}

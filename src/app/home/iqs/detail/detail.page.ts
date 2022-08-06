import { Component, OnInit } from '@angular/core';
import { AlertController, NavController } from '@ionic/angular';
import { ApiService } from 'src/app/shared/api.service';
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
    private navController: NavController,
    private api: ApiService
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
    this.navController.navigateForward('/home/iqs/buy')
  }
}

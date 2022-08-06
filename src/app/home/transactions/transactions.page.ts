import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { ApiService } from 'src/app/shared/api.service';
import { StorageService } from 'src/app/shared/storageService.service';
import { UtilsService } from 'src/app/shared/utils.service';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.page.html',
  styleUrls: ['./transactions.page.scss'],
})
export class TransactionsPage implements OnInit {
  arrTransactions = [];
  constructor(
    private api: ApiService,
    private storageService: StorageService,
    private utils: UtilsService,
    private navController: NavController,
  ) { }

  ngOnInit() {}

  async ionViewWillEnter() {
    this.storageService.setItem('is-loading',true);
    this.api.httpGetToken('transactions').then((res:any)=> {
      this.arrTransactions = res;
    }).catch(()=> {
      this.utils.showAlert('No ha sido posible cargar referidos');
    }).finally(()=> { this.storageService.setItem('is-loading',false); })
  }

  showTransactionDetail(transaction) {
    this.storageService.setItem('transaction-details',transaction);
    this.navController.navigateForward('/home/transactions/details');
  }
}

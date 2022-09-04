import { Component, OnInit } from '@angular/core';
import { StorageService } from 'src/app/shared/storageService.service';

@Component({
  selector: 'app-support',
  templateUrl: './support.page.html',
  styleUrls: ['./support.page.scss'],
})
export class SupportPage implements OnInit {
 dataSetting:any;
  constructor(
    private storageService: StorageService
  ) { 
    this.storageService.getItem('settings').subscribe((res:any)=> {
      this.dataSetting = res;
    });
  }

  ngOnInit() {
  }

}

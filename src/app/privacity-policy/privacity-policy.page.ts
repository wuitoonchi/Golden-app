import { Component, OnInit } from '@angular/core';
import { StorageService } from '../shared/storageService.service';

@Component({
  selector: 'app-privacity-policy',
  templateUrl: './privacity-policy.page.html',
  styleUrls: ['./privacity-policy.page.scss'],
})
export class PrivacityPolicyPage implements OnInit {
 dataSettings;
  constructor(
    private storageService: StorageService
  ) { }

  ngOnInit() {
    this.storageService.getItem('settings').subscribe((res) => {
      this.dataSettings = res;
    })
  }

}

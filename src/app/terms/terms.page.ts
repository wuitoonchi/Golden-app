import { Component, OnInit } from '@angular/core';
import { StorageService } from '../shared/storageService.service';

@Component({
  selector: 'app-terms',
  templateUrl: './terms.page.html',
  styleUrls: ['./terms.page.scss'],
})
export class TermsPage implements OnInit {

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

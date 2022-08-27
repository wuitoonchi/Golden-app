import { Component, OnInit } from '@angular/core';
import { StorageService } from 'src/app/shared/storageService.service';

@Component({
  selector: 'app-loading-preview',
  templateUrl: './loading-preview.component.html',
  styleUrls: ['./loading-preview.component.scss'],
})
export class LoadingPreviewComponent implements OnInit {

  isLoading:boolean = false;
  constructor(
    private storageService: StorageService
  ) {
    this.storageService.getItem('is-loading').subscribe((isLoading:boolean)=> {
      this.isLoading = isLoading;
    });
   }

  ngOnInit() {}

}

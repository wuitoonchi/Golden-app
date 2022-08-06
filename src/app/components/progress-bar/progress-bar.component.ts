import { Component, OnInit } from '@angular/core';
import { StorageService } from 'src/app/shared/storageService.service';
@Component({
  selector: 'app-progress-bar',
  templateUrl: './progress-bar.component.html',
  styleUrls: ['./progress-bar.component.scss'],
})
export class ProgressBarComponent implements OnInit {
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

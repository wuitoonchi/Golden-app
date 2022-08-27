import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-social-auth',
  templateUrl: './social-auth.component.html',
  styleUrls: ['./social-auth.component.scss'],
})
export class SocialAuthComponent implements OnInit {

  constructor(
    private navController: NavController
  ) { }

  ngOnInit() {}

  signInAp() {
    this.navController.navigateRoot('/home');
  }
  signInFb() {
    this.navController.navigateRoot('/home');
  }
  signInTw() {
    this.navController.navigateRoot('/home');
  }
  signInGo() {
    this.navController.navigateRoot('/home');
  }
}

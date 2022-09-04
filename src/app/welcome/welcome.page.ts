import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.page.html',
  styleUrls: ['./welcome.page.scss'],
})
export class WelcomePage implements OnInit {

  constructor(
    private navController: NavController
  ) {}

  ngOnInit() {}

  signIn() {
    this.navController.navigateForward('/login');
  }
  
  signUp() {
    this.navController.navigateForward('/register');
  }
  
  recoveryAccess() {
    this.navController.navigateForward('/recovery');
  }
}

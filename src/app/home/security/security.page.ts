import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-security',
  templateUrl: './security.page.html',
  styleUrls: ['./security.page.scss'],
})
export class SecurityPage implements OnInit {

  constructor(
    private navController: NavController
  ) { }

  ngOnInit() {
  }


  settingsPassword() {
    this.navController.navigateForward('/home/security/settings-password');
  }

  settings2FA() {
     this.navController.navigateForward('/home/security/settings-setup2fa');
  }
}

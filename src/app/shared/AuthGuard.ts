import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from "@angular/router";
import { AuthService } from "./auth.service";

@Injectable({
    providedIn: 'root'
  })
  export class AuthGuard implements CanActivate {
    constructor(private authService: AuthService, private router: Router) {}
  
    canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
      if (!this.authService.isLoggedIn) {
        // redirect to some view explaining what happened
        this.router.navigateByUrl('/welcome');
        return false;
      } else {
        return true;
      }
    }
  }
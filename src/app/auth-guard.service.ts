import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate{

  constructor(private router: Router) { }

  /**
   * Function that checks if the user is logged in. Checks if there is a value in the id_token field in the localstorage. Not very secure but
   * not intended to be. The api is securing the data, it just helps redirect straight to the /my-lists path if you're logged in.
   * 
   * @param route - The route that we currently are at
   * @param state - The state
   * 
   * @return If the user is loggedIn.
   */
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (localStorage.getItem('username')) {
        return true;
    }

    // not logged in so redirect to login page with the return url
    this.router.navigate(['/login']);
    return false;
}
}

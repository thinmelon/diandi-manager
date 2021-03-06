import {Injectable} from '@angular/core';
import {
    ActivatedRouteSnapshot,
    CanActivate,
    CanActivateChild,
    CanLoad,
    Route, Router,
    RouterStateSnapshot
} from '@angular/router';
import {BackboneService} from './diandi.backbone';

@Injectable()
export class LoginGuard implements CanActivate, CanActivateChild, CanLoad {
    constructor(private router: Router,
                private backbone: BackboneService) {
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        const url: string = state.url;
        return this.checkLogin(url);
    }

    canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        return this.canActivate(route, state);
    }

    canLoad(route: Route): boolean {
        const url = `/${route.path}`;
        return this.checkLogin(url);
    }

    // canDeactivate(component: AppointmentCheckComponent,
    //               route: ActivatedRouteSnapshot,
    //               state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    //     // Get the current URL
    //     console.log(state.url);
    //     return component.canDeactivate();
    // }

    checkLogin(url: string): boolean {
        console.log('checkLogin  isLoggedIn  ===>  ' + this.backbone.isLoggedIn);
        if ('YES' === this.backbone.isLoggedIn) {
            return true;
        }

        // Store the attempted URL for redirecting
        this.backbone.redirectUrl = url;
        console.log('checkLogin  redirectUrl  ===>  ' + this.backbone.redirectUrl);

        // // Create a dummy session id
        // const sessionId = 123456789;
        //
        // // Set our navigation extras object
        // // that contains our global query params and fragment
        // const navigationExtras: NavigationExtras = {
        //     queryParams: {'session_id': sessionId},
        //     fragment: 'anchor'
        // };

        // Navigate to the login page with extras
        // this.router.navigate(['/login'], navigationExtras);
        this.router.navigate(['/login']);
        return false;
    }
}

@Injectable()
export class AuthorizerGuard implements CanActivate, CanActivateChild {
    constructor(private router: Router,
                private backbone: BackboneService) {
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        const url: string = state.url;
        return this.checkAuthorization(url);
    }

    canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        return this.canActivate(route, state);
    }

    checkAuthorization(url: string): boolean {
        console.log('checkAuthorization authorizerAppId ==> ' + this.backbone.authorizerAppId);
        if (this.backbone.authorizerAppId && this.backbone.authorizerAppId !== '') {
            return true;
        }

        // Store the attempted URL for redirecting
        this.backbone.redirectUrl = url;
        console.log('checkAuthorization  redirectUrl  ===>  ' + this.backbone.redirectUrl);

        this.router.navigate(['/entry/wechat/official/bind']);
        return false;
    }
}

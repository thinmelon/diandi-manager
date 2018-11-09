import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {BackboneService} from '../diandi.backbone';
import {Observable} from 'rxjs/index';

@Injectable()
export class ListProductResolver implements Resolve<any> {
    constructor(private backbone: BackboneService) {
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
        return this.backbone.fetchPartialProducts(this.backbone.session, this.backbone.businessId, 0, 10);
    }
}

@Injectable()
export class DetailsProductResolver implements Resolve<any> {
    constructor(private backbone: BackboneService) {
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
        if (route.params.hasOwnProperty('pid') && route.params.pid) {
            return this.backbone.fetchProductDetails(this.backbone.session, route.params.pid);
        }
    }
}

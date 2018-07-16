import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {BackboneService} from '../diandi.backbone';
import {Observable} from 'rxjs/index';

@Injectable()
export class ListCardResolver implements Resolve<any> {
    constructor(private backbone: BackboneService) {
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
        return this.backbone.fetchCardList();
    }
}

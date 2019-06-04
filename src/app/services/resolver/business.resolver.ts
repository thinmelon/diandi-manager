import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {BackboneService} from '../diandi.backbone';
import {Observable} from 'rxjs/index';

@Injectable()
export class ListBusinessResolver implements Resolve<any> {
    constructor(private backbone: BackboneService) {
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
        return this.backbone.getRestaurants();
        // return this.backbone.fetchBusinessList(
        //     this.backbone.publicEncrypt(''),
        //     this.backbone.authorizerMiniProgramAppId ? this.backbone.authorizerMiniProgramAppId : ''
        // );
    }
}

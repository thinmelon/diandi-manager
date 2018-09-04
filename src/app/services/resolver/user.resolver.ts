import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {BackboneService} from '../diandi.backbone';
import {Observable} from 'rxjs/index';

@Injectable()
export class ListUserResolver implements Resolve<any> {
    constructor(private backbone: BackboneService) {
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
        // return this.backbone.fetchProducts(this.backbone.session, moment().format(), 100);
        return this.backbone.fetchUserList(this.backbone.session, this.backbone.authorizerMiniProgramAppId);
    }
}

@Injectable()
export class WechatUserInfoResolver implements Resolve<any> {
    constructor(private backbone: BackboneService) {
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
        return this.backbone.fetchWechatUserInfo(this.backbone.session, this.backbone.diandiWebsiteAppId);
    }
}

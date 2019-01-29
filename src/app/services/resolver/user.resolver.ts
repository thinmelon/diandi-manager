import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {BackboneService} from '../diandi.backbone';
import {Observable} from 'rxjs/index';

@Injectable()
export class ListUserResolver implements Resolve<any> {
    constructor(private backbone: BackboneService) {
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
        return this.backbone.fetchUserList(this.backbone.publicEncrypt(''), this.backbone.authorizerMiniProgramAppId);
    }
}

@Injectable()
export class WechatUserInfoResolver implements Resolve<any> {
    constructor(private backbone: BackboneService) {
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
        // const params = Utils.GetParametersFromURL(state.url);
        // if (params.query.hasOwnProperty('channel')) {
        //     this.backbone.channel = params.query['channel'];    //  如果URL参数中带有channel，则设置到backbone中，针对回调链接的情况
        // }
        return this.backbone.fetchWechatUserInfo(this.backbone.publicEncrypt(''), this.backbone.diandiWebsiteAppId);
    }
}

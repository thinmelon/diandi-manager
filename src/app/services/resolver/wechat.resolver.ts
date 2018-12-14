import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {BackboneService} from '../diandi.backbone';
import {Observable} from 'rxjs/index';

@Injectable()
export class WechatOfficialResolver implements Resolve<any> {
    constructor(private backbone: BackboneService) {
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
        return this.backbone.fetchAuthorizerInfo(this.backbone.publicEncrypt(''), route.paramMap.get('type'));
    }
}

@Injectable()
export class MiniprogramListResolver implements Resolve<any> {
    constructor(private backbone: BackboneService) {
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
        return this.backbone.fetchFastRegisterMiniprogramList(this.backbone.publicEncrypt(''), route.paramMap.get('type'));
    }
}

@Injectable()
export class MiniprogramInfoResolver implements Resolve<any> {
    constructor(private backbone: BackboneService) {
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
        return this.backbone.fetchMiniprogramInfo(this.backbone.publicEncrypt(''), route.paramMap.get('appid'));
    }
}

@Injectable()
export class TemplateListResolver implements Resolve<any> {
    constructor(private backbone: BackboneService) {
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
        return this.backbone.fetchTemplateList(this.backbone.publicEncrypt(''));
    }
}
import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {BackboneService} from '../diandi.backbone';
import {ContainerService} from '../container.service';
import {Observable} from 'rxjs/index';
import * as moment from 'moment';

@Injectable()
export class ListProductResolver implements Resolve<any> {
    constructor(private backbone: BackboneService,
                private container: ContainerService) {
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
        return this.backbone.fetchProducts(this.container.get().session, moment().format(), 100);
    }
}

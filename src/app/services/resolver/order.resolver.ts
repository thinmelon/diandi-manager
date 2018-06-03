import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs/index';
import * as moment from 'moment';
import {BackboneService} from '../diandi.backbone';
import {ContainerService} from '../container.service';

@Injectable()
export class ListOrderResolver implements Resolve<any> {
    constructor(private backbone: BackboneService,
                private container: ContainerService) {
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
        return this.backbone.fetchOrders(this.container.get().session, moment().format(), 10);
    }
}

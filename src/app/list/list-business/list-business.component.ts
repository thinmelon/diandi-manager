import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {BusinessList} from '../../services/diandi.structure';
import {BackboneService} from '../../services/diandi.backbone';

@Component({
    selector: 'app-list-business',
    templateUrl: './list-business.component.html',
    styleUrls: ['./list-business.component.less']
})
export class ListBusinessComponent implements OnInit {
    shops: BusinessList[];

    constructor(private route: ActivatedRoute,
                private router: Router,
                private backbone: BackboneService) {
    }

    ngOnInit() {
        this.route.data
            .subscribe((data: { listBusinessResolver: any }) => {
                console.log(data);
                if (data.listBusinessResolver.code === 0) {
                    let index = 0;
                    this.shops = data.listBusinessResolver.msg.map(item => {
                        return new BusinessList(++index,
                            item.bid,
                            item.name,
                            item.longitude,
                            item.latitude,
                            item.shopHours,
                            item.phone,
                            item.status
                        );
                    });
                }
            });
    }

    /**
     * 新增/编辑
     * @param bid
     */
    editBusiness(bid) {
        this.backbone.businessId = bid;
        this.router.navigate(['/edit/business']);
    }

    /**
     * 调整商户状态
     * @param status
     * @param bid
     */
    changeBusinessStatus(status, bid) {
        this.backbone
            .changeBusinessStatus(this.backbone.session, status, bid)
            .subscribe(result => {
                console.log(result);
            });
    }

    /**
     * 移除商户
     * @param bid
     */
    removeBusiness(bid) {
        this.backbone
            .removeBusiness(this.backbone.session, bid)
            .subscribe(result => {
                console.log(result);
            });
    }

}

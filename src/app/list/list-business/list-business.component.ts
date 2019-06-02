import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Restaurants} from '../../services/diandi.structure';
import {BackboneService} from '../../services/diandi.backbone';
import {ConfirmModalComponent} from '../../modal/confirm-modal/confirm-modal.component';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'app-list-business',
    templateUrl: './list-business.component.html',
    styleUrls: ['./list-business.component.less']
})
export class ListBusinessComponent implements OnInit {
    restaurants: Array<Restaurants> = [];
    errorMessage = '';

    constructor(private route: ActivatedRoute,
                private router: Router,
                private modalService: NgbModal,
                private backbone: BackboneService) {
    }

    ngOnInit() {
        this.backbone
            .getRestaurants()
            .subscribe(res => {
                console.log(res);
                if (res.code === 0) {
                    let index = 0;
                    res.data.restaurants.map(item => {
                        this.restaurants.push({
                            index: ++index,
                            id: item._id,
                            name: item.name,
                            address: item.address,
                            longitude: item.location ? item.location.lng : null,
                            latitude: item.location ? item.location.lat : null,
                            consumptionPerPerson: item.consumptionPerPerson,
                            open: item.open,
                            phone: item.phone,
                            source: item.source,
                            articles: item.articles,
                            tags: item.tags,
                            status: item.status
                        });
                    });
                }
            });
    }

    /**
     * 新增/编辑
     * @param bid
     */
    editBusiness(bid) {
        if (this.backbone.authorizerMiniProgramAppId && this.backbone.authorizerMiniProgramAppId !== '') {
            this.backbone.businessId = bid;
            this.router.navigate(['/edit/business']);
        } else {
            this.errorMessage = '请选择要设置的小程序';
        }
    }

    /**
     * 调整商户状态
     * @param status
     * @param bid
     */
    changeBusinessStatus(status, bid) {
        this.backbone
            .changeBusinessStatus(this.backbone.publicEncrypt(''), status, bid)
            .subscribe(result => {
                console.log(result);
            });
    }

    /**
     * 移除商户
     * @param bid
     */
    removeBusiness(bid) {
        const modalRef = this.modalService.open(ConfirmModalComponent);
        modalRef.componentInstance.title = '确认删除？';
        modalRef.componentInstance.content = '删除后不可恢复，请再次确认';
        modalRef.result.then(
            /**
             * close
             * @param result
             */
            (result) => {
                console.log(result);
                if (result === 'YES') {
                    this.backbone
                        .removeBusiness(this.backbone.publicEncrypt(''), bid)
                        .subscribe(res => {
                            console.log(res);
                            if (res.code === 0) {
                                // this.shops = this.shops.filter(shop => {
                                //     return shop.bid !== bid;
                                // });
                            }
                        });
                }
            },
            /**
             * dismiss
             * @param reason
             */
            (reason) => {
                console.log(reason);
            });


    }

}

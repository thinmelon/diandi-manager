import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Restaurants, Tag} from '../../services/diandi.structure';
import {BackboneService} from '../../services/diandi.backbone';
import {ConfirmModalComponent} from '../../modal/confirm-modal/confirm-modal.component';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {FormModalComponent} from '../../modal/form-modal/form-modal.component';

@Component({
    selector: 'app-list-business',
    templateUrl: './list-business.component.html',
    styleUrls: ['./list-business.component.less']
})
export class ListBusinessComponent implements OnInit {
    restaurants: Array<Restaurants> = [];
    tags: Array<Tag> = [];
    errorMessage = '';

    constructor(private route: ActivatedRoute,
                private router: Router,
                private modalService: NgbModal,
                private backbone: BackboneService) {
    }

    ngOnInit() {
        this.route.data
            .subscribe((data: { listBusinessResolver: any }) => {                           //  初始化餐馆基础元信息
                console.log(data);
                if (data.listBusinessResolver.code === 0) {
                    let index = 0;
                    data.listBusinessResolver.data.restaurants.map(item => {
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

        this.getTags();                                                                     //  获取标签列表
    }

    /**
     * 获取标签列表
     */
    getTags() {
        this.backbone.getTags()
            .subscribe(res => {
                console.log(res);
                if (res.code === 0) {
                    let index = 0;
                    res.data.tags.map(item => {
                        this.tags.push({
                            id: ++index,
                            name: item.name
                        });
                    });
                }
            });
    }

    addTag() {
        const modalRef = this.modalService.open(FormModalComponent);
        modalRef.componentInstance.title = '添加标签';
        modalRef.componentInstance.hint = '';
        modalRef.componentInstance.keyValues = [
            {
                index: 0,
                key: '标签名（必填项）',
                type: 'text',
                src: ''
            }
        ];
        modalRef.componentInstance.submitBtnText = '提交';
        modalRef.componentInstance.submitEvt.subscribe(response => {
            console.log(response);
            if (response.length > 0 && response[0].src) {
                this.backbone.addTag(response[0].src)
                    .subscribe(res => {
                        console.log(res);
                        if (res.code === 0) {
                            this.tags.push(response[0].src);
                        }
                    });
            }
        });
    }

    bindTag(id) {
        console.log(this.tags);
        const modalRef = this.modalService.open(FormModalComponent);
        modalRef.componentInstance.title = '绑定标签';
        modalRef.componentInstance.hint = '';
        modalRef.componentInstance.keyValues = [
            {
                index: 0,
                key: '标签名称',
                type: 'dropdown',
                value: '请选择标签',
                src: this.tags,
                categoryId: 0
            }
        ];
        modalRef.componentInstance.submitBtnText = '提交';
        modalRef.componentInstance.submitEvt.subscribe(response => {
            console.log(id, ': ', response[0].value);
            if (response.length > 0 && response[0].value) {
                this.backbone.bindTag(id, response[0].value)
                    .subscribe(res => {
                        console.log(res);
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

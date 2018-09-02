import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import * as moment from 'moment';
import {BusinessList, ProductList} from '../../services/diandi.structure';
import {BackboneService} from '../../services/diandi.backbone';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {ConfirmModalComponent} from '../../modal/confirm-modal/confirm-modal.component';

@Component({
    selector: 'app-list-product',
    templateUrl: './list-product.component.html',
    styleUrls: ['./list-product.component.less']
})
export class ListProductComponent implements OnInit {
    btnName = '--- 请选择商户 ---';
    businessId = '';
    shops: BusinessList[];
    products: ProductList[];

    constructor(private router: Router,
                private route: ActivatedRoute,
                private modalService: NgbModal,
                private backbone: BackboneService) {
    }

    ngOnInit() {
        this.route.data
            .subscribe((data: { listBusinessResolver: any }) => {
                console.log(data);
                if (data.listBusinessResolver.code === 0 && data.listBusinessResolver.msg.length > 0) {
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
                    this.btnName = this.shops[0].name;          //  设置下拉框文字
                    this.fetchProductList(this.shops[0].bid);   //  获取商品列表
                }
            });
    }

    /**
     * 点击下拉列表
     * @param shop
     */
    onShopSelected(shop) {
        this.fetchProductList(shop.bid);
    }

    /**
     * 获取商品列表
     * @param businessId
     */
    fetchProductList(businessId) {
        this.businessId = businessId;
        this.backbone
            .fetchPartialProducts(this.backbone.session, businessId, 0, 100)
            .subscribe(response => {
                console.log(response);
                if (response.code === 0) {
                    let index = 0;
                    this.products = response.msg.map(item => {
                        return new ProductList(++index,
                            item.pid,
                            decodeURIComponent(item.name),
                            item.description,
                            item.sales,
                            item.status,
                            moment(new Date(item.createTime).getTime()).format('YYYY-MM-DD HH:mm:ss'),
                            item.type);
                    });
                }
            });
    }

    /**
     * 修改商品状态
     * @param status
     * @param pid
     */
    changeProductStatus(status, pid) {
        this.backbone
            .changeProductStatus(status, pid)
            .subscribe(res => {
                console.log(res);
                if (res.code === 0) {
                }
            });
    }

    /**
     * 移除商品
     * @param pid
     */
    removeProduct(pid) {
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
                        .removeProduct(this.backbone.session, this.businessId, pid)
                        .subscribe(res => {
                            console.log(res);
                            if (res.code === 0) {
                                this.products = this.products.filter(product => {
                                    return product.pid !== pid;
                                });
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

    /**
     * 进入卡券管理
     * @param pid
     */
    manageProductCard(pid) {
        this.backbone.productId = pid;
        this.router.navigate(['/list/card', pid]);
    }
}

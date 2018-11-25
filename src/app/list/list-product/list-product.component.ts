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
                if (data.listBusinessResolver.code === 0 && data.listBusinessResolver.data.length > 0) {
                    let index = 0;
                    this.shops = data.listBusinessResolver.data.map(item => {
                        if (this.backbone.businessId && this.backbone.businessId === item._id) {
                            this.btnName = item.name;
                        }
                        return new BusinessList(++index,
                            item._id,
                            item.name,
                            item.longitude,
                            item.latitude,
                            item.shopHours,
                            item.phone,
                            item.status
                        );
                    });
                    if (!this.backbone.businessId) {
                        this.btnName = this.shops[0].name;                          //  设置下拉框文字
                        this.backbone.businessId = this.shops[0].bid;               //  设置当前店铺ID
                    }
                    this.fetchProductList(this.backbone.businessId);                //  获取商品列表
                }
            });
    }

    /**
     * 点击下拉列表
     * @param shop
     */
    onShopSelected(shop) {
        this.btnName = shop.name;                           //  设置下拉框文字
        this.backbone.businessId = shop.bid;                //  设置当前店铺ID
        this.fetchProductList(shop.bid);
    }

    /**
     * 获取商品列表
     * @param businessId
     */
    fetchProductList(businessId) {
        this.backbone
            .fetchPartialProducts(this.backbone.publicEncrypt(''), businessId, 0, 10)
            .subscribe(response => {
                console.log(response);
                if (response.code === 0) {
                    let index = 0;
                    this.products = response.data.map(item => {
                        return new ProductList(++index,
                            item._id,
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
            .changeProductStatus(this.backbone.publicEncrypt(''), status, pid)
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
                console.log(pid)
                if (result === 'YES') {
                    this.backbone
                        .removeProduct(this.backbone.publicEncrypt(''), this.backbone.businessId, pid)
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

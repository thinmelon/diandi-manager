import {Component, OnInit} from '@angular/core';
import {NgbModal, NgbPopover, NgbPopoverConfig} from '@ng-bootstrap/ng-bootstrap';
import {Attribute, BusinessList, Consignee, Order, OrderStatusEnum, Refund, SKU} from '../../services/diandi.structure';
import {ActivatedRoute, Router} from '@angular/router';
import {BackboneService} from '../../services/diandi.backbone';
import {RichTextModalComponent} from '../../modal/rich-text-modal/rich-text-modal.component';

@Component({
    selector: 'app-list-order',
    templateUrl: './list-order.component.html',
    styleUrls: ['./list-order.component.less'],
    providers: [NgbPopoverConfig]
})
export class ListOrderComponent implements OnInit {
    btnName = '--- 请选择商户 ---';
    businessId = '';                    //  店铺ID
    shown = false;                     //  是否显示
    target: Refund;                     //  退款
    lastPopover: NgbPopover;            //  弹出窗口
    orders: Order[];                    //  订单列表
    shops: BusinessList[];              //  店铺列表
    errorMessage = '';                  //  错误信息

    constructor(private route: ActivatedRoute,
                private popoverConfig: NgbPopoverConfig,
                private backbone: BackboneService,
                private modalService: NgbModal) {
        this.orders = [];
        popoverConfig.placement = 'bottom';         //  显示在下方
        popoverConfig.triggers = 'click';           //  触发类型
    }

    ngOnInit() {
        this.route.data
            .subscribe((data: { listBusinessResolver: any }) => {
                console.log(data);
                if (data.listBusinessResolver.code === 0 && data.listBusinessResolver.data.length > 0) {
                    let index = 0;
                    this.shops = data.listBusinessResolver.data.map(item => {
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
                    this.btnName = this.shops[0].name;          //  设置下拉框文字
                    this.fetchOrderList(this.shops[0].bid);   //  获取商品列表
                }
            });
    }

    /**
     * 点击下拉列表
     * @param shop
     */
    onShopSelected(shop) {
        this.fetchOrderList(shop.bid);
    }

    /**
     * 获取授权方下某店铺的订单列表
     * @param businessId
     */
    fetchOrderList(businessId) {
        this.businessId = businessId;
        // TODO: 分页功能的实现
        this.backbone
            .fetchOrders(this.backbone.publicEncrypt(''), businessId, 0, 10)            //  获取订单列表，取前十条
            .subscribe(response => {
                if (response.code === 0) {
                    let index = 0;
                    this.orders = response.data.order.map(item => {                     //  遍历列表 转换为前端可识别的SKU
                        let skuList = [];
                        for (let key in item.sku) {
                            for (let i = 0, length = response.data.product.length; i < length; i++) {
                                let isHit = false,
                                    attributes = [],
                                    unit = 0;

                                response.data.product[i].sku.map(skuItem => {           //  SKU属性及属性值
                                    if (skuItem._id === item.sku[key].stock_no) {
                                        isHit = true;
                                        for (let param in skuItem) {
                                            if (param !== '_id' && param !== 'unit' && param !== 'amount') {
                                                attributes.push(new Attribute('', param, skuItem[param]));
                                            }
                                        }
                                        unit = skuItem.unit;
                                    }
                                });
                                if (isHit) {
                                    skuList.push(new SKU(
                                        item.sku[key].stock_no,
                                        decodeURIComponent(response.data.product[i].name),
                                        unit,
                                        item.sku[key].amount,
                                        attributes,
                                        response.data.product[i].thumbnails[0].url,
                                        response.data.product[i].type
                                    ));
                                }
                            }
                            /** end of for */
                        }
                        /** end of for */

                        return new Order(
                            ++index,
                            item._id,
                            skuList,
                            new Consignee(item.consignee.name, item.consignee.mobile, item.consignee.address, item.consignee.postcode),
                            item.createTime,
                            item.completeTime,
                            item.totalFee,
                            OrderStatusEnum[item.status],
                            item.attach,
                            item.remark);
                    });
                }
            });
    }

    /**
     *      订单详情 Popover 的显示event
     * @param popover
     */
    orderDetailPopoverShown(popover) {
        this.afterShown(popover);
    }

    /**
     *      收件人信息 Popover 的显示event
     * @param popover
     */
    consigneePopoverShown(popover) {
        this.afterShown(popover);
    }

    /**
     *      订单备注 Popover 的显示event
     * @param popover
     */
    orderRemarkPopoverShown(popover) {
        this.afterShown(popover);
    }

    /**
     *      显示 popover 时先把上一个 popover 关闭掉
     * @param popover
     */
    afterShown(popover) {
        if (typeof this.lastPopover !== 'undefined' && this.lastPopover !== popover) {
            this.lastPopover.close();
        }
        this.lastPopover = popover;
        this.shown = false;
    }

    /**
     *      显示对话框
     * @param order
     */
    openModal(order) {
        this.backbone.fetchRefundInfo(this.backbone.publicEncrypt(''), order.out_trade_no)
            .subscribe(res => {
                console.log(res);
                if (res.code === 0) {
                    this.target = new Refund(order.out_trade_no, res.data.refund.out_refund_no, order.totalFee, res.data.refund.refundFee);
                    const modalRef = this.modalService.open(RichTextModalComponent);
                    modalRef.componentInstance.title = '退款进度';
                    modalRef.componentInstance.orderTime = order.createTime;
                    modalRef.componentInstance.payTime = order.payTime;
                    modalRef.componentInstance.submitRefundTime = res.data.refund.applyTime;
                    modalRef.componentInstance.refundReason = res.data.refund.reason;
                    modalRef.componentInstance.refundTime = res.data.refund.refundTime;
                    modalRef.componentInstance.refundSuccessTime = res.data.refund.completeTime;
                    modalRef.componentInstance.status = res.data.refund.status;
                    modalRef.result.then(
                        /**
                         * close
                         * @param result
                         */
                        (result) => {
                            switch (result) {
                                case 'Close':
                                    break;
                                case 'Refund':
                                    this.refund();
                                    break;
                                default:
                                    break;
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
            });

    }

    /**
     *  发起退款
     */
    refund() {
        this.backbone.refund(
            this.backbone.publicEncrypt(''),                //  access token
            this.backbone.authorizerMiniProgramAppId,
            this.target)
            .subscribe((res) => {
                console.log(res);
                if (res.hasOwnProperty('code') && res.code === 0) {
                    this.errorMessage = '发起退款成功';
                } else {
                    this.errorMessage = res.err_code_des ? res.err_code_des : '发起退款失败';
                }
            });
    }
}

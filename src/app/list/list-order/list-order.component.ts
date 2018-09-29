import {Component, OnInit} from '@angular/core';
import {NgbModal, NgbPopover, NgbPopoverConfig} from '@ng-bootstrap/ng-bootstrap';
import {BusinessList, Consignee, Order, OrderStatusEnum, Refund, SKU, User} from '../../services/diandi.structure';
import {ActivatedRoute, Router} from '@angular/router';
import * as moment from 'moment';
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
    shown = false;                      //  是否显示
    userShown: User;                    //  下单用户
    target: Refund;                     //  退款
    lastPopover: NgbPopover;            //  弹出窗口
    skuListShown: SKU[];                //  SKU
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
        this.backbone
            .fetchOrders(this.backbone.session, businessId, 0, 10)
            .subscribe(response => {
                console.log(response);
                if (response.code === 0) {
                    let index = 0;
                    this.orders = response.msg.map(item => {
                        return new Order(
                            ++index,
                            item.out_trade_no,
                            item.consignee_no,
                            item.user_id,
                            moment(item.createTime).format('YYYY-MM-DD HH:mm:ss'),
                            moment(item.payTime).format('YYYY-MM-DD HH:mm:ss'),
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
     * @param event
     */
    orderDetailPopoverShown(popover, event) {
        this.afterShown(popover);
        this.skuListShown = [];

        this.backbone.fetchAOrder(this.backbone.session, event)
            .subscribe(res => {
                console.log(res);
                for (const key in res.msg.order) {
                    const attributes = [],
                        /** SKU相应的属性值ID 将字符串分隔为数组 */
                        tmpArray = res.msg.order[key].attributes.split(',');
                    /** 转换为属性值名称 */
                    for (let i = 0; i < tmpArray.length; i++) {
                        for (let j = 0; j < res.msg.sku.length; j++) {
                            if (parseInt(tmpArray[i]) === res.msg.sku[j].vid) {
                                attributes.push(`${ res.msg.sku[j].name } : ${ res.msg.sku[j].value}`);
                                break;
                            }
                        }
                        /** end of for */
                    }
                    /** end of for */

                    this.skuListShown.push(
                        {
                            stock_no: res.msg.order[key].stock_no,
                            name: decodeURIComponent(res.msg.order[key].name),
                            unit: res.msg.order[key].unit,
                            amount: res.msg.order[key].amount,
                            attributes: attributes
                        }
                    );
                }
                /** end of for */

                this.shown = true;
            });
    }

    /**
     *      收件人信息 Popover 的显示event
     * @param popover
     * @param user_id
     * @param consignee_no
     */
    consigneePopoverShown(popover, user_id, consignee_no) {
        this.afterShown(popover);

        this.backbone.fetchUserInfo(this.backbone.session, user_id, consignee_no)
            .subscribe(res => {
                console.log(res);
                if (res.code === 0) {
                    const consignee = new Consignee(
                        res.msg.consignee[0] ? res.msg.consignee[0].name : '',
                        res.msg.consignee[0] ? res.msg.consignee[0].mobile : '',
                        res.msg.consignee[0] ? res.msg.consignee[0].address : '',
                        res.msg.consignee[0] ? res.msg.consignee[0].postcode : ''
                    );
                    this.userShown = new User(
                        res.msg.user[0] ? res.msg.user[0].name : '',
                        res.msg.user[0] ? res.msg.user[0].sex : 0,
                        res.msg.user[0] ? res.msg.user[0].headimgurl : '',
                        consignee
                    );
                }
                this.shown = true;
            });
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
        this.backbone.fetchRefundInfo(this.backbone.session, order.out_trade_no)
            .subscribe(res => {
                console.log(res);
                if (res.code === 0 && res.msg.length > 0) {
                    this.target = new Refund(res.msg[0].out_trade_no, res.msg[0].out_refund_no, res.msg[0].totalFee, res.msg[0].refundFee);
                    const modalRef = this.modalService.open(RichTextModalComponent);
                    modalRef.componentInstance.title = '退款进度';
                    modalRef.componentInstance.orderTime = order.createTime;
                    modalRef.componentInstance.payTime = order.payTime;
                    modalRef.componentInstance.submitRefundTime = moment(res.msg[0].createTime).format('YYYY-MM-DD HH:mm:ss');
                    modalRef.componentInstance.refundReason = res.msg[0].reason;
                    modalRef.componentInstance.refundTime = moment(res.msg[0].startTime).format('YYYY-MM-DD HH:mm:ss');
                    modalRef.componentInstance.refundSuccessTime = moment(res.msg[0].complete).format('YYYY-MM-DD HH:mm:ss');
                    modalRef.componentInstance.status = res.msg[0].status;
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
            this.backbone.session,
            this.backbone.authorizerMiniProgramAppId,
            this.target)
            .subscribe((res) => {
                console.log(res);
                if (res.return_code === 'SUCCESS' && res.result_code === 'SUCCESS') {
                    this.errorMessage = '发起退款成功';
                } else {
                    this.errorMessage = res.err_code_des ? res.err_code_des : '发起退款失败';
                }
            });
    }
}

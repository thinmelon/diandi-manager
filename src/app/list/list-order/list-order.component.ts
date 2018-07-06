import {Component, OnInit} from '@angular/core';
import {NgbModal, NgbPopover, NgbPopoverConfig} from '@ng-bootstrap/ng-bootstrap';
import {Consignee, Order, OrderStatusEnum, Refund, SKU, User} from '../../services/diandi.structure';
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
    shown = false;
    skuListShown: SKU[];
    userShown: User;
    orders: Order[];
    target: Refund;
    lastPopover: NgbPopover;

    constructor(private router: Router,
                private route: ActivatedRoute,
                private popoverConfig: NgbPopoverConfig,
                private backbone: BackboneService,
                private modalService: NgbModal) {
        this.orders = [];
        popoverConfig.placement = 'bottom';         //  显示在下方
        popoverConfig.triggers = 'click';           //  触发类型
    }

    ngOnInit() {
        console.log(this.backbone.session);
        this.route.data
            .subscribe((data: { listOrderResolver: any }) => {
                console.log(data.listOrderResolver);
                if (data.listOrderResolver.code === 0) {
                    let index = 0;
                    this.orders = data.listOrderResolver.msg.map(item => {
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
                } else {
                    sessionStorage.clear();
                    this.router.navigate(['/login']);
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

    refund() {
        this.backbone.refund(this.backbone.session, this.target)
            .subscribe((res) => {
                console.log(res);
            });
    }
}

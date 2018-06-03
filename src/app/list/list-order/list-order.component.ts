import {Component, OnInit} from '@angular/core';
import {NgbModal, NgbPopover, NgbPopoverConfig} from '@ng-bootstrap/ng-bootstrap';
import {Consignee, Order, OrderStatusEnum, SKU, User} from '../../services/diandi.structure';
import {ActivatedRoute} from '@angular/router';
import * as moment from 'moment';
import {BackboneService} from '../../services/diandi.backbone';
import {ContainerService} from '../../services/container.service';
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
    lastPopover: NgbPopover;

    constructor(private route: ActivatedRoute,
                private popoverConfig: NgbPopoverConfig,
                private backbone: BackboneService,
                private container: ContainerService,
                private modalService: NgbModal) {
        this.orders = [];
        popoverConfig.placement = 'bottom';         //  显示在下方
        popoverConfig.triggers = 'click';           //  触发类型
    }

    ngOnInit() {
        console.log(this.container.get().session);
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

        this.backbone.fetchAOrder(this.container.get().session, event)
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
                            name: res.msg.order[key].name,
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

        this.backbone.fetchUserInfo(this.container.get().session, user_id, consignee_no)
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

    // code: 0
    // msg: Array (1)
    // complete: "2018-05-22T14:50:55.000Z"
    // createTime: "2018-05-22T06:12:01.000Z"
    // out_refund_no: "13297414012018052214115944426193"
    // out_trade_no: "13297414012018052214015068882433"
    // reason: "库存不足"
    // refundFee: 1
    // refund_id: "50000606872018052204705879242"
    // remark: "2018-05-22 22:50:55 refund_status: SUCCESS 退款入账方：支付用户零钱"
    // startTime: "2018-05-22T06:12:38.000Z"
    // status: 2
    // totalFee: 1
    openModal(out_trade_no) {
        this.backbone.fetchRefundInfo(this.container.get().session, out_trade_no)
            .subscribe(res => {
                console.log(res);
                if (res.code === 0) {
                    const modalRef = this.modalService.open(RichTextModalComponent);
                    modalRef.componentInstance.title = '退款进度';
                }
            });

    }
}

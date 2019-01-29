import {Component, OnInit} from '@angular/core';
import {BillList, BillStatusEnum, BillTypeEnum} from '../../services/diandi.structure';
import {BackboneService} from '../../services/diandi.backbone';

@Component({
    selector: 'app-list-bill',
    templateUrl: './list-bill.component.html',
    styleUrls: ['./list-bill.component.less']
})
export class ListBillComponent implements OnInit {
    bills: BillList[];
    currentPage = 1;
    collectionSize = 0;
    pageSize = 10;

    constructor(private backbone: BackboneService) {
    }

    ngOnInit() {
        this.getBills();
    }

    /**
     *  获取账单流水
     */
    getBills() {
        const that = this;

        this.backbone
            .fetchBills(this.backbone.publicEncrypt(''), (this.currentPage - 1) * this.pageSize, this.pageSize)
            .subscribe(res => {
                console.log(res);
                if (res.code === 0 && res.data.bills.length > 0) {
                    let index = 0;
                    that.collectionSize = res.data.amount;
                    that.bills = res.data.bills.map(item => {
                        item.billType = BillTypeEnum[item.billType];
                        item.status = BillStatusEnum[item.status];
                        item.amount = (item.amount / 100).toFixed(2);
                        item.fee = (item.fee / 100).toFixed(2);
                        return new BillList(++index,
                            item._id,
                            item.out_trade_no,
                            item.payment_no,
                            item.billType,
                            item.status,
                            item.createTime,
                            item.amount,
                            item.fee);
                    });
                }
            });
    }

    /**
     * 切换页面
     * @param evt
     */
    onPageChanged(evt) {
        this.currentPage = evt;
        this.getBills();
    }

}

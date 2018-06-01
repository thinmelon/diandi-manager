import {Component, OnInit} from '@angular/core';
import {NgbPopoverConfig} from '@ng-bootstrap/ng-bootstrap';
import {Order, SKU} from '../../services/diandi.structure';

@Component({
    selector: 'app-list-order',
    templateUrl: './list-order.component.html',
    styleUrls: ['./list-order.component.less'],
    providers: [NgbPopoverConfig]
})
export class ListOrderComponent implements OnInit {
    orders: Order[];

    constructor(popoverConfig: NgbPopoverConfig) {
        this.orders = [];
        popoverConfig.placement = 'bottom';
        popoverConfig.triggers = 'hover';
    }

    ngOnInit() {
        const sku = new SKU('gUKvRPUIP8R5LmmFm67csknO35fz2Mhl', '儿童衣服', 0.01, 100, '颜色：蓝色；大小：S');

        let index = 0;
        while (index++ < 30) {
            let time = 0;
            const skuList = [];
            while (time++ < 10) {
                skuList.push(sku);
            }
            const one = new Order(index, '13297414012018051910422182936742', 1, '2018-05-19 10:42:23', '已支付', skuList);
            this.orders.push(one);
        }
        console.log(this.orders);
    }
}

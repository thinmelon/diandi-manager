import {Component, OnInit} from '@angular/core';
import {SelfOrder} from '../../services/diandi.structure';
import {BackboneService} from '../../services/diandi.backbone';
import {ActivatedRoute} from '@angular/router';

@Component({
    selector: 'app-prepay',
    templateUrl: './prepay.component.html',
    styleUrls: ['./prepay.component.less']
})
export class PrepayComponent implements OnInit {
    cart = [];                      //  购物车
    alipayReturnURL = '';           //  回调链接

    constructor(private route: ActivatedRoute,
                private backbone: BackboneService) {
        this.route.params.subscribe(params => {
            this.cart = JSON.parse(params.cart);                //  根据URL参数初始化模板信息
            this.alipayReturnURL = params.alipayReturnURL;      //  支付成功后的回调链接
            console.log(decodeURIComponent(this.alipayReturnURL));
        });
    }

    ngOnInit() {
    }

    submitOrder() {
        if (this.cart.length > 0) {
            //  初期只售卖模板，定制开发同样生产模板
            const order = new SelfOrder(
                this.backbone.alipayPagePayAppId,
                this.backbone.selfBusinessId,
                this.cart[0].templateId.toString(),         //  库存号（模板ID）
                parseFloat(this.cart[0].price),             //  商品价格
                '模板名称：' + this.cart[0].userDesc,       //  商品名称
                this.cart[0].templateId.toString(),         //  商品描述
                '',                                          //  用户留言
                this.alipayReturnURL
            );
            console.log(order);
            this.backbone.submitSelfOrder(
                this.backbone.publicEncrypt(''),
                order
            )
                .subscribe(res => {
                    if (res.code === 0) {
                        window.location.href = res.url;
                    }
                });
        }

    }
}

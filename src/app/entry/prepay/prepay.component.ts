import {Component, OnInit} from '@angular/core';
import {SelfOrder} from '../../services/diandi.structure';
import {BackboneService} from '../../services/diandi.backbone';

@Component({
    selector: 'app-prepay',
    templateUrl: './prepay.component.html',
    styleUrls: ['./prepay.component.less']
})
export class PrepayComponent implements OnInit {

    constructor(private backbone: BackboneService) {
    }

    ngOnInit() {
    }

    submitOrder() {
        const order = new SelfOrder(
            this.backbone.alipayPagePayAppId,
            this.backbone.selfBusinessId,
            1.00,
            'TEST',
            'THAT IS IT',
            'FINE',
            this.backbone.alipayReturnURL
        );
        this.backbone.submitSelfOrder(
            this.backbone.publicEncrypt(''),
            order
        )
            .subscribe(res => {
                console.log(res);
                if (res.code === 0) {
                    window.location.href = res.url;
                }
            });
    }
}

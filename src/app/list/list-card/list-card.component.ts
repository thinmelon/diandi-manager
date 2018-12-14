import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Card} from '../../services/diandi.structure';
import {BackboneService} from '../../services/diandi.backbone';

@Component({
    selector: 'app-list-card',
    templateUrl: './list-card.component.html',
    styleUrls: ['./list-card.component.less']
})
export class ListCardComponent implements OnInit {
    cards: Card[];
    associatedCard = '';
    chosenCard = new Card('');

    constructor(private route: ActivatedRoute,
                private router: Router,
                private backbone: BackboneService) {
    }

    ngOnInit() {
        console.log(this.backbone.productId);
        this.route.data
            .subscribe((data: { listCardResolver: any }) => {
                if (data.listCardResolver.errcode === 0) {
                    this.cards = data.listCardResolver.card_id_list.map(item => {
                        return new Card(
                            item
                        );
                    });
                }
            });

        this.backbone
            .queryProductCard(this.backbone.publicEncrypt(''), this.backbone.productId)
            .subscribe(result => {
                console.log(result);
                if (result.code === 0 && result.data.cardId !== '') {
                    this.queryCardDetail(this.associatedCard);
                }
            });
    }

    /**
     * 查询卡券详情
     * @param cardId
     */
    queryCardDetail(cardId) {
        console.log(cardId);
        this.associatedCard = cardId;
        this.backbone
            .queryCardDetail(this.backbone.publicEncrypt(''), cardId)
            .subscribe(result => {
                console.log(result);
                if (result.errcode === 0) {
                    switch (result.card.card_type) {
                        case 'CASH':
                            this.chosenCard = new Card(
                                result.card.cash.base_info.id,
                                result.card.card_type,
                                result.card.cash.base_info.brand_name,
                                result.card.cash.base_info.title,
                            );
                            break;
                        case 'DISCOUNT':
                            this.chosenCard = new Card(
                                result.card.discount.base_info.id,
                                result.card.card_type,
                                result.card.discount.base_info.brand_name,
                                result.card.discount.base_info.title,
                            );
                            break;
                        default:
                            break;
                    }
                }
            });
    }

    /**
     * 关联商品与卡券
     */
    associateProductCard() {
        console.log(this.associatedCard);
        this.backbone
            .associateProductCard(this.backbone.publicEncrypt(''), this.backbone.productId, this.associatedCard)
            .subscribe(result => {
                // 成功关联后跳转至商品列表页
                if (result.code === 0) {
                    this.router.navigate(['entry/wechat/miniprogram/product']);
                }
            });
    }
}

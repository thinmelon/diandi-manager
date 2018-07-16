import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Card} from '../../services/diandi.structure';
import {BackboneService} from '../../services/diandi.backbone';

@Component({
    selector: 'app-list-card',
    templateUrl: './list-card.component.html',
    styleUrls: ['./list-card.component.less']
})
export class ListCardComponent implements OnInit {
    cards: Card[];

    constructor(private route: ActivatedRoute,
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
    }

}

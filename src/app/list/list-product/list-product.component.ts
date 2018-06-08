import {Component, OnInit} from '@angular/core';
import {ContainerService} from '../../services/container.service';
import {ActivatedRoute} from '@angular/router';
import {Product} from '../../services/diandi.structure';

@Component({
    selector: 'app-list-product',
    templateUrl: './list-product.component.html',
    styleUrls: ['./list-product.component.less']
})
export class ListProductComponent implements OnInit {
    products: Product[];

    constructor(private route: ActivatedRoute,
                private container: ContainerService) {
    }

    ngOnInit() {
        console.log(this.container.get().session);
        this.route.data
            .subscribe((data: { listProductResolver: any }) => {
                console.log(data.listProductResolver);
                if (data.listProductResolver.code === 0) {
                    let index = 0;
                    this.products = data.listProductResolver.msg.map(item => {
                        return new Product(++index,
                            item.pid,
                            item.name,
                            item.description,
                            item.sales,
                            item.status,
                            item.createTime
                        );
                    });
                }
            });
    }
}

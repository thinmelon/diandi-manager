import {Component, OnInit} from '@angular/core';
import {ContainerService} from '../../services/container.service';
import {ActivatedRoute} from '@angular/router';
import {ProductList} from '../../services/diandi.structure';
import {BackboneService} from '../../services/diandi.backbone';

@Component({
    selector: 'app-list-product',
    templateUrl: './list-product.component.html',
    styleUrls: ['./list-product.component.less']
})
export class ListProductComponent implements OnInit {
    products: ProductList[];

    constructor(private route: ActivatedRoute,
                private container: ContainerService,
                private backbone: BackboneService) {
    }

    ngOnInit() {
        console.log(this.container.get().session);
        this.route.data
            .subscribe((data: { listProductResolver: any }) => {
                console.log(data.listProductResolver);
                if (data.listProductResolver.code === 0) {
                    let index = 0;
                    this.products = data.listProductResolver.msg.product.map(item => {
                        return new ProductList(++index,
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

    changeProductStatus(status, pid) {
        this.backbone
            .changeProductStatus(status, pid)
            .subscribe(res => {
                console.log(res);
                if (res.code === 0) {
                }
            });
    }

    removeProduct(pid) {
        this.backbone
            .removeProduct(pid)
            .subscribe(res => {
                console.log(res);
                if (res.code === 0) {
                    this.products = this.products.filter(product => {
                        return product.pid !== pid;
                    });
                }
            });
    }
}

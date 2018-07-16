import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, NavigationExtras, Router} from '@angular/router';
import {ProductList} from '../../services/diandi.structure';
import {BackboneService} from '../../services/diandi.backbone';

@Component({
    selector: 'app-list-product',
    templateUrl: './list-product.component.html',
    styleUrls: ['./list-product.component.less']
})
export class ListProductComponent implements OnInit {
    products: ProductList[];

    constructor(private router: Router,
                private route: ActivatedRoute,
                private backbone: BackboneService) {
    }

    ngOnInit() {
        this.route.data
            .subscribe((data: { listProductResolver: any }) => {
                console.log(data.listProductResolver);
                if (data.listProductResolver.code === 0) {
                    let index = 0;
                    this.products = data.listProductResolver.msg.product.map(item => {
                        // console.log(item.description);
                        return new ProductList(++index,
                            item.pid,
                            decodeURIComponent(item.name),
                            item.description,
                            item.sales,
                            item.status,
                            item.createTime,
                            item.type
                        );
                    });
                } else {
                    sessionStorage.clear();
                    this.router.navigate(['/login']);
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

    manageProductCard(pid) {
        this.backbone.productId = pid;
        this.router.navigate(['/list/card', pid]);
    }
}

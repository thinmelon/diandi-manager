import {Component, OnInit} from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {AttributeModalComponent} from '../../modal/attribute-modal/attribute-modal.component';
import {Product} from '../../services/diandi.structure';

@Component({
    selector: 'app-edit-product',
    templateUrl: './edit-product.component.html',
    styleUrls: ['./edit-product.component.less']
})
export class EditProductComponent implements OnInit {
    product: Product;
    attributes = [];
    head = [];
    sku = [];

    constructor(private modalService: NgbModal) {
        this.product = new Product('', '');
    }

    ngOnInit() {
    }

    addAttribute() {
        const modalRef = this.modalService.open(AttributeModalComponent);
        modalRef.componentInstance.title = '输入后按回车添加属性名';
        modalRef.componentInstance.attributesEvent.subscribe(response => {
            //  初始化属性名数组，以及属性键值数组
            this.head = [];
            this.attributes = [];
            //  对返回的数据进行加工处理
            response.map(item => {
                let isHit = false;
                for (let i = 0; i < this.attributes.length; i++) {
                    // 将相同属性名的值归为对象内
                    if (this.attributes[i].name === item.name) {
                        isHit = true;
                        this.attributes[i].values.push(item.value);
                        break;
                    }
                }
                if (!isHit) {
                    this.attributes.push({
                        name: item.name,
                        values: [item.value]
                    });
                }
            });
            //  赋值属性名数组
            for (let i = 0; i < this.attributes.length; i++) {
                this.head.push(this.attributes[i].name);
            }
            //  赋值SKU数组
            this.sku = this.generateSKU(this.attributes.length - 1);
        });
    }

    /**
     *  以递归的方式根据输入的属性生成SKU
     * @param n     数组内的索引值
     * @returns {Array}
     */
    generateSKU(n) {
        const tmp = [];
        //  当递归至最底层时，对属性数组的第一个元素进行加工后直接返回
        if (n <= 0) {
            for (let i = 0; i < this.attributes[0].values.length; i++) {
                const item = {unit: 0, amount: 0};
                item[this.attributes[0].name] = this.attributes[0].values[i];
                tmp.push(item);
            }
            return tmp;
        }
        //  获取下一层的结果
        const result = this.generateSKU(n - 1);
        //  整合下一层的结果与该层的数组元素
        for (let j = 0, length = result.length; j < length; j++) {
            for (let k = 0; k < this.attributes[n].values.length; k++) {
                result[j][this.attributes[n].name] = this.attributes[n].values[k];
                tmp.push(JSON.parse(JSON.stringify(result[j])));        //  实现对象的深拷贝
            }
        }
        return tmp;
    }

    onSubmit() {
        console.log('onSubmit');
    }
}

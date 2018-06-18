import {Router} from '@angular/router';
import {Component, OnDestroy} from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {FileUploader} from 'ng2-file-upload';
/** service */
import {AttributeSet, Product} from '../../services/diandi.structure';
import {UrlService} from '../../services/url.service';
import {BackboneService} from '../../services/diandi.backbone';
import {ContainerService} from '../../services/container.service';
/** component */
import {AttributeModalComponent} from '../../modal/attribute-modal/attribute-modal.component';
import {ProgressBarModalComponent} from '../../modal/progress-bar-modal/progress-bar-modal.component';

const URL = UrlService.UploadProductThumbnails();

@Component({
    selector: 'app-edit-product',
    templateUrl: './edit-product.component.html',
    styleUrls: ['./edit-product.component.less']
})
export class EditProductComponent implements OnDestroy {
    attributes = [];
    head = [];
    sku = [];
    thumbnails = [];
    details = [];
    name = '';
    introduce = '';
    public uploader: FileUploader = new FileUploader({
        url: URL,
        // allowedFileType: ['image/jpeg'],     //  允许上传的文件类型
        method: 'POST',                         //  上传文件的方式
        maxFileSize: 5 * 1024 * 1024,           //  最大可上传的文件大小
        queueLimit: 5,                          //  最大可上传的文件数量
        removeAfterUpload: true                //  是否在上传完成后从队列中移除
    });

    constructor(private router: Router,
                private modalService: NgbModal,
                private backbone: BackboneService,
                private container: ContainerService) {
    }

    ngOnDestroy() {
        this.uploader.destroy();
    }

    /**
     *  添加属性
     */
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
                        this.attributes[i].values.push(item.value.trim());
                        break;
                    }
                }
                if (!isHit) {
                    this.attributes.push(new AttributeSet(
                        item.name.trim(),
                        [item.value.trim()]
                    ));
                }
            });
            //  保存属性键值
            this.backbone.saveProductAttributes(this.attributes)
                .subscribe(res => {
                    this.attributes = res;
                    //  赋值属性名数组
                    for (let i = 0; i < this.attributes.length; i++) {
                        this.head.push(this.attributes[i].name);
                    }
                    //  赋值SKU数组
                    this.sku = this.generateSKU(this.attributes.length - 1);
                });
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
                const item = {unit: 0, amount: 0, vids: ''};
                item[this.attributes[0].name] = this.attributes[0].values[i].value;
                item['vids'] += this.attributes[0].values[i].vid + ',';
                tmp.push(item);
            }
            return tmp;
        }
        //  获取下一层的结果
        const result = this.generateSKU(n - 1);
        //  整合下一层的结果与该层的数组元素
        for (let j = 0, length = result.length; j < length; j++) {
            for (let k = 0; k < this.attributes[n].values.length; k++) {
                result[j][this.attributes[n].name] = this.attributes[n].values[k].value;
                result[j]['vids'] += this.attributes[n].values[k].vid + ',';
                tmp.push(JSON.parse(JSON.stringify(result[j])));        //  实现对象的深拷贝
            }
        }
        return tmp;
    }

    /**
     * 本地预览
     * 文件选择完成后的操作处理
     */
    selectedFileOnChanged(currentTarget: Array<any>) {
        // //  区别于new FileReader()中的this
        // const that = this;
        //  清空currentTarget数组
        while (currentTarget.length > 0) {
            currentTarget.pop();
        }
        // 遍历所选择的文件
        this.uploader.queue.forEach((fileItem, index) => {
            console.log(fileItem);
            fileItem.withCredentials = false;
            const reader = new FileReader();
            // 生成base64图片地址，实现本地预览
            reader.readAsDataURL(fileItem._file);
            reader.onload = function (e) {
                currentTarget.push({
                    index: index,
                    originalName: fileItem._file.name,
                    src: this.result,
                    imageId: ''
                });
            };
        });
    }

    /**
     *  上传文件
     */
    uploadAll(currentTarget: Array<any>) {
        const modalRef = this.modalService.open(ProgressBarModalComponent);
        modalRef.componentInstance.progress = 0;
        modalRef.result.then(
            /**
             * close
             * @param result
             */
            (result) => {
                console.log(result);
            },
            /**
             * dismiss
             * @param reason
             */
            (reason) => {
                console.log(reason);
            });
        /**
         * 整体的上传进度的回调（开始上传后调用非常频繁）
         * @param progress          - 整体的上传文件的进度
         */
        this.uploader.onProgressAll = function (progress) {
            console.log('=======>   onProgressAll');
            console.log(progress);
            modalRef.componentInstance.progress = progress;
        };
        /**
         *  完成上传一个文件的回调
         * @param item              - 上传成功的文件
         * @param response          - 上传成功后服务器的返回
         * @param status            - 状态码
         * @param headers            上传成功后服务器的返回的返回头
         */
        this.uploader.onCompleteItem = function (item, response, status, headers) {
            console.log('===========> onCompleteItem ');
            const res = JSON.parse(response);
            console.log(res);
            currentTarget = currentTarget.map(target => {
                if (target.originalName === item._file.name) {
                    target.imageId = res.imageId;
                }
                return target;
            });
        };
        /**
         *  完成上传所有文件的回调
         */
        this.uploader.onCompleteAll = function () {
            console.log('===========> Completed ');
            modalRef.close('Completed');
        };
        this.uploader.uploadAll();
    }

    /**
     *  提交保存商品
     */
    onSubmit() {
        const thumbnails = this.thumbnails.map(thumbnail => {
            return {
                imageId: thumbnail.imageId,     //  图片id
                type: 0,                        //  图片类型
                number: thumbnail.index         //  图片索引
            };
        });

        const details = this.details.map(detail => {
            return {
                imageId: detail.imageId,
                type: 1,
                number: detail.index
            };
        });

        const product = new Product(
            this.name,                  //  商品名称
            this.introduce,             //  商品描述
            this.attributes,            //  商品属性
            this.sku,                   //  库存信息
            thumbnails,                 //  微缩图
            details                     //  详情图
        );

        console.log(product);

        this.backbone
            .saveProduct(
                this.container.get().session,
                product
            )
            .subscribe(response => {
                console.log(response);
                if (response.code === 0) {
                    this.router.navigate(['/list/product']);
                }
            });
    }
}

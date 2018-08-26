import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {NgbActiveModal, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {FileUploader} from 'ng2-file-upload';
import {ProgressBarModalComponent} from '../progress-bar-modal/progress-bar-modal.component';

@Component({
    selector: 'app-form-modal',
    templateUrl: './form-modal.component.html',
    styleUrls: ['./form-modal.component.less']
})
export class FormModalComponent implements OnInit, OnDestroy {
    @Input() title: string;                                 //  模式框标题
    @Input() hint: string;                                  //  提示信息
    @Input() keyValues = [];                                //  控件列表
    @Input() uploadUrl = '';                                //  文件上传地址
    @Input() maxFileSize = 5 * 1024 * 1024;                 //  上传文件大小上限
    @Input() submitBtnText = '保存';                         //  提交按键名
    @Output() submitEvt = new EventEmitter<any>();      //  文件上传后回传事件
    @Output() dropdownSelectedEvt = new EventEmitter<any>();    //  文件上传后回传事件
    public fileUploader: FileUploader;

    constructor(public activeModal: NgbActiveModal,
                private modalService: NgbModal) {
    }

    ngOnInit() {
        this.fileUploader = new FileUploader({
            url: this.uploadUrl,                   //  上传至公众号的临时素材库
            // allowedFileType: ['image/jpeg'],    //  允许上传的文件类型
            method: 'POST',                        //  上传文件的方式
            maxFileSize: this.maxFileSize,         //  最大可上传的文件大小
            queueLimit: 1,                         //  最大可上传的文件数量
            removeAfterUpload: true                //  是否在上传完成后从队列中移除
        });
        console.log(this.fileUploader);
    }

    ngOnDestroy() {
        this.fileUploader.destroy();
    }

    /**
     * 提交
     */
    onSubmit() {
        this.activeModal.dismiss('Completed');
        this.submitEvt.emit(this.keyValues);
    }

    /**
     * 选择文件后
     * @param position
     */
    selectedFileOnChanged(position) {
        this.fileUploader.queue.forEach((fileItem, index) => {
            fileItem.withCredentials = false;
            this.upload(position);
        });
    }

    /**
     * 上传
     * @param index
     */
    upload(index) {
        const that = this;
        /**
         * 打开进度条
         */
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
        this.fileUploader.onProgressAll = function (progress) {
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
        this.fileUploader.onCompleteItem = function (item, response, status, headers) {
            console.log('===========> onCompleteItem ');
            console.log(response);
            const res = JSON.parse(response);
            if (res.hasOwnProperty('media_id')) {
                that.keyValues[index].mediaId = res.media_id;           //  对于素材类型为image的情况
            } else if (res.hasOwnProperty('thumb_media_id')) {
                that.keyValues[index].mediaId = res.thumb_media_id;     //  对于素材类型为thumb的情况
            }
            const reader = new FileReader();
            // 生成base64图片地址，实现本地预览
            reader.readAsDataURL(item._file);
            reader.onload = function (e) {
                that.keyValues[index].src = this.result;
            };
        };
        /**
         *  完成上传所有文件的回调
         */
        this.fileUploader.onCompleteAll = function () {
            console.log('===========> Completed ');
            modalRef.close('Completed');
        };
        /**
         *  开始上传
         */
        this.fileUploader.uploadAll();
    }

    /**
     * 选中下拉列表项
     * @param index
     * @param category
     */
    selectedItemOnChanged(index, category) {
        this.keyValues[index].categoryId = category.id;
        this.keyValues[index].value = category.name;
        this.dropdownSelectedEvt.emit(category);
    }
}


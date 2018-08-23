import {Component, EventEmitter, Input, OnDestroy, Output} from '@angular/core';
import {NgbActiveModal, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {FileUploader} from 'ng2-file-upload';
import {UrlService} from '../../services/url.service';
import {ProgressBarModalComponent} from '../progress-bar-modal/progress-bar-modal.component';
const IMAGE = UrlService.UploadProductThumbnails();

@Component({
    selector: 'app-form-modal',
    templateUrl: './form-modal.component.html',
    styleUrls: ['./form-modal.component.less']
})
export class FormModalComponent implements OnDestroy {
    @Input() title: string;
    @Input() hint: string;
    @Input() keyValues = [];
    @Input() submitBtnText = '保存';
    @Output() uploadFileEvt = new EventEmitter<any>();
    public fileUploader: FileUploader = new FileUploader({
        url: IMAGE,                                //  上传至公众号的临时素材库
        // allowedFileType: ['image/jpeg'],     //  允许上传的文件类型
        method: 'POST',                         //  上传文件的方式
        maxFileSize: 5 * 1024 * 1024,           //  最大可上传的文件大小
        queueLimit: 1,                          //  最大可上传的文件数量
        removeAfterUpload: true                //  是否在上传完成后从队列中移除
    });

    constructor(public activeModal: NgbActiveModal,
                private modalService: NgbModal) {
    }

    ngOnDestroy() {
        this.fileUploader.destroy();
    }

    onSubmit() {
        this.activeModal.dismiss('Completed');
        this.uploadFileEvt.emit(this.keyValues);
    }

    selectedFileOnChanged() {
        this.fileUploader.queue.forEach((fileItem, index) => {
            console.log(index);
            fileItem.withCredentials = false;
            console.log(fileItem);
        });
    }

    upload() {
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
        console.log(this.fileUploader);
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
            const res = JSON.parse(response);
            console.log(res);
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
}


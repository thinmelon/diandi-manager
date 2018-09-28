import {FileUploader} from 'ng2-file-upload';
import {Component, OnInit} from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {UrlService} from '../../services/url.service';
import {ActivatedRoute, Router} from '@angular/router';
import {BackboneService} from '../../services/diandi.backbone';
import {ENUM_SCENARIO, Precondition, Template} from '../../services/diandi.structure';
import {ProgressBarModalComponent} from '../../modal/progress-bar-modal/progress-bar-modal.component';

@Component({
    selector: 'app-scenario-intro',
    templateUrl: './scenario-intro.component.html',
    styleUrls: ['./scenario-intro.component.less']
})
export class ScenarioIntroComponent implements OnInit {
    errorMessage = '';
    linkName = '';
    link = '';
    precondition: Precondition;
    btnName = '--- 请选择商户 ---';
    businesses = [];
    appliedTemplate = null;                    //  应用模版
    appid = '';                                 //  当前appid
    mchid = '';
    apiKey = '';
    certUploader: FileUploader;

    constructor(private route: ActivatedRoute,
                private router: Router,
                private modalService: NgbModal,
                private backbone: BackboneService) {
        this.route.params.subscribe(params => {
            this.precondition = JSON.parse(params.precondition);
        });
        this.appid = this.backbone.authorizerMiniProgramAppId;
    }

    ngOnInit() {
        this.certUploader = new FileUploader({
            url: UrlService.UploadWxPayAPIClientCert(
                this.backbone.session,
                this.appid
            ),
            // allowedFileType: ['image/jpeg'],     //  允许上传的文件类型
            method: 'POST',                         //  上传文件的方式
            maxFileSize: 1024 * 1024,               //  最大可上传的文件大小
            queueLimit: 1,                          //  最大可上传的文件数量
            removeAfterUpload: true                //  是否在上传完成后从队列中移除
        });

        this.route.data
            .subscribe((data: { templateListResolver: any }) => {
                console.log(data.templateListResolver);
                if (data.templateListResolver.errcode === 0) {
                    data.templateListResolver.template_list.map(item => {
                        // 判断场景值，根据开发源的appid，确定相应的小程序模版
                        if (item.source_miniprogram_appid === 'wxdca47cfe34b88cad'                  //  线上商城
                            && this.precondition.scenario === ENUM_SCENARIO.COMMERCE) {
                            this.appliedTemplate = item;
                        } else if (item.source_miniprogram_appid === 'wx54710fd1373c1ce8'
                            && this.precondition.scenario === ENUM_SCENARIO.MAP) {
                            this.appliedTemplate = item;
                        }
                        return item;
                    });
                }
            });
        //  应用场景前是否需要创建店铺
        if (this.precondition.shouldHavaBusiness
        ) {
            this.backbone
                .fetchBusinessList(this.backbone.session, this.backbone.authorizerMiniProgramAppId)
                .subscribe(res => {
                    console.log(res);
                    if (res.code === 0 && res.msg.length > 0) {
                        this.businesses = res.msg;
                        this.onBusinessSelected(res.msg[0]);
                    } else {
                        this.errorMessage = '请先创建店铺后，再应用该模版';
                        this.linkName = '创建店铺';
                        this.link = 'entry/wechat/miniprogram/business';
                    }
                });
            //  获取授权方的支付账号信息
            this.backbone
                .fetchAuthorizerPay(
                    this.backbone.session,
                    this.backbone.authorizerMiniProgramAppId
                )
                .subscribe(res => {
                    console.log(res);
                    if (res.code === 0 && res.msg.length > 0) {
                        this.mchid = res.msg[0].mchid;
                        this.apiKey = res.msg[0].apiKey;
                    }
                });
        }
    }

    /**
     *  绑定授权方支付
     */
    bindAuthorizerPay() {
        this.backbone.bindAuthorizerPay(
            this.backbone.session,
            this.appid,
            this.mchid,
            this.apiKey
        )
            .subscribe(res => {
                if (res.code === 0) {
                    this.errorMessage = '设置成功';
                } else {
                    this.errorMessage = '设置失败';
                }
            });
    }

    /**
     * 选择一个店铺
     * @param business
     */
    onBusinessSelected(business) {
        this.backbone.businessId = business.bid;
        this.btnName = business.name;
    }

    /**
     *  应用模版
     */
    apply() {
        //  上传代码
        this.backbone.commitSourceCode(
            this.backbone.session,
            this.appid,
            new Template(
                this.appliedTemplate.template_id,
                JSON.stringify({
                    extEnable: true,
                    extAppid: this.appid,
                    ext: {
                        appid: this.appid,
                        businessid: this.backbone.businessId || ''
                    }
                }),
                this.appliedTemplate.user_version,
                this.appliedTemplate.user_desc
            ))
            .subscribe(result => {
                console.log(result);
                if (result.code === 0) {
                    this.router.navigate(['entry/wechat/miniprogram/template']);    //  成功使用模版后跳转至版本管理
                } else if (result.code === -100) {
                    this.errorMessage = '当前小程序已应用该模版，请进入版本管理查看详情';
                    this.linkName = '版本管理';
                    this.link = 'entry/wechat/miniprogram/template';
                }
            });
    }

    /**
     *  上传API证书
     */
    uploadAPIClientCert() {
        console.log('===== uploadAPIClientCert =====');
        this.certUploader.queue.forEach((fileItem, index) => {
            console.log(fileItem);
            console.log(index);
            fileItem.withCredentials = false;
        });

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
        this.certUploader.onProgressAll = function (progress) {
            console.log('===========>   onProgressAll');
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
        this.certUploader.onCompleteItem = function (item, response, status, headers) {
            console.log('===========> onCompleteItem ');
            // const res = JSON.parse(response);
            console.log(response);
            // currentTarget = currentTarget.map(target => {
            //     if (target.originalName === item._file.name) {
            //         target.imageId = res.imageId;
            //     }
            //     return target;
            // });
        };
        /**
         *  完成上传所有文件的回调
         */
        this.certUploader.onCompleteAll = function () {
            console.log('===========> Completed ');
            modalRef.close('Completed');
        };
        this.certUploader.uploadAll();
    }

    saveAPIClientCert() {

    }
}

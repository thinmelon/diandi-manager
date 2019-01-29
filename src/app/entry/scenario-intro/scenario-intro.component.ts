import {FileUploader} from 'ng2-file-upload';
import {Component, OnInit} from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {UrlService} from '../../services/url.service';
import {ActivatedRoute, Router} from '@angular/router';
import {BackboneService} from '../../services/diandi.backbone';
import {Template} from '../../services/diandi.structure';
import {ProgressBarModalComponent} from '../../modal/progress-bar-modal/progress-bar-modal.component';

@Component({
    selector: 'app-scenario-intro',
    templateUrl: './scenario-intro.component.html',
    styleUrls: ['./scenario-intro.component.less']
})
export class ScenarioIntroComponent implements OnInit {
    errorMessage = '';                          //  错误信息
    linkName = '';
    link = '';
    btnName = '--- 请选择商户 ---';
    businesses = [];                            //  APPID对应的可选商户列表
    appliedTemplate = null;                    //  应用模版
    appid = '';                                 //  当前appid
    mchid = '';                                 //  微信支付的商户ID
    apiKey = '';                                //  微信支付的商户API KEY
    certFile = '';                              //  微信支付的证书文件
    everBought = false;                        //  是否购买过该模板
    certUploader: FileUploader;

    constructor(private route: ActivatedRoute,
                private router: Router,
                private modalService: NgbModal,
                private backbone: BackboneService) {
        this.route.params.subscribe(params => {
            this.appliedTemplate = JSON.parse(params.template);         //  根据URL参数初始化模板信息
            this.backbone.channel = params.channel;
        });
        this.appid = this.backbone.authorizerMiniProgramAppId;         //  获取当前APPID
    }

    ngOnInit() {
        this.certUploader = new FileUploader({
            // url: UrlService.UploadWxPayAPIClientCert(this.backbone.publicEncrypt(''), this.appid),  //  文件上传路径
            // allowedFileType: ['image/jpeg'],     //  允许上传的文件类型
            method: 'POST',                         //  上传文件的方式
            maxFileSize: 1024 * 1024,               //  最大可上传的文件大小
            queueLimit: 1,                          //  最大可上传的文件数量
            removeAfterUpload: true                //  是否在上传完成后从队列中移除
        });

        this.backbone
            .CheckEverBoughtTemplate(this.backbone.publicEncrypt(''), this.appliedTemplate.templateId.toString())
            .subscribe(res => {
                console.log(res);
                if (res.code === 0) {
                    this.everBought = true;
                }
            });

        if (this.appliedTemplate.shouldHavaBusiness             //  应用场景前是否需要创建店铺
        ) {
            this.backbone
                .fetchBusinessList(this.backbone.publicEncrypt(''), this.backbone.authorizerMiniProgramAppId)
                .subscribe(res => {
                    console.log(res);
                    if (res.code === 0 && res.data.length > 0) {
                        this.businesses = res.data;
                        this.onBusinessSelected(res.data[0]);
                    } else {
                        this.errorMessage = '请先创建店铺后，再应用该模版';
                        this.linkName = '创建店铺';
                        this.link = 'entry/wechat/miniprogram/business';
                    }
                });
            //  获取授权方的支付账号信息
            this.backbone
                .fetchAuthorizerPay(this.backbone.publicEncrypt(''), this.backbone.authorizerMiniProgramAppId)
                .subscribe(res => {
                    console.log(res);
                    if (res.code === 0) {
                        this.mchid = res.data.mchid;
                        this.apiKey = res.data.apiKey;
                        this.certFile = res.data.certFilePath ? res.data.certFilePath : '';
                    }
                });
        }
    }

    /**
     *  绑定授权方支付
     */
    bindAuthorizerPay() {
        this.backbone.bindAuthorizerPay(
            this.backbone.publicEncrypt(''),
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
        this.backbone.businessId = business._id;            //  设置商户ID
        this.btnName = business.name;                       //  变更按键名称
    }

    /**
     *  上传API证书
     */
    uploadAPIClientCert() {
        const that = this;

        this.certUploader.queue.forEach((fileItem, index) => {
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
            if (JSON.parse(response).code === 0) {
                that.errorMessage = '上传API证书成功';
            } else {
                that.errorMessage = '上传API证书失败';
            }
        };
        /**
         *  完成上传所有文件的回调
         */
        this.certUploader.onCompleteAll = function () {
            console.log('===========> Completed ');
            modalRef.close('Completed');
        };
        /**
         *  在要上传时再设置文件上传的地址
         */
        this.certUploader.setOptions({
            url: UrlService.UploadWxPayAPIClientCert(this.backbone.publicEncrypt(''), this.appid),  //  文件上传路径
        });
        this.certUploader.uploadAll();
    }

    /**
     *  购买模板
     */
    buy() {
        this.router.navigate(['entry/wechat/prepay',
            {
                cart: JSON.stringify([
                    this.appliedTemplate,                                       //  SKU
                ]),
                alipayReturnURL: encodeURIComponent(window.location.href)        //  设置支付宝电脑网页支付成功后的回调链接
            }
        ]);
    }

    /**
     *  应用模版
     */
    apply() {
        //  上传代码
        this.backbone.commitSourceCode(
            this.backbone.publicEncrypt(''),
            this.appid,
            new Template(
                this.appliedTemplate.templateId,
                JSON.stringify({
                    extEnable: true,
                    extAppid: this.appid,
                    ext: {
                        appid: this.appid,
                        businessid: this.backbone.businessId || '',
                        templateid: this.appliedTemplate.templateId
                    }
                }),
                this.appliedTemplate.userVersion,
                this.appliedTemplate.userDesc
            ))
            .subscribe(result => {
                console.log(result);
                if (result.code === 0) {
                    this.router.navigate(['entry/wechat/miniprogram/template']);    //  成功使用模版后跳转至版本管理
                } else if (result.code === -100) {
                    this.errorMessage = '当前小程序已应用该模版，请进入版本管理查看详情';
                    this.linkName = '版本管理';
                    this.link = 'entry/wechat/miniprogram/template';
                } else if (result.errcode === 85014) {
                    this.errorMessage = '模板不存在';
                }
            });
    }
}

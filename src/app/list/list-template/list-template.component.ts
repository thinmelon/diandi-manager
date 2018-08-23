import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import * as moment from 'moment';
import {BackboneService} from '../../services/diandi.backbone';
import {Template} from '../../services/diandi.structure';

@Component({
    selector: 'app-list-template',
    templateUrl: './list-template.component.html',
    styleUrls: ['./list-template.component.less']
})
export class ListTemplateComponent implements OnInit {
    public templateLibrary = [];
    public templates = [];
    public errorMessage = '';
    public authorizerAppId;
    public trialQRCode = '';

    constructor(private router: Router,
                private route: ActivatedRoute,
                private backbone: BackboneService) {
    }

    ngOnInit() {
        this.trialQRCode = this.backbone.fetchTrialQRCode(
            this.backbone.session,
            this.backbone.authorizerMiniProgramAppId
        );

        this.route.data
            .subscribe((data: { templateListResolver: any }) => {
                console.log(data.templateListResolver);
                if (data.templateListResolver.errcode === 0) {
                    this.templates = data.templateListResolver.template_list.map(item => {
                        item.create_time = moment(item.create_time * 1000).format('YYYY-MM-DD HH:mm:ss');   //  转换下时间
                        return item;
                    });
                }
            });

        if (this.backbone.session && this.backbone.authorizerMiniProgramAppId) {
            this.authorizerAppId = this.backbone.authorizerMiniProgramAppId;
            this.backbone.fetchAuthorizerTemplateList(
                this.backbone.session,
                this.backbone.authorizerMiniProgramAppId
            )
                .subscribe(data => {
                    console.log(data);
                    if (data.errcode === 0) {
                        this.templateLibrary = data.list;
                    }
                });
        } else {
            this.errorMessage = '请先指定默认的授权小程序';
        }
    }

    apply(template) {
        this.backbone.commitSourceCode(
            this.backbone.session,
            this.backbone.authorizerMiniProgramAppId,
            new Template(
                template.template_id,
                JSON.stringify({
                    extEnable: true,
                    extAppid: this.backbone.authorizerMiniProgramAppId,
                    ext: {
                        appid: this.backbone.authorizerMiniProgramAppId
                    }
                }),
                template.user_version,
                template.user_desc
            ))
            .subscribe(result => {
                console.log(result);
                if (result.hasOwnProperty('errcode') && result.errcode === 0) {
                    this.errorMessage = '成功应用此模版';
                }
            });
    }

}

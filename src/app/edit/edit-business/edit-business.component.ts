import {Component, OnInit} from '@angular/core';
import {BusinessType} from '../../services/diandi.structure';
import {BackboneService} from '../../services/diandi.backbone';

declare var qq: any;
const center = new qq.maps.LatLng(25.43131, 119.01501);   //  地图中心坐标
const zoom = 17;        //  放大级别

@Component({
    selector: 'app-edit-business',
    templateUrl: './edit-business.component.html',
    styleUrls: ['./edit-business.component.less']
})
export class EditBusinessComponent implements OnInit {
    public mapViewHeight = '300px';
    public businessTypeHint = '请选择商户类型';
    public businessTypeGroup = [];
    public type;
    public name = '';
    public address = '';
    public longitude;
    public latitude;
    public shopHours = '';
    public phone = '';
    public comsuptionPerPersion = '';
    public remark = '';
    public associatedProduct = '';
    public products = [];
    public map;

    constructor(private backbone: BackboneService) {
    }

    ngOnInit() {
        for (const key in BusinessType) {
            if (BusinessType.hasOwnProperty(key)) {
                this.businessTypeGroup.push({
                    index: key,
                    name: BusinessType[key]
                });
            }
        }
        /**
         * 定义map变量 调用 qq.maps.Map() 构造函数   获取地图显示容器
         */
        this.map = new qq.maps.Map(
            window.document.getElementById('tencent-map'),
            {
                center: center,             // 地图的中心地理坐标
                zoom: zoom                  // 地图的中心地理坐标
            });

        this.backbone
            .fetchPartialProducts(
                this.backbone.session
                , 5)
            .subscribe(response => {
                console.log(response);
            });
    }

    /**
     * 选择商户类型
     * @param name
     * @param value
     */
    chooseBusinessType(name, value) {
        this.businessTypeHint = name;
        this.type = value;
    }

    /**
     * 根据输入的地址信息，获取商户的经纬度坐标
     * @param e
     */
    getCoordinates() {
        const that = this;
        console.log(this.address);
        /**
         * 地址解析 Geocoder
         * 地址解析类用于在地址和经纬度之间进行转换的服务。 本功能以异步方式将检索条件发送至服务器
         * 通过您自定义的回调函数将结果返回
         */
        const geocoder = new qq.maps.Geocoder({
            complete: function (result) {
                console.log(result);
                that.latitude = result.detail.location.lat;
                that.longitude = result.detail.location.lng;
                that.map.setCenter(result.detail.location);
                const marker = new qq.maps.Marker({
                    map: that.map,
                    position: result.detail.location
                });
            }
        });
        geocoder.getLocation(this.address);
    }

    /**
     * 添加商户
     */
    onSubmit() {
        this.backbone
            .addBusiness('')
            .subscribe(response => {
                console.log(response);
            });
    }

}

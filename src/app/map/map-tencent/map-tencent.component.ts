import {Component, OnInit} from '@angular/core';

declare var qq: any;

const name = '莆田华侨医院';
const address = '地址：莆田市涵江区江口镇石庭西路869号';
const emergency = '急诊：(0594)3795120';
const consult = '咨询：(0594)6725120';
const longitude = 119.153890;
const latitude = 25.473070;
const zoom = 17;

@Component({
    selector: 'app-map-tencent',
    templateUrl: './map-tencent.component.html',
    styleUrls: ['./map-tencent.component.less']
})
export class MapTencentComponent implements OnInit {
    public mapViewHeight;

    constructor() {
    }

    ngOnInit() {
        this.mapViewHeight = window.innerHeight.toString() + 'px';
        /**
         * 定义map变量 调用 qq.maps.Map() 构造函数   获取地图显示容器
         */
        const center = new qq.maps.LatLng(latitude, longitude);
        const map = new qq.maps.Map(window.document.getElementById('tencent-map'), {
            center: center,      // 地图的中心地理坐标。
            zoom: zoom           // 地图的中心地理坐标。
        });
        /**
         * 添加标记
         */
        // const marker = new qq.maps.Marker({
        //     position: center,
        //     map: map
        // });
        /**
         * 添加信息窗口
         */
        const title = `<div style="font-weight: bold; color: #973444">${ name }</div>`;
        const content = `${ title }<br />${ address }<br />${ emergency }<br />${ consult }<br /><hr>`;
        const infoWin = new qq.maps.InfoWindow({
            map: map
        });
        infoWin.open();
        infoWin.setContent(content);
        infoWin.setPosition(map.getCenter());
    }

}

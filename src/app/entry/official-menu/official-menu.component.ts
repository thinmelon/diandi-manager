import {Component, OnInit} from '@angular/core';
import {Menu, MenuType} from '../../services/diandi.structure';
import {Utils} from '../../services/utils';

@Component({
    selector: 'app-official-menu',
    templateUrl: './official-menu.component.html',
    styleUrls: ['./official-menu.component.less']
})
export class OfficialMenuComponent implements OnInit {
    public errorMessage = '';
    public menuTypeGroup = [];
    public mainMenus = [];

    constructor() {
    }

    ngOnInit() {
        for (const index in MenuType) {
            if (MenuType.hasOwnProperty(index)) {
                this.menuTypeGroup.push({
                    index: index,
                    key: MenuType[index].key,
                    value: MenuType[index].value,
                    hint: MenuType[index].hint
                });
            }
        }
        this.AddMainMenu();
    }

    /**
     * 选择菜单类型
     * @param index
     * @param id
     */
    chooseMenuType(index, id) {
        // for (const i = 0; i < this.menus.length; i++) {
        //     if (this.menus[i].id === id) {
        //         this.menus[i].type = this.menuTypeGroup[index].key;
        //         this.menus[i].typeName = this.menuTypeGroup[index].value;
        //         this.menus[i].typeHint = this.menuTypeGroup[index].hint;
        //         break;
        //     }
        // }
    }

    /**
     * 创建菜单项
     */
    AddMainMenu() {
        if (this.mainMenus.length < 3) {
            this.mainMenus.push({
                name: '',
                subMenus: []
            });
            const menu = new Menu(
                Utils.GetNonceStr(16),
                false,
                this.menuTypeGroup[0].key,
                this.menuTypeGroup[0].value,
                this.menuTypeGroup[0].hint,
                '', '', '', '', '', '');
            switch (menu.type) {
                case 'miniprogram':
                    menu.url = 'http://mp.weixin.qq.com';
                    break;
                default:
                    break;
            }
            this.mainMenus[this.mainMenus.length - 1].subMenus.push(menu);
            console.log(this.mainMenus);
        } else {
            this.errorMessage = '最多添加三个一级菜单';
        }
    }

    convertMenuToJson() {

    }
}

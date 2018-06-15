import {Component, EventEmitter, Input, Output} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {Utils} from '../../services/utils';
import {Attribute} from '../../services/diandi.structure';

@Component({
    selector: 'app-attribute-modal',
    templateUrl: './attribute-modal.component.html',
    styleUrls: ['./attribute-modal.component.less']
})
export class AttributeModalComponent {
    @Input() title: string;
    @Output() attributesEvent = new EventEmitter<Attribute[]>();
    inputValue: string;
    names = [];
    attributes = [];

    constructor(public activeModal: NgbActiveModal) {
    }

    onEnter(values: string) {
        this.inputValue = '';
        values = values.trim();
        /** 属性名不可为空 */
        if (values === '') {
            return;
        }
        /**  如果属性名已存在，勿重复添加 */
        for (const key in this.names) {
            if (this.names[key] === values) {
                return;
            }
        }
        this.names.push(values);
        this.attributes.push({
            id: Utils.GetNonceStr(16),
            name: values,
            value: ''
        });
    }

    /**
     *  移除一个属性键值
     *  如果仅剩下一个，则不能移除
     * @param id
     */
    minus(id) {
        for (let i = 0; i < this.attributes.length; i++) {
            if (this.attributes[i].id === id) {
                let count = 0;
                for (let j = 0; j < this.attributes.length; j++) {
                    if (this.attributes[j].name === this.attributes[i].name) {
                        count++;
                    }
                }
                if (count > 1) {
                    this.attributes.splice(i, 1);
                }
                break;
            }
        }
    }

    /**
     * 增加一个属性键值
     * @param name
     */
    plus(name) {
        this.attributes.push({
            id: Utils.GetNonceStr(16),
            name: name,
            value: ''
        });
    }

    /**
     * 移除所有有相同属性名的键值
     * @param name
     */
    removeAll(name) {
        for (let i = 0; i < this.names.length; i++) {
            if (this.names[i] === name) {
                this.names.splice(i, 1);
                break;
            }
        }

        for (let j = this.attributes.length - 1; j >= 0; j--) {
            if (this.attributes[j].name === name) {
                this.attributes.splice(j, 1);
            }
        }
    }

    addAttribute() {
        this.activeModal.dismiss('Completed');
        this.attributesEvent.emit(this.attributes);
    }
}


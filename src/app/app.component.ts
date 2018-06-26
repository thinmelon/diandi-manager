import {Component} from '@angular/core';
import {ContainerService} from './services/container.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.less']
})
export class AppComponent {
    constructor(private container: ContainerService) {
        this.container.set({
            session: 'sS9AvbAt9jVRk5I2uO5SxM7ZeTlruwnA'
        });
    }
}

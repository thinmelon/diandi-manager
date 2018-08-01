import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MapTencentComponent } from './map-tencent.component';

describe('MapTencentComponent', () => {
  let component: MapTencentComponent;
  let fixture: ComponentFixture<MapTencentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MapTencentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MapTencentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

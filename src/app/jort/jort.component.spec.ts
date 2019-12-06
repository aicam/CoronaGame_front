import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JortComponent } from './jort.component';

describe('JortComponent', () => {
  let component: JortComponent;
  let fixture: ComponentFixture<JortComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JortComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JortComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

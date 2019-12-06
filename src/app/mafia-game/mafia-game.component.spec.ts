import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MafiaGameComponent } from './mafia-game.component';

describe('MafiaGameComponent', () => {
  let component: MafiaGameComponent;
  let fixture: ComponentFixture<MafiaGameComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MafiaGameComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MafiaGameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

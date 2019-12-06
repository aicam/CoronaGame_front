import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GameSelectionComponent } from './game-selection.component';

describe('GameSelectionComponent', () => {
  let component: GameSelectionComponent;
  let fixture: ComponentFixture<GameSelectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GameSelectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GameSelectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TheateronboardComponent } from './theateronboard.component';

describe('TheateronboardComponent', () => {
  let component: TheateronboardComponent;
  let fixture: ComponentFixture<TheateronboardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TheateronboardComponent]
    });
    fixture = TestBed.createComponent(TheateronboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

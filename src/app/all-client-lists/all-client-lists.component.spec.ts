import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllClientListsComponent } from './all-client-lists.component';

describe('AllClientListsComponent', () => {
  let component: AllClientListsComponent;
  let fixture: ComponentFixture<AllClientListsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllClientListsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllClientListsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

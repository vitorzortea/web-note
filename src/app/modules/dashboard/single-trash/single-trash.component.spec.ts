import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleTrashComponent } from './single-trash.component';

describe('SingleTrashComponent', () => {
  let component: SingleTrashComponent;
  let fixture: ComponentFixture<SingleTrashComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SingleTrashComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SingleTrashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

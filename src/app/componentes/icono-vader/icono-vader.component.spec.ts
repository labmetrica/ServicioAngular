import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IconoVaderComponent } from './icono-vader.component';

describe('IconoVaderComponent', () => {
  let component: IconoVaderComponent;
  let fixture: ComponentFixture<IconoVaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IconoVaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IconoVaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

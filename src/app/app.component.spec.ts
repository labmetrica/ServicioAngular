import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [
        AppComponent
      ],
    }).compileComponents();
  }));

  const routes: Routes = [
    { path: 'ejemplo', component: EjemploComponent }
  ];
});import { from } from 'rxjs';
import { EjemploComponent } from './ejemplo/ejemplo.component';
import { Routes } from '@angular/router';


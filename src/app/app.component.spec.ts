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
    { path: 'ejemplo', component: SubheaderComponent }
  ];
});import { from } from 'rxjs';
import { Routes } from '@angular/router';
import { SubheaderComponent } from './subheader/SubheaderComponent';


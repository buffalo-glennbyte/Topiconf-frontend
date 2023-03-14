import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdministratoromgevingComponent } from './administratoromgeving.component';

describe('AdministratoromgevingComponent', () => {
  let component: AdministratoromgevingComponent;
  let fixture: ComponentFixture<AdministratoromgevingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdministratoromgevingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdministratoromgevingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

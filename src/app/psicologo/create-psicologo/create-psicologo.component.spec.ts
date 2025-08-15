import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatePsicologoComponent } from './create-psicologo.component';

describe('CreatePsicologoComponent', () => {
  let component: CreatePsicologoComponent;
  let fixture: ComponentFixture<CreatePsicologoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreatePsicologoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatePsicologoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

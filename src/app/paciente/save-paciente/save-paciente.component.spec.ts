import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SavePacienteComponent } from './save-paciente.component';

describe('SavePacienteComponent', () => {
  let component: SavePacienteComponent;
  let fixture: ComponentFixture<SavePacienteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SavePacienteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SavePacienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

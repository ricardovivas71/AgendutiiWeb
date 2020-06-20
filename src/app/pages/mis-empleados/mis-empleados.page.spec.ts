import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MisEmpleadosPage } from './mis-empleados.page';

describe('MisEmpleadosPage', () => {
  let component: MisEmpleadosPage;
  let fixture: ComponentFixture<MisEmpleadosPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MisEmpleadosPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MisEmpleadosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

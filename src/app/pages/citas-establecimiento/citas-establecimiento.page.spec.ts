import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CitasEstablecimientoPage } from './citas-establecimiento.page';

describe('CitasEstablecimientoPage', () => {
  let component: CitasEstablecimientoPage;
  let fixture: ComponentFixture<CitasEstablecimientoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CitasEstablecimientoPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CitasEstablecimientoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

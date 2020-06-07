import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { GestionarEstablecimientosPage } from './gestionar-establecimientos.page';

describe('GestionarEstablecimientosPage', () => {
  let component: GestionarEstablecimientosPage;
  let fixture: ComponentFixture<GestionarEstablecimientosPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GestionarEstablecimientosPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(GestionarEstablecimientosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

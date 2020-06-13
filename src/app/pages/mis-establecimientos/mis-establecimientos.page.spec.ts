import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MisEstablecimientosPage } from './mis-establecimientos.page';

describe('MisEstablecimientosPage', () => {
  let component: MisEstablecimientosPage;
  let fixture: ComponentFixture<MisEstablecimientosPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MisEstablecimientosPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MisEstablecimientosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

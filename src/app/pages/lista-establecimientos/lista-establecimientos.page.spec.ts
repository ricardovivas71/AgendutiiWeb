import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ListaEstablecimientosPage } from './lista-establecimientos.page';

describe('ListaEstablecimientosPage', () => {
  let component: ListaEstablecimientosPage;
  let fixture: ComponentFixture<ListaEstablecimientosPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListaEstablecimientosPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ListaEstablecimientosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MisCitasPage } from './mis-citas.page';

describe('MisCitasPage', () => {
  let component: MisCitasPage;
  let fixture: ComponentFixture<MisCitasPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MisCitasPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MisCitasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

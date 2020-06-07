import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SitioPage } from './sitio.page';

describe('SitioPage', () => {
  let component: SitioPage;
  let fixture: ComponentFixture<SitioPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SitioPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SitioPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

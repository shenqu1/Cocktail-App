import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CocktailAddOrEditPage } from './cocktail-add-or-edit.page';

describe('CocktailAddOrEditPage', () => {
  let component: CocktailAddOrEditPage;
  let fixture: ComponentFixture<CocktailAddOrEditPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CocktailAddOrEditPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CocktailAddOrEditPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateRecipeComponent } from './update-recipe.component';

describe('UpdateRecipeComponent', () => {
  let component: UpdateRecipeComponent;
  let fixture: ComponentFixture<UpdateRecipeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateRecipeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UpdateRecipeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

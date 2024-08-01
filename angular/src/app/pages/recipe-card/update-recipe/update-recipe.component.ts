import { Component, Inject } from '@angular/core';
import { RecipeService } from '../../../service/recipe/recipe.service';
import { MatButtonModule } from '@angular/material/button';
import { MatRadioModule } from '@angular/material/radio';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-update-recipe',
  standalone: true,
  imports: [
    MatRadioModule,
    MatButtonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
  ],
  templateUrl: './update-recipe.component.html',
  styleUrl: './update-recipe.component.scss',
})
export class UpdateRecipeComponent {
  recipeItem: any = {
    title: '',
    description: '',
    foodType: '',
    image: '',
  };

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,private recipeService: RecipeService) {
    this.recipeItem=data
  }

  handleUpdateRecipe() {
    console.log('Form submitted:', this.recipeItem);
    this.recipeService.updateRecipe(this.recipeItem).subscribe({
      next:(res)=>console.log("res",res),
      error:(error)=>console.log("error ",error)
    });
  }
}

import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatPseudoCheckboxModule } from '@angular/material/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRadioModule } from '@angular/material/radio';
import { RecipeService } from '../../service/recipe/recipe.service';

@Component({
  selector: 'app-create-recipe',
  standalone: true,
  imports: [
    MatRadioModule,
    MatButtonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
  ],
  templateUrl: './create-recipe.component.html',
  styleUrl: './create-recipe.component.scss',
})
export class CreateRecipeComponent {
  recipeItem: any = {
    title: '',
    description: '',
    foodType: '',
    image: '',
  };

  constructor(private recipeService:RecipeService){}

  onSubmit() {
    // Handle form submission logic here (e.g., sending data to server)
    console.log('Form submitted:', this.recipeItem);
    this.createRecipe(this.recipeItem)
    
    // You can perform API calls or any other operations here
  }

  createRecipe(recipe: any): void {
    this.recipeService.createRecipe(recipe)
      .subscribe(
        {next:(newRecipe: any) => {
          console.log('Recipe created:', newRecipe);
          this.recipeService.getRecipes();
          // Optionally, you can add the newRecipe to this.recipes if needed
        },
        error:(error: any) => {
          console.error('Error creating recipe:', error);
        }}
      );
  }
}

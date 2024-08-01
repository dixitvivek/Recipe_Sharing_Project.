import { Component } from '@angular/core';
import { RecipeCardComponent } from '../recipe-card/recipe-card.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { CreateRecipeComponent } from '../create-recipe/create-recipe.component';
import { MatDialog } from '@angular/material/dialog';
import { RecipeService } from '../../service/recipe/recipe.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RecipeCardComponent, MatIconModule, MatButtonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  recipe = [1, 1, 1, 1, 1, 1, 1];
  recipes = [];

  constructor(public dialog: MatDialog, private recipeService: RecipeService) {}

  recipeItem = {
    title: 'Margherita Pizza',
    description:
      'A classic Italian pizza with simple yet flavorful ingredients.',
    vegetarian: true,
    image:
      'https://images.pexels.com/photos/958545/pexels-photo-958545.jpeg?auto=compress&cs=tinysrgb&w=800',
    ingredients: [
      'Pizza dough (1 ball)',
      'Tomato sauce (1/2 cup)',
      'Fresh mozzarella cheese (8 oz)',
      'Fresh basil leaves (A handful)',
      'Olive oil (1-2 tbsp)',
      'Salt (To taste)',
      'Black pepper (To taste)',
    ],
    user: {
      image:
        'https://images.pexels.com/photos/1009904/pexels-photo-1009904.jpeg?auto=compress&cs=tinysrgb&w=300',
    },
  };

  openCreateRecipeModal = () => {
    this.dialog.open(CreateRecipeComponent);
  };

  ngOnInit(): void {
    this.getRecipes();
    this.recipeService.recipesSubject.subscribe((recipeData) => {
      this.recipes = recipeData.recipes;
    });
  }

  getRecipes() {
    this.recipeService.getRecipes().subscribe({
      next: (recipes: any) => {
        // this.recipes = recipes;
        console.log('recipes ', recipes);
      },
      error: (error: any) => {
        console.error('Error fetching recipes:', error);
      },
    });
  }

  updateRecipe(recipe: any) {
    this.recipeService.updateRecipe(recipe).subscribe({
      next: (updatedRecipe: any) => {
        console.log('Recipe updated:', updatedRecipe);
        // Update the respective recipe in this.recipes if needed
      },
      error: (error: any) => {
        console.error('Error updating recipe:', error);
      },
    });
  }

  deleteRecipe(id: number) {
    console.log('delete success', id);
    this.recipeService.deleteRecipe(id).subscribe({
      next: (res) => {
        console.log('Recipe deleted:', res);
        // Remove the respective recipe from this.recipes if needed
      },
      error: (error: any) => {
        console.error('Error deleting recipe:', error);
      },
    });
  }
}

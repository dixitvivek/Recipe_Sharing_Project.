import { Component,Input } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogTitle,
  MatDialogContent,
} from '@angular/material/dialog';
import { SharedModalComponent } from './shared-modal/shared-modal.component';
import { RecipeService } from '../../service/recipe/recipe.service';
import { UpdateRecipeComponent } from './update-recipe/update-recipe.component';
import { AuthService } from '../../service/auth/auth.service';

@Component({
  selector: 'app-recipe-card',
  standalone: true,
  imports: [MatCardModule, MatButtonModule,MatIconModule],
  templateUrl: './recipe-card.component.html',
  styleUrl: './recipe-card.component.scss'
})
export class RecipeCardComponent {

  @Input() recipe:any;
  user:any
  // @Input() handleDeleteRecipe:any
  

  constructor(public dialog: MatDialog,public recipeService:RecipeService,public authService:AuthService) {}

  ngOnInit(){
    this.authService.authSubject.subscribe((auth)=>{
      this.user=auth.user
    })
  }
  openDialog() {
    console.log("open dialog ------------")
    this.dialog.open(SharedModalComponent);
  }
  openUpdateRecipeModal = () => {
    this.dialog.open(UpdateRecipeComponent,{data:this.recipe});
  };
  deleteRecipe(id: number) {
    console.log("delete success",id)
    this.recipeService.deleteRecipe(id)
      .subscribe(
        {next:(res) => {
          console.log('Recipe deleted:', res);
          // Remove the respective recipe from this.recipes if needed
        },
        error:(error: any) => {
          console.error('Error deleting recipe:', error);
        }}
      );
  }

  handleRecipeLike(id:number){
    
    this.recipeService.likeRecipe(id).subscribe({
      next:data=>console.log("like --",data),
      error:error=>console.log("error --- ",error)
    })
  }
  
}

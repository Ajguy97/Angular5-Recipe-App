import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { Recipe } from '../../shared/recipe.model';
import { RecipeService } from '../../shared/services/recipe.service';


@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
id : number;
editMode = false;
recipeForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private recipeService : RecipeService,
    private router: Router
  ) { }

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params)=> {
        
        this.id = +params['id'];
        //if no id then editMode is true
        this.editMode = (params['id'] != null);
      }
    );
    this.InitForm();
  }

private InitForm(){
let recipeName = '';
let recipeImagePath = '';
let recipeDescription = '';
let recipeIngredients = new FormArray([]);

if(this.editMode){
  const recipe: Recipe = this.recipeService.getRecipe(this.id);

  recipeName = recipe.name;
  recipeImagePath = recipe.imagePath;
  recipeDescription = recipe.description;
  // if recipe has ingredients element of type array
  if(recipe['ingredients']){
    //can access recipe.ingredients because of recipe model
    for(let i of recipe.ingredients){
      //pushing a formgroup of name and amount
      recipeIngredients.push(
        new FormGroup({
        'name' : new FormControl(i.name, Validators.required),
        'amount' : new FormControl(i.amount, [Validators.required, Validators.pattern('^[1-9]+[0-9]*')])
      })
    ); 
    }
  }
}

this.recipeForm = new FormGroup({
  'name' : new FormControl(recipeName, Validators.required),
  'imagePath' : new FormControl(recipeImagePath, Validators.required),
  'description' : new FormControl(recipeDescription, Validators.required),
  'ingredients' : recipeIngredients
});
}

onSubmit(){
  // const newRecipe = new Recipe(
  //   this.recipeForm.value['name'],
  //   this.recipeForm.value['imagePath'],
  //   this.recipeForm.value['ndescription'],
  //   this.recipeForm.value['ingredients']);

  if(this.editMode){
    this.recipeService.updateRecipe(this.id, this.recipeForm.value);
  }else{
    this.recipeService.addRecipe(this.recipeForm.value)
  }

  this.onCancel();

}

onAddIngredient(){
(<FormArray>this.recipeForm.get('ingredients')).push(
  new FormGroup({
    name: new FormControl(null,Validators.required),
    amount: new FormControl(null,[Validators.required, Validators.pattern('^[1-9]+[0-9]*')])
  })
);
}

onDeleteIngredient(index : number){
  (<FormArray>this.recipeForm.get('ingredients')).removeAt(index);
  
}

onCancel(){
  this.router.navigate(['../'], {relativeTo: this.route})
}


}

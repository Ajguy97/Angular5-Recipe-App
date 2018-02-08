import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";

import { RecipesComponent } from "./recipes.component";
import { RecipeStartComponent } from "./recipe-start/recipe-start.component";
import { RecipeEditComponent } from "./recipe-edit/recipe-edit.component";
import { RecipeDetailComponent } from "./recipe-detail/recipe-detail.component";

import { AuthGuard } from "../shared/services/auth-guard.service";
import { RouterModule } from "@angular/router";


const recipeRoutes: Routes = [

    { path: '', component: RecipesComponent , children: [
        {path: '', component: RecipeStartComponent},
        {path: 'new' , component: RecipeEditComponent, canActivate: [ AuthGuard ]},
        {path: ':id' ,component: RecipeDetailComponent },
        {path: ':id/edit' , component: RecipeEditComponent ,canActivate: [ AuthGuard ]}
    ]
    },
]
@NgModule({

    imports: [
        RouterModule.forChild(recipeRoutes)
    ],

    exports : [RouterModule]

})
export class RecipesRoutingModule {}
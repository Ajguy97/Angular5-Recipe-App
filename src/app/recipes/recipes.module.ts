import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";

import { RecipesComponent } from "./recipes.component";
import { RecipeStartComponent } from "./recipe-start/recipe-start.component";
import { RecipeDetailComponent } from "./recipe-detail/recipe-detail.component";
import { RecipeEditComponent } from "./recipe-edit/recipe-edit.component";
import { RecipeItemComponent } from "./recipe-list/recipe-item/recipe-item.component";
import { RecipeListComponent } from "./recipe-list/recipe-list.component";

import { DropdownDirective } from "../shared/directives/dropdown.directive";
import { RecipesRoutingModule } from "./recipes-routing.module";
import { SharedModule } from "../shared/shared.module";


@NgModule({
    //components used by recipe module
    declarations: [
        RecipesComponent,
        RecipeStartComponent,
        RecipeDetailComponent,
        RecipeEditComponent,
        RecipeItemComponent,
        RecipeListComponent,
    ],

    imports: [
        CommonModule, //this is for common directives  , Browser module already has this 
        ReactiveFormsModule,
        RecipesRoutingModule,
        SharedModule// this is for the dropdown directive => can't declare directive twice.
    ]

})
export class RecipesModule{
    
}
import { Routes, RouterModule } from "@angular/router";
import { NgModule } from "@angular/core";
import { ShoppingListComponent } from "./shopping-list/shopping-list.component";
import { HomeComponent } from "./core/home/home.component";





const approutes: Routes = [
    { path: '', pathMatch: "full" , component: HomeComponent},
    { path: 'recipes', loadChildren: './recipes/recipes.module#RecipesModule' },
    { path: 'shopping-list', component: ShoppingListComponent}
];

@NgModule({

    imports: [RouterModule.forRoot(approutes)],
    exports: [RouterModule]

})
export class AppRoutingModule{

}
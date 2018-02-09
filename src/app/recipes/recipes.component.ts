import { Component, OnInit } from '@angular/core';
import { ServerService } from '../shared/services/server.service';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css']
 
})
export class RecipesComponent implements OnInit {

  constructor(
    private serverService: ServerService
  ){}

  ngOnInit() {
    this.serverService.getRecipes();
  }

}

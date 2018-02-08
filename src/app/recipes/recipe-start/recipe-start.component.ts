import { Component, OnInit } from '@angular/core';
import { trigger, state, style ,transition, animate } from '@angular/animations';

@Component({
  selector: 'app-recipe-start',
  templateUrl: './recipe-start.component.html',
  styleUrls: ['./recipe-start.component.css'],
  animations: [
    trigger('divState',
      [state('normal',
        style({
          'background-color': 'red',
          transform: 'translateX(0)'
        })
      ),
      state('highlighted',
        style({
          'background-color': 'blue',
          transform: 'translateX(200px)'
        })
      ),
      transition('normal <=> highlighted', animate(500)),
      
      ]),
    trigger('wildState',
      [state('normal',
        style({
          'background-color': 'red',
          transform: 'translateX(0) scale(1)'
        })
      ),
      state('highlighted',
        style({
          'background-color': 'blue',
          transform: 'translateX(200px) scale(1)'
        })
      ),
      state('shrunken',
        style({
          'background-color': 'green',
          transform: 'translateX(0px) scale(0.5)'
        })
      ),

      transition('normal => highlighted', animate(500)),
      transition('highlighted => normal', animate(800)),
      transition('shrunken <=> *' , animate(500))
      ])
  ] //end animation
})
export class RecipeStartComponent implements OnInit {
  state = 'normal';
  wildState = 'normal';

  onAnimate(){
    this.state == 'normal'? this.state = 'highlighted' : this.state = 'normal';
    this.wildState == 'normal'? this.wildState = 'highlighted' : this.wildState = 'normal';
  }

  onShrink(){
    this.wildState = 'shrunken';
  }

  constructor() { }

  ngOnInit() {
  }

}

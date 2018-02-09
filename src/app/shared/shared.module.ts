import { NgModule } from "@angular/core";
import { DropdownDirective } from "./directives/dropdown.directive";
import { CommonModule } from "@angular/common";
import { ShortenPipe } from "./shorten.pipe";

//mainly for allowing directives to which modules need it
//because we cant have 2 instances of a directive
@NgModule({
    declarations: [
        DropdownDirective,
        ShortenPipe
    ],

    exports: [
        CommonModule, //
        DropdownDirective,
        ShortenPipe
    ]
})
export class SharedModule { }
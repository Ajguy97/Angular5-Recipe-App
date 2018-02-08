import { Directive, Input, HostBinding, HostListener } from '@angular/core';

@Directive({
    selector: '[appDropdown]'
})

export class DropdownDirective{
    //allows us to add css class to element it sits on
    //and remove class once its clicked again
    @HostBinding('class.open') isOpen = false;
    
    @HostListener('click') toggleOpen() {
        this.isOpen = !this.isOpen;
    }

}
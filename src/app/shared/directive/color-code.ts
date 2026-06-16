import { Directive, ElementRef, inject, Input, OnInit, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appColorCode]',
})
export class ColorCode implements OnInit {
  private renderer = inject(Renderer2);
  private el = inject(ElementRef);
  constructor() {}

  @Input('appColorCode') role: string = '';
  
  ngOnInit() {
   if (this.role.toUpperCase() === 'SUPER_ADMIN') {
      this.renderer.setStyle(this.el.nativeElement, 'color', 'red');
    } else if (this.role.toUpperCase() === 'HOSPITAL_ADMIN') {
      this.renderer.setStyle(this.el.nativeElement, 'color', 'blue');
    } else if (this.role.toUpperCase() === 'DOCTOR') {
      this.renderer.setStyle(this.el.nativeElement, 'color', 'green');
    } else {
      this.renderer.setStyle(this.el.nativeElement, 'color', 'black');
    }
  }

}

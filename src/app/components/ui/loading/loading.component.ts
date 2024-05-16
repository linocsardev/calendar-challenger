import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
   selector: 'app-loading',
   standalone: true,
   imports: [],
   templateUrl: './loading.component.html',
   styleUrl: './loading.component.scss'
})
export class LoadingComponent {

   @Input() img = "assets/img/logo-horizontal.png";
   @Input() text = "Cargando";
   @Input() addClass = "";
   @Input() showOption = false;

   @Output() event = new EventEmitter();

   constructor(
   ) { }

   ngOnInit() {
   }

   emitir(event: string) {
      this.event.emit(event);
   }
}

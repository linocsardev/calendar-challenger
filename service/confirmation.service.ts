import { ElementRef, Injectable, TemplateRef, inject } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmationDialogComponent } from '../ui/confirmation-dialog/confirmation-dialog.component';

@Injectable({
   providedIn: 'root'
})
export class ConfirmationService {

   private modal = inject(NgbModal);

   public async create(
      title: string,
      message: string | TemplateRef<any> | ElementRef<HTMLInputElement>,
      dialogSize: "sm" | "lg" | "" | "xl" = "",
      btnOkText: string = "Continuar",
      btnCancelText: string = "Cancelar",
      valuate = undefined,
      focus = false
   ): Promise<boolean> {
      const modalRef = this.modal.open(ConfirmationDialogComponent, {
         size: dialogSize,
         windowClass: 'modal-confirmacion'
      });
      modalRef.componentInstance.title = title;
      modalRef.componentInstance.message = message;
      modalRef.componentInstance.btnOkText = btnOkText;
      modalRef.componentInstance.btnCancelText = btnCancelText;

      modalRef.componentInstance.evaluar = valuate;
      modalRef.componentInstance.focus = focus;

      try {
         let res = await modalRef.result;
         return res;
      } catch (error) {
         return false;
      }
   }

}

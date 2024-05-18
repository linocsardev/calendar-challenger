import { CommonModule } from '@angular/common';
import { Component, Input, TemplateRef, inject } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';


/**
 * Componente de diálogo de confirmación reutilizable.
 *
 * Este componente proporciona un diálogo de confirmación simple con opciones personalizables
 * para el título, mensaje, texto de los botones y comportamientos adicionales.
 *
 * Uso:
 * ```html
 * <app-confirmation-dialog
 *   [title]="Título del Diálogo"
 *   [message]="'Mensaje de confirmación'" <!-- También puede ser un TemplateRef para contenido personalizado -->
 *   [btnOkText]="'Aceptar'"
 *   [btnCancelText]="'Cancelar'"
 *   [evaluate]="customEvaluationFunction"
 *   [focus]="true"
 * ></app-confirmation-dialog>
 * ```
 *
 * @example
 * // Definición de la función de evaluación personalizada
 * customEvaluationFunction(): boolean {
 *   // Lógica de evaluación personalizada
 *   return true; // Devuelve true para permitir la aceptación, false para bloquearla
 * }
 *
 * @export
 * @class ConfirmationDialogComponent
 */
@Component({
    selector: 'app-confirmation-dialog',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './confirmation-dialog.component.html',
    styleUrls: ['./confirmation-dialog.component.scss']
})
export class ConfirmationDialogComponent {

    /**
     * Título del diálogo de confirmación.
     */
    @Input() title: string = "";

    /**
     * Mensaje de confirmación o referencia a un TemplateRef para contenido personalizado.
     */
    @Input() message: string | TemplateRef<any> = "";

    /**
     * Texto para el botón de aceptar.
     */
    @Input() btnOkText: string = "";

    /**
     * Texto para el botón de cancelar.
     */
    @Input() btnCancelText: string = "";

    /**
     * Función de evaluación personalizada que determina si se debe permitir la aceptación del diálogo.
     * Debe devolver un valor booleano.
     */
    @Input() evaluate = () => true;

    /**
     * Indica si se debe enfocar el botón "Aceptar" al abrir el diálogo.
     */
    @Input() focus = false;

    /**
     * Tipo de contenido del mensaje. 1 para string, 2 para TemplateRef.
     * No se usa directamente en las plantillas, sino para la lógica interna.
     */
    typeContent = 1;

    /**
     * Referencia al mensaje de confirmación como TemplateRef en caso de que el tipo de contenido sea 2.
     */
    messaget: TemplateRef<any> | undefined;

    /**
     * Referencia a la instancia activa del modal de Angular Bootstrap.
     */
    private activeModal = inject(NgbActiveModal);

    /**
     * Método llamado después de la inicialización del componente.
     * Configura el tipo de contenido y, si es necesario, enfoca el botón "Aceptar".
     */
    ngOnInit() {
        if (typeof this.message !== "string") {
            this.typeContent = 2;
            this.messaget = this.message;
        }
    }

    ngAfterViewInit() {
        if (this.focus)
            document.getElementById("btnAceptar")?.focus();
    }

    /**
     * Método para cerrar el diálogo y rechazar la acción.
     */
    public decline() {
        this.activeModal.close(false);
    }

    /**
     * Método para aceptar la acción del diálogo.
     * Ejecuta la función de evaluación personalizada si está presente.
     */
    public accept() {
        if (this.evaluate) {
            let next = this.evaluate();
            if (next) {
                this.activeModal.close(true);
            }
        } else {
            this.activeModal.close(true);
        }
    }

    /**
     * Método para descartar el diálogo sin aceptar ni rechazar la acción.
     */
    public dismiss() {
        this.activeModal.dismiss();
    }
}

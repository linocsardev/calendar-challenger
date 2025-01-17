import { NgClass } from '@angular/common';
import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ControlMessagesComponent } from '../../components/ui/control-messages/control-messages.component';
import { LoadingComponent } from '../../components/ui/loading/loading.component';
import { ITask, ITaskAdd } from '../ui-task.interface';
import { ETaskState } from '../helpers';
import { UiTaskService } from '../ui-task.service';

export interface EventChange<T> {
  event: string;
  data: T;
}

@Component({
  selector: 'app-ui-task-form',
  standalone: true,
  imports: [NgClass, ReactiveFormsModule, ControlMessagesComponent, LoadingComponent],
  templateUrl: './ui-task-form.component.html',
  styleUrl: './ui-task-form.component.scss'
})
export class UiTaskFormComponent {


  @Input() action = 'add';
  @Input() item?: ITask;
  @Input() isModal:boolean= true;

  @Output() eventChange = new EventEmitter<EventChange<ITask | undefined>>();

  private modalActiveService = inject(NgbActiveModal)
  private taskServise = inject(UiTaskService)


  submit: boolean = false;
  loading: boolean = false;

  ngOnInit() {
    if(this.action == 'update'){
      alert(`Vamos a editar estos datos ${this.item}`)

    }else{

    }
  }


  form = new FormGroup({
    nombre: new FormControl('', {validators: [Validators.required], nonNullable: true}),
    descripcion: new FormControl('', {validators: [Validators.required], nonNullable: true}),
    fecha: new FormControl( new Date().toISOString().substring(0,10),{validators: [Validators.required], nonNullable: true} ),
    hora: new FormControl( this.obtenerHoraPeruana() , {validators: [Validators.required], nonNullable: true})
  })

  get nombreControl(): FormControl{ return this.form.get('nombre') as FormControl}
  get descripcionControl(): FormControl{ return this.form.get('descripcion') as FormControl}
  get fechaControl(): FormControl{ return this.form.get('fecha') as FormControl}
  get horaControl(): FormControl{ return this.form.get('hora') as FormControl}

  obtenerHoraPeruana(): string{
    let fechahora = new Date();
    const horaPeruana = fechahora.toLocaleTimeString('en-US', {
        timeZone: 'America/Lima',
        hour12: false,
        hour: '2-digit',
        minute: '2-digit',
    });
    return horaPeruana
}

  async save(){
    console.log("Guardando datos ...", this.form)
    this.loading = true
    let datosForm = this.form.value;
    if(this.action == 'add'){
      let newdata: ITaskAdd = {
        name: datosForm.nombre!,
        description: datosForm.descripcion!,
        date: datosForm.fecha!,
        hour: datosForm.hora!,
        state: ETaskState.PENDIENTE,
        createBy: "1",
        idinstitucion: "1"
      }
      this.loading = true;
      let response = await this.taskServise.add(newdata)
      this.loading = false;
      if(response.state == 'success'){
        if(this.isModal){
          this.modalActiveService.close(response.data)
        }else{
          this.eventChange.emit({ event: 'add', data: response.data})
        }
      }
      // if(response.state == 'success'){
      //   if(this.isModal){
      //     this.modalActiveService.close(response.data)
      //   }else{
      //     this.eventChange.emit({ event: "add", data: response.data  })
      //   }
      // }
    }
  }


  close(){
    if(this.isModal){
      this.modalActiveService.dismiss()
    }else {
      this.eventChange.emit({event: 'close', data: undefined})
    }
  }

}

import { Component, inject } from '@angular/core';
import { UiTaskService } from '../ui-task.service';
import { ITask } from '../ui-task.interface';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UiTaskFormComponent } from '../ui-task-form/ui-task-form.component';

@Component({
  selector: 'app-ui-task-list',
  standalone: true,
  imports: [],
  templateUrl: './ui-task-list.component.html',
  styleUrl: './ui-task-list.component.scss'
})
export class UiTaskListComponent {

  tasks?: ITask[];

  private taskService = inject(UiTaskService)
  private modalService = inject(NgbModal)

  ngOnInit(){
    this.list()
  }


  async list(){
    let result:ITask[] = await this.taskService.list()
    console.log("result", result)
    if(result){
      this.tasks = result
      console.log("Las tareas : ",this.tasks)
    }else{
      console.log("No hay datos")
    }
  }


  add(){
    this.openForm()

  }
  update(item: ITask){
    this.openForm('update', item)

  }
  openForm(action = 'add', item?:ITask ){
    try {
      let ref = this.modalService.open(UiTaskFormComponent, { animation: true, backdrop: 'static', size: 'lg', fullscreen: 'xl'})
    } catch (error) {

    }
  }

  delete(item: ITask){

  }


}



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


  list(){
    this.taskService.list().subscribe(resp=>{
      if(resp){

      }
    })


  }


  add(){
    this.openForm()

  }
  update(item: ITask){
    this.openForm('update', item)

  }
  async openForm(action = 'add', item?:ITask ){
    try {
      let ref = this.modalService.open(UiTaskFormComponent, { animation: true, backdrop: 'static', size: 'lg', fullscreen: 'xl'})
      ref.componentInstance.action = action

      if(action == 'update'){
        ref.componentInstance.item = item;
      }

      let task:ITask = await ref.result

      if(action == 'add'){
        this.tasks?.unshift(task)
      }else if(action == "update"){
        if(!item) return;
        Object.assign(item, task)
      }
    } catch (error) {

    }
  }

  delete(item: ITask){

  }


}



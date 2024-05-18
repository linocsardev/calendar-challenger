import { Injectable, inject } from '@angular/core';
import { ITask, ITaskAdd } from './ui-task.interface';
import { ToastrService } from 'ngx-toastr';
import { HttpClient } from '@angular/common/http';
import { Environment } from '../../../environment/environment';
import { ApiService, ResponseCustom } from '../../../service/api.service';
import { LoadingService } from '../../../service/loading.service';


@Injectable({
  providedIn: 'root'
})
export class UiTaskService {


  private API = Environment.base_url
  private apiService = inject (ApiService)
  private loadingService = inject(LoadingService)
  private toastrService = inject(ToastrService)
  private http = inject(HttpClient)

  constructor() { }



   list(){

    return this.http.get(`${this.API}/task/list`)


  }
   async add(item:ITaskAdd){
    let result = await this.apiService.postPrivate<ResponseCustom<ITask>>(`${this.API}/task/create`, item)
    if(result.state == 'success'){
      if(result.data){
        this.toastrService.success(result.message)
      }
    }
    return result

  }
  data(){
    //completar
  }
  update(){
    //completar
  }
  delete(){
    //completar
  }
}

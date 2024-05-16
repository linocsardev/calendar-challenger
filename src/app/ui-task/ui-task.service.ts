import { Injectable } from '@angular/core';
import { ITask } from './ui-task.interface';

@Injectable({
  providedIn: 'root'
})
export class UiTaskService {
  tasks: ITask[] = [
    {
      id: 5,
      nombre: "Learn Angular",
      descripcion: "aaaaaaaaa",
      fecha: "10/11/23",
      hora: "07:33",
      estado: "pendiente",

    },
    {
      id: 34,
      nombre: "Build Angular",
      descripcion: "bbbbbbbbbbbb",
      fecha: "22/02/24",
      hora: "12:33",
      estado: "en curso",

    },
    {
      id: 33,
      nombre: "Deploy Angular",
      descripcion: "ccccc",
      fecha: "02/12/24",
      hora: "18:37",
      estado: "terminado",

    }
  ]

  constructor() { }

  private async simulateCallDB<T>(data: T): Promise<{state: string, data?: T, error?:string}> {
    return new Promise((resolve, reject)=>{
      setTimeout(()=>{
        if(Math.random() > 0.8){
          reject({
            state: "failure",
            error: 'Hubo un error en la DB'
          })
        }else{
          resolve({
            state: 'success',
            data
          })
        }
      }, 1000)
    })
  }


  async list():Promise<ITask[]>{
    console.log("Obteniendo tareas ...")
    try {
      const response = await this.simulateCallDB(this.tasks);
      if (response.state === 'success') {
        console.log('Tareas obtenidas:', response.data);
        return response.data!;
      } else {
        throw new Error(response.error);
      }
    } catch (error) {
      console.error('Error al obtener las tareas:', error);
      throw error;
    }


  }
  async add(item:ITask): Promise<{state: string, data: ITask}>{
    console.log('Agregando tarea...');
    try {
      const response = await this.simulateCallDB(null);
      if (response.state === 'success') {

        console.log('Tarea agregada:', item);
        return {
          state: 'success',
          data:item
        }
      } else {
        throw new Error(response.error);
      }
    } catch (error) {
      console.error('Error al agregar la tarea:', error);
      throw error;
    }

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

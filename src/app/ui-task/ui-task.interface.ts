export interface ITask {

  id: number;
  name: string;
  description: string;
  date: string;
  hour: string;
  state: string;
  createAt: string;
  createBy: string;
  idinstitucion: string;
}

export interface ITaskOmitAdd {
  id: number,
  createAt: string
}
export interface ITaskAdd extends Omit<ITask, keyof ITaskOmitAdd> {}


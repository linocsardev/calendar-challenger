export enum ETaskState {
  PENDIENTE =  "1",
  CULMINADO =  "2"
}
export enum ETaskStateLabel {
  PENDIENTE = 'pendiente',
  CULMINADO = 'culminado'
}

export enum ETaskStateFilter {
  VOID = '',
  PENDIENTE= ETaskState.PENDIENTE,
  CULMINADO= ETaskState.CULMINADO
}

export interface Notification {
  id: number,
  message: string,
  date: Date,
  status: Status,
}

export enum Status {
  READ = 'READ',
  UNREAD = 'UNREAD'
}

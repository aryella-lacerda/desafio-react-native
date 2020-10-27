// @flow
export type ToDo = {
  id: number,
  title: string,
  description: string,
  isDone: boolean,
  reminder?: Date,
  priority?: string
}

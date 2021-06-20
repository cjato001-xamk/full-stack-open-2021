export interface IPerson {
  id: number
  name: string
  number: string
}

export type ICreatePerson = Pick<IPerson, 'name' | 'number'>

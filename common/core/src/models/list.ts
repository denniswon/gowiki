export class List {

  public _id: string
  public name: string
  public user: string

  public description: string
  public banner: string

  public users?: string[]
  public tweets?: string[]

  public createdAt: number
  public updatedAt: number

  public static fromJSON(obj: Object): List {
    let item: List = Object.assign(new List(), obj)
    return item
  }

}

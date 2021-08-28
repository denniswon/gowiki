export class Conversation {

  public _id: string

  public participants: string[]
  public messages: string[]

  public createdAt: number
  public updatedAt: number

  public static fromJSON(obj: Object): Conversation {
    let item: Conversation = Object.assign(new Conversation(), obj)
    return item
  }

}

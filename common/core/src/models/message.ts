export class Message {

  public _id: string

  public sender: string
  public content: string

  public createdAt: number
  public updatedAt: number

  public static fromJSON(obj: Object): Message {
    let item: Message = Object.assign(new Message(), obj)
    return item
  }

}

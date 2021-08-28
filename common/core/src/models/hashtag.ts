export class Hashtag {

  public _id: string

  public content: string
  public count: number
  public tweets: string[]

  public createdAt: number
  public updatedAt: number

  public static fromJSON(obj: Object): Hashtag {
    let item: Hashtag = Object.assign(new Hashtag(), obj)
    return item
  }

}

export class Tweet {

  public _id: string

  public description: string

  public user: string

  public images?: string[]

  public likes?: string[]

  public parent?: string

  public retweets?: string[]

  public replies?: string

  public timezone?: string

  public thread?: string[]

  public username?: string

  public name?: string

  public retweet?: string

  public createdAt: number

  public updatedAt: number

  public static fromJSON(obj: Object): Tweet {
    let item: Tweet = Object.assign(new Tweet(), obj)
    return item
  }
}

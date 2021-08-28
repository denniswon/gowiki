export class Account {

  public _id: string
  public username: string
  public name: string
  public email: string

  public theme: string = 'light'
  
  public description: string
  public profileImg: string
  public banner: string
  public location: string

  public following?: string[]
  public followers?: string[]
  public tweets?: string[]
  public retweets?: string[]

  public likes?: string[]
  public bookmarks?: string[]
  public lists?: string[]
  public notifications?: string[]
  public conversations?: string[]

  public createdAt: number
  public updatedAt: number

  public static fromJSON(obj: Object): Account {
    let item: Account = Object.assign(new Account(), obj)
    return item
  }

}

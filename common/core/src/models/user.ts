export class UserMeta {
  /** has app? */
  ha?: boolean

  /** app version */
  av?: string

  /** last team id */
  lt?: string

  /** last status */
  st?: string

  /** chrome extension version */
  ce?: string

  /** onboarded */
  to?: number

  /** sounds disabled */
  sdis?: boolean

}

export class User {
  public id: string

  public name: string

  public nickname?: string

  public password?: string

  public email?: string

  public domain?: string

  public profile_img?: string

  public timezone?: string

  // user meta
  public meta?: UserMeta

  // whether user is an anonymous (pre-auth) user
  public anonymous?: boolean

  public static fromJSON(obj: Object): User {
    let item: User = Object.assign(new User(), obj)
    if (!item.meta) item.meta = {}
    return item
  }

  public static meta(user: User) {
    return user ? user.meta || {} : {}
  }
}

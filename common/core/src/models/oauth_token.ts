export class OAuthToken<MetaType> {
  public name: string

  public access: string

  public refresh?: string

  public expires_at?: Date

  public meta?: MetaType

  public team?: string

  public static fromJSON<MetaType>(obj: any) {
    let item: OAuthToken<MetaType> = Object.assign(new OAuthToken(), obj)

    if (obj.expires_at) item.expires_at = new Date(obj.expires_at)
    if (!item.meta) item.meta = {} as any

    return item
  }
}

import {
  Role
} from '../config'
import { Member } from './member'

// for user-team metadata
export class TeamMeta {
  /** invites locked */
  locked?: boolean

  /** external members blocked? */
  noext?: boolean

  /** chat off */
  nochat?: boolean

  /** crosstalk mode enabled */
  crosstalk?: boolean

  /** default to hear-before-accept */
  hba?: boolean

  /** Allow SSO only */
  sso?: boolean

  /** Disallow autojoin for org members */
  private?: boolean

  /** Hide Meeting Titles: Only meeting participants can see meeting titles */
  hmt?: boolean
}

export class UserTeamMeta {
  roomNotifications: { [id: string]: boolean } = {}
}

export class Team {
  public id: string

  public name: string

  public members?: Member[]

  public placeholder?: boolean

  public last_doc?: string

  public meta?: TeamMeta

  public referrer?: string

  public async?: string

  public role?: Role

  public user_team_meta?: UserTeamMeta

  // whether user is a guest (not a member) of this workspace
  public guest?: boolean

  public static fromJSON(obj: any) {
    let item: Team = Object.assign(new Team(), obj)
    item.user_team_meta = Object.assign(new UserTeamMeta(), obj.user_team_meta)
    return item
  }

  public static meta(team: Team): TeamMeta {
    return team ? team.meta || {} : {}
  }
}

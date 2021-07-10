import { Role } from '../config'
import { Team } from './team'

export class Member {
  public id: string

  public name: string

  public nickname?: string

  public profile_img?: string

  public role?: Role

  public timezone?: string

  public email?: string

  public mobile?: number

  public static fromJSON(obj: Object) {
    let item = Object.assign(new Member(), obj)
    return item
  }
}

export type MemberMap = { [id: string]: Member }

export const makeMemberMap = (team: Team) =>
  team.members.reduce(
    (r, v) => {
      r[v.id] = v
      return r
    },
    {} as MemberMap
  )

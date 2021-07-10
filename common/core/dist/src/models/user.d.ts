export declare class UserMeta {
    /** has app? */
    ha?: boolean;
    /** app version */
    av?: string;
    /** last team id */
    lt?: string;
    /** last status */
    st?: string;
    /** chrome extension version */
    ce?: string;
    /** tandem onboarded */
    to?: number;
    /** sounds disabled */
    sdis?: boolean;
    /** doc titles hidden */
    dthd?: boolean;
    /** offline team hidden */
    hdof?: boolean;
    /** on click member action */
    ocm?: string;
}
export declare class User {
    id: string;
    name: string;
    nickname?: string;
    password?: string;
    email?: string;
    domain?: string;
    profile_img?: string;
    timezone?: string;
    meta?: UserMeta;
    anonymous?: boolean;
    static fromJSON(obj: Object): User;
    static meta(user: User): UserMeta;
}

export default interface ProfileData {
  avatar: string;
  discordStatus: string;
  username: string;
  displayName: string;
  status: string;
  age: number;
  activity: {
    hidden: boolean;
    bigImage?: string;
    bigImageTitle?: string;
    smallImage?: string;
    name?: string;
    state?: string;
    details?: string;
    timestamps?: { start: number; end: number };
  };
}

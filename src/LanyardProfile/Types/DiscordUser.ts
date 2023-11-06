export default interface DiscordUser {
  global_name: string | null;
  avatar_decoration: null | string;
  display_name: string | null;
  username: string;
  public_flags: number;
  id: string;
  discriminator: string;
  bot: boolean;
  avatar: string;
}

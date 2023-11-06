export default interface Activity {
  type: number;
  state: string;
  name: string;
  id: string;
  flags?: number;
  emoji?: {
    name: string;
    id?: string;
    animated?: boolean;
  };
  created_at: number;
  application_id?: string;
  timestamps?: {
    start: number;
    end?: number;
  };
  sync_id?: string;
  session_id?: string;
  party?: {
    id: string;
    size?: {
      current_size: number;
      max_size: number;
    };
  };
  details?: string;
  buttons?: string[];
  assets?: {
    small_text: string;
    small_image: string;
    large_text: string;
    large_image: string;
  };
}

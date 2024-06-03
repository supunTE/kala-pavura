import { CorePost } from './core-post';

export type GroupPost = {
  userId: string;
  asAdmin: boolean;
} & CorePost;

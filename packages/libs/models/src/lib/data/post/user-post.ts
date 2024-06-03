import { CorePost } from './core-post';

export type UserPost = {
  userId: string;
} & CorePost;

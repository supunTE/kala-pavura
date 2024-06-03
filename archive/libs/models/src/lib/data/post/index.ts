import { GroupPost } from './group-post';
import { UserPost } from './user-post';

export * from './core-post';
export * from './user-post';
export * from './group-post';

export type Post = GroupPost | UserPost;

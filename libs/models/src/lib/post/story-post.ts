import { CorePostContent } from './core-post';

export type StoryPost = CorePostContent<StoryContext> & {
  storyId: string;
  part: number;
};

export type StoryContext = {
  caption: string;
  description: string;
  storyId: string;
  part: number;
  author: string;
};

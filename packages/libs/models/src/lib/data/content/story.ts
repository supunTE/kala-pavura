import { GroupId } from '../../workspace';

import { CoverData } from './cover';

export type StoryId = `S-${string}`;

export type Story = {
  id: StoryId;
  title: string;
  description: string;
  published: boolean;
  groupIds: GroupId[];
  authorIds: string[];
  chapters: StoryChapter[];
  coverData: CoverData;
};

export type StoryChapterId = `${StoryId}_C-${string}`;

export type StoryChapter = {
  id: StoryChapterId;
  index: number;
  title: string;
  description: string;
  published: boolean;
  authorIds: string[];
  contentJSON: string;
  contentHTML: string;
  coverData: CoverData;
};

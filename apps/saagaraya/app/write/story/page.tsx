import { TextEditor } from '@/components/text-editor';

import { ContentTypes } from '../../../../../libs/models/src/lib/data';

export default function WriteStoryPage() {
  return (
    <div className="h-screen">
      <TextEditor contentType={ContentTypes.StoryChapter} />
    </div>
  );
}

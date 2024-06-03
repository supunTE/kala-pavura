import { TextEditor } from '@/components/text-editor';

import { ContentTypes } from '@kala-pavura/models';

export default function WriteStoryPage() {
  return (
    <div className="h-screen">
      <TextEditor contentType={ContentTypes.StoryChapter} />
    </div>
  );
}

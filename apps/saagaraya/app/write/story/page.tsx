import { ContentTypes } from '@kala-pavura/models';

import { TextEditor } from '@/components/text-editor';

export default function WriteStoryPage() {
  return (
    <div className="h-screen">
      <TextEditor contentType={ContentTypes.StoryChapter} />
    </div>
  );
}

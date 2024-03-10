import { TextEditor } from '@/components/text-editor';

export default function WriteStoryPage() {
  return (
    <div className="h-screen">
      <TextEditor id="story-text-editor" />
    </div>
  );
}

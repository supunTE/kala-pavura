import cs from 'classnames';

import { ContentCardComponent, dummy_posts } from '@/components/content-card';

export default function ProfilePage() {
  return (
    <div
      className={cs(
        'm-auto overflow-hidden p-5',
        'grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5',
        'mt-10 max-w-screen-2xl',
      )}>
      {dummy_posts.map((post) => (
        <ContentCardComponent
          key={post.id}
          id={post.id}
          title={post.title}
          imageSrc={post.imageSrc}
          imageAlt={post.imageAlt}
          description={post.description}
        />
      ))}
    </div>
  );
}

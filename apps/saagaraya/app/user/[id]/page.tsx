import cs from 'classnames';

import { getBooksByUserId } from '@/actions/book';
import { ContentCardComponent } from '@/components/content-card';

export default async function ProfilePage({
  params,
}: {
  params: { id: string };
}) {
  const books = await getBooksByUserId(params.id);

  return (
    <div
      className={cs(
        'm-auto overflow-hidden p-5',
        'grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5',
        'mt-10 max-w-screen-2xl',
      )}>
      {books.map((book) => (
        <ContentCardComponent
          key={book.id}
          id={book.id}
          title={book.title}
          imageSrc={book.coverData.image.regular}
          imageAlt={book.coverData.image.alt}
          description={book.description}
        />
      ))}
    </div>
  );
}

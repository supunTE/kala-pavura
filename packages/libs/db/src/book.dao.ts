import { CoverImage, ExtendedUser, Story, StoryId } from '@kala-pavura/models';
import { Firestore } from 'firebase-admin/firestore';
import { nanoid } from 'nanoid';

export class BookFirestoreDao {
  constructor(private db: Firestore) {}

  public async createBook(
    title: string,
    description: string,
    authorId: string,
    image: CoverImage,
  ): Promise<Story> {
    const storyId: StoryId = `S-${nanoid()}`;

    const book: Story = {
      id: storyId,
      title,
      description,
      published: true,
      groupIds: [],
      authorIds: [authorId],
      chapters: [],
      coverData: {
        image,
        likes: [],
        likesCount: 0,
        comments: [],
        commentsCount: 0,
        timestamps: {
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      },
    };

    const collectionRef = this.db.collection('books');
    await collectionRef.doc(storyId).set(book);
    return book;
  }
}

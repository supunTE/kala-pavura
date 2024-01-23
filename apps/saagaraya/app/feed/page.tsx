import cs from 'classnames';

import { BackgroundComponent } from '@/components/background';

import { ContentCardComponent } from './components';

type Post = {
  id: string;
  imageSrc: string;
  imageAlt: string;
  title: string;
  description: string;
};
const posts: Post[] = [
  {
    id: '1',
    imageSrc:
      'https://images.unsplash.com/photo-1705648265844-289eeb49d1f5?q=80&w=2028&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    imageAlt: 'A close up of a staircase made out of red blocks',
    title: 'රක්ත කවුළු',
    description:
      'තැනින් තැන වැඩුණු තෘණ වසා ගත් සෙවණැලි කාගේ දැයි සිතමින් කුහුඹුවන් මහා වෘක්ෂ මූල අද්දර ගුහාවකින් එළියට විත් ඇවිද යන්නාහු ය. මම අද්දර වූ තවත් වෘක්ෂ මූලයක හිඳ එය සිතුවම් කරන්නෙමි.',
  },
  {
    id: '2',
    imageSrc:
      'https://images.unsplash.com/photo-1580689473660-bf6c02088dbd?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    imageAlt: 'A green and white tractor on a field',
    title: 'යුටෝපියා - සොඳුරු නවාතැන',
    description:
      'ඒ බිම් නම් නමින් පමණක් ම නොව රුවිනුත් යුටොපියා ම ය. එම නුවරට පමණක් රුවින් දෙවැනි සොඳුරු දිව්‍යාංගනාවෝ එහි වෙසෙති. මේ කතාන්දරය එම සොඳුරු කාන්තාවෝ දෙපළ ගැන ය.',
  },
  {
    id: '3',
    imageSrc:
      'https://images.unsplash.com/photo-1559825481-12a05cc00344?q=80&w=1965&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    imageAlt: 'A red fox sitting in tall grass',
    title: 'සයුර',
    description:
      'දකුණු කදුකරයට පසු පසින් ඇත්තේ, සොඳුරු වනාන්තරයක් නොව, මළ මිනී පිරුණු මලාලන්තයකි. වසර දහස් ගණනක සිට මේ භූමිය මත අසල්වැසි රාජ්‍යධානි යුද්ධ කරමින්, මිනිසුන්ගේ ලේ සලමින් මේ භූමිය සෑදී ඇත.',
  },
  {
    id: '4',
    imageSrc:
      'https://images.unsplash.com/photo-1510218830377-2e994ea9087d?q=80&w=2032&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    imageAlt:
      'A person wearing a black jacket and black pants on a snow covered mountain',
    title: 'අඳුරු මං සන්ධියේ අබිරහස',
    description:
      'තැනින් තැන වැඩුණු තෘණ වසා ගත් සෙවණැලි කාගේ දැයි සිතමින් කුහුඹුවන් මහා වෘක්ෂ මූල අද්දර ගුහාවකින් එළියට විත් ඇවිද යන්නාහු ය. මම අද්දර වූ තවත් වෘක්ෂ මූලයක හිඳ එය සිතුවම් කරන්නෙමි.',
  },
  {
    id: '5',
    imageSrc:
      'https://images.unsplash.com/photo-1695540595388-6c57bcf8682c?q=80&w=1877&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    imageAlt:
      'A person wearing a black jacket and black pants on a snow covered mountain',
    title: 'නෝර්වේ ගමන',
    description:
      'ඒ බිම් නම් නමින් පමණක් ම නොව රුවිනුත් යුටොපියා ම ය. එම නුවරට පමණක් රුවින් දෙවැනි සොඳුරු දිව්‍යාංගනාවෝ එහි වෙසෙති. මේ කතාන්දරය එම සොඳුරු කාන්තාවෝ දෙපළ ගැන ය.',
  },
  {
    id: '6',
    imageSrc:
      'https://images.unsplash.com/photo-1702444572159-6d316468c92e?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8cmVkcm9zZXN8ZW58MHx8MHx8fDA%3D',
    imageAlt:
      'A person wearing a black jacket and black pants on a snow covered mountain',
    title: 'රෝස මල් පෙති හැළුනා',
    description:
      'තැනින් තැන වැඩුණු තෘණ වසා ගත් සෙවණැලි කාගේ දැයි සිතමින් කුහුඹුවන් මහා වෘක්ෂ මූල අද්දර ගුහාවකින් එළියට විත් ඇවිද යන්නාහු ය. මම අද්දර වූ තවත් වෘක්ෂ මූලයක හිඳ එය සිතුවම් කරන්නෙමි.',
  },
  {
    id: '7',
    imageSrc:
      'https://images.unsplash.com/photo-1553465528-5a213ccc0c7b?q=80&w=1996&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    imageAlt:
      'A person wearing a black jacket and black pants on a snow covered mountain',
    title: 'නොපෙනෙන සෙවනැළි',
    description:
      'දකුණු කදුකරයට පසු පසින් ඇත්තේ, සොඳුරු වනාන්තරයක් නොව, මළ මිනී පිරුණු මලාලන්තයකි. වසර දහස් ගණනක සිට මේ භූමිය මත අසල්වැසි රාජ්‍යධානි යුද්ධ කරමින්, මිනිසුන්ගේ ලේ සලමින් මේ භූමිය සෑදී ඇත.',
  },
  {
    id: '8',
    imageSrc:
      'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=1968&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    imageAlt:
      'A person wearing a black jacket and black pants on a snow covered mountain',
    title: 'ජෝසෆ් බලකොටුව',
    description:
      'තැනින් තැන වැඩුණු තෘණ වසා ගත් සෙවණැලි කාගේ දැයි සිතමින් කුහුඹුවන් මහා වෘක්ෂ මූල අද්දර ගුහාවකින් එළියට විත් ඇවිද යන්නාහු ය. මම අද්දර වූ තවත් වෘක්ෂ මූලයක හිඳ එය සිතුවම් කරන්නෙමි.',
  },
];
export default function FeedPage() {
  return (
    <>
      <BackgroundComponent moreDarken={true} />
      <div className={cs('h-full overflow-y-scroll')}>
        <div
          className={cs(
            'p-10 m-auto',
            'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 gap-5',
            'max-w-screen-2xl ',
          )}>
          {posts.map((post) => (
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
      </div>
    </>
  );
}

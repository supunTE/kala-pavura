import { Fragment } from 'react';
import cs from 'classnames';
import Link from 'next/link';

const navLinks = [
  {
    title: 'පවුර',
    href: '/feed',
  },
  {
    title: 'ලියන පුවරුව',
    href: '/write/story',
  },
];

export function NavLinks() {
  return (
    <div className="top-16 z-40 m-auto hidden rounded-full sm:block">
      <ul
        className={cs(
          'flex items-center justify-center gap-2',
          'text-sm font-bold',
        )}>
        {navLinks.map((link) => (
          <Fragment key={link.title}>
            <li>
              <Link
                href={link.href}
                className="hover:ring-curious-blue-400 whitespace-nowrap rounded-full bg-gray-300/10 p-2 px-4 transition-all duration-300 hover:bg-gray-300/40 hover:text-zinc-100 hover:ring-1">
                {link.title}
              </Link>
            </li>
          </Fragment>
        ))}
      </ul>
    </div>
  );
}

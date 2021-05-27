import { FC } from "react";

interface TableOfContentsLinkType {
  id: string;
  text: string;
}

interface TableOfContentsPropType {
  links: TableOfContentsLinkType[];
}

const scrollToId = (id: string): void => {
  const elementToScrollTo = document.getElementById(id);
  if (!elementToScrollTo) return;

  window.location.hash = id === "main-headline" ? "" : id;
  const headerOffset = 40;
  const elementPosition = elementToScrollTo.offsetTop;
  const offsetPosition = elementPosition - headerOffset;

  window.scrollTo({
    top: offsetPosition,
    behavior: "smooth",
  });
};

export const TableOfContents: FC<TableOfContentsPropType> = ({ links }) => {
  return (
    <nav className='hidden fixed lg:block top-18 right-4 w-1/6 p-8'>
      <h4 className='font-bold mb-2 text-gray-500'>Inhalte</h4>
      <ul>
        {links.map(({ id, text }) => (
          <li key={id} className='mb-2'>
            <button
              onClick={() => scrollToId(id)}
              className={[
                "text-left cursor-pointer",
                "text-gray-400 hover:text-blue-500 transition",
                "focus:ring-2 focus:ring-offset-gray-100 focus:ring-offset-2",
                "focus:outline-none",
              ].join(" ")}
            >
              {text}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
};

import { FC, ReactNode, useState } from "react";
import styles from "./Accordion.module.css";

interface AccordionItemType {
  id: string;
  title: string;
  content: ReactNode;
}

interface AccordionPropType {
  items: AccordionItemType[];
}

type StyleGetterType = (props: { isActive: boolean }) => Record<string, string>;

const filterStyles = (
  ...classes: (string | null | undefined | false)[]
): string => classes.filter(Boolean).join(" ");

const getStyles: StyleGetterType = ({ isActive }) => ({
  wrapper: filterStyles(
    styles.wrapper,
    !isActive && "border-b border-b-gray-50"
  ),
  title: filterStyles(
    "p-4 block w-full text-sm text-left bg-gray-50 border border-white",
    "transition rounded relative focus:outline-none focus:z-10",
    "hover:bg-gray-50 group hover:border-blue focus-offset"
  ),
  content: filterStyles(
    "rounded bg-gray-100 m-0 leading-7 p-4 overflow-hidden",
    "max-w-none w-full"
  ),
});

export const Accordion: FC<AccordionPropType> = ({ items }) => {
  const [activeItemId, setActiveItemId] = useState<string | null>(null);
  return (
    <div>
      {items.map(({ id, title, content }) => {
        const isActive = id === activeItemId;
        const classes = getStyles({ isActive });
        return (
          <div key={id} className={classes.wrapper}>
            <button
              className={classes.title}
              onClick={() => {
                if (activeItemId === id) return setActiveItemId(null);
                setActiveItemId(id);
              }}
              tabIndex={isActive ? 1 : 0}
            >
              <h2
                style={{ margin: 0 }}
                id={id}
                className='group-hover:text-blue inline'
              >
                {title}
              </h2>
              <span className='float-right font-light text-xl text-gray-400'>
                {isActive ? "–" : "+"}
              </span>
            </button>
            {isActive && (
              <p style={{ margin: 0 }} className={classes.content}>
                {content}
              </p>
            )}
          </div>
        );
      })}
    </div>
  );
};

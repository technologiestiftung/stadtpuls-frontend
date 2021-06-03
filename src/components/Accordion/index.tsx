import { FC, ReactNode, useState } from "react";

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
  wrapper: filterStyles("-ml-4", !isActive && "border-b border-b-gray-50"),
  title: filterStyles(
    "p-4 block w-full text-sm text-left bg-gray-50 border border-white",
    "transition rounded relative zi-10 focus:outline-none",
    !isActive && "hover:bg-blue-50 group hover:border-blue-500",
    !isActive ? "focus-offset" : "cursor-default"
  ),
  content: filterStyles(
    "rounded bg-gray-100 m-0 leading-7 p-4 overflow-hidden",
    "max-w-none w-full"
  ),
});

export const Accordion: FC<AccordionPropType> = ({ items }) => {
  const [activeItemId, setActiveItemId] = useState<string>(items[0].id);
  return (
    <div>
      {items.map(({ id, title, content }) => {
        const isActive = id === activeItemId;
        const styles = getStyles({ isActive });
        return (
          <div
            key={id}
            className={styles.wrapper}
            style={{
              width: "calc(100% + 32px)",
            }}
          >
            <button
              className={styles.title}
              onClick={() => setActiveItemId(id)}
              tabIndex={isActive ? 1 : -1}
            >
              <h2
                style={{ margin: 0 }}
                id={id}
                className='group-hover:text-blue-500'
              >
                {title}
                <span className='float-right font-light text-gray-400'>
                  {isActive ? "–" : "+"}
                </span>
              </h2>
            </button>
            {isActive && (
              <p style={{ margin: 0 }} className={styles.content}>
                {content}
              </p>
            )}
          </div>
        );
      })}
    </div>
  );
};

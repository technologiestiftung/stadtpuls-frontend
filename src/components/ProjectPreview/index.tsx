import { useEffect, useState, useRef, FC } from "react";
import Link from "next/link";
import { LinePath } from "@components/LinePath";
import { PublicProject } from "@lib/hooks/usePublicProjects";

export const ProjectPreview: FC<PublicProject> = ({
  id,
  name,
  location,
  description,
  records,
}) => {
  const parentRef = useRef<HTMLDivElement>(null);
  const [svgWrapperWidth, setSvgWrapperWidth] = useState(0);

  const updateWidthAndHeight = (): void => {
    if (parentRef.current === null) return;
    setSvgWrapperWidth(parentRef.current.offsetWidth);
  };

  useEffect(() => {
    if (parentRef.current === null) return;
    setSvgWrapperWidth(parentRef.current.offsetWidth);

    window.addEventListener("resize", updateWidthAndHeight);

    return () => window.removeEventListener("resize", updateWidthAndHeight);
  }, []);

  return (
    <div
      className={[
        "bg-white shadow-lg hover:bg-blue-25",
        "border border-blue-50",
        "cursor-pointer transition rounded-md",
        "relative overflow-hidden",
      ].join(" ")}
      style={{ paddingBottom: 100 }}
    >
      <Link href={`${id}`}>
        <a sx={{ textDecoration: "none", color: "text" }}>
          <div
            ref={parentRef}
            className={[
              "grid sm:grid-cols-2 gap-4",
              "px-4 py-3 sm:px-5 sm:py-4 md:px-8 md:py-7",
            ].join(" ")}
          >
            <div>
              <h3 className='text-blue-500 text-xl sm:text-2xl md:text-3xl font-semibold'>
                {name}
              </h3>
              <h4 className='mt-4 mb-2 font-bold'>{location}</h4>
              <p className='text-base'>{description}</p>
            </div>
          </div>
          <svg
            viewBox={`0 0 ${svgWrapperWidth} 80`}
            xmlns='http://www.w3.org/2000/svg'
            width={svgWrapperWidth}
            height={80}
            className='overflow-visible absolute bottom-0 left-0 right-0'
          >
            <LinePath
              width={svgWrapperWidth}
              height={80}
              //FIXME: Figure out how we want to handle multiple data points
              data={(records && records[0]) || []}
            />
          </svg>
        </a>
      </Link>
    </div>
  );
};

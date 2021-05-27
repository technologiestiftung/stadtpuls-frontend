import { Meta, Story } from "@storybook/react";
import { FC } from "react";
import { TableOfContents } from ".";

export default {
  title: "Layout/TableOfContents",
  component: TableOfContents,
} as Meta;

const FakeContent: FC<{
  title: string;
  id: string;
}> = ({ title, id }) => (
  <div
    className={[
      "container mx-auto prose lg:prose-lg 2xl:prose-2xl prose-blue",
      "px-4 py-6 sm:px-8 sm:py-12 md:px-12 md:py-18 lg:px-18 lg:py-24",
    ].join(" ")}
  >
    <h2 id={id}>{title}</h2>
    <p>
      Lorem away dolizzle bling bling amizzle, consectetuer adipiscing shizznit.
      Nullam daahng dawg shit, fizzle volutpat, suscipit quizzle, bow wow wow
      vizzle, things. Pellentesque eget go to hizzle. Sizzle erizzle. For sure
      izzle dolizzle dapibizzle sheezy tempizzle ass. Mauris stuff nibh izzle
      turpizzle. Vestibulum izzle tortor. Shiz sure rhoncizzle nisi. In gizzle
      for sure platea dictumst. Mah nizzle dapibizzle. Curabitur tellus urna,
      pretium mofo, mattizzle shit, eleifend vitae, nunc. Gangsta suscipizzle.
      Crunk yo mamma velizzle rizzle fo shizzle.
    </p>
  </div>
);

const Template: Story<{
  links: { id: string; text: string }[];
}> = ({ links }) => (
  <>
    <TableOfContents links={links} />
    {links.map(({ id, text }) => (
      <FakeContent title={text} id={id} key={id} />
    ))}
  </>
);

export const Default = Template.bind({});
Default.args = {
  links: [
    { id: "a", text: "Ingredients" },
    { id: "b", text: "Preparation" },
    { id: "c", text: "Serving" },
  ],
};

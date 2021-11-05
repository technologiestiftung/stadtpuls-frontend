import { Story, Meta } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { Pagination, PaginationType } from ".";

export default {
  title: "UI Elements/Pagination",
  component: Pagination,
} as Meta;

const Template: Story<PaginationType> = args => (
  <div className='w-full flex justify-center'>
    <Pagination {...args} />
  </div>
);

export const FewPages = Template.bind({});
FewPages.args = {
  currentPage: 1,
  pageCount: 3,
  onPageChange: action("Page changed to index:"),
};

export const ManyPages = Template.bind({});
ManyPages.args = {
  currentPage: 1,
  pageCount: 37,
  onPageChange: action("Page changed to index:"),
};

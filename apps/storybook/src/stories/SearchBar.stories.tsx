import { SearchBar } from '@daeng-ggu/design-system';
import type { Meta, StoryFn } from '@storybook/react';

export default {
  title: 'Daeng-ggu/SearchBar',
  component: SearchBar,
  argTypes: {
    name: { control: 'text', description: 'Input name attribute' },
    placeholder: { control: 'text', description: 'Placeholder text for the search bar' },
    keyword: { control: 'text', description: 'Keyword value of the input field' },
    width: { control: 'text', description: 'Width of the search bar' },
    height: { control: 'text', description: 'Height of the search bar' },
    onChange: { action: 'inputChanged', description: 'Triggered when the input value changes' },
  },
} as Meta;

const Template: StoryFn = (args) => <SearchBar {...args} />;

export const Default = Template.bind({});
Default.args = {
  placeholder: 'Search...',
  name: 'search',
  keyword: '',
};

export const WithName = Template.bind({});
WithName.args = {
  name: 'search',
  placeholder: 'Search with name attribute',
  keyword: '',
};

import type { Meta, StoryObj } from '@storybook/react';
import MarkDownViewer from '../components/MarkDownViewer';

const meta = {
  title: 'Example/MarkDownViewer',
  component: MarkDownViewer,
  parameters: {
    layout: 'centered',
  },

  argTypes: {
    content: {
      control: {
        type: 'text',
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof MarkDownViewer>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    content:
      '# Hello World \n This is a test of the markdown viewer \n ## This is a subheader \n ### This is a subsubheader \n > This is a quote \n - This is a list \n - This is another list \n ```js \n const test = "test"; \n ``` \n [This is a link](https://www.google.com) \n ![This is an image](https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png) ',
  },
};

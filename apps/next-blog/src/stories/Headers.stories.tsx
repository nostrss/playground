import type { Meta, StoryObj } from '@storybook/react';
import Header from '../components/Header';
import { menus } from '@/app/layout';

const meta = {
  title: 'Example/Header',
  component: Header,
  decorators: [
    (Story) => (
      <div style={{ width: '1192px' }}>
        <Story />
      </div>
    ),
  ],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    menus: {
      control: {
        type: 'array',
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Header>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    menus: menus,
  },
};

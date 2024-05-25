import type { Meta, StoryObj } from '@storybook/react';
import SkeletonCard from '@/components/SkeletonCard';

const meta = {
  title: 'Example/SkeletonCard',
  component: SkeletonCard,
  decorators: [
    (Story) => (
      <div
        style={{
          width: '920px',
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
        }}
      >
        <Story />
      </div>
    ),
  ],
  parameters: {
    layout: 'centered',
  },

  argTypes: {},
  tags: ['autodocs'],
} satisfies Meta<typeof SkeletonCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};

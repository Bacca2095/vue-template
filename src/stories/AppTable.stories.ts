import type { Meta, StoryFn } from '@storybook/vue3'

import AppTable from '@/components/table/AppTable.vue'
import AppTypography from '@/components/typography/AppTypography.vue'

export default {
  title: 'Components/AppTable',
  component: AppTable,
  argTypes: {
    headers: {
      control: 'object',
      description: 'Array of column headers with text and key properties.',
    },
    data: {
      control: 'object',
      description: 'Array of data rows.',
    },
    primaryKey: {
      control: 'text',
      description: 'Key used as the unique identifier for rows.',
    },
    hoverable: {
      control: 'boolean',
      description: 'Enable hover effect on rows.',
      defaultValue: false,
    },
    loading: {
      control: 'boolean',
      description: 'Show loading state.',
      defaultValue: false,
    },
  },
  tags: ['autodocs'],
} as Meta

const Template: StoryFn<typeof AppTable> = (args) => ({
  components: { AppTable, AppTypography },
  setup() {
    return { args }
  },
  template: `
    <Table v-bind="args" @rowClick="handleRowClick" @rowDblClick="handleRowDblClick">
      <template #cell-name="{ value }">
        <AppTypography size="sm" weight="semibold" class="text-blue-600">{{ value }}</AppTypography>
      </template>
      <template #cell-price="{ value }">
        <AppTypography size="sm" class="text-green-600">{{ value }}</AppTypography>
      </template>
    </Table>
  `,
  methods: {
    handleRowClick(row: unknown) {
      console.log('Row clicked:', row)
    },
    handleRowDblClick(row: unknown) {
      console.log('Row double-clicked:', row)
    },
  },
})

export const Default: StoryFn<typeof AppTable> = Template.bind({})
Default.args = {
  headers: [
    { text: 'Name', key: 'name' },
    { text: 'Category', key: 'category' },
    { text: 'Price', key: 'price' },
  ],
  data: [
    { name: 'Apple', category: 'Fruit', price: '$1' },
    { name: 'Carrot', category: 'Vegetable', price: '$0.5' },
    { name: 'Bread', category: 'Bakery', price: '$2' },
  ],
  primaryKey: 'name',
  hoverable: true,
  loading: false,
}

export const Loading: StoryFn<typeof AppTable> = Template.bind({})
Loading.args = {
  ...Default.args,
  loading: true,
  data: [],
}

export const NoData: StoryFn<typeof AppTable> = Template.bind({})
NoData.args = {
  ...Default.args,
  data: [],
}

import type { Meta, StoryFn } from '@storybook/vue3'

import AppTable from '@/components/table/AppTable.vue'

export default {
  title: 'Components/AppTable',
  component: AppTable,
  argTypes: {
    headers: { control: 'object' },
    data: { control: 'object' },
    primaryKey: { control: 'text' },
    hoverable: { control: 'boolean' },
    loading: { control: 'boolean' },
    onRowClick: { action: 'rowClick' },
    onRowDblClick: { action: 'rowDblClick' },
  },
} as Meta<typeof AppTable>

const Template: StoryFn<typeof AppTable> = (args) => ({
  components: { AppTable },
  setup() {
    return { args }
  },
  template: `<AppTable v-bind="args" @rowClick="args.onRowClick" @rowDblClick="args.onRowDblClick" />`,
})

export const Default = Template.bind({})
Default.args = {
  headers: [
    { text: 'ID', key: 'id' },
    { text: 'Name', key: 'name' },
    { text: 'Email', key: 'email' },
  ],
  data: [
    { id: 1, name: 'John Doe', email: 'john.doe@example.com' },
    { id: 2, name: 'Jane Smith', email: 'jane.smith@example.com' },
    { id: 3, name: 'Alice Johnson', email: 'alice.johnson@example.com' },
  ],
  primaryKey: 'id',
  hoverable: true,
  loading: false,
}

export const Loading = Template.bind({})
Loading.args = {
  headers: [
    { text: 'ID', key: 'id' },
    { text: 'Name', key: 'name' },
    { text: 'Email', key: 'email' },
  ],
  data: [],
  primaryKey: 'id',
  hoverable: true,
  loading: true,
}

export const Empty = Template.bind({})
Empty.args = {
  headers: [
    { text: 'ID', key: 'id' },
    { text: 'Name', key: 'name' },
    { text: 'Email', key: 'email' },
  ],
  data: [],
  primaryKey: 'id',
  hoverable: true,
  loading: false,
}

export const WithCustomCells = (args: unknown) => ({
  components: { AppTable },
  setup() {
    return { args }
  },
  template: `
    <AppTable
      :headers="args.headers"
      :data="args.data"
      :primaryKey="args.primaryKey"
      :hoverable="args.hoverable"
      :loading="args.loading"
      @rowClick="args.onRowClick"
      @rowDblClick="args.onRowDblClick"
    >
      <template #cell-name="{ value }">
        <span class="text-blue-600 font-bold">{{ value }}</span>
      </template>
      <template #cell-email="{ value }">
        <a :href="'mailto:' + value" class="text-green-600 underline">{{ value }}</a>
      </template>
    </AppTable>
  `,
})

WithCustomCells.args = {
  headers: [
    { text: 'ID', key: 'id' },
    { text: 'Name', key: 'name' },
    { text: 'Email', key: 'email' },
  ],
  data: [
    { id: 1, name: 'John Doe', email: 'john.doe@example.com' },
    { id: 2, name: 'Jane Smith', email: 'jane.smith@example.com' },
    { id: 3, name: 'Alice Johnson', email: 'alice.johnson@example.com' },
  ],
  primaryKey: 'id',
  hoverable: true,
  loading: false,
  onRowClick: (row: unknown) => {
    console.log('Row clicked:', row)
  },
  onRowDblClick: (row: unknown) => {
    console.log('Row double-clicked:', row)
  },
}

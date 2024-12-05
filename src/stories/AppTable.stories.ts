import type { Meta, StoryFn } from '@storybook/vue3'

import AppTable from '@/components/table/AppTable.vue'

export default {
  title: 'Components/Table',
  component: AppTable,
  args: {
    columns: [
      { key: 'name', name: 'Name', sortable: true },
      { key: 'age', name: 'Age', sortable: true },
      { key: 'email', name: 'Email', sortable: false },
    ],
    data: [
      { id: 1, name: 'Alice', age: 30, email: 'alice@example.com' },
      { id: 2, name: 'Bob', age: 25, email: 'bob@example.com' },
      { id: 3, name: 'Charlie', age: 35, email: 'charlie@example.com' },
    ],
    fixed: false,
  },
  argTypes: {
    columns: {
      description: 'Defines the columns of the table.',
      control: { type: 'object' },
    },
    data: {
      description: 'Array of rows to display in the table.',
      control: { type: 'object' },
    },
    fixed: {
      description: 'If true, columns will have fixed width.',
      control: { type: 'boolean' },
    },
    'sort-change': {
      action: 'sort-change',
      description: 'Emitted when the sorting state changes.',
    },
    'row-click': {
      action: 'row-click',
      description: 'Emitted when a row is clicked.',
    },
    'row-dblclick': {
      action: 'row-dblclick',
      description: 'Emitted when a row is double-clicked.',
    },
  },
} as Meta

const Template: StoryFn = (args, {}) => ({
  components: { AppTable },
  setup() {
    return { args }
  },
  template: `<AppTable v-bind="args" @sort-change="args['sort-change']" @row-click="args['row-click']" @row-dblclick="args['row-dblclick']" />`,
})

export const Default = Template.bind({})
Default.args = {}

export const FixedColumns = Template.bind({})
FixedColumns.args = {
  fixed: true,
}

export const WithActionSlot = Template.bind({})
WithActionSlot.args = {}
WithActionSlot.decorators = [
  () => ({
    template: `
      <AppTable v-bind="$props" @sort-change="sortChange" @row-click="rowClick" @row-dblclick="rowDblClick">
        <template #actions="{ row }">
          <button class="text-blue-500 hover:underline" @click="alert('Editing ' + row.name)">Edit</button>
        </template>
      </AppTable>
    `,
    methods: {
      sortChange(event: unknown) {
        console.log('Sort Change:', event)
      },
      rowClick(event: unknown) {
        console.log('Row Click:', event)
      },
      rowDblClick(event: unknown) {
        console.log('Row Double Click:', event)
      },
    },
  }),
]

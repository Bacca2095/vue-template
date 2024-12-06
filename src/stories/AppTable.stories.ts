import type { Meta, StoryObj } from '@storybook/vue3'

import AppTable from '@/components/table/AppTable.vue'

export default {
  title: 'Components/AppTable',
  component: AppTable,
  tags: ['autodocs'],
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
      description: 'Defines the columns of the table. Each column can be sortable.',
      control: { type: 'object' },
    },
    data: {
      description: 'Array of rows to display in the table.',
      control: { type: 'object' },
    },
    fixed: {
      description: 'If true, columns will have a fixed width.',
      control: { type: 'boolean' },
    },
    'sort-change': {
      action: 'sort-change',
      description: 'Emitted when the sorting state of a column changes.',
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
  parameters: {
    docs: {
      autodocs: true,
    },
  },
} as Meta<typeof AppTable>

type Story = StoryObj<typeof AppTable>

export const Default: Story = {}

export const FixedColumns: Story = {
  args: {
    fixed: true,
  },
}

export const EmptyData: Story = {
  args: {
    data: [],
  },
}

export const ManyRows: Story = {
  args: {
    data: Array.from({ length: 50 }, (_, i) => ({
      id: i + 1,
      name: `User ${i + 1}`,
      age: Math.floor(Math.random() * 60) + 18,
      email: `user${i + 1}@example.com`,
    })),
  },
}

export const WithActionSlot: Story = {
  render: (args) => ({
    components: { AppTable },
    setup() {
      return { args }
    },
    template: `
      <AppTable v-bind="args">
        <template #actions="{ row }">
          <button class="text-blue-500 hover:underline" @click="alert('Editing ' + row.name)">
            Edit
          </button>
        </template>
      </AppTable>
    `,
  }),
}

export const NonSortableColumns: Story = {
  args: {
    columns: [
      { key: 'name', name: 'Name', sortable: false },
      { key: 'age', name: 'Age', sortable: false },
      { key: 'email', name: 'Email', sortable: false },
    ],
  },
}

export const RowClickInteraction: Story = {
  render: (args) => ({
    components: { AppTable },
    setup() {
      return { args }
    },
    template: `
      <AppTable v-bind="args" @row-click="onRowClick">
        <template #actions="{ row }">
          <button class="text-blue-500 hover:underline" @click="alert('Viewing ' + row.name)">
            View
          </button>
        </template>
      `,
    methods: {
      onRowClick(event: { id: number }) {
        alert(`Row clicked: ID ${event.id}`)
      },
    },
  }),
}

export const SelectableRows: Story = {
  args: {
    columns: [
      { key: 'id', name: 'ID', sortable: false },
      { key: 'name', name: 'Name', sortable: false },
    ],
    data: [
      { id: 1, name: 'Selectable Row 1' },
      { id: 2, name: 'Selectable Row 2' },
    ],
  },
}

// Tabla con encabezados personalizados
export const CustomHeader: Story = {
  render: (args) => ({
    components: { AppTable },
    setup() {
      return { args }
    },
    template: `
      <AppTable v-bind="args">
        <template #header="{ column }">
          <span class="font-bold text-zinc-800 dark:text-zinc-200">{{ column.name.toUpperCase() }}</span>
        </template>
      </AppTable>
    `,
  }),
}

import type { Meta, StoryFn } from '@storybook/vue3'

import Pagination from '@/components/pagination/AppPagination.vue'

export default {
  title: 'Components/AppPagination',
  component: Pagination,
  argTypes: {
    currentPage: {
      control: 'number',
      defaultValue: 1,
      description: 'Current active page.',
    },
    totalPages: {
      control: 'number',
      defaultValue: 5,
      description: 'Total number of pages.',
    },
    totalItems: {
      control: 'number',
      defaultValue: 50,
      description: 'Total number of items.',
    },
    itemsPerPage: {
      control: 'number',
      defaultValue: 10,
      description: 'Number of items per page.',
    },
    onPageChange: {
      action: 'pageChange',
      description: 'Emits the new page number when a page is clicked.',
    },
  },
  tags: ['autodocs'],
} as Meta

const Template: StoryFn = (args, {}) => ({
  components: { Pagination },
  setup() {
    return { args }
  },
  template: '<Pagination v-bind="args" @pageChange="args.onPageChange" />',
})

export const Default = Template.bind({})
Default.args = {
  currentPage: 1,
  totalPages: 5,
  totalItems: 50,
  itemsPerPage: 10,
}

export const WithMorePages = Template.bind({})
WithMorePages.args = {
  currentPage: 1,
  totalPages: 10,
  totalItems: 100,
  itemsPerPage: 10,
}

export const LastPage = Template.bind({})
LastPage.args = {
  currentPage: 10,
  totalPages: 10,
  totalItems: 100,
  itemsPerPage: 10,
}

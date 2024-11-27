import { mount } from '@vue/test-utils'
import { describe, expect, it, vi } from 'vitest'

import TableComponent from '@/components/table/AppTable.vue'

describe('TableComponent', () => {
  const headers = [
    { text: 'Name', key: 'name' },
    { text: 'Age', key: 'age' },
    { text: 'Country', key: 'country' },
  ]
  const data: Record<string, string | number>[] = [
    { id: 1, name: 'John', age: 30, country: 'USA' },
    { id: 2, name: 'Jane', age: 25, country: 'Canada' },
  ]

  it('renders the loading state', () => {
    const wrapper = mount(TableComponent, {
      props: { headers, data: [], primaryKey: 'id', loading: true },
    })
    expect(wrapper.text()).toContain('Loading...')
    expect(wrapper.find('tbody').html()).toContain('Loading...')
  })

  it('renders the no data state', () => {
    const wrapper = mount(TableComponent, {
      props: { headers, data: [], primaryKey: 'id', loading: false },
    })
    expect(wrapper.text()).toContain('No data available')
    expect(wrapper.find('tbody').html()).toContain('No data available')
  })

  it('renders table headers and data correctly', () => {
    const wrapper = mount(TableComponent, {
      props: { headers, data, primaryKey: 'id' },
    })

    // Check headers
    const headerCells = wrapper.findAll('thead th')
    expect(headerCells).toHaveLength(headers.length)
    headers.forEach((header, index) => {
      expect(headerCells[index].text()).toBe(header.text)
    })

    // Check data rows
    const rows = wrapper.findAll('tbody tr')
    expect(rows).toHaveLength(data.length)

    rows.forEach((row, rowIndex) => {
      const cells = row.findAll('td')
      expect(cells).toHaveLength(headers.length)
      headers.forEach((header, colIndex) => {
        expect(cells[colIndex].text()).toBe(String(data[rowIndex][header.key]))
      })
    })
  })

  it('emits rowClick event on row click', async () => {
    const rowClickSpy = vi.fn()
    const wrapper = mount(TableComponent, {
      props: { headers, data, primaryKey: 'id' },
      attrs: { onRowClick: rowClickSpy },
    })

    const row = wrapper.findAll('tbody tr')[0]
    await row.trigger('click')
    expect(rowClickSpy).toHaveBeenCalledWith(data[0])
  })

  it('emits rowDblClick event on row double click', async () => {
    const rowDblClickSpy = vi.fn()
    const wrapper = mount(TableComponent, {
      props: { headers, data, primaryKey: 'id' },
      attrs: { onRowDblClick: rowDblClickSpy },
    })

    const row = wrapper.findAll('tbody tr')[0]
    await row.trigger('dblclick')
    expect(rowDblClickSpy).toHaveBeenCalledWith(data[0])
  })

  it('highlights selected row', async () => {
    const wrapper = mount(TableComponent, {
      props: { headers, data, primaryKey: 'id' },
    })

    const row = wrapper.findAll('tbody tr')[0]
    await row.trigger('click')

    expect(row.classes()).toContain('bg-zinc-300')
  })

  it('deselects row on second click', async () => {
    const wrapper = mount(TableComponent, {
      props: { headers, data, primaryKey: 'id' },
    })

    const row = wrapper.findAll('tbody tr')[0]
    await row.trigger('click') // Select
    expect(row.classes()).toContain('bg-zinc-300')

    await row.trigger('click') // Deselect
    expect(row.classes()).not.toContain('bg-zinc-300')
  })

  it('renders custom slots for cells', () => {
    const wrapper = mount(TableComponent, {
      props: { headers, data, primaryKey: 'id' },
      slots: {
        'cell-name': `<template #cell-name="{ value }"><span class="custom-cell">{{ value.toUpperCase() }}</span></template>`,
      },
    })

    const rows = wrapper.findAll('tbody tr')
    const firstRowCell = rows[0].find('td .custom-cell')
    expect(firstRowCell.text()).toBe(String(data[0].name).toUpperCase())
  })
})

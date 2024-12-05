// tests/unit/AppTable.spec.ts
import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'

import AppTable from '@/components/table/AppTable.vue'

describe('AppTable.vue', () => {
  const columns = [
    { key: 'name', name: 'Name', sortable: true },
    { key: 'age', name: 'Age', sortable: true },
    { key: 'email', name: 'Email', sortable: false },
  ]

  const data = [
    { id: 1, name: 'Alice', age: 30, email: 'alice@example.com' },
    { id: 2, name: 'Bob', age: 25, email: 'bob@example.com' },
    { id: 3, name: 'Charlie', age: 35, email: 'charlie@example.com' },
  ]

  it('renders table headers based on columns prop', () => {
    const wrapper = mount(AppTable, {
      props: { columns, data },
    })

    const headers = wrapper.findAll('th')
    expect(headers).toHaveLength(columns.length)

    headers.forEach((th, index) => {
      expect(th.text()).toBe(columns[index].name)
    })
  })

  it('renders table rows based on data prop', () => {
    const wrapper = mount(AppTable, {
      props: { columns, data },
    })

    const rows = wrapper.findAll('tbody tr')
    expect(rows).toHaveLength(data.length)

    rows.forEach((row, rowIndex) => {
      const cells = row.findAll('td')
      expect(cells).toHaveLength(columns.length)

      columns.forEach((key, colIndex) => {
        expect(cells[colIndex].text()).toBe(
          String((data[rowIndex] as Record<string, unknown>)[key.key]),
        )
      })
    })
  })

  it('handles sorting when clicking on sortable columns', async () => {
    const wrapper = mount(AppTable, {
      props: { columns, data },
    })

    const sortableHeaders = wrapper.findAll('th span.cursor-pointer')

    await sortableHeaders[0].trigger('click')

    expect(wrapper.emitted('sort-change')).toHaveLength(1)
    expect(wrapper.emitted('sort-change')![0]).toEqual([{ key: 'name', direction: 'asc' }])

    await sortableHeaders[0].trigger('click')

    expect(wrapper.emitted('sort-change')).toHaveLength(2)
    expect(wrapper.emitted('sort-change')![1]).toEqual([{ key: 'name', direction: 'desc' }])

    await sortableHeaders[0].trigger('click')

    expect(wrapper.emitted('sort-change')).toHaveLength(3)
    expect(wrapper.emitted('sort-change')![2]).toEqual([{ key: 'name', direction: 'none' }])
  })

  it('handles row click and emits "row-click" event', async () => {
    const wrapper = mount(AppTable, {
      props: { columns, data },
    })

    const rows = wrapper.findAll('tbody tr')

    // Click on the first row
    await rows[0].trigger('click')

    expect(wrapper.emitted('row-click')).toHaveLength(1)
    expect(wrapper.emitted('row-click')![0]).toEqual([{ id: 1 }])

    // The first row should have the selected class
    expect(rows[0].classes()).toContain('bg-zinc-200')
    expect(rows[0].classes()).toContain('dark:bg-zinc-600')

    // Click again to deselect
    await rows[0].trigger('click')

    expect(wrapper.emitted('row-click')).toHaveLength(2)
    expect(wrapper.emitted('row-click')![1]).toEqual([{ id: 1 }])

    // The first row should not have the selected class
    expect(rows[0].classes()).not.toContain('bg-zinc-200')
    expect(rows[0].classes()).not.toContain('dark:bg-zinc-600')
  })

  it('handles row double-click and emits "row-dblclick" event', async () => {
    const wrapper = mount(AppTable, {
      props: { columns, data },
    })

    const rows = wrapper.findAll('tbody tr')

    // Double-click on the second row
    await rows[1].trigger('dblclick')

    expect(wrapper.emitted('row-dblclick')).toHaveLength(1)
    expect(wrapper.emitted('row-dblclick')![0]).toEqual([{ id: 2 }])

    // The second row should be selected
    expect(rows[1].classes()).toContain('bg-zinc-200')
    expect(rows[1].classes()).toContain('dark:bg-zinc-600')
  })

  it('applies fixed column widths when "fixed" prop is true', () => {
    const wrapper = mount(AppTable, {
      props: { columns, data, fixed: true },
    })

    const thElements = wrapper.findAll('th')
    thElements.forEach((th) => {
      expect(th.attributes('style')).toContain('width: 33.333333333333336%') // 100 / 3 columns
    })

    const tdElements = wrapper.findAll('td')
    tdElements.forEach((td) => {
      expect(td.attributes('style')).toContain('width: 33.333333333333336%')
    })
  })

  it('does not apply fixed column widths when "fixed" prop is false or undefined', () => {
    const wrapper = mount(AppTable, {
      props: { columns, data },
    })

    const thElements = wrapper.findAll('th')
    thElements.forEach((th) => {
      expect(th.attributes('style')).toBeFalsy() // No debería haber estilos de ancho
    })

    const tdElements = wrapper.findAll('td')
    tdElements.forEach((td) => {
      expect(td.attributes('style')).toBeFalsy()
    })
  })
})

import React from 'react'
import { render, cleanup, fireEvent } from '@testing-library/react'
import { it, expect, describe, afterEach } from 'vitest'
import Toolbar from './Toolbar'

describe('Toolbar', () => {
  afterEach(cleanup)

  it('renders correctly', () => {
    const component = render(
      <Toolbar
        placeholder='Placeholder'
        selectValues={[10, 20, 50, 100]}
        limit={20}
        handleFilterChange={() => null}
        handleSelectChange={() => null}
      />
    )
    expect(component).toBeDefined()
    component.getByPlaceholderText('Placeholder')
  })

  it('show correct options in select component', () => {
    const values = [10, 20, 50, 100]
    const component = render(
      <Toolbar
        placeholder='Placeholder'
        selectValues={values}
        limit={20}
        handleFilterChange={() => null}
        handleSelectChange={() => null}
      />
    )
    const button = component.getByRole('button', { name: /limit/i })
    fireEvent.click(button)
    component.getByRole('combobox', { name: /limit-options/i })
    const options = component.getAllByRole('option')
    expect(options).toHaveLength(4)
  })
})

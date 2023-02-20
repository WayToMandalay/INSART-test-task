import React, { useState } from 'react'
import { render, screen, cleanup, fireEvent } from '@testing-library/react'
import renderer from 'react-test-renderer'
import '@testing-library/jest-dom'
import EditableInput from './editableInput'

afterEach(() => {
    cleanup()
})

const params = {
    type: 'sale',
    label: 'Sale',
    basicValue: 40,
}

render(<EditableInput {...params} />)
const inputBlock = screen.getByTestId('input-1')
const inputEl = screen.getByTestId('input-2')

describe('Input Test Block', () => {
    test('Base Tests', () => {
        expect(inputBlock).toBeInTheDocument()
        expect(inputEl).toBeInTheDocument()
        expect(inputBlock).toHaveTextContent('Sale')
    })
    test('Base Tests 2', () => {
        fireEvent.change(inputEl, { target: { value: 390 } })

        expect(inputEl.value).toBe('390')
        console.log(inputEl)
        expect(inputEl).toHaveClass('isInvalid')
    })
})

test('matches snapshot', () => {
    const params = {
        type: 'sale',
        label: 'Sale',
        basicValue: 39.2,
    }
    const tree = renderer.create(<EditableInput {...params} />).toJSON()
    expect(tree).toMatchSnapshot()
})

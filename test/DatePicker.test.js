import '@testing-library/jest-dom'
import { fireEvent, render } from '@testing-library/react'
import classNames from 'classnames'
import { format, subMonths } from 'date-fns'
import { enGB as locale } from 'date-fns/locale'
import React from 'react'
import DatePicker from '../src/DatePicker'

describe('DatePicker', () => {
  it('should render', () => {
    const { getAllByText } = render(
      <DatePicker onDateChange={() => {}} locale={locale}>
        {({ inputProps, focused }) => (
          <input aria-label='input' className={classNames({ '-focused': focused })} {...inputProps} />
        )}
      </DatePicker>
    )

    expect(getAllByText('1').length).toBeGreaterThan(0)
  })

  it('should open and close', () => {
    const { container, getAllByText, getByLabelText } = render(
      <DatePicker onDateChange={() => {}} locale={locale}>
        {({ inputProps, focused }) => (
          <input aria-label='input' {...inputProps} className={focused ? '-focused' : undefined} />
        )}
      </DatePicker>
    )

    const input = getByLabelText('input')
    const popover = container.querySelector('.nice-dates-popover')

    expect(popover).not.toHaveClass('-open')
    expect(input).not.toHaveClass('-focused')

    // Should open on focus
    fireEvent.focus(input)

    expect(popover).toHaveClass('-open')
    expect(input).toHaveClass('-focused')

    // Should close on outside click
    fireEvent.click(document)

    expect(popover).not.toHaveClass('-open')
    expect(input).not.toHaveClass('-focused')

    // Should close on date selection
    fireEvent.focus(input)

    expect(popover).toHaveClass('-open')

    fireEvent.click(getAllByText('1')[0])

    expect(popover).not.toHaveClass('-open')
  })

  it('should display pre-selected date’s month on initial render', () => {
    const pastDate = subMonths(new Date(), 1)
    const monthName = format(pastDate, 'LLLL', { locale })

    const { getByText } = render(
      <DatePicker locale={locale} date={pastDate}>
        {() => {}}
      </DatePicker>
    )

    expect(getByText(monthName, { exact: false })).toBeInTheDocument()
  })
})

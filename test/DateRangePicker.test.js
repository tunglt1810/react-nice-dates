import '@testing-library/jest-dom'
import { fireEvent, render } from '@testing-library/react'
import classNames from 'classnames'
import { format, subMonths } from 'date-fns'
import { enGB as locale } from 'date-fns/locale'
import React from 'react'
import { END_DATE, START_DATE } from '../src/constants'
import DateRangePicker from '../src/DateRangePicker'

describe('DateRangePicker', () => {
  it('should render', () => {
    const { getAllByText } = render(
      <DateRangePicker locale={locale}>
        {({ startDateInputProps, endDateInputProps, focus }) => (
          <div className='date-range'>
            <input
              aria-label={START_DATE}
              className={classNames({ '-focused': focus === START_DATE })}
              {...startDateInputProps}
            />
            <input
              aria-label={END_DATE}
              className={classNames({ '-focused': focus === END_DATE })}
              {...endDateInputProps}
            />
          </div>
        )}
      </DateRangePicker>
    )

    expect(getAllByText('1').length).toBeGreaterThan(0)
  })

  it('should open and close popup', () => {
    const { container, getByLabelText } = render(
      <DateRangePicker locale={locale}>
        {({ startDateInputProps, endDateInputProps, focus }) => (
          <div className='date-range'>
            <input
              aria-label={START_DATE}
              className={classNames({ '-focused': focus === START_DATE })}
              {...startDateInputProps}
            />
            <input className={classNames({ '-focused': focus === END_DATE })} {...endDateInputProps} />
          </div>
        )}
      </DateRangePicker>
    )

    const startDateInput = getByLabelText(START_DATE)
    const popover = container.querySelector('.nice-dates-popover')

    expect(popover).not.toHaveClass('-open')
    expect(startDateInput).not.toHaveClass('-focused')

    // Should open on focus
    fireEvent.focus(startDateInput)

    expect(popover).toHaveClass('-open')
    expect(startDateInput).toHaveClass('-focused')

    // Should close on outside click
    fireEvent.click(document)

    expect(popover).not.toHaveClass('-open')
    expect(startDateInput).not.toHaveClass('-focused')
  })

  it('should display pre-selected start date’s month on initial render', () => {
    const today = new Date()
    const pastDate = subMonths(today, 1)
    const monthName = format(pastDate, 'LLLL', { locale })

    const { getByText } = render(
      <DateRangePicker locale={locale} startDate={pastDate} endDate={today}>
        {() => {}}
      </DateRangePicker>
    )

    expect(getByText(monthName, { exact: false })).toBeInTheDocument()
  })

  it('should display pre-selected end date’s month on initial render', () => {
    const pastDate = subMonths(new Date(), 1)
    const monthName = format(pastDate, 'LLLL', { locale })

    const { getByText } = render(
      <DateRangePicker locale={locale} endDate={pastDate}>
        {() => {}}
      </DateRangePicker>
    )

    expect(getByText(monthName, { exact: false })).toBeInTheDocument()
  })
})

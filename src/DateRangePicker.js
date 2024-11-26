import { bool, func, instanceOf, number, object, objectOf, string } from 'prop-types'
import React, { useState } from 'react'
import { END_DATE, START_DATE } from './constants'
import DateRangePickerCalendar from './DateRangePickerCalendar'
import Popover from './Popover'
import useDateInput from './useDateInput'
import useDetectTouch from './useDetectTouch'
import useOutsideClickHandler from './useOutsideClickHandler'
import { isRangeLengthValid } from './utils'

export default function DateRangePicker({
  children,
  locale,
  startDate,
  endDate,
  onStartDateChange = () => {},
  onEndDateChange = () => {},
  format,
  minimumDate,
  maximumDate,
  minimumLength = 0,
  maximumLength = null,
  modifiers,
  modifiersClassNames,
  weekdayFormat,
  touchDragEnabled
}) {
  const [focus, setFocus] = useState()
  const [month, setMonth] = useState(startDate || endDate || new Date())
  const isTouch = useDetectTouch()

  const [startDateInputRef, endDateInputRef, popoverRef] = useOutsideClickHandler(() => {
    setFocus(null)
  })

  const startDateInputProps = useDateInput({
    date: startDate,
    format,
    locale,
    maximumDate,
    minimumDate,
    onDateChange: date => {
      onStartDateChange(date)
      date && setMonth(date)
    },
    validate: date => !endDate || isRangeLengthValid({ startDate: date, endDate }, { minimumLength, maximumLength })
  })

  const endDateInputProps = useDateInput({
    date: endDate,
    format,
    locale,
    maximumDate,
    minimumDate,
    onDateChange: date => {
      onEndDateChange(date)
      date && setMonth(date)
    },
    validate: date => !startDate || isRangeLengthValid({ startDate, endDate: date }, { minimumLength, maximumLength })
  })

  return (
    <div className='nice-dates'>
      {children({
        startDateInputProps: {
          ...startDateInputProps,
          onFocus: () => {
            startDateInputProps.onFocus()
            setFocus(START_DATE)

            if (isTouch) {
              startDateInputRef.current.blur()
            }
          },
          ref: startDateInputRef,
          readOnly: isTouch
        },
        endDateInputProps: {
          ...endDateInputProps,
          onFocus: () => {
            endDateInputProps.onFocus()
            setFocus(END_DATE)

            if (isTouch) {
              endDateInputRef.current.blur()
            }
          },
          ref: endDateInputRef,
          readOnly: isTouch
        },
        focus
      })}

      <Popover open={!!focus} ref={popoverRef}>
        <DateRangePickerCalendar
          locale={locale}
          startDate={startDate}
          endDate={endDate}
          focus={focus}
          month={month}
          onStartDateChange={onStartDateChange}
          onEndDateChange={onEndDateChange}
          onFocusChange={setFocus}
          onMonthChange={setMonth}
          minimumDate={minimumDate}
          maximumDate={maximumDate}
          minimumLength={minimumLength}
          maximumLength={maximumLength}
          modifiers={modifiers}
          modifiersClassNames={modifiersClassNames}
          weekdayFormat={weekdayFormat}
          touchDragEnabled={touchDragEnabled}
        />
      </Popover>
    </div>
  )
}

DateRangePicker.propTypes = {
  children: func.isRequired,
  locale: object.isRequired,
  startDate: instanceOf(Date),
  endDate: instanceOf(Date),
  onStartDateChange: func,
  onEndDateChange: func,
  format: string,
  minimumDate: instanceOf(Date),
  maximumDate: instanceOf(Date),
  minimumLength: number,
  maximumLength: number,
  modifiers: objectOf(func),
  modifiersClassNames: objectOf(string),
  weekdayFormat: string,
  touchDragEnabled: bool
}

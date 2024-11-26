import { startOfMonth } from 'date-fns'
import { bool, func, instanceOf, object, objectOf, string } from 'prop-types'
import React from 'react'
import CalendarGrid from './CalendarGrid'
import CalendarNavigation from './CalendarNavigation'
import CalendarWeekHeader from './CalendarWeekHeader'
import useControllableState from './useControllableState'
import { isSelectable, mergeModifiers } from './utils'

export default function Calendar({
  locale,
  month: receivedMonth,
  modifiers: receivedModifiers,
  modifiersClassNames,
  minimumDate,
  maximumDate,
  onMonthChange,
  onDayHover,
  onDayClick,
  weekdayFormat,
  touchDragEnabled
}) {
  const [month, setMonth] = useControllableState(receivedMonth, onMonthChange, startOfMonth(new Date()))

  const modifiers = mergeModifiers(
    { disabled: date => !isSelectable(date, { minimumDate, maximumDate }) },
    receivedModifiers
  )

  return (
    <div>
      <CalendarNavigation
        locale={locale}
        minimumDate={minimumDate}
        maximumDate={maximumDate}
        month={month}
        onMonthChange={setMonth}
      />

      <CalendarWeekHeader locale={locale} weekdayFormat={weekdayFormat}/>

      <CalendarGrid
        locale={locale}
        modifiers={modifiers}
        modifiersClassNames={modifiersClassNames}
        month={month}
        onMonthChange={setMonth}
        onDayHover={onDayHover}
        onDayClick={onDayClick}
        touchDragEnabled={touchDragEnabled}
      />
    </div>
  )
}

Calendar.propTypes = {
  locale: object.isRequired,
  minimumDate: instanceOf(Date),
  maximumDate: instanceOf(Date),
  modifiers: objectOf(func),
  modifiersClassNames: objectOf(string),
  month: instanceOf(Date),
  onMonthChange: func,
  onDayHover: func,
  onDayClick: func,
  weekdayFormat: string,
  touchDragEnabled: bool
}

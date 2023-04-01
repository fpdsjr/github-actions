import { getYear, getMonth } from 'date-fns'
import range from 'lodash/range'
import {
  Control,
  Controller,
  FieldError,
  FieldErrors,
  FieldErrorsImpl,
  Merge,
} from 'react-hook-form'
import DatePicker from 'react-datepicker'
import { CaretLeft, CaretRight } from 'phosphor-react'

import 'react-datepicker/dist/react-datepicker.css'

import { Label } from '../Label'
import { IInputRegister } from '@/interfaces'

const years = range(1923, getYear(new Date()) + 1, 1)
const months = [
  'Janeiro',
  'Fevereiro',
  'Março',
  'Abril',
  'Maio',
  'Junho',
  'Julho',
  'Agosto',
  'Setembro',
  'Outubro',
  'Novembro',
  'Dezembro',
]

interface BirthDateProps {
  errors:
    | Partial<FieldErrors>
    | FieldError
    | Merge<FieldError, FieldErrorsImpl<any>>
    | any
  control: Control<IInputRegister>
}

export const BirthDate = ({ errors, control }: BirthDateProps) => {
  return (
    <fieldset className="flex flex-col items-start mb-4">
      <Label text="Data de Nascimento" htmlFor="birth_date" />

      <Controller
        control={control}
        name="birth_date"
        render={({ field: { onChange, onBlur, value } }) => (
          <DatePicker
            className="w-full mt-2 mb-1 border border-gray-300 bg-white text-gray-800 pl-2 py-1.5 text-sm rounded-md shadow-sm placeholder:text-gray-400 placeholder:text-xs focus:ring-2 focus:outline-0 hover:bg-gray-50 focus:ring-blue-300 focus:ring-yellow-400/95"
            onChange={onChange}
            onBlur={onBlur}
            selected={value}
            dateFormat={'dd/MM/yyyy'}
            placeholderText="DD/MM/AAAA"
            maxDate={new Date()}
            renderCustomHeader={({
              date,
              changeYear,
              changeMonth,
              decreaseMonth,
              increaseMonth,
              prevMonthButtonDisabled,
              nextMonthButtonDisabled,
            }) => (
              <div className="flex justify-center m-3">
                <button
                  className="rounded border border-gray-300 px-2 py-1"
                  onClick={decreaseMonth}
                  disabled={prevMonthButtonDisabled}
                >
                  <CaretLeft weight="bold" />
                </button>
                <select
                  value={getYear(date)}
                  onChange={({ target: { value } }) =>
                    changeYear(value as unknown as number)
                  }
                  className="border border-gray-300 px-2 py-1 rounded"
                >
                  {years.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
                <select
                  value={months[getMonth(date)]}
                  onChange={({ target: { value } }) =>
                    changeMonth(months.indexOf(value))
                  }
                  className="border border-gray-300 px-2 py-1 rounded"
                >
                  {months.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
                <button
                  className="rounded border border-gray-300 px-2 py-1"
                  onClick={increaseMonth}
                  disabled={nextMonthButtonDisabled}
                >
                  <CaretRight weight="bold" />
                </button>
              </div>
            )}
          />
        )}
      />
      {errors.birth_date && (
        <span className="text-red-600 text-xs">
          {errors.birth_date.message}
        </span>
      )}
    </fieldset>
  )
}

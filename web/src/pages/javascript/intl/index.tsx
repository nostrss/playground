// @ts-nocheck
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

export default function IntlPage() {
  const [selectOption, setSelectOption] = useState({});

  const date = new Date();
  const options: any = [
    { weekday: ['narrow', 'short', 'long'] },
    { era: ['narrow', 'short', 'long'] },
    { year: ['2-digit', 'numeric'] },
    { month: ['2-digit', 'numeric', 'narrow', 'short', 'long'] },
    { day: ['2-digit', 'numeric'] },
    { dayPeriod: ['narrow', 'short', 'long'] },
    { hour: ['2-digit', 'numeric'] },
    { minute: ['2-digit', 'numeric'] },
    { second: ['2-digit', 'numeric'] },
    {
      timeZoneName: [
        'short',
        'long',
        'shortOffset',
        'longOffset',
        'shortGeneric',
        'longGeneric',
      ],
    },
  ];

  const onChanegeSelect = (event: any) => {
    setSelectOption({
      ...selectOption,
      [event.target.id]: event.target.value,
    });
  };

  return (
    <div>
      <fieldset>
        <legend>Date Time Format </legend>
        {options.map((option: any) => (
          <ul key={uuidv4()}>
            <label htmlFor={Object.keys(option)[0]}>
              {Object.keys(option)[0]} :
              <select
                id={Object.keys(option)[0]}
                onChange={onChanegeSelect}
                value={selectOption[Object.keys(option)[0]]}
                defaultValue='select'
              >
                <option value='select' disabled>
                  select
                </option>
                {option[Object.keys(option)[0]].map((item: any) => (
                  <option value={item} key={uuidv4()}>
                    {item}
                  </option>
                ))}
              </select>
            </label>
          </ul>
        ))}
      </fieldset>
      <ul>
        <li>
          en-US : {new Intl.DateTimeFormat('en-US', selectOption).format(date)}
        </li>
        <li>
          ko-Kr : {new Intl.DateTimeFormat('ko-Kr', selectOption).format(date)}
        </li>
        <li>
          en-GB : {new Intl.DateTimeFormat('en-GB', selectOption).format(date)}
        </li>
      </ul>
    </div>
  );
}

/* eslint-disable jsx-a11y/label-has-associated-control */
import CheckBoxCustom from './checkbox.styles';

export default function CheckBoxPage() {
  const onChangeCheck = (event: { target: { value: any } }) => {
    console.log(event.target.value);
  };

  return (
    <div>
      <fieldset>
        <legend>Welcome to CheckBox Playground</legend>
        <div>
          <label htmlFor='first'>
            first
            <input
              id='first'
              type='checkbox'
              name='first'
              onChange={onChangeCheck}
              value='first'
            />
          </label>
        </div>
        <div>
          <label htmlFor='second'>
            second
            <input
              id='second'
              type='checkbox'
              name='second'
              onChange={onChangeCheck}
              value='second'
            />
          </label>
        </div>
      </fieldset>
      <fieldset>
        <legend>CheckBox Customize use styled-components</legend>
        <CheckBoxCustom>
          <input
            id='custom_first'
            type='checkbox'
            name='custom_first'
            onChange={onChangeCheck}
            value='custom first'
          />
          <label htmlFor='custom_first'>first custom </label>
        </CheckBoxCustom>
        <CheckBoxCustom>
          <input
            id='custom_second'
            type='checkbox'
            name='custom_second'
            onChange={onChangeCheck}
            value='custom second'
          />
          <label htmlFor='custom_second'>second custom</label>
        </CheckBoxCustom>
      </fieldset>
    </div>
  );
}

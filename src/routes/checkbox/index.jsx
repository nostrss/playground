import { CheckBoxCustom } from './checkbox.styles';

export default function CheckBox() {
  const onChangeCheck = (event) => {
    console.log(event.target.value);
  };

  return (
    <div>
      <fieldset>
        <legend>Welcome to CheckBox Playground</legend>
        <div>
          <input
            id='first'
            type='checkbox'
            name='first'
            onChange={onChangeCheck}
            value={'first'}
          />
          <label htmlFor='first'>first</label>
        </div>
        <div>
          <input
            id='second'
            type='checkbox'
            name='second'
            onChange={onChangeCheck}
            value={'second'}
          />
          <label htmlFor='second'>second</label>
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
            value={'custom first'}
          />
          <label htmlFor='custom_first'>first custom</label>
        </CheckBoxCustom>
        <CheckBoxCustom>
          <input
            id='custom_second'
            type='checkbox'
            name='custom_second'
            onChange={onChangeCheck}
            value={'custom second'}
          />
          <label htmlFor='custom_second'>second custom</label>
        </CheckBoxCustom>
      </fieldset>
    </div>
  );
}

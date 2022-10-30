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
    </div>
  );
}

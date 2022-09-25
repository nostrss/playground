export default function CheckBox() {
  const onChangeCheck = (event) => {
    alert(event.target.value);
  };

  return (
    <div>
      <fieldset>
        <legend>Welcome to CheckBox Playground</legend>
        <div>
          <input
            type='checkbox'
            name='first'
            onChange={onChangeCheck}
            value={'first'}
          />
          <label htmlFor='first'>first</label>
        </div>
        <div>
          <input type='checkbox' name='second' />
          <label htmlFor='second'>second</label>
        </div>
      </fieldset>
    </div>
  );
}

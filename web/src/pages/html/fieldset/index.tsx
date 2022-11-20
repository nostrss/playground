export default function FieldSet() {
  return (
    <>
      <form action='#'>
        <fieldset>
          <legend>Simple fieldset</legend>
          <label htmlFor='radio'>
            Spirit of radio
            <input type='radio' id='radio' />
          </label>
        </fieldset>
      </form>

      <form action='#'>
        <fieldset disabled>
          <legend>Disabled fieldset</legend>
          <div>
            <label htmlFor='name'>
              Name:
              <input type='name' id='name' value='Chris' />
            </label>
          </div>
          <div>
            <label htmlFor='pwd'>
              Archetype:
              <input type='password' id='pwd' value='Wookie' />
            </label>
          </div>
        </fieldset>
      </form>
    </>
  );
}

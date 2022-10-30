export default function FieldSet() {
  return (
    <>
      <form action='#'>
        <fieldset>
          <legend>Simple fieldset</legend>
          <input type='radio' id='radio' />
          <label for='radio'>Spirit of radio</label>
        </fieldset>
      </form>

      <form action='#'>
        <fieldset disabled>
          <legend>Disabled fieldset</legend>
          <div>
            <label for='name'>Name: </label>
            <input type='name' id='text' value='Chris' />
          </div>
          <div>
            <label for='pwd'>Archetype: </label>
            <input type='password' id='text' value='Wookie' />
          </div>
        </fieldset>
      </form>
    </>
  );
}

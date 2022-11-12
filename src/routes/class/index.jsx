import { useState } from 'react';
// import { uuid } from 'uuidv4';

export default function ClassPlayground() {
  const [userList, setUserList] = useState([]);
  const [userName, setUserName] = useState('');
  const [userAge, setUserAge] = useState(0);

  class User {
    constructor(name, age) {
      this.name = name;
      this.age = age;
    }
  }

  const onSubmitAddUser = (event) => {
    event.preventDefault();
    setUserList([...userList, new User(userName, userAge)]);
    setUserName('');
    setUserAge(0);
  };

  const onChangeUserName = (event) => {
    setUserName(event.target.value);
  };

  const onChangeUserAge = (event) => {
    setUserAge(event.target.value);
  };

  console.log(userList);

  return (
    <>
      <form action='' onSubmit={onSubmitAddUser}>
        <fieldset>
          <legend>Input User Information</legend>
          <ul>
            <li>
              <label htmlFor={'userName'}>Name : </label>
              <input
                type='text'
                placeholder='User Name'
                onChange={onChangeUserName}
                value={userName}
                id={'userName'}
              />
            </li>
            <li>
              <label htmlFor={'userAge'}>Age : </label>
              <input
                type='number'
                placeholder='User age'
                onChange={onChangeUserAge}
                value={userAge}
                id={'userAge'}
              />
            </li>
          </ul>
          <button>User생성</button>
        </fieldset>
      </form>
      {userList.map((item) => (
        <>
          <div>{item.name}</div>
          <div>{item.age}</div>
        </>
      ))}
    </>
  );
}

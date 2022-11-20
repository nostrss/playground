import React, { useState } from 'react';
// import { uuid } from 'uuidv4';

interface IUser {
  name: string | null;
  age: number | null;
}

export default function ClassPlayground() {
  const [userList, setUserList] = useState<IUser[]>([]);
  const [userName, setUserName] = useState('');
  const [userAge, setUserAge] = useState(0);

  class User {
    name: string | null;

    age: number | null;

    constructor(name: string, age: number) {
      // eslint-disable-next-line react/no-this-in-sfc
      this.name = name;
      // eslint-disable-next-line react/no-this-in-sfc
      this.age = age;
    }
  }

  const onSubmitAddUser = (event: React.FormEvent) => {
    event.preventDefault();
    setUserList([...userList, new User(userName, userAge)]);
    setUserName('');
    setUserAge(0);
  };

  const onChangeUserName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserName(event.target.value);
  };

  const onChangeUserAge = (event: any) => {
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
              <label htmlFor='userName'>
                Name :
                <input
                  type='text'
                  placeholder='User Name'
                  onChange={onChangeUserName}
                  value={userName}
                  id='userName'
                />
              </label>
            </li>
            <li>
              <label htmlFor='userAge'>
                Age :
                <input
                  type='number'
                  placeholder='User age'
                  onChange={onChangeUserAge}
                  value={userAge}
                  id='userAge'
                />
              </label>
            </li>
          </ul>
          <button type='submit'>User생성</button>
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

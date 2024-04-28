'use client';

import { ChangeEvent, FormEvent, useState } from 'react';

const InputComponent = () => {
  const [input, setInput] = useState('');

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInput(event.target.value);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(input);
    const response = await fetch('/api/FetchEmail', {
      method: 'POST',
      body: JSON.stringify({ email: input }),
      headers: {
        'content-type': 'application/json',
      },
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>Sign up to our newsletter</h1>
      <p>
        Lorem ipsum dolor sit amet, consecte adipiscing elit praesent sodales
        purus magna, eget lacinia sapien hendrerit.
      </p>
      <input onChange={(e) => handleInputChange(e)} type='email' />
      <button type='submit'>sign up</button>
    </form>
  );
};

export default InputComponent;

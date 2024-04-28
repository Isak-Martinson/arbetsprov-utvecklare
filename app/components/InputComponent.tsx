'use client';

import { ChangeEvent, FormEvent, useEffect, useState } from 'react';

const InputComponent = () => {
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    console.log('loading state: ', loading);
  }, [loading]);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInput(event.target.value);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    document.getElementById('email-input')?.blur();
    setLoading(true);
    try {
      const response = await fetch('/api/FetchEmail', {
        method: 'POST',
        body: JSON.stringify({ email: input }),
        headers: {
          'content-type': 'application/json',
        },
      });
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };

  const inputFocus = () => {
    document.getElementById('email-input')?.focus();
    document
      .getElementById('input-container')
      ?.classList.remove('border-black');
    document.getElementById('input-container')?.classList.add('border-red-400');
  };

  return (
    <form
      className='bg-white rounded-[40px] py-[72px] px-6 m-6 font-bold absolute bottom-0'
      onSubmit={handleSubmit}
    >
      <h1 className='text-[40px] leading-[48px] tracking-[-0.03em]'>
        Sign up to our newsletter
      </h1>
      <p className='pt-3 pb-6 leading-5'>
        Lorem ipsum dolor sit amet, consecte adipiscing elit praesent sodales
        purus magna, eget lacinia sapien hendrerit.
      </p>
      <div
        id='input-container'
        onClick={() => inputFocus()}
        className='flex flex-row justify-between border-4 border-black border rounded-full'
      >
        <input
          id='email-input'
          className='text-black rounded-full tracking-[-0.03em] focus:outline-none'
          //text-2xl
          onChange={(e) => handleInputChange(e)}
          type='email'
        />
        <button
          className='text-white bg-black px-4 py-1 rounded-full m-2 leading-6 tracking-[-0.03em] w-max'
          type='submit'
        >
          sign up
        </button>
      </div>
    </form>
  );
};

export default InputComponent;

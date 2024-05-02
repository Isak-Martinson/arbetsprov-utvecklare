'use client';
import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { emailRegex } from '@/config';

const InputComponent = () => {
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);
  const [formState, setFormState] = useState<'normal' | 'success' | 'error'>(
    'normal'
  );

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInput(event.target.value);
  };

  const valid = input && emailRegex.test(input);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    document.getElementById('email-input')?.blur();
    setLoading(true);

    if (!valid) {
      console.log('not valid');
      setFormState('error');
      setLoading(false);
      return;
    }

    if (valid) {
      try {
        const response: any = await fetch('/api/FetchEmail', {
          method: 'POST',
          body: JSON.stringify({ email: input }),
          headers: {
            'content-type': 'application/json',
          },
        });
        const data = await response.json();
        console.log(data);
        console.log(response.status);

        if (response.ok) {
          setFormState('success');
        }
      } catch (error) {
        console.error('error posting data: ', error);
      }
      setIsDisabled(true);
    }

    setLoading(false);
  };

  const inputFocus = () => {
    const email = document.getElementById('email-input') as HTMLInputElement;
    email?.focus();
    document
      .getElementById('input-container')
      ?.classList.remove('border-black');
    document.getElementById('input-container')?.classList.add('border-red-400');
  };

  const conditionalFormClassNames = () => {
    if (formState === 'success') {
      return 'bg-green-500 text-green-700 transition-colors duration-500';
    }

    if (valid || input.length === 0) {
      return 'bg-white transition-colors duration-500';
    }

    if (!valid) {
      return 'bg-red-300 text-red-700 transition-colors duration-500';
    }
  };

  return (
    <form
      id='form'
      className={`rounded-[40px] py-[72px] px-6 m-6 font-bold absolute bottom-0 ${conditionalFormClassNames()}`}
      onSubmit={handleSubmit}
    >
      <h1 className='text-[40px] leading-[48px] tracking-[-0.03em]'>
        Sign up to our newsletter
      </h1>
      <p className='pt-3 pb-6 leading-5'>
        Lorem ipsum dolor sit amet, consecte adipiscing elit praesent sodales
        purus magna, eget lacinia sapien hendrerit.
      </p>
      {formState === 'normal' || formState === 'error' ? (
        <div
          id='input-container'
          onClick={() => inputFocus()}
          className='flex flex-row justify-between border-4 border-black border rounded-full'
        >
          <input
            id='email-input'
            // onBlur={handleValidation}
            placeholder='Email'
            className='text-black text-2xl placeholder-black rounded-full tracking-[-0.03em] pl-6 w-[55%] focus:outline-none'
            //ändra width på input? hitta rätt styling för width att funka med text-2xl och padding
            onChange={(e) => handleInputChange(e)}
            type='email'
          />
          <button
            className='text-white bg-black px-4 py-1 rounded-full m-2 leading-6 tracking-[-0.03em] w-max'
            type='submit'
            {...(isDisabled ? { disabled: true } : { disabled: false })}
          >
            {!loading ? 'sign up' : 'signing up...'}
          </button>
        </div>
      ) : (
        <div>
          <button className='text-white bg-green-700 px-4 py-3 rounded-full leading-6 tracking-[-0.03em] w-full'>
            Thanks!
          </button>
        </div>
      )}
    </form>
  );
};

export default InputComponent;

'use client';
import { ChangeEvent, FormEvent, useState } from 'react';
import { emailRegex } from '@/config';

const InputComponent = () => {
  const [input, setInput] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [isDisabled, setIsDisabled] = useState<boolean>(false);
  const [formState, setFormState] = useState<'normal' | 'success' | 'error'>(
    'normal'
  );

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInput(event.target.value);
  };

  const valid = emailRegex.test(input);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    document.getElementById('email-input')?.blur();
    setLoading(true);

    if (formState === 'success') {
      setLoading(false);
      setInput('');
      setIsDisabled(false);
      setFormState('normal');
      return;
    }

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
        if (!response.ok) {
          setInput('a');
          setFormState('error');
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
  };

  const conditionalFormClassNames = () => {
    if (formState === 'success') {
      return 'bg-green-secondary text-green-primary transition-colors duration-500';
    }

    if (valid || input.length === 0) {
      return 'bg-secondary transition-colors duration-500';
    }

    if (!valid) {
      return 'bg-red-secondary text-red-primary transition-colors duration-500';
    }
  };

  const conditionalButtonClassNames =
    valid || input.length === 0
      ? 'bg-primary text-secondary transition-colors duration-500'
      : 'bg-red-primary text-red-secondary transition-colors duration-500';

  const borderClassNames =
    valid || input.length === 0
      ? 'border-primary transition-colors duration-500'
      : 'border-red-primary transition-colors duration-500';

  const buttonText = () => {
    if (loading) {
      return 'signing up';
    }
    if (valid || input.length === 0) {
      return 'sign up';
    }
    if (!valid) {
      return 'invalid email';
    }
  };

  return (
    <form
      noValidate
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
          className={`flex flex-row justify-between border-4 rounded-full ${borderClassNames}`}
        >
          <input
            id='email-input'
            placeholder='Email'
            className={`text-2xl placeholder-black rounded-full tracking-[-0.03em] pl-6 w-[50%] ${conditionalFormClassNames()} focus:outline-none`}
            onChange={(e) => handleInputChange(e)}
            type='email'
            autoComplete='off'
          />
          <button
            className={`px-4 py-1 rounded-full m-2 leading-6 tracking-[-0.03em] w-max ${conditionalButtonClassNames}`}
            type='submit'
            {...(isDisabled ? { disabled: true } : { disabled: false })}
          >
            {buttonText()}
          </button>
        </div>
      ) : (
        <div>
          <button className='text-green-secondary bg-green-primary border-4 border-green-primary px-4 py-3 rounded-full leading-6 tracking-[-0.03em] w-full transition-colors duration-500'>
            Thanks!
          </button>
        </div>
      )}
    </form>
  );
};

export default InputComponent;

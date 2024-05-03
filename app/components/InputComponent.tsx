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
  const items = ['.', '.', '.'];
  const valid = emailRegex.test(input);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInput(event.target.value);
    if (valid) {
      setFormState('normal');
    }
  };

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

    if (formState === 'error') {
      return 'bg-red-secondary text-red-primary transition-colors duration-500';
    }

    return 'bg-secondary transition-colors duration-500';
  };

  const conditionalButtonClassNames = () => {
    switch (formState) {
      case 'error':
        return 'bg-red-primary text-red-secondary transition-colors duration-500';
      default:
        return 'bg-primary text-secondary transition-colors duration-500';
    }
  };

  const borderClassNames = () => {
    switch (formState) {
      case 'error':
        return 'border-red-primary transition-colors duration-500';
      default:
        return 'border-primary transition-colors duration-500';
    }
  };

  const buttonText = () => {
    if (loading) {
      return 'signing up';
    }
    if (formState === 'success') {
      return 'Thanks';
    }
    return 'sign up';
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
          className={`flex flex-row justify-between border-4 rounded-full ${borderClassNames()}`}
        >
          <input
            id='email-input'
            placeholder='Email'
            className={`text-2xl placeholder-black rounded-full tracking-[-0.03em] pl-6 w-full ${conditionalFormClassNames()} focus:outline-none`}
            onChange={(e) => handleInputChange(e)}
            type='email'
            autoComplete='off'
          />
          <button
            className={`px-4 py-1 rounded-full m-2 leading-6 tracking-[-0.03em] whitespace-nowrap ${conditionalButtonClassNames()}`}
            type='submit'
            {...(isDisabled ? { disabled: true } : { disabled: false })}
          >
            <span className='flex flex-row'>
              {buttonText()}
              {loading
                ? items.map((dot, index) => (
                    <span
                      id={`animate-${index}`}
                      className={'test'}
                      key={index}
                    >
                      {dot}
                    </span>
                  ))
                : null}
            </span>
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

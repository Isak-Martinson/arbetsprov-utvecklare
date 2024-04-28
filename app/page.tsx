import InputComponent from './components/InputComponent';

export default function Home() {
  return (
    <main
      className='bg-cover bg-center h-screen'
      style={{ backgroundImage: `url('assets/images/background.gif')` }}
    >
      <InputComponent />
    </main>
  );
}

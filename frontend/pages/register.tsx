import Header from '@/components/Header';
import SignUpform from '@/components/SignUpForm';
import { useAuth } from '@/contexts/auth';

export default function Register() {
  const {register} = useAuth();

  return (
    <>
      <Header>
        <button>this is the button</button>{' '}
      </Header>
      <SignUpform onRegister={register}/>
    </>
  );
}

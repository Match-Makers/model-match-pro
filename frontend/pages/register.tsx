import Header from '@/components/Header';
import SignUpform from '@/components/SignUpForm';
import { useAuth } from '@/contexts/auth';

export default function Register() {
  const { register } = useAuth();

  return (
    <>
      <Header />
      <SignUpform onRegister={register} />
    </>
  );
}

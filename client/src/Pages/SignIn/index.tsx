import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleUser } from '@fortawesome/free-solid-svg-icons';
import { AppDispatch, RootState } from '../../store/store.ts';
import { loginUserThunk } from '../../store/authSlice.tsx';
import { useNavigate } from 'react-router-dom';
import Loader from '../../components/Loader/index.tsx';

const SignIn = () => {
  const { isLoading, isError, errorMessage } = useSelector(
    (state: RootState) => state.auth
  )
  const dispatch = useDispatch<AppDispatch>(); // Typer le dispatch
  const navigate = useNavigate();
  const [remember, setRemember] = useState<boolean>(localStorage.getItem('remember') ? JSON.parse(localStorage.getItem('remember') || '') : false);
  const [email, setEmail] = useState<string>((remember ? localStorage.getItem('email') : '') || '');
  const [password, setPassword] = useState<string>((remember ? localStorage.getItem('password') : '') || '');

  const handleSignIn = async (event: React.FormEvent) => {
    event.preventDefault();

    handleRemember({remember, email, password});

    try {
      const res = await dispatch(loginUserThunk({email, password}))
      
      if (res.type === 'login/fulfilled') {
        navigate('/profile');
      }
    } catch (e) {
      throw new Error((e as Error).message);
    }
  };
  
  const handleCheck = () => {
    localStorage.setItem('remember', JSON.stringify(!remember));
    setRemember((val) => !val);
  }

  return (
    <div className='flex flex-col items-center bg-dark-blue flex-1'>
      <section className='bg-white w-75 min-h-100 min-w-72 mx-auto relative mt-12'>
        {isLoading && 
          <div className='absolute flex h-full w-full border-black backdrop-blur-sm box-border bg-white/40'>
            <Loader />
          </div>
        }
        <div className='p-8'>
          <FontAwesomeIcon icon={faCircleUser} />
          <h1 className='text-2xl font-bold my-4'>Sign In</h1>
          <form onSubmit={handleSignIn}>
            <div className="flex flex-col text-left mb-4">
              <label htmlFor="username" className="font-bold">Username</label>
              <input
                type="text" 
                id="username" 
                className={`p-1.5 text-xl border border-gray-500 ${isLoading ? 'bg-white/30 cursor-default' : ''}`}
                value={email}
                readOnly={isLoading}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="flex flex-col text-left mb-4">
              <label htmlFor="password" className="font-bold">Password</label>
              <input
                type="password"
                id="password" 
                value={password}
                readOnly={isLoading}
                className={`p-1.5 text-xl border border-gray-500 ${isLoading ? 'bg-white/30 cursor-default' : ''}`}
                onChange={(e) => setPassword(e.target.value)}
                />
            </div>
            <div className="flex items-center mb-4">
              <input type="checkbox" id="remember-me" className={`mr-2 ${isLoading ? 'bg-white/40': ''}`} checked={remember} onChange={handleCheck} />
              <label htmlFor="remember-me">Remember me</label>
            </div>
            <button className={`block w-full p-2 font-bold mt-4 bg-blue-green text-white ${isLoading ? 'bg-blue-green/40 text-white/40': ''}`}>Sign In</button>
            {isError && <p className='mt-2 text-start text-red-600'>{errorMessage}</p>}
          </form>
        </div>
      </section>
    </div>
  );
}

const handleRemember = ({
  remember, 
  email, 
  password
}: {
  remember: boolean,
  email: string,
  password: string,
}) => {
  if (remember) {
    localStorage.setItem('email', email);
    localStorage.setItem('password', password);
  } else {
    localStorage.removeItem('email');
    localStorage.removeItem('password');
  }
}

export default SignIn;
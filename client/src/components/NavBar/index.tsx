import { Link, useLocation } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleUser, faRightFromBracket } from '@fortawesome/free-solid-svg-icons';

import { logout } from '../../store/userSlice.tsx';
import { AppDispatch, RootState } from '../../store/store.ts';
import { useDispatch, useSelector } from 'react-redux';


const NavBar = () => {
  const dispatch = useDispatch<AppDispatch>();
  const userSelector = useSelector((state: RootState) => state.user);
  const userToken = userSelector.userToken;
  const location = useLocation();

  const handleSignOut = () => {
    dispatch(logout());
    window.location.href = '/sign-in';
  };

  return (
    <nav className="flex justify-between items-center py-1.5 px-2 sm:px-5">
      <Link className="flex items-center" to="/">
        <img className="max-w-full w-50" src="/src/assets/images/argentBankLogo.png" alt="Argent Bank Logo" />
        <h1 className="sr-only">Argent Bank</h1>
      </Link>
        {userToken ? (
          <div className='flex gap-2 text-sm  xs:text-normal'>
            <Link
              className={`font-bold text-blue-grey ${location.pathname === '/profile' ? 'underline' : ''}`}
              to="/profile"
            >
              <span className='flex items-center'>
                <FontAwesomeIcon icon={faCircleUser} /><span className='hidden xs:ml-1 sm:ml-2 xs:block'>Profile</span>
              </span>
            </Link>
            <Link className="font-bold text-blue-grey" to="/sign-in">
              <span className='flex items-center' onClick={handleSignOut}>
                <FontAwesomeIcon icon={faRightFromBracket} /><span className='hidden xs:ml-1 sm:ml-2 xs:block'>Sign out</span>
              </span>
            </Link>
          </div>
        ):
        <Link className="font-bold text-blue-grey mr-2" to="/sign-in">
          <span>
            <FontAwesomeIcon icon={faCircleUser} /> Sign In
          </span>
        </Link>
        }
    </nav>
  );
}

export default NavBar;

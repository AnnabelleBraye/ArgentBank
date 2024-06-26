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
    <nav className="flex justify-between items-center py-1.5 px-5">
      <Link className="flex items-center" to="/">
        <img className="max-w-full w-50" src="/src/assets/images/argentBankLogo.png" alt="Argent Bank Logo" />
        <h1 className="sr-only">Argent Bank</h1>
      </Link>
        {userToken ? (
          <div>
            <Link
              className={`font-bold text-blue-grey mr-2 ${location.pathname === '/profile' ? 'underline' : ''}`}
              to="/profile"
            >
              <span className='mr-2'>
                <FontAwesomeIcon icon={faCircleUser} /> Profile
              </span>
            </Link>
            <Link className="font-bold text-blue-grey mr-2" to="/sign-in">
              <span onClick={handleSignOut}>
                <FontAwesomeIcon icon={faRightFromBracket} /> Sign out
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

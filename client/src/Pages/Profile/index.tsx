import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store/store.ts';
import ArgentBank, { ArgentBankProps } from '../../components/ArgentBank/index.tsx';
import { useEffect } from 'react';
import { getProfileThunk } from '../../store/userSlice.tsx';
import Modal from '../../components/Modal/index.tsx';
import Loader from '../../components/Loader/index.tsx';

const Profile = () => {
  const userSelector = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch<AppDispatch>();
  const [isOpened, setIsOpened] = useState<boolean>(false);
  const userToken = userSelector.userToken;
  const isTokenAvalaible = Boolean(userToken);
  const isDataReady = userSelector.user?.firstName || userSelector.user?.lastName;

  useEffect(() => {
    if (userToken) {
      dispatch(getProfileThunk({token: userToken}));
    }
  }, [dispatch, userToken]);

  const argentBank: ArgentBankProps[] = [{
    title: 'Argent Bank Checking (x8349)',
    money: '$2,082.79',
    balance: 'Available Balance'
  }, {
    title: 'Argent Bank Savings (x6712)',
    money: '$10,928.42',
    balance: 'Available Balance'
  }, {
    title: 'Argent Bank Credit Card (x8349)',
    money: '$184.30',
    balance: 'Current Balance'
  }]

  const handleCloseModal = () => {
    setIsOpened(false);
  }

  return (
    <React.Fragment>
        {isTokenAvalaible?
          <React.Fragment>
            <div className={`flex flex-col items-center bg-dark-blue flex-1 text-white`}>
              {userSelector.isLoading || !isDataReady ? (
                <div className='flex items-center h-screen text-center flex-1'>
                  <div className='h-full'>
                    <Loader />
                  </div>
                </div>
              ) : (
                <React.Fragment>
                  <div className="mb-8">
                    <h1 className='text-3.5xl font-bold my-4 leading-tight'>Welcome back<br />{userSelector.user.firstName} {userSelector.user.lastName} !</h1>
                    <button
                      onClick={() => setIsOpened(true)}
                      className="bg-blue-green font-bold p-2.5 text-sm border-solid border-2 border-l-blue-green border-t-blue-green border-b-blue-green-border border-r-blue-green-border leading-none">
                        Edit Name
                    </button>
                  </div>
                  {argentBank.map((bank, index) => (
                    <ArgentBank key={index} title={bank.title} money={bank.money} balance={bank.balance} />
                  ))}
                  
                  {isOpened && (
                    <div className="fixed inset-0 backdrop-blur-sm bg-dark-blue/40 flex items-center justify-center">
                      <Modal isOpened={isOpened} closeModal={handleCloseModal} />
                    </div>
                  )}
                </React.Fragment>
              )}
            </div>
          </React.Fragment> :
          <div className='h-screen mt-16'>Votre session a expiré, veuillez vous reconnecter.</div>
      }
    </React.Fragment>
  );
}

export default Profile;

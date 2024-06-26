import { FormEvent, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, RootState } from "../../store/store"
import { editProfileThunk } from "../../store/userSlice"

type ModalProps = {
  isOpened: boolean,
  closeModal: () => void,
}

const Modal = ({ isOpened, closeModal }: ModalProps) => {
  const userSelector = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch<AppDispatch>();
  const [firstName, setFirstName] = useState<string>(userSelector.user.firstName || '');
  const [lastName, setLastName] = useState<string>(userSelector.user.lastName || '');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    try {
      dispatch(editProfileThunk({token: userSelector.userToken || '', firstName, lastName}))
      closeModal();
    } catch (e) {
      throw new Error((e as Error).message);
    }
  }

  const handleCloseModal = (e: FormEvent) => {
    e.preventDefault();
    closeModal();
  }
  return (
    <div className={`w-3/5 h-screen m-auto ${isOpened ? 'flex flex-col items-center justify-center' : 'hidden'}`}>
      <div className="bg-white w-full h-3/5 mx-auto p-4 rounded-lg text-black">
        <form className="flex flex-col gap-4 h-full">
          <div className="flex justify-between mb-4 h-auto">
            <h2 className="text-2xl font-bold">Edit user info</h2>
            <button 
              type="button" 
              className="close text-4xl" 
              onClick={closeModal}
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="flex flex-col gap-4 flex-1">
            <label htmlFor="firstname" className="text-left">
              First name:
            </label>
            <input
              type="text" 
              id="firstname" 
              name="firstname" 
              value={firstName} 
              onChange={(e) => setFirstName(e.currentTarget.value)}
              className="min-h-8 rounded-lg border border-black p-2 bg-gray-100" 
            />

            <label htmlFor="lastname" className="text-left">
              Last name:
            </label>
            <input 
              type="text" 
              id="lastname"
              name="lastname" 
              value={lastName} 
              onChange={(e) => setLastName(e.currentTarget.value)}
              className="min-h-8 rounded-lg border border-black p-2 bg-gray-100" 
            />
          </div>
          <div className="flex justify-end mt-4">
            <button onClick={(e) => handleSubmit(e)} className="min-w-1/5 mx-2 border border-blue-green bg-blue-green text-white font-bold py-2 px-4">Validate</button>
            <button 
              onClick={(e) => handleCloseModal(e)}  
              className="min-w-1/5 mx-2 border border-blue-green bg-blue-green text-white font-bold py-2 px-4">
                Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Modal;
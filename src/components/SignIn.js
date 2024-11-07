import { useState } from 'react';
import { AiOutlineLogin } from 'react-icons/ai'
import SignInModal from './SignInModal';


export default function SignIn() {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    return (
        <>
            <AiOutlineLogin onClick={openModal} className='text-black cursor-pointer' title='Sign In'/>
            {isModalOpen && <SignInModal onClose={closeModal} />}
        </>
            
    );
}

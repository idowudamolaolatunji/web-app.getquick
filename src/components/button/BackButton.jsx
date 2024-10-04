import React from 'react'
import { useNavigate } from 'react-router-dom';
import DefaultButton from './DefaultButton';
import { MdKeyboardBackspace } from 'react-icons/md';

function BackButton({ to=-1 }) {
    const navigate = useNavigate();
    return (
        <DefaultButton>
            <div className='page__section-back' onClick={() => navigate(to)} >
                <MdKeyboardBackspace />
            </div>
        </DefaultButton>
    )
}

export default BackButton
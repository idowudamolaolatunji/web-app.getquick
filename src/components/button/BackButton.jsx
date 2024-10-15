import React from 'react'
import { useNavigate } from 'react-router-dom';
import DefaultButton from './DefaultButton';
import { MdKeyboardBackspace } from 'react-icons/md';

function BackButton({ to=-1, close }) {
    const navigate = useNavigate();

    // I NEED YOU TO REMEMBER WHAT'S GOING ON HERE...

    return (
        <DefaultButton>
            <div className='page__section-back' onClick={() => !close ? navigate(to) : close()} >
                <MdKeyboardBackspace />
            </div>
        </DefaultButton>
    )
}

export default BackButton
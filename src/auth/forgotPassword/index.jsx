import React from 'react'
import AuthsUI from '../authComponents/AuthsUI';

import data_img from '../../assets/images/resources/good-faces-lhMdsnK_KWk-unsplash.jpg'

const headingText = "The Power to Manage, at Your Fingertips."

function index() {
    return (
        <>


            <AuthsUI backText="Back to login" backLink="/login" heading={headingText} dataimg={data_img}>
                <form>

                </form>
            </AuthsUI>
        </>
    )
}

export default index
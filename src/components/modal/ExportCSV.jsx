import React, { useState } from 'react'
import Overlay from '../Overlay'
import { AiOutlineClose } from 'react-icons/ai'
import { CgSoftwareDownload } from 'react-icons/cg'
import { SiMinutemailer } from 'react-icons/si'
import { useAuthContext } from '../../context/AuthContext'
import { useWindowSize } from 'react-use'
import { Link } from 'react-router-dom'
import { LuCheckCircle } from 'react-icons/lu'
import { validateExportCsvInput } from '../../utils/validationHelper'
import CustomAlert from '../CustomAlert'

function ExportCSV({ title, data, setClose }) {

    const { width } = useWindowSize();
    const { store } = useAuthContext();
    const { isPremium } = store?.isPremium;
    const hasConvert = store?.csvConvertions;

    const [modalInputError, setModalImputError] = useState("");
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const [response, setResponse] = useState({ status: null, message: null });

    function handleClose() {
        setClose(false)
    }

    function handleSendExport() {
        const newError = validateExportCsvInput(email);
        console.log(newError)
        setModalImputError(newError);
        if (newError) return;


        // others...
    }


    function handleDownloadExport() {
        if(!hasConvert) {
            return setResponse({ status: "error", message: "Free Exports Used Up!" })
        }


        setResponse({ status: "success", message: "success!" })
    }

    return (
        <>
            {(response.message || response.status) && (
                <CustomAlert type={response.status} message={response.message} />
            )}

            <Overlay handleClose={handleClose} />
            <div className='export modal'>
                <div className="modal--head">
                    <h3>Export {title}(s) CSV</h3>
                    <span onClick={handleClose}>
                        <AiOutlineClose />
                    </span>
                </div>

                <div className="modal--body">
                    <p>
                        All {title} data will be exported, Either to the email provided or can be downloded!
                        <br />

                        {!isPremium && (
                            <span style={{ paddingTop: "1rem", display: "inline-block" }}>
                                You have <strong>"{!hasConvert ? "No" : hasConvert} More Free Exports"</strong> {!hasConvert ? "😔" : "😉"} left!{" "}

                                {!hasConvert && (
                                    <Link to='/dashboard/subscription' className='upgrade--link'
                                    style={{ color: "brown", padding: 0, backgroundColor: "transparent", fontSize: "1.3rem", textTransform: "capitalize", fontWeight: "600", marginLeft: ".4rem" }}>
                                        Try upgrading <LuCheckCircle />
                                    </Link>
                                )}
                            </span>
                        )}
                    </p>

                    <div className='modal--form'>
                        <span>
                            <input type="email" className='form--input' value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Provide email address for CSV export' {...(!hasConvert && { readOnly: true, disabled: true })} />
                            <span className="form--error-message">
                                {modalInputError && modalInputError}
                            </span>
                        </span>
                        <button onClick={handleSendExport} {...(!hasConvert && { disabled: true })}>Export to email! <SiMinutemailer /></button>
                    </div>

                    <div className='modal--others'>
                        <span>or just</span>
                        <button onClick={handleDownloadExport}>Download <CgSoftwareDownload /></button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ExportCSV
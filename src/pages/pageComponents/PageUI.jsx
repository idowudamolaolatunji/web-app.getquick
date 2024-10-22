import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useWindowSize } from 'react-use';
import { useDataContext } from '../../context/DataContext';
import { ImEye, ImEyeBlocked } from 'react-icons/im';
import { PiShareFatFill } from 'react-icons/pi';
import { BiChevronDown, BiPlus } from 'react-icons/bi';
import TableUI from '../../components/TableUI';
import EmptyTableComponent from '../../components/EmptyTableComponent';
import Spinner from '../../components/spinner/spinner_two';
import ExportCSV from '../../components/modal/ExportCSV';
import CustomAlert from '../../components/CustomAlert';


function PageUI({ items, pageName, columns, data, addUrl, emptyTitle, emptyText, emptyImg, emptyBtns, emptyClassName, headTabs, error, loader, activeDisplayTab=null, children }) {

    const navigate = useNavigate();
    const { width } = useWindowSize();
    const { handleToggleInsights, showInsights } = useDataContext();
    const widthandItem500 = (items && items.length > 0 && width < 500);

    const [showMoreActions, setShowMoreActions] = useState(false);
    const [showExportModal, setShowExportModal] = useState(false);
    const [response, setResponse] = useState({ status: null, message: null });


    function handleShowExportModal() {
        if(!items || items?.length == 0) {
            setResponse({ status: "error", message: `No ${pageName} data to export! ` });
            setTimeout(() => setResponse({ status: null, message: null }), 2500)
        } else {
            setShowExportModal(true)
        }
    }

    return (
        <>
            {(response.message || response.status) && (
                <CustomAlert type={response.status} message={response.message} />
            )}

            <div className='page__section--heading' style={widthandItem500 ? {flexDirection: 'column', gap: '1.2rem', alignItems: 'flex-start'} : {}}>
                <span>
                    <h2 className="page__section--title">{pageName}s</h2>
                    {width > 600 && <p className='page__section--text'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem, facilis.</p>}
                </span>

                <span className='page__section--btns' style={widthandItem500 ? { width: "100%", display: "grid", gridTemplateColumns: "1fr 1fr" } : {}}>

                    {(items && items?.length > 0) && (
                        <button className="page__section-top-btn add" onClick={() => navigate(`/dashboard/${addUrl}`)}>Add {pageName} <BiPlus /></button>
                    )}

                    <span className="page__section--action" onMouseLeave={() => setShowMoreActions(false)}>
                        <button onClick={() => setShowMoreActions(!showMoreActions)} className="page__section-top-btn more">More Actions <BiChevronDown /></button>

                        {showMoreActions && (
                            <ul className="page__section--dropdown">
                                <li onClick={() => handleToggleInsights(pageName)}>
                                    <span>
                                        {showInsights?.[pageName] ? <ImEyeBlocked /> : <ImEye />}
                                    </span>
                                    {showInsights?.[pageName] ? 'Hide' : 'Show'} Insights
                                </li>
                                <li onClick={handleShowExportModal}>
                                    <span><PiShareFatFill /></span>Export CSV
                                </li>
                            </ul>
                        )}
                    </span>
                </span>
            </div>
            

            {children}

            <div className="page__section--main card" style={{ padding: 0 }}>
                <TableUI
                    data={data}
                    columns={columns}
                    name={pageName}
                    selectableRows={true}
                    toLink={`/dashboard/${pageName}s`}
                    loader={loader?.[pageName]}
                    error={error?.[pageName]}
                    headTabs={headTabs}
                    emptyComponent={
                        <EmptyTableComponent
                            img={emptyImg}
                            text={emptyText}
                            btns={emptyBtns}
                            title={emptyTitle}
                            className={emptyClassName}
                        />
                    }
                    {...(activeDisplayTab && {displayType: activeDisplayTab})}
                />
            </div>



            {showExportModal && (
                <ExportCSV
                    data={data} 
                    title={pageName}
                    setClose={setShowExportModal}
                />
            )}

        </>

  )
}

export default PageUI
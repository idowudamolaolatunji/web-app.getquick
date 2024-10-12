import React, { useEffect } from 'react'
import { MdOutlineStorefront } from 'react-icons/md';
import { useWindowSize } from 'react-use'
import BackButton from '../../../components/button/BackButton';
import Line from '../../../components/Line';

function StoreCustom({ isnew, close }) {
    const { width } = useWindowSize();


    useEffect(function () {
        !isnew && window.scrollTo(0, 0);
    }, []);

  return (
    <section className='product__upload-section'>
            <div className='page__section--heading'>
                <span className='flex justify'>
                    <BackButton close={close} />
                    <h2 className="page__section--title">Customize Your Store<MdOutlineStorefront /></h2>
                </span>

                {width > 600 && (
                    <div className="page__section--actions">
                        <button className='button clear--button'>Clear Fields</button>
                        <button className='button submit--button'>Submit</button>
                    </div>
                )}
            </div>



           {width < 600 && <Line border={1.4} />}


            <div className="form" style={{ marginTop: width < 600 ? '4rem' : "8rem" }}>
                <div className="section--heading">
                    <h2>Headings..</h2>
                    <p>Lorem ipsum dolor sit amet.</p>
                </div>


            </div>


            {width < 600 && (
                <div className="page__section--actions" style={{ marginTop: "4rem" }}>
                    <button className='button clear--button'>Clear Fields</button>
                    <button className='button submit--button'>Submit</button>
                </div>
            )}
        </section>
  )
}

export default StoreCustom
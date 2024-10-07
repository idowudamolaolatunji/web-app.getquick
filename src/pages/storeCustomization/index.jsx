import React from 'react';

import main_theme from '../../assets/images/themes/original-5fd4642ef1335c41fba6b920ab037b3d.png';
import main_theme2 from '../../assets/images/themes/original-fedd2a318fd98d7b8ab74db4971a841e.png';
import './style.css'
import Line from '../../components/Line';


function index() {
    return (

        <>
            <div className='page__section--heading'>
                <span>
                    <h2 className="page__section--title">Store Customisation</h2>
                    <p className='page__section--text'>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
                </span>
            </div>

            <div className='theme--grid' style={{ marginBottom: '6rem' }}>
                <figure className='theme__main'>
                    <img className='theme__main--img' src={main_theme} alt="main theme" />

                    <figcaption className='theme__main--detail'>
                        <div className="">
                            <h3>Default Theme</h3>
                        </div>
                        <button>Customise!</button>
                    </figcaption>
                </figure>


                <figure className='theme__main'>
                    <img className='theme__main--img' src={main_theme2} alt="main theme" />

                    <figcaption className='theme__main--detail'>
                        <div className="">
                            <h3>Default Theme</h3>
                        </div>
                        <button>Customise!</button>
                    </figcaption>
                </figure>
            </div>



            <Line where="Bottom" value="4rem" border={1.4} />


            <div className="card theme--grid">
                <figure className='theme__main'>
                    <img className='theme__main--img' src={main_theme2} alt="main theme" />

                    <figcaption className='theme__main--detail'>
                        <div className="">
                            <h3>Default Theme</h3>
                        </div>
                        <button>Customise!</button>
                    </figcaption>
                </figure>


                <figure className='theme__main'>
                    <img className='theme__main--img' src={main_theme2} alt="main theme" />

                    <figcaption className='theme__main--detail'>
                        <div className="">
                            <h3>Default Theme</h3>
                        </div>
                        <button>Customise!</button>
                    </figcaption>
                </figure>


                <figure className='theme__main'>
                    <img className='theme__main--img' src={main_theme2} alt="main theme" />

                    <figcaption className='theme__main--detail'>
                        <div className="">
                            <h3>Default Theme</h3>
                        </div>
                        <button>Customise!</button>
                    </figcaption>
                </figure>
            </div>

        </>
    )
}

export default index
import React from 'react';

import main_theme_desktop from '../../assets/images/themes/original-becb3b20d4a98dc486c4e97053701f41.jpg';
import main_theme_phone from '../../assets/images/themes/original-7d222ce93cbc3ec4c1a6445f6d02142c.jpg';

import main_theme2 from '../../assets/images/themes/original-5fd4642ef1335c41fba6b920ab037b3d.png';
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

            <figure className='theme__main'>
                <div className="theme__img--flex">
                    <span className='theme__main--img desktop'>
                        <img src={main_theme_desktop} alt="main theme desktop" />
                    </span>
                    <span className='theme__main--img phone'>
                        <img src={main_theme_phone} alt="main theme phone" />
                    </span>
                </div>

                <figcaption className='theme__main--detail'>
                    <div className="">
                        <h3>Main Default Theme</h3>
                    </div>
                    <button>Customise!</button>
                </figcaption>
            </figure>



            <section className="card">
                <div className="section--heading" style={{ marginBottom: '2.8rem' }}>
                    <h2>Other free themes</h2>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum placeat quam consectetur.</p>
                </div>


                <div className="theme--grid">
                    <figure className='theme__others'>
                        <img className='theme__others--img' src={main_theme2} alt="main theme" />

                        <figcaption className='theme__others--detail'>
                            <div className="">
                                <h3>Default Theme</h3>
                            </div>
                            <button>Customise!</button>
                        </figcaption>
                    </figure>


                    <figure className='theme__others'>
                        <img className='theme__others--img' src={main_theme2} alt="main theme" />

                        <figcaption className='theme__others--detail'>
                            <div className="">
                                <h3>Default Theme</h3>
                            </div>
                            <button>Customise!</button>
                        </figcaption>
                    </figure>


                    <figure className='theme__others'>
                        <img className='theme__others--img' src={main_theme2} alt="main theme" />

                        <figcaption className='theme__others--detail'>
                            <div className="">
                                <h3>Default Theme</h3>
                            </div>
                            <button>Customise!</button>
                        </figcaption>
                    </figure>
                </div>
            </section>

        </>
    )
}

export default index
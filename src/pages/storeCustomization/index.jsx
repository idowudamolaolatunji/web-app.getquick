import React from 'react';

import main_theme_desktop from '../../assets/images/themes/original-becb3b20d4a98dc486c4e97053701f41.jpg';
import main_theme_phone from '../../assets/images/themes/original-7d222ce93cbc3ec4c1a6445f6d02142c.jpg';
import others_theme1 from '../../assets/images/themes/original-5fd4642ef1335c41fba6b920ab037b3d.png';
import others_theme2 from '../../assets/images/themes/original-fedd2a318fd98d7b8ab74db4971a841e.png';
import more_themes from '../../assets/images/resources/dizzy-empty-browser-window-with-red-buttons.png'


import './style.css'


function index() {
    return (

        <>
            <div className='page__section--heading'>
                <span>
                    <h2 className="page__section--title">Store Customisation</h2>
                    <p className='page__section--text'>Personalize your store's appearance with our customizable themes.</p>
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
                        <h3>Quiwka Default Theme</h3>
                    </div>
                    <button>Customise!</button>
                </figcaption>
            </figure>



            <section className="card" style={{ marginBottom: '4rem' }}>
                <div className="section--heading" style={{ marginBottom: '2.8rem' }}>
                    <h2>Other free themes</h2>
                    <p>Feature-rich and customizable, user-friendly <strong>free</strong> templates.</p>
                </div>


                <div className="theme--grid">
                    <figure className='theme__others'>
                        <img className='theme__others--img' src={others_theme2} alt="main theme" />

                        <figcaption className='theme__others--detail'>
                            <div className="">
                                <h3>Kiwi</h3>
                                <span>free</span>
                            </div>

                            <div className="">
                                <button>Customise!</button>
                                <span>View Demo</span>
                            </div>
                        </figcaption>
                    </figure>


                    <figure className='theme__others'>
                        <img className='theme__others--img' src={others_theme2} alt="main theme" />

                        <figcaption className='theme__others--detail'>
                            <div className="">
                                <h3>Madi</h3>
                                <span>free</span>
                            </div>

                            <div className="">
                                <button>Customise!</button>
                                <span>View Demo</span>
                            </div>
                        </figcaption>
                    </figure>
                </div>
            </section>


            <section className="card">
                <div className="section--heading" style={{ marginBottom: '2.8rem' }}>
                    <h2>Other <strong>premium</strong> themes</h2>
                    <p>Feature-rich <strong>premium</strong> templates&mdash; drag-n-drop templates for effortless and easy customization.</p>
                </div>


                <div className="theme--grid">
                    <figure className='theme__others'>
                        <img className='theme__others--img' src={others_theme1} alt="main theme" />

                        <figcaption className='theme__others--detail'>
                            <div className="">
                                <h3>Tawa</h3>
                                <span>premium</span>
                            </div>

                            <div className="">
                                <button>Customise!</button>
                                <span>View Demo</span>
                            </div>
                        </figcaption>
                    </figure>

                    <figure className='theme__others'>
                        <img className='theme__others--img' src={others_theme1} alt="main theme" />

                        <figcaption className='theme__others--detail'>
                            <div className="">
                                <h3>Nonso</h3>
                                <span>premium</span>
                            </div>

                            <div className="">
                                <button>Customise!</button>
                                <span>View Demo</span>
                            </div>
                        </figcaption>
                    </figure>

                    <figure className='theme__others'>
                        <img className='theme__others--img' src={others_theme1} alt="main theme" />

                        <figcaption className='theme__others--detail'>
                            <div className="">
                                <h3>Nile</h3>
                                <span>premium</span>
                            </div>

                            <div className="">
                                <button>Customise!</button>
                                <span>View Demo</span>
                            </div>
                        </figcaption>
                    </figure>

                    <figure className='theme__others'>
                        <img className='theme__others--img' src={others_theme1} alt="main theme" />

                        <figcaption className='theme__others--detail'>
                            <div className="">
                                <h3>Kaba</h3>
                                <span>premium</span>
                            </div>

                            <div className="">
                                <button>Customise!</button>
                                <span>View Demo</span>
                            </div>
                        </figcaption>
                    </figure>
                </div>
            </section>


            <section className='more--theme-box'>
                <img src={more_themes} alt="more themes coming.." />
                <p>More themes coming soon!</p>
            </section>

        </>
    )
}

export default index
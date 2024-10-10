import React, { useEffect, useState } from 'react'
import Cropper from 'react-easy-crop';
import { useWindowSize } from 'react-use';
import ReactImageUploading from 'react-images-uploading';

import Asterisk from '../../../components/Asterisk';
import TooltipUI from '../../../components/TooltipUI';
import QuillEditor from '../../../components/QuillEditor';
import BackButton from '../../../components/button/BackButton';
import Spinner_Simple from '../../../components/spinner/simple'
import SimpleModal from '../../../components/modal/Simple';

import { MdClose } from 'react-icons/md';
import { RxUpdate } from 'react-icons/rx';
import { GoStack } from 'react-icons/go';
import { PiFrameCorners } from 'react-icons/pi';
import { AiOutlineClose, AiOutlinePlus } from 'react-icons/ai';
import { IoCloseOutline, IoCloudDownloadOutline } from 'react-icons/io5';
import '../../uploadStyle.css';
import { Slider } from '@mui/material';
import DropdownInput from './DropdownInput';
import CurrencyInput from 'react-currency-input-field';
import { useAuthContext } from '../../../context/AuthContext';
import { FaCheck } from 'react-icons/fa';
import Line from '../../../components/Line';


function UploadProduct({ isnew, close }) {
    const { width } = useWindowSize();
    const { store } = useAuthContext();
    const currency = "₦"

    const [cropModal, setCropModal] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);

    const [crop, setCrop] = useState({ x: 0, y: 0 })
    const [zoom, setZoom] = useState(1);
    const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

    const [productData, setProductData] = useState({

        price: null,
        cost: null,
        quantity: null,
        status: "publish"
    });

    const [checks, setChecks] = useState({
        inventory: false,
        physical: true
    });


    const [loading, setLoading] = useState({
        mainLoading: false,
        imageLoading: false
    })
    const [images, setImages] = useState([]);
    const maxNumber = 4;


    function handleOnChangeImage(imageList, addUpdateIndex) {
        console.log(imageList, addUpdateIndex);
        setImages(imageList);
    };
    // const imageArray = images.map(img => img.file);
    // console.log(imageArray)

    function handleEdit(img) {
        setCropModal(true);
        setSelectedImage(img)
    }

    function onCropChange(crop) {
        setCrop(crop)
    }
    function onZoomChange(zoom) {
        console.log(zoom)
        setZoom(Number(zoom))
    }
    console.log(zoom)


    const onAspectChange = (e) => {
        const value = e.target.value;
        console.log(value)
        const ratio = aspectRatios.find((ratio) => ratio.value == value);
        setAspect(ratio);
    };

    const onCropComplete = (croppedArea, croppedAreaPixels) => {
        setCroppedAreaPixels(croppedAreaPixels);
    };

    //   const onCrop = async () => {
    //     const croppedImageUrl = await getCroppedImg(imageUrl, croppedAreaPixels);
    //     setCroppedImageFor(id, crop, zoom, aspect, croppedImageUrl);
    //   };


    function handleProductDataChange(e) {
        const { name, value } = e?.target;
        console.log(name, value)
        setProductData({
            ...productData,
            [name]: value,
        });
    }



    useEffect(function () {
        window.scrollTo(0, 0);
    }, []);


    return (
        <>
            <section className='product__upload-section'>
                <div className='page__section--heading'>
                    <span className='flex'>
                        <BackButton close={close} />
                        <h2 className="page__section--title">Upload {isnew ? "First" : "new"} product</h2>
                    </span>
                </div>


                <div className="product__upload--container">
                    <div className='left--container containers'>
                        <div className="card form">
                            <div className="section--heading">
                                <h2>Product Details</h2>
                                <p>Lorem ipsum dolor sit amet.</p>
                            </div>

                            <div className="form--item">
                                <label htmlFor="" className="form--label">Title <Asterisk /></label>
                                <input type="text" name="" id="" className="form--input" placeholder='White Flat Shoe - Big Size 39, 42' />
                            </div>
                           
                            <div className="form--item">
                                <label className="form--label">Product Images (Min 1 & Max 4) <Asterisk /></label>

                                <ReactImageUploading
                                    multiple
                                    value={images}
                                    maxNumber={maxNumber}
                                    dataURLKey="data_url"
                                    acceptType={["jpg", "png"]}
                                    onChange={handleOnChangeImage}
                                >
                                    {({ imageList, onImageUpload, onImageRemoveAll, onImageUpdate, onImageRemove, isDragging, dragProps
                                    }) => (
                                        <div className='form--image'>
                                            {(imageList.length > 2 && width > 600) && (
                                                <button type='button' style={{ margin: '-3.4rem 0 .6rem auto' }} onClick={onImageRemoveAll}>Remove All Images <IoCloseOutline /></button>
                                            )}

                                            {imageList?.length < 1 && (
                                                <div onClick={onImageUpload} className={`form--img-box ${isDragging ? 'dropping' : ''}`} {...dragProps}>
                                                    {isDragging ? (
                                                        <span className='img--container'>
                                                            <GoStack />
                                                            <h3>Drop It</h3>
                                                        </span>
                                                    ) : (
                                                        <span className='img--container' {...dragProps}>
                                                            <IoCloudDownloadOutline style={{ color: '#ff7a49' }} />
                                                            <h3>Upload or Drag n drop Image</h3>
                                                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro, cumque.</p>
                                                        </span>
                                                    )}
                                                </div>
                                            )}

                                            {imageList.length > 0 && (
                                                <div className='img--grid'>
                                                    {imageList?.map((image, index) => (
                                                        <div key={index} className="img--item">
                                                            <img src={image.data_url} />
                                                            <div className="img--item-btns">
                                                                <TooltipUI placement='bottom' title="Change Image">
                                                                    <button onClick={() => onImageUpdate(index)}><RxUpdate /> </button>
                                                                </TooltipUI>
                                                                <TooltipUI placement='bottom' title="Remove Image">
                                                                    <button onClick={() => onImageRemove(index)}><MdClose /></button>
                                                                </TooltipUI>
                                                                <TooltipUI placement='bottom' title="Crop Image">
                                                                    <button onClick={() => handleEdit(image.data_url)}><PiFrameCorners /> </button>
                                                                </TooltipUI>
                                                            </div>
                                                        </div>
                                                    ))}

                                                    {imageList.length < maxNumber && (
                                                        <div onClick={onImageUpload} className={`form--img-box ${isDragging ? 'dropping' : ''}`} {...dragProps}>
                                                            {isDragging ? (
                                                                <span className='img--container'>
                                                                    <GoStack />
                                                                    <h3>Drop It</h3>
                                                                </span>
                                                            ) : (
                                                                <span className='img--container' {...dragProps}>
                                                                    <IoCloudDownloadOutline />
                                                                    <p>Upload or drop more!</p>
                                                                </span>
                                                            )}
                                                        </div>
                                                    )}
                                                </div>
                                            )}

                                            {(imageList.length > 2 && width < 600) && (
                                                <button type='button' style={{ marginTop: '1rem' }} onClick={onImageRemoveAll}>Remove All Images <IoCloseOutline /></button>
                                            )}
                                        </div>
                                    )}
                                </ReactImageUploading>
                            </div>

                            <div className="form--item">
                                <label htmlFor="" className="form--label">Short Description</label>
                                <input type="text" name="" id="" className="form--input" placeholder='Lorem ipsum dolor sit amet consectetur.' />
                            </div>
                            <div className="form--item">
                                <label htmlFor="" className="form--label">Product Description <Asterisk /></label>
                                <QuillEditor />
                            </div>

                            <div className="form--item">
                                <label htmlFor="category" className="form--label">Collection <Asterisk /></label>
                                <DropdownInput />

                                <button className='form--click'>
                                    <AiOutlinePlus />
                                    <p>Create Collection</p>
                                </button>
                            </div>

                        </div>
                    </div>

                    
                    {width < 400 && <Line border={1.4} />}

                    <div className='right--container containers'>
                        <div className="card form">
                            <div className="section--heading">
                                <h2>Pricings & Inventory</h2>
                                {width > 400 && <Line border={1.4} where="Top" value="1rem" />}
                            </div>

                            <div className="form--item">
                                <label htmlFor="" className="form--label">Price per item <Asterisk /></label>
                                <CurrencyInput
                                    id="price"
                                    name="price"
                                    className="form--input"
                                    placeholder="₦15,000"
                                    prefix={currency}
                                    decimalsLimit={2}
                                    onValueChange={(value, name, _) => setProductData({ ...productData, [name]: value })}
                                />
                            </div>

                            <div className="form--grid">
                                <div className="form--item">
                                    <label htmlFor="cost-price" className="form--label">Cost per item (optional)</label>
                                    <CurrencyInput
                                        id="cost-price"
                                        name="cost"
                                        className="form--input"
                                        placeholder="₦10,000"
                                        prefix={currency}
                                        decimalsLimit={2}
                                        onValueChange={(value, name, _) => setProductData({ ...productData, [name]: value })}
                                    />
                                </div>

                                <div className="form--item">
                                    <label htmlFor="discount-price" className="form--label">Discount Price (optional)</label>
                                    <CurrencyInput
                                        id="discount-price"
                                        name="discount"
                                        className="form--input"
                                        placeholder="₦7,000"
                                        prefix={currency}
                                        decimalsLimit={2}
                                        onValueChange={(value, name, _) => setProductData({ ...productData, [name]: value })}
                                    />
                                </div>
                            </div>

                            <div className="form--grid">
                                <div className="form--item-flex" onClick={() => setChecks({ ...checks, physical: !checks.physical })}>
                                    <div id="checkbox" className={checks.physical ? 'is-selected' : ''}>
                                        {checks.physical && <FaCheck />}
                                    </div>
                                    <label className='form--text' style={{ fontSize: '1.24rem', fontWeight: '500' }}>This is a physical product</label>
                                </div>
                                <div className="form--item-flex" onClick={() => setChecks({ ...checks, inventory: !checks.inventory })}>
                                    <div id="checkbox" className={checks.inventory ? 'is-selected' : ''}>
                                        {checks.inventory && <FaCheck />}
                                    </div>
                                    <label className='form--text' style={{ fontSize: '1.24rem', fontWeight: '500' }}>Track Inventory</label>
                                </div>
                            </div>

                            <div className="form--item">
                                <label htmlFor="quantity" className="form--label">Stock Quantity <Asterisk /></label>
                                <CurrencyInput
                                    id="quantity"
                                    name="quantity"
                                    className="form--input"
                                    placeholder="Quantity"
                                    prefix="Qty. "
                                    decimalsLimit={0}
                                    onValueChange={(value, name, _) => setProductData({ ...productData, [name]: value })}
                                />
                            </div>

                        </div>


                        {width < 400 && <Line border={1.4} />}


                        <div className="card form">
                            <div className="section--heading">
                                <div className="flex" style={{ justifyContent: "space-between" }}>
                                    <h2>Visibility Status</h2>
                                    <span className={`status--dot ${productData.status}`}></span>
                                </div>
                                {width > 400 && <Line border={1.4} where="Top" value="1rem" />}
                            </div>

                            <div className="form--item">
                                <label htmlFor='status' className='form--label'>Set Status</label>
                                <select name="status" id='status' value={productData.status} className="form--select" onChange={handleProductDataChange}>
                                    <option value="publish">Publish</option>
                                    <option value="draft">Draft</option>
                                </select>
                            </div>
                        </div>


                        {width < 400 && <Line border={1.4} />}


                        <div className="card form">
                            <div className="section--heading">
                                <h2>Product Variations</h2>
                                {width > 400 && <Line border={1.4} where="Top" value="1rem" />}
                            </div>

                            <div className="form--item">
                            <button className="form--click">
                                <AiOutlinePlus />
                                <p>Add options like size or color</p>
                            </button>
                            </div>

                        </div>
                    </div>
                </div>
            </section>




            {cropModal && (
                <SimpleModal setClose={setCropModal} title="Crop Image" icon={<AiOutlineClose />}>
                    <div className='crop--container' style={{ height: width < 600 ? 250 : 300, background: "#333" }}>
                        <Cropper
                            image={selectedImage}
                            crop={crop}
                            zoom={zoom}
                            aspect={1}
                            onCropChange={onCropChange}
                            onCropComplete={onCropComplete}
                            onZoomChange={onZoomChange}
                        />
                    </div>

                    <div className="controls">
                        <div className="form--item" style={{ gap: 0, marginTop: '1rem' }}>
                            <label className="form--label">Zoom</label>
                            <Slider sx={{ color: '#ff7a49', width: "50%" }} max={3} min={1} step={0.1} value={zoom} onChange={(e) => onZoomChange(e.target.value)} />
                        </div>
                        <div className="button-area">
                            {/* <button onClick={onCancel}>Cancel</button>
                            <button onClick={onResetImage}>Reset</button>
                            <button onClick={onCrop}>Crop</button> */}
                            <button onClick={() => setCropModal(false)}>Cancel</button>
                            <button>Reset</button>
                            <button>Crop</button>
                        </div>
                    </div>
                </SimpleModal>
            )}
        </>
    )
}

export default UploadProduct
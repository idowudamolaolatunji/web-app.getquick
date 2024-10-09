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
import { AiOutlineClose } from 'react-icons/ai';
import { IoCloseOutline, IoCloudDownloadOutline } from 'react-icons/io5';
import '../../uploadStyle.css';



function UploadProduct() {
    const { width } = useWindowSize();
    const [cropModal, setCropModal] = useState(false);
    const [edittingImage, setEditingImage] = useState(null);

    const [crop, setCrop] = useState({ x: 0, y: 0 })
    const [zoom, setZoom] = useState(2)
    


    const [loading, setLoading] = useState({
        mainLoading: false,
        imageLoading: false
    })
    const [images, setImages] = useState([]);
    const maxNumber = 4;


    function handleOnChangeImage(imageList, addUpdateIndex) {
        // setLoading({ ...loading, imageLoading: true });
        console.log(imageList, addUpdateIndex);
        setImages(imageList);

        // setTimeout(() => setLoading({ ...loading, imageLoading: false }), 1000);
    };

    function handleEdit(img) {
        setCropModal(true);
        setEditingImage(img)
    }

    function onCropComplete(croppedArea, croppedAreaPixels) {
        console.log(croppedArea, croppedAreaPixels)
    }


    // const imageArray = images.map(img => img.file);
    // console.log(imageArray)

    useEffect(function () {
        window.scrollTo(0, 0);
    }, []);


    return (
        <>
            <section className='product__upload-section'>
                <div className='page__section--heading'>
                    <span className='flex'>
                        <BackButton />
                        <h2 className="page__section--title">Upload new product</h2>
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
                                <label htmlFor="" className="form--label">Short Description</label>
                                <input type="text" name="" id="" className="form--input" placeholder='Lorem ipsum dolor sit amet consectetur.' />
                            </div>
                            <div className="form--item">
                                <label htmlFor="" className="form--label">Product Description <Asterisk /></label>
                                <QuillEditor />
                            </div>


                            {/* <div className="form--item">
                            <label className="form--label">Item Images</label>
                            <input type="file" id="form-img" accept="image/*" multiple max={4} name='images' onChange={handleImageChange} />
                            <label htmlFor="form-img" className='form--img-box'>
                                <span className='img--container'>
                                    <IoCloudDownloadOutline />
                                    <h3>Upload or Drag n drop Image</h3>
                                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro, cumque.</p>
                                </span>
                            </label>
                        </div> */}



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
                                                <button type='button' style={{ marginLeft: 'auto', marginTop: '.6rem' }} onClick={onImageRemoveAll}>Remove All Images <IoCloseOutline /></button>
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
                                                            <IoCloudDownloadOutline />
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
                                                            {(loading.imageLoading && imageList.length === (index + 1)) ? (
                                                                <span className='img--spinner'>
                                                                    {console.log(image)}
                                                                    <Spinner_Simple style={{ backgroundColor: "#333" }} />
                                                                </span>
                                                            ) : (
                                                                <>
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
                                                                </>
                                                            )}
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
                        </div>


                        <div className="card"></div>
                    </div>



                    <div className='right--container containers'>
                        <div className="card"></div>
                        <div className="card"></div>
                        <div className="card"></div>
                    </div>
                </div>
            </section>

            {cropModal && (
                <SimpleModal setClose={setCropModal} title="Crop Image" icon={<AiOutlineClose />}>
                    <div
                        style={{
                            position: "relative",
                            width: "100%",
                            height: width < 600 ? 250 : 300,
                            background: "#333"
                        }}
                    >
                        <Cropper
                            image={edittingImage}
                            crop={crop}
                            zoom={zoom}
                            aspect={1}
                            onCropChange={setCrop}
                            onCropComplete={onCropComplete}
                            onZoomChange={setZoom}
                        />

                    </div>
                </SimpleModal>
            )}
        </>
    )
}

export default UploadProduct
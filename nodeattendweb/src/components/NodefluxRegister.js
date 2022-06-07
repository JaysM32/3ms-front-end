import React, { useState } from "react"
import { Card, Button, Alert, Container } from "react-bootstrap"
import { useAuth } from "../backends/AuthCont"
import { Link, useHistory } from "react-router-dom"
import './styling.css'
import './login.css'
import { Nav } from "react-bootstrap"
import { Navbar } from "react-bootstrap"


const NodefluxRegister = () => {
    const history = useHistory()
    const [init, setInit] = useState(true)
    const [portrait, setPortrait] = useState("")
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)
    const [useVideo, setUseVideo] = useState(false)
    const [captured, setCaptured] = useState(false)
    const [videoElem, setVideoElem] = useState()
    const [capturedImg, setCapturedImg] = useState("")
    const [faceEnrollment, setFaceEnrollment] = useState(false)
    const [page, setPage] = useState({ page_1: true, page_2: false, page_3: false })
    const [pageJobDone, setPageJobDone] = useState({ page_1: false, page_2: false, page_3: false, })
    const [passedPage, setPassedPage] = useState({ page_2: false, page_3: false })

    const abortAll = (e) => {
        e.preventDefault()
        const confirm_abort = window.confirm("Are you sure you want to cancel the whole process? If you have passed the face enrollment process, you will be prompted to verify your face whenever you sign into Rebah next time. Proceed?")
        if (confirm_abort) {
            try {
                //stopVideo()
            } catch (e) {
                // if error stopping video then just pass
            }
            history.push("/Account")
        }
    }



    //change face recog step pages
    const handlePage = (currentPage) => {
        if (currentPage === 'page_1') {
            setPage({ page_1: true, page_2: false, page_3: false })
            setPassedPage({ page_2: false, page_3: false })
        } else if (currentPage === 'page_2') {
            if (pageJobDone.page_1) {
                setPage({ page_1: false, page_2: true, page_3: false })
                setPassedPage({ page_2: true, page_3: false })
            } else {
                alert("Face Enrollment step not completed")
            }
        } else if (currentPage === 'page_3') {
            if (pageJobDone.page_1 && pageJobDone.page_2) {
                //stopVideo()
                setPage({ page_1: false, page_2: false, page_3: true })
                setPassedPage({ page_2: true, page_3: true })
            } else {
                alert("Face Enrollment step not completed")
            }
        }
    }




  return (
    <Container>
        <section className='bg'>
        <div className="overlay"></div>
       </section>
       <section className="wrapper">
        <div className="facematchbody"> 
        <Card>
            <Card.Body>
                {/*step 1*/}
                <div className={`${page.page_1 ? "h-[580px] flex" : "hidden"}`}>
                                {/* page 1 - upload photo*/}
                                <div className={`page_1 flex flex-col items-center justify-center space-y-9 ${useVideo ? "hidden" : ""}`}>
                                    <div className='text-center space-y-4'>
                                        <h3 className='text-4xl font-bold'>Upload your image</h3>
                                        <p>
                                            Upload your portrait. The photo must be in JPG/JPEG format with a max file size of 800 KB.
                                        </p>
                                    </div>
                                    <div className={`${portrait ? "max-h-72 w-fit" : "h-72 w-72 bg-slate-600 rounded-xl"} flex items-center justify-center`}>
                                        {portrait ?
                                            <img className='h-72 max-h-72 max-w-2xl rounded-lg' src={portrait} />
                                            :
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-32 w-32 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                            </svg>
                                        }
                                    </div>
                                    <div className={`flex space-x-2 ${error ? "text-red-400" : "hidden"}`}>
                                        <button title='Dismiss' className='text-slate-500 hover:bg-slate-600 transition-all' onClick={handleSetError}>
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                            </svg>
                                        </button>
                                        <p>{error}</p>
                                    </div>
                                    <div className='flex flex-col justify-center items-center space-y-4'>
                                        <div className='space-x-2'>
                                            {/* set hidden after user clicks "upload to server" button */}
                                            <button className={`px-8 py-3 rounded-full hover:bg-gray-800 bg-gray-600 transition-all focus:outline-none ${loading ? "hidden" : ""} ${pageJobDone.page_1 ? "hidden" : ""}`} onClick={uploadIMG}>
                                                Select image
                                            </button>
                                            {/* set hidden after successfull face enrollment on nodeflux */}
                                            <button className={`px-8 py-3 rounded-full hover:bg-gray-800 bg-gray-600 transition-all focus:outline-none disabled:opacity-70 ${portrait ? "" : "hidden"} ${loading ? "loading_dots" : ""} ${pageJobDone.page_1 ? "hidden" : ""}`} disabled={loading ? true : false} onClick={handleNodefluxEnroll}>
                                                {`${loading ? "••••••" : "Upload to server"}`}
                                            </button>
                                            {/* set hidden if response from nodeflux not ok */}
                                            <button className={`px-8 py-3 rounded-full hover:bg-gray-800 bg-gray-600 transition-all focus:outline-none ${pageJobDone.page_1 ? "" : "hidden"}`} onClick={() => { handleSetPage("page_2") }}>
                                                Next
                                            </button>
                                        </div>
                                        <button className='opacity-50 border-b border-b-transparent hover:opacity-100 hover:border-b-current transition-all disabled:opacity-20' disabled={loading ? true : false} onClick={handleUseVideo}>
                                            Use camera instead
                                        </button>
                                    </div>
                                </div>
                                {/* page 1 - use camera */}
                                <div className={`page_1 flex flex-col items-center justify-center space-y-9 ${useVideo ? "" : "hidden"}`}>
                                    <div className='text-center space-y-4'>
                                        <h3 className='text-4xl font-bold'>Say cheese!</h3>
                                        <p>
                                            Use your camera and take a photo.
                                            <br />
                                            Make sure to hold your head straight and look straight into the camera for best result.
                                        </p>
                                    </div>
                                    <div className={`${useVideo ? "h-72 max-h-72 w-fit" : "h-72 w-[500px]"} bg-slate-600 rounded-xl flex items-center justify-center`}>
                                        <div className={`${captured ? "hidden" : ""}`}> {/* if captured then set to hidden and stop stream */}
                                            <video muted autoPlay className='video_capture_webcam max-h-72 w-fit rounded-lg' />
                                        </div>
                                        <div className={`${captured ? "" : "hidden"}`}> {/* if captured then set to not hidden */}
                                            <canvas className='video_capture_canvas rounded-lg h-72'></canvas>
                                        </div>
                                    </div>
                                    <div className={`flex space-x-2 ${error ? "text-red-400" : "hidden"}`}>
                                        <button title='Dismiss' className='text-slate-500 hover:bg-slate-600 transition-all' onClick={handleSetError}>
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                            </svg>
                                        </button>
                                        <p>{error}</p>
                                    </div>
                                    <div className='flex flex-col justify-center items-center space-y-4'>
                                        <div className='space-x-2'>
                                            {/* set hidden after user clicks "upload to server" button */}
                                            <button className={`px-8 py-3 rounded-full hover:bg-gray-800 bg-gray-600 transition-all focus:outline-none ${loading ? "hidden" : ""} ${pageJobDone.page_1 ? "hidden" : ""}`} onClick={handleCaptured}>
                                                {captured ? "Re-capture photo" : "Capture photo"}
                                            </button>
                                            {/* set hidden after successfull face enrollment on nodeflux */}
                                            <button className={`px-8 py-3 rounded-full hover:bg-gray-800 bg-gray-600 transition-all focus:outline-none disabled:opacity-70 ${capturedImg ? "" : "hidden"} ${loading ? "loading_dots" : ""} ${pageJobDone.page_1 ? "hidden" : ""}`} disabled={loading ? true : false} onClick={handleNodefluxEnroll}>
                                                {`${loading ? "••••••" : "Upload to server"}`}
                                            </button>
                                            {/* set hidden if response from nodeflux not ok */}
                                            <button className={`px-8 py-3 rounded-full hover:bg-gray-800 bg-gray-600 transition-all focus:outline-none ${pageJobDone.page_1 ? "" : "hidden"}`} onClick={() => { handleSetPage("page_2") }}>
                                                Next
                                            </button>
                                        </div>
                                        <button className='opacity-50 border-b border-b-transparent hover:opacity-100 hover:border-b-current transition-all disabled:opacity-20' disabled={loading ? true : false} onClick={handleUseVideo}>
                                            Upload a photo instead
                                        </button>
                                    </div>
                                </div>
                            </div>
            </Card.Body>
        </Card>
        </div>
      </section>
      </Container>
  )
}

export default NodefluxRegister
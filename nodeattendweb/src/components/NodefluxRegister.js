import React, { useState } from "react"
import { Card, Button, Alert, Container } from "react-bootstrap"
import { useAuth } from "../backends/AuthCont"
import { Link, useHistory } from "react-router-dom"
import './login.css'


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
    <div>
        <section className='bg'>
            <div className="overlay"></div>
        </section>
        <section className="wrapper">
           {/*step 1*/}
            <Card className="facematchbody">
                <Card.Body>
                    <h1>Unfinished</h1>
                </Card.Body>
            </Card>
      </section>
    </div>
  )
}

export default NodefluxRegister
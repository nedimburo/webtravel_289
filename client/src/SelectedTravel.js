import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

function SelectedTravel(){
    const {travelId}=useParams();
    const [userInfo, setUserInfo] = useState(JSON.parse(localStorage.getItem("user")));
    const [selectedTravel, setSelectedTravel] = useState(null);
    const [content, setContent] = useState(null);
    const [questions, setQuestions] = useState(null);

    useEffect(() => {
        setUserInfo(JSON.parse(localStorage.getItem("user")));
    }, []);

    useEffect(()=>{
        axios.get('http://localhost:3001/travel/get-selected-travel/'+travelId)
        .then(response=>setSelectedTravel(response.data.travel))
        .catch(error=>console.error("Error fetching travel information", error));
    }, [travelId]);

    useEffect(() => {
        axios.get('http://localhost:3001/question/get-travel-questions/'+travelId)
          .then(response => {
            console.log("Server response:", response.data);
            setQuestions(response.data.questions);
          })
          .catch(error => {
            console.log(error);
            alert(error.response.data.message);
          });
      }, [travelId]);

    const handleQuestionSubmit=(e)=>{
        e.preventDefault();
        axios.post('http://localhost:3001/question/create-question', {
            content: content,
            travelId: travelId,
            userId: userInfo._id,
        })
        .then(response => {
            console.log("Server response:", response.data);
            if (response.status===201){
                alert(response.data.message);
                window.location.reload();
            }
        })
        .catch(error => {
            console.log(error);
            alert(error.response.data.message);
        });
    };

    const handleDeleteQuestion=async (id)=>{
        axios.delete('http://localhost:3001/question/delete-question/'+id)
        .then(response => {
            console.log("Server response:", response.data);
            window.location.reload();
        })
        .catch(error => {
            console.log(error);
            alert(error.response.data.message);
        });
    }

    if (!selectedTravel){
        return <div>Loading Selected Travel...</div>
    }

    if (!questions){
        return <div>Loading Questions...</div>
    }

    return(
        <div className="base-layout">
            <div className="slim-container">
                <h1>Travel Details</h1>
                {userInfo && userInfo.role === "ADMIN" ? (
                    <Link to={'/admin'} className="btn btn-success w-10">Return</Link>
                ) : userInfo && userInfo.role === "USER" ? (
                    <Link to={'/home'} className="btn btn-success w-10">Return</Link>
                ) : (
                    <Link to={'/'} className="btn btn-success w-10">Return</Link>
                )}
                <h2>Title: {selectedTravel.title}</h2>
                <p>Description: {selectedTravel.description}</p>
                <p>Category: {selectedTravel.category}</p>
                <p>Price: {selectedTravel.price} $</p>
                {userInfo && (
                    <form onSubmit={handleQuestionSubmit}>
                        <label htmlFor="content">Ask a question:</label>
                        <input type="text" name="content" onChange={(e) => setContent(e.target.value)}/>
                        <button type="submit" className="btn btn-success w-10 m-2">POST</button>
                    </form>
                )}
                <h2>Questions:</h2>
                {questions.length === 0 ? (
                    <p className="warning-message">No questions for this travel.</p>
                ) : (
                    questions.map((question, index) => (
                        <div key={index} className="question-container">
                            <div className="question-image-container">
                                <img src='/images/commenticon.png' className="scale-image" alt="Comment Icon"/>
                            </div>
                            <p className="small-container-text">Asked by: {question.userId.username}</p>
                            <p className="small-container-text question-content">{question.content}</p>
                            {userInfo && userInfo.role === "ADMIN" && (
                                <button className="btn btn-danger" onClick={e => handleDeleteQuestion(question._id)}>
                                    DELETE
                                </button>
                            )}
                        </div>
                    ))
                )}
            </div>
        </div>
    )
}

export default SelectedTravel;
import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
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
    }, []);

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

    if (!selectedTravel){
        return <div>Loading Selected Travel...</div>
    }

    if (!questions){
        return <div>Loading Questions...</div>
    }

    return(
        <div>
            <h1>Travel Details</h1>
            <h2>Title: {selectedTravel.title}</h2>
            <p>Description: {selectedTravel.description}</p>
            <p>Category: {selectedTravel.category}</p>
            <p>Price: {selectedTravel.price}</p>
            <form onSubmit={handleQuestionSubmit}>
                <label htmlFor="content">Ask a question:</label>
                <input type="text" name="content" onChange={(e) => setContent(e.target.value)}/>
                <button type="submit" className="btn btn-success w-10">POST</button>
            </form>
            <h2>Questions:</h2>
            {questions.length === 0 ? (
                <p>No questions for this travel.</p>
            ) : (
                questions.map((question, index) => (
                    <div key={index}>
                    <p>{question.content}</p>
                    <p>Asked by: {question.userId.username}</p>
                    </div>
                ))
            )}
        </div>
    )
}

export default SelectedTravel;
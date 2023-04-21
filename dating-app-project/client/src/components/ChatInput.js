import { useState,useEffect} from 'react'
import axios from 'axios'


//chat input component
const ChatInput = ({ user, clickedUser, getUserMessages, getClickedUsersMessages }) => {
    const [textArea, setTextArea] = useState("")
    const userId = user?.user_id
    const [randomQuestion, setRandomQuestion] = useState("");
    const clickedUserId = clickedUser?.user_id

//random ice breaker function
    const questions = [
        'What is your favorite movie?',
        'What hobbies do you enjoy?',
        'What is your favorite travel destination?',
    ];

    const getRandomQuestion = () => {
        const question = questions[Math.floor(Math.random() * questions.length)];
        setRandomQuestion(question);
    };

    useEffect(() => {
        getRandomQuestion();
    }, []);
//send message 
    const addMessage = async () => {
        const message = {
            timestamp: new Date().toISOString(),
            from_userId: userId,
            to_userId: clickedUserId,
            message: textArea
        }

        try {
            await axios.post('http://localhost:8000/message', { message })
            getUserMessages()
            getClickedUsersMessages()
            setTextArea("")
        } catch (error) {
            console.log(error)
        }
    }

//front-end chat input
    return (
        <div className="chat-input">
            <div className="random-icebreaker">
                <p>{randomQuestion}</p>
                <button onClick={getRandomQuestion}>Get another icebreaker</button>
            </div>
            <textarea value={textArea} onChange={(e) => setTextArea(e.target.value)}/>
            <button className="secondary-button" onClick={addMessage}>Submit</button>
        </div>
    )
}

export default ChatInput
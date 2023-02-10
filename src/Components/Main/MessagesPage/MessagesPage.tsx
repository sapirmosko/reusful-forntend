import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { ChatInterface } from "../../../model/chatModel";
import { apiService } from "../../../service/ApiService";
import MessageBox from "./Message/MessageBox";
import "./MessagesPage.css";

function MessagesPage(): JSX.Element {
    const [chat, setChat] = useState<ChatInterface[]>([]);
    const authSlice = useSelector((state: any) => state.auth);
    
    useEffect(() => {
        apiService.getChatById(+authSlice.sub).then((res) => {
            setChat(res)
        })
    }, [])

    return (
        <div className="MessagesPage">
            <div className="MessagesPageHeader">
                <h2>Messages: </h2>
            </div>

            <div className="MessagesDiv">
                {chat ?
                    chat.map((chatSingle) => <MessageBox key={chatSingle.id} message={chatSingle} />)

                    : 'No Chats'}
            </div>
        </div>
    );
}

export default MessagesPage;

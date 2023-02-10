import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { MessagesInterface } from "../../../../../model/MessagesModel";
import { apiService } from "../../../../../service/ApiService";
import "./Conversation.css";

function Conversation(): JSX.Element {
    const [messages, setMessages] = useState<MessagesInterface[]>([])
    const [refreshMessages, setRefreshMessages] = useState<boolean>(false)
    const authSlice = useSelector((state: any) => state.auth);
    const { register, handleSubmit } = useForm()
    const id = useParams();
    
    const otherUserId = id.id

    useEffect(() => {
        apiService.getMessages(authSlice.sub, otherUserId).then((res) => {
            setMessages(res)
        })
    }, [refreshMessages]);


    async function sendMessage(message: any) {
        const messageObj = {
            sender_id: authSlice.sub,
            reciver_id: otherUserId ? otherUserId : 0,
            message: message.message,
            time: new Date().getTime()
        }

        try {
            await apiService.sendMessage(messageObj)
            setRefreshMessages(!refreshMessages)

        } catch (e) {
            console.log(e);
        }
    }

    return (
        <div className="Conversation">
            <div className="ConversationMessages">
                {
                    messages ?
                        messages.map((mes: MessagesInterface) => <div className={mes.username === authSlice.username ? 'ConversationMessagesSingleMessageMe' : 'ConversationMessagesSingleMessageOther'}>
                            <p><b>{mes.username}</b>: {mes.message}</p>
                        </div>)
                        : <></>}
            </div>

            <div className="ConversationInput">
                <form action="" onSubmit={handleSubmit(sendMessage)}>
                    <input placeholder="Write Message" type="text" {...register('message')} />
                    <button>Send</button>
                </form>
            </div>
        </div>
    );
}

export default Conversation;

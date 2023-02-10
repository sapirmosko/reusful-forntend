import { Avatar } from "@mui/material";
import { NavLink } from "react-router-dom";
import { ChatInterface } from "../../../../model/chatModel";
import "./MessageBox.css";

function MessageBox({ message }: { message: ChatInterface }): JSX.Element {
    return (
        <NavLink to={'/chat/' + message.other_user_id}>
            <div className="MessageBox">
                <Avatar>{message?.username.charAt(0)}</Avatar>
                <span>{message?.username}</span>
            </div>
        </NavLink>
    );
}

export default MessageBox;

import React from 'react';

const Messages = (props) => {
    const messages = props.messages;
    
    return (
        <div className="messages">
            <h1>Inbox</h1>
            <div>
                {messages.map((message)=> {
                                    
                    return (
                        <div key={message._id} className='msgList'>
                            <p>{message.content}</p>
                        </div>
                    );
                })}
            </div>
        </div>
    )
};

export default Messages;
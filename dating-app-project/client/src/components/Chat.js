const Chat = ({descendingOrderMessages}) => {
  return (
      <>
          <div className="chat-display">
              {descendingOrderMessages.map((message, _index) => (
                  <div key={_index}>
                      <div className="chat-message-header">
                          <div className="img-container">
                              <img src={message.img} alt={message.name + ' profile'}/>
                          </div>
                          <p className="chat-name">{message.name}</p>
                      </div>
                      <p className="chat-message">{message.message}</p>
                  </div>
              ))}
          </div>
      </>
  )
}

export default Chat
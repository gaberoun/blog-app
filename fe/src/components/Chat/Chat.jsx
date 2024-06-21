import { useEffect, useState, useContext } from "react";
import { socket } from "../../socket";
import MyContext from "../../MyContext";

export default function Chat() {
  const { user: { username } } = useContext(MyContext);
  const [chat, setChat] = useState('');
  const [messages, setMessages] = useState([]);
  const [isConnected, setIsConnected] = useState(socket.connected);

  const handleConnection = () => {
    if (isConnected) {
      socket.disconnect();
    } else {
      socket.connect();
    }
  }

  const handleSendChat = (e) => {
    e.preventDefault();

    setChat('');
    socket.emit('message', `${username}: ${chat}`);
  }

  useEffect(() => {
    const onConnect = () => {
      setIsConnected(true);  
    }

    const onDisconnect = () => {
      setIsConnected(false);
    }

    const onMessageEvent = (message) => {
      setMessages(prev => [...prev, message]);
    }

    socket.on('connect', onConnect);
    socket.on('disconnect', onDisconnect);
    socket.on('message', onMessageEvent);

    return () => {
      socket.off('connect', onConnect);
      socket.off('disconnect', onDisconnect);
      socket.off('message', onMessageEvent);
    }
  });

  return (
    <>
      <h1 className="text-xl text-center">Chat Box</h1>

      <div className="flex justify-between">
        <p>Connection: 
          <span className={isConnected ? 'text-emerald-500' : 'text-red-500'}>{isConnected ? ' online' : ' offline'}</span>
        </p>
        <button onClick={handleConnection}>
          {isConnected ? 'Disconnect' : 'Connect'}
        </button>
      </div>

      <ul className="bg-white text-black rounded p-2">
        {
          messages.map((message, index) => (
            <li key={index}>
              {message}
            </li>
        ))}
      </ul>
      <form onSubmit={handleSendChat} className="flex gap-3">
        <input className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-neutral-600 sm:text-sm sm:leading-6" type='text' value={chat} onChange={(e) => setChat(e.target.value)} />
        <button>Send</button>
      </form>
    </>
  )
}

import { AuthGreenApi } from './components/AUTH/AuthGreenApi'
import { Content } from './components/CONTENT/content'


function App () {

  return (
    <>
      {auth === false ? (
        <AuthGreenApi setAuth={setAuth} />
      ) : (
       <Content/>
      )}
    </>
  )
}

export default App

  //ХОТЕЛ НАСТРОИТЬ СЕРВЕР НО НЕ ПОЛУЧИЛОСЬ((

  // const [yourUserId, setYourUserId] = useState(null)

  // const [userId, setUserId] = useState(null)

  // const [socket, setSocket] = useState(null)

  // const socketRef = useRef(null)

  // useEffect(() => {
  //   const newSocket = io('https://f11c-188-0-169-60.eu.ngrok.io')
  //   socketRef.current = newSocket
  //   setSocket(newSocket)

  //   newSocket.on('message', data => {
  //     console.log('Received message:', data.messageText)
  //   })

  //   return () => {
  //     newSocket.disconnect()
  //   }
  // }, [])

  // useEffect(() => {
  //   if (!socket) return

  //   socket.on('message', message => {
  //     setMessages(prevMessages => [...prevMessages, message])
  //   })

  //   return () => {
  //     socket.off('message')
  //   }
  // }, [socket])





    // useEffect(() => {
  //   const fetchUserId = async () => {
  //     try {
  //       const response = await fetch("https://f412-188-0-169-102.eu.ngrok.io/http://localhost:3000/api/users/getUserId");
  //       const data = await response.json();
  //       const fetchedUserId = data.userId; // Замените на путь к идентификатору пользователя в JSON-объекте
  //       setUserId(fetchedUserId);
  //     } catch (error) {
  //       console.error("Ошибка при получении идентификатора пользователя:", error);
  //     }
  //   };
  //   fetchUserId()
  // }, [])

  // useEffect(() => {
  //   fetch('http://localhost:3000/api/users/getUserId')
  //     .then(response => response.json())
  //     .then(data => {
  //       setYourUserId(data.userId)
  //     })
  //     .catch(error => console.error(error))
  // }, [])

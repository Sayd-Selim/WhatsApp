import React from 'react'
import { useState, useEffect, useRef } from 'react'
import io from 'socket.io-client'
import {
  RiLoader3Line,
  RiChatPollFill,
  RiMore2Fill,
  RiSearchLine,
  RiCheckDoubleFill,
  RiCameraFill,
  RiLinkM,
  RiEmotionHappyLine,
  RiMicFill
} from 'react-icons/ri'
import { sendMessage } from '../../components/SERVER/GreenApiService'

export const Content = () => {
  const [inputMessage, setInputMessage] = useState('') // ТЕКСТ С ИНПУТА

  const [messages, setMessages] = useState([]) // ЧАТ С ПОЛЬЗОВАТЕЛЕМ

  const [searchUser, setSearchUser] = useState('') // Поиск по номеру телефона или создание чата

  const [textMessage, setTextMessage] = useState(false)

  const [chatList, setChatList] = useState([])

  const [selectedChat, setSelectedChat] = useState(null)

  const [selectedUser, setSelectedUser] = useState(null)

  const [sentMessage, setSentMessage] = useState('')

  const [selectedChatIndex, setSelectedChatIndex] = useState(null)

  const handleSendMessage = e => {
    e.preventDefault() // УБРАТЬ ПЕРЕЗАГРУЗКУ СТРАНИЦЫ
    const recipient = searchUser // номер телефона получателя
    sendMessage(inputMessage, recipient)
      .then(sentMessage => {
        if (selectedChat === null) {
          createNewChat()
        }

        // Добавить сообщение в список сообщений выбранного чата
        setChatList(prevChatList => {
          const updatedChatList = prevChatList.map((chat, index) => {
            if (index === selectedChat) {
              return {
                ...chat,
                messages: [...chat.messages, { chatText: inputMessage }]
              }
            }
            return chat
          })
          return updatedChatList
        })

        setInputMessage('') // очистить поле ввода после отправки
      })
      .catch(error => console.error(error))
  }

  const createNewChat = () => {
    if (searchUser.trim() !== '') {
      // Создание нового чата на основе значения searchUser
      const newChat = {
        user: searchUser,
        messages: []
      }
      // Обновление списка чатов
      setChatList(prevChatList => [...prevChatList, newChat])

      // Очистка поля поиска
      // setSearchUser('');
    }
  }

  useEffect(() => {
    if (sentMessage !== '') {
      sendMessage(sentMessage, searchUser)
        .then(() => {
          setMessages([...messages, sentMessage])
        })
        .catch(error => console.error(error))

      setSentMessage('') // очистить sentMessage после отправки
    }
  }, [sentMessage])

  useEffect(() => {
    if (inputMessage === '') {
      return
    }

    setMessages([...messages, inputMessage])
  }, [inputMessage])

  const handleChatClick = index => {
    setSelectedUser(chatList[index].user)
    setSelectedChatIndex(index)
    setSelectedChat(index)
  }

  const handleKeyDown = event => {
    if (event.key === 'Enter') {
      event.preventDefault()
      setTextMessage(true)
      createNewChat()
    }
  }
  

  return (
    <div className='min-h-screen grid grid-cols-1 xl:grid-cols-4 text-gray-300'>
      {/* Contacts */}
      <div className='hidden bg-[#1B2831] xl:flex flex-col'>
        {/* Profile */}
        <div className='p-4 h-[15vh]'>
          <div className='flex items-center justify-between mb-4'>
            <div>
              <img
                src='data:image/png;base64,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'
                className='w-10 h-10 object-cover rounded-full'
              />
            </div>
            <div className='flex items-center gap-8 text-2xl text-gray-500'>
              <RiLoader3Line className='hover:cursor-pointer' />
              <RiChatPollFill className='hover:cursor-pointer' />
              <RiMore2Fill className='hover:cursor-pointer' />
            </div>
          </div>
          <form className='w-full'>
            <div className='relative'>
              <RiSearchLine className='absolute top-1/2 -translate-y-1/2 left-4' />
              <input
                className='bg-[#0B131A] w-full rounded-full py-2 pl-10 pr-4 outline-none'
                placeholder='Поиск или новый чат'
                onChange={e => setSearchUser(e.target.value)}
                value={searchUser}
                onInput={event =>
                  (event.target.value = event.target.value.replace(/\D/g, ''))
                }
                onKeyDown={handleKeyDown}
              />
            </div>
          </form>
        </div>
        {/* Contacts */}
        <div className='h-[85vh] overflow-y-scroll'>
          {textMessage &&
            chatList.map((chat, index) => (
              <div
                onClick={() => handleChatClick(index)}
                className='p-2 mb-4 flex items-center gap-4 bg-[#222C32] border-b border-[#222C32] hover:cursor-pointer'
              >
                <img
                  src='https://avatars.mds.yandex.net/get-pdb/1996600/d1725ec1-41d3-4b2c-ab24-91ec603557bf/s375'
                  className='w-10 h-10 object-cover rounded-full'
                />
                <div className='flex-1 flex justify-between'>
                  <div>
                    <h1>{textMessage && chat.user}</h1>
                    {/* <p className='text-gray-500 text-xs'>
                Lorem Ipsum es simplemente el texto de relleno aaa...
              </p> */}
                  </div>
                  <div className='text-sm text-gray-500'>14:45</div>
                </div>
              </div>
            ))}
        </div>
      </div>
      {/* Chat */}
      <div className='xl:col-span-3'>
        <header className='h-[8vh] bg-[#1B2831] p-4 flex items-center justify-between'>
          <div className='flex items-center gap-4'>
            <img
              src='https://avatars.mds.yandex.net/get-pdb/1996600/d1725ec1-41d3-4b2c-ab24-91ec603557bf/s375'
              className='w-10 h-10 object-cover rounded-full'
            />
            <div>
              <h1>{selectedUser || 'Выберите пользователя'}</h1>
              <span className='text-gray-500 text-sm'>{chatList.messages}</span>
            </div>
          </div>
          <div className='flex items-center gap-8 text-2xl text-gray-500'>
            <RiSearchLine className='hover:cursor-pointer' />
            <RiLinkM className='hover:cursor-pointer' />
            <RiMore2Fill className='hover:cursor-pointer' />
          </div>
        </header>
        {/* Messages */}
        <main className='h-[84vh] overflow-y-scroll p-4'>
          {/* Message 1 */}
          <div className='mb-3 flex'>
            {selectedChat !== null && (
              <p className='bg-[#1B2831] max-w-[80%] xl:max-w-2xl py-1 px-4 rounded-tr-xl rounded-br-xl rounded-bl-xl'>
                Привет Андрей ! К сожалению ответ от получателя не смог
                реализовать но очень старался, просто нужна была помощь не
                большая, но Я учусь, чтобы решить такие моменты сам
              </p>
            )}
          </div>
          {/* Message 1 */}

          {selectedChat !== null &&
            chatList[selectedChat].messages.map((message, index) => (
              <div key={index} className='mb-3 flex justify-end'>
                <p className='bg-[#054640] max-w-[80%] xl:max-w-2xl py-1 px-4 rounded-tl-xl rounded-bl-xl rounded-br-xl'>
                  {message.chatText}
                </p>
              </div>
            ))}

          {/* Message 2 */}
        </main>
        {/* Send message */}
        <div className='h-[8vh] text-gray-500 flex items-center bg-[#1B2831]'>
          <div className='w-[20%] xl:w-1/12 flex justify-center text-2xl'>
            <RiEmotionHappyLine className='hover:cursor-pointer' />
          </div>
          <form className='w-[60%] xl:w-10/12' onSubmit={handleSendMessage}>
            <input
              type='text'
              className='bg-[#0B131A] w-full py-2 px-6 rounded-full outline-none text-gray-300'
              placeholder='Сообщение'
              value={inputMessage}
              onChange={e => setInputMessage(e.target.value)}
            />
          </form>
          <div className='w-[20%] xl:w-1/12 flex justify-center text-2xl'>
            <RiMicFill className='hover:cursor-pointer' />
          </div>
        </div>
      </div>
    </div>
  )
}

'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabaseClient'
import { gemini } from '@/lib/gemini'

type Message = {
  id: number
  session_id: number
  user_id: string | null
  content: string
  created_at: string
}

type Session = {
  id: number
  user_id: string
  created_at: string
}

export default function ChatPage() {
  const [userEmail, setUserEmail] = useState<string | null>(null)
  const [userUUID, setUserUUID] = useState<string | null>(null)
  const [messages, setMessages] = useState<Message[]>([])
  const [newMessage, setNewMessage] = useState('')
  const [session, setSession] = useState<Session | null>(null)
  const [errorMsg, setErrorMsg] = useState('')

  // Fetch current user
  useEffect(() => {
    const fetchUser = async () => {
      const { data: { user }, error } = await supabase.auth.getUser()
      if (error) {
        console.error('Error fetching user:', error)
        return
      }
      if (user) {
        setUserUUID(user.id)       // UUID for DB
        setUserEmail(user.email ?? null)   // For display
      }
    }
    fetchUser()
  }, [])

  // Start a new chat session
  const startNewSession = async () => {
    if (!userUUID) return
    try {
      const { data, error } = await supabase
        .from('sessions')
        .insert([{ user_id: userUUID }])
        .select()
        .single()
      if (error) {
        console.error('Error creating session:', error)
        setErrorMsg(error.message)
      } else {
        setSession(data)
        setMessages([])
      }
    } catch (err: any) {
      console.error('Error creating session:', err.message)
      setErrorMsg(err.message)
    }
  }

  // Fetch messages for a session
  const fetchMessages = async (sessionId: number) => {
    const { data, error } = await supabase
      .from('messages')
      .select('*')
      .eq('session_id', sessionId)
      .order('created_at', { ascending: true })
    if (error) console.error(error)
    else setMessages(data || [])
  }

  // Auto-fetch messages when session changes
  useEffect(() => {
    if (session) fetchMessages(session.id)
    else if (userUUID) startNewSession()
  }, [session, userUUID])

  // Real-time subscription to messages
  useEffect(() => {
    const channel = supabase
      .channel('public:messages')
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'messages' },
        (payload) => {
          const newMsg = payload.new as Message
          if (session && newMsg.session_id === session.id) {
            setMessages((prev) => [...prev, newMsg])
          }
        }
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [session])

  const handleSendMessage = async () => {
    if (!newMessage || !userUUID || !session) return

    // Insert user message
    const { error: userError } = await supabase.from('messages').insert([
      { session_id: session.id, user_id: userUUID, content: newMessage }
    ])
    if (userError) {
      console.error(userError)
      setErrorMsg(userError.message)
    }

    setNewMessage('')

    // Insert AI response
    const aiResponse = await gemini(newMessage)
    if (aiResponse) {
      const { error: aiError } = await supabase.from('messages').insert([
        { session_id: session.id, user_id: null, content: aiResponse }
      ])
      if (aiError) console.error(aiError)
    }
  }

  const handleNewChat = async () => {
    await startNewSession()
  }

  const handleClearChat = async () => {
    if (!session) return
    const { error } = await supabase.from('messages').delete().eq('session_id', session.id)
    if (error) console.error(error)
    setMessages([])
  }

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 flex flex-col">
      <h1 className="text-3xl font-bold mb-4 text-center mt-4">Chat Room</h1>

      <div className="flex justify-center gap-4 mb-4">
        <button
          onClick={handleNewChat}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
        >
          New Chat
        </button>
        <button
          onClick={handleClearChat}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
        >
          Clear Chat
        </button>
      </div>

      <div className="flex-1 overflow-y-auto mb-4 px-4 max-w-3xl mx-auto space-y-3">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`p-3 rounded-lg shadow max-w-[80%] ${
              msg.user_id === userUUID ? 'ml-auto bg-green-100' : 'mr-auto bg-white'
            }`}
          >
            <p className="text-sm font-semibold text-gray-700">
              {msg.user_id === userUUID ? 'You' : msg.user_id === null ? 'AI' : msg.user_id}
            </p>
            <p className="text-gray-800">{msg.content}</p>
            <p className="text-xs text-gray-500 mt-1">{new Date(msg.created_at).toLocaleString()}</p>
          </div>
        ))}
      </div>

      <div className="max-w-3xl mx-auto flex gap-2 mb-6 px-4">
        <input
          type="text"
          placeholder="Type a message..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          className="flex-1 p-3 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
        />
        <button
          onClick={handleSendMessage}
          className="bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600 transition"
        >
          Send
        </button>
      </div>

      {errorMsg && <p className="text-red-500 text-center mt-2">{errorMsg}</p>}
    </div>
  )
}

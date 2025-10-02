'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabaseClient'

export default function JournalPage() {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [journals, setJournals] = useState<{ id: number, entry: string, created_at: string }[]>([])
  const [errorMsg, setErrorMsg] = useState('')

  const fetchJournals = async () => {
    const { data, error } = await supabase
      .from('journals')
      .select('*')
      .order('created_at', { ascending: false })
    if (error) console.error(error)
    else setJournals(data || [])
  }

  useEffect(() => {
    fetchJournals()
  }, [])

  const handleAddJournal = async () => {
    if (!title || !content) return
    const { error } = await supabase
      .from('journals')
      .insert([{ entry: `${title} - ${content}` }])
    if (error) {
      console.error(error)
      setErrorMsg(error.message)
    } else {
      setTitle('')
      setContent('')
      fetchJournals()
    }
  }

  const handleDeleteJournal = async (id: number) => {
    const { error } = await supabase.from('journals').delete().eq('id', id)
    if (error) console.error(error)
    else fetchJournals()
  }

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <h1 className="text-3xl font-bold mb-6  text-center">Your Journals</h1>

      <div className="max-w-3xl mx-auto mb-6">
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full mb-3 p-3 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
        />
        <textarea
          placeholder="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full mb-3 p-3 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
        />
        <button
          onClick={handleAddJournal}
          className="bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600 transition"
        >
          Add Journal
        </button>
        {errorMsg && <p className="text-red-500 mt-2">{errorMsg}</p>}
      </div>

      <div className="max-w-3xl mx-auto grid gap-4">
        {journals.map((journal) => (
          <div key={journal.id} className="bg-white rounded shadow p-4 flex justify-between items-start">
            <div>
              <p>{journal.entry}</p>
              <p className="text-sm text-gray-500 mt-1">{new Date(journal.created_at).toLocaleString()}</p>
            </div>
            <button
              onClick={() => handleDeleteJournal(journal.id)}
              className="text-red-500 hover:text-red-700"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

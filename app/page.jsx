'use client'

import { useState } from 'react'
import styles from './page.module.css'

export default function HomePage () {
  const [email, setEmail] = useState('')
  const [fullName, setFullName] = useState('')
  const [notes, setNotes] = useState('')
  const [recordId, setRecordId] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit (e) {
    e.preventDefault()
    setLoading(true)

    const response = await fetch('/api', {
      method: 'POST',
      body: JSON.stringify({ email, fullName, notes })
    })

    const data = await response.json()
    setLoading(false)
    setRecordId(data.id)
  }

  return (
    <main className={styles.main}>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor='email'>Email</label>
          <input
            id='email'
            disabled={loading}
            onChange={e => setEmail(e.target.value)}
            placeholder='Enter email'
            required
            type='email'
            value={email}
          />
        </div>
        <div>
          <label htmlFor='full_name'>Full Name</label>
          <input
            id='full_name'
            disabled={loading}
            onChange={e => setFullName(e.target.value)}
            placeholder='Enter full name'
            required
            type='text'
            value={fullName}
          />
        </div>
        <div>
          <label htmlFor='notes'>Notes</label>
          <textarea
            id='notes'
            disabled={loading}
            onChange={e => setNotes(e.target.value)}
            placeholder='Enter notes'
            value={notes}
          />
        </div>
        <button disabled={loading}>Submit</button>
      </form>
      {recordId && (
        <p>Your record: {recordId}</p>
      )}
    </main>
  )
}

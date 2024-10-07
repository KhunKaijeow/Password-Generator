import './App.css'
import { useState } from 'react'

function App() {
  const [length, setLength] = useState(8)
  const [uppercase, setUppercase] = useState(false)
  const [lowercase, setLowercase] = useState(false)
  const [numbers, setNumbers] = useState(false)
  const [symbols, setSymbols] = useState(false)
  const [password, setPassword] = useState('')
  const [passwordStrength, setPasswordStrength] = useState('')

  const generatedPassword = () => {
    let charSet = ''
    const upperCase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
    const lowerCase = 'abcdefghijklmnopqrstuvwxyz'
    const number = '0123456789'
    const symbol = '!@#$%^&*()_+~`|}{[]:;?><,./-='

    if (uppercase) charSet += upperCase
    if (lowercase) charSet += lowerCase
    if (numbers) charSet += number
    if (symbols) charSet += symbol

    if (charSet === '') return

    let generatedPassword = ''
    for (let i = 0; i < length; i++) {
      generatedPassword += charSet.charAt(Math.floor(Math.random() * charSet.length))
    }

    setPassword(generatedPassword)
    calculatePasswordStrength(generatedPassword)
  }

  const calculatePasswordStrength = (generatedPassword) => {
    let strength = 0
    if (length >= 8) strength++
    if (uppercase) strength++
    if (lowercase) strength++
    if (numbers) strength++
    if (symbols) strength++

    let strengthLabel = ''
    if (strength < 3) {
      strengthLabel = 'Weak'
    } else if (strength < 5) {
      strengthLabel = 'Medium'
    } else {
      strengthLabel = 'Strong'
    }

    setPasswordStrength(strengthLabel)
  }

  const copyClipboard = () => {
    navigator.clipboard.writeText(password)
  }

  return (
    <div className='container'>
      <h1>Password Generator</h1>
      <div className='password-container'>
        <input type="text" value={password} readOnly />
        <button onClick={copyClipboard}>
          <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368">
            <path d="M360-240q-33 0-56.5-23.5T280-320v-480q0-33 23.5-56.5T360-880h360q33 0 56.5 23.5T800-800v480q0 33-23.5 56.5T720-240H360Zm0-80h360v-480H360v480ZM200-80q-33 0-56.5-23.5T120-160v-560h80v560h440v80H200Zm160-240v-480 480Z" />
          </svg>
          COPY
        </button>
      </div>
      <div className="password-options-container">
        <div className="character-length">
          <label>Character length: {length}</label>
          <input
            type="range"
            min="4"
            max="20"
            value={length}
            onChange={(e) => setLength(e.target.value)}
          />
        </div>
        <div className="password-option">
          <input
            type="checkbox"
            checked={uppercase}
            onChange={() => setUppercase(!uppercase)}
          />
          <label>Include uppercase letters</label>
        </div>
        <div className="password-option">
          <input
            type="checkbox"
            checked={lowercase}
            onChange={() => setLowercase(!lowercase)}
          />
          <label>Include lowercase letters</label>
        </div>
        <div className="password-option">
          <input
            type="checkbox"
            checked={numbers}
            onChange={() => setNumbers(!numbers)}
          />
          <label>Include numbers</label>
        </div>
        <div className="password-option">
          <input
            type="checkbox"
            checked={symbols}
            onChange={() => setSymbols(!symbols)}
          />
          <label>Include symbols</label>
        </div>
        <div className="password-strength">
          <h2>STRENGTH</h2>
          <input type="text" value={passwordStrength} readOnly />
        </div>
        <div className="generate-password">
          <button onClick={generatedPassword}>
            GENERATE
            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368">
              <path d="M647-440H160v-80h487L423-744l57-56 320 320-320 320-57-56 224-224Z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  )
}

export default App

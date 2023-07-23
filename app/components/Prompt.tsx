'use client'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import {useEffect, useState} from 'react';
export default function Prompt() {

  useEffect(() => {
    fetch('/api/prompt')
      .then(res => res.json())
      .then(questions => console.log(questions))
    
  }, [])

  const [prompt, setPrompt] = useState("");

  const fetchResults = () => {
    if (prompt.length === 0) return;

    fetch('/api/prompt', {
      method: 'POST',
      body: JSON.stringify(prompt)
    })
      .then(res => res.json())
      .then(models => console.log(models))
  }

  return (
    <div className="flex align-center rounded-xl">
    <textarea onChange={(e) => setPrompt(e.target.value)} className="block w-11/12 bg-black color-white" type="text" placeholder="Prompt"></textarea>
    <button onClick={fetchResults} className="border-solid border-indigo-600 bg-indigo-600 text-white">
      <FontAwesomeIcon
        icon={faPaperPlane}

        style={{ color: "white", fontSize: 32 }}
      />
    </button>
  </div>
  )
}
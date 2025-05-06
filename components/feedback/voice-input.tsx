"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Mic, MicOff, Loader2 } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"

interface VoiceInputProps {
  onTranscript: (transcript: string) => void
}

export function VoiceInput({ onTranscript }: VoiceInputProps) {
  const [isRecording, setIsRecording] = useState(false)
  const [transcript, setTranscript] = useState("")
  const [isSupported, setIsSupported] = useState(true)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    // Check if SpeechRecognition is supported
    if (!("webkitSpeechRecognition" in window) && !("SpeechRecognition" in window)) {
      setIsSupported(false)
    }
  }, [])

  const startRecording = () => {
    setIsLoading(true)
    setTranscript("")

    // Use the appropriate SpeechRecognition constructor
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition

    if (!SpeechRecognition) {
      setIsSupported(false)
      setIsLoading(false)
      return
    }

    const recognition = new SpeechRecognition()
    recognition.continuous = true
    recognition.interimResults = true
    recognition.lang = "en-US"

    recognition.onstart = () => {
      setIsRecording(true)
      setIsLoading(false)
    }

    recognition.onresult = (event: any) => {
      let interimTranscript = ""
      let finalTranscript = ""

      for (let i = event.resultIndex; i < event.results.length; i++) {
        const transcript = event.results[i][0].transcript
        if (event.results[i].isFinal) {
          finalTranscript += transcript
        } else {
          interimTranscript += transcript
        }
      }

      setTranscript(finalTranscript || interimTranscript)
    }

    recognition.onerror = (event: any) => {
      console.error("Speech recognition error", event.error)
      setIsRecording(false)
      setIsLoading(false)
    }

    recognition.onend = () => {
      setIsRecording(false)
      if (transcript) {
        onTranscript(transcript)
      }
    }

    // Start recognition
    recognition.start()

    // Store recognition instance in window to access it later for stopping
    ;(window as any).recognition = recognition
  }

  const stopRecording = () => {
    if ((window as any).recognition) {
      ;(window as any).recognition.stop()
    }
    setIsRecording(false)
  }

  if (!isSupported) {
    return (
      <Alert className="mt-2">
        <AlertDescription>
          Voice input is not supported in your browser. Please use the text input instead.
        </AlertDescription>
      </Alert>
    )
  }

  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2">
        <Button
          type="button"
          variant={isRecording ? "destructive" : "secondary"}
          onClick={isRecording ? stopRecording : startRecording}
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Initializing...
            </>
          ) : isRecording ? (
            <>
              <MicOff className="mr-2 h-4 w-4" />
              Stop Recording
            </>
          ) : (
            <>
              <Mic className="mr-2 h-4 w-4" />
              Start Recording
            </>
          )}
        </Button>
        {isRecording && (
          <div className="flex h-3 w-3 items-center justify-center">
            <div className="h-full w-full animate-pulse rounded-full bg-red-500"></div>
          </div>
        )}
      </div>

      {isRecording && (
        <div className="rounded-md border border-gray-200 bg-gray-50 p-3 text-sm">{transcript || "Listening..."}</div>
      )}

      <p className="text-xs text-gray-500">Click the button and speak clearly to convert your voice to text.</p>
    </div>
  )
}

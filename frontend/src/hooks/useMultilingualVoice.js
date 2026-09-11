import { useState, useEffect, useRef, useCallback } from 'react';

/**
 * Hook for Multilingual Speech-to-Text (STT) and Text-to-Speech (TTS)
 * Supports English ('en-IN'), Hindi ('hi-IN'), and Telugu ('te-IN')
 */
export function useMultilingualVoice(selectedLanguage = 'en-IN') {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [error, setError] = useState(null);
  const [voices, setVoices] = useState([]);

  const recognitionRef = useRef(null);
  const synthRef = useRef(typeof window !== 'undefined' ? window.speechSynthesis : null);

  // Load and cache browser voices, listening for async voiceschanged event
  useEffect(() => {
    if (!synthRef.current) return;

    const updateVoices = () => {
      const available = synthRef.current.getVoices() || [];
      setVoices(available);
    };

    updateVoices();
    if (synthRef.current.onvoiceschanged !== undefined) {
      synthRef.current.onvoiceschanged = updateVoices;
    }
  }, []);

  // Initialize SpeechRecognition if supported
  useEffect(() => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      setError('Web Speech Recognition is not supported by this browser.');
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = true;
    // Strictly set recognition language to active selected language
    recognition.lang = selectedLanguage || 'en-IN';

    recognition.onstart = () => {
      setIsListening(true);
      setError(null);
    };

    recognition.onresult = (event) => {
      let currentTranscript = '';
      for (let i = event.resultIndex; i < event.results.length; i++) {
        currentTranscript += event.results[i][0].transcript;
      }
      setTranscript(currentTranscript);
    };

    recognition.onerror = (event) => {
      console.warn('[STT Error]:', event.error);
      setIsListening(false);
      if (event.error !== 'no-speech') {
        setError(`Speech recognition notice: ${event.error}`);
      }
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognitionRef.current = recognition;

    return () => {
      if (recognitionRef.current) {
        try {
          recognitionRef.current.abort();
        } catch {
          // ignore
        }
      }
    };
  }, [selectedLanguage]);

  const startListening = useCallback(() => {
    if (!recognitionRef.current) return;
    setTranscript('');
    try {
      // Ensure dynamic strict language before starting recognition
      recognitionRef.current.lang = selectedLanguage || 'en-IN';
      recognitionRef.current.start();
    } catch (err) {
      console.warn('Error starting speech recognition:', err);
    }
  }, [selectedLanguage]);

  const stopListening = useCallback(() => {
    if (!recognitionRef.current) return;
    try {
      recognitionRef.current.stop();
    } catch {
      // ignore
    }
  }, []);

  const speakText = useCallback(
    (text, langCode = selectedLanguage) => {
      if (!synthRef.current) return;

      try {
        synthRef.current.cancel(); // cancel any active utterance
        const utterance = new SpeechSynthesisUtterance(text);
        const targetLang = langCode || 'en-IN';
        utterance.lang = targetLang;
        utterance.rate = 0.95; // slightly slower for clinical clarity in noisy OPDs

        // Query fresh voices array
        const allVoices = synthRef.current.getVoices() || voices;

        if (targetLang.toLowerCase().startsWith('te')) {
          // 1. Voice Selection Logic for Telugu
          const teVoice = allVoices.find(
            (v) =>
              v.lang.toLowerCase().includes('te') ||
              v.name.toLowerCase().includes('telugu')
          );

          if (teVoice) {
            utterance.voice = teVoice;
            utterance.lang = teVoice.lang || 'te-IN';
          } else {
            console.warn(
              '[useMultilingualVoice] Specific Telugu voice not found in browser speech synthesis. Falling back to default speech voice with lang="te-IN".'
            );
          }
        } else if (targetLang.toLowerCase().startsWith('hi')) {
          // Voice Selection for Hindi
          const hiVoice = allVoices.find(
            (v) =>
              v.lang.toLowerCase().includes('hi') ||
              v.name.toLowerCase().includes('hindi')
          );
          if (hiVoice) {
            utterance.voice = hiVoice;
            utterance.lang = hiVoice.lang || 'hi-IN';
          }
        } else {
          // Voice Selection for English
          const enVoice = allVoices.find(
            (v) =>
              v.lang.toLowerCase().includes('en-in') ||
              v.lang.toLowerCase().includes('en')
          );
          if (enVoice) {
            utterance.voice = enVoice;
          }
        }

        utterance.onstart = () => setIsSpeaking(true);
        utterance.onend = () => setIsSpeaking(false);
        utterance.onerror = (e) => {
          console.warn('[TTS Error]:', e);
          setIsSpeaking(false);
        };

        synthRef.current.speak(utterance);
      } catch (err) {
        console.warn('Speech synthesis error:', err);
        setIsSpeaking(false);
      }
    },
    [selectedLanguage, voices]
  );

  return {
    isListening,
    transcript,
    setTranscript,
    startListening,
    stopListening,
    speakText,
    isSpeaking,
    error,
  };
}

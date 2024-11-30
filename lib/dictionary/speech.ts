"use client";

class SpeechService {
  private static instance: SpeechService;
  private synthesis: SpeechSynthesis | null = null;
  private englishVoice: SpeechSynthesisVoice | null = null;
  private currentUtterance: SpeechSynthesisUtterance | null = null;

  private constructor() {
    if (typeof window !== 'undefined') {
      this.synthesis = window.speechSynthesis;
      this.initializeVoice();
    }
  }

  public static getInstance(): SpeechService {
    if (!SpeechService.instance) {
      SpeechService.instance = new SpeechService();
    }
    return SpeechService.instance;
  }

  private initializeVoice(): void {
    if (!this.synthesis) return;

    const loadVoices = () => {
      const voices = this.synthesis!.getVoices();
      this.englishVoice = voices.find(voice => voice.lang.startsWith('en-')) || null;
    };

    loadVoices();

    if (this.synthesis.onvoiceschanged !== undefined) {
      this.synthesis.onvoiceschanged = loadVoices;
    }
  }

  public speak(text: string, onEnd?: () => void): void {
    if (!this.synthesis) {
      console.error('Speech synthesis not supported');
      return;
    }

    // Cancel any ongoing speech
    this.stop();

    const utterance = new SpeechSynthesisUtterance(text);
    this.currentUtterance = utterance;
    
    if (this.englishVoice) {
      utterance.voice = this.englishVoice;
    }
    
    utterance.rate = 0.9;
    utterance.pitch = 1;
    
    if (onEnd) {
      utterance.onend = onEnd;
    }
    
    this.synthesis.speak(utterance);
  }

  public stop(): void {
    if (this.synthesis && this.currentUtterance) {
      this.synthesis.cancel();
      this.currentUtterance = null;
    }
  }
}

export const speechService = SpeechService.getInstance();
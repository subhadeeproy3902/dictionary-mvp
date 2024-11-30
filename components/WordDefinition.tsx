"use client";

import { Play, Pause } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { DictionaryEntry } from "@/types";
import { WordMeaning } from "./dictionary/WordMeaning";
import { useEffect, useState } from "react";

interface WordDefinitionProps {
  data: DictionaryEntry;
}

export function WordDefinition({ data }: WordDefinitionProps) {
  const [speechService, setSpeechService] = useState<any>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    import("@/lib/dictionary/speech").then((module) => {
      setSpeechService(module.speechService);
    });
  }, []);

  const handleSpeak = () => {
    if (speechService) {
      if (isPlaying) {
        speechService.stop();
        setIsPlaying(false);
      } else {
        speechService.speak(data.word, () => setIsPlaying(false));
        setIsPlaying(true);
      }
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8"
    >
      <div className="flex items-center gap-4">
        <div>
          <h1 className="text-4xl md:text-5xl font-bold gradient-text mb-3 font-serif">
            {data.word}
          </h1>
          <p className="text-lg text-muted-foreground font-serif italic">
            {data.phonetic}
          </p>
        </div>
        <Button
          variant="outline"
          size="icon"
          className="rounded-full h-12 w-12 hover:scale-105 transition-transform hover:bg-primary hover:text-primary-foreground border-2"
          onClick={handleSpeak}
          disabled={!speechService}
        >
          {isPlaying ? (
            <Pause className="h-5 w-5" />
          ) : (
            <Play className="h-5 w-5" />
          )}
        </Button>
      </div>

      {data.meanings.map((meaning, index) => (
        <WordMeaning key={index} meaning={meaning} index={index} />
      ))}
    </motion.div>
  );
}

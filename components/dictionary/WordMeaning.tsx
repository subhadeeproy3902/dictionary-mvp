"use client";

import { motion } from "framer-motion";
import { Definition } from "./Definition";
import { Meaning } from "@/types";

interface WordMeaningProps {
  meaning: Meaning;
  index: number;
}

export function WordMeaning({ meaning, index }: WordMeaningProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.1 }}
    >
      <div className="manuscript-card">
        <h2 className="text-3xl font-bold mb-6 gradient-text font-serif">
          {meaning.partOfSpeech}
        </h2>
        <div className="space-y-6">
          {meaning.definitions.map((def, defIndex) => (
            <Definition key={defIndex} definition={def} index={defIndex} />
          ))}
        </div>
      </div>
    </motion.div>
  );
}

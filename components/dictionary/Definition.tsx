"use client";

import { motion } from "framer-motion";
import { Definition as DefinitionType } from "@/types";
import { Dot } from "lucide-react";

interface DefinitionProps {
  definition: DefinitionType;
  index: number;
}

export function Definition({ definition, index }: DefinitionProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: index * 0.05 }}
      className="space-y-4"
    >
      <p className="text-lg poppins-regular">
        <span className="text-primary text-sm">{index + 1}</span>.{" "}
        {definition.definition}
      </p>
      {definition.example && (
        <p className="text-base md:text-lg text-gray-400 italic">
          Example: {definition.example}
        </p>
      )}

      {definition.synonyms.length > 0 ? (
        <div className="flex flex-col">
          <p className="text-lg text-gray-400">Synonyms :</p>
          <div className="flex flex-row flex-wrap gap-3">
            {definition.synonyms.map((synonym, index) => (
              <div
                className="px-5 bg-secondary/90 text-orange-400 mt-2 w-fit rounded-full py-1"
                key={index}
              >
                {synonym}
              </div>
            ))}
          </div>
        </div>
      ) : null}

      {definition.antonyms.length > 0 ? (
        <div className="flex flex-col">
          <p className="text-lg md:text-xl">Antonyms :</p>
          <ul className="list-disc pl-5">
            {definition.antonyms.map((antonym, index) => (
              <li key={index}>{antonym}</li>
            ))}
          </ul>
        </div>
      ) : null}
    </motion.div>
  );
}

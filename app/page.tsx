"use client";

import { useState } from "react";
import { Book, Github } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { ThemeToggle } from "@/components/ThemeToggle";
import { SearchBar } from "@/components/SearchBar";
import { WordDefinition } from "@/components/WordDefinition";
import { ErrorDisplay } from "@/components/ErrorDisplay";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import { DictionaryEntry, DictionaryError } from "@/types";
import { Button } from "@/components/ui/button";

export default function Home() {
  const [result, setResult] = useState<DictionaryEntry | null>(null);
  const [error, setError] = useState<DictionaryError | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (term: string) => {
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await fetch(
        `https://api.dictionaryapi.dev/api/v2/entries/en/${encodeURIComponent(
          term
        )}`
      );
      const data = await response.json();
      console.log(data);

      if (!response.ok) {
        setError(data);
      } else {
        setResult(data[0]);
      }
    } catch (err) {
      setError({
        title: "Error",
        message: "An error occurred while fetching the definition.",
        resolution: "Please try again later.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-background p-6 md:p-12"
    >
      <div className="mx-auto max-w-4xl space-y-8">
        <motion.header
          className="flex items-center justify-between"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center gap-2">
            <Book className="h-8 w-8 text-primary" />
            <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/60">
              Dictionary
            </h1>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" asChild>
              <a
                href="https://github.com/subhadeeproy3902/dictionary-mvp"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Github className="h-5 w-5" />
              </a>
            </Button>
            <ThemeToggle />
          </div>
        </motion.header>

        <SearchBar onSearch={handleSearch} isLoading={loading} />

        <AnimatePresence mode="wait">
          {(loading) && <LoadingSpinner />}
          {error && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="mt-8"
            >
              <ErrorDisplay error={error} />
            </motion.div>
          )}
          {result && (
            <>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="mt-8"
              >
                <WordDefinition data={result} />
              </motion.div>

              {/* 
                license: {
                  name: string;
                  url: string;
                };
                sourceUrls: string[]; 
              */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="mt-8"
              >
                {/* Handle the ui of the sourceUrl and the license */}
                <div className="flex items-center gap-4">
                  {result.sourceUrls.map((url, index) => (
                    <p key={index}>
                      Source :{" "}
                      <a
                        href={url}
                        target="_blank"
                        className="text-primary hover:underline"
                      >
                        {url}
                      </a>
                    </p>
                  ))}
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </motion.main>
  );
}

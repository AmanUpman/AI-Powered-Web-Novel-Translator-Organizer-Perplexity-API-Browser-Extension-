# AI-Powered Web Novel Translator & Organiser

A browser extension that uses the Perplexity API to automatically translate, refine, and organise Korean web novel chapters into high-quality English, ready for easy e-book conversion.

## Project Overview

Many web novels are never officially translated, and simple machine translation often ruins the nuance, tone, and meaning of the original text. As a full-stack developer and avid reader, I built this extension to bridge that gap by combining my passion for reading with a desire to explore new technologies.

The project began as a basic Python script and gradually evolved into a full-featured browser extension through continuous improvements and automation. It also served as my first in-depth experience with AI APIs, using Perplexity and GPT-based assistants for code generation and debugging.

## Features

* Automatic chapter extraction from Korean web novel sites (tested on Booktoki)
* High-quality AI translation that preserves tone, style, and nuance
* Efficient API usage through request batching, result caching, and redundancy checks
* Structured output with Markdown-style formatting for easy EPUB conversion
* One-click export to generate a clean text file compatible with Pandoc, Calibre, or Sigil
* Simple, user-friendly interface with buttons for translating, saving, and exporting chapters

## How It Works

1. Visit a supported web novel chapter page (e.g., Booktoki).
2. Click “Translate & Save Chapter” to process and store the chapter.
3. Repeat for each chapter you want to include.
4. Click “Export Book (Text)” to download a Markdown-compatible `.txt` file, ready for conversion to EPUB.

## Technologies Used

* JavaScript (browser extension)
* Perplexity API for translation and refinement
* Markdown for structured text output
* Optional tools: Pandoc, Calibre, Sigil for e-book conversion

## Motivation

* Address the lack of translated content for many excellent web novels
* Turn a personal reading habit into a meaningful technical project
* Learn and apply AI APIs and browser automation through hands-on development

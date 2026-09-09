@echo off

echo install ollama of winget:
curl -L -o OllamaSetup.exe https://ollama.com/download/OllamaSetup.exe

echo check ollama version:
ollama -v

echo check function command:
ollama -h

echo check model:
ollama list

echo install model:
ollama create qwen2.5-coder:3b

echo run serve:
ollama serve

echo regist:
ollama pull qwen2.5-coder:3b

echo ollama run:
ollama run qwen2.5-coder:3b

pause
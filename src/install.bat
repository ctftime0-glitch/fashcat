@echo off

echo check winget version:
winget --version

echo install ollama of winget:
winget install Ollama.Ollama

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
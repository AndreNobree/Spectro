// voiceCommands.js
export function startRecognition(recognition, wordsElement, btnElement) {
    recognition.start();
    btnElement.innerHTML = 'Interromper';
  }
  
  export function stopRecognition(recognition, btnElement, wordsElement) {
    recognition.stop();
    btnElement.innerHTML = 'Transcrever Áudio';
  }
  
  export function handleResult(event, pElement, wordsElement) {
    const transcript = Array.from(event.results)
      .map((result) => result[0])
      .map((result) => result.transcript)
      .join('');
  
    pElement.textContent = transcript + ', ';
    if (event.results[0].isFinal) {
      pElement = document.createElement('span');
      wordsElement.appendChild(pElement);
    }
  }
  
  export function handleEnd(recognition, wordsElement) {
    recognition.start();
  }
  
  export function scrollToBottom(wordsElement) {
    wordsElement.scrollTop = wordsElement.scrollHeight;
  }
  
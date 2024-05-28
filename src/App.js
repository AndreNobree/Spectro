import InfoSys from './pages/infoSys';
import './App.css';

function App() {
  var ongoing = false;
  var recognition = null;

  function verificaStatus() {
    if (ongoing === true) {
      recognition.start();
    }
  }

  function init() {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    recognition = new SpeechRecognition();
    recognition.interimResults = true;
    recognition.lang = 'pt-BR';

    var p = document.createElement('span');
    const words = document.querySelector('.words');
    words.appendChild(p);

    recognition.addEventListener('result', e => {
      const transcript = Array.from(e.results)
        .map(result => result[0])
        .map(result => result.transcript)
        .join('');

      p.textContent = transcript + ", ";

      console.log(transcript);

      if (e.results[0].isFinal) {
        p = document.createElement('span');
        words.appendChild(p);
        
        // Enviar transcript para o backend aqui
        enviarTranscript(transcript);
      }
    });

    recognition.addEventListener('end', verificaStatus);
    recognition.start();
  }

  function doStartStopCheck() {
    if (ongoing === true) {
      ongoing = false;
      recognition.stop();
      document.getElementById('btn_speech').innerHTML = "Transcrever Áudio";
    } else if (recognition) {
      ongoing = true;
      recognition.start();
      document.getElementById('btn_speech').innerHTML = "Interromper";
    } else {
      console.log("init");
      ongoing = true;
      init();
      document.getElementById('btn_speech').innerHTML = "Interromper";
    }
  }

  function rolaScroll() {
    const w = document.querySelector('.words');
    w.scrollTop = w.scrollHeight;
  }

  // Função para enviar transcript para o backend
  function enviarTranscript(transcript) {
    fetch('http://192.168.0.8:3001/executar-comando', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ comando: transcript }),
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Erro ao enviar para o back-end');
        }
        return response.json(); // Isso só é necessário se o servidor realmente retorna um JSON
      })
      .then(data => {
        console.log('Resposta do servidor:', data);
      })
      .catch(error => {
        console.error('Erro ao enviar para o back-end:', error);
      });
  }

  setInterval(rolaScroll, 1000);

  return (
    <div className="App">
      <div className='infosys'>
        <InfoSys />
      </div>
      <div></div>
      <div className='comandoTexto'>
        <h1>Transcrever Texto I.A</h1>
        <div className='words'></div>
        <button id="btn_speech" onClick={doStartStopCheck}>
          <strong>Transcrever Áudio</strong>
        </button>
      </div>
    </div>
  );
}

export default App;

import React, { useEffect, useState } from 'react';

function InfoSys() {
    const [cpuColor, setCpuColor] = useState('#008132'); // Cor padrão
    const [cpuUsage, setCpuUsage] = useState(0);
    const [memoryUsage, setMemoryUsage] = useState(0);
    const [deviceType, setDeviceType] = useState('');
    const [screenResolution, setScreenResolution] = useState('');
    const [browserLanguage, setBrowserLanguage] = useState('');
    const [userLocation, setUserLocation] = useState('');
    const [networkConnection, setNetworkConnection] = useState('');
    const [networkType, setNetworkType] = useState('');
    const [osType, setOsType] = useState('');
    const [osVersion, setOsVersion] = useState('');
    const [microphoneActive, setMicrophoneActive] = useState(false);
    const [activeMicrophoneDevice, setActiveMicrophoneDevice] = useState(null);

    useEffect(() => {
    // Tipo de dispositivo
    setDeviceType(navigator.platform);

    // Resolução da tela
    setScreenResolution(`${window.screen.width}x${window.screen.height}`);

    // Idioma do navegador
    setBrowserLanguage(navigator.language);

    // Localização do usuário (exemplo de uso da API de geolocalização)
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
        setUserLocation(`Latitude: ${position.coords.latitude}, Longitude: ${position.coords.longitude}`);
        }, (error) => {
        console.error(error.message);
        setUserLocation('Erro ao obter localização');
        });
    } else {
        setUserLocation('Geolocalização não suportada');
    }

    // Conectividade de rede
    setNetworkConnection(navigator.onLine ? 'Online' : 'Offline');

    // Tipo de conexão de rede (exemplo usando a API de Conexão)
    if (navigator.connection) {
        setNetworkType(navigator.connection.effectiveType || 'Desconhecido');
    } else {
        setNetworkType('Não suportado');
    }
  

    // Tipo de sistema operacional
    setOsType(navigator.platform);

    // Versão do sistema operacional
    setOsVersion(navigator.appVersion);


    const fetchSystemData = () => {
        // Simulando uma chamada de API para obter dados do sistema
        const simulatedCPUUsage = Math.random() * 100;
        const simulatedMemoryUsage = Math.random() * 100;

        setCpuUsage(simulatedCPUUsage);
        setMemoryUsage(simulatedMemoryUsage);

        const newCpuColor = simulatedCPUUsage > 90 ? '#FF0000' : '#008132';
        const newCpuColor2 = simulatedMemoryUsage > 90 ? 'orange' : '#008132';
        setCpuColor(newCpuColor);
        // setCpuColor(newCpuColor2);
    };

    // Atualizando a cada segundo (1000 milissegundos)
    const intervalId = setInterval(fetchSystemData, 1000);

    const checkMicrophoneStatus = async () => {
        try {
          const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
          setMicrophoneActive(true);
  
          const devices = await navigator.mediaDevices.enumerateDevices();
          const activeMicrophone = devices.find(device => device.kind === 'audioinput' && device.deviceId === stream.getAudioTracks()[0].deviceId);
  
          setActiveMicrophoneDevice(activeMicrophone);
        } catch (error) {
          console.error('Error accessing microphone:', error);
          setMicrophoneActive(false);
        }
      };
  
      checkMicrophoneStatus();

    // Limpando o intervalo ao desmontar o componente
    return () => clearInterval(intervalId);

    }, []);

    return (
        <div style={{color:cpuColor, fontFamily:'Courier New'}}>
        <h1>Informações do Sistema</h1>
        <p><strong>{`CPU Usage: ${cpuUsage.toFixed(2)}%`}</strong></p>
        <p><strong>{`Memory Usage: ${memoryUsage.toFixed(2)}%`}</strong></p>
        <p><strong>{`Tipo de dispositivo: ${deviceType}`}</strong></p>
        <p><strong>{`Resolução da tela: ${screenResolution}`}</strong></p>
        <p><strong>{`Idioma do navegador: ${browserLanguage}`}</strong></p>
        <p><strong>{`Localização do usuário: ${userLocation}`}</strong></p>
        <p><strong>{`Conectividade de rede: ${networkConnection}`}</strong></p>
        <p><strong>{`Tipo de conexão de rede: ${networkType}`}</strong></p>
        <p><strong>{`Tipo de sistema operacional: ${osType}`}</strong></p>
        <p><strong>{`Versão do sistema operacional: ${osVersion}`}</strong></p>
        <p><strong>{microphoneActive ? (
        <p>
            Microphone is active.
            {activeMicrophoneDevice && (
                <span>
                Status Microfone: {activeMicrophoneDevice.label || 'Unknown'}
                </span>
            )}
            </p>
        ) : (
            <p>Status Microfone: disabled</p>
        )}</strong>
        </p>
        </div>
    );
}

export default InfoSys;

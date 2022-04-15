var voiceList = document.querySelector('#voiceList');
    var abc = document.querySelectorAll('.abc');
    var synth = window.speechSynthesis;
    var voices = [];
    abc.forEach(but => but.addEventListener('click', () => {
        var toSpeak = new SpeechSynthesisUtterance(`${but.innerText}`);
        var selectedVoiceName = voiceList.selectedOptions[0].getAttribute('data-name');
        voices.forEach((voice) => {
            if (voice.name === selectedVoiceName) {
                toSpeak.voice = voice;
            }
        });
        synth.speak(toSpeak);
    }));
    PopulateVoices();
    if (speechSynthesis !== undefined) {
        speechSynthesis.onvoiceschanged = PopulateVoices;
    }
    function PopulateVoices() {
        voices = synth.getVoices();
        var selectedIndex = voiceList.selectedIndex < 0 ? 0 : voiceList.selectedIndex;
        voiceList.innerHTML = '';
        voices.forEach((voice) => {
            var listItem = document.createElement('option');
            listItem.textContent = voice.name;
            listItem.setAttribute('data-lang', voice.lang);
            listItem.setAttribute('data-name', voice.name);
            voiceList.appendChild(listItem);
        });
        voiceList.selectedIndex = 2;
    }
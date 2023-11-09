function buttonClicked() {
    var word = document.getElementById("searchData").value;
  
    fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)
      .then((response) => response.json())
      .then((data) => {
        displayDictionaryData(data);
      })
      .catch((error) => {
        console.error("Error fetching dictionary data: ", error);
      });
  }
  
  function displayDictionaryData(data) {
    var dictionaryMeaningsContainer = document.getElementById("dictionaryMeaning");
  
    dictionaryMeaningsContainer.innerHTML = "";
    
    if (data.length > 0) {
      data.forEach((entry) => {
        var word = entry.word;
        var phonetic = entry.phonetic;
  
        var wordElement = document.createElement("h4");
        wordElement.innerHTML = `${word} <span class="phonetic">${phonetic}</span}`;
        dictionaryMeaningsContainer.appendChild(wordElement);
  
        entry.meanings.forEach((meaning) => {
          var partOfSpeech = meaning.partOfSpeech;
          var definitions = meaning.definitions.map((def) => def.definition).join(", ");
          var meaningElement = document.createElement("p");
          meaningElement.innerHTML = `<strong>${partOfSpeech}:</strong> ${definitions}`;
          dictionaryMeaningsContainer.appendChild(meaningElement);
  
          if (meaning.definitions[0].example) {
            var exampleElement = document.createElement("p");
            exampleElement.innerHTML = `<strong>Example:</strong> ${meaning.definitions[0].example}`;
            dictionaryMeaningsContainer.appendChild(exampleElement);
          }
        });
  
        entry.phonetics.forEach((phonetic) => {
          if (phonetic.audio) {
            var audioElement = document.createElement("audio");
            audioElement.controls = true;
            audioElement.src = phonetic.audio;
            dictionaryMeaningsContainer.appendChild(audioElement);
          }
        });
      });
    } else {
      dictionaryMeaningsContainer.innerHTML = "Word not found in the dictionary. Please try again ";
    }
  }
  
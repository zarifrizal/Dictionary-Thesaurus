function buttonClicked() {
    var word = document.getElementById("searchData").value;
  
    fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)
      .then((response) => response.json())
      .then((data) => {
        displaySynonymsAndSourceLinks(data);
      })
      .catch((error) => {
        console.error("Error fetching dictionary data: ", error);
      });
  }
  
  function displaySynonymsAndSourceLinks(data) {
    var thesaurusSynonymsContainer = document.getElementById("thesaurusSynonyms");
    var sourceLinksContainer = document.getElementById("sourceLinks");
  
    thesaurusSynonymsContainer.innerHTML = "";
    sourceLinksContainer.innerHTML = "";
  
    if (data.length > 0) {
      data.forEach((entry) => {
        // Display synonyms for the entry
        var synonyms = entry.meanings.reduce((acc, meaning) => {
          acc.push(...meaning.definitions[0].synonyms);
          return acc;
        }, []);
  
        if (synonyms.length > 0) {
          thesaurusSynonymsContainer.innerHTML += `<p>Synonyms for ${entry.word}: ${synonyms.join(", ")}</p>`;
        } else {
          thesaurusSynonymsContainer.innerHTML += `<p>No synonyms found for ${entry.word}.</p>`;
        }
  
        // Extract source URLs from the data and display them
        if (entry.sourceUrls && entry.sourceUrls.length > 0) {
          entry.sourceUrls.forEach((sourceUrl) => {
            var listItem = document.createElement("li");
            listItem.innerHTML = `<a href="${sourceUrl}" target="_blank">Source Link</a>`;
            sourceLinksContainer.appendChild(listItem);
          });
        }
      });
    } else {
      thesaurusSynonymsContainer.innerHTML = "Word not found in the thesaurus. Please try again ";
    }
  }
  
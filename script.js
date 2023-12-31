var editando= false;



function trocarEditando(){
  if(editando=="off"){
    editando="on";
  }else{
    editando="off";
  }
}
function moveAt(ball, pageX, pageY) {
    ball.style.left = pageX - ball.offsetWidth / 2 + 'px';
    ball.style.top = pageY - ball.offsetHeight / 2 + 'px';
  }


function onDragStart(event) {
    console.log('Drag start ID:', event.target.id);
    event.dataTransfer.setData('text/plain', event.target.id);
    console.log(lista);

}

function onDragOver(event) {
    event.preventDefault();
}

let lista=[t1.id];

function onDrop(event) {
    event.preventDefault();

    const id = event.dataTransfer.getData('text/plain');
    let draggableElement = document.getElementById(id)

    if (lista.includes(draggableElement.id)) {
        try {
            draggableElement=draggableElement.cloneNode(true);
            const dropzone = event.target;
            draggableElement.id = "t2"+Math.random();
 
            dropzone.appendChild(draggableElement);
            draggableElement.style.position="absolute";

            draggableElement.style.left = event.pageX - draggableElement.offsetWidth / 2 - 10+ 'px';
            draggableElement.style.top =" 0%";
            console.log('Drop zone ID:', dropzone.id);
            event.dataTransfer.clearData();
        } catch (error) {
            console.error('Error appending draggable element:', error);
        }
    } else {
        const dropzone = event.target;
        dropzone.appendChild(draggableElement); 
        draggableElement.style.position="absolute";

        draggableElement.style.left = event.pageX - draggableElement.offsetWidth / 2 - 10+ 'px';
        draggableElement.style.top =" 0%";  
        event.dataTransfer.clearData();

        console.error('Draggable element not found with ID: ' + id);
    }
}

const noteMap = {
    'A': 0,
    'Bb': 1,
    'B': 2,
    'C': 3,
    'C#': 4,
    'D': 5,
    'Eb': 6,
    'E': 7,
    'F': 8,
    'F#': 9,
    'G': 10,
    'Ab': 11
  };

  let notasUsadas = []

  function encontrarChavePorValor(valor) {
    for (const chave in noteMap) {
      if (noteMap[chave] === valor) {
        return chave;
      }
    }
    return null; // Valor não encontrado
  }
  

function processarTexto() {
    // Obter o texto do textarea
    var inputText = document.getElementById('inputText').value;
    inputText = inputText;

    // Adicionar uma <div> antes de cada linha
    var novoTexto = '<div style="height: 1.5em;  align-items:center; position:relative; text-align:center;width:100%; display:flex;background-color:grey;" id="outputContainer" editable="false" ondrop="onDrop(event)" ondragover="onDragOver(event)"></div>' + inputText.replace(/\n/g, '<div style="display:flex; align-items:center; position:relative;height: 1.5em;text-align:center;width:100%;background-color:grey" id="outputContainer" ondrop="onDrop(event)" ondragover="onDragOver(event)"></div>');
    // Exibir o texto formatado
    document.getElementById('outputImage').innerHTML = '<div style="height: 1em;"></div>' + novoTexto;

}

function processarTexto() {
  // Obter o texto do textarea
  var inputText = document.getElementById('inputText').value;
  inputText = inputText.split("\n");

  // Limpar o conteúdo atual do outputImage
  document.getElementById('outputImage').innerHTML = '';

  // Iterar sobre as linhas do texto e adicionar divs alternadas ao outputImage
  for (var i = 0; i < inputText.length; i++) {
    // Adicionar div sem texto
    var divWithoutText = document.createElement('div');
    divWithoutText.style.height = '1.5em';
    divWithoutText.style.alignItems = 'center';
    divWithoutText.style.position = 'relative';
    divWithoutText.style.textAlign = 'center';
    divWithoutText.style.width = '100%';
    divWithoutText.style.display = 'flex';
    divWithoutText.style.backgroundColor = '#dbdbdb';
    divWithoutText.style.margin = "0 0 0 0";

    divWithoutText.id = 'outputContainer' + i; // Adiciona um ID único para cada div
    divWithoutText.setAttribute('contenteditable', 'false');
    divWithoutText.setAttribute('ondrop', 'onDrop(event)');
    divWithoutText.setAttribute('ondragover', 'onDragOver(event)');
    document.getElementById('outputImage').appendChild(divWithoutText);

    // Adicionar div com texto
    if( inputText[i]!=""){
    var divWithText = document.createElement('div');
    divWithText.textContent = inputText[i];
    divWithText.setAttribute('contenteditable', 'true');
    document.getElementById('outputImage').appendChild(divWithText);
  }}
}



function adicionar(){
    var inputText = document.getElementById('testetext').value;
    const el = document.createElement('div');
    el.setAttribute('draggable', true);
    el.setAttribute('ondragstart', 'onDragStart(event)');
    el.setAttribute('id', 't1'+Math.random());
    el.classList.add('draggable');
    el.style.height = "1.5em";
    el.textContent=inputText;
    el.style.backgroundColor = "red";
    document.getElementById("armazemdeacordes").appendChild(el);
    document.getElementById('testetext').value = "";
    lista.push(el.id);
    console.log(lista);
}

function addChord(){
    var notesSelect = document.getElementById("notes");
    var chordTypesSelect = document.getElementById("chordTypes");
    var selectedNotes = Array.from(notesSelect.selectedOptions).map(option => option.value);
    var selectedChordType = chordTypesSelect.value;

    notasUsadas.push(selectedNotes);
    var resultChord = selectedNotes.join("") + selectedChordType;
    const el = document.createElement('div');
    el.setAttribute('draggable', true);
    el.setAttribute('ondragstart', 'onDragStart(event)');
    el.setAttribute('id', 't1'+Math.random());
    lista.push(el.id);
    el.classList.add('draggable');
    el.style.height = "1.5em";
    el.textContent=resultChord;
    el.style.color= "#7D4F68";
    el.style.fontWeight= "bold";
    el.style.margin = "0 0 0 0";

    el.setAttribute('nota', noteMap[selectedNotes[0]])
    el.setAttribute('type', selectedChordType)
    document.getElementById("armazemdeacordes").appendChild(el);
    console.log(lista);

}

function transporCima() {
    const elementosComNota = document.querySelectorAll('[nota]');
  
    elementosComNota.forEach(elemento => {
      let valorNota = parseInt(elemento.getAttribute('nota')) + 1;
  
      if (valorNota > 11) {
        valorNota = valorNota - 12;
      }
  
      elemento.textContent =encontrarChavePorValor(valorNota)+ elemento.getAttribute('type');
      elemento.setAttribute('nota', valorNota);
    });
  }
  function transporBaixo() {
    const elementosComNota = document.querySelectorAll('[nota]');
  
    elementosComNota.forEach(elemento => {
      let valorNota = parseInt(elemento.getAttribute('nota')) - 1;
  
      if (valorNota <0) {
        valorNota = valorNota + 12;
      }
  
      elemento.textContent =encontrarChavePorValor(valorNota)+ elemento.getAttribute('type');
      elemento.setAttribute('nota', valorNota);
    });
  } 



function printInfo(){
  const areaID = "outputContainer";
  var printContent = document.getElementById(areaID).innerHTML;
  var originalContent = document.body.innerHTML;
  document.body.innerHTML = printContent;
  window.print();
  document.body.innerHTML = originalContent;
}

function processarTitulo(){
  var input = document.getElementById('inputTitulo').value;
  document.getElementById('inputTitulo').value = "";
  document.getElementById('titulo').innerHTML = input;
}

function deleteChord(event) {
  // Check if dataTransfer is available before using it
  if (event.dataTransfer) {
      const id = event.dataTransfer.getData('text/plain');
      let draggableElement = document.getElementById(id);
      draggableElement.parentNode.removeChild(draggableElement);
  }
}

document.addEventListener('click', function (event) {
  // Verifica se o elemento clicado possui o atributo "contenteditable" igual a "true"
  var isContentEditable = event.target && event.target.getAttribute('contenteditable') === 'true';

  // Verifica se a variável global "editando" está definida como "true"
  if (isContentEditable && editando) {
    // Restante do seu código para tornar o conteúdo do elemento editável
    event.target.setAttribute('contenteditable', 'true');

    // Adiciona um evento de foco para quando o elemento se tornar editável
    event.target.addEventListener('focus', function () {
      // Adiciona um evento de desfoco para quando o elemento perder o foco
      event.target.addEventListener('blur', function onBlur() {
        // Atualiza o conteúdo do elemento se o usuário inseriu algo e remove os eventos de foco e desfoco
        event.target.setAttribute('contenteditable', 'false');
        event.target.removeEventListener('focus', onFocus);
        event.target.removeEventListener('blur', onBlur);

        // Se o usuário inseriu algo
        if (event.target.textContent.trim() !== '') {
          // Atualiza o conteúdo do elemento
          event.target.textContent = event.target.textContent.trim();
        } else {
          // Se o usuário não inseriu nada, você pode decidir o que fazer aqui, como remover o elemento
          // Neste exemplo, vamos definir um texto padrão
          event.target.textContent = 'Novo Texto';
        }
      });

      // Remove o evento de foco após ativá-lo
      event.target.removeEventListener('focus', onFocus);
    });

    // Coloca o foco no elemento para iniciar a edição
    event.target.focus();
  }
});

function fontSelect(){
  console.log("fontSelect");
  var font = document.getElementById("Font-Select");
  font = font.value;
  if(font=="Default"){
    var sampleText = document.getElementById("lixo");
    var computedStyle = window.getComputedStyle(sampleText);
    var fontFamily = computedStyle.getPropertyValue('font-family');
    font = fontFamily;
  }
  document.getElementById("outputImage").style.fontFamily = font;

}


function save(){
  // Get the HTML content of the specific div
  var divContent = document.getElementById('outputContainer').outerHTML;

  // Create a Blob containing the div content
  var blob = new Blob([divContent], { type: 'text/html' });

  // Create a temporary URL for the Blob
  var url = URL.createObjectURL(blob);

  // Create a link element
  var link = document.createElement('a');

  // Set the link's attributes
  link.href = url;
  link.download = 'your_file_name.html';

  // Append the link to the document
  document.body.appendChild(link);

  // Trigger a click event on the link to start the download
  link.click();

  // Remove the link from the document
  document.body.removeChild(link);

  // Revoke the Blob URL to free up resources
  URL.revokeObjectURL(url);

}

// Assume you have an input element of type file in your HTML
// Assume you have an input element of type file in your HTML
var fileInput = document.getElementById('fileInput');

// Add an event listener to the input element
fileInput.addEventListener('change', function (event) {
    console.log("File selected!"); // Log to check if the event listener is triggered

    // Get the selected file
    var file = event.target.files[0];

    // Check if a file was selected
    if (file) {
        console.log("File:", file); // Log to check if the file object is correct

        // Create a FileReader
        var reader = new FileReader();

        // Set up the FileReader to handle the file content
        reader.onload = function (e) {
            // Get the content of the file
            var fileContent = e.target.result;

            console.log("File content:", fileContent); // Log the content to check if it's being read correctly

            // Assume you have a div with the id "targetDiv" where you want to replace the content
            var targetDiv = document.getElementById('outputContainer');

            // Replace the content of the target div with the content from the file
            targetDiv.innerHTML = fileContent;
        };

        // Set up another event listener for the FileReader to log any potential errors
        reader.onerror = function (e) {
            console.error("Error reading file:", e.target.error);
        };

        // Read the file as text
        reader.readAsText(file);
    }
});

function activateInput() {
  document.getElementById('fileInput').click();
}
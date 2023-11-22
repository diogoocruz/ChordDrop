
function moveAt(ball, pageX, pageY) {
    ball.style.left = pageX - ball.offsetWidth / 2 + 'px';
    ball.style.top = pageY - ball.offsetHeight / 2 + 'px';
  }


function onDragStart(event) {
    console.log('Drag start ID:', event.target.id);
    event.dataTransfer.setData('text/plain', event.target.id);

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

            draggableElement.style.left = event.pageX - draggableElement.offsetWidth / 2 + 'px';
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

        draggableElement.style.left = event.pageX - draggableElement.offsetWidth / 2 + 'px';
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

    // Adicionar uma <div> antes de cada linha
    var novoTexto = '<div style="height: 1.5em;  align-items:center; position:relative; text-align:center;width:100%; display:flex;background-color:grey;" id="outputContainer" ondrop="onDrop(event)" ondragover="onDragOver(event)"></div>' + inputText.replace(/\n/g, '<div style="display:flex; align-items:center; position:relative;height: 1.5em;text-align:center;width:100%;background-color:grey" id="outputContainer" ondrop="onDrop(event)" ondragover="onDragOver(event)"></div>');

    // Exibir o texto formatado
    document.getElementById('outputImage').innerHTML = '<div style="height: 1em;"></div>' + novoTexto;
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
    el.classList.add('draggable');
    el.style.height = "1.5em";
    el.textContent=resultChord;
    el.style.backgroundColor = "red";
    el.setAttribute('nota', noteMap[selectedNotes[0]])
    el.setAttribute('type', selectedChordType)
    document.getElementById("armazemdeacordes").appendChild(el);
    document.getElementById('testetext').value = "";
    lista.push(el.id);
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
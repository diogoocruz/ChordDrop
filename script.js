
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
            draggableElement.style.top = dropzone.offsetTop + 'px';
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
        draggableElement.style.top = dropzone.offsetTop + 'px';
        console.log('Drop zone ID:', dropzone.id);
        event.dataTransfer.clearData();

        console.error('Draggable element not found with ID: ' + id);
    }
}




function processarTexto() {
    // Obter o texto do textarea
    var inputText = document.getElementById('inputText').value;

    // Adicionar uma <div> antes de cada linha
    var novoTexto = '<div style="height: 1.5em; align-items:center; text-align:center;width:100%; display:flex;background-color:grey;" id="outputContainer" ondrop="onDrop(event)" ondragover="onDragOver(event)"></div>' + inputText.replace(/\n/g, '<div style="display:flex; align-items:center; height: 1.5em;text-align:center;width:100%;background-color:grey" id="outputContainer" ondrop="onDrop(event)" ondragover="onDragOver(event)"></div>');

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

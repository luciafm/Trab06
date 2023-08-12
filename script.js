const listaTarefas = [];

function adicionarTarefa() {
  const inputTarefa = document.getElementById("tarefa");
  const tarefa = inputTarefa.value;

  if (tarefa !== "") {
    const novoItem = document.createElement("li");
    novoItem.textContent = tarefa;
    listaTarefas.push(tarefa);
    atualizarLista();
    inputTarefa.value = "";

    console.log("Tarefa adicionada:", tarefa);
  }
}

function atualizarLista() {
  const listaTarefasElement = document.getElementById("listaTarefas");
  listaTarefasElement.innerHTML = "";
  for (const tarefa of listaTarefas) {
    const novoItem = document.createElement("li");
    novoItem.textContent = tarefa;
    listaTarefasElement.appendChild(novoItem);
  }

  console.log("Lista de tarefas completa:", listaTarefas);
}

const openButton = document.getElementById("openPopup");
const closeButton = document.getElementById("closePopup");

function abrir() {
  popup.style.display = "flex";
}
function abrir2() {
  popup2.style.display = "flex";
}
function abrir3() {
  popup3.style.display = "flex";
}
function abrir4() {
  popup4.style.display = "flex";
}
function fechar() {
  popup.style.display = "none";
  popup2.style.display = "none";
  popup3.style.display = "none";
  popup4.style.display = "none";
}

class Node {
  constructor(key) {
    this.key = key;
    this.left = null;
    this.right = null;
  }
}

class BST {
  constructor() {
    this.root = null;
  }

  insert(key) {
    this.root = this._insert(this.root, key);
  }

  _insert(node, key) {
    if (node === null) {
      return new Node(key);
    }

    if (key < node.key) {
      node.left = this._insert(node.left, key);
    } else {
      node.right = this._insert(node.right, key);
    }

    return node;
  }

  size() {
    return this._size(this.root);
  }

  _size(node) {
    if (node === null) {
      return 0;
    }
    return 1 + this._size(node.left) + this._size(node.right);
  }

  height() {
    return this._height(this.root);
  }

  _height(node) {
    if (node === null) {
      return -1;
    }
    return (
      1 + Math.max(this._height(node.left), this._height(node.right))
    );
  }

  min() {
    return this._min(this.root);
  }

  _min(node) {
    if (node === null) {
      return null;
    }
    while (node.left !== null) {
      node = node.left;
    }
    return node.key;
  }

  max() {
    return this._max(this.root);
  }

  _max(node) {
    if (node === null) {
      return null;
    }
    while (node.right !== null) {
      node = node.right;
    }
    return node.key;
  }

  internalPathLength() {
    return this._internalPathLength(this.root, 0);
  }

  _internalPathLength(node, depth) {
    if (node === null) {
      return 0;
    }
    return (
      depth +
      this._internalPathLength(node.left, depth + 1) +
      this._internalPathLength(node.right, depth + 1)
    );
  }

  isBalanced() {
    return this._isBalanced(this.root);
  }

  _isBalanced(node) {
    if (node === null) {
      return true;
    }

    const leftHeight = this._height(node.left);
    const rightHeight = this._height(node.right);

    if (Math.abs(leftHeight - rightHeight) > 1) {
      return false;
    }

    return this._isBalanced(node.left) && this._isBalanced(node.right);
  }

  // Adicione os métodos de travessia aqui
  inorderTraversal() {
    const result = [];
    this._inorderTraversal(this.root, result);
    return result;
  }

  _inorderTraversal(node, result) {
    if (node !== null) {
      this._inorderTraversal(node.left, result);
      result.push(node.key);
      this._inorderTraversal(node.right, result);
    }
  }

  preorderTraversal() {
    const result = [];
    this._preorderTraversal(this.root, result);
    return result;
  }

  _preorderTraversal(node, result) {
    if (node !== null) {
      result.push(node.key);
      this._preorderTraversal(node.left, result);
      this._preorderTraversal(node.right, result);
    }
  }

  postorderTraversal() {
    const result = [];
    this._postorderTraversal(this.root, result);
    return result;
  }

  _postorderTraversal(node, result) {
    if (node !== null) {
      this._postorderTraversal(node.left, result);
      this._postorderTraversal(node.right, result);
      result.push(node.key);
    }
  }

  levelOrderTraversal() {
    const result = [];
    const queue = [];

    if (this.root !== null) {
      queue.push(this.root);
    }

    while (queue.length > 0) {
      const node = queue.shift();
      result.push(node.key);

      if (node.left !== null) {
        queue.push(node.left);
      }

      if (node.right !== null) {
        queue.push(node.right);
      }
    }

    return result;
  }

  // ... (outros métodos da árvore binária)
}

const tree = new BST();

function adicionarTarefa() {
  const inputTarefa = document.getElementById("tarefa");
  const tarefa = inputTarefa.value.trim();

  if (tarefa !== "") {
    tree.insert(parseInt(tarefa));
    atualizarLista();
    mostrarInformacoes();
    inputTarefa.value = "";

    console.log("Tarefa adicionada:", tarefa);
  }

  atualizarLista();
  mostrarInformacoes();
  desenharArvore();
  inputTarefa.value = "";

  console.log("Tarefa adicionada:", tarefa);
}

function atualizarLista() {
  const listaTarefasElement = document.getElementById("listaTarefas");
  listaTarefasElement.innerHTML = "";

  treeTraversal(tree.root, (key) => {
    const novoItem = document.createElement("li");
    novoItem.textContent = key;
    listaTarefasElement.appendChild(novoItem);
  });

  console.log("Árvore de tarefas completa:", tree.root);
}

function treeTraversal(node, callback) {
  if (node !== null) {
    treeTraversal(node.left, callback);
    callback(node.key);
    treeTraversal(node.right, callback);
  }
}

function mostrarInformacoes() {
  const tamanhoElemento = document.getElementById("tamanho");
  const alturaElemento = document.getElementById("altura");
  const menorElemento = document.getElementById("menor");
  const maiorElemento = document.getElementById("maior");

  const comprimentoInternoElemento =
    document.getElementById("comprimentoInterno");
  const balanceamentoElemento = document.getElementById("balanceamento");
  const travessiasElemento = document.getElementById("travessias");

  tamanhoElemento.textContent = `Tamanho da Árvore: ${tree.size()}`;
  alturaElemento.textContent = `Altura da Árvore: ${tree.height()}`;
  menorElemento.textContent = `Menor Elemento: ${tree.min()}`;
  maiorElemento.textContent = `Maior Elemento: ${tree.max()}`;
  comprimentoInternoElemento.textContent = `Comprimento Interno: ${tree.internalPathLength()}`;
  balanceamentoElemento.textContent = `Árvore Balanceada: ${
    tree.isBalanced() ? "Sim" : "Não"
  }`;

  const inorder = tree.inorderTraversal().join(", ");
  const preorder = tree.preorderTraversal().join(", ");
  const postorder = tree.postorderTraversal().join(", ");
  const levelorder = tree.levelOrderTraversal().join(", ");

  travessiasElemento.innerHTML =
    `Travessia em Ordem:<br>${inorder}<br>` +
    `<br>`+
    `Travessia Pré-Ordem:<br>${preorder}<br>` +
    `<br>`+
    `Travessia Pós-Ordem:<br>${postorder}<br>` +
    `<br>`+
    `Travessia Level Order:<br>${levelorder}`;
}

function desenharArvore() {
  const arvoreContainer = document.getElementById("arvore-container");
  const inseridosDiv = document.querySelector(".inseridos");

  const width = inseridosDiv.clientWidth;
  const height = calcularAlturaArvore(tree.root) * 70 + 100; // Ajuste aqui

  arvoreContainer.innerHTML = ""; // Limpar o conteúdo anterior

  const svgNS = "http://www.w3.org/2000/svg";
  const svg = document.createElementNS(svgNS, "svg");
  svg.setAttribute("width", width);
  svg.setAttribute("height", height);

  if (tree.root !== null) {
    const rootX = width / 2;
    const rootY = 50;
    const xSpacing = width / (2 * tree.size());
    const ySpacing = 70;

    desenharNo(svg, tree.root, rootX, rootY, xSpacing, ySpacing);
  }

  arvoreContainer.appendChild(svg);
  inseridosDiv.style.height = `${height}px`; // Ajustar a altura da div
}

function calcularAlturaArvore(node) {
  if (node === null) {
    return 0;
  }
  return (
    1 +
    Math.max(
      calcularAlturaArvore(node.left),
      calcularAlturaArvore(node.right)
    )
  );
}

function desenharNo(svg, node, x, y, xSpacing, ySpacing) {
  if (node.left !== null) {
    svg.appendChild(drawLine(x, y, x - xSpacing, y + ySpacing));
    desenharNo(
      svg,
      node.left,
      x - xSpacing,
      y + ySpacing,
      xSpacing / 2,
      ySpacing
    );
  }

  if (node.right !== null) {
    svg.appendChild(drawLine(x, y, x + xSpacing, y + ySpacing));
    desenharNo(
      svg,
      node.right,
      x + xSpacing,
      y + ySpacing,
      xSpacing / 2,
      ySpacing
    );
  }

  const circle = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "circle"
  );
  circle.setAttribute("cx", x);
  circle.setAttribute("cy", y);
  circle.setAttribute("r", 20);
  circle.setAttribute("fill", "#FFBAAA"); // Definindo a cor como #FFBAAA
  svg.appendChild(circle);

  const text = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "text"
  );
  text.setAttribute("x", x);
  text.setAttribute("y", y + 5);
  text.setAttribute("text-anchor", "middle");
  text.textContent = node.key;
  svg.appendChild(text);
}

function drawLine(x1, y1, x2, y2) {
  const line = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "line"
  );
  line.setAttribute("x1", x1);
  line.setAttribute("y1", y1);
  line.setAttribute("x2", x2);
  line.setAttribute("y2", y2);
  line.setAttribute("stroke", "black");
  return line;
}

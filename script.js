class Node {
      constructor(name) {
        this.name = name;
        this.left = null;
        this.right = null;
      }
    }

    class BST {
      constructor() {
        this.root = null;
      }

      insert(name) {
        this.root = this._insert(this.root, name);
      }

      _insert(node, name) {
        if (node === null) {
          return new Node(name);
        }

        if (name < node.name) {
          node.left = this._insert(node.left, name);
        } else {
          node.right = this._insert(node.right, name);
        }

        return node;
      }

      // Outros métodos da árvore binária

      inorderTraversalNames() {
        const result = [];
        this._inorderTraversalNames(this.root, result);
        return result;
      }

      _inorderTraversalNames(node, result) {
        if (node !== null) {
          this._inorderTraversalNames(node.left, result);
          result.push(node.name);
          this._inorderTraversalNames(node.right, result);
        }
      }

      // Outros métodos da árvore binária
    }

    const tree = new BST();

    function adicionarTarefa() {
      const inputTarefa = document.getElementById("tarefa");
      const tarefa = inputTarefa.value.trim();

      if (tarefa !== "") {
        tree.insert(tarefa);
        atualizarLista();
        mostrarInformacoes();
        desenharArvore();
        inputTarefa.value = "";

        console.log("Tarefa adicionada:", tarefa);
      }
    }

    // Funções de atualização da interface
    function atualizarLista() {
      const listaTarefasElement = document.getElementById("listaTarefas");
      listaTarefasElement.innerHTML = "";

      const nomesOrdenados = tree.inorderTraversalNames();
      nomesOrdenados.forEach(nome => {
        const novoItem = document.createElement("div");
        novoItem.textContent = nome;
        listaTarefasElement.appendChild(novoItem);
      });
    }

function desenharArvore() {
  const arvoreContainer = document.getElementById("arvore-container");
  const inseridosDiv = document.querySelector(".inseridos");

  const width = inseridosDiv.clientWidth;
  const height = calcularAlturaArvore(tree.root) * 70 + 100;

  arvoreContainer.innerHTML = "";

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
  inseridosDiv.style.height = `${height}px`;
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
  circle.setAttribute("fill", "#FFBAAA");
  svg.appendChild(circle);

  const text = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "text"
  );
  text.setAttribute("x", x);
  text.setAttribute("y", y + 5);
  text.setAttribute("text-anchor", "middle");
  text.textContent = node.name;
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

function mostrarInformacoes() {
  const tamanhoElemento = document.getElementById("tamanho");
  const alturaElemento = document.getElementById("altura");
  const menorElemento = document.getElementById("menor");
  const maiorElemento = document.getElementById("maior");

  const nomesOrdenados = tree.inorderTraversalNames();
  const primeiraLetra = nomesOrdenados[0][0];
  const ultimaLetra = nomesOrdenados[nomesOrdenados.length - 1][0];

  tamanhoElemento.textContent = `Tamanho da Árvore: ${tree.size()}`;
  alturaElemento.textContent = `Altura da Árvore: ${tree.height()}`;
  menorElemento.textContent = `Primeira Letra: ${primeiraLetra}`;
  maiorElemento.textContent = `Última Letra: ${ultimaLetra}`;
}

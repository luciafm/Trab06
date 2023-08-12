const listaTarefas = [];

      class TaskNode {
        constructor(name) {
          this.name = name;
          this.left = null;
          this.right = null;
        }
      }

      class TaskBST {
        constructor() {
          this.root = null;
        }

        insertTask(name) {
          this.root = this._insertTask(this.root, name);
        }

        _insertTask(node, name) {
          if (node === null) {
            return new TaskNode(name);
          }

          if (name < node.name) {
            node.left = this._insertTask(node.left, name);
          } else {
            node.right = this._insertTask(node.right, name);
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
          return node.name; // Retorna o menor nome alfabeticamente
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
          return node.name; // Retorna o maior nome alfabeticamente
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
            result.push(node.name); // Adiciona o nome à lista de resultados
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
            result.push(node.name); // Adiciona o nome à lista de resultados
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
            result.push(node.name); // Adiciona o nome à lista de resultados
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
            result.push(node.name); // Adiciona o nome à lista de resultados

            if (node.left !== null) {
              queue.push(node.left);
            }

            if (node.right !== null) {
              queue.push(node.right);
            }
          }

          return result;
        }

        // Métodos de travessia e outras funcionalidades aqui
      }

      const tree = new TaskBST();

      function adicionarTarefa() {
        const inputTarefa = document.getElementById("tarefa");
        const tarefaNome = inputTarefa.value.trim();

        if (tarefaNome !== "") {
          tree.insertTask(tarefaNome);
          listaTarefas.push(tarefaNome);
          atualizarLista();
          mostrarInformacoes();
          desenharArvore();
          inputTarefa.value = "";

          console.log("Tarefa adicionada:", tarefaNome);
        }

        const alturaAtual = tree.height();
        if (alturaAtual > alturaMaxima) {
          alturaMaxima = alturaAtual;
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

        console.log("Lista de tarefas:", listaTarefas);
        console.log("Árvore de tarefas completa:", tree.root);
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
          `<br>` +
          `Travessia Pré-Ordem:<br>${preorder}<br>` +
          `<br>` +
          `Travessia Pós-Ordem:<br>${postorder}<br>` +
          `<br>` +
          `Travessia Level Order:<br>${levelorder}`;
      }
      function addNode() {
        const newNodeValue = document.getElementById("newNodeValue").value;
        if (newNodeValue.trim() !== "") {
          const newNode = document.createElement("div");
          newNode.classList.add("node");
          newNode.innerHTML = `
                    <div class="node-value">${newNodeValue}</div>
                    <div class="left"></div>
                    <div class="right"></div>
                `;

          const selectedNode = document.querySelector(".selected");
          if (selectedNode) {
            const direction = confirm("Deseja adicionar à esquerda?")
              ? "left"
              : "right";
            selectedNode.querySelector(`.${direction}`).appendChild(newNode);
          } else {
            document.getElementById("root").appendChild(newNode);
          }

          // Limpar o valor do input
          document.getElementById("newNodeValue").value = "";
        }
      }

      document.addEventListener("click", function (event) {
        const nodes = document.querySelectorAll(".node");
        nodes.forEach((node) => {
          node.classList.remove("selected");
        });

        if (event.target.classList.contains("node")) {
          event.target.classList.add("selected");
        }
      });
      function desenharArvore() {
        const arvoreSvg = document.getElementById("arvore-svg");
        const arvoreContainer = document.getElementById("arvore-container");

        // Definir o tamanho do SVG para o tamanho do arvore-container
        arvoreSvg.setAttribute("width", arvoreContainer.clientWidth);
        arvoreSvg.setAttribute("height", arvoreContainer.clientHeight);

        arvoreSvg.innerHTML = ""; // Limpar conteúdo anteriorF

        function desenharNo(node, x, y, depth = 0) {
          if (node) {
            const raio = 20; // Raio do círculo
            const espacamentoHorizontal = 100; // Espaçamento horizontal entre nós
            const espacamentoVertical = 70; // Espaçamento vertical entre níveis

            const espacamentoX =
              (espacamentoHorizontal / Math.pow(2, depth - 1)) * 1.5;
            const espacamentoY = espacamentoVertical;

            if (node.left) {
              const linhaEsquerda = document.createElementNS(
                "http://www.w3.org/2000/svg",
                "line"
              );
              linhaEsquerda.setAttribute("x1", x - 10); // Ajuste horizontal para a linha esquerda
              linhaEsquerda.setAttribute("y1", y);
              linhaEsquerda.setAttribute("x2", x - espacamentoX); // Ajuste horizontal para a linha esquerda
              linhaEsquerda.setAttribute("y2", y + espacamentoY - raio);
              linhaEsquerda.setAttribute("stroke", "#000"); // Cor da linha
              arvoreSvg.appendChild(linhaEsquerda);
            }

            if (node.right) {
              const linhaDireita = document.createElementNS(
                "http://www.w3.org/2000/svg",
                "line"
              );
              linhaDireita.setAttribute("x1", x + 10); // Ajuste horizontal para a linha direita
              linhaDireita.setAttribute("y1", y);
              linhaDireita.setAttribute("x2", x + espacamentoX); // Ajuste horizontal para a linha direita
              linhaDireita.setAttribute("y2", y + espacamentoY - raio);
              linhaDireita.setAttribute("stroke", "#000"); // Cor da linha
              arvoreSvg.appendChild(linhaDireita);
            }

            desenharNo(
              node.left,
              x - espacamentoX,
              y + espacamentoY,
              depth + 1
            ); // Desenhar nó esquerdo
            desenharNo(
              node.right,
              x + espacamentoX,
              y + espacamentoY,
              depth + 1
            ); // Desenhar nó direito

            const circulo = document.createElementNS(
              "http://www.w3.org/2000/svg",
              "circle"
            );
            circulo.setAttribute("cx", x);
            circulo.setAttribute("cy", y);
            circulo.setAttribute("r", raio);
            circulo.setAttribute("fill", "#FFBAAA"); // Cor de preenchimento do círculo
            arvoreSvg.appendChild(circulo);

            const text = document.createElementNS(
              "http://www.w3.org/2000/svg",
              "text"
            );
            text.setAttribute("x", x);
            text.setAttribute("y", y + 5); // Ajuste vertical para centralizar o texto
            text.setAttribute("text-anchor", "middle"); // Alinhamento central
            text.textContent = node.name; // Nome do nó
            arvoreSvg.appendChild(text);
          }
        }

        if (tree.root) {
          const raizX = arvoreSvg.clientWidth / 2; // Coordenada X da raiz
          desenharNo(tree.root, raizX, 50); // Começar desenho a partir do nó raiz
          const profundidadeMaxima = tree.height(); // Profundidade máxima da árvore
          const espacamentoVertical = 70; // Espaçamento vertical entre níveis

          // Definir a altura do SVG com base na profundidade máxima e no espaçamento vertical
          arvoreSvg.setAttribute(
            "height",
            (profundidadeMaxima + 1) * espacamentoVertical
          );
        }
      }
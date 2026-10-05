// Seleciona os campos do formulário e da busca.
const btnCadastrar = document.getElementById("btn-cadastrar");
const inputBusca = document.getElementById("busca");
const inputNome = document.getElementById("nome");
const inputNota1 = document.getElementById("nota1");
const inputNota2 = document.getElementById("nota2");
const inputNota3 = document.getElementById("nota3");

// Seleciona os elementos que exibem erros, indicadores e alunos.
const divErro = document.getElementById("mensagem-erro");
const divCorpoTabela = document.getElementById("corpo-tabela");
const pMediaTurma = document.getElementById("media-turma");
const pMenorMedia = document.getElementById("menor-media");
const pMaiorMedia = document.getElementById("maior-media");

// Chave usada para salvar e recuperar a turma no navegador.
const STORAGE_KEY = "turma-boletim";
// Recupera os alunos salvos ou começa com uma lista vazia.
let turma = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];

// Salva a turma no armazenamento local do navegador.
function salvarTurma() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(turma));
}

// Atualiza os indicadores e redesenha a tabela com os dados atuais.
function atualizarTabela() {
  // Remove as linhas antigas antes de montar a tabela novamente.
  divCorpoTabela.textContent = "";

  if (turma.length === 0) {
    pMediaTurma.textContent = "Ainda não há alunos cadastrados.";
    pMenorMedia.textContent = "Menor média: -";
    pMaiorMedia.textContent = "Maior média: -";
  } else {
    // Calcula a média da turma e identifica quem tem a menor e a maior média.
    let somaMedias = 0;
    let menor = turma[0];
    let maior = turma[0];

    for (let i = 0; i < turma.length; i++) {
      const aluno = turma[i];

      somaMedias += turma[i].media;
      if (aluno.media < menor.media) {
        menor = aluno;
      }

      if (aluno.media > maior.media) {
        maior = aluno;
      }
    }
    const mediaGeral = somaMedias / turma.length;

    pMediaTurma.textContent = `Média da turma: ${mediaGeral.toFixed(1)}`;
    pMenorMedia.textContent = `Menor média: ${menor.nome} (${menor.media.toFixed(1)})`;
    pMaiorMedia.textContent = `Maior média: ${maior.nome} (${maior.media.toFixed(1)})`;
  }

  // Prepara o termo de busca e ordena uma cópia, preservando a lista original.
  const termoBusca = inputBusca.value.trim().toLocaleLowerCase("pt-BR");
  const alunosOrdenados = ordenarAlunos(turma, criterioOrdenacao, crescente);

  for (let i = 0; i < alunosOrdenados.length; i++) {
    const aluno = alunosOrdenados[i];
    const nomeAluno = aluno.nome.toLocaleLowerCase("pt-BR");

    if (!nomeAluno.includes(termoBusca)) {
      // Pula os alunos que não correspondem ao texto pesquisado.
      continue;
    }

    // Escolhe a classe visual da situação para colorir a etiqueta.
    const classeSituacao =
      aluno.situacao === "Aprovado"
        ? "aprovado"
        : aluno.situacao === "Recuperação"
          ? "recuperacao"
          : "reprovado";
    // Cria uma linha com os dados do aluno e o botão de remoção.
    const linha = document.createElement("tr");
    linha.innerHTML = `
      <td>${aluno.nome}</td>
      <td>${aluno.media.toFixed(1)}</td>
      <td>
        <span class="badge-situacao ${classeSituacao}">${aluno.situacao}</span>
      </td>
      <td><button type="button" class="btn-remover">Remover</button></td>
    `;

    const btnRemover = linha.querySelector(".btn-remover");

    // Remove o aluno, salva a lista e atualiza a tabela.
    btnRemover.addEventListener("click", () => {
      turma.splice(turma.indexOf(aluno), 1);
      salvarTurma();
      atualizarTabela();
    });

    divCorpoTabela.appendChild(linha);
  }
}

// Cadastra um aluno quando o botão é acionado.
btnCadastrar.addEventListener("click", function () {
  // Limpa qualquer erro exibido no cadastro anterior.
  if (divErro) divErro.textContent = "";

  // Lê os dados do formulário e padroniza a primeira letra do nome.
  const nomeDigitado = inputNome.value.trim();
  const nome =
    nomeDigitado.charAt(0).toUpperCase() + nomeDigitado.slice(1).toLowerCase();
  const nota1 = Number.parseFloat(inputNota1.value);
  const nota2 = Number.parseFloat(inputNota2.value);
  const nota3 = Number.parseFloat(inputNota3.value);

  // O nome não pode estar vazio nem ser formado apenas por símbolos.
  if (!nome || !/[a-zA-ZÀ-ÿ]/.test(nome)) {
    divErro.textContent = "Insira um nome válido";
    return;
  }

  // Cada nota deve ser um número entre 0 e 10.
  if (
    [nota1, nota2, nota3].some(
      (nota) => Number.isNaN(nota) || nota < 0 || nota > 10,
    )
  ) {
    divErro.textContent = "Preencha todas as notas corretamente";
    return;
  }

  // Calcula a média e define a situação com base nela.
  const media = (nota1 + nota2 + nota3) / 3;
  let situacao;
  if (media >= 7) {
    situacao = "Aprovado";
  } else if (media >= 4) {
    situacao = "Recuperação";
  } else {
    situacao = "Reprovado";
  }

  // Salva o novo aluno, atualiza a tabela e limpa o formulário.
  turma.push({ nome, media, situacao });

  salvarTurma();
  atualizarTabela();
  inputNome.value = "";
  inputNota1.value = "";
  inputNota2.value = "";
  inputNota3.value = "";
});

// Atualiza a tabela sempre que o texto da busca mudar.
inputBusca.addEventListener("input", () => {
  atualizarTabela();
});

// Guarda o critério e o sentido da ordenação atual.
let criterioOrdenacao = null;
let crescente = true;

// Ordena uma cópia da turma para manter a ordem original dos cadastros.
function ordenarAlunos(alunos, criterio, ordemCrescente) {
  const alunosOrdenados = alunos.slice();

  if (criterio === null) {
    return alunosOrdenados;
  }

  // Define a sequência usada ao ordenar pela situação escolar.
  const prioridadeSituacao = {
    Aprovado: 0,
    Recuperação: 1,
    Reprovado: 2,
  };

  // Compara os alunos pelo nome, pela média ou pela situação.
  alunosOrdenados.sort((alunoA, alunoB) => {
    let comparacao;

    if (criterio === "nome") {
      comparacao = alunoA.nome.localeCompare(alunoB.nome, "pt-BR", {
        sensitivity: "base",
      });
    } else if (criterio === "media") {
      comparacao = alunoA.media - alunoB.media;
    } else {
      comparacao =
        prioridadeSituacao[alunoA.situacao] -
        prioridadeSituacao[alunoB.situacao];
    }

    // Inverte a comparação para alternar entre crescente e decrescente.
    return ordemCrescente ? comparacao : -comparacao;
  });

  return alunosOrdenados;
}

// Alterna o sentido ao clicar no mesmo critério ou inicia outro em ordem crescente.
function escolherOrdenacao(criterio) {
  if (criterioOrdenacao === criterio) {
    crescente = !crescente;
  } else {
    criterioOrdenacao = criterio;
    crescente = true;
  }

  atualizarTabela();
}

// Liga cada cabeçalho ao critério de ordenação correspondente.
document.getElementById("ordem-nome").addEventListener("click", () => {
  escolherOrdenacao("nome");
});

document.getElementById("ordem-media").addEventListener("click", () => {
  escolherOrdenacao("media");
});

document.getElementById("ordem-situacao").addEventListener("click", () => {
  escolherOrdenacao("situacao");
});

// Apaga todos os alunos salvos e atualiza a tela.
const btnLimparTudo = document.getElementById("btn-limpar-tudo");
btnLimparTudo.addEventListener("click", () => {
  turma = [];
  salvarTurma();
  atualizarTabela();
});
// Mostra os dados salvos quando a página terminar de carregar.
document.addEventListener("DOMContentLoaded", () => {
  atualizarTabela();
});

[English](README.md) | [Português](README.pt-BR.md)

# Boletim da Turma

Aplicação web responsiva para cadastrar alunos, calcular médias e acompanhar os resultados da turma. Projeto final da disciplina de Introdução à Programação da FACEPE, desenvolvido com HTML, CSS e JavaScript puros, sem frameworks.

## Funcionalidades

- Cadastro de alunos com nome e três notas entre 0 e 10.
- Cálculo da média individual e classificação: Aprovado (média igual ou superior a 7), Recuperação (a partir de 4 e abaixo de 7) ou Reprovado (abaixo de 4).
- Exibição da média geral da turma e dos alunos com a maior e a menor média.
- Busca de alunos pelo nome.
- Ordenação por nome, média ou situação. Clique novamente no mesmo cabeçalho para inverter a ordem.
- Remoção individual de alunos ou limpeza de toda a turma.
- Salvamento dos dados no `localStorage` do navegador.
- Layout responsivo para telas menores.

## Como executar

Não é necessário instalar dependências nem executar um processo de compilação. Abra o arquivo `index.html` em um navegador ou execute o projeto com a extensão Live Server do VS Code.

Os dados ficam salvos no navegador em que foram cadastrados e não são sincronizados entre navegadores ou dispositivos.

## Tecnologias

- **HTML5** para a estrutura da página.
- **CSS3** para os estilos e o layout responsivo.
- **JavaScript** para validações, cálculos, busca, ordenação e armazenamento local.

## Arquivos principais

- `index.html`: estrutura da aplicação e tabela de resultados.
- `style.css`: estilos visuais e regras para telas menores.
- `script.js`: cadastro, validação, cálculos, busca, ordenação e persistência dos dados.
- `img/dev-cat2.avif`: imagem exibida no rodapé.

## Autor

Desenvolvido por **Renato Oliveira Galindo Rodrigues** em 2026.
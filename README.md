# Boletim da Turma

Aplicação web para cadastrar alunos, calcular médias e acompanhar os resultados da turma. Projeto final da disciplina de Introdução à Programação da FACEPE, desenvolvido com HTML, CSS e JavaScript, sem frameworks.

## Funcionalidades

- Cadastro de alunos com nome e três notas entre 0 e 10.
- Cálculo da média individual e classificação: Aprovado (média a partir de 7), Recuperação (a partir de 4) ou Reprovado (abaixo de 4).
- Resumo com a média geral da turma e os alunos com a menor e a maior média.
- Busca de alunos pelo nome.
- Ordenação por nome, média ou situação. Clique novamente no mesmo cabeçalho para inverter a ordem.
- Remoção individual de alunos ou limpeza de toda a turma.
- Salvamento dos dados no `localStorage` do navegador.
- Layout responsivo para telas menores.

## Como executar

Não é necessário instalar dependências nem executar um processo de compilação. Abra o arquivo `index.html` em um navegador ou use a extensão Live Server do VS Code.

Os dados ficam salvos no navegador em que foram cadastrados. Eles não são sincronizados entre dispositivos ou navegadores.

## Tecnologias

- **HTML5** para a estrutura da página.
- **CSS3** para estilos e layout responsivo.
- **JavaScript** para validações, cálculos, busca, ordenação e armazenamento local.

## Arquivos principais

- `index.html`: estrutura da aplicação e tabela de resultados.
- `style.css`: aparência e regras para telas menores.
- `script.js`: cadastro, validação, cálculos, busca, ordenação e persistência dos dados.
- `img/dev-cat2.avif`: imagem exibida no rodapé.

## Autor

Desenvolvido por **Renato Oliveira Galindo Rodrigues** em 2026.
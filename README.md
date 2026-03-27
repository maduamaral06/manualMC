# Manual Web - Defense V3

Projeto da versão online do Manual do Software de Defense V3

Padrinho do Projeto: Paulo Vicente

## Desenvolvimento

Documento foi desenvolvido utilizando HTML puro com alguns scripts que permite vários recursos como: pesquisa dentro da pagina, tradução e geração de PDF. 

## Como editar este documento? 

Toda gestão dos arquivos deve ser feita fazendo o uso do Git. O Git é uma ferramenta usada para registrar o histórico de edições de qualquer tipo de arquivo. Baixe a ferramenta utilizando o seguinte link: https://git-scm.com/download/win

Crie uma nova branch para cada nova funcionalidade ou correção de bug a partir da branch `main/master`:
<code>
git checkout main/master
git pull origin main/master
git checkout -b nome-da-sua-branch
</code>

Implemente as alterações na branch criada e Teste a funcionalidade implementada localmente

Após Faça o commit das alterações:
<code>
git add .
git commit -m "Descrição detalhada das suas alterações"
</code>

Envie as alterações para o repositório remoto:

<code>
git push origin nome-da-sua-branch
</code>

Crie uma pull request para solicitar a mesclagem da sua branch na branch `main/master`:

Aguarde a revisão e aprovação da sua pull request por outro membro da equipe.

Após a aprovação, a sua pull request será mesclada na branch `main/master`.

A mesclagem na branch `main/master` acionará automaticamente o processo de build e deploy, liberando a nova funcionalidade ou correção de bug para produção.

## Hospedagem

Plataforma será hospedada na OpenShift Intelbras (Interno)

Toda manutenção e solicitação deve ser feita a TIC via HelpDesk.

Responsaveis TIC pelo Deploy: Luiz Felipe da Silva Regis e Lucas Gabriel Ruschel Cruz

## Estrutura de Arquivos

```text
index.html                  # Página inicial do manual – direciona para o guia de implantação e operação
├── pt-BR/
│   ├── guiadeusuario_pt-BR.html   # Guia de implantação – instruções simplificadas para instalação e primeiro acesso
│   └── manual_pt-BR.html          # Guia de operação – instruções detalhadas das funcionalidades e configurações
├── res/
│   ├── css/               # Arquivos de estilo (CSS) para o visual do site
│   ├── img/               # Banco de imagens utilizadas no manual
│   ├── js/                # Scripts JavaScript utilizados nas páginas
│   └── pdf-link.json      # Link atualizado do datasheet do produto (gerado e atualizado automaticamente pela pipeline)

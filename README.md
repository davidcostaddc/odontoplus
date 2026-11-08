# OdontoPlus — modelo demonstrativo

Site responsivo em português para uma clínica odontológica fictícia.

## Arquivos
- `index.html`: estrutura e conteúdo das páginas.
- `css/styles.css`: identidade visual e adaptação para celular/tablet.
- `js/app.js`: catálogo, carrinho e formulário de solicitação de agendamento.

## Como abrir
Abra o arquivo `index.html` em um navegador. Não é necessário instalar nada.

## Personalização obrigatória antes de publicar
1. Troque o nome, logotipo, textos e dados da clínica.
2. Altere os preços de exemplo no arquivo `js/app.js`.
3. Substitua `5500000000000` pelo número oficial do WhatsApp, com código do país e DDD.
4. Confirme com a clínica os procedimentos, valores e horários.

## Limitações desta versão
Esta é uma demonstração de interface. Carrinho e solicitação de horário funcionam no navegador, mas não há banco de dados, login real, painel administrativo funcional nem bloqueio de horários em tempo real. Para uso comercial, será necessário integrar um backend (por exemplo, Firebase) e validar disponibilidade no servidor para evitar reservas duplicadas.

Os preços exibidos são exemplos e não devem ser usados como tabela real sem validação da clínica e do responsável técnico.

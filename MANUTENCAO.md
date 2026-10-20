# Manutenção — correções de outubro de 2026

## Executar

- Use Node 24, conforme `package.json`.
- Instale as dependências com o gerenciador do projeto e o `yarn.lock` existente.
- `npm start` inicia o ambiente local.
- `npm test -- --watchAll=false --runInBand` executa as regressões.
- `npm run build` compila para produção com ESLint habilitado.

## Configuração

`src/services/api.js` centraliza a API, o timeout, a paginação completa de coleções e a resolução das URLs de mídia. Para trocar o endereço, configure `REACT_APP_API_URL` antes de iniciar ou compilar; consulte `.env.example`. Nenhuma credencial é necessária no frontend para as consultas públicas atuais.

`useContent` cancela consultas ao sair da tela, evita que respostas atrasadas substituam o conteúdo de outra rota e oferece nova tentativa após falha. `ContentStatus` distingue carregamento, erro e ausência de conteúdo. `MediaImage` trata imagem ausente ou que não carrega.

## Comportamento corrigido

- Calendário: filtros de categoria e gênero no servidor, paginação de dez registros, retorno à primeira página ao trocar filtros e controles desabilitados quando não há próxima página.
- Home: consulta os seis próximos jogos em ordem crescente de data, incluindo o dia atual, sem filtrar uma página arbitrária de resultados no navegador.
- Notícias: ordenação por criação na API; a notícia atual não aparece entre as relacionadas; falhas não ficam presas em “Carregando”.
- Álbum: carrega todas as páginas, agrupa fotos com segurança e seleciona o ano atual ou o mais recente disponível.
- Vídeos: principal separado dos anteriores; grupos de cinco ao avançar e voltar; sem índices negativos.
- Prestação de contas: consulta todas as páginas e mostra “Documento indisponível” quando falta o PDF.
- Navegação: rota de associados acessível nos menus; menu lateral fecha ao navegar; breakpoint de 900 px evita duplicidade de menus no intervalo de 601–768 px.
- Seletiva: rota `/seletiva` com formulário próprio na interface. Utiliza o serviço de contato já configurado, com assunto “Inscrição para seletiva”; solicita nome do atleta e detalhes sobre idade, categoria e experiência. O envio registra uma solicitação e não confirma vaga automaticamente.
- Formulários: mensagens de sucesso e erro, preservação de dados na falha do contato/seletiva e bloqueio do botão durante o envio. O formulário de associação não dispara alertas durante a renderização.
- Layout: cabeçalho e rodapé compartilhados, retorno ao topo na troca de rota e página de erro com link de retorno.
- Metadados: idioma português e nome da associação no manifesto.
- Vercel: rewrite para permitir abertura direta e recarga das rotas da SPA.

## Limites

Validação local concluída: 14 testes passaram em três suítes; build de produção compilado com sucesso e sem avisos do ESLint. A validação ocorreu em uma cópia dos fontes, com conferência dos hashes dos arquivos ao aplicar ao projeto original. Não foi concluída inspeção visual no navegador.

Os testes de regressão simulam as respostas da API e o envio dos formulários. Não enviam mensagens reais. A aceitação dos filtros pelo servidor, as permissões públicas de conteúdo e a entrega dos formulários dependem dos serviços externos. O backend e o painel administrativo não fazem parte deste repositório.

Nenhuma mensalidade, vantagem de associado, credencial, destino de formulário ou integração de anúncios foi alterada. Não houve publicação em produção.

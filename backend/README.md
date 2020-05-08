# Recuperaçao de senha#

**RF (Requisito Funcional)**
**funcionalidades que terá na recuperação de senha

- O usuário deve poder recuperar sua senha informando o seu e-mail;
- O usuário deve receber um e-mail com instruções de recuperação de senha;
- O usuário deve poder resetar sua senha;

**RNF (Requisito não funcional)**
**Coisas nao ligadas diretamente com a regra de negocio. Ferramentas

- Utilizar Mailtrap para testar envios em ambienta de dev;
- Utilizar Amazon SES para envios em produção;
- O envio de e-mails deve acontecer em segundo plano (background job);

**RN (Regra de Negócio)**
** as regras impostas na recuperaçao de senha

- O link enviado por email para resetar senha, deve expirar em 2h;
- O usuário precisa confirmar a nova senha ao resetar sua senha;

# Atualização do perfil

**RF**

- O usuário deve poder atualizar seu nome, email e senha;

**RN**

- O usuário não pode alterar seu email para um email já utilizado;
- Para atualizar sua senha, o usuário deve informar a senha antiga;
- Para atualizar sua senha, o usuário precisa confirmar a nova antiga;

# Painel do prestador

**RF**

- O prestador deve poder listar seus agendamentos de um dia especifico;
- O prestador deve receber uma notificação sempre que houver um novo agendamento;
- O prestador deve podder visualizar as notificações não lidas;

**RNF**

- Os agendamentos dos prestadores devem ser armazenadas em cache;
- As notificações do prestador devem ser armazenadas no MongoDB;
- As notificações do prestador devem ser enviadas em tempo real utilizlando Socket.io;

**RN**

- A notificaçao deve ter um status de lida ou não-lida para que o prestador possa controlar;

# Agendamento de serviços

**RF**

- O usuário deve poder listar todos os prestadores de serviços cadastrados;
- O usuário deve poder listar os dias e o mês com pelo menos um horário  disponível de um prestador;
- O usuário deve poder listar horários disponíveis em um dia específico de um prestador;
- O usuário deve poder realizar um novo agendamento com um prestador;

**RNF**

- A listagem de prestadores devem ser armazenadas em cache;

**RN**

- Cada agendamento deve durar 1h exatament;
- Os agendaemntos devem estar ddisponívels entre 8h às 18h (Primeiro às 8h, Último às 17h);
- O usuário náo pode agendar em um horário já ocupado;
- O usuário náo pode agendar em um horário que já passou;
- O usuário náo pode agendar serviços consigo mesmo;

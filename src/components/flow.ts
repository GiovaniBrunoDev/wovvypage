interface Ctx {
  name?: string;
  email?: string;
  platform?: string;
  goal?: string;
}

export const flow = [
  {
    id: "welcome",
    message: "Olá! 👋 Sou o Giovani, fundador da Wovvy. Por aqui, você vai receber as instruções de instalação pro seu e-commerce.",
    next: "askName",
  },

  {
    id: "askName",
    message: "Antes de começarmos, como você se chama?",
    input: "name",
    next: "greetUser",
  },

  {
    id: "greetUser",
    message: (ctx: Ctx) => `Ótimo, ${ctx.name}! Para iniciarmos, preciso de algumas informações rápidas, ok?`,
    next: "askEmail",
  },

  {
    id: "askEmail",
    message: "Qual é o seu e-mail profissional?",
    input: "email",
    next: (ctx: Ctx) =>
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(ctx.email ?? "") ? "emailAccepted" : "emailRetry",
  },

  {
    id: "emailRetry",
    message: "Hmm... esse e-mail parece inválido. Pode tentar novamente?",
    next: "askEmail",
  },

  {
    id: "emailAccepted",
    message: "Perfeito! 📩",
    next: "askPlatform",
  },

  {
    id: "askPlatform",
    message: "Em qual plataforma sua loja está?",
    input: "platform",
    options: [
      "Shopify",
      "Nuvemshop",
      "Loja Integrada",
      "Tray",
      "WooCommerce",
      "Outro"
    ],
    next: "confirmPlatform",
  },

  {
    id: "confirmPlatform",
    message: (ctx: Ctx) =>
      ctx.platform === "Outro"
        ? `Sem problema, ${ctx.name}! Fazemos integração manual também. 🔧`
        :  `Perfeito, ${ctx.name}! Temos instalação rápida na plataforma ${ctx.platform} ✅`,
    next: "askGoal",
  },

  {
    id: "askGoal",
    message: "Qual é o seu principal objetivo agora?",
    input: "goal",
    options: ["Testar o sistema primeiro", "Instalar agora ⚡", "Falar com suporte humano"],
    next: "confirmGoal",
  },

  {
    id: "confirmGoal",
    message: (ctx: Ctx) =>
      ctx.goal === "Testar o sistema primeiro"
        ? `Show! Vamos te ajudar a testar rapidinho 😄`
        : ctx.goal === "Instalar agora ⚡"
        ? `Perfeito! Vamos acelerar sua instalação 🚀`
        : `Beleza! Já vou chamar alguém da equipe 💬`,
    next: "end",
  },

  {
    id: "end",
    messages: [
      "Obrigado por conversar comigo! 💙",
      "Em alguns segundos, alguém da equipe vai te chamar no WhatsApp."
    ],
    end: true,
  },
];

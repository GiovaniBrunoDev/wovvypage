import { useState, useEffect, useRef } from "react";

// 🧠 Contexto do fluxo
interface Ctx {
  name?: string;
  email?: string;
  whatsapp?: string;
  website?: string;
  platform?: string;
  goal?: string;
}

type NextType = string | ((ctx: Ctx) => string);

interface Step {
  id: string;
  message?: string | ((ctx: Ctx) => string);
  messages?: string[];
  options?: string[];
  input?: keyof Ctx;
  next?: NextType;
  end?: boolean;
}

interface Message {
  from: "bot" | "user";
  text: string;
}

// 💬 Fluxo de conversa
export const flow: Step[] = [
  {
    id: "welcome",
    message:
      "Olá! 👋 Sou o Giovani, fundador da Wovvy. Por aqui, você vai receber as instruções de instalação pro seu e-commerce.",
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
    message: (ctx: Ctx) =>
      `Ótimo, ${ctx.name}! Para iniciarmos, preciso de algumas informações rápidas, ok?`,
    next: "askEmail",
  },
  {
    id: "askEmail",
    message: "Qual é o seu e-mail profissional?",
    input: "email",
    next: (ctx) =>
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(ctx.email ?? "")
        ? "emailAccepted"
        : "emailRetry",
  },
  {
    id: "emailRetry",
    message: "Hmm... esse e-mail parece inválido. Pode tentar novamente?",
    next: "askEmail",
  },
  {
    id: "emailAccepted",
    message: "Perfeito! 📩",
    next: "askWhatsapp",
  },
  {
    id: "askWhatsapp",
    message: "Agora me passa o número do seu WhatsApp (com DDD)?",
    input: "whatsapp",
    next: (ctx) =>
      /^\d{10,13}$/.test(ctx.whatsapp?.replace(/\D/g, "") ?? "")
        ? "whatsappAccepted"
        : "whatsappRetry",
  },
  {
    id: "whatsappRetry",
    message:
      "Ops! Esse número parece incompleto. Pode me mandar novamente, incluindo o DDD?",
    next: "askWhatsapp",
  },
  {
    id: "whatsappAccepted",
    message: "Show! 📱",
    next: "askWebsite",
  },
  {
    id: "askWebsite",
    message: "Qual é o link do site da sua loja? 🌐",
    input: "website",
    next: (ctx) =>
      ctx.website?.includes(".") && ctx.website?.length > 6
        ? "websiteAccepted"
        : "websiteRetry",
  },
  {
    id: "websiteRetry",
    message:
      "Hmm... esse link parece estranho. Pode enviar o endereço completo? (ex: https://minhaloja.com)",
    next: "askWebsite",
  },
  {
    id: "websiteAccepted",
    message: "Perfeito, obrigado! 🙌",
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
      "Outro",
    ],
    next: "confirmPlatform",
  },
  {
    id: "confirmPlatform",
    message: (ctx) =>
      ctx.platform === "Outro"
        ? `Sem problema, ${ctx.name}! Fazemos integração manual também. 🔧`
        : `Perfeito, ${ctx.name}! Temos instalação rápida na plataforma ${ctx.platform} ✅`,
    next: "askGoal",
  },
  {
    id: "askGoal",
    message: "Qual é o seu principal objetivo agora?",
    input: "goal",
    options: [
      "Testar o sistema primeiro",
      "Instalar agora ⚡",
      "Falar com suporte humano",
    ],
    next: "confirmGoal",
  },
  {
    id: "confirmGoal",
    message: (ctx) =>
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
      "Em alguns segundos, alguém da equipe vai te chamar no WhatsApp.",
    ],
    end: true,
  },
];


// 💬 Componente principal
export default function Chat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [ctx, setCtx] = useState<Ctx>({});
  const [currentStep, setCurrentStep] = useState<string>("welcome");
  const [typing, setTyping] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const containerRef = useRef<HTMLDivElement | null>(null);
  const startedRef = useRef(false);

  const resolveNext = (next?: NextType, newCtx = ctx) =>
    typeof next === "function" ? next(newCtx) : next;

  const pushMessage = (m: Message) =>
    setMessages((prev) => [...prev, m]);

  const sendMessagesSequence = async (msgs: string[]) => {
    for (const msg of msgs) {
      setTyping(true);
      const delay = Math.min(900 + msg.length * 6, 1400);
      await new Promise((r) => setTimeout(r, delay));
      pushMessage({ from: "bot", text: msg });
      setTyping(false);
      await new Promise((r) => setTimeout(r, 180));
    }
  };

  const runStep = async (stepId: string, context = ctx) => {
    const step = flow.find((s) => s.id === stepId);
    if (!step) return;

    // envia mensagens (únicas ou múltiplas)
    if (step.messages) {
      await sendMessagesSequence(step.messages);
    } else if (step.message) {
      setTyping(true);
      const text =
        typeof step.message === "function"
          ? step.message(context)
          : step.message;
      const delay = Math.min(900 + text.length * 6, 1400);
      await new Promise((r) => setTimeout(r, delay));
      pushMessage({ from: "bot", text });
      setTyping(false);
    }

    // avança automaticamente apenas se não precisa de input
    if (!step.input && !step.end && step.next && !isTransitioning) {
      const next = resolveNext(step.next, context);
      if (next && next !== step.id) {
        setIsTransitioning(true);
        setTimeout(() => {
          setIsTransitioning(false);
          setCurrentStep(next);
          runStep(next, context);
        }, 500);
      }
    }
  };

  const handleSend = () => {
    const step = flow.find((s) => s.id === currentStep);
    if (!step || !input.trim()) return;

    const value = input.trim();
    pushMessage({ from: "user", text: value });
    setInput("");

    const newCtx = step.input ? { ...ctx, [step.input]: value } : ctx;
    setCtx(newCtx);

    const next = resolveNext(step.next, newCtx);
    if (next && next !== currentStep && !isTransitioning) {
      setIsTransitioning(true);
      setCurrentStep(next);
      setTimeout(() => {
        setIsTransitioning(false);
        runStep(next, newCtx);
      }, 350);
    }
  };

  const handleOption = (opt: string) => {
    const step = flow.find((s) => s.id === currentStep);
    if (!step) return;

    pushMessage({ from: "user", text: opt });
    const newCtx = step.input ? { ...ctx, [step.input]: opt } : ctx;
    setCtx(newCtx);

    const next = resolveNext(step.next, newCtx);
    if (next && !isTransitioning) {
      setIsTransitioning(true);
      setCurrentStep(next);
      setTimeout(() => {
        setIsTransitioning(false);
        runStep(next, newCtx);
      }, 350);
    }
  };

  useEffect(() => {
    if (!startedRef.current) {
      startedRef.current = true;
      setTimeout(() => runStep("welcome"), 300);
    }
  }, []);

  useEffect(() => {
    containerRef.current?.scrollTo({
      top: containerRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages, typing]);

  const step = flow.find((s) => s.id === currentStep);

return (
  <div
    style={{
      width: "100vw",
      height: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      backgroundImage: `url("/fundo.png")`,
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
      padding: "16px",
      position: "relative",
      overflow: "hidden",
      fontFamily: "Inter, sans-serif",
    }}
  >
    {/* Overlay translúcido */}
    <div
      style={{
        position: "absolute",
        inset: 0,
        background: "rgba(255,255,255,0.35)",
        backdropFilter: "blur(6px)",
        zIndex: 0,
      }}
    />

    <div
      style={{
        width: "100%",
        maxWidth: 800,
        height: "90vh",
        maxHeight: 680,
        background: "#fff",
        borderRadius: 20,
        display: "flex",
        flexDirection: "column",
        padding: "22px",
        boxShadow: "0 10px 40px rgba(0,0,0,0.08)",
        border: "1px solid rgba(0,0,0,0.04)",
        zIndex: 1,
        overflow: "hidden",
      }}
    >
      {/* Mensagens */}
      <div
        ref={containerRef}
        style={{
          flex: 1,
          overflowY: "auto",
          display: "flex",
          flexDirection: "column",
          gap: 14,
          paddingRight: 6,
          scrollBehavior: "smooth",
        }}
      >
        {messages.map((m, i) => (
          <div
            key={i}
            style={{
              display: "flex",
              alignItems: "flex-start",
              gap: 10,
              alignSelf: m.from === "bot" ? "flex-start" : "flex-end",
              maxWidth: "85%",
              animation: "slideUp .35s ease",
            }}
          >
            {m.from === "bot" && (
              <img
                src="/foto.png"
                style={{
                  width: 34,
                  height: 34,
                  borderRadius: "50%",
                  flexShrink: 0,
                }}
              />
            )}
            <div
              style={{
                background: m.from === "bot" ? "#F7F7FA" : "#3D7BFF",
                color: m.from === "bot" ? "#1C1C1E" : "#fff",
                padding: "12px 16px",
                borderRadius: 18,
                fontSize: "clamp(15px, 3vw, 17px)",
                lineHeight: "1.5",
                boxShadow:
                  m.from === "user"
                    ? "0 4px 14px rgba(61,123,255,0.26)"
                    : "none",
                wordBreak: "break-word",
              }}
            >
              {m.text}
            </div>
          </div>
        ))}

        {typing && (
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <img
              src="/foto.png"
              style={{ width: 30, height: 30, borderRadius: "50%" }}
            />
            <div
              style={{
                background: "#F8F8FA",
                padding: "8px 12px",
                borderRadius: 12,
                display: "flex",
                gap: 5,
              }}
            >
              <span className="dot" />
              <span className="dot" />
              <span className="dot" />
            </div>
          </div>
        )}
      </div>

      {/* Input / Botões */}
      <div style={{ marginTop: 10 }}>
        {step?.options && !typing ? (
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: 10,
              justifyContent: "center",
            }}
          >
            {step.options.map((opt) => (
              <button
                key={opt}
                onClick={() => handleOption(opt)}
                style={{
                  padding: "12px 18px",
                  background: "#fff",
                  border: "1px solid #D9D9DD",
                  borderRadius: 14,
                  cursor: "pointer",
                  fontSize: "clamp(15px, 3vw, 17px)",
                  transition: "0.25s",
                  fontWeight: 500,
                }}
              >
                {opt}
              </button>
            ))}
          </div>
        ) : (
          <div
            style={{
              display: "flex",
              gap: 8,
              alignItems: "center",
              width: "100%",
            }}
          >
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              placeholder="Digite sua resposta..."
              inputMode="text"
              style={{
                flex: 1,
                padding: "14px 16px",
                borderRadius: 14,
                border: "1px solid #ddd",
                fontSize: "16px", // 👈 evita zoom no mobile
                outline: "none",
                fontWeight: 500,
              }}
            />
            <button
              onClick={handleSend}
              style={{
                background: "#3D7BFF",
                color: "#fff",
                padding: "12px 22px",
                borderRadius: 14,
                border: "none",
                cursor: "pointer",
                fontSize: "clamp(15px, 3vw, 17px)",
                fontWeight: 600,
                boxShadow: "0 6px 14px rgba(61,123,255,0.26)",
                transition: "0.25s",
              }}
            >
              Enviar
            </button>
          </div>
        )}
      </div>

      <style>
        {`
          .dot {
            width: 7px;
            height: 7px;
            background: #999;
            border-radius: 50%;
            animation: typing 1s infinite;
          }
          .dot:nth-child(2) { animation-delay: 0.2s; }
          .dot:nth-child(3) { animation-delay: 0.4s; }

          @keyframes typing { 
            0%, 80%, 100% {opacity: .3;} 
            40% {opacity: 1;} 
          }

          @keyframes slideUp { 
            from { transform: translateY(8px); opacity: 0; }
            to { transform: translateY(0); opacity: 1; }
          }

          @media (max-width: 600px) {
            div[style*="maxWidth: 800px"] {
              height: 92vh !important;
              padding: 16px !important;
              border-radius: 16px !important;
            }
            button {
              font-size: 16px !important;
            }
            input {
              font-size: 16px !important; /* 👈 garante sem zoom */
            }
          }
        `}
      </style>
    </div>
  </div>
);


}

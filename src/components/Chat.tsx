import { useState, useEffect, useRef } from "react";

// 🧠 Contexto do fluxo
interface Ctx {
  name?: string;
  email?: string;
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
        background: "#F3F5F9",
        padding: 20,
      }}
    >
      <div
        style={{
          width: "80vw",           // 🟢 alterado de 90vw → 80vw
          maxWidth: 800,           // 🟢 aumentado proporcionalmente
          height: "60vh",          // 🟢 alterado de 80vh → 60vh
          background: "#fff",
          borderRadius: 26,
          display: "flex",
          flexDirection: "column",
          padding: "28px 30px",
          boxShadow: "0 18px 60px rgba(0,0,0,0.08)",
          border: "1px solid rgba(0,0,0,0.04)",
          fontFamily: "Inter, sans-serif",
        }}
      >
        {/* Área de mensagens */}
        <div
          ref={containerRef}
          style={{
            flex: 1,
            overflowY: "auto",
            display: "flex",
            flexDirection: "column",
            gap: 14,
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
                maxWidth: "75%",
                animation: "slideUp .35s ease",
              }}
            >
              {m.from === "bot" && (
                <img
                  src="https://i.ibb.co/ft5hyvN/avatar-bot.png"
                  style={{ width: 34, height: 34, borderRadius: "50%" }}
                />
              )}
              <div
                style={{
                  background: m.from === "bot" ? "#F8F8FA" : "#3D7BFF",
                  color: m.from === "bot" ? "#1C1C1E" : "#fff",
                  padding: "12px 16px",
                  borderRadius: 18,
                  fontSize: 15,
                  lineHeight: "1.45",
                  boxShadow:
                    m.from === "user"
                      ? "0 4px 14px rgba(61,123,255,0.26)"
                      : "none",
                }}
              >
                {m.text}
              </div>
            </div>
          ))}

          {typing && (
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <img
                src="https://i.ibb.co/ft5hyvN/avatar-bot.png"
                style={{ width: 32, height: 32, borderRadius: "50%" }}
              />
              <div
                style={{
                  background: "#F8F8FA",
                  padding: "10px 14px",
                  borderRadius: 14,
                  display: "flex",
                  gap: 4,
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
        <div style={{ marginTop: 8 }}>
          {step?.options && !typing ? (
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              {step.options.map((opt) => (
                <button
                  key={opt}
                  onClick={() => handleOption(opt)}
                  style={{
                    padding: "12px 16px",
                    background: "#fff",
                    border: "1px solid #D9D9DD",
                    borderRadius: 14,
                    cursor: "pointer",
                    fontSize: 15,
                    transition: ".25s",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.borderColor = "#3D7BFF")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.borderColor = "#D9D9DD")
                  }
                >
                  {opt}
                </button>
              ))}
            </div>
          ) : (
            <div style={{ display: "flex", gap: 8 }}>
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                placeholder="Digite sua resposta..."
                style={{
                  flex: 1,
                  padding: 12,
                  borderRadius: 14,
                  border: "1px solid #ddd",
                  fontSize: 15,
                }}
              />
              <button
                onClick={handleSend}
                style={{
                  background: "#3D7BFF",
                  color: "#fff",
                  padding: "0 22px",
                  borderRadius: 14,
                  border: "none",
                  cursor: "pointer",
                  fontSize: 15,
                  boxShadow: "0 6px 14px rgba(61,123,255,0.26)",
                  transition: ".25s",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.transform = "translateY(-1px)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.transform = "translateY(0)")
                }
              >
                Enviar
              </button>
            </div>
          )}
        </div>

        <style>
          {`
            .dot {
              width: 6px;
              height: 6px;
              background: #999;
              border-radius: 50%;
              animation: typing 1s infinite;
            }
            .dot:nth-child(2) { animation-delay: 0.2s; }
            .dot:nth-child(3) { animation-delay: 0.4s; }

            @keyframes typing { 0%, 80%, 100% {opacity: .3;} 40% {opacity: 1;} }

            @keyframes slideUp { 
              from { transform: translateY(8px); opacity: 0; }
              to { transform: translateY(0); opacity: 1; }
            }
          `}
        </style>
      </div>
    </div>
  );
}

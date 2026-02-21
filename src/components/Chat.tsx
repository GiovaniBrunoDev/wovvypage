import { useState, useEffect, useRef, useCallback } from "react";

/* -------------------- TIPAGENS -------------------- */

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

/* -------------------- FLOW -------------------- */

export const flow: Step[] = [
  { id: "welcome", message: "Olá! 👋 Sou o Giovani, fundador da Wovvy. Por aqui, você vai receber as instruções de instalação pro seu e-commerce.", next: "askName" },
  { id: "askName", message: "Antes de começarmos, como você se chama?", input: "name", next: "greetUser" },
  { id: "greetUser", message: (ctx: Ctx) => `Ótimo, ${ctx.name}! Para iniciarmos, preciso de algumas informações rápidas, ok?`, next: "askEmail" },
  { id: "askEmail", message: "Qual é o seu e-mail profissional?", input: "email", next: (ctx) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(ctx.email ?? "") ? "emailAccepted" : "emailRetry" },
  { id: "emailRetry", message: "Hmm... esse e-mail parece inválido. Pode tentar novamente?", next: "askEmail" },
  { id: "emailAccepted", message: "Perfeito! 📩", next: "askWhatsapp" },
  { id: "askWhatsapp", message: "Agora me passa o número do seu WhatsApp (com DDD)?", input: "whatsapp", next: (ctx) => /^\d{10,13}$/.test(ctx.whatsapp?.replace(/\D/g, "") ?? "") ? "whatsappAccepted" : "whatsappRetry" },
  { id: "whatsappRetry", message: "Ops! Esse número parece incompleto. Pode me mandar novamente, incluindo o DDD?", next: "askWhatsapp" },
  { id: "whatsappAccepted", message: "Show! 📱", next: "askWebsite" },
  { id: "askWebsite", message: "Qual é o link do site da sua loja? 🌐", input: "website", next: (ctx) => (ctx.website?.includes(".") && ctx.website?.length > 6 ? "websiteAccepted" : "websiteRetry") },
  { id: "websiteRetry", message: "Hmm... esse link é inválido. Pode enviar o endereço completo? (ex: https://minhaloja.com)", next: "askWebsite" },
  { id: "websiteAccepted", message: "Perfeito, obrigado! 🙌", next: "askPlatform" },
  { id: "askPlatform", message: "Em qual plataforma sua loja está?", input: "platform", options: ["Shopify", "Nuvemshop", "Loja Integrada", "Tray", "WooCommerce", "Outro"], next: "confirmPlatform" },
  { id: "confirmPlatform", message: (ctx) => ctx.platform === "Outro" ? `Sem problema, ${ctx.name}! Fazemos integração manual também. 🔧` : `Perfeito, ${ctx.name}! Temos instalação rápida na plataforma ${ctx.platform} ✅`, next: "askGoal" },
  { id: "askGoal", message: "Qual é o seu principal objetivo agora?", input: "goal", options: ["Testar o sistema primeiro", "Instalar agora ⚡", "Falar com suporte humano"], next: "confirmGoal" },
  { id: "confirmGoal", message: (ctx) => ctx.goal === "Testar o sistema primeiro" ? `Show! Vamos te ajudar a testar rapidinho 😄` : ctx.goal === "Instalar agora ⚡" ? `Perfeito! Vamos acelerar sua instalação 🚀` : `Beleza! Já vou chamar alguém da equipe 💬`, next: "end" },
  { id: "end", messages: ["Em alguns segundos, alguém da equipe vai te chamar no WhatsApp."], end: true },
];

/* -------------------- COMPONENTE -------------------- */

export default function Chat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [ctx, setCtx] = useState<Ctx>({});
  const [currentStep, setCurrentStep] = useState("welcome");
  const [typing, setTyping] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const avatarRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | null>(null);
  const startedRef = useRef(false);

  const targetY = useRef<number>(0);
  const currentY = useRef<number>(0);


  const resolveNext = useCallback(
    (next?: NextType, newCtx = ctx) =>
      typeof next === "function" ? next(newCtx) : next,
    [ctx]
  );

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

  const runStep = useCallback(
    async (stepId: string, context: Ctx) => {
      const step = flow.find((s) => s.id === stepId);
      if (!step) return;

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

      if (!step.input && !step.end && step.next) {
        const next = resolveNext(step.next, context);
        if (next) setCurrentStep(next);
      }
    },
    [resolveNext]
  );

  const handleSend = () => {
    const step = flow.find((s) => s.id === currentStep);
    if (!step || !input.trim()) return;

    const value = input.trim();
    pushMessage({ from: "user", text: value });
    setInput("");

    const newCtx = step.input ? { ...ctx, [step.input]: value } : ctx;
    setCtx(newCtx);

    const next = resolveNext(step.next, newCtx);
    if (next) setCurrentStep(next);
  };

  const handleOption = (opt: string) => {
    const step = flow.find((s) => s.id === currentStep);
    if (!step) return;

    pushMessage({ from: "user", text: opt });

    const newCtx = step.input ? { ...ctx, [step.input]: opt } : ctx;
    setCtx(newCtx);

    const next = resolveNext(step.next, newCtx);
    if (next) setCurrentStep(next);
  };

  useEffect(() => {
    if (!startedRef.current) {
      startedRef.current = true;
      runStep("welcome", {});
    }
  }, [runStep]);

  useEffect(() => {
    const step = flow.find((s) => s.id === currentStep);
    if (step && currentStep !== "welcome") {
      runStep(currentStep, ctx);
    }
  }, [currentStep]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
  }, [messages, typing]);

  /* -------------------- AVATAR ENGINE ESTÁVEL -------------------- */

  const updateTarget = useCallback(() => {
    const container = containerRef.current;
    const avatar = avatarRef.current;
    if (!container || !avatar) return;

    const botMsgs =
      container.querySelectorAll<HTMLElement>(".bot-msg");
    if (!botMsgs.length) return;

    const last = botMsgs[botMsgs.length - 1];

    // posição RELATIVA ao container
    const center =
      last.offsetTop +
      last.offsetHeight / 2;

    const avatarHalf = avatar.offsetHeight / 2;

    let computed = center - avatarHalf;

    computed = Math.max(
      8,
      Math.min(
        computed,
        container.scrollHeight - avatar.offsetHeight - 8
      )
    );

    targetY.current = computed;
  }, []);

  useEffect(() => {
    const avatar = avatarRef.current;
    const container = containerRef.current;
    if (!avatar || !container) return;

    const animate = () => {
      const diff = targetY.current - currentY.current;
      currentY.current += diff * 0.18;
      avatar.style.transform = `translateY(${currentY.current}px)`;
      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);
    container.addEventListener("scroll", updateTarget, {
      passive: true,
    });
    window.addEventListener("resize", updateTarget);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      container.removeEventListener("scroll", updateTarget);
      window.removeEventListener("resize", updateTarget);
    };
  }, [updateTarget]);

  useEffect(() => {
    updateTarget();
  }, [messages, typing]);

  const step = flow.find((s) => s.id === currentStep);

  return (
    <div
      style={{
        width: "100vw",
        height: "100dvh",
        display: "flex",
        alignItems: "stretch",
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
      {/* Overlay blur */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "rgba(255,255,255,0.35)",
          backdropFilter: "blur(6px)",
          zIndex: 0,
        }}
      />

      {/* ===== CHAT CARD ===== */}
      <div className="chat-card">
        {/* Área das mensagens */}
        <div
          ref={containerRef}
          style={{
            flex: 1,
            overflowY: "auto",
            display: "flex",
            flexDirection: "column",
            gap: 16,
            paddingRight: 6,
            paddingBottom: 40, // 👈 ESSA é a chave
            scrollBehavior: "smooth",
            position: "relative",
          }}
        >
          {/* Avatar flutuante */}
          <div
            ref={avatarRef}
            style={{
              position: "absolute",
              left: 8,
              top: 0,
              transform: "translateY(0px)",
              zIndex: 2,
              width: 56,
              height: 56,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              pointerEvents: "none",
            }}
          >
            <img
              src="/foto.png"
              alt="Bot"
              style={{
                width: 48,
                height: 48,
                borderRadius: "50%",
                boxShadow: "0 4px 12px rgba(0,0,0,0.12)",
                border: "2px solid #fff",
                background: "#fff",
              }}
            />
          </div>

          {/* Mensagens */}
          {messages.map((m, i) => (
            <div
              key={i}
              className={m.from === "bot" ? "bot-msg" : ""}
              style={{
                display: "flex",
                justifyContent:
                  m.from === "bot" ? "flex-start" : "flex-end",
                animation: "fadeSlide 0.45s ease",
              }}
            >
              <div
                style={{
                  background:
                    m.from === "bot" ? "#F7F7FA" : "#3D7BFF",
                  color:
                    m.from === "bot" ? "#1C1C1E" : "#fff",
                  padding: "12px 16px",
                  borderRadius: 18,
                  fontSize: "clamp(15px, 3vw, 17px)",
                  lineHeight: "1.5",
                  wordBreak: "break-word",
                  maxWidth: "80%",
                  marginLeft:
                    m.from === "bot" ? "72px" : "0",
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

          {/* Digitando */}
          {typing && (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                marginLeft: 72,
                animation: "fadeSlide 0.45s ease",
              }}
            >
              <div className="typing-box">
                <span className="dot" />
                <span className="dot" />
                <span className="dot" />
              </div>
            </div>
          )}
        </div>

        {/* ===== INPUT / OPÇÕES ===== */}
        <div style={{ marginTop: 30 }}>
          {step?.options && !typing ? (
            <div className="options">
              {step.options.map((opt) => (
                <button
                  key={opt}
                  onClick={() => handleOption(opt)}
                >
                  {opt}
                </button>
              ))}
            </div>
          ) : (
            <div className="input-row">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) =>
                  e.key === "Enter" && handleSend()
                }
                placeholder="Digite sua resposta..."
              />
              <button onClick={handleSend}>
                Enviar
              </button>
            </div>
          )}
        </div>
      </div>

      {/* ===== CSS ===== */}
      <style>{`
     .chat-card {
  width: 100%;
  max-width: 1300px;     /* mais largo */
  height: 90dvh;        /* ocupa quase tudo */
  background: #fff;
  border-radius: 24px;
  display: flex;
  flex-direction: column;
  padding: 28px;
  box-shadow: 0 20px 60px rgba(0,0,0,0.08);
  border: 1px solid rgba(0,0,0,0.04);
  position: relative;
  overflow: hidden;
  z-index: 1;
}

      .typing-box {
        background: #F8F8FA;
        padding: 8px 12px;
        border-radius: 12px;
        display: flex;
        gap: 5px;
      }

      .dot {
        width: 7px;
        height: 7px;
        background: #999;
        border-radius: 50%;
        animation: typing 1s infinite;
      }

      .dot:nth-child(2) { animation-delay: .2s; }
      .dot:nth-child(3) { animation-delay: .4s; }

      @keyframes typing {
        0%,80%,100% {opacity:.3;}
        40% {opacity:1;}
      }

      @keyframes fadeSlide {
        from { opacity: 0; transform: translateY(8px); }
        to { opacity: 1; transform: translateY(0); }
      }

      .options {
        display: flex;
        flex-wrap: wrap;
        gap: 10px;
        justify-content: center;
      }

      .options button {
        padding: 12px 18px;
        background: #fff;
        border: 1px solid #D9D9DD;
        border-radius: 14px;
        cursor: pointer;
        font-size: clamp(15px, 3vw, 17px);
        font-weight: 500;
        transition: 0.25s;
      }

      .input-row {
        display: flex;
        gap: 8px;
        align-items: center;
        width: 100%;
      }

      .input-row input {
        flex: 1;
        padding: 14px 16px;
        border-radius: 14px;
        border: 1px solid #ddd;
        font-size: 16px;
        outline: none;
        font-weight: 500;
      }

      .input-row button {
        background: #3D7BFF;
        color: #fff;
        padding: 12px 22px;
        border-radius: 14px;
        border: none;
        cursor: pointer;
        font-weight: 600;
        box-shadow: 0 6px 14px rgba(61,123,255,0.26);
        transition: 0.25s;
      }

      /* MOBILE */
      @media (max-width: 600px) {
  .chat-card {
    height: 94dvh;
          max-height: none;
          border-radius: 0;
          padding: 16px;
        }

        .options button,
        .input-row input {
          font-size: 16px;
        }
      }
    `}</style>
    </div>
  );
}
import { FiMail, FiPhone } from "react-icons/fi";


export default function SectionContato() {
    return (
        <>
            {/* Contato */}
            <section id="contato" className="w-full py-28 bg-[#0A0A0D] text-white relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0D] via-transparent to-[#0A0A0D]/60"></div>

                <div className="max-w-6xl mx-auto px-6 lg:px-8 relative z-10">
                    <div className="grid md:grid-cols-2 gap-20 items-center">

                        {/* Texto */}
                        <div>
                            <h2 className="text-5xl md:text-6xl font-extrabold mb-6 leading-tight">
                                Vamos conversar sobre o futuro <br />
                                <span className="bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">da sua loja</span>
                            </h2>

                            <p className="text-lg text-gray-400 mb-12 leading-relaxed max-w-md">
                                Nossa equipe está pronta para ajudar você a transformar sua loja em uma máquina de conversão com vídeos interativos e experiência imersiva.
                            </p>

                            <div className="space-y-6">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-2xl bg-blue-500/10 text-blue-400 flex items-center justify-center">
                                        <FiMail size={22} />
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500">Email</p>
                                        <p className="font-medium text-white">contato@wovvy.com</p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-2xl bg-blue-500/10 text-blue-400 flex items-center justify-center">
                                        <FiPhone size={22} />
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500">Telefone</p>
                                        <p className="font-medium text-white">+55 (11) 99999-9999</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Formulário */}
                        <form className="space-y-6 bg-[#111118]/80 p-10 rounded-3xl border border-white/5 shadow-lg shadow-blue-500/5 backdrop-blur-md">
                            <div className="grid md:grid-cols-2 gap-6">
                                <input
                                    type="text"
                                    placeholder="Nome"
                                    className="w-full px-4 py-3 rounded-xl bg-[#16161D] text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/60 transition"
                                />
                                <input
                                    type="email"
                                    placeholder="Email"
                                    className="w-full px-4 py-3 rounded-xl bg-[#16161D] text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/60 transition"
                                />
                            </div>
                            <input
                                type="text"
                                placeholder="Assunto"
                                className="w-full px-4 py-3 rounded-xl bg-[#16161D] text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/60 transition"
                            />
                            <textarea
                                placeholder="Sua mensagem"
                                className="w-full h-32 px-4 py-3 rounded-xl bg-[#16161D] text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/60 transition resize-none"
                            ></textarea>
                            <button
                                type="submit"
                                className="w-full bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 transition-all text-white font-semibold py-3 rounded-xl shadow-lg shadow-blue-500/20"
                            >
                                Enviar mensagem
                            </button>
                        </form>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="w-full py-20 bg-[#09090B] text-gray-400 border-t border-white/5">
                <div className="max-w-6xl mx-auto px-6 lg:px-8">
                    <div className="grid md:grid-cols-4 gap-12 mb-14">
                        <div>
                            <img src="/wovvy-logo-white.png" alt="Wovvy" className="h-8 mb-6 opacity-90" />
                            <p className="text-gray-500 text-sm leading-relaxed">
                                Criamos experiências que encantam e convertem.
                            </p>
                        </div>

                        <div>
                            <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wide">Produto</h3>
                            <ul className="space-y-2 text-sm">
                                <li><a href="#recursos" className="hover:text-blue-400 transition">Recursos</a></li>
                                <li><a href="#planos" className="hover:text-blue-400 transition">Planos</a></li>
                                <li><a href="#cases" className="hover:text-blue-400 transition">Cases</a></li>
                            </ul>
                        </div>

                        <div>
                            <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wide">Empresa</h3>
                            <ul className="space-y-2 text-sm">
                                <li><a href="/sobre" className="hover:text-blue-400 transition">Sobre</a></li>
                                <li><a href="/blog" className="hover:text-blue-400 transition">Blog</a></li>
                                <li><a href="/carreiras" className="hover:text-blue-400 transition">Carreiras</a></li>
                            </ul>
                        </div>

                        <div>
                            <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wide">Legal</h3>
                            <ul className="space-y-2 text-sm">
                                <li><a href="/privacidade" className="hover:text-blue-400 transition">Privacidade</a></li>
                                <li><a href="/termos" className="hover:text-blue-400 transition">Termos</a></li>
                            </ul>
                        </div>
                    </div>

                    <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center text-sm">
                        <p className="text-gray-500">
                            © {new Date().getFullYear()} Wovvy. Todos os direitos reservados.
                        </p>
                        <div className="flex gap-6 mt-4 md:mt-0">
                            <a href="https://twitter.com/wovvy" className="hover:text-blue-400 transition">Twitter</a>
                            <a href="https://linkedin.com/company/wovvy" className="hover:text-blue-400 transition">LinkedIn</a>
                            <a href="https://instagram.com/wovvy" className="hover:text-blue-400 transition">Instagram</a>
                        </div>
                    </div>
                </div>
            </footer>

        </>
    );
}

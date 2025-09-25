"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
    Building2,
    Send,
    Bot,
    User,
    FileText,
    Shield,
    AlertCircle,
    CheckCircle,
    Lightbulb,
    BookOpen,
    Search,
    Mic,
    Copy,
    ThumbsUp,
    ThumbsDown,
    ArrowLeft,
} from "lucide-react"

interface Message {
    id: number
    type: "user" | "assistant"
    content: string
    timestamp: string
    category?: string
    references?: string[]
}

interface AssistentePageProps {
    onLogout: () => void;
    userEmail?: string;
    onPageChange: (page: string) => void;
}

export default function AssistentePage({ onLogout, userEmail, onPageChange }: AssistentePageProps) {
    const [messages, setMessages] = useState<Message[]>([
        {
            id: 1,
            type: "assistant",
            content:
                "Olá! Sou o assistente de IA do GAM. Posso ajudá-lo com questões sobre conformidade, interpretação de leis, análise de documentos e muito mais. Como posso ajudá-lo hoje?",
            timestamp: "09:00",
            category: "greeting",
        },
        {
            id: 2,
            type: "user",
            content:
                "Preciso de um parecer sobre uma licitação de materiais de limpeza no valor de R$ 25.000,00. Quais são os procedimentos necessários?",
            timestamp: "09:05",
        },
        {
            id: 3,
            type: "assistant",
            content:
                'Para uma licitação de materiais de limpeza no valor de R$ 25.000,00, você deve seguir os seguintes procedimentos:\n\n**Modalidade:** Convite (valor entre R$ 8.000,00 e R$ 80.000,00 para compras)\n\n**Procedimentos obrigatórios:**\n1. Elaboração do termo de referência\n2. Pesquisa de preços (mínimo 3 fornecedores)\n3. Justificativa da necessidade\n4. Disponibilidade orçamentária\n5. Convite a pelo menos 3 fornecedores\n\n**Base legal:** Lei 8.666/93, Art. 23, II, "a"\n\n**Prazo mínimo:** 5 dias úteis entre o convite e a abertura\n\nDeseja que eu gere um parecer técnico completo sobre este processo?',
            timestamp: "09:06",
            category: "legal-advice",
            references: ["Lei 8.666/93 Art. 23", "TCM Resolução 02/2023"],
        },
    ])

    const [inputMessage, setInputMessage] = useState("")
    const [isTyping, setIsTyping] = useState(false)

    const quickQuestions = [
        {
            icon: Shield,
            title: "Conformidade LRF",
            question: "Como verificar se estou dentro dos limites da Lei de Responsabilidade Fiscal?",
        },
        {
            icon: FileText,
            title: "Documentação",
            question: "Quais documentos são obrigatórios para um processo de pagamento?",
        },
        {
            icon: AlertCircle,
            title: "Irregularidades",
            question: "Como proceder quando identifico uma irregularidade em auditoria?",
        },
        {
            icon: BookOpen,
            title: "Legislação",
            question: "Qual a diferença entre empenho, liquidação e pagamento?",
        },
    ]

    const handleSendMessage = () => {
        if (!inputMessage.trim()) return

        const newUserMessage: Message = {
            id: messages.length + 1,
            type: "user",
            content: inputMessage,
            timestamp: new Date().toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" }),
        }

        setMessages((prev) => [...prev, newUserMessage])
        setInputMessage("")
        setIsTyping(true)

        // Simulate AI response
        setTimeout(() => {
            const aiResponse: Message = {
                id: messages.length + 2,
                type: "assistant",
                content:
                    "Entendi sua pergunta. Deixe-me analisar e fornecer uma resposta detalhada baseada na legislação vigente e nas melhores práticas da administração pública...",
                timestamp: new Date().toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" }),
                category: "analysis",
            }
            setMessages((prev) => [...prev, aiResponse])
            setIsTyping(false)
        }, 2000)
    }

    const handleQuickQuestion = (question: string) => {
        setInputMessage(question)
    }

    return (
        <div className="dashboard">
            {/* Sidebar */}
            <nav className="sidebar">
                <div className="sidebar-header">
                    <div className="logo">
                        <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                        </svg>
                        <div>
                            <h1>GAM</h1>
                            <p>Gestão Municipal</p>
                        </div>
                    </div>
                </div>

                <div className="sidebar-nav">
                    <ul className="nav-list">
                        <li>
                            <button
                                className="nav-item"
                                onClick={() => onPageChange('dashboard')}
                            >
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z" />
                                </svg>
                                Dashboard
                            </button>
                        </li>
                        <li>
                            <button
                                className="nav-item"
                                onClick={() => onPageChange('documentos')}
                            >
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z" />
                                </svg>
                                Documentos
                            </button>
                        </li>
                        <li>
                            <button
                                className="nav-item"
                                onClick={() => onPageChange('auditorias')}
                            >
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z" />
                                </svg>
                                Auditorias
                            </button>
                        </li>
                        <li>
                            <button className="nav-item active">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M20 2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h4l4 4 4-4h4c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-2 12H6v-2h12v2zm0-3H6V9h12v2zm0-3H6V6h12v2z" />
                                </svg>
                                Assistente IA
                            </button>
                        </li>
                        <li>
                            <button
                                className="nav-item"
                                onClick={() => onPageChange('conformidade')}
                            >
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M12,1L3,5V11C3,16.55 6.84,21.74 12,23C17.16,21.74 21,16.55 21,11V5L12,1M12,7C13.4,7 14.8,8.6 14.8,10V11H16V16H8V11H9.2V10C9.2,8.6 10.6,7 12,7M12,8.2C11.2,8.2 10.4,8.7 10.4,10V11H13.6V10C13.6,8.7 12.8,8.2 12,8.2Z" />
                                </svg>
                                Conformidade
                            </button>
                        </li>
                        <li>
                            <button
                                className="nav-item"
                                onClick={() => onPageChange('configuracoes')}
                            >
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M19.14,12.94c0.04-0.3,0.06-0.61,0.06-0.94c0-0.32-0.02-0.64-0.07-0.94l2.03-1.58c0.18-0.14,0.23-0.41,0.12-0.61 l-1.92-3.32c-0.12-0.22-0.37-0.29-0.59-0.22l-2.39,0.96c-0.5-0.38-1.03-0.7-1.62-0.94L14.4,2.81c-0.04-0.24-0.24-0.41-0.48-0.41 h-3.84c-0.24,0-0.43,0.17-0.47,0.41L9.25,5.35C8.66,5.59,8.12,5.92,7.63,6.29L5.24,5.33c-0.22-0.08-0.47,0-0.59,0.22L2.74,8.87 C2.62,9.08,2.66,9.34,2.86,9.48l2.03,1.58C4.84,11.36,4.82,11.69,4.82,12s0.02,0.64,0.07,0.94l-2.03,1.58 c-0.18,0.14-0.23,0.41-0.12,0.61l1.92,3.32c0.12,0.22,0.37,0.29,0.59,0.22l2.39-0.96c0.5,0.38,1.03,0.7,1.62,0.94l0.36,2.54 c0.05,0.24,0.24,0.41,0.48,0.41h3.84c0.24,0,0.44-0.17,0.47-0.41l0.36-2.54c0.59-0.24,1.13-0.56,1.62-0.94l2.39,0.96 c0.22,0.08,0.47,0,0.59-0.22l1.92-3.32c0.12-0.22,0.07-0.47-0.12-0.61L19.14,12.94z M12,15.6c-1.98,0-3.6-1.62-3.6-3.6 s1.62-3.6,3.6-3.6s3.6,1.62,3.6,3.6S13.98,15.6,12,15.6z" />
                                </svg>
                                Configurações
                            </button>
                        </li>
                    </ul>
                </div>
            </nav>

            {/* Main Content */}
            <main className="main-content">
                {/* Header */}
                <header className="main-header">
                    <div className="header-content">
                        <div className="header-title">
                            <h1>Assistente IA</h1>
                            <p>Prefeitura de São Paulo - SP</p>
                        </div>
                        <div className="header-buttons">
                            <button className="status-btn active">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                                </svg>
                                Sistema Ativo
                            </button>
                            <button className="whatsapp-btn">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488" />
                                </svg>
                                WhatsApp
                            </button>
                        </div>
                    </div>
                </header>

                <div className="container mx-auto px-4 py-6 max-w-7xl">
                    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                        <div className="lg:col-span-3 min-w-0">
                            {/* Chat Area */}
                            <Card className="h-[600px] flex flex-col overflow-hidden">
                                <CardHeader className="border-b flex-shrink-0">
                                    <div className="flex items-center gap-3">
                                        <Avatar>
                                            <AvatarFallback className="bg-primary text-primary-foreground">
                                                <Bot className="h-4 w-4" />
                                            </AvatarFallback>
                                        </Avatar>
                                        <div className="min-w-0">
                                            <CardTitle className="text-lg truncate">Assistente GAM</CardTitle>
                                            <CardDescription className="truncate">Especialista em gestão pública municipal</CardDescription>
                                        </div>
                                    </div>
                                </CardHeader>

                                {/* Messages */}
                                <ScrollArea className="flex-1 overflow-hidden">
                                    <div className="p-4 space-y-4">
                                        {messages.map((message) => (
                                            <div
                                                key={message.id}
                                                className={`flex gap-3 ${message.type === "user" ? "justify-end" : "justify-start"} w-full`}
                                            >
                                                {message.type === "assistant" && (
                                                    <Avatar className="w-8 h-8 flex-shrink-0">
                                                        <AvatarFallback className="bg-primary text-primary-foreground">
                                                            <Bot className="h-4 w-4" />
                                                        </AvatarFallback>
                                                    </Avatar>
                                                )}

                                                <div className={`max-w-[75%] min-w-0 ${message.type === "user" ? "order-first" : ""}`}>
                                                    <div
                                                        className={`p-3 rounded-lg break-words ${message.type === "user" ? "bg-primary text-primary-foreground ml-auto" : "bg-muted"
                                                            }`}
                                                    >
                                                        <div className="whitespace-pre-wrap text-sm break-words overflow-wrap-anywhere">{message.content}</div>
                                                        {message.references && (
                                                            <div className="mt-2 pt-2 border-t border-border/50">
                                                                <div className="text-xs text-muted-foreground break-words">
                                                                    <strong>Referências:</strong> {message.references.join(", ")}
                                                                </div>
                                                            </div>
                                                        )}
                                                    </div>
                                                    <div className="flex items-center gap-2 mt-1 flex-wrap">
                                                        <span className="text-xs text-muted-foreground">{message.timestamp}</span>
                                                        {message.type === "assistant" && (
                                                            <div className="flex gap-1">
                                                                <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                                                                    <Copy className="h-3 w-3" />
                                                                </Button>
                                                                <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                                                                    <ThumbsUp className="h-3 w-3" />
                                                                </Button>
                                                                <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                                                                    <ThumbsDown className="h-3 w-3" />
                                                                </Button>
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>

                                                {message.type === "user" && (
                                                    <Avatar className="w-8 h-8 flex-shrink-0">
                                                        <AvatarFallback className="bg-secondary">
                                                            <User className="h-4 w-4" />
                                                        </AvatarFallback>
                                                    </Avatar>
                                                )}
                                            </div>
                                        ))}

                                        {isTyping && (
                                            <div className="flex gap-3">
                                                <Avatar className="w-8 h-8">
                                                    <AvatarFallback className="bg-primary text-primary-foreground">
                                                        <Bot className="h-4 w-4" />
                                                    </AvatarFallback>
                                                </Avatar>
                                                <div className="bg-muted p-3 rounded-lg">
                                                    <div className="flex gap-1">
                                                        <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"></div>
                                                        <div
                                                            className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"
                                                            style={{ animationDelay: "0.1s" }}
                                                        ></div>
                                                        <div
                                                            className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"
                                                            style={{ animationDelay: "0.2s" }}
                                                        ></div>
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </ScrollArea>

                                {/* Input Area */}
                                <div className="border-t p-4 flex-shrink-0">
                                    <div className="flex gap-2">
                                        <div className="flex-1 relative min-w-0">
                                            <Textarea
                                                value={inputMessage}
                                                onChange={(e) => setInputMessage(e.target.value)}
                                                placeholder="Digite sua pergunta sobre gestão municipal, conformidade, legislação..."
                                                className="resize-none pr-12 min-h-[60px] max-h-[120px]"
                                                rows={2}
                                                onKeyDown={(e) => {
                                                    if (e.key === "Enter" && !e.shiftKey) {
                                                        e.preventDefault()
                                                        handleSendMessage()
                                                    }
                                                }}
                                            />
                                            <Button variant="ghost" size="sm" className="absolute right-2 top-2 h-6 w-6 p-0">
                                                <Mic className="h-4 w-4" />
                                            </Button>
                                        </div>
                                        <Button onClick={handleSendMessage} disabled={!inputMessage.trim()} className="flex-shrink-0">
                                            <Send className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </div>
                            </Card>
                        </div>

                        {/* Sidebar */}
                        <div className="space-y-6 min-w-[280px] max-w-[320px]">
                            {/* Quick Questions */}
                            <Card>
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                        <Lightbulb className="h-5 w-5" />
                                        Perguntas Rápidas
                                    </CardTitle>
                                    <CardDescription>Clique para fazer uma pergunta comum</CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-3">
                                    {quickQuestions.map((item, index) => (
                                        <div
                                            key={index}
                                            className="w-full border border-input rounded-md p-3 cursor-pointer hover:bg-accent transition-colors"
                                            onClick={() => handleQuickQuestion(item.question)}
                                        >
                                            <div className="flex items-start gap-3">
                                                <item.icon className="h-4 w-4 mt-0.5 flex-shrink-0" />
                                                <div className="min-w-0 flex-1">
                                                    <div className="font-medium text-sm">{item.title}</div>
                                                    <div className="text-xs text-muted-foreground mt-1 leading-relaxed">{item.question}</div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </CardContent>
                            </Card>

                            {/* AI Capabilities */}
                            <Card>
                                <CardHeader>
                                    <CardTitle>Capacidades da IA</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-3">
                                    <div className="flex items-start gap-3">
                                        <CheckCircle className="h-4 w-4 text-primary mt-0.5" />
                                        <div className="text-sm">
                                            <div className="font-medium">Pareceres Técnicos</div>
                                            <div className="text-muted-foreground">Geração automática de pareceres jurídicos</div>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <CheckCircle className="h-4 w-4 text-primary mt-0.5" />
                                        <div className="text-sm">
                                            <div className="font-medium">Análise de Conformidade</div>
                                            <div className="text-muted-foreground">Verificação de aderência à LRF e TCM</div>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <CheckCircle className="h-4 w-4 text-primary mt-0.5" />
                                        <div className="text-sm">
                                            <div className="font-medium">Interpretação Legal</div>
                                            <div className="text-muted-foreground">Esclarecimentos sobre legislação</div>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <CheckCircle className="h-4 w-4 text-primary mt-0.5" />
                                        <div className="text-sm">
                                            <div className="font-medium">Suporte Processual</div>
                                            <div className="text-muted-foreground">Orientações sobre procedimentos</div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Recent Topics */}
                            <Card>
                                <CardHeader>
                                    <CardTitle>Tópicos Recentes</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-2">
                                    <Button variant="ghost" className="w-full justify-start text-sm h-auto p-2 min-w-0">
                                        <Search className="h-3 w-3 mr-2 flex-shrink-0" />
                                        <span className="truncate">Licitação de materiais</span>
                                    </Button>
                                    <Button variant="ghost" className="w-full justify-start text-sm h-auto p-2 min-w-0">
                                        <Search className="h-3 w-3 mr-2 flex-shrink-0" />
                                        <span className="truncate">Limites LRF pessoal</span>
                                    </Button>
                                    <Button variant="ghost" className="w-full justify-start text-sm h-auto p-2 min-w-0">
                                        <Search className="h-3 w-3 mr-2 flex-shrink-0" />
                                        <span className="truncate">Processo de empenho</span>
                                    </Button>
                                    <Button variant="ghost" className="w-full justify-start text-sm h-auto p-2 min-w-0">
                                        <Search className="h-3 w-3 mr-2 flex-shrink-0" />
                                        <span className="truncate">Documentação TCM</span>
                                    </Button>
                                </CardContent>
                            </Card>

                            {/* Help */}
                            <Card>
                                <CardHeader>
                                    <CardTitle>Dicas de Uso</CardTitle>
                                </CardHeader>
                                <CardContent className="text-sm text-muted-foreground space-y-2">
                                    <p>• Seja específico em suas perguntas</p>
                                    <p>• Mencione valores e datas quando relevante</p>
                                    <p>• Use o comando de voz para maior agilidade</p>
                                    <p>• Solicite referências legais quando necessário</p>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}

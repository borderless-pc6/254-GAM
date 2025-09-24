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
        <div className="min-h-screen bg-background">
            {/* Header */}
            <header className="border-b bg-card">
                <div className="container mx-auto px-6 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => onPageChange('dashboard')}
                                className="mr-2"
                            >
                                <ArrowLeft className="h-4 w-4 mr-2" />
                                Voltar
                            </Button>
                            <Building2 className="h-8 w-8 text-primary" />
                            <div>
                                <h1 className="text-2xl font-bold text-foreground">Assistente IA</h1>
                                <p className="text-sm text-muted-foreground">Suporte inteligente para gestão municipal</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            <Badge className="bg-primary/10 text-primary border-primary/20">
                                <Bot className="h-3 w-3 mr-1" />
                                Online
                            </Badge>
                        </div>
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
        </div>
    )
}

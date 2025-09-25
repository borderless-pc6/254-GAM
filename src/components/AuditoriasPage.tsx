"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
    Building2,
    BarChart3,
    AlertTriangle,
    CheckCircle,
    Clock,
    FileText,
    Download,
    Play,
    Pause,
    Eye,
    Filter,
    Calendar,
    TrendingUp,
    Shield,
    Users,
    DollarSign,
    ArrowLeft,
} from "lucide-react"

interface AuditoriasPageProps {
    onLogout: () => void;
    userEmail?: string;
    onPageChange: (page: string) => void;
}

export default function AuditoriasPage({ onLogout, userEmail, onPageChange }: AuditoriasPageProps) {
    const [activeAudits] = useState([
        {
            id: 1,
            name: "Auditoria Mensal - Janeiro 2025",
            type: "Mensal",
            status: "running",
            progress: 75,
            startDate: "15/01/2025",
            estimatedCompletion: "16/01/2025",
            findings: 3,
            criticalIssues: 1,
        },
        {
            id: 2,
            name: "Verificação LRF - Gastos com Pessoal",
            type: "Específica",
            status: "completed",
            progress: 100,
            startDate: "14/01/2025",
            completionDate: "15/01/2025",
            findings: 0,
            criticalIssues: 0,
        },
        {
            id: 3,
            name: "Auditoria de Licitações - Q4 2024",
            type: "Trimestral",
            status: "pending",
            progress: 0,
            scheduledDate: "20/01/2025",
            findings: 0,
            criticalIssues: 0,
        },
    ])

    const [auditFindings] = useState([
        {
            id: 1,
            title: "Pagamento sem empenho prévio",
            severity: "high",
            category: "Conformidade",
            description: "Identificado pagamento de R$ 5.400,00 sem empenho prévio registrado",
            recommendation: "Regularizar o processo com empenho retroativo e implementar controles preventivos",
            status: "pending",
            date: "15/01/2025",
        },
        {
            id: 2,
            title: "Documentação incompleta",
            severity: "medium",
            category: "Documentação",
            description: "3 notas fiscais sem assinatura do responsável pelo recebimento",
            recommendation: "Solicitar regularização da documentação junto aos fornecedores",
            status: "in-progress",
            date: "15/01/2025",
        },
        {
            id: 3,
            title: "Prazo de pagamento excedido",
            severity: "low",
            category: "Prazos",
            description: "2 fornecedores com pagamentos realizados após 30 dias",
            recommendation: "Revisar fluxo de aprovação para reduzir tempo de processamento",
            status: "resolved",
            date: "14/01/2025",
        },
    ])

    const getStatusBadge = (status: string) => {
        switch (status) {
            case "running":
                return (
                    <Badge className="bg-chart-2/10 text-chart-2 border-chart-2/20">
                        <Play className="h-3 w-3 mr-1" />
                        Em Andamento
                    </Badge>
                )
            case "completed":
                return (
                    <Badge className="bg-primary/10 text-primary border-primary/20">
                        <CheckCircle className="h-3 w-3 mr-1" />
                        Concluída
                    </Badge>
                )
            case "pending":
                return (
                    <Badge variant="outline">
                        <Clock className="h-3 w-3 mr-1" />
                        Agendada
                    </Badge>
                )
            default:
                return <Badge variant="outline">Desconhecido</Badge>
        }
    }

    const getSeverityBadge = (severity: string) => {
        switch (severity) {
            case "high":
                return <Badge variant="destructive">Alta</Badge>
            case "medium":
                return <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200">Média</Badge>
            case "low":
                return <Badge variant="secondary">Baixa</Badge>
            default:
                return <Badge variant="outline">-</Badge>
        }
    }

    const getFindingStatusBadge = (status: string) => {
        switch (status) {
            case "resolved":
                return <Badge className="bg-primary/10 text-primary border-primary/20">Resolvido</Badge>
            case "in-progress":
                return <Badge className="bg-chart-2/10 text-chart-2 border-chart-2/20">Em Andamento</Badge>
            case "pending":
                return <Badge variant="outline">Pendente</Badge>
            default:
                return <Badge variant="outline">-</Badge>
        }
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
                            <button className="nav-item active">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z" />
                                </svg>
                                Auditorias
                            </button>
                        </li>
                        <li>
                            <button
                                className="nav-item"
                                onClick={() => onPageChange('assistente')}
                            >
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
                            <h1>Auditorias</h1>
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

                <div className="container mx-auto px-6 py-8">
                    {/* Quick Stats */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">Auditorias Ativas</CardTitle>
                                <BarChart3 className="h-4 w-4 text-muted-foreground" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold text-chart-2">1</div>
                                <p className="text-xs text-muted-foreground">75% de progresso médio</p>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">Irregularidades</CardTitle>
                                <AlertTriangle className="h-4 w-4 text-muted-foreground" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold text-destructive">3</div>
                                <p className="text-xs text-muted-foreground">1 crítica, 2 menores</p>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">Taxa de Conformidade</CardTitle>
                                <Shield className="h-4 w-4 text-muted-foreground" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold text-primary">97.8%</div>
                                <p className="text-xs text-muted-foreground">+1.2% vs mês anterior</p>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">Economia Identificada</CardTitle>
                                <DollarSign className="h-4 w-4 text-muted-foreground" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold text-primary">R$ 12.4K</div>
                                <p className="text-xs text-muted-foreground">Este mês</p>
                            </CardContent>
                        </Card>
                    </div>

                    <Tabs defaultValue="auditorias" className="space-y-6">
                        <TabsList className="grid w-full grid-cols-3">
                            <TabsTrigger value="auditorias">Auditorias</TabsTrigger>
                            <TabsTrigger value="irregularidades">Irregularidades</TabsTrigger>
                            <TabsTrigger value="relatorios">Relatórios</TabsTrigger>
                        </TabsList>

                        <TabsContent value="auditorias" className="space-y-6">
                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                                {/* Active Audits */}
                                <div className="lg:col-span-2">
                                    <Card>
                                        <CardHeader>
                                            <div className="flex items-center justify-between">
                                                <div>
                                                    <CardTitle>Auditorias em Andamento</CardTitle>
                                                    <CardDescription>Acompanhe o progresso das auditorias automatizadas</CardDescription>
                                                </div>
                                                <Button variant="outline" size="sm">
                                                    <Filter className="h-4 w-4 mr-2" />
                                                    Filtros
                                                </Button>
                                            </div>
                                        </CardHeader>
                                        <CardContent className="space-y-4">
                                            {activeAudits.map((audit) => (
                                                <div key={audit.id} className="p-4 border rounded-lg space-y-3">
                                                    <div className="flex items-center justify-between">
                                                        <div>
                                                            <h4 className="font-medium">{audit.name}</h4>
                                                            <p className="text-sm text-muted-foreground">{audit.type}</p>
                                                        </div>
                                                        {getStatusBadge(audit.status)}
                                                    </div>

                                                    {audit.status === "running" && (
                                                        <div>
                                                            <div className="flex justify-between text-sm mb-2">
                                                                <span>Progresso</span>
                                                                <span>{audit.progress}%</span>
                                                            </div>
                                                            <Progress value={audit.progress} className="h-2" />
                                                        </div>
                                                    )}

                                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                                                        <div>
                                                            <span className="text-muted-foreground">Início:</span>
                                                            <div className="font-medium">{audit.startDate}</div>
                                                        </div>
                                                        <div>
                                                            <span className="text-muted-foreground">
                                                                {audit.status === "completed" ? "Conclusão:" : "Previsão:"}
                                                            </span>
                                                            <div className="font-medium">
                                                                {audit.completionDate || audit.estimatedCompletion || audit.scheduledDate}
                                                            </div>
                                                        </div>
                                                        <div>
                                                            <span className="text-muted-foreground">Achados:</span>
                                                            <div className="font-medium">{audit.findings}</div>
                                                        </div>
                                                        <div>
                                                            <span className="text-muted-foreground">Críticos:</span>
                                                            <div className="font-medium text-destructive">{audit.criticalIssues}</div>
                                                        </div>
                                                    </div>

                                                    <div className="flex gap-2">
                                                        <Button variant="outline" size="sm">
                                                            <Eye className="h-4 w-4 mr-2" />
                                                            Visualizar
                                                        </Button>
                                                        {audit.status === "running" && (
                                                            <Button variant="outline" size="sm">
                                                                <Pause className="h-4 w-4 mr-2" />
                                                                Pausar
                                                            </Button>
                                                        )}
                                                        {audit.status === "completed" && (
                                                            <Button variant="outline" size="sm">
                                                                <Download className="h-4 w-4 mr-2" />
                                                                Relatório
                                                            </Button>
                                                        )}
                                                    </div>
                                                </div>
                                            ))}
                                        </CardContent>
                                    </Card>
                                </div>

                                {/* Sidebar */}
                                <div className="space-y-6">
                                    {/* New Audit */}
                                    <Card>
                                        <CardHeader>
                                            <CardTitle>Nova Auditoria</CardTitle>
                                        </CardHeader>
                                        <CardContent className="space-y-4">
                                            <div>
                                                <Label htmlFor="audit-type">Tipo de Auditoria</Label>
                                                <Select>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Selecione o tipo" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value="mensal">Auditoria Mensal</SelectItem>
                                                        <SelectItem value="lrf">Verificação LRF</SelectItem>
                                                        <SelectItem value="licitacoes">Licitações</SelectItem>
                                                        <SelectItem value="personalizada">Personalizada</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            </div>
                                            <div>
                                                <Label htmlFor="period">Período</Label>
                                                <Select>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Selecione o período" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value="current-month">Mês Atual</SelectItem>
                                                        <SelectItem value="last-month">Mês Anterior</SelectItem>
                                                        <SelectItem value="quarter">Trimestre</SelectItem>
                                                        <SelectItem value="custom">Personalizado</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            </div>
                                            <div>
                                                <Label htmlFor="scope">Escopo</Label>
                                                <Textarea
                                                    id="scope"
                                                    placeholder="Descreva o escopo da auditoria..."
                                                    className="resize-none"
                                                    rows={3}
                                                />
                                            </div>
                                            <Button className="w-full">
                                                <Play className="h-4 w-4 mr-2" />
                                                Iniciar Auditoria
                                            </Button>
                                        </CardContent>
                                    </Card>

                                    {/* Quick Actions */}
                                    <Card>
                                        <CardHeader>
                                            <CardTitle>Ações Rápidas</CardTitle>
                                        </CardHeader>
                                        <CardContent className="space-y-3">
                                            <Button className="w-full justify-start bg-transparent" variant="outline">
                                                <Calendar className="h-4 w-4 mr-2" />
                                                Agendar Auditoria
                                            </Button>
                                            <Button className="w-full justify-start bg-transparent" variant="outline">
                                                <FileText className="h-4 w-4 mr-2" />
                                                Modelos de Auditoria
                                            </Button>
                                            <Button className="w-full justify-start bg-transparent" variant="outline">
                                                <TrendingUp className="h-4 w-4 mr-2" />
                                                Análise de Tendências
                                            </Button>
                                        </CardContent>
                                    </Card>
                                </div>
                            </div>
                        </TabsContent>

                        <TabsContent value="irregularidades" className="space-y-6">
                            <Card>
                                <CardHeader>
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <CardTitle>Irregularidades Identificadas</CardTitle>
                                            <CardDescription>Achados das auditorias que requerem atenção</CardDescription>
                                        </div>
                                        <div className="flex gap-2">
                                            <Button variant="outline" size="sm">
                                                <Filter className="h-4 w-4 mr-2" />
                                                Filtros
                                            </Button>
                                            <Button variant="outline" size="sm">
                                                <Download className="h-4 w-4 mr-2" />
                                                Exportar
                                            </Button>
                                        </div>
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-4">
                                        {auditFindings.map((finding) => (
                                            <div key={finding.id} className="p-4 border rounded-lg space-y-3">
                                                <div className="flex items-start justify-between">
                                                    <div className="flex-1">
                                                        <div className="flex items-center gap-3 mb-2">
                                                            <h4 className="font-medium">{finding.title}</h4>
                                                            {getSeverityBadge(finding.severity)}
                                                            {getFindingStatusBadge(finding.status)}
                                                        </div>
                                                        <p className="text-sm text-muted-foreground mb-2">{finding.description}</p>
                                                        <div className="text-sm">
                                                            <span className="font-medium">Recomendação: </span>
                                                            <span className="text-muted-foreground">{finding.recommendation}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="flex items-center justify-between text-xs text-muted-foreground">
                                                    <span>Categoria: {finding.category}</span>
                                                    <span>Identificado em: {finding.date}</span>
                                                </div>
                                                <div className="flex gap-2">
                                                    <Button variant="outline" size="sm">
                                                        <Eye className="h-4 w-4 mr-2" />
                                                        Detalhes
                                                    </Button>
                                                    {finding.status === "pending" && <Button size="sm">Marcar como Resolvido</Button>}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>
                        </TabsContent>

                        <TabsContent value="relatorios" className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                <Card className="cursor-pointer hover:shadow-md transition-shadow">
                                    <CardHeader>
                                        <CardTitle className="flex items-center gap-2">
                                            <FileText className="h-5 w-5" />
                                            Relatório Mensal
                                        </CardTitle>
                                        <CardDescription>Janeiro 2025</CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="space-y-2 text-sm">
                                            <div className="flex justify-between">
                                                <span>Status:</span>
                                                <Badge className="bg-primary/10 text-primary border-primary/20">Concluído</Badge>
                                            </div>
                                            <div className="flex justify-between">
                                                <span>Irregularidades:</span>
                                                <span>3 encontradas</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span>Conformidade:</span>
                                                <span className="text-primary font-medium">97.8%</span>
                                            </div>
                                        </div>
                                        <Button className="w-full mt-4 bg-transparent" variant="outline">
                                            <Download className="h-4 w-4 mr-2" />
                                            Baixar PDF
                                        </Button>
                                    </CardContent>
                                </Card>

                                <Card className="cursor-pointer hover:shadow-md transition-shadow">
                                    <CardHeader>
                                        <CardTitle className="flex items-center gap-2">
                                            <Shield className="h-5 w-5" />
                                            Análise LRF
                                        </CardTitle>
                                        <CardDescription>Dezembro 2024</CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="space-y-2 text-sm">
                                            <div className="flex justify-between">
                                                <span>Status:</span>
                                                <Badge className="bg-primary/10 text-primary border-primary/20">Concluído</Badge>
                                            </div>
                                            <div className="flex justify-between">
                                                <span>Irregularidades:</span>
                                                <span>0 encontradas</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span>Conformidade:</span>
                                                <span className="text-primary font-medium">100%</span>
                                            </div>
                                        </div>
                                        <Button className="w-full mt-4 bg-transparent" variant="outline">
                                            <Download className="h-4 w-4 mr-2" />
                                            Baixar PDF
                                        </Button>
                                    </CardContent>
                                </Card>

                                <Card className="cursor-pointer hover:shadow-md transition-shadow">
                                    <CardHeader>
                                        <CardTitle className="flex items-center gap-2">
                                            <Users className="h-5 w-5" />
                                            Auditoria Licitações
                                        </CardTitle>
                                        <CardDescription>Q4 2024</CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="space-y-2 text-sm">
                                            <div className="flex justify-between">
                                                <span>Status:</span>
                                                <Badge variant="outline">Agendado</Badge>
                                            </div>
                                            <div className="flex justify-between">
                                                <span>Previsão:</span>
                                                <span>20/01/2025</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span>Escopo:</span>
                                                <span>47 processos</span>
                                            </div>
                                        </div>
                                        <Button className="w-full mt-4 bg-transparent" variant="outline" disabled>
                                            <Clock className="h-4 w-4 mr-2" />
                                            Aguardando
                                        </Button>
                                    </CardContent>
                                </Card>
                            </div>
                        </TabsContent>
                    </Tabs>
                </div>
            </main>
        </div>
    )
}

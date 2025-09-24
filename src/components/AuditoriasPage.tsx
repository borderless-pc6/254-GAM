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
                                <h1 className="text-2xl font-bold text-foreground">Módulo de Auditoria</h1>
                                <p className="text-sm text-muted-foreground">Auditorias automatizadas e relatórios de conformidade</p>
                            </div>
                        </div>
                        <div className="flex gap-2">
                            <Button variant="outline" size="sm">
                                <Download className="h-4 w-4 mr-2" />
                                Exportar
                            </Button>
                            <Button size="sm">
                                <Play className="h-4 w-4 mr-2" />
                                Nova Auditoria
                            </Button>
                        </div>
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
        </div>
    )
}

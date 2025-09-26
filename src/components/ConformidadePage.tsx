import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
    Building2,
    Shield,
    AlertTriangle,
    CheckCircle,
    TrendingUp,
    FileText,
    Calendar,
    BarChart3,
    Clock,
    Eye,
    Download,
    RefreshCw,
} from "lucide-react"

interface ConformidadePageProps {
    onLogout: () => void;
    userEmail?: string;
    onPageChange: (page: string) => void;
}

export default function ConformidadePage({ onLogout, userEmail, onPageChange }: ConformidadePageProps) {
    const lrfIndicators = [
        {
            name: "Gastos com Pessoal",
            current: 47.8,
            limit: 54.0,
            status: "good",
            trend: "stable",
            description: "Percentual da RCL gasto com pessoal",
        },
        {
            name: "Dívida Consolidada",
            current: 89.2,
            limit: 120.0,
            status: "good",
            trend: "decreasing",
            description: "Percentual da RCL de endividamento",
        },
        {
            name: "Operações de Crédito",
            current: 12.5,
            limit: 16.0,
            status: "warning",
            trend: "increasing",
            description: "Percentual anual da RCL",
        },
        {
            name: "Restos a Pagar",
            current: 2.1,
            limit: 7.0,
            status: "good",
            trend: "stable",
            description: "Percentual da RCL não processados",
        },
    ]

    const tcmRequirements = [
        {
            name: "Relatório de Gestão Fiscal",
            status: "compliant",
            lastUpdate: "15/01/2025",
            nextDeadline: "28/02/2025",
            description: "Demonstrativo bimestral LRF",
        },
        {
            name: "Balancete Mensal",
            status: "compliant",
            lastUpdate: "31/12/2024",
            nextDeadline: "31/01/2025",
            description: "Balancete contábil mensal",
        },
        {
            name: "Relatório Resumido",
            status: "pending",
            lastUpdate: "30/11/2024",
            nextDeadline: "31/01/2025",
            description: "Execução orçamentária bimestral",
        },
        {
            name: "Prestação de Contas",
            status: "compliant",
            lastUpdate: "31/12/2024",
            nextDeadline: "31/03/2025",
            description: "Prestação de contas anual",
        },
    ]

    const recentAlerts = [
        {
            id: 1,
            type: "warning",
            title: "Limite de operações de crédito próximo",
            description: "Percentual atual: 12.5% (limite: 16%)",
            date: "15/01/2025",
            category: "LRF",
        },
        {
            id: 2,
            type: "info",
            title: "Relatório resumido pendente",
            description: "Prazo para envio: 31/01/2025",
            date: "15/01/2025",
            category: "TCM",
        },
        {
            id: 3,
            type: "success",
            title: "Auditoria mensal concluída",
            description: "Conformidade: 98.5% - Sem irregularidades críticas",
            date: "14/01/2025",
            category: "Auditoria",
        },
    ]

    const getStatusBadge = (status: string) => {
        switch (status) {
            case "good":
                return <Badge className="bg-primary/10 text-primary border-primary/20">Conforme</Badge>
            case "warning":
                return <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200">Atenção</Badge>
            case "critical":
                return <Badge variant="destructive">Crítico</Badge>
            case "compliant":
                return <Badge className="bg-primary/10 text-primary border-primary/20">Em Dia</Badge>
            case "pending":
                return <Badge variant="outline">Pendente</Badge>
            default:
                return <Badge variant="outline">-</Badge>
        }
    }

    const getAlertIcon = (type: string) => {
        switch (type) {
            case "warning":
                return <AlertTriangle className="h-4 w-4 text-yellow-600" />
            case "success":
                return <CheckCircle className="h-4 w-4 text-primary" />
            case "info":
                return <Clock className="h-4 w-4 text-blue-600" />
            default:
                return <AlertTriangle className="h-4 w-4" />
        }
    }

    const getTrendIcon = (trend: string) => {
        switch (trend) {
            case "increasing":
                return <TrendingUp className="h-3 w-3 text-red-500" />
            case "decreasing":
                return <TrendingUp className="h-3 w-3 text-primary rotate-180" />
            case "stable":
                return <div className="h-3 w-3 bg-gray-400 rounded-full" />
            default:
                return null
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
                                onClick={() => onPageChange('contas-bancarias')}
                            >
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M20 4H4c-1.11 0-1.99.89-1.99 2L2 18c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V6c0-1.11-.89-2-2-2zm0 14H4v-6h16v6zm0-10H4V6h16v2z" />
                                </svg>
                                Contas Bancárias
                            </button>
                        </li>
                        <li>
                            <button
                                className="nav-item"
                                onClick={() => onPageChange('contas-pagar')}
                            >
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z" />
                                </svg>
                                Contas a Pagar
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
                            <button className="nav-item active">
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
                            <h1>Conformidade</h1>
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

                {/* Stats Cards */}
                <section className="stats-section">
                    <div className="stats-grid">
                        <div className="stat-card">
                            <div className="stat-icon">
                                <Shield className="h-6 w-6" />
                            </div>
                            <div className="stat-content">
                                <h3>98.5%</h3>
                                <p>Conformidade Geral</p>
                                <span className="stat-change positive">
                                    <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M7 14l5-5 5 5z" />
                                    </svg>
                                    +2.1% vs mês anterior
                                </span>
                            </div>
                        </div>

                        <div className="stat-card">
                            <div className="stat-icon">
                                <BarChart3 className="h-6 w-6" />
                            </div>
                            <div className="stat-content">
                                <h3>3/4</h3>
                                <p>Indicadores LRF</p>
                                <span className="stat-change positive">
                                    <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                                    </svg>
                                    Dentro dos limites
                                </span>
                            </div>
                        </div>

                        <div className="stat-card">
                            <div className="stat-icon">
                                <FileText className="h-6 w-6" />
                            </div>
                            <div className="stat-content">
                                <h3>3/4</h3>
                                <p>Obrigações TCM</p>
                                <span className="stat-change positive">
                                    <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                                    </svg>
                                    Em dia
                                </span>
                            </div>
                        </div>

                        <div className="stat-card">
                            <div className="stat-icon">
                                <AlertTriangle className="h-6 w-6" />
                            </div>
                            <div className="stat-content">
                                <h3>2</h3>
                                <p>Alertas Ativos</p>
                                <span className="stat-change warning">
                                    <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M7 14l5-5 5 5z" />
                                    </svg>
                                    Requerem atenção
                                </span>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Chart Section */}
                <section className="chart-section">
                    <div className="chart-container">
                        <h2>Indicadores de Conformidade</h2>
                        <p>Monitoramento de aderência à LRF e normas do TCM</p>

                        <div className="space-y-6">
                            {lrfIndicators.map((indicator, index) => (
                                <div key={index} className="space-y-3">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            <h4 className="font-medium">{indicator.name}</h4>
                                            {getStatusBadge(indicator.status)}
                                            {getTrendIcon(indicator.trend)}
                                        </div>
                                        <div className="text-right">
                                            <div className="font-bold">
                                                {indicator.current}% / {indicator.limit}%
                                            </div>
                                            <div className="text-xs text-muted-foreground">
                                                {(((indicator.limit - indicator.current) / indicator.limit) * 100).toFixed(1)}% de margem
                                            </div>
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <Progress value={(indicator.current / indicator.limit) * 100} className="h-2" />
                                        <p className="text-sm text-muted-foreground">{indicator.description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="quick-actions">
                        <h3>Alertas de Conformidade</h3>
                        <div className="actions-grid">
                            {recentAlerts.map((alert) => (
                                <div key={alert.id} className="action-btn">
                                    {getAlertIcon(alert.type)}
                                    <div className="flex-1">
                                        <h4 className="font-medium text-sm">{alert.title}</h4>
                                        <p className="text-xs text-muted-foreground">{alert.description}</p>
                                        <span className="text-xs text-muted-foreground">{alert.date}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            </main>
        </div>
    )
}

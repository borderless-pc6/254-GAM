import React, { useState } from 'react';
import './Dashboard.css';

interface DashboardProps {
    onLogout: () => void;
    userEmail?: string;
    onPageChange: (page: string) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ onLogout, userEmail, onPageChange }) => {
    const [activeTab, setActiveTab] = useState('dashboard');

    // Dados mockados específicos do GAM
    const bankAccounts = [
        {
            id: 1,
            name: 'Aplicação CDB',
            bank: 'Caixa Econômica Federal',
            balance: 890450,
            status: 'Atualizado agora'
        },
        {
            id: 2,
            name: 'Fundo de Saúde',
            bank: 'Conta Específica',
            balance: 711220,
            status: 'Atualizado agora'
        }
    ];

    const recentActivities = [
        {
            id: 1,
            action: 'Parecer técnico gerado',
            description: 'Licitação de materiais de limpeza - Aprovado',
            time: 'Há 15 minutos',
            type: 'success',
            status: 'success'
        },
        {
            id: 2,
            action: 'Documentos processados',
            description: '15 notas fiscais extraídas automaticamente',
            time: 'Há 1 hora',
            type: 'success',
            status: 'success'
        },
        {
            id: 3,
            action: 'Alerta de conformidade',
            description: 'Limite de gastos com pessoal próximo ao máximo',
            time: 'Há 2 horas',
            type: 'warning',
            status: 'warning'
        }
    ];

    const complianceMetrics = [
        { name: 'Lista de Metas Auditorias', percentage: 90 },
        { name: 'Parecer Fiscal', percentage: 88 },
        { name: 'Procedimentos Internos', percentage: 100 },
        { name: 'Análise Orçamentária', percentage: 95 },
        { name: 'Equipe Online', percentage: 100 }
    ];

    const teamMembers = [
        { name: 'Ana Costa (Navegante)', status: 'online' },
        { name: 'João Souza (Secretário)', status: 'online' },
        { name: 'Carlos Miguel', status: 'offline' }
    ];

    const getActivityIcon = (status: string) => {
        switch (status) {
            case 'success': return (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                </svg>
            );
            case 'warning': return (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z" />
                </svg>
            );
            default: return (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                </svg>
            );
        }
    };

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
                                className={`nav-item ${activeTab === 'dashboard' ? 'active' : ''}`}
                                onClick={() => setActiveTab('dashboard')}
                            >
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z" />
                                </svg>
                                Dashboard
                            </button>
                        </li>
                        <li>
                            <button
                                className={`nav-item ${activeTab === 'documentos' ? 'active' : ''}`}
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
                                className={`nav-item ${activeTab === 'auditorias' ? 'active' : ''}`}
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
                                className={`nav-item ${activeTab === 'assistente' ? 'active' : ''}`}
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
                                className={`nav-item ${activeTab === 'conformidade' ? 'active' : ''}`}
                                onClick={() => setActiveTab('conformidade')}
                            >
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M12,1L3,5V11C3,16.55 6.84,21.74 12,23C17.16,21.74 21,16.55 21,11V5L12,1M12,7C13.4,7 14.8,8.6 14.8,10V11H16V16H8V11H9.2V10C9.2,8.6 10.6,7 12,7M12,8.2C11.2,8.2 10.4,8.7 10.4,10V11H13.6V10C13.6,8.7 12.8,8.2 12,8.2Z" />
                                </svg>
                                Conformidade
                            </button>
                        </li>
                        <li>
                            <button
                                className={`nav-item ${activeTab === 'configuracoes' ? 'active' : ''}`}
                                onClick={() => setActiveTab('configuracoes')}
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
                            <h1>Dashboard</h1>
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
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M20 4H4c-1.11 0-1.99.89-1.99 2L2 18c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V6c0-1.11-.89-2-2-2zm0 14H4v-6h16v6zm0-10H4V6h16v2z" />
                                </svg>
                            </div>
                            <div className="stat-content">
                                <h3>R$ 2.847.350,00</h3>
                                <p>Saldo Total</p>
                                <span className="stat-change positive">
                                    <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M7 14l5-5 5 5z" />
                                    </svg>
                                    +2.5% em relação ao mês anterior
                                </span>
                            </div>
                        </div>
                        <div className="stat-card">
                            <div className="stat-icon">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z" />
                                </svg>
                            </div>
                            <div className="stat-content">
                                <h3>47</h3>
                                <p>Contas a Pagar</p>
                                <span className="stat-change warning">
                                    <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M7 14l5-5 5 5z" />
                                    </svg>
                                    ▲ 12 vencendo hoje
                                </span>
                            </div>
                        </div>
                        <div className="stat-card">
                            <div className="stat-icon">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                                </svg>
                            </div>
                            <div className="stat-content">
                                <h3>98.5%</h3>
                                <p>Conformidade</p>
                                <span className="stat-change positive">
                                    <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                                    </svg>
                                    Aprovação TCM estimada
                                </span>
                            </div>
                        </div>
                        <div className="stat-card">
                            <div className="stat-icon">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z" />
                                </svg>
                            </div>
                            <div className="stat-content">
                                <h3>3</h3>
                                <p>Auditorias</p>
                                <span className="stat-change warning">
                                    <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M7 14l5-5 5 5z" />
                                    </svg>
                                    Concluídas
                                </span>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Chart Section */}
                <section className="chart-section">
                    <div className="chart-container">
                        <h2>Receitas vs Despesas</h2>
                        <p>Compreenda resultados últimos 6 meses</p>
                        <div className="bar-chart">
                            <div className="chart-bars">
                                <div className="bar" style={{ height: '60%' }}></div>
                                <div className="bar" style={{ height: '70%' }}></div>
                                <div className="bar" style={{ height: '80%' }}></div>
                                <div className="bar" style={{ height: '75%' }}></div>
                                <div className="bar" style={{ height: '85%' }}></div>
                                <div className="bar" style={{ height: '90%' }}></div>
                            </div>
                            <div className="chart-labels">
                                <span>Jan</span>
                                <span>Fev</span>
                                <span>Mar</span>
                                <span>Abr</span>
                                <span>Mai</span>
                                <span>Jun</span>
                            </div>
                        </div>
                    </div>

                    <div className="quick-actions">
                        <h3>Ações Rápidas</h3>
                        <div className="actions-grid">
                            <button className="action-btn">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z" />
                                </svg>
                                Emitir Documentos
                            </button>
                            <button className="action-btn">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z" />
                                </svg>
                                Gerar Relatório
                            </button>
                            <button className="action-btn">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z" />
                                </svg>
                                Nova Auditoria
                            </button>
                            <button className="action-btn">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M20 2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h4l4 4 4-4h4c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-2 12H6v-2h12v2zm0-3H6V9h12v2zm0-3H6V6h12v2z" />
                                </svg>
                                Monitorar IA
                            </button>
                        </div>
                    </div>
                </section>

                {/* Bank Accounts Section */}
                <section className="bank-accounts">
                    <h2>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M20 4H4c-1.11 0-1.99.89-1.99 2L2 18c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V6c0-1.11-.89-2-2-2zm0 14H4v-6h16v6zm0-10H4V6h16v2z" />
                        </svg>
                        Contas Bancárias
                    </h2>
                    <p>Saldos atualizados em tempo real</p>

                    <div className="accounts-grid">
                        {bankAccounts.map(account => (
                            <div key={account.id} className="account-card">
                                <h3>{account.name}</h3>
                                <p className="bank-info">{account.bank}</p>
                                <p className="balance">R$ {account.balance.toLocaleString()}</p>
                                <div className="status-badge">
                                    <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M12,20A8,8 0 0,0 20,12A8,8 0 0,0 12,4A8,8 0 0,0 4,12A8,8 0 0,0 12,20M12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22C6.47,22 2,17.5 2,12A10,10 0 0,1 12,2M15.5,8L10,13.5L8.5,12L7,13.5L10,16.5L17,9.5L15.5,8Z" />
                                    </svg>
                                    {account.status}
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Recent Activities */}
                <section className="recent-activities">
                    <h2>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z" />
                        </svg>
                        Atividades Recentes
                    </h2>

                    <div className="activities-list">
                        {recentActivities.map(activity => (
                            <div key={activity.id} className="activity-item">
                                <div className={`activity-indicator ${activity.status}`}>
                                    {getActivityIcon(activity.status)}
                                </div>
                                <div className="activity-content">
                                    <h4>{activity.action}</h4>
                                    <p>{activity.description}</p>
                                    <span className="activity-time">{activity.time}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            </main>

            {/* Right Panel */}
            <aside className="right-panel">

                {/* Compliance Status */}
                <section className="compliance-status">
                    <h3>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12,1L3,5V11C3,16.55 6.84,21.74 12,23C17.16,21.74 21,16.55 21,11V5L12,1M12,7C13.4,7 14.8,8.6 14.8,10V11H16V16H8V11H9.2V10C9.2,8.6 10.6,7 12,7M12,8.2C11.2,8.2 10.4,8.7 10.4,10V11H13.6V10C13.6,8.7 12.8,8.2 12,8.2Z" />
                        </svg>
                        Status de Conformidade
                    </h3>

                    {complianceMetrics.map((metric, index) => (
                        <div key={index} className="compliance-metric">
                            <div className="metric-header">
                                <span className="metric-name">{metric.name}</span>
                                <span className="metric-percentage">{metric.percentage}%</span>
                            </div>
                            <div className="progress-bar">
                                <div
                                    className="progress-fill"
                                    style={{ width: `${metric.percentage}%` }}
                                ></div>
                            </div>
                        </div>
                    ))}

                    <div className="last-audit">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M19,3H18V1H16V3H8V1H6V3H5A2,2 0 0,0 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5A2,2 0 0,0 19,3M19,19H5V8H19V19Z" />
                        </svg>
                        Última auditoria: 15/01/2025
                    </div>
                </section>

                {/* Online Team */}
                <section className="online-team">
                    <h3>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M16 4c0-1.11.89-2 2-2s2 .89 2 2-.89 2-2 2-2-.89-2-2zm4 18v-6h2.5l-2.54-7.63A1.5 1.5 0 0 0 18.54 7H17c-.8 0-1.54.37-2.01.99L14 9l-1.5-2.01A2.5 2.5 0 0 0 10.5 6H9c-.8 0-1.54.37-2.01.99L6 9l-1.5-2.01A2.5 2.5 0 0 0 2.5 6H1v16h2.5v-6H6v6h2.5v-6H9v6h2.5v-6H12v6h2.5v-6H15v6h2.5v-6H18v6h2z" />
                        </svg>
                        Equipe Online
                    </h3>

                    <div className="team-list">
                        {teamMembers.map((member, index) => (
                            <div key={index} className="team-member">
                                <div className={`status-dot ${member.status}`}></div>
                                <span className="member-name">{member.name}</span>
                            </div>
                        ))}
                    </div>
                </section>
            </aside>
        </div>
    );
};

export default Dashboard;

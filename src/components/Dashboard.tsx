import React, { useState } from 'react';
import './Dashboard.css';

interface DashboardProps {
    onLogout: () => void;
    userEmail?: string;
}

const Dashboard: React.FC<DashboardProps> = ({ onLogout, userEmail }) => {
    const [activeTab, setActiveTab] = useState('overview');

    // Dados mockados específicos do GAM
    const stats = {
        saldoConsolidado: 2847500,
        contasAPagar: 156,
        documentosProcessados: 1247,
        auditoriasRealizadas: 23
    };

    const recentActivities = [
        { id: 1, action: 'Documento financeiro processado via IA', time: '2 min atrás', type: 'document' },
        { id: 2, action: 'Parecer técnico gerado para licitação', time: '15 min atrás', type: 'audit' },
        { id: 3, action: 'Autorização de pagamento via WhatsApp', time: '1 hora atrás', type: 'payment' },
        { id: 4, action: 'Auditoria de conformidade LRF concluída', time: '2 horas atrás', type: 'compliance' },
        { id: 5, action: 'Resumo financeiro enviado ao Prefeito', time: '3 horas atrás', type: 'report' }
    ];

    const contasAPagar = [
        { id: 1, name: 'Fornecedor ABC Ltda', valor: 45000, vencimento: '2024-01-15', status: 'Pendente', secretaria: 'Saúde' },
        { id: 2, name: 'Construtora XYZ S/A', valor: 125000, vencimento: '2024-01-20', status: 'Autorizado', secretaria: 'Obras' },
        { id: 3, name: 'Empresa de TI DEF', valor: 28000, vencimento: '2024-01-25', status: 'Pendente', secretaria: 'Administração' },
        { id: 4, name: 'Fornecedor GHI', valor: 15000, vencimento: '2024-01-30', status: 'Em análise', secretaria: 'Educação' }
    ];

    const getActivityIcon = (type: string) => {
        switch (type) {
            case 'document': return (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z" />
                </svg>
            );
            case 'audit': return (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                </svg>
            );
            case 'payment': return (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20 4H4c-1.11 0-1.99.89-1.99 2L2 18c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V6c0-1.11-.89-2-2-2zm0 14H4v-6h16v6zm0-10H4V6h16v2z" />
                </svg>
            );
            case 'compliance': return (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
            );
            case 'report': return (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z" />
                </svg>
            );
            default: return (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z" />
                </svg>
            );
        }
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'Em andamento': return '#3b82f6';
            case 'Em desenvolvimento': return '#f59e0b';
            case 'Finalizando': return '#10b981';
            case 'Iniciando': return '#8b5cf6';
            default: return '#6b7280';
        }
    };

    return (
        <div className="dashboard">
            {/* Header */}
            <header className="dashboard-header">
                <div className="header-left">
                    <h1>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" style={{ marginRight: '8px', verticalAlign: 'middle' }}>
                            <path d="M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z" />
                        </svg>
                        GAM - Gestão Ágil Municipal
                    </h1>
                    <p>Bem-vindo ao sistema de gestão financeira municipal com IA!</p>
                </div>
                <div className="header-right">
                    <div className="user-info">
                        <span className="user-email">{userEmail || 'usuario@exemplo.com'}</span>
                        <button onClick={onLogout} className="logout-btn">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" style={{ marginRight: '4px' }}>
                                <path d="M17 7l-1.41 1.41L18.17 11H8v2h10.17l-2.58 2.58L17 17l5-5zM4 5h8V3H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h8v-2H4V5z" />
                            </svg>
                            Sair
                        </button>
                    </div>
                </div>
            </header>

            {/* Navigation Tabs */}
            <nav className="dashboard-nav">
                <button
                    className={`nav-tab ${activeTab === 'overview' ? 'active' : ''}`}
                    onClick={() => setActiveTab('overview')}
                >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" style={{ marginRight: '8px' }}>
                        <path d="M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z" />
                    </svg>
                    Visão Geral
                </button>
                <button
                    className={`nav-tab ${activeTab === 'financeiro' ? 'active' : ''}`}
                    onClick={() => setActiveTab('financeiro')}
                >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" style={{ marginRight: '8px' }}>
                        <path d="M20 4H4c-1.11 0-1.99.89-1.99 2L2 18c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V6c0-1.11-.89-2-2-2zm0 14H4v-6h16v6zm0-10H4V6h16v2z" />
                    </svg>
                    Financeiro
                </button>
                <button
                    className={`nav-tab ${activeTab === 'controladoria' ? 'active' : ''}`}
                    onClick={() => setActiveTab('controladoria')}
                >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" style={{ marginRight: '8px' }}>
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                    </svg>
                    Controladoria AI
                </button>
                <button
                    className={`nav-tab ${activeTab === 'relatorios' ? 'active' : ''}`}
                    onClick={() => setActiveTab('relatorios')}
                >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" style={{ marginRight: '8px' }}>
                        <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z" />
                    </svg>
                    Relatórios
                </button>
            </nav>

            {/* Main Content */}
            <main className="dashboard-main">
                {activeTab === 'overview' && (
                    <div className="overview-content">
                        {/* Stats Cards */}
                        <div className="stats-grid">
                            <div className="stat-card">
                                <div className="stat-icon">
                                    <svg width="48" height="48" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M16 4c0-1.11.89-2 2-2s2 .89 2 2-.89 2-2 2-2-.89-2-2zm4 18v-6h2.5l-2.54-7.63A1.5 1.5 0 0 0 18.54 7H17c-.8 0-1.54.37-2.01.99L14 9l-1.5-2.01A2.5 2.5 0 0 0 10.5 6H9c-.8 0-1.54.37-2.01.99L6 9l-1.5-2.01A2.5 2.5 0 0 0 2.5 6H1v16h2.5v-6H6v6h2.5v-6H9v6h2.5v-6H12v6h2.5v-6H15v6h2.5v-6H18v6h2z" />
                                    </svg>
                                </div>
                                <div className="stat-content">
                                    <h3>R$ {stats.saldoConsolidado.toLocaleString()}</h3>
                                    <p>Saldo Consolidado</p>
                                    <span className="stat-change positive">+5.2% este mês</span>
                                </div>
                            </div>
                            <div className="stat-card">
                                <div className="stat-icon">
                                    <svg width="48" height="48" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M2.81 14.126l5.9 2.59c.38.17.84.17 1.22 0l5.9-2.59c.38-.17.38-.67 0-.84l-5.9-2.59c-.38-.17-.84-.17-1.22 0l-5.9 2.59c-.38.17-.38.67 0 .84zM2.81 9.126l5.9 2.59c.38.17.84.17 1.22 0l5.9-2.59c.38-.17.38-.67 0-.84l-5.9-2.59c-.38-.17-.84-.17-1.22 0l-5.9 2.59c-.38.17-.38.67 0 .84zM2.81 4.126l5.9 2.59c.38.17.84.17 1.22 0l5.9-2.59c.38-.17.38-.67 0-.84l-5.9-2.59c-.38-.17-.84-.17-1.22 0l-5.9 2.59c-.38.17-.38.67 0 .84z" />
                                    </svg>
                                </div>
                                <div className="stat-content">
                                    <h3>{stats.contasAPagar}</h3>
                                    <p>Contas a Pagar</p>
                                    <span className="stat-change positive">-12 pendentes</span>
                                </div>
                            </div>
                            <div className="stat-card">
                                <div className="stat-icon">
                                    <svg width="48" height="48" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                                    </svg>
                                </div>
                                <div className="stat-content">
                                    <h3>{stats.documentosProcessados}</h3>
                                    <p>Documentos Processados</p>
                                    <span className="stat-change positive">+47 hoje</span>
                                </div>
                            </div>
                            <div className="stat-card">
                                <div className="stat-icon">
                                    <svg width="48" height="48" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                                    </svg>
                                </div>
                                <div className="stat-content">
                                    <h3>{stats.auditoriasRealizadas}</h3>
                                    <p>Auditorias Realizadas</p>
                                    <span className="stat-change positive">+3 esta semana</span>
                                </div>
                            </div>
                        </div>

                        {/* Recent Activities */}
                        <div className="activities-section">
                            <h2>
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" style={{ marginRight: '8px', verticalAlign: 'middle' }}>
                                    <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z" />
                                </svg>
                                Atividades do GAM
                            </h2>
                            <div className="activities-list">
                                {recentActivities.map(activity => (
                                    <div key={activity.id} className="activity-item">
                                        <div className="activity-icon">
                                            {getActivityIcon(activity.type)}
                                        </div>
                                        <div className="activity-content">
                                            <p className="activity-action">{activity.action}</p>
                                            <span className="activity-time">{activity.time}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === 'financeiro' && (
                    <div className="projects-content">
                        <div className="projects-header">
                            <h2>
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" style={{ marginRight: '8px', verticalAlign: 'middle' }}>
                                    <path d="M10 4H4c-1.11 0-2 .89-2 2v12c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2h-8l-2-2z" />
                                </svg>
                                Contas a Pagar
                            </h2>
                            <button className="add-project-btn">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" style={{ marginRight: '4px' }}>
                                    <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" />
                                </svg>
                                Nova Conta
                            </button>
                        </div>
                        <div className="projects-grid">
                            {contasAPagar.map(conta => (
                                <div key={conta.id} className="project-card">
                                    <div className="project-header">
                                        <h3>{conta.name}</h3>
                                        <span
                                            className="project-status"
                                            style={{ backgroundColor: getStatusColor(conta.status) }}
                                        >
                                            {conta.status}
                                        </span>
                                    </div>
                                    <div className="project-progress">
                                        <div className="progress-bar">
                                            <div
                                                className="progress-fill"
                                                style={{ width: conta.status === 'Autorizado' ? '100%' : conta.status === 'Pendente' ? '60%' : '30%' }}
                                            ></div>
                                        </div>
                                        <span className="progress-text">R$ {conta.valor.toLocaleString()}</span>
                                    </div>
                                    <div className="project-footer">
                                        <span className="team-size">
                                            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" style={{ marginRight: '4px', verticalAlign: 'middle' }}>
                                                <path d="M16 4c0-1.11.89-2 2-2s2 .89 2 2-.89 2-2 2-2-.89-2-2zm4 18v-6h2.5l-2.54-7.63A1.5 1.5 0 0 0 18.54 7H17c-.8 0-1.54.37-2.01.99L14 9l-1.5-2.01A2.5 2.5 0 0 0 10.5 6H9c-.8 0-1.54.37-2.01.99L6 9l-1.5-2.01A2.5 2.5 0 0 0 2.5 6H1v16h2.5v-6H6v6h2.5v-6H9v6h2.5v-6H12v6h2.5v-6H15v6h2.5v-6H18v6h2z" />
                                            </svg>
                                            {conta.secretaria}
                                        </span>
                                        <button className="view-project-btn">Autorizar</button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {activeTab === 'controladoria' && (
                    <div className="analytics-content">
                        <h2>
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" style={{ marginRight: '8px', verticalAlign: 'middle' }}>
                                <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z" />
                            </svg>
                            Controladoria AI
                        </h2>
                        <div className="analytics-placeholder">
                            <div className="placeholder-content">
                                <h3>
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" style={{ marginRight: '8px', verticalAlign: 'middle' }}>
                                        <path d="M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z" />
                                    </svg>
                                    Auditoria e Conformidade
                                </h3>
                                <p>Sistema de auditoria automatizada e geração de pareceres técnicos com IA.</p>
                                <div className="placeholder-charts">
                                    <div className="chart-placeholder">
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" style={{ marginRight: '8px', verticalAlign: 'middle' }}>
                                            <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z" />
                                        </svg>
                                        Pareceres Técnicos
                                    </div>
                                    <div className="chart-placeholder">
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" style={{ marginRight: '8px', verticalAlign: 'middle' }}>
                                            <path d="M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z" />
                                        </svg>
                                        Auditoria LRF
                                    </div>
                                    <div className="chart-placeholder">
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" style={{ marginRight: '8px', verticalAlign: 'middle' }}>
                                            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                                        </svg>
                                        Conformidade TCM
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === 'relatorios' && (
                    <div className="settings-content">
                        <h2>
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" style={{ marginRight: '8px', verticalAlign: 'middle' }}>
                                <path d="M19.14,12.94c0.04-0.3,0.06-0.61,0.06-0.94c0-0.32-0.02-0.64-0.07-0.94l2.03-1.58c0.18-0.14,0.23-0.41,0.12-0.61 l-1.92-3.32c-0.12-0.22-0.37-0.29-0.59-0.22l-2.39,0.96c-0.5-0.38-1.03-0.7-1.62-0.94L14.4,2.81c-0.04-0.24-0.24-0.41-0.48-0.41 h-3.84c-0.24,0-0.43,0.17-0.47,0.41L9.25,5.35C8.66,5.59,8.12,5.92,7.63,6.29L5.24,5.33c-0.22-0.08-0.47,0-0.59,0.22L2.74,8.87 C2.62,9.08,2.66,9.34,2.86,9.48l2.03,1.58C4.84,11.36,4.82,11.69,4.82,12s0.02,0.64,0.07,0.94l-2.03,1.58 c-0.18,0.14-0.23,0.41-0.12,0.61l1.92,3.32c0.12,0.22,0.37,0.29,0.59,0.22l2.39-0.96c0.5,0.38,1.03,0.7,1.62,0.94l0.36,2.54 c0.05,0.24,0.24,0.41,0.48,0.41h3.84c0.24,0,0.44-0.17,0.47-0.41l0.36-2.54c0.59-0.24,1.13-0.56,1.62-0.94l2.39,0.96 c0.22,0.08,0.47,0,0.59-0.22l1.92-3.32c0.12-0.22,0.07-0.47-0.12-0.61L19.14,12.94z M12,15.6c-1.98,0-3.6-1.62-3.6-3.6 s1.62-3.6,3.6-3.6s3.6,1.62,3.6,3.6S13.98,15.6,12,15.6z" />
                            </svg>
                            Relatórios
                        </h2>
                        <div className="settings-sections">
                            <div className="settings-section">
                                <h3>
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" style={{ marginRight: '8px', verticalAlign: 'middle' }}>
                                        <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                                    </svg>
                                    Perfil
                                </h3>
                                <div className="setting-item">
                                    <label>Nome</label>
                                    <input type="text" defaultValue="João Silva" />
                                </div>
                                <div className="setting-item">
                                    <label>Email</label>
                                    <input type="email" defaultValue={userEmail || 'usuario@exemplo.com'} />
                                </div>
                                <div className="setting-item">
                                    <label>Telefone</label>
                                    <input type="tel" defaultValue="(11) 99999-9999" />
                                </div>
                            </div>
                            <div className="settings-section">
                                <h3>
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" style={{ marginRight: '8px', verticalAlign: 'middle' }}>
                                        <path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.89 2 2 2zm6-6v-5c0-3.07-1.64-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.63 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2z" />
                                    </svg>
                                    Notificações
                                </h3>
                                <div className="setting-item">
                                    <label>
                                        <input type="checkbox" defaultChecked />
                                        Receber notificações por email
                                    </label>
                                </div>
                                <div className="setting-item">
                                    <label>
                                        <input type="checkbox" defaultChecked />
                                        Notificações de projetos
                                    </label>
                                </div>
                                <div className="setting-item">
                                    <label>
                                        <input type="checkbox" />
                                        Notificações de marketing
                                    </label>
                                </div>
                            </div>
                            <div className="settings-section">
                                <h3>
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" style={{ marginRight: '8px', verticalAlign: 'middle' }}>
                                        <path d="M12 3c-4.97 0-9 4.03-9 9s4.03 9 9 9c.83 0 1.5-.67 1.5-1.5 0-.39-.15-.74-.39-1.01-.23-.26-.38-.61-.38-.99 0-.83.67-1.5 1.5-1.5H16c2.76 0 5-2.24 5-5 0-4.42-4.03-8-9-8zm-5.5 9c-.83 0-1.5-.67-1.5-1.5S5.67 9 6.5 9 8 9.67 8 10.5 7.33 12 6.5 12zm3-4C8.67 8 8 7.33 8 6.5S8.67 5 9.5 5s1.5.67 1.5 1.5S10.33 8 9.5 8zm5 0c-.83 0-1.5-.67-1.5-1.5S13.67 5 14.5 5s1.5.67 1.5 1.5S15.33 8 14.5 8zm3 4c-.83 0-1.5-.67-1.5-1.5S16.67 9 17.5 9s1.5.67 1.5 1.5-.67 1.5-1.5 1.5z" />
                                    </svg>
                                    Aparência
                                </h3>
                                <div className="setting-item">
                                    <label>Tema</label>
                                    <select>
                                        <option>Claro</option>
                                        <option>Escuro</option>
                                        <option>Automático</option>
                                    </select>
                                </div>
                                <div className="setting-item">
                                    <label>Idioma</label>
                                    <select>
                                        <option>Português</option>
                                        <option>English</option>
                                        <option>Español</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div className="settings-actions">
                            <button className="save-btn">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" style={{ marginRight: '4px' }}>
                                    <path d="M17 3H5c-1.11 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V7l-4-4zm-5 16c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3zm3-10H5V5h10v4z" />
                                </svg>
                                Salvar Alterações
                            </button>
                            <button className="reset-btn">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" style={{ marginRight: '4px' }}>
                                    <path d="M17.65 6.35C16.2 4.9 14.21 4 12 4c-4.42 0-7.99 3.58-7.99 8s3.57 8 7.99 8c3.73 0 6.84-2.55 7.73-6h-2.08c-.82 2.33-3.04 4-5.65 4-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z" />
                                </svg>
                                Restaurar Padrões
                            </button>
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
};

export default Dashboard;

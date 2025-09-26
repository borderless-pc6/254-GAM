import React, { useState } from 'react';
import './Dashboard.css';

interface ContasPagarPageProps {
    onLogout: () => void;
    userEmail?: string;
    onPageChange: (page: string) => void;
}

interface PayableAccount {
    id: number;
    description: string;
    supplier: string;
    amount: number;
    dueDate: string;
    category: string;
    status: 'pending' | 'approved' | 'paid' | 'overdue';
    createdAt: string;
    approvedBy?: string;
    approvedAt?: string;
}

const ContasPagarPage: React.FC<ContasPagarPageProps> = ({ onLogout, userEmail, onPageChange }) => {
    const [activeTab, setActiveTab] = useState('list');
    const [payableAccounts, setPayableAccounts] = useState<PayableAccount[]>([
        {
            id: 1,
            description: 'Material de limpeza - Secretaria de Saúde',
            supplier: 'Limpeza Total Ltda',
            amount: 2500.00,
            dueDate: '2025-01-20',
            category: 'Material de Consumo',
            status: 'pending',
            createdAt: '15/01/2025'
        },
        {
            id: 2,
            description: 'Manutenção de equipamentos de informática',
            supplier: 'Tech Solutions',
            amount: 8500.00,
            dueDate: '2025-01-18',
            category: 'Serviços',
            status: 'overdue',
            createdAt: '10/01/2025'
        },
        {
            id: 3,
            description: 'Combustível para frota municipal',
            supplier: 'Posto Central',
            amount: 12000.00,
            dueDate: '2025-01-25',
            category: 'Combustível',
            status: 'approved',
            createdAt: '12/01/2025',
            approvedBy: 'João Silva',
            approvedAt: '15/01/2025'
        }
    ]);

    const [formData, setFormData] = useState({
        description: '',
        supplier: '',
        amount: 0,
        dueDate: '',
        category: 'Material de Consumo'
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: name === 'amount' ? parseFloat(value) || 0 : value
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const newPayable: PayableAccount = {
            id: payableAccounts.length + 1,
            description: formData.description,
            supplier: formData.supplier,
            amount: formData.amount,
            dueDate: formData.dueDate,
            category: formData.category,
            status: 'pending',
            createdAt: new Date().toLocaleDateString('pt-BR')
        };

        setPayableAccounts(prev => [...prev, newPayable]);
        setFormData({
            description: '',
            supplier: '',
            amount: 0,
            dueDate: '',
            category: 'Material de Consumo'
        });
        setActiveTab('list');
    };

    const getStatusBadge = (status: string) => {
        switch (status) {
            case 'pending':
                return (
                    <span className="status-badge status-pending">
                        <svg className="h-3 w-3 mr-1" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z" />
                        </svg>
                        Pendente
                    </span>
                );
            case 'approved':
                return (
                    <span className="status-badge status-processed">
                        <svg className="h-3 w-3 mr-1" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                        </svg>
                        Aprovada
                    </span>
                );
            case 'paid':
                return (
                    <span className="status-badge status-processed">
                        <svg className="h-3 w-3 mr-1" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                        </svg>
                        Paga
                    </span>
                );
            case 'overdue':
                return (
                    <span className="status-badge status-processing">
                        <svg className="h-3 w-3 mr-1" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z" />
                        </svg>
                        Vencida
                    </span>
                );
            default:
                return <span className="status-badge status-pending">Desconhecido</span>;
        }
    };

    const getUrgencyClass = (dueDate: string, status: string) => {
        if (status === 'overdue') return 'border-red-200 bg-red-50';
        if (status === 'paid') return 'border-green-200 bg-green-50';

        const today = new Date();
        const due = new Date(dueDate);
        const daysUntilDue = Math.ceil((due.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));

        if (daysUntilDue <= 3) return 'border-yellow-200 bg-yellow-50';
        if (daysUntilDue <= 7) return 'border-orange-200 bg-orange-50';

        return 'border-gray-200 bg-white';
    };

    const totalAmount = payableAccounts.reduce((sum, account) => sum + account.amount, 0);
    const pendingAmount = payableAccounts.filter(acc => acc.status === 'pending').reduce((sum, account) => sum + account.amount, 0);
    const overdueAmount = payableAccounts.filter(acc => acc.status === 'overdue').reduce((sum, account) => sum + account.amount, 0);
    const urgentCount = payableAccounts.filter(acc => {
        if (acc.status === 'overdue') return true;
        const today = new Date();
        const due = new Date(acc.dueDate);
        const daysUntilDue = Math.ceil((due.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
        return daysUntilDue <= 3;
    }).length;

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
                            <button className="nav-item active">
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
                            <h1>Contas a Pagar</h1>
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
                                    <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z" />
                                </svg>
                            </div>
                            <div className="stat-content">
                                <h3>R$ {totalAmount.toLocaleString()}</h3>
                                <p>Total a Pagar</p>
                                <span className="stat-change warning">
                                    <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M7 14l5-5 5 5z" />
                                    </svg>
                                    {payableAccounts.length} contas
                                </span>
                            </div>
                        </div>
                        <div className="stat-card">
                            <div className="stat-icon">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z" />
                                </svg>
                            </div>
                            <div className="stat-content">
                                <h3>R$ {pendingAmount.toLocaleString()}</h3>
                                <p>Pendentes</p>
                                <span className="stat-change warning">
                                    <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M7 14l5-5 5 5z" />
                                    </svg>
                                    Aguardando aprovação
                                </span>
                            </div>
                        </div>
                        <div className="stat-card">
                            <div className="stat-icon">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z" />
                                </svg>
                            </div>
                            <div className="stat-content">
                                <h3>{urgentCount}</h3>
                                <p>Urgentes</p>
                                <span className="stat-change warning">
                                    <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M7 14l5-5 5 5z" />
                                    </svg>
                                    Vencendo em 3 dias
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
                                <h3>R$ {overdueAmount.toLocaleString()}</h3>
                                <p>Vencidas</p>
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

                {/* Main Content Area */}
                <div className="container mx-auto px-6 py-8">
                    {/* Tabs Navigation */}
                    <div className="mb-8">
                        <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg">
                            <button
                                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${activeTab === 'list'
                                    ? 'bg-white text-green-600 shadow-sm'
                                    : 'text-gray-600 hover:text-gray-900'
                                    }`}
                                onClick={() => setActiveTab('list')}
                            >
                                Lista de Contas
                            </button>
                            <button
                                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${activeTab === 'add'
                                    ? 'bg-white text-green-600 shadow-sm'
                                    : 'text-gray-600 hover:text-gray-900'
                                    }`}
                                onClick={() => setActiveTab('add')}
                            >
                                Nova Conta a Pagar
                            </button>
                        </div>
                    </div>

                    {/* Tab Content */}
                    {activeTab === 'list' && (
                        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                            <div className="p-6 border-b border-gray-200">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <h3 className="text-lg font-semibold text-gray-900">Contas a Pagar</h3>
                                        <p className="text-sm text-gray-500">Gerencie as contas a pagar da prefeitura</p>
                                    </div>
                                    <button
                                        onClick={() => setActiveTab('add')}
                                        className="bg-green-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-green-700 transition-colors flex items-center"
                                    >
                                        <svg className="h-4 w-4 mr-2" viewBox="0 0 24 24" fill="currentColor">
                                            <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" />
                                        </svg>
                                        Nova Conta
                                    </button>
                                </div>
                            </div>
                            <div className="p-6">
                                <div className="space-y-4">
                                    {payableAccounts.map((account) => (
                                        <div key={account.id} className={`p-4 border rounded-lg hover:shadow-md transition-shadow ${getUrgencyClass(account.dueDate, account.status)}`}>
                                            <div className="flex items-center justify-between">
                                                <div className="flex-1">
                                                    <div className="flex items-center gap-3 mb-2">
                                                        <h4 className="font-medium text-lg">{account.description}</h4>
                                                        {getStatusBadge(account.status)}
                                                    </div>
                                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-600 mb-3">
                                                        <div>
                                                            <span className="font-medium">Fornecedor:</span>
                                                            <div>{account.supplier}</div>
                                                        </div>
                                                        <div>
                                                            <span className="font-medium">Categoria:</span>
                                                            <div>{account.category}</div>
                                                        </div>
                                                        <div>
                                                            <span className="font-medium">Vencimento:</span>
                                                            <div>{new Date(account.dueDate).toLocaleDateString('pt-BR')}</div>
                                                        </div>
                                                        <div>
                                                            <span className="font-medium">Criada em:</span>
                                                            <div>{account.createdAt}</div>
                                                        </div>
                                                    </div>
                                                    <div className="flex items-center justify-between">
                                                        <div className="text-lg font-bold text-gray-900">
                                                            Valor: R$ {account.amount.toLocaleString()}
                                                        </div>
                                                        {account.approvedBy && (
                                                            <div className="text-xs text-gray-500">
                                                                Aprovada por: {account.approvedBy} em {account.approvedAt}
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                                <div className="flex gap-2 ml-4">
                                                    <button className="btn-outline">
                                                        <svg className="h-4 w-4 mr-2" viewBox="0 0 24 24" fill="currentColor">
                                                            <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z" />
                                                        </svg>
                                                        Ver
                                                    </button>
                                                    {account.status === 'pending' && (
                                                        <button className="btn-primary">
                                                            <svg className="h-4 w-4 mr-2" viewBox="0 0 24 24" fill="currentColor">
                                                                <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                                                            </svg>
                                                            Aprovar
                                                        </button>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'add' && (
                        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                            <div className="p-6 border-b border-gray-200">
                                <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                                    <svg className="h-5 w-5 mr-2 text-green-600" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" />
                                    </svg>
                                    Cadastrar Nova Conta a Pagar
                                </h3>
                                <p className="text-sm text-gray-500 mt-1">Preencha os dados da conta a pagar</p>
                            </div>
                            <form onSubmit={handleSubmit} className="p-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="md:col-span-2">
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Descrição</label>
                                        <textarea
                                            name="description"
                                            value={formData.description}
                                            onChange={handleInputChange}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                                            placeholder="Descreva o que está sendo adquirido ou o serviço contratado..."
                                            rows={3}
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Fornecedor</label>
                                        <input
                                            type="text"
                                            name="supplier"
                                            value={formData.supplier}
                                            onChange={handleInputChange}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                                            placeholder="Nome da empresa fornecedora"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Valor</label>
                                        <input
                                            type="number"
                                            name="amount"
                                            value={formData.amount}
                                            onChange={handleInputChange}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                                            placeholder="0,00"
                                            step="0.01"
                                            min="0"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Data de Vencimento</label>
                                        <input
                                            type="date"
                                            name="dueDate"
                                            value={formData.dueDate}
                                            onChange={handleInputChange}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Categoria</label>
                                        <select
                                            name="category"
                                            value={formData.category}
                                            onChange={handleInputChange}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                                        >
                                            <option value="Material de Consumo">Material de Consumo</option>
                                            <option value="Serviços">Serviços</option>
                                            <option value="Combustível">Combustível</option>
                                            <option value="Manutenção">Manutenção</option>
                                            <option value="Equipamentos">Equipamentos</option>
                                            <option value="Outros">Outros</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="mt-8 flex justify-end gap-4">
                                    <button
                                        type="button"
                                        onClick={() => setActiveTab('list')}
                                        className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
                                    >
                                        Cancelar
                                    </button>
                                    <button
                                        type="submit"
                                        className="bg-green-600 text-white px-6 py-2 rounded-md font-medium hover:bg-green-700 transition-colors flex items-center"
                                    >
                                        <svg className="h-4 w-4 mr-2" viewBox="0 0 24 24" fill="currentColor">
                                            <path d="M17 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V7l-4-4zm-5 16c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3zm3-10H5V5h10v4z" />
                                        </svg>
                                        Cadastrar Conta
                                    </button>
                                </div>
                            </form>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
};

export default ContasPagarPage;

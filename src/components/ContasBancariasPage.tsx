import React, { useState } from 'react';
import './Dashboard.css';

interface ContasBancariasPageProps {
    onLogout: () => void;
    userEmail?: string;
    onPageChange: (page: string) => void;
}

interface BankAccount {
    id: number;
    name: string;
    bank: string;
    accountNumber: string;
    agency: string;
    accountType: string;
    balance: number;
    status: 'active' | 'inactive';
    createdAt: string;
}

const ContasBancariasPage: React.FC<ContasBancariasPageProps> = ({ onLogout, userEmail, onPageChange }) => {
    const [activeTab, setActiveTab] = useState('list');
    const [bankAccounts, setBankAccounts] = useState<BankAccount[]>([
        {
            id: 1,
            name: 'Aplicação CDB',
            bank: 'Caixa Econômica Federal',
            accountNumber: '12345-6',
            agency: '1234',
            accountType: 'Aplicação',
            balance: 890450,
            status: 'active',
            createdAt: '15/01/2025'
        },
        {
            id: 2,
            name: 'Fundo de Saúde',
            bank: 'Banco do Brasil',
            accountNumber: '98765-4',
            agency: '5678',
            accountType: 'Conta Corrente',
            balance: 711220,
            status: 'active',
            createdAt: '10/01/2025'
        }
    ]);

    const [formData, setFormData] = useState({
        name: '',
        bank: '',
        accountNumber: '',
        agency: '',
        accountType: 'Conta Corrente',
        initialBalance: 0
    });

    const [showForm, setShowForm] = useState(false);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: name === 'initialBalance' ? parseFloat(value) || 0 : value
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const newAccount: BankAccount = {
            id: bankAccounts.length + 1,
            name: formData.name,
            bank: formData.bank,
            accountNumber: formData.accountNumber,
            agency: formData.agency,
            accountType: formData.accountType,
            balance: formData.initialBalance,
            status: 'active',
            createdAt: new Date().toLocaleDateString('pt-BR')
        };

        setBankAccounts(prev => [...prev, newAccount]);
        setFormData({
            name: '',
            bank: '',
            accountNumber: '',
            agency: '',
            accountType: 'Conta Corrente',
            initialBalance: 0
        });
        setShowForm(false);
    };

    const getStatusBadge = (status: string) => {
        return status === 'active' ? (
            <span className="status-badge status-processed">
                <svg className="h-3 w-3 mr-1" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12,20A8,8 0 0,0 20,12A8,8 0 0,0 12,4A8,8 0 0,0 4,12A8,8 0 0,0 12,20M12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22C6.47,22 2,17.5 2,12A10,10 0 0,1 12,2M15.5,8L10,13.5L8.5,12L7,13.5L10,16.5L17,9.5L15.5,8Z" />
                </svg>
                Ativa
            </span>
        ) : (
            <span className="status-badge status-pending">
                <svg className="h-3 w-3 mr-1" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z" />
                </svg>
                Inativa
            </span>
        );
    };

    const totalBalance = bankAccounts.reduce((sum, account) => sum + account.balance, 0);

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
                            <button className="nav-item active">
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
                            <h1>Contas Bancárias</h1>
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
                                <h3>R$ {totalBalance.toLocaleString()}</h3>
                                <p>Saldo Total</p>
                                <span className="stat-change positive">
                                    <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M7 14l5-5 5 5z" />
                                    </svg>
                                    Consolidado
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
                                <h3>{bankAccounts.length}</h3>
                                <p>Contas Cadastradas</p>
                                <span className="stat-change positive">
                                    <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                                    </svg>
                                    Ativas
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
                                <h3>{bankAccounts.filter(acc => acc.status === 'active').length}</h3>
                                <p>Contas Ativas</p>
                                <span className="stat-change positive">
                                    <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                                    </svg>
                                    Operacionais
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
                                <h3>100%</h3>
                                <p>Conformidade</p>
                                <span className="stat-change positive">
                                    <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                                    </svg>
                                    TCM
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
                                Nova Conta
                            </button>
                        </div>
                    </div>

                    {/* Tab Content */}
                    {activeTab === 'list' && (
                        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                            <div className="p-6 border-b border-gray-200">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <h3 className="text-lg font-semibold text-gray-900">Contas Bancárias Cadastradas</h3>
                                        <p className="text-sm text-gray-500">Gerencie as contas bancárias da prefeitura</p>
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
                                    {bankAccounts.map((account) => (
                                        <div key={account.id} className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
                                            <div className="flex items-center justify-between">
                                                <div className="flex-1">
                                                    <div className="flex items-center gap-3 mb-2">
                                                        <h4 className="font-medium text-lg">{account.name}</h4>
                                                        {getStatusBadge(account.status)}
                                                    </div>
                                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-600">
                                                        <div>
                                                            <span className="font-medium">Banco:</span>
                                                            <div>{account.bank}</div>
                                                        </div>
                                                        <div>
                                                            <span className="font-medium">Agência:</span>
                                                            <div>{account.agency}</div>
                                                        </div>
                                                        <div>
                                                            <span className="font-medium">Conta:</span>
                                                            <div>{account.accountNumber}</div>
                                                        </div>
                                                        <div>
                                                            <span className="font-medium">Tipo:</span>
                                                            <div>{account.accountType}</div>
                                                        </div>
                                                    </div>
                                                    <div className="mt-3 flex items-center justify-between">
                                                        <div className="text-lg font-bold text-green-600">
                                                            Saldo: R$ {account.balance.toLocaleString()}
                                                        </div>
                                                        <div className="text-xs text-gray-500">
                                                            Cadastrada em: {account.createdAt}
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="flex gap-2 ml-4">
                                                    <button className="btn-outline">
                                                        <svg className="h-4 w-4 mr-2" viewBox="0 0 24 24" fill="currentColor">
                                                            <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z" />
                                                        </svg>
                                                        Ver
                                                    </button>
                                                    <button className="btn-outline">
                                                        <svg className="h-4 w-4 mr-2" viewBox="0 0 24 24" fill="currentColor">
                                                            <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z" />
                                                        </svg>
                                                        Editar
                                                    </button>
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
                                    Cadastrar Nova Conta Bancária
                                </h3>
                                <p className="text-sm text-gray-500 mt-1">Preencha os dados da conta bancária</p>
                            </div>
                            <form onSubmit={handleSubmit} className="p-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Nome da Conta</label>
                                        <input
                                            type="text"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleInputChange}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                                            placeholder="Ex: Conta Principal, Fundo de Saúde..."
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Banco</label>
                                        <input
                                            type="text"
                                            name="bank"
                                            value={formData.bank}
                                            onChange={handleInputChange}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                                            placeholder="Ex: Caixa Econômica Federal"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Agência</label>
                                        <input
                                            type="text"
                                            name="agency"
                                            value={formData.agency}
                                            onChange={handleInputChange}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                                            placeholder="Ex: 1234"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Número da Conta</label>
                                        <input
                                            type="text"
                                            name="accountNumber"
                                            value={formData.accountNumber}
                                            onChange={handleInputChange}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                                            placeholder="Ex: 12345-6"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Tipo de Conta</label>
                                        <select
                                            name="accountType"
                                            value={formData.accountType}
                                            onChange={handleInputChange}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                                        >
                                            <option value="Conta Corrente">Conta Corrente</option>
                                            <option value="Conta Poupança">Conta Poupança</option>
                                            <option value="Aplicação">Aplicação</option>
                                            <option value="Fundo">Fundo</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Saldo Inicial</label>
                                        <input
                                            type="number"
                                            name="initialBalance"
                                            value={formData.initialBalance}
                                            onChange={handleInputChange}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                                            placeholder="0,00"
                                            step="0.01"
                                            min="0"
                                        />
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

export default ContasBancariasPage;

"use client"

import type React from "react"
import { useState } from "react"
import './DocumentosPage.css'

interface DocumentosPageProps {
    onLogout: () => void;
    userEmail?: string;
    onPageChange: (page: string) => void;
}

export default function DocumentosPage({ onLogout, userEmail, onPageChange }: DocumentosPageProps) {
    const [dragActive, setDragActive] = useState(false)
    const [uploadedFiles, setUploadedFiles] = useState([
        {
            id: 1,
            name: "nota_fiscal_001.pdf",
            type: "Nota Fiscal",
            status: "processed",
            extractedData: {
                valor: "R$ 2.450,00",
                fornecedor: "Papelaria Central Ltda",
                data: "15/01/2025",
            },
            uploadDate: "15/01/2025 14:30",
        },
        {
            id: 2,
            name: "empenho_saude_002.pdf",
            type: "Empenho",
            status: "processing",
            uploadDate: "15/01/2025 15:45",
        },
        {
            id: 3,
            name: "contrato_limpeza.pdf",
            type: "Contrato",
            status: "pending",
            uploadDate: "15/01/2025 16:20",
        },
    ])

    const handleDrag = (e: React.DragEvent) => {
        e.preventDefault()
        e.stopPropagation()
        if (e.type === "dragenter" || e.type === "dragover") {
            setDragActive(true)
        } else if (e.type === "dragleave") {
            setDragActive(false)
        }
    }

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault()
        e.stopPropagation()
        setDragActive(false)
        // Handle file drop logic here
    }

    const getStatusBadge = (status: string) => {
        switch (status) {
            case "processed":
                return (
                    <span className="status-badge status-processed">
                        <svg className="h-3 w-3 mr-1" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                        </svg>
                        Processado
                    </span>
                )
            case "processing":
                return (
                    <span className="status-badge status-processing">
                        <svg className="h-3 w-3 mr-1" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                        </svg>
                        Processando
                    </span>
                )
            case "pending":
                return (
                    <span className="status-badge status-pending">
                        <svg className="h-3 w-3 mr-1" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z" />
                        </svg>
                        Pendente
                    </span>
                )
            default:
                return <span className="status-badge status-pending">Desconhecido</span>
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
                            <button className="nav-item active">
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
                            <h1>Documentos</h1>
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

                <div className="documentos-container">
                    <div className="documentos-grid">
                        {/* Upload Section */}
                        <div className="documentos-main">
                            {/* Upload Area */}
                            <div className="documentos-card">
                                <div className="card-header">
                                    <h3 className="flex items-center gap-2">
                                        <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                                            <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z" />
                                        </svg>
                                        Enviar Documentos
                                    </h3>
                                    <p>Faça upload de PDFs, imagens ou planilhas para processamento automático</p>
                                </div>
                                <div className="card-content">
                                    <div
                                        className={`upload-area ${dragActive ? 'drag-active' : ''}`}
                                        onDragEnter={handleDrag}
                                        onDragLeave={handleDrag}
                                        onDragOver={handleDrag}
                                        onDrop={handleDrop}
                                    >
                                        <svg className="h-12 w-12 text-muted-foreground mx-auto mb-4" viewBox="0 0 24 24" fill="currentColor">
                                            <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z" />
                                        </svg>
                                        <h3 className="text-lg font-medium mb-2">Arraste arquivos aqui</h3>
                                        <p className="text-muted-foreground mb-4">ou clique para selecionar arquivos</p>
                                        <button className="btn-primary">Selecionar Arquivos</button>
                                        <p className="text-xs text-muted-foreground mt-4">
                                            Formatos aceitos: PDF, JPG, PNG, XLSX (máx. 10MB por arquivo)
                                        </p>
                                    </div>

                                    {/* Upload Form */}
                                    <div className="mt-6 space-y-4">
                                        <div className="form-grid">
                                            <div>
                                                <label htmlFor="document-type">Tipo de Documento</label>
                                                <select id="document-type" className="form-select">
                                                    <option value="">Selecione o tipo</option>
                                                    <option value="nota-fiscal">Nota Fiscal</option>
                                                    <option value="empenho">Empenho</option>
                                                    <option value="contrato">Contrato</option>
                                                    <option value="recibo">Recibo</option>
                                                    <option value="extrato">Extrato Bancário</option>
                                                    <option value="outros">Outros</option>
                                                </select>
                                            </div>
                                            <div>
                                                <label htmlFor="department">Secretaria</label>
                                                <select id="department" className="form-select">
                                                    <option value="">Selecione a secretaria</option>
                                                    <option value="financas">Finanças</option>
                                                    <option value="saude">Saúde</option>
                                                    <option value="educacao">Educação</option>
                                                    <option value="obras">Obras</option>
                                                    <option value="administracao">Administração</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div>
                                            <label htmlFor="description">Descrição (Opcional)</label>
                                            <textarea
                                                id="description"
                                                placeholder="Adicione uma descrição ou observações sobre o documento..."
                                                className="form-textarea"
                                                rows={3}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Processing Status */}
                            <div className="documentos-card">
                                <div className="card-header">
                                    <h3>Status de Processamento</h3>
                                    <p>Acompanhe o progresso da extração de dados dos documentos</p>
                                </div>
                                <div className="card-content">
                                    <div className="space-y-4">
                                        <div className="flex items-center justify-between">
                                            <span className="text-sm font-medium">Documentos na fila</span>
                                            <span className="text-sm text-muted-foreground">2 de 5</span>
                                        </div>
                                        <div className="progress-container">
                                            <div className="progress-bar">
                                                <div className="progress-fill" style={{ width: '40%' }}></div>
                                            </div>
                                        </div>

                                        <div className="stats-grid">
                                            <div className="stat-item">
                                                <div className="stat-number">15</div>
                                                <div className="stat-label">Processados</div>
                                            </div>
                                            <div className="stat-item">
                                                <div className="stat-number">2</div>
                                                <div className="stat-label">Em andamento</div>
                                            </div>
                                            <div className="stat-item">
                                                <div className="stat-number">1</div>
                                                <div className="stat-label">Pendentes</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Right Sidebar */}
                        <div className="documentos-sidebar">
                            {/* Quick Stats */}
                            <div className="documentos-card">
                                <div className="card-header">
                                    <h3>Estatísticas</h3>
                                </div>
                                <div className="card-content">
                                    <div className="space-y-4">
                                        <div className="flex justify-between">
                                            <span className="text-sm">Hoje</span>
                                            <span className="font-medium">8 documentos</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-sm">Esta semana</span>
                                            <span className="font-medium">47 documentos</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-sm">Este mês</span>
                                            <span className="font-medium">189 documentos</span>
                                        </div>
                                        <div className="pt-2 border-t">
                                            <div className="flex justify-between">
                                                <span className="text-sm">Precisão da IA</span>
                                                <span className="font-medium text-primary">94.2%</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Recent AI Extractions */}
                            <div className="documentos-card">
                                <div className="card-header">
                                    <h3>Extrações Recentes</h3>
                                </div>
                                <div className="card-content">
                                    <div className="space-y-3">
                                        <div className="p-3 border rounded-lg">
                                            <div className="flex items-center justify-between mb-2">
                                                <span className="text-sm font-medium">Nota Fiscal #001</span>
                                                <span className="status-badge status-processing text-xs">
                                                    Validado
                                                </span>
                                            </div>
                                            <div className="text-xs text-muted-foreground space-y-1">
                                                <div>Valor: R$ 2.450,00</div>
                                                <div>Fornecedor: Papelaria Central</div>
                                            </div>
                                        </div>

                                        <div className="p-3 border rounded-lg">
                                            <div className="flex items-center justify-between mb-2">
                                                <span className="text-sm font-medium">Empenho #002</span>
                                                <span className="status-badge status-pending text-xs">
                                                    Revisão
                                                </span>
                                            </div>
                                            <div className="text-xs text-muted-foreground space-y-1">
                                                <div>Valor: R$ 15.800,00</div>
                                                <div>Secretaria: Saúde</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Documents List */}
                    <div className="mt-8">
                        <div className="documentos-card">
                            <div className="card-header">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <h3>Documentos Enviados</h3>
                                        <p>Histórico de documentos processados</p>
                                    </div>
                                    <div className="flex gap-2">
                                        <div className="relative">
                                            <svg className="h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" viewBox="0 0 24 24" fill="currentColor">
                                                <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
                                            </svg>
                                            <input placeholder="Buscar documentos..." className="form-input pl-9 w-64" />
                                        </div>
                                        <button className="btn-outline">
                                            <svg className="h-4 w-4 mr-2" viewBox="0 0 24 24" fill="currentColor">
                                                <path d="M10 18h4v-2h-4v2zM3 6v2h18V6H3zm3 7h12v-2H6v2z" />
                                            </svg>
                                            Filtros
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div className="card-content">
                                <div className="space-y-4">
                                    {uploadedFiles.map((file) => (
                                        <div
                                            key={file.id}
                                            className="document-item"
                                        >
                                            <div className="document-info">
                                                <svg className="h-8 w-8 text-muted-foreground" viewBox="0 0 24 24" fill="currentColor">
                                                    <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z" />
                                                </svg>
                                                <div className="document-details">
                                                    <h4>{file.name}</h4>
                                                    <p>
                                                        {file.type} • {file.uploadDate}
                                                    </p>
                                                    {file.extractedData && (
                                                        <div className="text-xs text-muted-foreground mt-1">
                                                            {file.extractedData.fornecedor} • {file.extractedData.valor}
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                            <div className="document-actions">
                                                {getStatusBadge(file.status)}
                                                <div className="flex gap-1">
                                                    <button className="btn-ghost">
                                                        <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                                                            <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z" />
                                                        </svg>
                                                    </button>
                                                    <button className="btn-ghost">
                                                        <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                                                            <path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z" />
                                                        </svg>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}
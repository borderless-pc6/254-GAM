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
        <div className="documentos-page">
            {/* Header */}
            <header className="documentos-header">
                <div className="container mx-auto px-6 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <button
                                className="btn-ghost mr-2"
                                onClick={() => onPageChange('dashboard')}
                            >
                                <svg className="h-4 w-4 mr-2" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z" />
                                </svg>
                                Voltar
                            </button>
                            <svg className="h-8 w-8 text-primary" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                            </svg>
                            <div>
                                <h1 className="text-2xl font-bold text-foreground">Gestão de Documentos</h1>
                                <p className="text-sm text-muted-foreground">Upload e processamento de documentos financeiros</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            <button className="btn-outline">
                                <svg className="h-4 w-4 mr-2" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z" />
                                </svg>
                                Exportar Relatório
                            </button>
                            <button className="btn-outline" onClick={onLogout}>
                                <svg className="h-4 w-4 mr-2" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M17 7l-1.41 1.41L18.17 11H8v2h10.17l-2.58 2.58L17 17l5-5zM4 5h8V3H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h8v-2H4V5z" />
                                </svg>
                                Sair
                            </button>
                        </div>
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
        </div>
    )
}
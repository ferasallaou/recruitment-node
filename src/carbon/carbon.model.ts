export type CarbonCertificate = {
    id: string
    country: string
    status: CertificateStatus
    owner: string
}


enum CertificateStatus {
    AVAILABLE = 'AVAILABLE',
    OWNED = 'OWNED',
    transfereed = 'transfereed'
}
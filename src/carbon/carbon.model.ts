export type CarbonCertificate = {
    id: string
    country: string
    status: CertificateStatus
    owner: string
}


export enum CertificateStatus {
    AVAILABLE = 'AVAILABLE',
    OWNED = 'OWNED',
    transfereed = 'TRANSFERRED'
}
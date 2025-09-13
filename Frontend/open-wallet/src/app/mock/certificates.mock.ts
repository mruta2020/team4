import {Certificate} from "../model/certificate.model";

export const CERTIFICATE_MOCK: Certificate[] = [
  {
    id: 'C001',
    name: 'Laurea Informatica UNIBO',
    state: 'Attivo',
    issuer: { id: 1, name: 'Università di Bologna' },
    issueDate: new Date('2023-07-15'),
    algorithm: 'RSA',
    version: '3.0',
    fingerprint: 'SHA256:abcdef1234567890',
    isVerified: true,
    verificationDate: new Date('2025-09-13')
  },
  {
    id: 'C002',
    name: 'Cert. Corso Angular',
    state: 'Attivo',
    issuer: { id: 2, name: 'Coursera' },
    issueDate: new Date('2024-01-10'),
    algorithm: 'ECDSA',
    version: '1.2',
    fingerprint: 'SHA256:123456abcdef7890',
    isVerified: true,
    verificationDate: new Date('2025-09-12')
  },
  {
    id: 'C003',
    name: 'Cert. UX Design',
    state: 'Revocato',
    issuer: { id: 3, name: 'Google UX' },
    issueDate: new Date('2023-11-05'),
    algorithm: 'RSA',
    version: '2.1',
    fingerprint: 'SHA256:fedcba0987654321',
    isVerified: false,
    verificationDate: new Date('2025-09-10')
  },
  {
    id: 'C004',
    name: 'Master in Data Science',
    state: 'Attivo',
    issuer: { id: 4, name: 'Politecnico di Milano' },
    issueDate: new Date('2022-09-20'),
    algorithm: 'ECDSA',
    version: '1.0',
    fingerprint: 'SHA256:1122334455667788',
    isVerified: true,
    verificationDate: new Date('2025-09-08')
  },
  {
    id: 'C005',
    name: 'Cert. Blockchain Basics',
    state: 'Attivo',
    issuer: { id: 5, name: 'IBM SkillsBuild' },
    issueDate: new Date('2024-05-18'),
    algorithm: 'RSA',
    version: '3.0',
    fingerprint: 'SHA256:9988776655443322',
    isVerified: true,
    verificationDate: new Date('2025-09-06')
  },
  {
    id: 'C006',
    name: 'Cert. AI Fundamentals',
    state: 'Attivo',
    issuer: { id: 6, name: 'Microsoft Learn' },
    issueDate: new Date('2024-03-22'),
    algorithm: 'ECDSA',
    version: '2.0',
    fingerprint: 'SHA256:556677889900aabb',
    isVerified: true,
    verificationDate: new Date('2025-09-04')
  },
  {
    id: 'C007',
    name: 'Corso UX Avanzato',
    state: 'Attivo',
    issuer: { id: 3, name: 'Google UX' },
    issueDate: new Date('2023-12-01'),
    algorithm: 'RSA',
    version: '2.1',
    fingerprint: 'SHA256:aa1122bb3344cc55',
    isVerified: true,
    verificationDate: new Date('2025-09-03')
  },
  {
    id: 'C008',
    name: 'Cert. DevOps Essentials',
    state: 'Attivo',
    issuer: { id: 7, name: 'AWS Training' },
    issueDate: new Date('2024-06-15'),
    algorithm: 'ECDSA',
    version: '1.1',
    fingerprint: 'SHA256:bb2233cc4455dd66',
    isVerified: true,
    verificationDate: new Date('2025-09-02')
  },
  {
    id: 'C009',
    name: 'Corso Machine Learning',
    state: 'Revocato',
    issuer: { id: 4, name: 'Politecnico di Milano' },
    issueDate: new Date('2023-10-10'),
    algorithm: 'RSA',
    version: '1.0',
    fingerprint: 'SHA256:cc3344dd5566ee77',
    isVerified: false,
    verificationDate: new Date('2025-09-01')
  },
  {
    id: 'C010',
    name: 'Cert. Cloud Computing',
    state: 'Attivo',
    issuer: { id: 7, name: 'AWS Training' },
    issueDate: new Date('2024-08-05'),
    algorithm: 'ECDSA',
    version: '1.2',
    fingerprint: 'SHA256:dd4455ee6677ff88',
    isVerified: true,
    verificationDate: new Date('2025-08-30')
  }
];

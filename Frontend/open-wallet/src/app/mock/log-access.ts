import {LogAccess} from "../model/log-access.model";

export const MOCK_LOGS_ACCESS: LogAccess[] = [
  {
    id: 1,
    date: new Date('2025-09-13T14:32:00'),
    user: 'Me',
    accessType: 'Visualizzazione',
    ip: '192.168.1.10',
    certificate: {
      id: 'C001',
      name: 'Laurea Informatica UNIBO',
      state: 'Attivo',
      issuer: { id: 1, name: 'Università di Bologna' }
    },
    status: 'verified',
    location: 'Bologna, IT'
  },
  {
    id: 2,
    date: new Date('2025-09-12T18:05:00'),
    user: 'Esterno: ACME HR',
    accessType: 'Verifica credenziale',
    ip: '203.45.22.11',
    certificate: {
      id: 'C001',
      name: 'Laurea Informatica UNIBO',
      state: 'Attivo',
      issuer: { id: 1, name: 'Università di Bologna' }
    },
    status: 'verified',
    location: 'Milano, IT'
  },
  {
    id: 3,
    date: new Date('2025-09-11T09:22:00'),
    user: 'Esterno: Mario Rossi',
    accessType: 'Download',
    ip: '88.74.22.98',
    certificate: {
      id: 'C002',
      name: 'Cert. Corso Angular',
      state: 'Attivo',
      issuer: { id: 2, name: 'Coursera' }
    },
    status: 'not-verified',
    location: 'Roma, IT'
  },
  {
    id: 4,
    date: new Date('2025-09-10T22:14:00'),
    user: 'Me',
    accessType: 'Condivisione link',
    ip: '192.168.1.11',
    certificate: {
      id: 'C003',
      name: 'Cert. UX Design',
      state: 'Attivo',
      issuer: { id: 3, name: 'Google UX' }
    },
    status: 'verified',
    location: 'Bologna, IT'
  },
  {
    id: 5,
    date: new Date('2025-09-09T16:47:00'),
    user: 'Esterno: HR Dept',
    accessType: 'Visualizzazione',
    ip: '203.90.15.45',
    certificate: {
      id: 'C001',
      name: 'Laurea Informatica UNIBO',
      state: 'Attivo',
      issuer: { id: 1, name: 'Università di Bologna' }
    },
    status: 'verified',
    location: 'Berlino, DE'
  },
  {
    id: 6,
    date: new Date('2025-09-08T12:30:00'),
    user: 'Me',
    accessType: 'Visualizzazione',
    ip: '192.168.1.12',
    certificate: {
      id: 'C004',
      name: 'Master in Data Science',
      state: 'Attivo',
      issuer: { id: 4, name: 'Politecnico di Milano' }
    },
    status: 'verified',
    location: 'Bologna, IT'
  },
  {
    id: 7,
    date: new Date('2025-09-07T17:15:00'),
    user: 'Esterno: LinkedIn Recruiter',
    accessType: 'Verifica credenziale',
    ip: '54.120.67.34',
    certificate: {
      id: 'C002',
      name: 'Cert. Corso Angular',
      state: 'Attivo',
      issuer: { id: 2, name: 'Coursera' }
    },
    status: 'verified',
    location: 'Londra, UK'
  },
  {
    id: 8,
    date: new Date('2025-09-06T09:45:00'),
    user: 'Me',
    accessType: 'Download',
    ip: '192.168.1.13',
    certificate: {
      id: 'C005',
      name: 'Cert. Blockchain Basics',
      state: 'Attivo',
      issuer: { id: 5, name: 'IBM SkillsBuild' }
    },
    status: 'verified',
    location: 'Bologna, IT'
  },
  {
    id: 9,
    date: new Date('2025-09-05T20:05:00'),
    user: 'Esterno: HR Startup',
    accessType: 'Visualizzazione',
    ip: '102.54.11.67',
    certificate: {
      id: 'C003',
      name: 'Cert. UX Design',
      state: 'Revocato',
      issuer: { id: 3, name: 'Google UX' }
    },
    status: 'not-verified',
    location: 'Madrid, ES'
  },
  {
    id: 10,
    date: new Date('2025-09-04T11:55:00'),
    user: 'Me',
    accessType: 'Condivisione link',
    ip: '192.168.1.14',
    certificate: {
      id: 'C006',
      name: 'Cert. AI Fundamentals',
      state: 'Attivo',
      issuer: { id: 6, name: 'Microsoft Learn' }
    },
    status: 'verified',
    location: 'Bologna, IT'
  }
];

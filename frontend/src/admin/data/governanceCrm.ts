export type Priority = 'Low' | 'Medium' | 'High'

export type GovernanceContact = {
  id: string
  name: string
  organisation: string
  role: string
  country: string
  segment: 'Partner' | 'Researcher' | 'Regulator'
  owner: string
  engagementStage: 'Lead' | 'Onboarded' | 'Active'
  lastEngagement: string
}

export type GovernanceRisk = {
  id: string
  title: string
  area: 'Consent' | 'Security' | 'Ethics'
  severity: Priority
  owner: string
  dueDate: string
  status: 'Open' | 'Mitigating' | 'Closed'
}


export const governanceContacts: GovernanceContact[] = [
  {
    id: 'CON-01',
    name: 'Dr M. Kone',
    organisation: 'Mali National Ethics Council',
    role: 'Ethics chair',
    country: 'Mali',
    segment: 'Regulator',
    owner: 'N. Ibrahim',
    engagementStage: 'Active',
    lastEngagement: '2026-03-18',
  },
  {
    id: 'CON-02',
    name: 'Prof R. Sarr',
    organisation: 'Senegal Infectious Disease Forum',
    role: 'Research lead',
    country: 'Senegal',
    segment: 'Researcher',
    owner: 'K. Johnson',
    engagementStage: 'Onboarded',
    lastEngagement: '2026-03-12',
  },
  {
    id: 'CON-03',
    name: 'Ms E. Balde',
    organisation: 'Guinea Data Protection Authority',
    role: 'Compliance officer',
    country: 'Guinea',
    segment: 'Regulator',
    owner: 'N. Ibrahim',
    engagementStage: 'Lead',
    lastEngagement: '2026-03-06',
  },
  {
    id: 'CON-04',
    name: 'Dr Y. Toure',
    organisation: 'ECOWAS Health Data Secretariat',
    role: 'Programme manager',
    country: 'Regional',
    segment: 'Partner',
    owner: 'K. Johnson',
    engagementStage: 'Active',
    lastEngagement: '2026-03-19',
  },
]

export const governanceRisks: GovernanceRisk[] = [
  {
    id: 'RISK-22',
    title: 'Legacy consent format mismatch',
    area: 'Consent',
    severity: 'High',
    owner: 'QA team',
    dueDate: '2026-03-29',
    status: 'Mitigating',
  },
  {
    id: 'RISK-24',
    title: 'Cross-border encryption policy gaps',
    area: 'Security',
    severity: 'High',
    owner: 'Platform team',
    dueDate: '2026-04-05',
    status: 'Open',
  },
  {
    id: 'RISK-26',
    title: 'Delayed ethics renewal evidence',
    area: 'Ethics',
    severity: 'Medium',
    owner: 'Governance ops',
    dueDate: '2026-04-12',
    status: 'Open',
  },
]

export type ContentStatus = 'Draft' | 'In review' | 'Scheduled' | 'Published'
export type ContentChannel = 'Website page' | 'Dataset record' | 'Resource library'

export type ContentUpdate = {
  id: string
  title: string
  channel: ContentChannel
  owner: string
  lastEdited: string
  status: ContentStatus
  priority: Priority
}

export type DatasetOperation = {
  id: string
  dataset: string
  institution?: string
  country?: string
  topic?: string
  stage: 'Metadata QA' | 'Governance review' | 'Publication prep' | 'Live'
  qaStatus: 'Blocked' | 'In progress' | 'Complete'
  accessLevel: 'Open' | 'Controlled' | 'Restricted'
  nextAction: string
}

export type SiteSectionHealth = {
  section: string
  records: number
  lastPublished: string
  owner: string
  status: 'Healthy' | 'Needs review'
}

export const contentUpdates: ContentUpdate[] = [
  {
    id: 'CNT-301',
    title: 'Update Data Access policy explainer',
    channel: 'Website page',
    owner: 'Content team',
    lastEdited: '2026-03-21',
    status: 'In review',
    priority: 'High',
  },
  {
    id: 'CNT-305',
    title: 'Revise TB Cohort dataset abstract',
    channel: 'Dataset record',
    owner: 'Data curation',
    lastEdited: '2026-03-22',
    status: 'Draft',
    priority: 'Medium',
  },
  {
    id: 'CNT-309',
    title: 'Publish governance structure PDF v2',
    channel: 'Resource library',
    owner: 'Governance ops',
    lastEdited: '2026-03-20',
    status: 'Scheduled',
    priority: 'Low',
  },
  {
    id: 'CNT-312',
    title: 'Refresh homepage impact metrics card',
    channel: 'Website page',
    owner: 'Communications',
    lastEdited: '2026-03-19',
    status: 'Published',
    priority: 'Medium',
  },
]

export const datasetOperations: DatasetOperation[] = [
  {
    id: 'DST-901',
    dataset: 'TB Cohort Data - Lagos',
    institution: 'West Africa TB Research Consortium',
    country: 'Nigeria',
    topic: 'Tuberculosis',
    stage: 'Metadata QA',
    qaStatus: 'In progress',
    accessLevel: 'Controlled',
    nextAction: 'Complete variable dictionary checks',
  },
  {
    id: 'DST-904',
    dataset: 'Malaria Surveillance - Sahel Belt',
    institution: 'Sahel Malaria Observatory',
    country: 'Multiple',
    topic: 'Malaria',
    stage: 'Governance review',
    qaStatus: 'Complete',
    accessLevel: 'Open',
    nextAction: 'Record DAC access/publication decision and notify Data Manager',
  },
  {
    id: 'DST-906',
    dataset: 'HIV Care Cascade - Dakar Clinics',
    institution: 'Regional HIV Implementation Network',
    country: 'Senegal',
    topic: 'HIV',
    stage: 'Publication prep',
    qaStatus: 'Complete',
    accessLevel: 'Restricted',
    nextAction: 'Attach updated access conditions',
  },
  {
    id: 'DST-910',
    dataset: 'Maternal Health Outcomes - Accra',
    institution: 'Women and Child Health Initiative',
    country: 'Ghana',
    topic: 'Public health',
    stage: 'Live',
    qaStatus: 'Complete',
    accessLevel: 'Open',
    nextAction: 'No action required',
  },
]

export const siteSectionHealth: SiteSectionHealth[] = [
  {
    section: 'Homepage',
    records: 8,
    lastPublished: '2026-03-19',
    owner: 'Communications',
    status: 'Healthy',
  },
  {
    section: 'Dataset catalogue',
    records: 64,
    lastPublished: '2026-03-22',
    owner: 'Data curation',
    status: 'Healthy',
  },
  {
    section: 'Resources',
    records: 21,
    lastPublished: '2026-03-12',
    owner: 'Governance ops',
    status: 'Needs review',
  },
  {
    section: 'Governance pages',
    records: 11,
    lastPublished: '2026-03-09',
    owner: 'Committee secretariat',
    status: 'Needs review',
  },
]

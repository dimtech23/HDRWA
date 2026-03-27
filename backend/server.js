const path = require('path')
const express = require('express')
const cors = require('cors')
const Database = require('better-sqlite3')

const app = express()
const PORT = process.env.PORT || 4000

app.use(cors())
app.use(express.json())

const db = new Database(path.join(__dirname, 'hdrwa.db'))

db.exec(`
CREATE TABLE IF NOT EXISTS content_updates (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  channel TEXT NOT NULL,
  owner TEXT NOT NULL,
  last_edited TEXT NOT NULL,
  status TEXT NOT NULL,
  priority TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS dataset_operations (
  id TEXT PRIMARY KEY,
  dataset TEXT NOT NULL,
  stage TEXT NOT NULL,
  qa_status TEXT NOT NULL,
  access_level TEXT NOT NULL,
  next_action TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS site_section_health (
  section TEXT PRIMARY KEY,
  records INTEGER NOT NULL,
  last_published TEXT NOT NULL,
  owner TEXT NOT NULL,
  status TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS governance_risks (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  area TEXT NOT NULL,
  severity TEXT NOT NULL,
  owner TEXT NOT NULL,
  due_date TEXT NOT NULL,
  status TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS governance_contacts (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  organisation TEXT NOT NULL,
  role TEXT NOT NULL,
  country TEXT NOT NULL,
  segment TEXT NOT NULL,
  owner TEXT NOT NULL,
  engagement_stage TEXT NOT NULL,
  last_engagement TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS submissions (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  institution TEXT NOT NULL,
  status TEXT NOT NULL,
  updated_at TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS access_requests (
  id TEXT PRIMARY KEY,
  dataset TEXT NOT NULL,
  purpose TEXT NOT NULL,
  status TEXT NOT NULL,
  submitted_on TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS datasets (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  institution TEXT NOT NULL,
  country TEXT NOT NULL,
  topic TEXT NOT NULL,
  access_level TEXT NOT NULL,
  last_updated TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS partners_donors (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  url TEXT NOT NULL,
  logo_path TEXT NOT NULL,
  kind TEXT NOT NULL,
  display_order INTEGER NOT NULL
);

CREATE TABLE IF NOT EXISTS registrations (
  id TEXT PRIMARY KEY,
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  institution TEXT NOT NULL,
  country TEXT NOT NULL,
  requested_role TEXT NOT NULL,
  justification TEXT NOT NULL,
  status TEXT NOT NULL,
  submitted_on TEXT NOT NULL
);
`)

function seedIfEmpty() {
  const contentCount = db.prepare('SELECT COUNT(*) AS value FROM content_updates').get().value
  const datasetOpsCount = db.prepare('SELECT COUNT(*) AS value FROM dataset_operations').get().value
  const datasetsCount = db.prepare('SELECT COUNT(*) AS value FROM datasets').get().value

  const insertContent = db.prepare(`
    INSERT INTO content_updates (id, title, channel, owner, last_edited, status, priority)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `)
  if (contentCount === 0) {
    ;[
      ['CNT-301', 'Update Data Access policy explainer', 'Website page', 'Content team', '2026-03-21', 'In review', 'High'],
      ['CNT-305', 'Revise TB Cohort dataset abstract', 'Dataset record', 'Data curation', '2026-03-22', 'Draft', 'Medium'],
      ['CNT-309', 'Publish governance structure PDF v2', 'Resource library', 'Governance ops', '2026-03-20', 'Scheduled', 'Low'],
    ].forEach((entry) => insertContent.run(...entry))
  }

  const insertDatasetOps = db.prepare(`
    INSERT INTO dataset_operations (id, dataset, stage, qa_status, access_level, next_action)
    VALUES (?, ?, ?, ?, ?, ?)
  `)
  if (datasetOpsCount === 0) {
    ;[
      [
        'DST-901',
        'Longitudinal TB Cohort Data - Lagos and Accra',
        'Metadata QA',
        'In progress',
        'Controlled',
        'Complete variable dictionary checks',
      ],
      [
        'DST-904',
        'Malaria Surveillance Data - Sahel Belt 2018-2024',
        'Governance review',
        'Complete',
        'Open',
        'Confirm DAC publication decision',
      ],
    ].forEach((entry) => insertDatasetOps.run(...entry))
  }

  const insertDatasetCard = db.prepare(`
    INSERT INTO datasets (id, title, institution, country, topic, access_level, last_updated)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `)

  if (datasetsCount === 0) {
    ;[
      ['1', 'Longitudinal TB Cohort Data - Lagos and Accra', 'West Africa TB Research Consortium', 'Nigeria / Ghana', 'Tuberculosis', 'Controlled', '2025-10-02'],
      ['2', 'Malaria Surveillance Data - Sahel Belt 2018-2024', 'Sahel Malaria Observatory', 'Multiple', 'Malaria', 'Open', '2025-09-12'],
      ['3', 'HIV Care Cascade Outcomes - Urban Clinics', 'Regional HIV Implementation Network', 'Senegal', 'HIV', 'Restricted', '2025-08-21'],
    ].forEach((entry) => insertDatasetCard.run(...entry))
  }

  const insertSection = db.prepare(`
    INSERT INTO site_section_health (section, records, last_published, owner, status)
    VALUES (?, ?, ?, ?, ?)
  `)
  const sectionCount = db.prepare('SELECT COUNT(*) AS value FROM site_section_health').get().value
  if (sectionCount === 0) {
    ;[
      ['Homepage', 8, '2026-03-19', 'Communications', 'Healthy'],
      ['Dataset catalogue', 64, '2026-03-22', 'Data curation', 'Healthy'],
      ['Resources', 21, '2026-03-12', 'Governance ops', 'Needs review'],
    ].forEach((entry) => insertSection.run(...entry))
  }

  const insertRisk = db.prepare(`
    INSERT INTO governance_risks (id, title, area, severity, owner, due_date, status)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `)
  const riskCount = db.prepare('SELECT COUNT(*) AS value FROM governance_risks').get().value
  if (riskCount === 0) {
    ;[
      ['RISK-24', 'Cross-border encryption policy gaps', 'Security', 'High', 'Platform team', '2026-04-05', 'Open'],
      ['RISK-26', 'Delayed ethics renewal evidence', 'Ethics', 'Medium', 'Governance ops', '2026-04-12', 'Open'],
    ].forEach((entry) => insertRisk.run(...entry))
  }

  const insertContact = db.prepare(`
    INSERT INTO governance_contacts (id, name, organisation, role, country, segment, owner, engagement_stage, last_engagement)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
  `)
  const contactCount = db.prepare('SELECT COUNT(*) AS value FROM governance_contacts').get().value
  if (contactCount === 0) {
    ;[
      ['CON-01', 'Dr M. Kone', 'Mali National Ethics Council', 'Ethics chair', 'Mali', 'Regulator', 'N. Ibrahim', 'Active', '2026-03-18'],
      ['CON-04', 'Dr Y. Toure', 'ECOWAS Health Data Secretariat', 'Programme manager', 'Regional', 'Partner', 'K. Johnson', 'Active', '2026-03-19'],
    ].forEach((entry) => insertContact.run(...entry))
  }

  const partnersCount = db.prepare('SELECT COUNT(*) AS value FROM partners_donors').get().value
  if (partnersCount === 0) {
    const insertPartnersDonors = db.prepare(`
      INSERT INTO partners_donors (id, name, url, logo_path, kind, display_order)
      VALUES (?, ?, ?, ?, ?, ?)
    `)

    ;[
      [
        'PD-001',
        'EDCTP',
        'https://www.edctp.org',
        'Logo EDCTP - Red_1.jpg',
        'Partner',
        1,
      ],
      ['PD-002', 'WANETAM', 'https://wanetam.net', 'WANETAM logo.png', 'Partner', 2],
      [
        'PD-003',
        'UKRI / MRCG at LSHTM',
        'https://www.lshtm.ac.uk/research/units/mrc-gambia',
        'UKRI_MRCG_LSHTM_Horizontal_Colour_Transparent_High Res.png',
        'Partner',
        3,
      ],
      ['PD-004', 'IDDO', 'https://www.iddo.org', 'IDDO.png', 'Partner', 4],
      ['PD-005', 'European Union', 'https://europa.eu/', 'eu-logo.jpg', 'Donor', 5],
    ].forEach((entry) => insertPartnersDonors.run(...entry))
  }
}

seedIfEmpty()

function clearDemoTables() {
  db.exec(`
    DELETE FROM content_updates;
    DELETE FROM dataset_operations;
    DELETE FROM site_section_health;
    DELETE FROM governance_risks;
    DELETE FROM governance_contacts;
    DELETE FROM partners_donors;
    DELETE FROM submissions;
    DELETE FROM access_requests;
    DELETE FROM datasets;
    DELETE FROM registrations;
  `)
}

const all = (query) => db.prepare(query).all()
const get = (query, ...params) => db.prepare(query).get(...params)
const run = (query, ...params) => db.prepare(query).run(...params)

app.get('/api/health', (_req, res) => {
  res.json({ ok: true })
})

app.get('/api/content-updates', (_req, res) => {
  const rows = all('SELECT * FROM content_updates ORDER BY last_edited DESC')
  res.json(rows.map((row) => ({
    id: row.id,
    title: row.title,
    channel: row.channel,
    owner: row.owner,
    lastEdited: row.last_edited,
    status: row.status,
    priority: row.priority,
  })))
})

app.post('/api/content-updates', (req, res) => {
  const id = `CNT-${Date.now()}`
  const payload = req.body
  run(
    'INSERT INTO content_updates (id, title, channel, owner, last_edited, status, priority) VALUES (?, ?, ?, ?, ?, ?, ?)',
    id,
    payload.title,
    payload.channel,
    payload.owner,
    payload.lastEdited,
    payload.status,
    payload.priority,
  )
  res.status(201).json({ id })
})

app.patch('/api/content-updates/:id', (req, res) => {
  const existing = get('SELECT id FROM content_updates WHERE id = ?', req.params.id)
  if (!existing) return res.status(404).json({ message: 'Not found' })
  run(
    'UPDATE content_updates SET status = ?, last_edited = ? WHERE id = ?',
    req.body.status,
    req.body.lastEdited,
    req.params.id,
  )
  res.json({ ok: true })
})

app.get('/api/dataset-operations', (_req, res) => {
  const rows = all(
    'SELECT d.*, ds.institution, ds.country, ds.topic FROM dataset_operations d LEFT JOIN datasets ds ON ds.title = d.dataset ORDER BY d.id DESC',
  )
  res.json(rows.map((row) => ({
    id: row.id,
    dataset: row.dataset,
    stage: row.stage,
    qaStatus: row.qa_status,
    accessLevel: row.access_level,
    institution: row.institution || undefined,
    country: row.country || undefined,
    topic: row.topic || undefined,
    nextAction: row.next_action,
  })))
})

app.post('/api/dataset-operations', (req, res) => {
  const id = `DST-${Date.now()}`
  const payload = req.body

  // Create dataset metadata too, so the guest catalogue stays in sync.
  const lastUpdated = new Date().toISOString().slice(0, 10)
  const datasetTitle = payload.dataset
  const institution = payload.institution || 'Unknown institution'
  const country = payload.country || 'Unspecified'
  const topic = payload.topic || 'Public health'
  const accessLevel = payload.accessLevel || 'Controlled'

  run(
    'INSERT INTO dataset_operations (id, dataset, stage, qa_status, access_level, next_action) VALUES (?, ?, ?, ?, ?, ?)',
    id,
    datasetTitle,
    payload.stage,
    payload.qaStatus,
    accessLevel,
    payload.nextAction,
  )

  const existingDataset = get('SELECT id FROM datasets WHERE title = ?', datasetTitle)
  if (existingDataset) {
    run(
      'UPDATE datasets SET institution = ?, country = ?, topic = ?, access_level = ?, last_updated = ? WHERE id = ?',
      institution,
      country,
      topic,
      accessLevel,
      lastUpdated,
      existingDataset.id,
    )
  } else {
    run(
      'INSERT INTO datasets (id, title, institution, country, topic, access_level, last_updated) VALUES (?, ?, ?, ?, ?, ?, ?)',
      `DS-${Date.now()}`,
      datasetTitle,
      institution,
      country,
      topic,
      accessLevel,
      lastUpdated,
    )
  }
  res.status(201).json({ id })
})

app.get('/api/site-section-health', (_req, res) => {
  const rows = all('SELECT * FROM site_section_health ORDER BY section ASC')
  res.json(rows.map((row) => ({
    section: row.section,
    records: row.records,
    lastPublished: row.last_published,
    owner: row.owner,
    status: row.status,
  })))
})

app.get('/api/governance-risks', (_req, res) => {
  const rows = all('SELECT * FROM governance_risks ORDER BY due_date ASC')
  res.json(rows.map((row) => ({
    id: row.id,
    title: row.title,
    area: row.area,
    severity: row.severity,
    owner: row.owner,
    dueDate: row.due_date,
    status: row.status,
  })))
})

app.get('/api/governance-contacts', (_req, res) => {
  const rows = all('SELECT * FROM governance_contacts ORDER BY last_engagement DESC')
  res.json(rows.map((row) => ({
    id: row.id,
    name: row.name,
    organisation: row.organisation,
    role: row.role,
    country: row.country,
    segment: row.segment,
    owner: row.owner,
    engagementStage: row.engagement_stage,
    lastEngagement: row.last_engagement,
  })))
})

app.get('/api/submissions', (_req, res) => {
  const rows = all('SELECT * FROM submissions ORDER BY updated_at DESC')
  res.json(rows.map((row) => ({
    id: row.id,
    title: row.title,
    institution: row.institution,
    status: row.status,
    updatedAt: row.updated_at,
  })))
})

app.post('/api/submissions', (req, res) => {
  const id = `SUB-${Date.now()}`
  const payload = req.body
  run(
    'INSERT INTO submissions (id, title, institution, status, updated_at) VALUES (?, ?, ?, ?, ?)',
    id,
    payload.title,
    payload.institution,
    'Draft',
    payload.updatedAt,
  )
  run(
    'INSERT INTO datasets (id, title, institution, country, topic, access_level, last_updated) VALUES (?, ?, ?, ?, ?, ?, ?)',
    `DS-${Date.now()}`,
    payload.title,
    payload.institution,
    payload.country || 'Unspecified',
    payload.topic || 'Public health',
    payload.accessLevel || 'Controlled',
    payload.updatedAt,
  )
  res.status(201).json({ id })
})

app.get('/api/access-requests', (_req, res) => {
  const rows = all('SELECT * FROM access_requests ORDER BY submitted_on DESC')
  res.json(rows.map((row) => ({
    id: row.id,
    dataset: row.dataset,
    purpose: row.purpose,
    status: row.status,
    submittedOn: row.submitted_on,
  })))
})

app.post('/api/access-requests', (req, res) => {
  const id = `REQ-${Date.now()}`
  const payload = req.body
  run(
    'INSERT INTO access_requests (id, dataset, purpose, status, submitted_on) VALUES (?, ?, ?, ?, ?)',
    id,
    payload.dataset,
    payload.purpose,
    'DAC review',
    payload.submittedOn,
  )
  res.status(201).json({ id })
})

app.get('/api/datasets', (_req, res) => {
  const rows = all('SELECT * FROM datasets ORDER BY last_updated DESC')
  res.json(
    rows.map((row) => ({
      id: row.id,
      title: row.title,
      institution: row.institution,
      country: row.country,
      topic: row.topic,
      accessLevel: row.access_level,
      lastUpdated: row.last_updated,
    })),
  )
})

app.get('/api/partners-donors', (_req, res) => {
  const rows = all('SELECT * FROM partners_donors ORDER BY display_order ASC')
  res.json(
    rows.map((row) => ({
      id: row.id,
      name: row.name,
      url: row.url,
      // Stored as a filename under public/; frontend will convert to /<filename>.
      logoPath: row.logo_path,
      kind: row.kind,
      displayOrder: row.display_order,
    })),
  )
})

app.post('/api/partners-donors', (req, res) => {
  const payload = req.body
  const id = `PD-${Date.now()}`

  const nextOrder =
    get('SELECT COALESCE(MAX(display_order), 0) + 1 AS value FROM partners_donors').value

  const displayOrder = typeof payload.displayOrder === 'number' ? payload.displayOrder : nextOrder
  const logoPath = payload.logoPath || payload.logo_path || ''

  if (!payload.name || !payload.url || !logoPath || !payload.kind) {
    return res.status(400).json({ message: 'Missing required fields' })
  }

  run(
    'INSERT INTO partners_donors (id, name, url, logo_path, kind, display_order) VALUES (?, ?, ?, ?, ?, ?)',
    id,
    payload.name,
    payload.url,
    logoPath,
    payload.kind,
    displayOrder,
  )

  res.status(201).json({ id })
})

app.patch('/api/access-requests/:id/status', (req, res) => {
  const existing = get('SELECT id FROM access_requests WHERE id = ?', req.params.id)
  if (!existing) return res.status(404).json({ message: 'Not found' })
  run('UPDATE access_requests SET status = ? WHERE id = ?', req.body.status, req.params.id)
  res.json({ ok: true })
})

app.patch('/api/dataset-operations/:id', (req, res) => {
  const existing = get('SELECT id FROM dataset_operations WHERE id = ?', req.params.id)
  if (!existing) return res.status(404).json({ message: 'Not found' })
  run(
    'UPDATE dataset_operations SET stage = ?, qa_status = ?, next_action = ? WHERE id = ?',
    req.body.stage,
    req.body.qaStatus,
    req.body.nextAction,
    req.params.id,
  )

  // Keep guest catalogue in sync when workflow changes.
  const updatedOp = get('SELECT dataset, access_level FROM dataset_operations WHERE id = ?', req.params.id)
  if (updatedOp) {
    const lastUpdated = new Date().toISOString().slice(0, 10)
    run('UPDATE datasets SET access_level = ?, last_updated = ? WHERE title = ?', updatedOp.access_level, lastUpdated, updatedOp.dataset)
  }
  res.json({ ok: true })
})

app.post('/api/governance-contacts', (req, res) => {
  const id = `CON-${Date.now()}`
  const payload = req.body
  run(
    'INSERT INTO governance_contacts (id, name, organisation, role, country, segment, owner, engagement_stage, last_engagement) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
    id,
    payload.name,
    payload.organisation,
    payload.role,
    payload.country,
    payload.segment,
    payload.owner,
    payload.engagementStage,
    payload.lastEngagement,
  )
  res.status(201).json({ id })
})

app.patch('/api/governance-contacts/:id/stage', (req, res) => {
  const existing = get('SELECT id FROM governance_contacts WHERE id = ?', req.params.id)
  if (!existing) return res.status(404).json({ message: 'Not found' })
  run(
    'UPDATE governance_contacts SET engagement_stage = ?, last_engagement = ? WHERE id = ?',
    req.body.engagementStage,
    req.body.lastEngagement,
    req.params.id,
  )
  res.json({ ok: true })
})

app.post('/api/registrations', (req, res) => {
  const id = `REG-${Date.now()}`
  const payload = req.body
  run(
    'INSERT INTO registrations (id, full_name, email, institution, country, requested_role, justification, status, submitted_on) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
    id,
    payload.fullName,
    payload.email,
    payload.institution,
    payload.country,
    payload.requestedRole,
    payload.justification,
    'Submitted',
    new Date().toISOString().slice(0, 10),
  )
  res.status(201).json({ id })
})

app.post('/api/demo/reset', (_req, res) => {
  clearDemoTables()
  seedIfEmpty()
  res.json({ ok: true })
})

app.listen(PORT, () => {
  console.log(`API listening on http://localhost:${PORT}`)
})

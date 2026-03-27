export interface TeamMemberLinks {
  researchGate?: string
  linkedIn?: string
  twitter?: string
}

export interface TeamMember {
  slug: string
  name: string
  role: string
  image: string
  bio: string
  links?: TeamMemberLinks
}

export const teamMembers: TeamMember[] = [
  {
    slug: 'badou-gaye',
    name: 'Badou Gaye',
    role: 'Head of IT at MRCG – LSHTM',
    image: '/badou.png',
    bio: 'Badou is the Head of Information Technology and High-Performance Computing at the Medical Research Council Unit The Gambia – London School of Hygiene and Tropical Medicine. Badou is actively involved in IT and Data Management capacity building and data sharing. Currently, Badou is the Programme Lead for data sharing within the West African Network for Tuberculosis, AIDS and Malaria (WANETAM), an EDCTP Network of Excellence to promote the ethical and equitable sharing of health research data in West Africa. Badou has also worked in such capacity within the African coaLition for Epidemic Research, Response and Training (ALERRT) in building a robust ICT infrastructure and data management capabilities in poor-resource settings to respond to epidemics across sub-Saharan Africa.',
  },
  {
    slug: 'bai-lamin-dondeh',
    name: 'Bai Lamin Dondeh',
    role: 'Head of Data Management and Architecture at MRCG - LSHTM',
    image: '/Bai Lamin Dondeh.png',
    bio: 'Bai Lamin is the Head of Data Management and Architecture at the Medical Research Council Unit The Gambia – London School of Hygiene and Tropical Medicine. Bai Lamin currently oversees a team of Clinical Data Managers, Data Analysts, and Data Support Assistants, all committed to providing the services to ensure the collection, management, and storage of high-quality research data. He has spearheaded the development of a customized Biobank Sample Management Systems at the MRCG and as well as the development of an Electronic Medical Records Systems amongst other systems.\n\nCurrently, he is the Work Package Lead for Data Management and ICT for the African CoaLition for Epidemic Research, Response and Training (ALERRT – http://alerrt.global) - a multi-disciplinary consortium of 21 partner countries from 13 institutions in Africa and Europe, working to build a patient-centred clinical research network to respond to epidemics across sub-Saharan Africa. He is also working to support the data sharing work package within the West African Network for Tuberculosis, AIDS and Malaria (WANETAM), an EDCTP Network of Excellence.',
  },
  {
    slug: 'dembo-kanteh',
    name: 'Dembo Kanteh',
    role: 'Compliance Manager, WANETAM; Head Strategic Partnerships at MRCG - LSHTM; President, West Africa Research and Innovation Management Association',
    image: '/Dembo Kanteh.png',
    bio: 'Dembo is the Head of Strategic Partnerships at MRC Unit The Gambia at London School of Hygiene and Tropical Medicine. He has over 20 years of experience as a leader in research management, organisational strategy, operations, and research business processes engineering. He was the pioneer head of the Research Support Office in the Medical Research Council Laboratories in The Gambia, setting up a robust support and managerial mechanism for research scientists at all levels of their careers.\n\nDembo is the current president of the West African Research and Innovation Management Association (WARIMA). To promote research management beyond the MRC Gambia, Dembo has built extensive expertise providing training and consulting services across the continent. He is a regular trainer/facilitator for WARIMA and the Africa Research Excellence Fund.\n\nDembo is an economist by training. He holds an MBA Degree from the Open University in the UK and a BA (Hons) Economics from Delhi University in India. He has a passion for capacity building, partnerships and the promotion of human development and growth in Africa.\n\nHe has managed funding and contracts from all major funders of biomedical science research. He presents strong experience in policy development and risk management in several organizations. He is a specialist in setting up monitoring and evaluation frameworks, performance management and reporting at organizational, departmental and program levels.\n\nDembo is a member of the International Professional Recognition Council.',
    links: {
      researchGate: 'https://www.researchgate.net/profile/Dembo-Kanteh',
      linkedIn: 'https://www.linkedin.com/in/kanteh-dembo',
      twitter: 'https://twitter.com/DemboSPRM',
    },
  },
  {
    slug: 'thomas-bresseleers',
    name: 'Thomas Bresseleers',
    role: 'Admin & Communications Manager at MRCG - LSHTM',
    image: '/Thomas Bresseleers.png',
    bio: 'Thomas joined the HDRWA team in February 2023. Based at the Medical Research Council unit The Gambia - London School of Hygiene and Tropical Medicine, his primary responsibilities involve overseeing the administrative and communication aspects of the HDRWA platform, which includes engaging with stakeholders and ensuring that all related activities run smoothly.\n\nHe holds a Bachelor\'s degree in Cinematography and a Master\'s degree in Communication Sciences: Digital Media and Society from KU Leuven University in Belgium. Prior to joining the team, Thomas worked as a communications intern for the United Nations Office on Drugs and Crime (UNODC) in The Gambia, where he later became a consultant, responsible for managing the organization\'s communications.',
  },
  {
    slug: 'binta-saidy',
    name: 'Binta Saidy',
    role: 'Data Manager at MRCG – LSHTM',
    image: '/Binta Saidy.png',
    bio: 'Binta Saidy (BSc, MSc) is a Data Manager at the Medical Research Council Unit The Gambia – London School of Hygiene and Tropical Medicine. She is a highly skilled and experienced data manager with a strong background in managing clinical trial studies, observational studies, and surveys. She has extensive experience in managing multi-country and multi-site studies, having developed expertise in handling electronic data capture using various systems, including REDCap, ODK, OpenClinica, and other web-based data management systems.\n\nShe has played an instrumental role in setting up an electronic archive system and data metrics system within the data management and archives department at MRCG. Her efforts have helped to streamline data management processes, improve data quality, and facilitate efficient data sharing and archiving in various research projects. She has been successful in managing complex data management projects and delivering results that meet the highest standards of quality and accuracy.\n\nCurrently, she serves as the Lead Data Manager for the WANETAM platform where she is contributing to the development of a centralized data management platform whilst responsible for overseeing data management activities and ensuring the timely delivery of high-quality data.',
  },
  {
    slug: 'elizabeth-allen',
    name: 'Dr. Elizabeth Allen',
    role: 'Strategic Partnerships Lead, The Global Health Network',
    image: '/Elizabeth Allen.png',
    bio: 'Elizabeth is a pharmacist with a Master\'s degree in Public Health and a PhD in Clinical Pharmacology. She has a background in commercial and academic clinical research, and methodology research teaching and post graduate supervision. Until recently she led clinical research operations for the University of Cape Town\'s MRC Collaborating Centre for Optimising Antimalarial Therapy (CCOAT) and was Head of Oxford University\'s Infectious Diseases Data Observatory (IDDO) Southern Africa Centre. In her role for The Global Health Network, she builds and maintains partnerships to realise respective goals, exploit connectivities and synergies, thus contributing to equity in health research by improving methods, building careers & sharing knowledge.',
  },
  {
    slug: 'laura-merson',
    name: 'Laura Merson',
    role: 'Head of Data for ISARIC',
    image: '/Laura Merson.png',
    bio: 'Laura leads data for ISARIC and supports HDRWA in data strategy and sharing.',
  },
]

export function getTeamMemberBySlug(slug: string): TeamMember | undefined {
  return teamMembers.find((m) => m.slug === slug)
}

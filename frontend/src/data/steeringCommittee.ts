export interface SteeringMemberLinks {
  profile?: string
  orcid?: string
  linkedIn?: string
  twitter?: string
}

export interface SteeringMember {
  slug: string
  name: string
  role: string
  image: string
  bio: string
  links?: SteeringMemberLinks
}

export const steeringMembers: SteeringMember[] = [
  {
    slug: 'dorothy-yeboah-manu',
    name: 'Professor Dorothy Yeboah-Manu',
    role: 'Professor of Medical Microbiology and Director, Noguchi Memorial Institute for Medical Research, University of Ghana',
    image: '/Dorothy Yeboah Manu.png',
    bio: 'Dorothy Yeboah-Manu is a professor of Medical Microbiology and the Director of the Noguchi Memorial Institute for Medical Research at the University of Ghana. Prior to her current appointment, she was the Deputy Director of the West African Centre for Cell Biology of Infectious Pathogens and Head of Bacteriology at the same university. She also lectures at the Department of Biochemistry, Cell and Molecular Biology. She was at the Kwame Nkrumah University of Science and Technology and finished with First Class, BSc (Hons) in Biochemistry. She later studied at the London School of Hygiene and Tropical Medicine and Swiss Tropical and Public Health institute for masters and PhD respectively. Professor Dorothy is a member of several academic associations including the American Society for Microbiology, International Union against Tuberculosis and Lung Diseases, she is Vice President of the Immunological Society of Ghana and a member of West Africa Network of Excellence for TB, Malaria and HIV/AIDS. She also offers advisory services; she is a member of the WHO Global Network of Laboratories Confirming Buruli ulcer, member of the Advisory Board of Institut de Recherche en Santé de Surveillance Epidemiologique et de Formation, Senegal, Chairperson of the Advisory Board of the National TB Control Program. She was a Wellcome Trust Fellow 2012-2017. She is a Fellow of the Ghana Academy of Arts and Sciences and a Senior Fellow of the European and Developing Countries Clinical Trial Partnership. She won the Royal Society Africa Prize 2018 in recognition of her innovative contributions to the understanding of the microbiology, genetics and molecular epidemiology of tuberculosis and Buruli ulcer diseases.',
  },
  {
    slug: 'ifedayo-adetifa',
    name: 'Dr. Ifedayo Adetifa',
    role: 'Director General of the Nigeria Centre for Disease Control and Prevention',
    image: '/Ifedayo Adetifa.png',
    bio: 'Dr. Ifedayo Adetifa is the Director General of the Nigeria Centre for Disease Control and Prevention (NCDC). Dr. Adetifa is a paediatrician and epidemiologist whose work has covered areas of paediatric HIV/AIDS, tuberculosis and vaccine-preventable diseases epidemiology. He has focused on vaccine epidemiology research with a focus on evidence generation for vaccine policy in Africa through vaccine impact studies and seroepidemiology. He was a member of the Kenya SARS-CoV-2 Serology Consortium and is a member of the World Health Organization, African Region (WHO-AFRO) Regional Immunisation Technical Advisory Group, the WHO Respiratory Syncytial Virus Technical Advisory Group, and the Programme Advisory Group for the Malaria Vaccine Implementation Programme. Prior to leading the NCDC, he was an Associate Professor of Infectious Disease Epidemiology at the London School of Hygiene and Tropical Medicine (LSHTM) and Clinical Epidemiologist at the Kenya Medical Research Institute (KEMRI) - Wellcome Trust Research Programme (KWTRP) and prior, a Clinical Epidemiologist at the Medical Research Council Unit, The Gambia.',
  },
  {
    slug: 'oliver-ezechi',
    name: 'Professor Oliver Ezechi',
    role: 'Director of Research at the Nigeria Institute of Medical Research (NIMR) and Professor at the Department of Public Health Lead City University Ibadan',
    image: '/Olivier Ezechi.png',
    bio: 'Oliver Ezechi is a Director of Research at the Nigeria Institute of Medical Research (NIMR) and Professor at the Department of Public Health Lead City University Ibadan. In addition to his primary specialty of Obstetrics and Gynaecology, he has a master\'s in public administration and a Ph.D. in Public health. He leads both HIV and Maternal, Reproductive and Child Health Research program at the Institute. In the last fifteen years, he has provided technical support to the Government of Nigeria and its agencies, been a temporary adviser to the World Health Organisation and UNAIDS in general public health, Maternal and child health, infectious disease of poverty, research design, conduct, and program management and implementation. He has been involved in the implementation of research and management of HIV programs for the Federal Ministry of Health, National Agency for the control AIDS, World Health Organisation, and the Special Programme on Tropical Disease Research (TDR). He was the Lead clinical research monitor for large scale national and multi-country evaluation of antiretroviral and antituberculosis drugs for management of HIV and tuberculosis in Nigeria, Ethiopia, Tanzania, Kenya, Uganda, and South Africa. He was the chairman of the guidelines and strategic document committee of the Society of Obstetrics and Gynaecology of Nigeria. He led the development of the NIMR Research Foundation business plan and the current NIMR strategic plan (2017-2022). He has several organizational development experiences, including the membership of the Senior Finance and management committee, the top management committee, the headship of departments, and research groups at the apex medical research in Nigeria. He has contributed to the development of human and infrastructural capacities for health research and care delivery in Nigeria.',
  },
  {
    slug: 'oumar-gaye',
    name: 'Professor Oumar Gaye',
    role: 'Director of the Malaria Research and Capacity Development consortium in West and Central Africa',
    image: '/Oumar Gaye.png',
    bio: 'Professor Oumar Gaye is the Director of the Malaria Research and Capacity Development consortium in West and Central Africa (MARCAD Plus). As a Professor of Parasitology at UCAD in Senegal, Malaria advisor at the Senegalese MoH and at WHO Afro he coordinated during the last thirty years research on malaria and several parasitic diseases which led to strategies that have impacted the decision-making of malaria management policies. He is a founding member of RBM in West Africa, a member of The World Academy of Sciences, a member of the Senegalese Academy of Sciences and Technics and a Board Member at Malaria Consortium & at WWARN/IDDO. He received the Senegalese Presidential Prize in Sciences in 2012 and was elected as International Distinguished Fellow by ASTMH in 2021. Prof Gaye has coordinated several training courses on malaria and has helped countries to establish systems for diagnostic and monitoring drug resistance. He has mentored several young African scientists, helping them to obtain a professorship or positions in research institutions and health programs.',
  },
  {
    slug: 'toyin-togun',
    name: 'Professor Toyin Togun',
    role: 'Professor of Global Health at LSHTM and Co-Director of LSHTM TB Centre',
    image: '/Toyin Togun.png',
    bio: 'Prof. Toyin Togun is a Professor of Global Health at the London School of Hygiene & Tropical Medicine (LSHTM), London, UK, and a clinician-scientist in the Vaccines & Immunity Theme at the MRC Unit The Gambia at the LSHTM (MRCG at LSHTM). He is the Co-Director of the LSHTM Tuberculosis (TB) Centre, and he is also elected to Fellowship through distinction of the UK Faculty of Public Health.\n\nProf. Togun\'s research interest is in global health and implementation research that is focused on the discovery and practical application of new tools and strategies to improve the diagnosis and management of TB in high burden settings, with particular interest in childhood tuberculosis.\n\nCurrently, he is the Work Package Leader for childhood TB within the EDCTP-funded West African Network of Excellence for TB, AIDS and Malaria (WANETAM) consortium, and he led a Global Challenges Research Fund (GCRF) supported project that has established a multi-country and inter-disciplinary platform for research on post-TB lung health in children and adolescents in West Africa. He is a member of the College of Experts of the Africa Research Excellence Fund (AREF) and also of the Child and Adolescents TB Working Group of the World Health Organization.',
    links: {
      profile: 'https://www.lshtm.ac.uk/aboutus/people/togun-phd-ffph.toyin',
      orcid: 'https://orcid.org/0000-0002-8477-4462',
      linkedIn: 'https://www.linkedin.com/in/dr-toyin-togun',
      twitter: 'https://twitter.com/TogunToyin',
    },
  },
]

export function getSteeringMemberBySlug(slug: string): SteeringMember | undefined {
  return steeringMembers.find((m) => m.slug === slug)
}

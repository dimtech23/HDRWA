export interface DataAccessMember {
  slug: string
  name: string
  role: string
  image: string
  bio: string
}

export const dataAccessMembers: DataAccessMember[] = [
  {
    slug: 'mahamadou-thera',
    name: 'Professor Mahamadou Thera',
    role: 'Scientific Director of the Bandiagara Malaria Program (BMP)',
    image: '/Mahamadou Thera.png',
    bio: `Mahamadou A Thera (MD, MPH, PhD, FAAS) is the Scientific Director of the Bandiagara Malaria Program (BMP), an MRTC research program that conducts complex research on the pathogenesis of simple and severe malaria, host-parasite interactions, clinical trials of vaccines and malaria drugs.

He was the principal investigator of several clinical trials that assessed blood-stage malaria vaccine candidates and malaria drugs.

He is a Professor of Parasitology-Mycology at the University of Sciences Techniques and Technologies of Bamako since 2008.

Prof. Thera has been a member of the Scientific Advisory Board of several bodies including the WHO Scientific Committee on Malaria Vaccine (MALVAC and JTEG) and the European Vaccine Initiative (EVI). Prof. Thera is a member of the Infectious Diseases Data Observatory Data Access Committee since 2017. He also served on the DSMB of several clinical trials of vaccines against malaria, Ebola virus disease, and Lassa fever. Member of the Academy of Science of Mali since April 2018, he was elected Fellow of the African Academy of Sciences in August 2020. He has co-authored more than 130 articles in peer-reviewed journals.

Prof. Thera’s areas of expertise include malaria epidemiology, malaria pathogenesis, clinical trials, product clinical research and development, ethics, and parasitic diseases.`,
  },
  {
    slug: 'umberto-dalessandro',
    name: "Professor Umberto D'Alessandro",
    role: 'Director of the Medical Research Council Unit the Gambia',
    image: "/Umberto d'Alessandro.png",
    bio: `Prof. Umberto D'Alessandro (MD, MSc, PhD) has a long working experience in Africa, first as a clinician (Benin and Kenya) and later as a clinical epidemiologist (The Gambia). He has been involved in malaria research since 1990 when he carried out the evaluation of the Gambian National programme on insecticide-treated bed nets.

He joined the Department of Parasitology at the Institute of Tropical Medicine, Antwerp, Belgium in 1996, where he was until the end of 2010 the head of the Epidemiology Unit. There, he developed a research program around three themes: antimalarial treatment (including drug resistance), malaria prevention, and the P. vivax in vitro cycle, implemented in several malaria-endemic countries (Uganda, Burkina Faso, Benin, Vietnam, Peru, etc.).

In 2011, Professor D'Alessandro joined the Medical Research Council Unit The Gambia (MRCG) as theme leader of disease control and elimination. In January 2014, he was appointed director of the MRCG. His malaria research program at the MRCG is built around questions related to malaria elimination/eradication.`,
  },
  {
    slug: 'halimatou-diop-ndiaye',
    name: 'Professor Halimatou Diop Ndiaye',
    role: 'Head of Virology and Molecular Biology Department in HIV Reference Laboratory in Senegal',
    image: '/Halimatou Diop Ndiaye.png',
    bio: `Prof. Halimatou Diop Ndiaye (PharmD, PhD) is the Head of Virology and Molecular Biology Department in the HIV Reference Laboratory in Senegal. With strong experience in HIV fieldwork, she has been involved over the last 20 years in research focused on diagnosis and surveillance of sexually transmitted infections (STIs) and HIV/AIDS, HIV drug resistance surveillance and genetic diversity, and cancer-induced viruses (HBV, HPV). She has also evaluated new diagnostic tools like Dried Blood Spots and Point Of Care technologies, and more recently in the detection of SARS-CoV-2 variants.

She is the author and co-author of 61 scientific publications.`,
  },
  {
    slug: 'makhtar-niang',
    name: 'Dr Makhtar Niang',
    role: 'Deputy Head of the Immuno Physiopathology & Infectious Diseases Department at Institut Pasteur de Dakar',
    image: '/Makhtar Niang.png',
    bio: `Dr Makhtar Niang is a Research Scientist and the Deputy Head of the Immuno Physiopathology & Infectious Diseases Department at Institut Pasteur de Dakar, Senegal. His field of specialization is molecular parasitology, and he was trained successively at the University Cheikh Anta Diop, Institut Pasteur de Dakar in Senegal, the University of Montpellier II in France, the Nanyang Technological University in Singapore, and at Harvard School of Public Health in the USA.

His training is multi-disciplinary and cross-cultural (Africa, Asia, America, Europe), and he has received several honors and awards for his academic achievements including a patent. His primary research interest is centered on the development, validation, and implementation of highly sensitive and innovative diagnostics to support the control and elimination of malaria. Leveraging on his previous experience, expertise, recognition, and successes in the field, he has started new projects on integrated surveillance for the simultaneous detection of multiple pathogens using multiplex serological and molecular approaches.

His current roles involve scientific and administrative management of various research projects from donors such as EDCTP, European Research Council, NIH, BMGF, Rotary, etc., overseeing and supervising a research group of ten people including postdoc, PhD and Master II students, and research technicians. He has extensive experience interacting with international collaborators and scientific bodies, and serves in technical and advisory management boards at national and international organizations such as WANETAM, PAVON, and SOSEPAME. He is an expert consultant for Integrated Quality Laboratory Service (IQLS), leading trainings on malaria diagnostics in West African countries.`,
  },
  {
    slug: 'halidou-tinto',
    name: 'Professor Halidou Tinto',
    role: 'Regional Director of IRSS',
    image: '/Halidou Tinto.png',
    bio: `Pharm D by background and holder of a PhD in medical science (parasitology), Prof. Halidou’s research activities initially oriented towards the epidemiology of malaria drug resistance is now focused on malaria diagnostics, drugs and vaccines clinical trials. He started his career in 1998 as a research associate in Centre Muraz, Burkina Faso, where he worked on the epidemiology of malaria drug resistance.

From 1999 to 2000, he worked in the Royal Danish School of Pharmacy, Denmark as a Research Fellow in the Development of alternative medicines for the treatment of malaria. From 2003 to 2006, he worked as a PhD fellow in epidemiology at ITM, Belgium. After obtaining his PhD in Medical Sciences (University of Antwerp, Belgium), he went back to Burkina Faso, where he created the Clinical Research Unit of Nanoro (CRUN) in 2008, which now employs over 400 people.

So far, the unit has successfully conducted several trials including the GSK malaria vaccine candidate (RTS,S) phase 3 trial and most recently the R21 vaccine candidate phase 2 & 3 trials. He is a member of several international scientific committees including the EU, EDCTP, MMV, WHO, etc. He is the author and co-author of 245 publications.`,
  },
]

export function getDataAccessMemberBySlug(slug: string): DataAccessMember | undefined {
  return dataAccessMembers.find((m) => m.slug === slug)
}


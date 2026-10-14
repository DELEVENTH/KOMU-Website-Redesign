/* KOMU website: shared data and behaviour for every page (news lives in news-data.js).
   Each feature starts only when its markup is on the current page. */
document.documentElement.classList.add('js');
document.addEventListener('error',e=>{if(e.target.tagName==='IMG')e.target.classList.add('broken')},true);

const U='https://komu.edu.ng/',S='images/',A='assets/';
const $=(s,r=document)=>r.querySelector(s),$$=(s,r=document)=>[...r.querySelectorAll(s)];
const esc=s=>String(s).replace(/[&<>"']/g,c=>'&#'+c.charCodeAt(0)+';');
const ic=(n,c='ico')=>`<svg class="${c}" aria-hidden="true"><use href="#i-${n}"/></svg>`;
const isExt=h=>/^(https?:|tel:|mailto:)/.test(h);
const ext=h=>/^https?:/.test(h)?' target="_blank" rel="noopener"':'';
const fmt=d=>d?new Date(d+'T00:00').toLocaleDateString('en-GB',{day:'numeric',month:'short',year:'numeric'}):'From the archive';
const fmtDM=d=>new Date(d+'T00:00').toLocaleDateString('en-GB',{day:'numeric',month:'short'});
const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;
const jump=sel=>{const el=$(sel);if(el)el.scrollIntoView({behavior:reduced?'auto':'smooth',block:'start'})};
const li=(t,i='check')=>`<li>${ic(i)}<span>${t}</span></li>`;
const ord=n=>{const s=['th','st','nd','rd'],v=n%100;return n+(s[(v-20)%10]||s[v]||s[0])};
const param=k=>new URLSearchParams(location.search).get(k);
const plural=(n,w,many=w+'s')=>`${n} ${n===1?w:many}`;

/* ---------- data (komu.edu.ng, JAMB IBASS 2026/2027, supplied prototypes) ---------- */
const CUT={'Medicine and Surgery':220,'Law':210,'Nursing Science':210,'Medical Laboratory Science':200};
const cut=d=>CUT[d]||150;
const FAC=[
  {id:1,name:'Science',icon:'flask',depts:['Animal & Environmental Biology','Biochemistry','Biology','Chemistry','Mathematics','Microbiology','Physics','Plant Science & Biotechnology','Statistics'],blurb:'The largest faculty, covering the laboratory sciences, mathematics and statistics. Physics and Animal & Environmental Biology earned full NUC accreditation in 2022.'},
  {id:11,name:'Computing',icon:'cpu',depts:['Computer Science','Cyber Security','Information Technology'],blurb:'Software, security and systems, supported by the TD Africa/Huawei ICT Academy launched with KOMU in 2024.'},
  {id:8,name:'Basic Medical Sciences',icon:'pulse',depts:['Medicine and Surgery'],blurb:'Home of the medical degree. Open only to candidates who chose KOMU first at UTME registration, with a minimum score of 220.'},
  {id:9,name:'Allied Health Sciences',icon:'heart',depts:['Environmental Health Science','Medical Laboratory Science','Nursing Science','Public Health'],blurb:'Nursing, laboratory science and public health. Nursing and Medical Laboratory Science are restricted to first-choice candidates.'},
  {id:10,name:'Law',icon:'scale',depts:['Law'],blurb:'The law degree. First-choice candidates only, with a minimum UTME score of 210.'},
  {id:12,name:'Administration & Management',icon:'briefcase',depts:['Accounting','Banking and Finance','Business Administration','Employment Relations & Human Resource Management','Entrepreneurship','Marketing'],blurb:'Accounting, finance, business and enterprise. Banking and Finance earned full NUC accreditation in 2022.'},
  {id:3,name:'Social Sciences',icon:'users',depts:['Economics','Political Science','Psychology','Sociology'],dean:'Obinna I. Anyanwu',blurb:'Economics, politics, psychology and society.'},
  {id:4,name:'Arts',icon:'pen',depts:['English & Literary Studies','History & International Studies','Linguistics','Philosophy'],blurb:'Languages, literature, history and philosophy. Linguistics earned full NUC accreditation in 2022.'},
  {id:5,name:'Architecture & Environmental Sciences',icon:'compass',depts:['Architecture','Estate Management'],blurb:'Designing and managing the built environment.'}
];
const BPC='Biology, Physics and Chemistry',BPC_OL='English Language, Mathematics, Biology, Chemistry and Physics',ECO_OL='English Language, Mathematics, Economics and two other relevant subjects';
/* [UTME subjects (after Use of English), O'Level credits, indicative career directions] */
const PD={
  'Animal & Environmental Biology':['Biology and any two of Physics, Chemistry and Mathematics','English Language, Mathematics, Biology and two other science subjects',['Wildlife or environmental field research','Environmental consultancy','Biological research support']],
  'Biochemistry':['Biology, Chemistry, and Physics or Mathematics',BPC_OL,['Biochemistry laboratory work','Biomedical or pharmaceutical research support','Quality-control laboratory work']],
  'Biology':['Biology, Chemistry, and Physics or Mathematics','English Language, Mathematics, Biology, and Physics or another relevant science subject',['Biological research support','Conservation or environmental work','Biology teaching, with a teaching qualification']],
  'Chemistry':['Chemistry and two of Physics, Biology and Mathematics',BPC_OL,['Analytical or industrial laboratory work','Quality assurance and quality control','Chemical research support']],
  'Mathematics':['Mathematics and any two of Physics, Chemistry, Economics or Geography','English Language, Mathematics, Physics or Chemistry, and two other relevant subjects',['Quantitative analysis','Mathematical or statistical research support','Mathematics teaching, with a teaching qualification']],
  'Microbiology':['Biology, Chemistry, and Physics or Mathematics',BPC_OL,['Microbiology laboratory work','Food, pharmaceutical or industrial quality control','Research support']],
  'Physics':['Physics, Mathematics, and Chemistry or Biology','English Language, Mathematics, Physics, Chemistry and one other science subject',['Technical or scientific research support','Instrumentation and measurement','Physics teaching, with a teaching qualification']],
  'Plant Science & Biotechnology':['Biology, Chemistry and any other science subject','English Language, Mathematics, Biology, Chemistry and one other science subject',['Plant or crop research support','Agricultural and horticultural work','Plant biotechnology laboratory support']],
  'Statistics':['Mathematics and any two of Physics, Chemistry and Economics','English Language, Mathematics and three other relevant subjects',['Statistical analysis','Data analysis','Survey and research analytics']],
  'Computer Science':['Mathematics, Physics, and one of Biology, Chemistry, Agricultural Science, Economics or Geography','English Language, Mathematics, Physics and two relevant science subjects',['Software development','Systems or application development','Computing research support']],
  'Cyber Security':['Mathematics, Physics and Chemistry','English Language, Mathematics, Physics, Chemistry and one other relevant science subject',['Information-security analysis','Security operations support','Cyber-risk and compliance support']],
  'Information Technology':['Mathematics, Physics and Chemistry','English Language, Mathematics, Physics, Chemistry and one other relevant subject',['IT support','Network or systems administration','IT service and infrastructure operations']],
  'Medicine and Surgery':[BPC,BPC_OL,['Medical practice, after medical training and registration','Clinical or biomedical research']],
  'Environmental Health Science':[BPC,BPC_OL,['Environmental-health inspection and programmes','Workplace health and safety','Environmental public-health services, subject to registration']],
  'Medical Laboratory Science':[BPC,BPC_OL,['Medical laboratory science, after training and registration','Clinical diagnostic laboratory work','Laboratory quality assurance']],
  'Nursing Science':[BPC,BPC_OL,['Nursing practice, after training and registration','Clinical or community-health nursing']],
  'Public Health':[BPC,BPC_OL,['Public-health programme support','Community-health work','Epidemiology, with further training']],
  'Law':['Literature in English, Government, and any other Arts or Social Science subject','English Language, Mathematics, Literature in English and two other relevant Arts or Social Science subjects',['Legal research or paralegal work','Legal practice, after Law School and call to the Bar','Compliance support']],
  'Accounting':['Mathematics, Economics and any other Social Science subject',ECO_OL,['Accounting and audit support','Financial reporting','Professional accountancy, with the required credentials']],
  'Banking and Finance':['Mathematics, Economics, and Government or Geography','English Language, Mathematics, Economics and two other relevant Social Science or commercial subjects',['Financial analysis','Banking operations','Credit or risk analysis']],
  'Business Administration':['Mathematics, Economics and any other Social Science subject',ECO_OL,['Business operations','Management analysis','Administrative coordination']],
  'Employment Relations & Human Resource Management':['Mathematics, Economics and one other subject',ECO_OL,['Human-resources support','Employee-relations work','Recruitment and personnel administration']],
  'Entrepreneurship':['Economics, Mathematics and one other Social Science or commercial subject',ECO_OL,['Starting or running a small business','Business development','Enterprise and startup programme support']],
  'Marketing':['Mathematics, Economics and one other subject','English Language, Mathematics and three other relevant subjects',['Marketing coordination','Market research','Customer and campaign analysis']],
  'Economics':['Economics, Mathematics, and one of Government, History, Geography, Literature in English, French or CRS/IRS',ECO_OL,['Economic research support','Policy and market analysis','Financial analysis, with further skills']],
  'Political Science':['Government or History, plus two other Social Science or Arts subjects','English Language, Mathematics, Government or History, and two other relevant subjects',['Policy research','Public-sector administration','Governance analysis']],
  'Psychology':['any three Arts or Social Science subjects','English Language, Mathematics and three other relevant Arts or Social Science subjects',['Research support','Human-resources or community-service work','Psychological practice, with further training and registration']],
  'Sociology':['any three Social Science or Arts subjects','English Language, Mathematics and three other relevant Arts or Social Science subjects',['Social research','Community development','Policy or programme support']],
  'English & Literary Studies':['Literature in English, one other Arts subject, and one Arts or Social Science subject','English Language, Literature in English and three other relevant subjects',['Writing and editing','Communications or public relations','Publishing and content work']],
  'History & International Studies':['Arts and Social Science subjects','English Language, History or Government, and three other relevant subjects',['Historical or policy research','Archives, museums and heritage','International-affairs programme support']],
  'Linguistics':['any language and two other subjects','English Language and other relevant Arts or language subjects',['Language research','Translation or localisation','Language-data or speech-technology support']],
  'Philosophy':['any three subjects','English Language and four other relevant subjects',['Ethics or policy research support','Writing and analysis','Academic work, with further study']],
  'Architecture':['Physics, Mathematics, and one of Chemistry, Geography, Art, Biology or Economics','English Language, Mathematics, Physics, Chemistry and one other relevant subject',['Architectural design support','Building-design documentation','Architectural practice, subject to professional registration']],
  'Estate Management':['Mathematics, Economics and one other subject',ECO_OL,['Property and facilities management','Valuation support','Property consultancy, subject to professional requirements']]
};
const PROG=[
  {slug:'undergraduate',name:'Undergraduate',tag:'Post-UTME and Direct Entry',text:'Degree programmes across all nine faculties. Screening uses your verified UTME score and the O’Level results on JAMB CAPS. The supplementary form first asks you to validate your JAMB registration number.',facts:[['Processing fee','₦2,000'],['Main screening','Closed 31 Jul 2026'],['Supplementary','Open from 1 Sep 2026']],links:[['Application guide','admissions/programs/undergraduate/application-form-guide'],['Supplementary form, 2026/2027','forms/supplementary-form'],['Continue a previous application','admissions/programs/undergraduate/continue-application'],['Admission list','admissions/programs/undergraduate/admission-list'],['Screening notice and cut-offs','admissions/programs/undergraduate/instructions']]},
  {slug:'jupeb',name:'JUPEB',tag:'Joint Universities Preliminary Examinations Board',text:'A one-year foundation programme whose results qualify you for Direct Entry into 200 level. You need at least five relevant O’Level credits, including English Language and Mathematics, in no more than two sittings.',facts:[['Duration','One academic year'],['Entry','5 O’Level credits']],note:'The entry requirements above come from the 2025/2026 instructions. Confirm the 2026/2027 details on the official form before you pay.',links:[['2026/2027 JUPEB application form','forms/20262027-jupeb-application-form'],['Application guide','admissions/programs/jupeb/application-form-guide'],['Continue a previous application','admissions/programs/jupeb/continue-application'],['Admission list','admissions/programs/jupeb/admission-list-new']]},
  {slug:'ijmb',name:'IJMB',tag:'Interim Joint Matriculation Board',text:'An A’Level programme accepted for Direct Entry into all 34 KOMU departments. You need five SSCE/NECO (or equivalent) credits relevant to your course, including English Language and Mathematics, in no more than two sittings.',facts:[['Application form','₦10,500'],['Processing','₦10,500'],['Acceptance','₦20,500'],['Tuition','₦200,000'],['Hostel (optional)','₦100,000']],note:'The 2026/2027 notice set the application deadline at 20 August 2026, which has passed. Ask the University whether registration has reopened before you pay.',links:[['2026/2027 IJMB application form','forms/20262027-ijmb-application-form'],['Instructions','admissions/programs/ijmb/instructions'],['Continue a previous application','admissions/programs/ijmb/continue-application'],['Admission list','admissions/programs/ijmb/admission-list-new']]},
  {slug:'icep',name:'ICEP Conventional',tag:'Institute for Continuing Education Programme',text:'Degree programmes run by the Institute for Continuing Education, on the conventional timetable.',facts:[],links:[['ICEP application form','forms/institute-for-continuing-education-progammps-icep'],['Application guide','admissions/programs/icep-conv-prog/application-form-guide'],['Continue a previous application','admissions/programs/icep-conv-prog/continue-application'],['Admission list','admissions/programs/icep-conv-prog/admission-list']]},
  {slug:'icep-evening',name:'ICEP Evening & Weekend',tag:'Institute for Continuing Education Programme',text:'ICEP degree programmes with lectures in the evenings and at weekends.',facts:[],links:[['Application guide','admissions/programs/icep-eve-wknd-prog/application-form-guide'],['Continue a previous application','admissions/programs/icep-eve-wknd-prog/continue-application'],['Admission list','admissions/programs/icep-eve-wknd-prog/admission-list']]}
];
/* [no, date, lecturer, role, topic, upcoming] — from the official public-lecture poster */
const LECT=[
  [1,'2023-10-11','Professor Chiedu Mafiana','Former Deputy Executive Secretary, National Universities Commission','Kingsley Ozumba Mbadiwe University: Our Ilgwis'],
  [2,'2023-12-20','Professor Chinedum Nwajuba','Former Vice-Chancellor, Alex Ekwueme Federal University Ndufu-Alike Ikwo, Ebonyi State','Building K.O. Mbadiwe University as a First Class Institution: Setting the Right Imperatives in Tune with Changing Realities in the 21st Century'],
  [3,'2024-02-27','Professor B.E.B. Nwoke','Former Acting Vice-Chancellor, Imo State University, Owerri','The Role of Leadership in Internationalization of Kingsley Ozumba K.O. Mbadiwe University, Ideato'],
  [4,'2024-08-08','Professor Kenneth Amaeshi','University of Edinburgh, United Kingdom','Kindred Based Economic System for Inclusive Economies: Lessons from Imo State, Nigeria'],
  [5,'2024-10-30','Dr. Ijeoma Judith Dore','Consultant Physician, Federal Teaching Hospital, Owerri','African Healthy Eating Plate: Demystifying Lifestyle Medicine'],
  [6,'2024-12-18','Prof. Mrs. Uloma Eucharia Onyeka','Professor of Food Chemistry and Nutrition, Federal University of Technology, Owerri','Diet and Lifestyle versus Era of Chronic Diseases'],
  [7,'2025-03-14','Dr. Ediros Stan-Mathias','Senior Member, Hertfordshire Business School, University of Hertfordshire, UK','Enhancing Learning and Teaching with Artificial Intelligence'],
  [8,'2025-07-30','Prof. Emeka E. Oguejofor','Deputy Vice-Chancellor, Research Development & Innovation, Federal University of Technology, Owerri','Be Part of Research'],
  [9,'2026-01-28','Emeritus Professor Bartholomew Ndubuisi Okolo','13th Substantive Vice-Chancellor, University of Nigeria, Nsukka','Emerging Trends in Strategic Resource Mobilization in Global Education Landscape'],
  [10,'2026-02-11','Dr. Ijeoma Uchechukwu Okoli','Retired Senior Environmental Specialist, Metropolitan Water Reclamation District of Chicago, USA','Natural and Anthropogenic Causes of Climate Change: What Can Humans Do?'],
  [11,'2026-02-25','Professor Joseph Nnanchara','Department of Public Health, Federal University of Technology, Owerri','Empowering a Healthier, Stronger University Community by Recognizing How Diabetes Influences Productivity'],
  [12,'2026-03-31','Chief Dr. Barr. Engr. Akaghaunonye O. Success','Barrister; National President, Hope Brings by Instillers; Founder, O.S. Akaghaunonye & Co. (Akua Ugo Chambers)','Imo at 50: A Multi-dimensional Appraisal of the Development of Imo State'],
  [13,'2026-04-15','Professor Chigeme Oji Anosike','President, Edojims Institute of Education and Innovation, New Owerri; 6th Substantive Vice-Chancellor, Federal University of Technology, Owerri','Threats, Tensions and the Future of Higher Education: What Are the Pathways and Coping Strategies for Nigerian Universities?'],
  [14,'2026-05-13','Professor Benedict Chima Onahiri','Professor of Management, Faculty of Management Sciences, University of Port Harcourt','Evaluating the Jewish Phenomenon by Njoku: Key to Higher Education Visibility and Global Relevance'],
  [15,'2026-10-21','Dr Obiukwu Charles Emeka','Professor of Ecotoxicology; Director, Academic Planning, KOMU','Beneath the Waves: Microbial Risks of Offshore Drilling on Nigeria’s Marine Blue Economy',1]
];
const EVENT_AT=new Date('2026-10-21T12:00:00+01:00');
const VC_BIO=[
  ['Introduction',['Professor Frances Ngozi Chukwukere is the Vice-Chancellor of Kingsley Ozumba Mbadiwe University (KOMU), Ideato, Imo State. She is a scholar, linguist, author, researcher, administrator, cultural advocate and academic leader whose career spans teaching, research, university administration, mentorship and the preservation of indigenous language and culture. She is a Professor of Linguistics and Igbo Studies.']],
  ['Academic qualifications',['She obtained a Bachelor of Arts in Linguistics and Igbo from the University of Nigeria, Nsukka (UNN) in 1986, a Postgraduate Diploma in Education in 1989, and a Master’s degree in Linguistics and Nigerian Languages with a focus on Igbo Oral Literature. She earned a Ph.D. in Linguistics from UNN in 2004.','At Imo State University she earned an M.Sc. in International Affairs and Diplomacy in 2007 and a second Ph.D., in History and International Studies, in 2021. She has also extended her research into Climate Change Economics, Policy and Innovation at the Institute of Climate Change Studies, UNN.','She became Professor of Linguistics and Igbo in 2010.']],
  ['Research and contributions to knowledge',['Her specialisations include theoretical linguistics (phonology, morphology, syntax and semantics) and applied and interdisciplinary linguistics, including sociolinguistics, psycholinguistics, historical linguistics and neurolinguistics, as well as discourse analysis, stylistics, translation studies, forensic and clinical linguistics.','Much of her career has been devoted to Igbo Studies, Igbo literature, oral literature and indigenous language preservation. By 2025 she had produced approximately 45 Ph.D. graduates in Linguistics and Igbo Studies.','Her publications include the bilingual poetry collection Nwaanyizie: African Feminist Verses (2006), The Green Pathway to Health and Recovery: Homegrown Options in Third-World Countries (2013), and, as co-author, The National Language Policy and the Demands of Indigenous Language Literacy in Nigeria (2024).']],
  ['International engagement',['In 2013 she worked with the Igbo community in Canada on a curriculum for teaching Igbo in the Canadian school system. In 2015 she lectured in Berlin on “Framing the African Dialectics of Health and Environment: Engaging the Youth in Education and Sustainability.” She is a United Nations Certified Translator.']],
  ['Leadership and administration',['At Imo State University she served as:'],['Head, Department of Linguistics and Igbo Studies: 2004–2009 and 2015–2020','Director, Centre for Igbo Studies: 2009–2011 and 2021–2025','Director, Joint Universities Preliminary Examinations Board (JUPEB): 2020–2021'],['In 2021 she served at the National Universities Commission as Chief Quality Assurance Officer in the Office of the Executive Secretary.','She joined KOMU in May 2021 as the first Dean of the Faculty of Arts and Head of the Department of Linguistics. Under her leadership the Faculty’s departments achieved full accreditation, and she championed the establishment of the Department of Philosophy. She was one of three members of the committee that prepared the position paper for establishing the university that became KOMU.']],
  ['Honours and recognition',['Between 2011 and 2015 she received two international awards from the Climate Reality Project, in Chicago and Miami, for her advocacy on human and environmental health. In March 2026, Ohanaeze Ndigbo Worldwide named her one of four professors for its Professorial Endowment Chair Initiative for the Igbo language, and in June 2026 she represented its President-General at the 12th Chief Dr. F. C. Ogbalu Memorial Lecture at Nnamdi Azikiwe University, Awka. She holds the title Ambassador of Urualla Clan Assembly, conferred in 2021.']],
  ['Community and culture',['She founded the Igbo Development Foundation for Peace, Language and Culture (ÌGBÒFỌ), which supports Igbo-language teaching in universities in Nigeria and beyond, and The Green Pathway Initiative, which promotes indigenous lifestyles, environmental responsibility and sustainable development.']]
];
const OFF=[
  {role:'Vice-Chancellor',name:'Prof. Frances Ngozi Chukwukere',img:'principal-officers/October2026/01M4B6NG9B01KB9ZM6V5CT4CSZ.jpeg',pos:'30% 20%',link:'principal-officers/1/vice-chancellor/details',sections:VC_BIO},
  {role:'Deputy Vice-Chancellor',name:'Prof. Jude-Anthony Ogbulie',img:null,link:'principal-officers/2/deputy-vice-chancellor/details',bio:['Prof. Ogbulie oversaw the affairs of the University for three months before handing over to the new Vice-Chancellor in August 2026.']},
  {role:'Registrar (Ag.)',name:'Mr. Uchechukwu Daniel Okoro',img:'principal-officers/October2026/01M4B6F7D3DEZRWN3P9Y5PR3FW.jpg',link:'principal-officers/3/registrar/details',bio:['B.Sc.(Ed) and M.Sc. in Economics from Imo State University, where he is completing a Ph.D.','He has worked as a Planning Officer with the Imo State Local Government Service Commission, at First Bank, and as an aide in several Imo State government offices. At KOMU he has worked on Senate administration, admissions, accreditation, staff promotion and university ceremonials.']},
  {role:'University Librarian',name:'Dr. Ngozi Maria Nwaohiri, CLN',img:'principal-officers/October2026/01M4B6JACJC84YAM1P93JM85J3.jpg',link:'principal-officers/5/university-librarian/details',bio:['Ph.D. in Library and Information Science (2019) and a Certified Librarian of Nigeria.','Her training includes Abia State University, Imo State University, the University of Wales, the University of Pretoria and NITTTR Chennai, India, with further certification in open content and Research4Life (Hinari).']},
  {role:'Bursar',name:'Dr. Wilson Agbarakwe',img:'principal-officers/October2026/01M4B6H19FK41AKM6RZBV7VNNE.jpg',link:'principal-officers/4/bursar/details',bio:['B.Sc., M.Sc. and Ph.D. in Economics, and an MBA. Associate member of the Association of National Accountants of Nigeria and the Chartered Institute of Cost and Management Accountants.','He spent 14 years in banking across operations, cash management, relationship management and HR before moving into academia, and has published on investment, tax and growth in Nigeria.']}
];
const GAL=[
  {src:A+'senate-building.jpg',cap:'The Senate Building',cat:'Campus',k:'wide'},
  {video:A+'komu-hero.mp4',src:A+'hero-poster.jpg',cap:'Campus film: K.O.M.U',cat:'Video',k:'tall'},
  {src:S+'activities/May2026/01KSZCG3NYQ2Z2ZHVYJPVYPME8.png',cap:'Aerial view of the main campus, Ogboko',cat:'Campus',k:'wide'},
  {src:S+'gallery-photos/01KSZCCW5GTYFRKS7Q5HFE5NYH.jpeg',cap:'Students’ accommodation',cat:'Campus'},
  {src:S+'gallery-photos/01KSZWEHPM0V02BZHCVX04KCM4.jpeg',cap:'The University Library',cat:'Campus'},
  {src:S+'gallery-photos/01KSZWFCE0CZNTN4486TBCDXHH.jpeg',cap:'Inside a hostel room',cat:'Campus'},
  {src:S+'activities/January2026/01KFWN00NYFV4TF6S82VTSM70Y.jpeg',cap:'Teaching blocks on the main campus',cat:'Campus'},
  {src:A+'special-citation.jpg',cap:'Special Citation and public lecture, 21 October 2026',cat:'Events',k:'wide'},
  {src:S+'activities/May2026/01KSZDWBKV2XJCJT4T1T8STZDG.jpg',cap:'Launch of the TD Africa/Huawei ICT Academy',cat:'Events'},
  {src:S+'activities/May2026/01KSZWAQV1H76Z1PKE54ARYQC8.jpeg',cap:'Staff and visitors on campus',cat:'Events'},
  {src:S+'activities/August2026/01M0YYEGW3WJZPZBS6XR3FTB0V.png',cap:'Handover to Vice-Chancellor Prof. Frances Chukwukere',cat:'Leadership'},
  {src:S+'gallery-photos/01KSZEBBMXGWKGR6H2JHERSAXZ.jpg',cap:'Governor Hope Uzodimma, Visitor to the University',cat:'Leadership'}
];
const VAL=[['I','Integrity','We shall strive to be honest, respectful, transparent, accountable, fair and equitable in our dealings.'],['E','Excellence','We will ensure best practices, adopt meritocracy and apply the highest ethical standards, including preserving the natural environment.'],['T','Team work','We shall work closely and inclusively with one another, communicating openly to achieve common goals.'],['I','Innovation','We shall strive to be creative, harnessing our transformative energy for the good of the environment and society.'],['C','Collaboration','We shall build strong bonds of friendship with similar organisations for mutual benefit.']];
const STAFF_PORTAL=U+'staff/dashboard/login';
const PER={
  pro:[['Post-UTME application','Undergraduate, 2026/2027',U+'admissions/programs/undergraduate/application-form-guide','file'],['Supplementary form','Post-UTME and Direct Entry, from 1 Sep 2026',U+'forms/supplementary-form','file'],['JUPEB application','2026/2027 foundation programme',U+'forms/20262027-jupeb-application-form','cap'],['IJMB application','2026/2027 A’Level programme',U+'forms/20262027-ijmb-application-form','cap'],['Continue an application','Use your application number',U+'admissions/programs/undergraduate/continue-application','list'],['Am I eligible?','UTME cut-offs by programme','admissions.html#eligibility','gauge']],
  stu:[['Student portal','Registration, fees and results',U+'students/login','id'],['E-learning','Online classes and course materials','https://elearning.komu.edu.ng/','screen'],['E-library','Journals, e-books and databases','https://komu.my-library.com.ng/','book'],['Check your results','Student portal, “Notification of Results”',U+'students/login','gauge'],['Upcoming event','Special Citation, 21 October 2026','#events','cal'],['News and notices','Updates from the University','news.html','list']],
  grad:[['Undergraduate transcript','Degree programmes',U+'transcript/apply?program=undergraduate','file'],['JUPEB transcript','Foundation programme',U+'transcript/apply?program=jupeb','file'],['IJMB transcript','A’Level programme',U+'transcript/apply?program=ijmb','file'],['ICEP transcript','Conventional programme',U+'transcript/apply?program=icep-conv-prog','file'],['ICEP transcript','Evening and weekend programme',U+'transcript/apply?program=icep-eve-wknd-prog','file'],['Ask the Registry','Call or email the University','contact.html','mail']],
  staff:[['Staff portal','Staff sign-in',STAFF_PORTAL,'id'],['Academic staff directory','Find a colleague',U+'staff/directory/index','users'],['Non-academic staff directory','Administrative and technical staff',U+'staff/directory/non-academic','users'],['Academic publications','Research by KOMU staff',U+'publications/index','book'],['University Meet room','Google Meet for online meetings','https://meet.google.com/npy-vxhz-zcc','video'],['E-learning','Course delivery platform','https://elearning.komu.edu.ng/','screen']]
};
const GRAD_NOTE=`<div class="q-note"><div><small>Transcript fee</small><b>₦15,000</b></div><div><small>Processing</small><b>About 48 business hours</b></div><div><small>Before you order</small><b>Results approved</b></div><p>Check “Notification of Results” in the Student Portal first. No transcript after 15 working days (Nigerian address) or 45 (international)? Email the University with your full name, student number and order number.</p></div>`;
const FAQ=[
  ['How much does it cost to apply?','The Post-UTME and Direct Entry processing fee is ₦2,000, paid on Remita by card, transfer, USSD, bank invoice or Remita wallet.','admissions.html#how','How to apply'],
  ['KOMU wasn’t my first choice. Can I still apply?','Yes, for most programmes, if you scored 150 or more and change your institution to KOMU on JAMB CAPS. Medicine and Surgery, Nursing Science, Law and Medical Laboratory Science only admit first-choice candidates.','admissions.html#eligibility','Check your eligibility'],
  ['I started an application. How do I finish it?','Use “Continue previous admission process” with the application number you were given when you started.',U+'admissions/programs/undergraduate/continue-application','Continue an application'],
  ['How do I order a transcript?','Apply online and pay ₦15,000 by card. Orders are usually processed within 48 business hours, but only once all your results have been approved.','index.html?per=grad#start','Graduate services'],
  ['Where can I see my results?','Sign in to the Student Portal and open “Notification of Results” in the side menu.',U+'students/login','Student portal'],
  ['Who should I contact?','Call +234 817 538 8217 or email admin@komu.edu.ng. Academic questions go to your faculty or department.','tel:+2348175388217','Call the University']
];
const NEWS_CATS=['All','Admissions','Leadership','Academics','Partnerships','Campus'].filter(c=>c==='All'||NEWS.some(n=>n.cat===c));

/* ---------- shared: tabs, dialogs, side panel ---------- */
function tablist(el,on){
  el.addEventListener('click',e=>{const b=e.target.closest('[role=tab]');if(b)on(b)});
  el.addEventListener('keydown',e=>{
    const k={ArrowRight:1,ArrowDown:1,ArrowLeft:-1,ArrowUp:-1}[e.key];if(!k)return;
    const t=$$('[role=tab]',el),i=t.indexOf(document.activeElement);if(i<0)return;
    e.preventDefault();const n=t[(i+k+t.length)%t.length];n.focus();on(n);
  });
}
$$('dialog').forEach(d=>{
  d.addEventListener('click',e=>{
    if(e.target.closest('[data-close]'))return d.close();
    if(e.target!==d)return;
    const r=d.getBoundingClientRect();
    if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)d.close();
  });
});
const drawer=$('#drawer');
function openDrawer(html,label){$('#drBody').innerHTML=html;drawer.setAttribute('aria-label',label);if(!drawer.open)drawer.showModal();drawer.scrollTop=0}
function articleBody(b){
  if(!b.length)return '<p>This notice was issued as a poster.</p>';
  let out='',inList=false;
  for(const [t,x] of b){
    if(t==='li'){if(!inList){out+='<ul>';inList=true}out+=`<li>${esc(x)}</li>`;continue}
    if(inList){out+='</ul>';inList=false}
    out+=t==='h'?`<h3>${esc(x)}</h3>`:`<p>${esc(x)}</p>`;
  }
  return out+(inList?'</ul>':'');
}
const openNews=n=>openDrawer(`${n.img?`<img class="dr-img" src="${S+n.img}" alt="">`:''}<small class="meta">${n.cat} · ${fmt(n.date)}</small><h2>${esc(n.title)}</h2>${n.by?`<p class="by">By ${esc(n.by)}</p>`:''}<div class="art">${articleBody(n.body)}</div>${n.cat==='Admissions'?`<a class="btn btn-ink" href="admissions.html">Admissions 2026/2027 ${ic('arrow')}</a>`:''}`,n.title);
function openOff(o){
  const body=o.sections
    ?`<nav class="toc" aria-label="Biography sections">${o.sections.map((s,i)=>`<button type="button" data-bio="${i}">${s[0]}</button>`).join('')}</nav>`+o.sections.map(([h,ps,list,after],i)=>`<section class="bio-sec" id="bio-${i}"><h3>${h}</h3>${ps.map(p=>`<p>${p}</p>`).join('')}${list?`<ul>${list.map(x=>`<li>${x}</li>`).join('')}</ul>`:''}${after?after.map(p=>`<p>${p}</p>`).join(''):''}</section>`).join('')
    :o.bio.map(p=>`<p>${p}</p>`).join('');
  openDrawer(`${o.img?`<img class="dr-img" src="${S+o.img}" alt="${o.name}" style="object-position:${o.pos||'50% 20%'}">`:''}<p class="role">${o.role}</p><h2>${o.name}</h2>${body}<a class="btn btn-ink" href="${U+o.link}" target="_blank" rel="noopener">Profile on komu.edu.ng ${ic('out')}</a>`,o.name);
}
function openProgramme(d){
  const f=FAC.find(x=>x.depts.includes(d)),[subj,ol,car]=PD[d];
  openDrawer(`<p class="role">Faculty of ${f.name}</p><h2>${d}</h2>
    <div class="pf-facts"><div><small>UTME cut-off</small><b>${cut(d)}</b></div><div><small>KOMU as first choice</small><b>${CUT[d]?'Required':'Not required'}</b></div><div><small>Entry routes</small><b>UTME · Direct Entry</b></div><div><small>A’Level routes</small><b>JUPEB · IJMB</b></div></div>
    <section class="pf"><h3>UTME subjects</h3><p>Use of English, plus ${subj}.</p></section>
    <section class="pf"><h3>O’Level requirements</h3><p>Five credits, in no more than two sittings, including ${ol}.</p></section>
    <section class="pf"><h3>Where it can lead</h3><ul class="careers">${car.map(c=>`<li>${c}</li>`).join('')}</ul><p class="pf-note">General occupational directions, not KOMU graduate outcome data.</p></section>
    <div class="pf-act"><button class="btn btn-gold" type="button" data-check="${d}">Check my eligibility</button><a class="tlink" href="${U}faculties/${f.id}" target="_blank" rel="noopener">Faculty page ${ic('out')}</a></div>
    <p class="pf-src">Sources: JAMB IBASS 2026/2027 brochure and the KOMU 2026/2027 screening notice. Confirm with the Admissions Office before you apply.</p>`,d);
}
$('#drBody').addEventListener('click',e=>{const b=e.target.closest('[data-bio]');if(b)$('#bio-'+b.dataset.bio).scrollIntoView({behavior:reduced?'auto':'smooth'})});

/* ---------- header, menus, notice, back to top ---------- */
const hdr=$('#hdr'),toTop=$('#toTop');
addEventListener('scroll',()=>{hdr.classList.toggle('scrolled',scrollY>8);toTop.classList.toggle('show',scrollY>900)},{passive:true});
toTop.onclick=()=>scrollTo({top:0,behavior:reduced?'auto':'smooth'});
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&document.activeElement.closest('.dd'))document.activeElement.blur()});
$('#megaFac').innerHTML=FAC.map(f=>`<a href="academics.html#faculty-${f.id}">${ic(f.icon,'ico mi')}<span>Faculty of ${f.name}<small>${plural(f.depts.length,'department')}</small></span></a>`).join('')+`<hr><a href="academics.html#research">${ic('flask','ico mi')}<span>Research &amp; innovation<small>Highlights and partnerships</small></span></a><a href="${U}publications/index" target="_blank" rel="noopener">${ic('book','ico mi')}<span>Academic publications<small>Staff research directory</small></span></a>`;
$('#megaAdm').innerHTML=`<a href="admissions.html#eligibility"><span>Am I eligible?<small>UTME cut-offs by programme</small></span></a>`+PROG.map(p=>`<a href="admissions.html#route-${p.slug}"><span>${p.name}<small>${p.tag}</small></span></a>`).join('')+`<hr><a href="admissions.html#how">How to apply</a><a href="index.html?per=grad#start">Transcripts</a>`;
$('#ftFac').innerHTML=FAC.map(f=>`<li><a href="academics.html#faculty-${f.id}">${f.name}</a></li>`).join('');
const navDlg=$('#navDlg');
$('#openNav').onclick=()=>navDlg.showModal();
navDlg.addEventListener('click',e=>{if(e.target.closest('a'))navDlg.close()});
try{if(localStorage.getItem('komu-notice')==='citation')$('#notice').hidden=true}catch(e){}
$('#closeNotice').onclick=()=>{$('#notice').hidden=true;try{localStorage.setItem('komu-notice','citation')}catch(e){}};
/* links to a section of the page you are already on just scroll, without reloading */
const samePage=u=>u.origin===location.origin&&u.pathname.replace(/\/index\.html$/,'/')===location.pathname.replace(/\/index\.html$/,'/')&&u.search===location.search;
document.addEventListener('click',e=>{
  const a=e.target.closest('a[href]');if(!a||a.target||e.defaultPrevented||e.ctrlKey||e.metaKey||e.shiftKey)return;
  const u=new URL(a.getAttribute('href'),location.href);
  if(u.hash&&samePage(u)){e.preventDefault();if(location.hash===u.hash)jump(u.hash);else location.hash=u.hash;if(a.closest('.menu'))a.blur()}
});
/* on the main page, highlight About / News & events while reading those sections */
const secIds=['about','leadership','news','events'].filter(id=>document.getElementById(id));
if(secIds.length){
  const io=new IntersectionObserver(es=>es.forEach(e=>{
    if(e.isIntersecting)$$('.nav [data-sec]').forEach(l=>l.parentElement.classList.toggle('is-active',l.dataset.sec.split(' ').includes(e.target.id)));
  }),{rootMargin:'-45% 0px -50% 0px'});
  secIds.forEach(id=>io.observe(document.getElementById(id)));
}

/* ---------- event countdown + calendar ---------- */
function countdown(){
  const ms=EVENT_AT-Date.now(),box=$('#countdown');
  if(ms<=0){
    const t=ms>-6*36e5?'Happening today':'Held on 21 October 2026';
    $$('[data-countdown]').forEach(el=>el.textContent=t);
    if(box){box.hidden=true;const d=$('#cdDone');d.hidden=false;d.textContent=t}
    return false;
  }
  const p=[Math.floor(ms/864e5),Math.floor(ms%864e5/36e5),Math.floor(ms%36e5/6e4),Math.floor(ms%6e4/1e3)];
  if(box)$$('b',box).forEach((b,i)=>b.textContent=String(p[i]).padStart(2,'0'));
  $$('[data-countdown]').forEach(el=>el.textContent=`in ${plural(p[0],'day')}, ${plural(p[1],'hour')}`);
  return true;
}
if(countdown()){const cdTimer=setInterval(()=>{if(!countdown())clearInterval(cdTimer)},1000)}
function addToCalendar(){
  const stamp=new Date().toISOString().replace(/[-:]/g,'').replace(/\.\d+/,'');
  const ics=['BEGIN:VCALENDAR','VERSION:2.0','PRODID:-//KOMU//Events//EN','BEGIN:VEVENT','UID:special-citation-20261021@komu.edu.ng','DTSTAMP:'+stamp,'DTSTART:20261021T110000Z','SUMMARY:Special Citation in honour of Dr Obiukwu Charles Emeka','LOCATION:Senate Chamber\\, Kingsley Ozumba Mbadiwe University\\, Ideato\\, Imo State','DESCRIPTION:Special Citation and 15th public lecture at KOMU. Starts 12 noon.','END:VEVENT','END:VCALENDAR'].join('\r\n');
  const a=document.createElement('a');a.href=URL.createObjectURL(new Blob([ics],{type:'text/calendar'}));a.download='komu-special-citation.ics';
  document.body.append(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(a.href),1000);
}

/* ---------- main page: hero carousel ---------- */
function initHero(){
  const hero=$('#top'),slides=$$('.slide',hero),segBtns=$$('.seg-b',hero),vid=$('#heroVideo'),pauseBtn=$('#heroPause');
  const DUR=slides.map((_,i)=>i?8500:6500),HOLD=1500,VID_MAX=15000;
  let cur=-1,elapsed=0,endAt=0,last=performance.now(),userPaused=reduced,focusPaused=false,vidFailed=false;
  const paused=()=>userPaused||focusPaused||document.hidden;
  const fill=(k,v)=>segBtns[k].querySelector('i').style.transform=`scaleX(${v})`;
  const playVid=()=>vid.play().catch(()=>{vidFailed=true});
  function go(i){
    i=(i+slides.length)%slides.length;
    slides.forEach((s,k)=>{const on=k===i;s.classList.toggle('on',on);s.inert=!on});
    segBtns.forEach((b,k)=>{b.setAttribute('aria-selected',k===i);fill(k,k<i?1:0)});
    cur=i;elapsed=0;endAt=0;
    if(i===0){vid.currentTime=0;if(!userPaused)playVid()}else vid.pause();
  }
  /* the film slide follows the video itself, then holds its last frame; other slides are timed */
  function frame(now){
    const dt=now-last;last=now;
    if(!paused()){
      elapsed+=dt;
      const film=cur===0&&!vidFailed;
      if(film&&!vid.ended){fill(0,vid.duration?vid.currentTime/vid.duration:0);if(elapsed>VID_MAX)go(1)}
      else{
        if(film&&!endAt)endAt=elapsed;
        const d=film?HOLD:DUR[cur],t=film?elapsed-endAt:elapsed;
        fill(cur,film?1:Math.min(t/d,1));
        if(t>=d)go(cur+1);
      }
    }
    requestAnimationFrame(frame);
  }
  function setPaused(p){
    userPaused=p;pauseBtn.setAttribute('aria-label',p?'Play slideshow':'Pause slideshow');
    $('use',pauseBtn).setAttribute('href',p?'#i-play':'#i-pause');
    if(cur===0&&!vid.ended)p?vid.pause():playVid();
  }
  segBtns.forEach((b,k)=>b.addEventListener('click',()=>go(k)));
  $('#heroPrev').onclick=()=>go(cur-1);$('#heroNext').onclick=()=>go(cur+1);
  pauseBtn.onclick=()=>setPaused(!userPaused);
  $('.hero-ctrl',hero).addEventListener('keydown',e=>{if(e.key==='ArrowLeft')go(cur-1);if(e.key==='ArrowRight')go(cur+1)});
  hero.addEventListener('focusin',()=>focusPaused=true);
  hero.addEventListener('focusout',e=>{if(!hero.contains(e.relatedTarget))focusPaused=false});
  let sx=null;
  hero.addEventListener('pointerdown',e=>{if(e.pointerType==='touch')sx=e.clientX});
  hero.addEventListener('pointerup',e=>{if(sx===null)return;const dx=e.clientX-sx;sx=null;if(Math.abs(dx)>50)go(cur+(dx<0?1:-1))});
  document.addEventListener('visibilitychange',()=>{if(!document.hidden&&cur===0&&!userPaused&&!vid.ended)playVid()});
  setPaused(userPaused);go(reduced?1:0);requestAnimationFrame(frame);
}

/* ---------- main page: start here ---------- */
function showPer(b){
  $$('#seg [role=tab]').forEach(t=>t.setAttribute('aria-selected',t===b));
  const k=b.dataset.k;
  $('#quick').innerHTML=(k==='grad'?GRAD_NOTE:'')+PER[k].map(([t,s,h,i],n)=>`<a class="q" style="--i:${n}" href="${h}"${ext(h)}><span class="qi">${ic(i)}</span><span><b>${t}</b><small>${s}</small></span>${ic(/^https?:/.test(h)?'out':'arrow','ico ext')}</a>`).join('');
}
function initStart(){const k=param('per');tablist($('#seg'),showPer);showPer($(`#seg [data-k="${PER[k]?k:'pro'}"]`))}

/* ---------- news: main page (latest 8) and news page (all + archive) ---------- */
const haystack=new Map(NEWS.map(n=>[n,(n.title+' '+n.sum+' '+n.cat+' '+n.by+' '+n.body.map(b=>b[1]).join(' ')).toLowerCase()]));
const storyCard=(n,lead)=>`<article class="story ${lead?'lead':''}">${n.img?`<img src="${S+n.img}" alt="" loading="lazy">`:'<span class="ph">KOMU</span>'}<div class="sb"><small class="meta">${n.cat} · ${fmt(n.date)}</small><h3><button class="stretch" data-news="${n.id}">${esc(n.title)}</button></h3>${lead&&n.sum?`<p>${esc(n.sum)}</p><span class="more">Read more ${ic('arrow')}</span>`:''}</div></article>`;
function initNews(){
  const grid=$('#newsGrid'),limit=+grid.dataset.limit||8,search=$('#newsSearch'),arch=$('#archiveList');
  let cat='All',q='',year='All';
  const matches=()=>NEWS.filter(n=>(cat==='All'||n.cat===cat)&&(!q||haystack.get(n).includes(q)));
  function renderArchive(list){
    const years=[...new Set(list.map(n=>n.date.slice(0,4)))];
    if(year!=='All'&&!years.includes(year))year='All';
    $('#yearChips').innerHTML=['All',...years].map(y=>`<button class="chip" aria-pressed="${y===year}" data-y="${y}">${y==='All'?'All years':y}</button>`).join('');
    const shown=year==='All'?list:list.filter(n=>n.date.startsWith(year));
    arch.innerHTML=shown.length?[...new Set(shown.map(n=>n.date.slice(0,4)))].map(y=>{const items=shown.filter(n=>n.date.startsWith(y));return `<section class="ar-year"><h3 class="ar-y">${y}<small>${plural(items.length,'story','stories')}</small></h3><ol class="ar-list">${items.map(n=>`<li class="ar"><time datetime="${n.date}">${fmtDM(n.date)}</time><div><small class="meta">${n.cat}</small><h4><button class="stretch" data-news="${n.id}">${esc(n.title)}</button></h4></div>${ic('arrow','ico go')}</li>`).join('')}</ol></section>`}).join('')
      :`<p class="news-empty">${q||cat!=='All'?'No older stories match your search.':'There are no older stories yet.'}</p>`;
  }
  function render(){
    const list=matches();
    grid.innerHTML=list.slice(0,limit).map((n,i)=>storyCard(n,i===0)).join('');
    const all=$('#allNews');if(all)all.hidden=list.length<=limit;
    const count=$('#newsCount');if(count)count.textContent=q||cat!=='All'?`${plural(list.length,'story','stories')} found`:`${plural(list.length,'story','stories')} since September 2021`;
    const empty=$('#newsEmpty');if(empty){empty.hidden=!!list.length;empty.textContent=`No stories match “${q}”. Try a shorter word, such as “admission” or “lecture”.`}
    if(arch)renderArchive(list.slice(limit));
  }
  $('#newsChips').innerHTML=NEWS_CATS.map(c=>`<button class="chip" aria-pressed="${c==='All'}" data-c="${c}">${c}</button>`).join('');
  $('#newsChips').addEventListener('click',e=>{const b=e.target.closest('.chip');if(!b)return;cat=b.dataset.c;$$('#newsChips .chip').forEach(c=>c.setAttribute('aria-pressed',c===b));render()});
  if(search)search.addEventListener('input',()=>{q=search.value.trim().toLowerCase();render()});
  if(arch)$('#yearChips').addEventListener('click',e=>{const b=e.target.closest('.chip');if(!b)return;year=b.dataset.y;renderArchive(matches().slice(limit))});
  render();
}

/* ---------- main page: lectures, values, officers, charter ---------- */
function initLectures(){
  let all=location.hash==='#lectures';
  const render=()=>{
    const L=[...LECT].reverse(),show=all?L:L.slice(0,6);
    $('#lectList').innerHTML=show.map(([n,d,who,role,topic,up],i)=>`<li class="lect" style="animation-delay:${Math.min(i,8)*35}ms"><div class="no">${ord(n)}<time datetime="${d}">${fmt(d)}</time></div><div><h4>${topic}</h4><p>${who}, ${role}</p>${up?'<span class="flag">UPCOMING</span>':''}</div></li>`).join('');
    $('#lectMore').innerHTML=all?`Show fewer ${ic('chev')}`:`Show all ${LECT.length} lectures ${ic('chev')}`;
    $('#lectMore').setAttribute('aria-expanded',all);
  };
  $('#lectMore').onclick=()=>{all=!all;render()};
  $('#lectCount').textContent=LECT.filter(l=>!l[5]).length;
  addEventListener('hashchange',()=>{if(location.hash==='#lectures'&&!all){all=true;render()}});
  render();
}
function initValues(){
  $('#ietic').innerHTML=VAL.map((v,i)=>`<button role="tab" aria-selected="${!i}" aria-controls="ieticPanel" aria-label="${v[1]}" data-v="${i}">${v[0]}</button>`).join('');
  const show=b=>{$$('#ietic [role=tab]').forEach(t=>t.setAttribute('aria-selected',t===b));const v=VAL[b.dataset.v];$('#ieticPanel').innerHTML=`<h3>${v[1]}</h3><p>${v[2]}</p>`};
  tablist($('#ietic'),show);show($('#ietic [role=tab]'));
}
const mono=n=>n.replace(/^(Prof|Dr|Mr|Mrs)\.\s*/,'').split(' ').slice(0,2).map(w=>w[0]).join('');
function initOfficers(){
  $('#officers').innerHTML=OFF.map((o,i)=>`<article class="off"><div class="pic"><span class="mono" aria-hidden="true">${mono(o.name)}</span>${o.img?`<img src="${S+o.img}" alt="${o.name}" loading="lazy" style="object-position:${o.pos||'50% 18%'}">`:''}</div><div class="who"><small>${o.role}</small><h3><button class="stretch" data-off="${i}">${o.name}</button></h3><span class="rd">${o.sections?'Read full biography':'Read profile'} ${ic('arrow')}</span></div></article>`).join('');
}
function initCharter(){const o=()=>{if(location.hash==='#charter')$('#charter').open=true};o();addEventListener('hashchange',o)}

/* ---------- academics page: faculty explorer ---------- */
let curFac=FAC[0].id;
const deptBtn=d=>`<button class="dept" data-dept="${d}"><b>${d}</b><small>UTME ${cut(d)}+${CUT[d]?' · <i>first choice only</i>':''}</small></button>`;
const facFromHash=()=>{const m=location.hash.match(/^#faculty-(\d+)$/);return m&&FAC.some(f=>f.id==m[1])?+m[1]:0};
function markTabs(counts){
  $$('.fx-tab').forEach(t=>{
    const f=FAC.find(x=>x.id==t.dataset.f);
    t.setAttribute('aria-selected',!counts&&f.id===curFac);
    t.querySelector('.n').textContent=counts?counts[f.id]:f.depts.length;
    t.classList.toggle('dim',!!counts&&!counts[f.id]);
  });
}
function showFac(id){
  curFac=+id;$('#deptSearch').value='';markTabs();
  const f=FAC.find(x=>x.id===curFac);
  $('#facPanel').innerHTML=`<p class="eyebrow">Faculty of</p><h3>${f.name}</h3><p class="blurb">${f.blurb}</p>${f.dean?`<p class="dean">Dean of Faculty: <b>${f.dean}</b></p>`:''}<div class="depts">${f.depts.map(deptBtn).join('')}</div><div class="fx-foot"><a class="tlink" href="${U}faculties/${f.id}" target="_blank" rel="noopener">Faculty page ${ic('out')}</a><a class="tlink" href="admissions.html?prog=${encodeURIComponent(f.depts[0])}#eligibility">Check eligibility ${ic('arrow')}</a></div>`;
}
function initExplorer(){
  $('#facTabs').innerHTML=FAC.map(f=>`<button class="fx-tab" role="tab" aria-selected="false" aria-controls="facPanel" data-f="${f.id}">${ic(f.icon)}<span>${f.name}</span><span class="n">${f.depts.length}</span></button>`).join('');
  tablist($('#facTabs'),b=>showFac(b.dataset.f));
  $('#deptSearch').addEventListener('input',e=>{
    const q=e.target.value.trim().toLowerCase();
    if(!q)return showFac(curFac);
    const counts={},groups=FAC.map(f=>{const m=f.depts.filter(d=>d.toLowerCase().includes(q));counts[f.id]=m.length;return[f,m]}).filter(g=>g[1].length);
    markTabs(counts);
    const total=groups.reduce((n,g)=>n+g[1].length,0);
    $('#facPanel').innerHTML=total?`<p class="eyebrow">Search</p><h3>${plural(total,'department')} found</h3>`+groups.map(([f,m])=>`<p class="grp">Faculty of ${f.name}</p><div class="depts">${m.map(deptBtn).join('')}</div>`).join('')
      :`<p class="eyebrow">Search</p><h3>No department matches “${esc(e.target.value.trim())}”</h3><p class="blurb">Try a shorter word, such as “health”, “science” or “management”.</p>`;
  });
  const h=facFromHash();showFac(h||FAC[0].id);if(h)setTimeout(()=>jump('#faculties'),60);
  addEventListener('hashchange',()=>{const h=facFromHash();if(h){showFac(h);jump('#faculties')}});
}

/* ---------- admissions page: eligibility, routes ---------- */
function setProg(p){const f=$('#eligForm');if(!f)return;f.mode.value='utme';$('#eProg').value=p;check()}
function check(){
  const sel=$('#eProg'),fd=new FormData($('#eligForm')),mode=fd.get('mode'),first=fd.get('first')==='yes',prog=sel.value,raw=$('#eScore').value.trim(),score=Number(raw);
  $$('.utme-only').forEach(el=>el.hidden=mode==='de');
  const out=$('#eResult');
  if(!prog){out.innerHTML=`<span class="status info">${ic('info')} Waiting for details</span><p class="r-sub">Choose a programme to see its cut-off and entry rules.</p>`;return}
  const min=cut(prog),restricted=!!CUT[prog];
  if(mode==='de'){out.innerHTML=`<span class="status info">${ic('info')} Direct Entry</span><h4>${prog} by Direct Entry</h4><p class="r-sub">Direct Entry is not scored on UTME. You will need:</p><ul>${li('OND, HND, a first degree, or A’Level results such as JUPEB or IJMB, in a relevant discipline')}${li('Five O’Level credits including '+PD[prog][1]+', in no more than two sittings')}${li('Your O’Level results uploaded on JAMB CAPS')}${li('The ₦2,000 processing fee, paid on Remita')}</ul><a class="btn btn-gold" href="${U}forms/supplementary-form" target="_blank" rel="noopener">Start application ${ic('out')}</a>`;return}
  const valid=raw!==''&&Number.isInteger(score)&&score>=0&&score<=400;
  if(!valid){out.innerHTML=`<span class="status info">${ic('info')} Cut-off: ${min}</span><h4>${prog}</h4><p class="r-sub">${restricted?'Open only to candidates who chose KOMU as first choice at UTME registration. ':''}Enter your 2026 UTME score to check.</p>${raw?'<p class="r-err">Enter a whole number from 0 to 400.</p>':''}`;return}
  const meter=`<div class="meter" role="img" aria-label="Your score ${score} against a cut-off of ${min}, out of 400"><i style="width:${score/4}%"></i><span class="tick" style="left:${min/4}%"><span>Cut-off ${min}</span></span></div>`;
  const why=[];
  if(score<min)why.push(`${prog} needs ${min}. You are ${plural(min-score,'point')} short.`);
  if(restricted&&!first)why.push(`${prog} only admits candidates who chose KOMU first when registering for UTME. Changing to KOMU later on CAPS does not count.`);
  if(!why.length){out.innerHTML=`<span class="status ok">${ic('check')} You meet the cut-off</span><h4>${score} clears the ${min} cut-off for ${prog}.</h4>${meter}<p class="r-sub">Next steps</p><ul>${li('Your UTME subjects must be Use of English plus '+PD[prog][0])}${first?'':li('Change your institution to KOMU on the JAMB CAPS portal')}${li('Upload your O’Level results (WAEC, NECO, GCE or NABTEB) on CAPS')}${li('Complete the form and pay the ₦2,000 fee on Remita')}</ul><a class="btn btn-gold" href="${U}forms/supplementary-form" target="_blank" rel="noopener">Start application ${ic('out')}</a>`;return}
  const fac=FAC.find(f=>f.depts.includes(prog));
  const ok=d=>d!==prog&&cut(d)<=score&&(!CUT[d]||first);
  const near=fac.depts.filter(ok),alts=(near.length?near:FAC.flatMap(f=>f.depts).filter(ok)).slice(0,6);
  out.innerHTML=`<span class="status no">${ic('alert')} Not eligible for this programme</span><h4>${prog}</h4>${meter}<ul>${why.map(w=>li(w,'alert')).join('')}</ul>${alts.length?`<p class="r-sub">With ${score} you can still apply for:</p><div class="alts">${alts.map(d=>`<button type="button" data-alt="${d}">${d}</button>`).join('')}</div>`:''}${score<150?'<p class="r-sub">Every KOMU programme needs at least 150. JUPEB and IJMB lead to Direct Entry instead.</p>':''}`;
}
function initElig(){
  const sel=$('#eProg');
  sel.innerHTML='<option value="">Choose a programme</option>'+FAC.map(f=>`<optgroup label="${f.name}">${f.depts.map(d=>`<option>${d}</option>`).join('')}</optgroup>`).join('');
  $('#eligForm').addEventListener('input',check);
  $('#eResult').addEventListener('click',e=>{const b=e.target.closest('[data-alt]');if(b){sel.value=b.dataset.alt;check()}});
  const p=param('prog');if(p&&PD[p])sel.value=p;
  check();
}
function showProg(i){
  $$('#progTabs [role=tab]').forEach(b=>b.setAttribute('aria-selected',b.dataset.p==i));
  const p=PROG[i];
  $('#progPanel').innerHTML=`<p class="tag">${p.tag}</p><h3>${p.name}</h3><p>${p.text}</p>${p.facts.length?`<div class="rfacts">${p.facts.map(([k,v])=>`<div><small>${k}</small><b>${v}</b></div>`).join('')}</div>`:''}${p.note?`<p class="rnote">${ic('info')}<span>${p.note}</span></p>`:''}<div class="actions">${p.links.map(([t,h])=>`<a href="${U+h}" target="_blank" rel="noopener">${t}${ic('out')}</a>`).join('')}</div>`;
}
const routeFromHash=()=>PROG.findIndex(p=>'#route-'+p.slug===location.hash);
function initRoutes(){
  $('#progTabs').innerHTML=PROG.map((p,i)=>`<button role="tab" aria-selected="${!i}" aria-controls="progPanel" data-p="${i}">${p.name}</button>`).join('');
  tablist($('#progTabs'),b=>showProg(b.dataset.p));
  const i=routeFromHash();showProg(Math.max(i,0));if(i>=0)setTimeout(()=>jump('#routes'),60);
  addEventListener('hashchange',()=>{const i=routeFromHash();if(i>=0){showProg(i);jump('#routes')}});
}

/* ---------- gallery page + lightbox (poster on the main page) ---------- */
let gList=[],gi=0;
const lb=$('#lightbox');
function showG(i){
  gi=(i+gList.length)%gList.length;const g=gList[gi];
  $('#lbMedia').innerHTML=g.video?`<video src="${g.video}" poster="${g.src}" controls autoplay playsinline></video>`:`<img src="${g.src}" alt="${g.cap}">`;
  $('#lbCap').textContent=gList.length>1?`${g.cap} · ${gi+1} of ${gList.length}`:g.cap;
  $('#lbDl').href=g.video||g.src;
  $('#lbPrev').hidden=$('#lbNext').hidden=gList.length<2;
}
function openLb(list,i){gList=list;showG(i);if(!lb.open)lb.showModal()}
$('#lbPrev').onclick=()=>showG(gi-1);$('#lbNext').onclick=()=>showG(gi+1);
lb.addEventListener('keydown',e=>{if(e.target.tagName==='VIDEO')return;if(e.key==='ArrowLeft')showG(gi-1);if(e.key==='ArrowRight')showG(gi+1)});
lb.addEventListener('close',()=>$('#lbMedia').innerHTML='');
function initGallery(){
  let gcat='All';
  const items=()=>GAL.filter(g=>gcat==='All'||g.cat===gcat);
  const render=()=>{$('#galleryGrid').innerHTML=items().map((g,i)=>`<button class="g ${g.k||''}" data-g="${i}" aria-label="${g.video?'Play':'View'}: ${g.cap}" style="animation-delay:${i*30}ms"><img src="${g.src}" alt="" loading="lazy">${g.video?`<span class="play">${ic('play')}</span>`:''}<span class="cap">${g.cap}</span></button>`).join('')};
  $('#galChips').innerHTML=['All',...new Set(GAL.map(g=>g.cat))].map(c=>`<button class="chip" aria-pressed="${c==='All'}" data-gc="${c}">${c}</button>`).join('');
  $('#galChips').addEventListener('click',e=>{const b=e.target.closest('.chip');if(!b)return;gcat=b.dataset.gc;$$('#galChips .chip').forEach(c=>c.setAttribute('aria-pressed',c===b));render()});
  $('#galleryGrid').addEventListener('click',e=>{const b=e.target.closest('[data-g]');if(b)openLb(items(),+b.dataset.g)});
  render();
}

/* ---------- contact page: quick answers, form ---------- */
function initFaq(){
  $('#faq').innerHTML=FAQ.map(([q,a,h,l])=>`<div><dt>${q}</dt><dd>${a}<br><a class="tlink" href="${h}"${ext(h)}>${l} ${ic(/^https?:/.test(h)?'out':'arrow')}</a></dd></div>`).join('');
}
function initContact(){
  const cf=$('#contactForm');
  const rules={
    name:v=>v.trim().length>=2||'Enter your full name.',
    email:v=>/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim())||'Enter a valid email address, like ada@example.com.',
    phone:v=>!v.trim()||/^\+?[\d\s-]{7,16}$/.test(v.trim())||'Use digits only, for example +234 803 123 4567.',
    message:v=>v.trim().length>=10||'Tell us a little more (at least 10 characters).'
  };
  const vf=el=>{const r=rules[el.name](el.value),ok=r===true;el.setAttribute('aria-invalid',!ok);$('#err-'+el.name).textContent=ok?'':r;return ok};
  cf.addEventListener('focusout',e=>{if(rules[e.target.name]&&e.target.value)vf(e.target)});
  cf.addEventListener('input',e=>{if(e.target.getAttribute('aria-invalid')==='true')vf(e.target)});
  cf.addEventListener('submit',e=>{
    e.preventDefault();
    const bad=$$('[name]',cf).filter(x=>rules[x.name]&&!vf(x));
    if(bad.length)return bad[0].focus();
    const d=Object.fromEntries(new FormData(cf));
    location.href=`mailto:admin@komu.edu.ng?subject=${encodeURIComponent('Website enquiry from '+d.name.trim())}&body=${encodeURIComponent(d.message.trim()+'\n\n'+d.name.trim()+'\n'+d.email.trim()+(d.phone.trim()?'\n'+d.phone.trim():''))}`;
    $('#formStatus').textContent='Your email app should open with the message ready to send. If it does not, write to admin@komu.edu.ng.';
  });
}

/* ---------- actions that work on every page (delegated) ---------- */
document.addEventListener('click',e=>{
  const t=e.target;let b;
  if(b=t.closest('[data-news]')){const n=NEWS.find(x=>x.id==b.dataset.news);if(n)openNews(n);return}
  if(b=t.closest('[data-off]')){openOff(OFF[b.dataset.off]);return}
  if(b=t.closest('[data-dept]')){openProgramme(b.dataset.dept);return}
  if(b=t.closest('[data-check]')){
    const d=b.dataset.check;
    if(!$('#eligForm')){location.href='admissions.html?prog='+encodeURIComponent(d)+'#eligibility';return}
    drawer.close();setProg(d);jump('#eligibility');setTimeout(()=>$('#eScore').focus({preventScroll:true}),reduced?0:600);return;
  }
  if(t.closest('.add-cal'))addToCalendar();
});

/* ---------- site search ---------- */
const P=(t,k,href,pin)=>({t,k,href,pin});
const IDX=[
  P('Student portal','Portal',U+'students/login',1),P('Staff portal','Portal',STAFF_PORTAL,1),P('E-learning','Portal','https://elearning.komu.edu.ng/',1),P('E-library','Portal','https://komu.my-library.com.ng/',1),
  P('Am I eligible?','Admissions','admissions.html#eligibility',1),P('How to apply','Admissions','admissions.html#how'),
  P('Special Citation, 21 October 2026','Event','index.html#events',1),
  P('Continue a previous application','Admissions',U+'admissions/programs/undergraduate/continue-application'),
  P('Supplementary form 2026/2027','Admissions',U+'forms/supplementary-form'),
  ...PROG.map(p=>P(p.name+' admission','Admissions','admissions.html#route-'+p.slug)),
  P('Transcripts and graduate services','Graduates','index.html?per=grad#start'),
  ...FAC.map(f=>P('Faculty of '+f.name,'Faculty','academics.html#faculty-'+f.id)),
  ...FAC.flatMap(f=>f.depts.map(d=>({t:d,k:'Programme · '+f.name,go:()=>openProgramme(d)}))),
  ...OFF.map(o=>({t:o.name,k:o.role,go:()=>openOff(o)})),
  ...NEWS.map(n=>({t:n.title,k:'News · '+fmt(n.date),go:()=>openNews(n)})),
  ...LECT.map(l=>P(l[4],`${ord(l[0])} public lecture · ${l[2]}`,'index.html#lectures')),
  ...FAQ.map(f=>P(f[0],'Quick answer','contact.html#help')),
  P('Academic staff directory','Staff',U+'staff/directory/index'),P('Non-academic staff directory','Staff',U+'staff/directory/non-academic'),P('Academic publications','Research',U+'publications/index'),
  ...[['Research & innovation','academics.html#research'],['News archive','news.html#archive'],['Vision & mission','index.html#about'],['Charter & objectives','index.html#charter'],['Our history','index.html#history'],['Principal officers','index.html#leadership'],['Photo & video gallery','gallery.html'],['Contact us','contact.html']].map(([t,h])=>P(t,'Page',h))
];
const sd=$('#searchDlg'),q=$('#q');let res=[],act=0;
function paint(){
  $('#qRes').innerHTML=res.length?res.map((x,i)=>`<li role="option" id="qo${i}" aria-selected="${i===act}" data-i="${i}"><span>${esc(x.t)}</span><small>${x.k}</small></li>`).join(''):`<li class="none">Nothing matches “${esc(q.value)}”. Try “nursing” or “portal”.</li>`;
  q.setAttribute('aria-activedescendant',res.length?'qo'+act:'');
  $('#qo'+act)?.scrollIntoView({block:'nearest'});
}
function find(){const s=q.value.trim().toLowerCase();res=(s?IDX.filter(x=>(x.t+' '+x.k).toLowerCase().includes(s)):IDX.filter(x=>x.pin)).slice(0,9);act=0;paint()}
function run(x){
  sd.close();
  if(x.go)return x.go();
  if(/^https?:/.test(x.href))return window.open(x.href,'_blank','noopener');
  const u=new URL(x.href,location.href);
  if(u.hash&&samePage(u)){if(location.hash===u.hash)jump(u.hash);else location.hash=u.hash}else location.href=u.href;
}
function openSearch(){q.value='';find();sd.showModal();q.focus()}
q.addEventListener('input',find);
q.addEventListener('keydown',e=>{
  if(e.key==='ArrowDown'||e.key==='ArrowUp'){e.preventDefault();if(res.length){act=(act+(e.key==='ArrowDown'?1:-1)+res.length)%res.length;paint()}}
  if(e.key==='Enter'&&res[act]){e.preventDefault();run(res[act])}
});
$('#qRes').addEventListener('click',e=>{const l=e.target.closest('[data-i]');if(l)run(res[l.dataset.i])});
$('#openSearch').onclick=openSearch;
document.addEventListener('keydown',e=>{
  const typing=/INPUT|TEXTAREA|SELECT/.test(document.activeElement.tagName);
  if(((e.ctrlKey||e.metaKey)&&e.key.toLowerCase()==='k')||(e.key==='/'&&!typing)){e.preventDefault();if(!sd.open)openSearch()}
});

/* ---------- start whatever this page contains ---------- */
if($('#heroVideo'))initHero();
if($('#seg'))initStart();
if($('#newsGrid'))initNews();
if($('#lectList'))initLectures();
if($('#ietic'))initValues();
if($('#officers'))initOfficers();
if($('#charter'))initCharter();
if($('#facTabs'))initExplorer();
if($('#eligForm'))initElig();
if($('#progTabs'))initRoutes();
if($('#galleryGrid'))initGallery();
if($('#openPoster'))$('#openPoster').onclick=()=>openLb([GAL.find(g=>g.cat==='Events')],0);
if($('#faq'))initFaq();
if($('#contactForm'))initContact();

/* ---------- motion: reveal + counters ---------- */
const rio=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');rio.unobserve(e.target)}}),{rootMargin:'0px 0px -8% 0px'});
$$('.rv').forEach(el=>rio.observe(el));
const cio=new IntersectionObserver(es=>es.forEach(e=>{
  if(!e.isIntersecting)return;cio.unobserve(e.target);if(reduced)return;
  const b=e.target,end=+b.dataset.count,suf=b.dataset.suffix||'',t0=performance.now();
  const step=t=>{const p=Math.min((t-t0)/1300,1);b.textContent=Math.round(end*(1-Math.pow(1-p,3)))+suf;if(p<1)requestAnimationFrame(step)};
  requestAnimationFrame(step);
}),{threshold:.6});
$$('[data-count]').forEach(b=>cio.observe(b));

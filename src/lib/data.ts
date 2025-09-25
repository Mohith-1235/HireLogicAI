
export type Candidate = {
  id: string;
  name: string;
  email: string;
  avatar: string;
  role: string;
  stage: 'Screening' | 'Interview' | 'Offer' | 'Hired' | 'Rejected';
  interviews: Interview[];
  documents: Document[];
  lastActivity: string;
  resume: string;
};

export type Interview = {
  id: string;
  candidateId: string;
  date: string;
  time: string;
  type: 'AI Screening' | 'Technical' | 'HR Round';
  status: 'Scheduled' | 'Completed' | 'Canceled';
};

export type Document = {
  name: 'Aadhaar Card' | 'PAN Card' | 'Driving Licence';
  status: 'Verified' | 'Pending' | 'Not Submitted';
};

const interviews: Interview[] = [
  { id: 'int-101', candidateId: 'can-1', date: '2024-08-05', time: '10:00 AM', type: 'AI Screening', status: 'Completed' },
  { id: 'int-102', candidateId: 'can-1', date: '2024-08-10', time: '02:00 PM', type: 'Technical', status: 'Scheduled' },
  { id: 'int-201', candidateId: 'can-2', date: '2024-08-06', time: '11:00 AM', type: 'AI Screening', status: 'Completed' },
  { id: 'int-202', candidateId: 'can-2', date: '2024-08-08', time: '03:00 PM', type: 'Technical', status: 'Completed' },
  { id: 'int-203', candidateId: 'can-2', date: '2024-08-10', time: '10:00 AM', type: 'HR Round', status: 'Completed' },
  { id: 'int-301', candidateId: 'can-3', date: '2024-08-07', time: '09:00 AM', type: 'AI Screening', status: 'Completed' },
  { id: 'int-302', candidateId: 'can-3', date: '2024-08-12', time: '11:30 AM', type: 'HR Round', status: 'Scheduled' },
  { id: 'int-401', candidateId: 'can-4', date: '2024-08-08', time: '03:00 PM', type: 'AI Screening', status: 'Completed' },
  { id: 'int-402', candidateId: 'can-4', date: '2024-08-12', time: '04:00 PM', type: 'Technical', status: 'Scheduled' },
  { id: 'int-501', candidateId: 'can-5', date: '2024-08-09', time: '10:30 AM', type: 'AI Screening', status: 'Canceled' },
  { id: 'int-601', candidateId: 'can-6', date: '2024-08-10', time: '01:00 PM', type: 'AI Screening', status: 'Scheduled' },
];

const documents: Document[] = [
  { name: 'Aadhaar Card', status: 'Verified' },
  { name: 'PAN Card', status: 'Verified' },
  { name: 'Driving Licence', status: 'Pending' },
];

export const candidates: Candidate[] = [
  {
    id: 'can-1',
    name: 'Sarah Johnson',
    email: 'sarah.j@example.com',
    avatar: 'candidate-1',
    role: 'Senior Frontend Developer',
    stage: 'Interview',
    interviews: interviews.filter(i => i.candidateId === 'can-1'),
    documents: [
      { name: 'Aadhaar Card', status: 'Verified' },
      { name: 'PAN Card', status: 'Verified' },
      { name: 'Driving Licence', status: 'Not Submitted' },
    ],
    lastActivity: '3 days ago',
    resume: `Sarah Johnson is a results-driven Senior Frontend Developer with 8 years of experience in building and maintaining responsive and scalable web applications. Proficient in React, TypeScript, and modern JavaScript frameworks. Passionate about creating intuitive user interfaces and seamless user experiences. Proven ability to lead projects and mentor junior developers.`,
  },
  {
    id: 'can-2',
    name: 'Michael Chen',
    email: 'michael.c@example.com',
    avatar: 'candidate-2',
    role: 'Product Manager',
    stage: 'Hired',
    interviews: interviews.filter(i => i.candidateId === 'can-2'),
    documents: [
      { name: 'Aadhaar Card', status: 'Verified' },
      { name: 'PAN Card', status: 'Verified' },
      { name: 'Driving Licence', status: 'Verified' },
    ],
    lastActivity: '1 day ago',
    resume: `Michael Chen is a strategic Product Manager with a 6-year track record of launching successful SaaS products. Skilled in market research, user-centric design, and agile methodologies. Excels at collaborating with cross-functional teams to deliver products that meet user needs and business goals.`,
  },
  {
    id: 'can-3',
    name: 'Emily Rodriguez',
    email: 'emily.r@example.com',
    avatar: 'candidate-3',
    role: 'UX/UI Designer',
    stage: 'Interview',
    interviews: interviews.filter(i => i.candidateId === 'can-3'),
    documents: documents,
    lastActivity: '5 hours ago',
    resume: `Emily Rodriguez is a creative UX/UI Designer with a passion for crafting beautiful and functional digital experiences. With 4 years of experience, she is proficient in Figma, Sketch, and Adobe Creative Suite. Specializes in user research, wireframing, and prototyping to create intuitive and engaging designs.`,
  },
  {
    id: 'can-4',
    name: 'David Lee',
    email: 'david.l@example.com',
    avatar: 'candidate-4',
    role: 'Backend Engineer',
    stage: 'Screening',
    interviews: interviews.filter(i => i.candidateId === 'can-4'),
    documents: [
      { name: 'Aadhaar Card', status: 'Pending' },
      { name: 'PAN Card', status: 'Not Submitted' },
      { name: 'Driving Licence', status: 'Not Submitted' },
    ],
    lastActivity: '1 week ago',
    resume: `David Lee is a dedicated Backend Engineer with 5 years of experience in designing and building robust server-side applications. Expertise in Node.js, Python, and database management with PostgreSQL and MongoDB. Experienced in developing RESTful APIs and microservices architecture.`,
  },
  {
    id: 'can-5',
    name: 'Jessica Williams',
    email: 'jessica.w@example.com',
    avatar: 'candidate-5',
    role: 'Data Scientist',
    stage: 'Rejected',
    interviews: interviews.filter(i => i.candidateId === 'can-5'),
    documents: [],
    lastActivity: '2 weeks ago',
    resume: `Jessica Williams is an analytical Data Scientist with a knack for turning data into actionable insights. She has 3 years of experience in machine learning, statistical analysis, and data visualization using Python, R, and Tableau. Holds a Master's degree in Data Science.`,
  },
  {
    id: 'can-6',
    name: 'Chris Taylor',
    email: 'chris.t@example.com',
    avatar: 'candidate-6',
    role: 'DevOps Engineer',
    stage: 'Screening',
    interviews: interviews.filter(i => i.candidateId === 'can-6'),
    documents: [
      { name: 'Aadhaar Card', status: 'Verified' },
      { name: 'PAN Card', status: 'Pending' },
      { name: 'Driving Licence', status: 'Not Submitted' },
    ],
    lastActivity: '4 days ago',
    resume: `Chris Taylor is a skilled DevOps Engineer with 7 years of experience in automating and streamlining development pipelines. Proficient in CI/CD tools like Jenkins, containerization with Docker and Kubernetes, and cloud platforms like AWS. Strong focus on infrastructure as code and system reliability.`,
  },
];

export const pipelineStats = [
  { stage: 'Screening', value: 125 },
  { stage: 'AI Interview', value: 80 },
  { stage: 'Technical', value: 45 },
  { stage: 'HR Round', value: 20 },
  { stage: 'Offer', value: 10 },
  { stage: 'Hired', value: 4 },
];

export const allInterviews = interviews;

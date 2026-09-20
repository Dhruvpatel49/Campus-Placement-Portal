// Placify Demo Mock Data & Offline Fallback Service

export const DEMO_USERS = {
  student: {
    _id: 'demo_student_01',
    email: 'student@placify.edu',
    firstName: 'Aryan',
    lastName: 'Sharma',
    role: 'student',
    isActive: true,
    isEmailVerified: true,
  },
  recruiter: {
    _id: 'demo_recruiter_01',
    email: 'recruiter@placify.edu',
    firstName: 'Sarah',
    lastName: 'Jenkins',
    role: 'recruiter',
    companyId: 'demo_comp_01',
    isActive: true,
    isEmailVerified: true,
  },
  admin: {
    _id: 'demo_admin_01',
    email: 'admin@placify.edu',
    firstName: 'Rajesh',
    lastName: 'Kumar',
    role: 'admin',
    isActive: true,
    isEmailVerified: true,
  },
};

export const MOCK_JOBS = [
  {
    _id: 'job_01',
    title: 'Associate Software Engineer',
    company: { name: 'Google', logo: '' },
    companyName: 'Google',
    location: 'Bangalore, India',
    workMode: 'Hybrid',
    jobType: 'Full-time',
    ctc: '28 LPA',
    salary: '₹28,00,000 / Year',
    minCgpa: 7.5,
    eligibleBranches: ['Computer Science', 'Information Technology', 'Electronics'],
    description: 'Looking for energetic graduate software engineers to join core infrastructure, Android platforms, and Google Cloud teams.',
    requirements: ['Data Structures & Algorithms', 'C++ or Java or Python', 'System Design fundamentals'],
    deadline: '2026-10-15',
    status: 'published',
    applicantsCount: 42,
    createdAt: '2026-09-10T10:00:00.000Z',
  },
  {
    _id: 'job_02',
    title: 'Cloud Systems Developer',
    company: { name: 'Microsoft', logo: '' },
    companyName: 'Microsoft',
    location: 'Hyderabad, India',
    workMode: 'On-site',
    jobType: 'Full-time',
    ctc: '24 LPA',
    salary: '₹24,00,000 / Year',
    minCgpa: 7.0,
    eligibleBranches: ['Computer Science', 'Information Technology'],
    description: 'Develop next-generation Azure intelligent cloud services and high-performance enterprise applications.',
    requirements: ['Distributed Systems', 'C# or Go or Rust', 'REST APIs & Microservices'],
    deadline: '2026-10-20',
    status: 'published',
    applicantsCount: 38,
    createdAt: '2026-09-12T14:30:00.000Z',
  },
  {
    _id: 'job_03',
    title: 'Fullstack Platform Engineer',
    company: { name: 'Atlassian', logo: '' },
    companyName: 'Atlassian',
    location: 'Bengaluru, India',
    workMode: 'Remote',
    jobType: 'Full-time',
    ctc: '26 LPA',
    salary: '₹26,00,000 / Year',
    minCgpa: 7.5,
    eligibleBranches: ['All Engineering Branches'],
    description: 'Build collaborative developer workspace tools used by millions of engineering teams globally.',
    requirements: ['React', 'TypeScript', 'Node.js', 'PostgreSQL'],
    deadline: '2026-10-25',
    status: 'published',
    applicantsCount: 56,
    createdAt: '2026-09-14T09:15:00.000Z',
  },
  {
    _id: 'job_04',
    title: 'Software Development Engineer - I',
    company: { name: 'Amazon', logo: '' },
    companyName: 'Amazon',
    location: 'Gurugram, India',
    workMode: 'Hybrid',
    jobType: 'Full-time',
    ctc: '32 LPA',
    salary: '₹32,00,000 / Year',
    minCgpa: 8.0,
    eligibleBranches: ['Computer Science', 'Information Technology'],
    description: 'Join Amazon Consumer Tech teams building high-throughput payment processing and intelligent logistics systems.',
    requirements: ['Java', 'Object Oriented Design', 'AWS services', 'SQL & NoSQL'],
    deadline: '2026-10-30',
    status: 'published',
    applicantsCount: 71,
    createdAt: '2026-09-15T11:00:00.000Z',
  },
];

export const MOCK_STUDENT_DASHBOARD = {
  cgpa: 8.75,
  placementEligible: true,
  resumeUploaded: true,
  applicationStats: { applied: 3, shortlisted: 1, rejected: 0, inReview: 2 },
  profileCompletionPercentage: 85,
  skillsCount: 7,
};

export const MOCK_STUDENT_PROFILE = {
  _id: 'prof_student_01',
  userId: DEMO_USERS.student,
  enrollmentNumber: '0827CS221045',
  branch: 'Computer Science & Engineering',
  batch: 2026,
  cgpa: 8.75,
  skills: ['React.js', 'Node.js', 'TypeScript', 'Python', 'MongoDB', 'PostgreSQL', 'TailwindCSS'],
  resumeUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
  resumeName: 'Aryan_Sharma_Resume.pdf',
  linkedin: 'https://linkedin.com/in/aryansharma',
  github: 'https://github.com/aryansharma',
  bio: 'Final-year Computer Science student passionate about fullstack development, cloud architecture, and open-source software.',
  education: [
    { degree: 'B.Tech in Computer Science', institution: 'Institute of Engineering & Technology', year: '2022 - 2026', score: '8.75 CGPA' },
    { degree: 'Senior Secondary (XII)', institution: 'Delhi Public School', year: '2022', score: '94.6%' }
  ],
};

export const MOCK_APPLICATIONS = [
  {
    _id: 'app_01',
    job: MOCK_JOBS[0],
    jobId: MOCK_JOBS[0],
    status: 'shortlisted',
    appliedAt: '2026-09-15T08:30:00.000Z',
    feedback: 'Selected for Technical Interview Round 1',
    timeline: [
      { status: 'applied', date: '2026-09-15', note: 'Application submitted successfully' },
      { status: 'shortlisted', date: '2026-09-18', note: 'Resume shortlisted for technical interviews' }
    ],
  },
  {
    _id: 'app_02',
    job: MOCK_JOBS[1],
    jobId: MOCK_JOBS[1],
    status: 'pending',
    appliedAt: '2026-09-16T12:00:00.000Z',
    feedback: 'Application under review by technical hiring committee',
    timeline: [
      { status: 'applied', date: '2026-09-16', note: 'Application submitted' }
    ],
  },
  {
    _id: 'app_03',
    job: MOCK_JOBS[3],
    jobId: MOCK_JOBS[3],
    status: 'in_review',
    appliedAt: '2026-09-17T15:45:00.000Z',
    feedback: 'Online assessment completed with 95% test score',
    timeline: [
      { status: 'applied', date: '2026-09-17', note: 'Application submitted' },
      { status: 'in_review', date: '2026-09-19', note: 'OA evaluation passed' }
    ],
  },
];

export const MOCK_RECRUITER_DASHBOARD = {
  activeJobs: 4,
  totalApplicants: 147,
  shortlistedCandidates: 28,
  scheduledInterviews: 12,
  hiredCandidates: 6,
};

export const MOCK_ADMIN_DASHBOARD = {
  totalStudents: 520,
  placedStudents: 412,
  totalCompanies: 45,
  activeJobs: 28,
  placementRate: '79.2%',
  avgPackage: '14.8 LPA',
  highestPackage: '44 LPA',
};

export const MOCK_NOTIFICATIONS = [
  {
    _id: 'notif_01',
    title: 'Shortlist Announcement',
    message: 'Congratulations! You have been shortlisted for Google SWE interview round 1.',
    read: false,
    createdAt: new Date().toISOString(),
  },
  {
    _id: 'notif_02',
    title: 'New Campus Placement Drive',
    message: 'Amazon has announced SDE-1 placement drive for 2026 graduating batch.',
    read: true,
    createdAt: new Date(Date.now() - 86400000).toISOString(),
  },
];

/**
 * Intercept failed network requests and return structured mock data
 * ensuring the hosted application remains fully functional and testable.
 */
export const getMockResponseForUrl = (url = '', method = 'get', body = null) => {
  const cleanUrl = url.replace(/^\/api\/v1/, '').toLowerCase();

  // 1. Auth routes
  if (cleanUrl.includes('/auth/login')) {
    let role = 'student';
    let email = 'student@placify.edu';
    let name = { first: 'Aryan', last: 'Sharma' };

    if (body?.email) {
      email = body.email;
      const lower = email.toLowerCase();
      if (lower.includes('admin')) {
        role = 'admin';
        name = { first: 'Rajesh', last: 'Kumar' };
      } else if (lower.includes('recruiter') || lower.includes('hr') || lower.includes('company')) {
        role = 'recruiter';
        name = { first: 'Sarah', last: 'Jenkins' };
      }
    }

    const user = {
      _id: 'demo_' + role + '_user',
      email,
      firstName: name.first,
      lastName: name.last,
      role,
      isActive: true,
      isEmailVerified: true,
    };

    localStorage.setItem('placify_demo_user', JSON.stringify(user));
    localStorage.setItem('placify_demo_mode', 'true');

    return {
      success: true,
      statusCode: 200,
      message: 'Logged in successfully (Placify Demo Mode)',
      data: {
        user,
        accessToken: 'placify_demo_access_token_' + role,
        refreshToken: 'placify_demo_refresh_token',
      },
    };
  }

  if (cleanUrl.includes('/auth/register')) {
    const role = body?.role || 'student';
    const user = {
      _id: 'demo_' + Date.now(),
      email: body?.email || 'newuser@placify.edu',
      firstName: body?.firstName || 'New',
      lastName: body?.lastName || 'User',
      role,
      isActive: true,
      isEmailVerified: true,
    };
    localStorage.setItem('placify_demo_user', JSON.stringify(user));
    localStorage.setItem('placify_demo_mode', 'true');

    return {
      success: true,
      statusCode: 201,
      message: 'Registration successful (Placify Demo Mode)',
      data: {
        user,
        accessToken: 'placify_demo_token',
        refreshToken: 'placify_demo_refresh',
      },
    };
  }

  if (cleanUrl.includes('/auth/me')) {
    const saved = localStorage.getItem('placify_demo_user');
    const user = saved ? JSON.parse(saved) : DEMO_USERS.student;
    return {
      success: true,
      statusCode: 200,
      data: user,
    };
  }

  if (cleanUrl.includes('/auth/logout')) {
    localStorage.removeItem('placify_demo_user');
    localStorage.removeItem('placify_demo_mode');
    return {
      success: true,
      statusCode: 200,
      message: 'Logged out successfully',
      data: null,
    };
  }

  // 2. Student routes
  if (cleanUrl.includes('/student/dashboard')) {
    return {
      success: true,
      statusCode: 200,
      data: MOCK_STUDENT_DASHBOARD,
    };
  }

  if (cleanUrl.includes('/student/profile')) {
    const saved = localStorage.getItem('placify_demo_user');
    const user = saved ? JSON.parse(saved) : DEMO_USERS.student;
    return {
      success: true,
      statusCode: 200,
      data: {
        ...MOCK_STUDENT_PROFILE,
        userId: user,
      },
    };
  }

  if (cleanUrl.includes('/student/resume')) {
    return {
      success: true,
      statusCode: 200,
      message: 'Resume action saved in Demo Mode',
      data: { url: MOCK_STUDENT_PROFILE.resumeUrl },
    };
  }

  // 3. Job routes
  if (cleanUrl.includes('/jobs') || cleanUrl.includes('/job')) {
    if (cleanUrl.match(/\/jobs?\/[a-zA-Z0-9_-]+/)) {
      const parts = cleanUrl.split('/');
      const id = parts[parts.length - 1];
      const found = MOCK_JOBS.find((j) => j._id === id) || MOCK_JOBS[0];
      return {
        success: true,
        statusCode: 200,
        data: found,
      };
    }
    return {
      success: true,
      statusCode: 200,
      data: {
        jobs: MOCK_JOBS,
        pagination: { total: MOCK_JOBS.length, page: 1, limit: 10 },
      },
    };
  }

  // 4. Application routes
  if (cleanUrl.includes('/application')) {
    return {
      success: true,
      statusCode: 200,
      data: {
        applications: MOCK_APPLICATIONS,
        myApplications: MOCK_APPLICATIONS,
      },
    };
  }

  // 5. Recruiter routes
  if (cleanUrl.includes('/recruiter/dashboard')) {
    return {
      success: true,
      statusCode: 200,
      data: MOCK_RECRUITER_DASHBOARD,
    };
  }

  // 6. Admin routes
  if (cleanUrl.includes('/admin/dashboard')) {
    return {
      success: true,
      statusCode: 200,
      data: MOCK_ADMIN_DASHBOARD,
    };
  }

  // 7. Notification routes
  if (cleanUrl.includes('/notification')) {
    return {
      success: true,
      statusCode: 200,
      data: {
        notifications: MOCK_NOTIFICATIONS,
        unreadCount: 1,
      },
    };
  }

  // Generic fallback for any other requests
  return {
    success: true,
    statusCode: 200,
    message: 'Operation completed in Demo Mode',
    data: {},
  };
};

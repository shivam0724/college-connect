const subjects = [
    // First Year (I & II Semester)
    { name: "Engineering Chemistry", code: "BT-101" },
    { name: "Mathematics-I", code: "BT-102" },
    { name: "English for Communication", code: "BT-103" },
    { name: "Basic Electrical & Electronics Engineering", code: "BT-104" },
    { name: "Engineering Graphics", code: "BT-105" },
    { name: "Manufacturing Practices", code: "BT-106" },
    { name: "Engineering Physics", code: "BT-201" },
    { name: "Mathematics-II", code: "BT-202" },
    { name: "Basic Mechanical Engineering", code: "BT-203" },
    { name: "Basic Civil Engineering & Mechanics", code: "BT-204" },
    { name: "Basic Computer Engineering", code: "BT-205" },
    { name: "Language Lab & Seminars", code: "BT-206" },
    // Second Year (III & IV Semester)
    { name: "Energy & Environmental Engineering", code: "ES-301" },
    { name: "Discrete Structure", code: "CS-302" },
    { name: "Data Structure", code: "CS-303" },
    { name: "Digital Systems", code: "CS-304" },
    { name: "Object-Oriented Programming & Methodology", code: "CS-305" },
    { name: "Computer Workshop", code: "CS-306" },
    { name: "Mathematics-III", code: "BT-401" },
    { name: "Analysis & Design of Algorithm", code: "CS-402" },
    { name: "Software Engineering", code: "CS-403" },
    { name: "Computer Organization & Architecture", code: "CS-404" },
    { name: "Operating Systems", code: "CS-405" },
    { name: "Programming Practices", code: "CS-406" },
    // Third Year (V & VI Semester)
    { name: "Theory of Computation", code: "CS-501" },
    { name: "Database Management Systems", code: "CS-502" },
    { name: "Data Analytics", code: "CS-503A" },
    { name: "Pattern Recognition", code: "CS-503B" },
    { name: "Cyber Security", code: "CS-503C" },
    { name: "Internet & Web Technology", code: "CS-504A" },
    { name: "Object-Oriented Programming", code: "CS-504B" },
    { name: "Introduction to Database Management Systems", code: "CS-504C" },
    { name: "Machine Learning", code: "CS-601" },
    { name: "Computer Networks", code: "CS-602" },
    { name: "Advanced Computer Architecture", code: "CS-603A" },
    { name: "Computer Graphics & Visualization", code: "CS-603B" },
    { name: "Compiler Design", code: "CS-603C" },
    { name: "Open Elective - Knowledge Management", code: "CS-604A" },
    { name: "Open Elective - Project Management", code: "CS-604B" },
    { name: "Open Elective - Rural Technology & Community Development", code: "CS-604C" },
    { name: "Data Analytics Lab", code: "CS-605" },
    { name: "Skill Development Lab", code: "CS-606" },
    { name: "Internship-III (To be completed in V/VI Semester)", code: "CS-607" },
    { name: "Minor Project-2", code: "CS-608" },
    // Fourth Year (VII & VIII Semester)
    { name: "Software Architectures", code: "CS-701" },
    { name: "Computational Intelligence (Dept. Elective)", code: "CS-702A" },
    { name: "Deep & Reinforcement Learning (Dept. Elective)", code: "CS-702B" },
    { name: "Wireless & Mobile Computing (Dept. Elective)", code: "CS-702C" },
    { name: "Big Data (Dept. Elective)", code: "CS-702D" },
    { name: "Cryptography & Information Security (Open Elective)", code: "CS-703A" },
    { name: "Data Mining and Warehousing (Open Elective)", code: "CS-703B" },
    { name: "Agile Software Development (Open Elective)", code: "CS-703C" },
    { name: "Disaster Management (Open Elective)", code: "CS-703D" },
    { name: "Departmental Elective Lab", code: "CS-704" },
    { name: "Open Elective Lab", code: "CS-705" },
    { name: "Major Project-I", code: "CS-706" },
    { name: "Evaluation of Internship-III", code: "CS-607E" },
    { name: "Internet of Things (IoT)", code: "CS-801" },
    { name: "Blockchain Technologies (Dept. Elective)", code: "CS-802A" },
    { name: "Cloud Computing (Dept. Elective)", code: "CS-802B" },
    { name: "High Performance Computing (Dept. Elective)", code: "CS-802C" },
    { name: "Object-Oriented Software Engineering (Dept. Elective)", code: "CS-802D" },
    { name: "Image Processing & Computer Vision (Open Elective)", code: "CS-803A" },
    { name: "Game Theory with Engineering Applications (Open Elective)", code: "CS-803B" },
    { name: "Internet of Things (Open Elective)", code: "CS-803C" },
    { name: "Managing Innovation & Entrepreneurship (Open Elective)", code: "CS-803D" },
    { name: "Departmental Elective Lab (VIII)", code: "CS-804" },
    { name: "Major Project-II", code: "CS-805" }
];

const semesterSubjects = {
    1: subjects.slice(0, 6),
    2: subjects.slice(6, 12),
    3: subjects.slice(12, 18),
    4: subjects.slice(18, 24),
    5: subjects.slice(24, 30),
    6: subjects.slice(30, 36),
    7: subjects.slice(36, 42),
    8: subjects.slice(42, 48),
}

const colleges = ["LNCT", "LNCTE", "LNCTS", "LNCP", "LNCTU"];
const branches = ["CSE", "CY", "AIML", "DS", "AIDS", "IT", "ECE", "EE", "ME", "CE"];
const semesters = [1, 2, 3, 4, 5, 6, 7, 8];
const sections = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];
const assignTo = [
    {
        name: "givento.college",
        label: "College",
        options: colleges,
    },
    {
        name: "givento.branch",
        label: "Branch",
        options: branches,
    },
    {
        name: "givento.semester",
        label: "Semester",
        options: semesters.map((n) => n.toString()),
    },
    {
        name: "givento.section",
        label: "Section",
        options: sections,
    },
]

export { subjects, colleges, branches, semesters, sections, assignTo, semesterSubjects };
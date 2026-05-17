const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");

const app = express();
app.use(cors());
app.use(express.json());

const SECRET = "learnsmart_secret_2024";

// ─── Middleware: Auth ────────────────────────────────────────────────────────
function auth(req, res, next) {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ error: "No token provided" });
  try {
    req.user = jwt.verify(token, SECRET);
    next();
  } catch {
    res.status(401).json({ error: "Invalid token" });
  }
}

// ─── DB (in-memory) ──────────────────────────────────────────────────────────
const users = [
  {
    id: 1,
    name: "Sara Ahmad",
    email: "sara@learnsmart.com",
    password: "123456",
    avatar: "https://i.ibb.co/fzWzr0Vp/Rectangle-222.png",
    grade: "Grade 10",
  },
  {
    id: 2,
    name: "Ahmed Al-Najjar",
    email: "ahmed@learnsmart.com",
    password: "123456",
    avatar: "https://i.ibb.co/Fk5df6Y0/Rectangle-224.png",
    grade: "Grade 10",
  },
];

const books = [
  {
    id: 1,
    subject: "Mathematics",
    grade: "Grade 10",
    title: "Mathematics Book Grade 10",
    description: "Learn algebra, equations, and basic geometry concepts",
    cover: "https://i.ibb.co/Q7QTV3K1/Rectangle-107.png",
    teacher: "Taught by teacher Rana Youssef",
    longDescription: "The tenth-grade mathematics textbook is a core subject designed to develop students' logical thinking and mathematical analysis skills. It integrates several major branches of mathematics in a coherent and progressive manner. The book begins by studying the set of real numbers, their properties, and various operations on them, with a focus on number order, absolute value, exponents, and roots. It then moves on to algebra, covering algebraic expressions, methods of simplification and factorization, as well as solving linear and quadratic equations and inequalities, and explaining different approaches to finding solutions. The book also focuses on functions, defining functions and their types, such as linear and quadratic functions, and explaining how to represent them graphically, interpret graphs, and relate them to equations. Finally, the book includes a section on geometry, which covers fundamental concepts such as points, lines, and angles, and the relationships between them. It also examines geometric shapes like triangles, polygons, and circles, emphasizing their properties and laws. The book also covers important theories such as the Pythagorean theorem and its use in solving geometric problems, in addition to calculating the areas and volumes of some shapes. The book is not limited to that, but also includes statistics and probability, where the student learns how to collect, organize and present data using tables and graphs, such as bar charts and histograms, and calculate measures of central tendency such as the arithmetic mean, median and mode, in addition to learning about basic probability concepts and how to calculate the chances of different events occurring.",
    gradeLabel: "First year of secondary school",
  },
  {
    id: 2,
    subject: "Physics",
    grade: "Grade 10",
    title: "Physics Book Grade 10",
    description: "Understand motion, forces, and the laws of physics.",
    cover: "https://i.ibb.co/jv5mJYwd/Rectangle-105.png",
    teacher: "Taught by teacher Kareem Adel",
    pdfUrl:"https://drive.google.com/file/d/1W-lguHMHVOGiAgluxKUIWq7NBY8qiUae/view?usp=sharing",
    longDescription: "The tenth-grade physics textbook serves as a fundamental introduction to understanding the laws governing natural phenomena in our daily lives. It defines physics as the science that studies matter, energy, and the relationship between them. The book typically begins by exploring concepts of motion, such as distance, displacement, speed, and acceleration, explaining how to describe the movement of objects using laws and equations. It then moves on to the study of forces, explaining their types, such as gravity and friction, and Newton's three laws, which explain the effect of forces on the motion of objects and how a force can change an object's speed or direction. The book also covers work and energy, explaining the concept of work and its relationship to force and displacement, and the types of energy, such as kinetic and potential energy, along with the principle of conservation of energy and its transformations from one form to another. It also addresses power and how to measure it. Furthermore, the book explains some concepts related to heat, such as temperature, methods of heat transfer (conduction, convection, and radiation), and their effects on objects. Finally, the book includes the study of waves, such as sound and light, and their properties, such as frequency, wavelength, and speed of propagation, in addition to some related phenomena. Overall, the tenth-grade physics textbook aims to develop the student's ability to understand the natural phenomena around him in a scientific way, to use laws and equations to explain them, and to link physical concepts to practical applications in daily life.",
    gradeLabel: "First year of secondary school",
  },
  {
    id: 3,
    subject: "Chemistry",
    grade: "Grade 10",
    title: "Chemistry Book Grade 10",
    description: "Learn about elements, reactions, and chemical experiments.",
    cover: "https://i.ibb.co/SwtBhYxk/Rectangle-103.png",
    teacher: "Taught by teacher Nour Hassan",
    longDescription: "The tenth-grade chemistry textbook is a crucial foundation for understanding chemistry. It introduces matter and all aspects of it, including its composition, properties, and the changes it undergoes. The book begins by explaining the concept of matter and its three states: solid, liquid, and gas. It details the characteristics of each state in terms of shape, size, and particle movement, and discusses physical and chemical changes and the differences between them. It then moves on to the structure of the atom, explaining its basic components: protons and neutrons in the nucleus, and electrons orbiting it in different energy levels. The book also explains the concepts of atomic number, mass number, and isotopes. Furthermore, it focuses on the periodic table of elements, showing how elements are arranged according to their atomic numbers and chemical properties. It explains their classification into metals, nonmetals, and metalloids, and clarifies the properties of each group and the trends in the periodic table, such as increasing chemical reactivity or atomic radius. It also covers the chemical bonds that hold atoms together to form compounds, such as ionic bonds resulting from the transfer of electrons and covalent bonds resulting from the sharing of electrons, explaining the properties of the compounds formed from each type. The book explains various types of chemical reactions, such as combination, decomposition, and displacement reactions, emphasizing the law of conservation of mass and the necessity of balancing chemical equations. It also addresses solutions, explaining their components (solute and solute), their types, concentrations, and methods of expressing them, as well as the factors that affect solubility. ",
    gradeLabel: "First year of secondary school",
  },
  {
    id: 4,
    subject: "Biology",
    grade: "Grade 10",
    title: "Biology Book Grade 10",
    description: "Explore scientific concepts about nature, energy, and living things.",
    pdfUrl:"https://drive.google.com/file/d/12ooemHrL-mzrGpZOOxzvkIyZhlobDJg4/view?usp=sharing",
    cover: "https://i.ibb.co/p6GPw1cS/Rectangle-101.png",
    teacher: "Taught by teacher Youssef Al-Kilani",
    longDescription: "The tenth-grade biology textbook serves as a fundamental introduction to understanding biology. It defines living organisms and their characteristics, demonstrating that they all share vital processes such as nutrition, respiration, growth, reproduction, response to stimuli, and waste elimination, distinguishing them from non-living things. The book focuses heavily on the cell as the basic structural and functional unit of a living organism, explaining its structure and components, such as the plasma membrane, nucleus, cytoplasm, and various organelles. It also clarifies the difference between prokaryotic and eukaryotic cells and compares plant cells, which contain a cell wall and chloroplasts, with animal cells, which lack them. The book covers vital processes within the cell, such as photosynthesis, which plants use to produce their own food using sunlight, water, and carbon dioxide to create oxygen, and cellular respiration, which releases the energy necessary for vital activities. It also highlights biodiversity and its importance in stabilizing ecosystems and providing various resources. Finally, it presents the interrelationships between living organisms, such as predation, parasitism, and symbiosis, explaining the role of each in achieving ecological balance. In addition, the book explains the concept of food chains and food webs, how energy is transferred from producers to consumers and then to decomposers, and the impact of this process on the continuation of life. It also discusses the environment, including its living and non-living components, and the influence of various factors on living organisms, emphasizing the importance of preserving the environment and natural resources to ensure the continuation of life on Earth.",
    gradeLabel: "First year of secondary school",
  },
  {
    id: 5,
    subject: "English",
    grade: "Grade 10",
    title: "English Book Grade 10",
    description: "Improve reading, writing, and grammar concepts in English.",
    pdfUrl:"https://drive.google.com/file/d/1xFoiCZDtrKZPbVeiauiXO8NuaofXggIH/view?usp=sharing",
    cover: "https://i.ibb.co/fdP0qdxF/Rectangle-115.png",
    teacher: "Taught by teacher Mustafa Saleh",
    longDescription: "The tenth-grade English textbook is a core resource designed to comprehensively develop students' language skills. It focuses on the four key skills: listening, speaking, reading, and writing, while gradually and systematically reinforcing grammar and vocabulary. The book includes diverse units covering contemporary life topics such as education, technology, health, the environment, travel, and social relationships. This helps students connect English to their daily lives and understand its use in real-life situations. The textbook emphasizes reading skills through a variety of texts, including articles, stories, and general information. Students learn how to extract main ideas and specific details, understand meaning from context, and analyze texts effectively. It also focuses on listening skills through dialogues and audio recordings that improve auditory comprehension and pronunciation. Speaking skills are encouraged to use the language confidently in conversation and discussion, enabling students to express their opinions effectively. Finally, in writing, students learn how to compose well-structured paragraphs, formal and informal letters, and short reports, with a focus on correct grammar and punctuation. The book also covers fundamental English grammar rules such as different tenses (present, past, and future), conditional sentences, conjunctions, the passive voice, and other important grammatical structures. It also works to develop students' vocabulary by introducing new words in each unit, along with exercises to help them use these words in various contexts. Furthermore, it encourages teamwork and interaction within the classroom through communicative activities and tasks.",
    gradeLabel: "First year of secondary school",
  },
  {
    id: 6,
    subject: "Arabic",
    grade: "Grade 10",
    title: "Arabic Book Grade 10",
    description: "Develop reading, writing, and grammar skills in Arabic.",
    cover: "https://i.ibb.co/VW82MDr8/Rectangle-113.png",
    teacher: "Taught by teacher Ali Mahmoud",
    pdfUrl:"https://drive.google.com/file/d/1bdGklnYFZC8ZIEY2lctMJhcih1fsKxkc/view?usp=sharing",
    longDescription: "The Arabic language textbook for tenth grade aims to develop students' reading, writing, listening, and speaking skills, and to enhance their ability to understand and analyze texts and express their ideas clearly and effectively. The book includes a diverse collection of reading texts, such as literary, poetic, and prose texts, which address human, social, and national themes. It aims to cultivate students' literary appreciation and broaden their knowledge. The book focuses on reading comprehension skills by encouraging students to extract main and supporting ideas, analyze meanings and concepts, and interpret vocabulary within context. It also covers Arabic grammar rules gradually, including nominal and verbal sentences, types of predicates, subjects, verbs and their types, as well as various grammatical markers and their application in sentences. Furthermore, the book emphasizes writing skills such as paragraph writing, summarizing, creative expression, and letter writing, while training students to organize and logically sequence their ideas. Finally, it focuses on developing oral expression skills through dialogue, discussion, and expressing opinions.",
    gradeLabel: "First year of secondary school",
  },
  {
    id: 7,
    subject: "History",
    grade: "Grade 10",
    title: "History Book Grade 10",
    pdfUrl:"https://drive.google.com/file/d/13J1m0t63HYttcXcRNS9jjEEDGJdbI-w-/view?usp=sharing",
    description: "Discover important historical events and civilizations from the past.",
    cover: "https://i.ibb.co/R4GD4g8d/Rectangle-111.png",
    teacher: "",
    longDescription: "",
    gradeLabel: "First year of secondary school",
  },
  {
    id: 8,
    subject: "Geography",
    grade: "Grade 10",
    title: "Geography Book Grade 10",
    description: "Learn about countries, climates, and the Earth's natural features.",
    cover: "https://i.ibb.co/s9qf6BJn/Rectangle-109.png",
    pdfUrl:"https://drive.google.com/file/d/1zu5u4_jEiD5cKPE-IybIpoDc3RBAaWsm/view?usp=sharing",
    teacher: "Taught by teacher Lina Muhammad",
    longDescription: "The tenth-grade history textbook aims to introduce students to significant historical events that humanity has experienced, focusing on understanding the development of civilizations and the factors that influenced them. The book begins by studying ancient civilizations such as those of Mesopotamia and ancient Egypt, explaining their origins and their most important achievements in writing, architecture, and law. It then moves on to the study of Arab-Islamic civilization, outlining its stages of development and expansion, highlighting its most prominent scientific and cultural advancements, and its role in transmitting knowledge to the world. The book also covers later historical periods, such as the Middle Ages and the modern era, explaining the most important events and major transformations the world witnessed, such as geographical discoveries and various revolutions, and their impact on changing the political and economic landscape. It also focuses on the history of Palestine, in terms of its location and cultural significance, and the events it has undergone throughout the ages, emphasizing the resilience of the Palestinian people and their attachment to their land. The book is committed to developing students' historical thinking skills, such as analyzing events, connecting causes and effects, understanding chronology, and drawing lessons from the past.",
    gradeLabel: "First year of secondary school",
  },
  {
    id: 9,
    subject: "English Book ",
    grade: "Grade 11",
    title: "English Book Grade 11",
    description: "Improve reading, writing, and grammar skills in English",
    cover: "https://i.ibb.co/xtq9f1kK/Rectangle-158.png",
    teacher: "Taught by teacher Mustafa Saleh",
    longDescription: "The Grade 11 English textbook is an advanced course designed to develop students' language skills more deeply and professionally.",
    gradeLabel: "Second year of secondary school (Literary)",
    pdfUrl:"https://drive.google.com/file/d/1SSGITOgIDHO_d3csL--TDahq6VHAEkTx/view?usp=sharing"
  },
  {
    id: 10,
    subject: "Arabic Book",
    grade: "Grade 11",
    title: "Arabic Book Grade 11",
    description: "Develop reading, writing, and grammar skills in Arabic.",
    cover: "https://i.ibb.co/Zz9VZBtN/Rectangle-156.png",
    teacher: "Taught by teacher Ali Mahmoud",
    longDescription: "The Arabic language textbook for the eleventh grade is an advanced level textbook designed to develop students' linguistic and literary skills more deeply and precisely.",
    gradeLabel: "Second year of secondary school (Literary)",
     pdfUrl:"https://drive.google.com/file/d/1fx1hMh6lfTbuNakkuVRiAKGprHsWEhqD/view?usp=sharing"
  },
  {
    id: 11,
    subject: "History Book ",
    grade: "Grade 11",
    title: "History Book  Grade 11",
    description: "Discover important historical events and civilizations from the past",
    cover: "https://i.ibb.co/CswhMPSX/Rectangle-154.png",
    teacher: "Taught by teacher Lina Muhammad",
    longDescription: "The eleventh-grade history textbook is an advanced stage designed to deepen students' understanding of historical events and analyze them more broadly and coherently.",
    gradeLabel: "Second year of secondary school (Literary)",
     pdfUrl:"https://drive.google.com/file/d/1fsKhbRjga6_lAkBtRTDhOa3QDvYwcDJ5/view?usp=sharing"
  },
  {
    id: 12,
    subject: "Geography Book ",
    grade: "Grade 11",
    title: "Geography Book  Grade 11",
    description: "Learn about countries, climates, and the Earth's natural features",
    cover: "https://i.ibb.co/Rk1P1mPR/Rectangle-152.png",
    teacher: "Taught by teacher Hoda Mahmoud",
    longDescription: "The eleventh-grade geography textbook is an advanced level textbook designed to deepen students' understanding of natural and human geographical phenomena.",
    gradeLabel: "Second year of secondary school (Literary)",
     pdfUrl:"https://drive.google.com/file/d/1o-EvaB-oqfNtdN9Imo7sv4V6-W_PmS2q/view?usp=sharing"
  },
  {
    id: 13,
    subject: "Mathematics Book ",
    grade: "Grade 11",
    title: "Mathematics Book  Grade 11",
    description: "Learn algebra, equations, and basic geometry concepts",
    cover: "https://i.ibb.co/MkC2x0Dm/Rectangle-170.png",
    teacher: "Taught by teacher Rana Youssef",
    longDescription: "The eleventh-grade mathematics textbook is an advanced level designed to deepen mathematical understanding and develop analytical and problem-solving skills.",
    gradeLabel: "Second year of secondary school (Scientific)",
    pdfUrl:"https://drive.google.com/file/d/1tKtQmwwfeQPqP05B-jq5rV3Boj9ljzIt/view?usp=sharing",
  },
  {
    id: 14,
    subject: "Physics Book ",
    grade: "Grade 11",
    title: "Physics Book  Grade 11",
    description: "Understand motion, forces, and the laws of physics.",
    cover: "https://i.ibb.co/KjTLvN8G/Rectangle-168.png",
    teacher: "Taught by teacher Kareem Adel",
    longDescription: "The eleventh-grade physics textbook represents an advanced stage in physics studies.",
    gradeLabel: "Second year of secondary school (Scientific)",
     pdfUrl:"https://drive.google.com/file/d/1SSGITOgIDHO_d3csL--TDahq6VHAEkTx/view?usp=sharing"
  },
  {
    id: 15,
    subject: "Chemistry Book ",
    grade: "Grade 11",
    title: "Chemistry Book  Grade 11",
    description: "Learn about elements, reactions, and chemical experiments.",
    cover: "https://i.ibb.co/gFPZhk3K/Rectangle-166.png",
    teacher: "Taught by teacher Nour Hassan",
    longDescription: "The eleventh-grade chemistry textbook represents an advanced stage in the study of chemistry.",
    gradeLabel: "Second year of secondary school (Scientific)",
        pdfUrl:"https://drive.google.com/file/d/1jihdSVNkx3t-tpVrsd6hq3jTC0S8n5By/view?usp=sharing"
  },
  {
    id: 16,
    subject: "Biology Book ",
    grade: "Grade 11",
    title: "Biology Book  Grade 11",
    description: "Explore scientific concepts about nature, energy, and living things",
    cover: "https://i.ibb.co/d4NgLwzY/Rectangle-164.png",
    teacher: "Taught by teacher Youssef Al-Kilani",
    longDescription: "The eleventh-grade biology textbook represents an advanced stage in the study of biology.",
    gradeLabel: "Second year of secondary school (Scientific)",
     pdfUrl:"https://drive.google.com/file/d/1SSGITOgIDHO_d3csL--TDahq6VHAEkTx/view?usp=sharing"
  },
  {
    id: 17,
    subject: "English Book ",
    grade: "Grade 12",
    title: "English Book  Grade 12",
    description: "Improve reading, writing, and grammar skills in English",
    cover: "https://i.ibb.co/7dvLffkT/Rectangle-182.png",
    teacher: "Taught by teacher Mustafa Saleh",
    longDescription: "The Grade 12 English textbook is an advanced course designed to help students reach a higher level of language proficiency.",
    gradeLabel: "Third year of secondary school (Literary)",
       pdfUrl:"https://drive.google.com/file/d/1B8IVLcMr07hjftPDEmax4mnUY3n2He_X/view?usp=sharing"
  },
  {
    id: 18,
    subject: "Arabic Book  ",
    grade: "Grade 12",
    title: "Arabic Book Grade 12",
    description: "Develop reading, writing, and grammar skills in Arabic.",
    cover: "https://i.ibb.co/39RHxjZQ/Rectangle-180.png",
    teacher: "Taught by teacher Ali Mahmoud",
    longDescription: "The Arabic language textbook for the twelfth grade is considered an advanced curriculum designed to deeply develop students' linguistic and literary skills.",
    gradeLabel: "Third year of secondary school (Literary)",
     pdfUrl:"https://drive.google.com/file/d/1oPN7oOJBCiCeptW-7ROzmzZ-MP7Al6_A/view?usp=sharing"
  },
  {
    id: 19,
    subject: "History Book ",
    grade: "Grade 12",
    title: "History Book  Grade 12",
    description: "Discover important historical events and civilizations from the past",
    cover: "https://i.ibb.co/kVdszFLQ/Rectangle-178.png",
    teacher: "Taught by teacher Lina Muhammad",
    longDescription: "The twelfth-grade history textbook is considered an advanced course designed to deepen students' understanding of global and Arab historical events.",
    gradeLabel: "Third year of secondary school (Literary)",
    pdfUrl:"https://drive.google.com/file/d/1EM_blpTdi_d3lfAAhOK3a86aYeuRfARr/view?usp=sharing"
  },
  {
    id: 20,
    subject: "Geography Book  ",
    grade: "Grade 12",
    title: "Geography Book   Grade 12",
    description: "Learn about countries, climates, and the Earth's natural features",
    cover: "https://i.ibb.co/zTsgZpH6/Rectangle-176.png",
    teacher: "Taught by teacher Hoda Mahmoud",
    longDescription: "The twelfth-grade geography textbook is an advanced resource designed to deepen students' understanding of the world around them.",
    gradeLabel: "Third year of secondary school (Literary)",
    pdfUrl:"https://drive.google.com/file/d/1Ha8C_BW6fKq52UU3xo7KfOjOB0WKYxzW/view?usp=sharing"
  },
  {
    id: 21,
    subject: "Mathematics Book ",
    grade: "Grade 12",
    title: "Mathematics Book   Grade 12",
    description: "Learn algebra, equations, and basic geometry concepts",
    cover: "https://i.ibb.co/Xxr7wbfh/Rectangle-194.png",
    teacher: "Taught by teacher Rana Youssef",
    longDescription: "The twelfth-grade mathematics textbook is considered one of the most important advanced courses.",
    gradeLabel: "Third year of secondary school (Scientific)",
    pdfUrl:"https://drive.google.com/file/d/1nkBGh9r0oo--Ystr5_v1MvE4TyMDyxQa/view?usp=sharing"
  },
  {
    id: 22,
    subject: "Physics Book  ",
    grade: "Grade 12",
    title: "Physics Book   Grade 12",
    description: "Understand motion, forces, and the laws of physics.",
    cover: "https://i.ibb.co/ZzGj99J3/Rectangle-192.png",
    teacher: "Taught by teacher Kareem Adel",
    longDescription: "The twelfth-grade physics textbook is considered an advanced course designed to deepen students' understanding of physical laws.",
    gradeLabel: "Third year of secondary school (Scientific)",
    pdfUrl:"https://drive.google.com/file/d/1JtztYFld5OpPsZX93UFDBZXxwK0mE8g7/view?usp=sharing"
  },
  {
    id: 23,
    subject: "Chemistry Book  ",
    grade: "Grade 12",
    title: "Chemistry Book   Grade 12",
    description: "Learn about elements, reactions, and chemical experiments.",
    cover: "https://i.ibb.co/QvVq1xJk/Rectangle-190.png",
    teacher: "Taught by teacher Nour Hassan",
    longDescription: "The 12th-grade chemistry textbook is considered one of the most important courses.",
    gradeLabel: "Third year of secondary school (Scientific)",
    pdfUrl:"https://drive.google.com/file/d/1Py4_23GkSD9hr7PrzRQfM6658jIrKZEC/view?usp=sharing"
  },
  {
    id: 24,
    subject: "Biology Book ",
    grade: "Grade 12",
    title: "Biology Book  Grade 12",
    description: "Explore scientific concepts about nature, energy, and living things",
    cover: "https://i.ibb.co/bgnCHyMx/Rectangle-188.png",
    teacher: "Taught by teacher Youssef Al-Kilani",
    longDescription: "The twelfth-grade biology textbook represents an advanced and comprehensive stage in the study of biology.",
    gradeLabel: "Third year of secondary school (Scientific)",
    pdfUrl:"https://drive.google.com/file/d/1JR8-uSen5HTJmwnkVmu2GOxBUymLxJMk/view?usp=sharing"
  },
];

const lessons = [
  {
    id: 1,
    bookId: 3,
    subject: "Chemistry",
    grade: "Grade 10",
    title: "Atomic Structure",
    duration: "45 min",
    videoUrl: "#",
    watched: false,
    thumbnail:"https://i.ibb.co/sJKRRPGZ/Rectangle-276.png"
  },
  {
    id: 2,
    bookId: 3,
    subject: "Chemistry",
    grade: "Grade 10",
    title: "Atom Theory",
    duration: "38 min",
    videoUrl: "#",
    watched: false,
    thumbnail:"https://i.ibb.co/BKzSnd8R/Rectangle-280.png"
  },
  {
    id: 3,
    bookId: 3,
    subject: "Chemistry",
    grade: "Grade 10",
    title: "Energy Levels Of The Atom",
    duration: "50 min",
    videoUrl: "#",
    watched: true,
    thumbnail:"https://i.ibb.co/zhJZHNSK/Rectangle-285.png"
  },
  {
    id: 4,
    bookId: 4,
    subject: "Biology",
    grade: "Grade 10",
    title: "Cell Installation",
    duration: "40 min",
    videoUrl: "#",
    watched: false,
    thumbnail:"https://i.ibb.co/yn6Tbfpm/Rectangle-276-1.png"
  },
  {
    id: 5,
    bookId: 4,
    subject: "Biology",
    grade: "Grade 10",
    title: "Installation Of Microscopes",
    duration: "35 min",
    videoUrl: "#",
    watched: false,
    thumbnail:"https://i.ibb.co/W4vGhj3g/Rectangle-289.png"
  },
  {
    id: 6,
    bookId: 4,
    subject: "Biology",
    grade: "Grade 10",
    title: "Plant Cell Structure",
    duration: "42 min",
    videoUrl: "#",
    watched: true,
    thumbnail:"https://i.ibb.co/60wWFkht/Rectangle-285-1.png"
  },
  {
    id: 7,
    bookId: 4,
    subject: "Biology",
    grade: "Grade 10",
    title: "Animal Cell Structure",
    duration: "44 min",
    videoUrl: "#",
    watched: false,
    thumbnail:"https://i.ibb.co/fj31kbS/Rectangle-287.png"
  },
  {
    id: 8,
    bookId: 5,
    subject: "Math",
    grade: "First year of secondary school",
    title: "Pair Pairing",
    duration: "17:47 mins",
    teacher: "T. Rana Youssef",
    videoUrl: "#",
    watched: false,
    thumbnail: "https://i.ibb.co/8ncKwW9v/Rectangle-280-1.png"
  },
  {
    id: 9,
    bookId: 5,
    subject: "Math",
    grade: "First year of secondary school",
    title: "Individual Pairing",
    duration: "2:21 mins",
    teacher: "T. Rana Youssef",
    videoUrl: "#",
    watched: false,
    thumbnail: "https://i.ibb.co/8ncKwW9v/Rectangle-280-1.png"
  },
  {
    id: 10,
    bookId: 5,
    subject: "Math",
    grade: "First year of secondary school",
    title: "Statistics",
    duration: "56:46 mins",
    teacher: "T. Rana Youssef",
    videoUrl: "#",
    watched: false,
    thumbnail: "https://i.ibb.co/ycj6v42y/Rectangle-285-2.png"
  },

  {
    id: 11,
    bookId: 6,
    subject: "Physics",
    grade: "First year of secondary school",
    title: "Vectors",
    duration: "12:13 mins",
    teacher: "T. Kareem Adel",
    videoUrl: "#",
    watched: false,
    thumbnail: "https://i.ibb.co/ZzQTgCr0/Rectangle-276-2.png"
  },
  {
    id: 12,
    bookId: 6,
    subject: "Physics",
    grade: "First year of secondary school",
    title: "Measurement",
    duration: "4:28 mins",
    teacher: "T. Kareem Adel",
    videoUrl: "#",
    watched: false,
    thumbnail: "https://i.ibb.co/HDqjZmDH/Rectangle-280-2.png"
  },
  {
    id: 13,
    bookId: 6,
    subject: "Physics",
    grade: "First year of secondary school",
    title: "Newton's Laws",
    duration: "38:23 mins",
    teacher: "T. Kareem Adel",
    videoUrl: "#",
    watched: false,
    thumbnail: "https://i.ibb.co/V0H214rD/Rectangle-285-3.png"
  },

  {
    id: 14,
    bookId: 7,
    subject: "History",
    grade: "First year of secondary school",
    title: "Industrial Revolution",
    duration: "22:47 mins",
    teacher: "T. Lina Muhammad",
    videoUrl: "#",
    watched: false,
    thumbnail: "https://i.ibb.co/Tx4BTX8t/Rectangle-285-4.png"
  },
  {
    id: 15,
    bookId: 7,
    subject: "History",
    grade: "First year of secondary school",
    title: "Persian Empire",
    duration: "9:04 mins",
    teacher: "T. Lina Muhammad",
    videoUrl: "#",
    watched: false,
    thumbnail: "https://i.ibb.co/Tx4BTX8t/Rectangle-285-4.png"
  },
  {
    id: 16,
    bookId: 7,
    subject: "History",
    grade: "First year of secondary school",
    title: "Ottoman Empire",
    duration: "21:35 mins",
    teacher: "T. Lina Muhammad",
    videoUrl: "#",
    watched: false,
    thumbnail: "https://i.ibb.co/Tx4BTX8t/Rectangle-285-4.png"
  },

  {
    id: 17,
    bookId: 8,
    subject: "Geography",
    grade: "First year of secondary school",
    title: "Atmosphere",
    duration: "8:34 mins",
    teacher: "T. Hoda Mahmoud",
    videoUrl: "#",
    watched: false,
    thumbnail: "https://i.ibb.co/S4GpzLqG/Rectangle-276-3.png"
  },
  {
    id: 18,
    bookId: 8,
    subject: "Geography",
    grade: "First year of secondary school",
    title: "Tourism components",
    duration: "10:52 mins",
    teacher: "T. Hoda Mahmoud",
    videoUrl: "#",
    watched: false,
    thumbnail: "https://i.ibb.co/8nKWzk46/Rectangle-280-3.png"
  },
  {
    id: 19,
    bookId: 8,
    subject: "Geography",
    grade: "First year of secondary school",
    title: "Satellites",
    duration: "4:59 mins",
    teacher: "T. Hoda Mahmoud",
    videoUrl: "#",
    watched: false,
    thumbnail: "https://i.ibb.co/Mx3LBPZk/Rectangle-285-5.png"
  },

  {
    id: 20,
    bookId: 9,
    subject: "English",
    grade: "First year of secondary school",
    title: "Present Simple",
    duration: "4:50 mins",
    teacher: "T. Mustafa Saleh",
    videoUrl: "#",
    watched: false,
    thumbnail: "https://i.ibb.co/ZRbFMRXy/Rectangle-285-6.png"
  },
  {
    id: 21,
    bookId: 9,
    subject: "English",
    grade: "First year of secondary school",
    title: "Present Continuous",
    duration: "4:25 mins",
    teacher: "T. Mustafa Saleh",
    videoUrl: "#",
    watched: false,
    thumbnail: "https://i.ibb.co/ZRbFMRXy/Rectangle-285-6.png"
  },
  {
    id: 22,
    bookId: 9,
    subject: "English",
    grade: "First year of secondary school",
    title: "Present Perfect",
    duration: "5:56 mins",
    teacher: "T. Mustafa Saleh",
    videoUrl: "#",
    watched: false,
    thumbnail: "https://i.ibb.co/ZRbFMRXy/Rectangle-285-6.png"
  },

  {
    id: 23,
    bookId: 10,
    subject: "Arabic",
    grade: "First year of secondary school",
    title: "Passive Participle",
    duration: "4:03 mins",
    teacher: "T. Ali Mahmoud",
    videoUrl: "#",
    watched: false,
    thumbnail: "https://i.ibb.co/nqVgJYpK/Rectangle-276-4.png"
  },
  {
    id: 24,
    bookId: 10,
    subject: "Arabic",
    grade: "First year of secondary school",
    title: "Active Participle",
    duration: "19:36 mins",
    teacher: "T. Ali Mahmoud",
    videoUrl: "#",
    watched: false,
    thumbnail: "https://i.ibb.co/1JpYyWrF/Rectangle-280-4.png"
  },
  {
    id: 25,
    bookId: 10,
    subject: "Arabic",
    grade: "First year of secondary school",
    title: "Attached Pronouns",
    duration: "9:44 mins",
    teacher: "T. Ali Mahmoud",
    videoUrl: "#",
    watched: false,
    thumbnail: "https://i.ibb.co/xK1jDXZv/Rectangle-285-7.png"
  },
  {
    "id": 26,
    "bookId": 11,
    "subject": "History",
    "grade": "Second year of secondary school(Literary)",
    "title": "French occupation",
    "duration": "3:56 mins",
    "teacher": "T. Lina Muhammad",
    "videoUrl": "#",
    "watched": false,
    "thumbnail": "https://i.ibb.co/B5q1807L/Rectangle-276-5.png"
  },
  {
    "id": 27,
    "bookId": 11,
    "subject": "History",
    "grade": "Second year of secondary school(Literary)",
    "title": "British Mandate",
    "duration": "3:47 mins",
    "teacher": "T. Lina Muhammad",
    "videoUrl": "#",
    "watched": false,
    "thumbnail": "https://i.ibb.co/WNcm6HCH/Rectangle-280-5.png"
  },
  {
    "id": 28,
    "bookId": 11,
    "subject": "History",
    "grade": "Second year of secondary school(Literary)",
    "title": "Italian settler colonialism",
    "duration": "16:03 mins",
    "teacher": "T. Lina Muhammad",
    "videoUrl": "#",
    "watched": false,
    "thumbnail": "https://i.ibb.co/JR4NqDbZ/Rectangle-285-8.png"
  },

  /* ==================== 3. GEOGRAPHY ==================== */
  {
    "id": 29,
    "bookId": 12,
    "subject": "Geography",
    "grade": "Second year of secondary school(Literary)",
    "title": "The Solar System",
    "duration": "17:54 mins",
    "teacher": "T. Hoda Mahmoud",
    "videoUrl": "#",
    "watched": false,
    "thumbnail": "https://i.ibb.co/yFc6NPbK/Rectangle-276-6.png"
  },
  {
    "id": 30,
    "bookId": 12,
    "subject": "Geography",
    "grade": "Second year of secondary school(Literary)",
    "title": "Planet Earth",
    "duration": "7:22 mins",
    "teacher": "T. Hoda Mahmoud",
    "videoUrl": "#",
    "watched": false,
    "thumbnail": "https://i.ibb.co/nqmSGWV9/Rectangle-280-6.png"
  },
  {
    "id": 31,
    "bookId": 12,
    "subject": "Geography",
    "grade": "Second year of secondary school(Literary)",
    "title": "The Moon",
    "duration": "9:51 mins",
    "teacher": "T. Hoda Mahmoud",
    "videoUrl": "#",
    "watched": false,
    "thumbnail": "https://i.ibb.co/wZN2QnXp/Rectangle-285-9.png"
  },

  /* ==================== 4. ENGLISH ==================== */
  {
    "id": 32,
    "bookId": 13,
    "subject": "English",
    "grade": "Second year of secondary school(Literary)",
    "title": "Learning Style",
    "duration": "3:32 mins",
    "teacher": "T. Mustafa Saleh",
    "videoUrl": "#",
    "watched": false,
    "thumbnail": "https://i.ibb.co/M51Gw15h/Rectangle-276-7.png"
  },
  {
    "id": 33,
    "bookId": 13,
    "subject": "English",
    "grade": "Second year of secondary school(Literary)",
    "title": "Tips Of Smart Learning",
    "duration": "8:58 mins",
    "teacher": "T. Mustafa Saleh",
    "videoUrl": "#",
    "watched": false,
    "thumbnail": "https://i.ibb.co/sdv1BzRv/Rectangle-280-7.png"
  },
  {
    "id": 34,
    "bookId": 13,
    "subject": "English",
    "grade": "Second year of secondary school(Literary)",
    "title": "Education For Success",
    "duration": "26:55 mins",
    "teacher": "T. Mustafa Saleh",
    "videoUrl": "#",
    "watched": false,
    "thumbnail": "https://i.ibb.co/Swz1nC49/Rectangle-285-10.png"
  },

  /* ==================== 5. CHEMISTRY ==================== */
  {
    "id": 35,
    "bookId": 14,
    "subject": "Chemistry",
    "grade": "Second year of secondary school (Scientific)",
    "title": "Metals And Alloys",
    "duration": "4:37 mins",
    "teacher": "T. Nour Hassan",
    "videoUrl": "#",
    "watched": false,
    "thumbnail": "https://i.ibb.co/ym8413kG/Rectangle-276-8.png"
  },
  {
    "id": 36,
    "bookId": 14,
    "subject": "Chemistry",
    "grade": "Second year of secondary school (Scientific)",
    "title": "Oil And Natural Gas",
    "duration": "3:05 mins",
    "teacher": "T. Nour Hassan",
    "videoUrl": "#",
    "watched": false,
    "thumbnail": "https://i.ibb.co/d0JHb3Rw/Rectangle-280-8.png"
  },
  {
    "id": 37,
    "bookId": 14,
    "subject": "Chemistry",
    "grade": "Second year of secondary school (Scientific)",
    "title": "Electrolysis",
    "duration": "5:11 mins",
    "teacher": "T. Nour Hassan",
    "videoUrl": "#",
    "watched": false,
    "thumbnail": "https://i.ibb.co/NXJwWYz/Rectangle-285-12.png"
  },

  /* ==================== 6. BIOLOGY ==================== */
  {
    "id": 38,
    "bookId": 15,
    "subject": "Biology",
    "grade": "Second year of secondary school (Scientific)",
    "title": "Nucleic Acids",
    "duration": "6:16 mins",
    "teacher": "T. Youssef Al-Kilani",
    "videoUrl": "#",
    "watched": false,
    "thumbnail": "https://i.ibb.co/39wvsmPv/Rectangle-276-9.png"
  },
  {
    "id": 39,
    "bookId": 15,
    "subject": "Biology",
    "grade": "Second year of secondary school (Scientific)",
    "title": "Carbohydrates",
    "duration": "5:34 mins",
    "teacher": "T. Youssef Al-Kilani",
    "videoUrl": "#",
    "watched": false,
    "thumbnail": "https://i.ibb.co/bjxqz5G5/Rectangle-289.png"
  },
  {
    "id": 40,
    "bookId": 15,
    "subject": "Biology",
    "grade": "Second year of secondary school (Scientific)",
    "title": "Proteins",
    "duration": "4:18 mins",
    "teacher": "T. Youssef Al-Kilani",
    "videoUrl": "#",
    "watched": false,
    "thumbnail": "https://i.ibb.co/8gkfYNjd/Rectangle-285-13.png"
  },

  /* ==================== 7. MATH ==================== */
  {
    "id": 41,
    "bookId": 16,
    "subject": "Math",
    "grade": "Second year of secondary school (Scientific)",
    "title": "Multiplication Table",
    "duration": "2:33 mins",
    "teacher": "T. Rana Youssef",
    "videoUrl": "#",
    "watched": false,
    "thumbnail": "https://i.ibb.co/RTGDGDgD/Rectangle-276-10.png"
  },
  {
    "id": 42,
    "bookId": 16,
    "subject": "Math",
    "grade": "Second year of secondary school (Scientific)",
    "title": "Mathematical Equations",
    "duration": "25:05 mins",
    "teacher": "T. Rana Youssef",
    "videoUrl": "#",
    "watched": false,
    "thumbnail": "https://i.ibb.co/JRbMTpSv/Rectangle-280-9.png"
  },
  {
    "id": 43,
    "bookId": 16,
    "subject": "Math",
    "grade": "Second year of secondary school (Scientific)",
    "title": "Mathematical Proof",
    "duration": "9:41 mins",
    "teacher": "T. Rana Youssef",
    "videoUrl": "#",
    "watched": false,
    "thumbnail": "https://i.ibb.co/F4qj5Bk1/Rectangle-285-14.png"
  },

  /* ==================== 8. PHYSICS ==================== */
  {
    "id": 44,
    "bookId": 17,
    "subject": "Physics",
    "grade": "Second year of secondary school (Scientific)",
    "title": "vector Quantities",
    "duration": "4:23 mins",
    "teacher": "T. Kareem Adel",
    "videoUrl": "#",
    "watched": false,
    "thumbnail": "https://i.ibb.co/Pv5TrsnC/Rectangle-276-11.png"
  },
  {
    "id": 45,
    "bookId": 17,
    "subject": "Physics",
    "grade": "Second year of secondary school (Scientific)",
    "title": "Circular Motion",
    "duration": "15:36 mins",
    "teacher": "T. Kareem Adel",
    "videoUrl": "#",
    "watched": false,
    "thumbnail": "https://i.ibb.co/hR8nBYWM/Rectangle-280-10.png"
  },
  {
    "id": 46,
    "bookId": 17,
    "subject": "Physics",
    "grade": "Second year of secondary school (Scientific)",
    "title": "The Nature Of Light",
    "duration": "4:22 mins",
    "teacher": "T. Kareem Adel",
    "videoUrl": "#",
    "watched": false,
    "thumbnail": "https://i.ibb.co/gMvDKqGJ/Rectangle-285-15.png"
  },
  {
    "id": 47,
    "bookId": 18,
    "subject": "History",
    "grade": "Third year of secondary school (Literary)",
    "title": "Frankish Wars",
    "duration": "14:19 mins",
    "teacher": "T. Lina Muhammad",
    "videoUrl": "#",
    "watched": false,
    "thumbnail": "https://i.ibb.co/B5q1807L/Rectangle-276-5.png"
  },
  {
    "id": 48,
    "bookId": 18,
    "subject": "History",
    "grade": "Third year of secondary school (Literary)",
    "title": "The First World War",
    "duration": "5:20 mins",
    "teacher": "T. Lina Muhammad",
    "videoUrl": "#",
    "watched": false,
    "thumbnail": "https://i.ibb.co/WNcm6HCH/Rectangle-280-5.png"
  },
  {
    "id": 49,
    "bookId": 18,
    "subject": "History",
    "grade": "Third year of secondary school (Literary)",
    "title": "The Second World War",
    "duration": "28:25 mins",
    "teacher": "T. Lina Muhammad",
    "videoUrl": "#",
    "watched": false,
    "thumbnail": "https://i.ibb.co/JR4NqDbZ/Rectangle-285-8.png"
  },

  /* ==================== 2. GEOGRAPHY (Third Year - Literary) ==================== */
  {
    "id": 50,
    "bookId": 19,
    "subject": "Geography",
    "grade": "Third year of secondary school (Literary)",
    "title": "Energy Resources",
    "duration": "3:51 mins",
    "teacher": "T. Hoda Mahmoud",
    "videoUrl": "#",
    "watched": false,
    "thumbnail": "https://i.ibb.co/r24hTpcD/Rectangle-276-12.png"
  },
  {
    "id": 51,
    "bookId": 19,
    "subject": "Geography",
    "grade": "Third year of secondary school (Literary)",
    "title": "Climate Disasters",
    "duration": "5:56 mins",
    "teacher": "T. Hoda Mahmoud",
    "videoUrl": "#",
    "watched": false,
    "thumbnail": "https://i.ibb.co/3yPL7yMB/Rectangle-280-11.png"
  },
  {
    "id": 52,
    "bookId": 19,
    "subject": "Geography",
    "grade": "Third year of secondary school (Literary)",
    "title": "Geological Disasters",
    "duration": "9:46 mins",
    "teacher": "T. Hoda Mahmoud",
    "videoUrl": "#",
    "watched": false,
    "thumbnail": "https://i.ibb.co/CK60MP78/Rectangle-285-16.png"
  },

  /* ==================== 3. ENGLISH (Third Year - Literary) ==================== */
  {
    "id": 53,
    "bookId": 20,
    "subject": "English",
    "grade": "Third year of secondary school (Literary)",
    "title": "Future Continuous",
    "duration": "6:44 mins",
    "teacher": "T. Mustafa Saleh",
    "videoUrl": "#",
    "watched": false,
    "thumbnail": "https://i.ibb.co/NhXrvTV/Rectangle-285-17.png"
  },
  {
    "id": 54,
    "bookId": 20,
    "subject": "English",
    "grade": "Third year of secondary school (Literary)",
    "title": "Future Perfect",
    "duration": "8:11 mins",
    "teacher": "T. Mustafa Saleh",
    "videoUrl": "#",
    "watched": false,
    "thumbnail": "https://i.ibb.co/NhXrvTV/Rectangle-285-17.png"
  },
  {
    "id": 55,
    "bookId": 20,
    "subject": "English",
    "grade": "Third year of secondary school (Literary)",
    "title": "Past Continuous",
    "duration": "7:01 mins",
    "teacher": "T. Mustafa Saleh",
    "videoUrl": "#",
    "watched": false,
    "thumbnail": "https://i.ibb.co/NhXrvTV/Rectangle-285-17.png"
  },

  /* ==================== 4. ARABIC (Third Year - Literary) ==================== */
  {
    "id": 56,
    "bookId": 21,
    "subject": "Arabic",
    "grade": "Third year of secondary school (Literary)",
    "title": "Personal Pronouns",
    "duration": "13:13 mins",
    "teacher": "T. Ali Mahmoud",
    "videoUrl": "#",
    "watched": false,
    "thumbnail": "https://i.ibb.co/nqVgJYpK/Rectangle-276-4.png"
  },
  {
    "id": 57,
    "bookId": 21,
    "subject": "Arabic",
    "grade": "Third year of secondary school (Literary)",
    "title": "Demonstrative Names",
    "duration": "5:13 mins",
    "teacher": "T. Ali Mahmoud",
    "videoUrl": "#",
    "watched": false,
    "thumbnail": "https://i.ibb.co/nqVgJYpK/Rectangle-276-4.png"
  },
  {
    "id": 58,
    "bookId": 21,
    "subject": "Arabic",
    "grade": "Third year of secondary school (Literary)",
    "title": "Relative Pronouns",
    "duration": "4:00 mins",
    "teacher": "T. Ali Mahmoud",
    "videoUrl": "#",
    "watched": false,
    "thumbnail": "https://i.ibb.co/nqVgJYpK/Rectangle-276-4.png"
  },

  /* ==================== 5. BIOLOGY (Third Year - Scientific) ==================== */
  {
    "id": 59,
    "bookId": 22,
    "subject": "Biology",
    "grade": "Third year of secondary school (Scientific)",
    "title": "Photosynthesis process",
    "duration": "7:59 mins",
    "teacher": "T. Youssef Al-Kilani",
    "videoUrl": "#",
    "watched": false,
    "thumbnail": "https://i.ibb.co/x8mbBPDS/Rectangle-276-13.png"
  },
  {
    "id": 60,
    "bookId": 22,
    "subject": "Biology",
    "grade": "Third year of secondary school (Scientific)",
    "title": "Cellular respiration",
    "duration": "8:47 mins",
    "teacher": "T. Youssef Al-Kilani",
    "videoUrl": "#",
    "watched": false,
    "thumbnail": "https://i.ibb.co/pr35Cbsw/Rectangle-289-1.png"
  },
  {
    "id": 61,
    "bookId": 22,
    "subject": "Biology",
    "grade": "Third year of secondary school (Scientific)",
    "title": "Aerobic respiration",
    "duration": "2:53 mins",
    "teacher": "T. Youssef Al-Kilani",
    "videoUrl": "#",
    "watched": false,
    "thumbnail": "https://i.ibb.co/VWx7rBLX/Rectangle-285-18.png"
  },

  /* ==================== 6. MATH (Third Year - Scientific) ==================== */
  {
    "id": 62,
    "bookId": 23,
    "subject": "Math",
    "grade": "Third year of secondary school (Scientific)",
    "title": "Average Change",
    "duration": "4:43 mins",
    "teacher": "T. Rana Youssef",
    "videoUrl": "#",
    "watched": false,
    "thumbnail": "https://i.ibb.co/twP2MWXd/Rectangle-276-14.png"
  },
  {
    "id": 63,
    "bookId": 23,
    "subject": "Math",
    "grade": "Third year of secondary school (Scientific)",
    "title": "Matrices",
    "duration": "11:23 mins",
    "teacher": "T. Rana Youssef",
    "videoUrl": "#",
    "watched": false,
    "thumbnail": "https://i.ibb.co/DDqsYTJg/Rectangle-280-12.png"
  },
  {
    "id": 64,
    "bookId": 23,
    "subject": "Math",
    "grade": "Third year of secondary school (Scientific)",
    "title": "Extreme Values",
    "duration": "6:04 mins",
    "teacher": "T. Rana Youssef",
    "videoUrl": "#",
    "watched": false,
    "thumbnail": "https://i.ibb.co/hF0cFhJV/Rectangle-285-19.png"
  },

  /* ==================== 7. PHYSICS (Third Year - Scientific) ==================== */
  {
    "id": 65,
    "bookId": 24,
    "subject": "Physics",
    "grade": "Third year of secondary school (Scientific)",
    "title": "Linear Momentum",
    "duration": "19:37 mins",
    "teacher": "T. Kareem Adel",
    "videoUrl": "#",
    "watched": false,
    "thumbnail": "https://i.ibb.co/27RQtgn1/Rectangle-276-15.png"
  },
  {
    "id": 66,
    "bookId": 24,
    "subject": "Physics",
    "grade": "Third year of secondary school (Scientific)",
    "title": "Average Thrust Force",
    "duration": "2:33 mins",
    "teacher": "T. Kareem Adel",
    "videoUrl": "#",
    "watched": false,
    "thumbnail": "https://i.ibb.co/2Vw0K88/Rectangle-280-13.png"
  },
  {
    "id": 67,
    "bookId": 24,
    "subject": "Physics",
    "grade": "Third year of secondary school (Scientific)",
    "title": "Collisions",
    "duration": "11:23 mins",
    "teacher": "T. Kareem Adel",
    "videoUrl": "#",
    "watched": false,
    "thumbnail": "https://i.ibb.co/ycgfd2vt/Rectangle-285-20.png"
  },

  /* ==================== 8. CHEMISTRY (Third Year - Scientific) ==================== */
  {
    "id": 68,
    "bookId": 25,
    "subject": "Chemistry",
    "grade": "Third year of secondary school (Scientific)",
    "title": "Periodic Table",
    "duration": "7:53 mins",
    "teacher": "T. Nour Hassan",
    "videoUrl": "#",
    "watched": false,
    "thumbnail": "https://i.ibb.co/chsWKmfb/Rectangle-276-16.png"
  },
  {
    "id": 69,
    "bookId": 25,
    "subject": "Chemistry",
    "grade": "Third year of secondary school (Scientific)",
    "title": "Atomic Number",
    "duration": "3:23 mins",
    "teacher": "T. Nour Hassan",
    "videoUrl": "#",
    "watched": false,
    "thumbnail": "https://i.ibb.co/Y7jcNHt9/Rectangle-280-14.png"
  },
  {
    "id": 70,
    "bookId": 25,
    "subject": "Chemistry",
    "grade": "Third year of secondary school (Scientific)",
    "title": "Mass Number",
    "duration": "2:41 mins",
    "teacher": "T. Nour Hassan",
    "videoUrl": "#",
    "watched": false,
    "thumbnail": "https://i.ibb.co/4Z4kJKKs/Rectangle-285-21.png"
  }
];

const assignments = [
  {
    id: 1,
    bookId: 10,
    subject: "Arabic",
    grade: "Grade 10",
    taskNumber: 1,
    question:
      "Extract from the text a word that indicates (value/importance/problem). What is your opinion on the topic that the writer addressed? Why? And how can the ideas of the text be applied in reality?",
    completed: true,
    userId: 1,
  },
  {
    id: 2,
    bookId: 6,
    subject: "Physics",
    grade: "Grade 10",
    taskNumber: 2,
    question:
      "What is the definition of (speed/force/energy)? What is the difference between velocity vector and speed vector? And what is the relationship between force and acceleration?",
    completed: false,
    userId: 1,
  },
  {
    id: 3,
    bookId: 7,
    subject: "History",
    grade: "Grade 10",
    taskNumber: 3,
    question:
      "What is meant by history? Why is history important in human life? Who are the prominent figures mentioned in the lesson? What was their role? What were the most important events that occurred during this period?",
    completed: true,
    userId: 1,
  },
];

const notifications = [
  {
    id: 1,
    userId: 1,
    from: "Sara Ahmad",
    avatar: "https://i.ibb.co/fzWzr0Vp/Rectangle-222.png",
    message: "Login successful. Welcome back!",
    time: "35 min ago",
    read: true,
  },
  {
    id: 2,
    userId: 1,
    from: "Ahmed Al-Najjar",
    avatar: "https://i.ibb.co/Fk5df6Y0/Rectangle-224.png",
    message: "A new lesson has been added to your course.",
    time: "1 day ago",
    read: true,
  },
  {
    id: 3,
    userId: 1,
    from: "Youssef Al-Kilani",
    avatar: "https://i.ibb.co/jP7BWRg2/Ellipse-119.png",
    message: "Don't forget to complete your pending lessons",
    time: "5 day ago",
    read: false,
  },
  {
    id: 4,
    userId: 1,
    from: "Miriana Muhammad",
    avatar: "https://i.ibb.co/MWth497/Rectangle-228.png",
    message: "Network error. Check your internet connection",
    time: "1 week ago",
    read: false,
  },
  {
    id: 5,
    userId: 1,
    from: "Dima Mahmoud",
    avatar: "https://i.ibb.co/SwHW40Z2/Rectangle-232.png",
    message: "Reminder: Your exam is scheduled for tomorrow.",
    time: "2 week ago",
    read: true,
  },
  {
    id: 6,
    userId: 1,
    from: "Fares Hamdan",
    avatar: "https://i.ibb.co/0R15qDyn/Rectangle-230.png",
    message: "Your account has been created successfully",
    time: "1 month ago",
    read: false,
  },
  {
    id: 7,
    userId: 1,
    from: "Omar Al-Shami",
    avatar: "https://i.ibb.co/gMr0M5YR/Rectangle-234.png",
    message: "Your message has been sent successfully",
    time: "3 month ago",
    read: true,
  },
  {
    id: 8,
    userId: 1,
    from: "Basil Darwish",
    avatar: "https://i.ibb.co/jvjvk46S/Rectangle-238.png",
    message: "Your profile has been updated successfully",
    time: "4 month ago",
    read: true,
  },
  {
    id: 9,
    userId: 1,
    from: "Yara Hassan",
    avatar: "https://i.ibb.co/4RRCq4b1/Rectangle-236.png",
    message: "Your assignment has been graded. Check your results",
    time: "5 month ago",
    read: false,
  },
  {
    id: 10,
    userId: 1,
    from: "Amira Malik",
    avatar: "https://i.ibb.co/C5R2MJM5/Rectangle-240.png",
    message: "You have successfully completed this lesson. Great job",
    time: "9 month ago",
    read: true,
  },
];

const messages = [
  {
    id: 1,
    participants: [1, 2],
    messages: [
      { from: 2, text: "Hi, How are you?", time: "2:10 pm", date: "Yesterday" },
      { from: 1, text: "Hi, Im thanks", time: "2:10 pm", date: "Yesterday" },
      { from: 2, text: "Can I ask question?", time: "2:22 pm", date: "Yesterday" },
      { from: 1, text: "Yes, you can ask", time: "3:31 pm", date: "Yesterday" },
      { from: 2, text: "Do you want to ask", time: "5:31 pm", date: "Today" },
      { from: 1, text: "Yes, sure", time: "5:00 pm", date: "Today" },
      { from: 2, text: "Send a picture", time: "6:00 pm", date: "Today" },
    ],
  },
];

const quizzes = [
  {
    id: 1,
    bookId: 3,
    subject: "Chemistry",
    grade: "Grade 10",
    title: "Atomic Structure Quiz",
    questions: [
      {
        q: "What is the atomic number of Carbon?",
        options: ["4", "6", "8", "12"],
        answer: 1,
      },
      {
        q: "Who proposed the planetary model of the atom?",
        options: ["Bohr", "Rutherford", "Dalton", "Thomson"],
        answer: 1,
      },
    ],
  },
];

// ─── AUTH ROUTES ─────────────────────────────────────────────────────────────
app.post("/api/auth/login", (req, res) => {
  const { email, password } = req.body;
  const user = users.find((u) => u.email === email && u.password === password);
  if (!user) return res.status(401).json({ error: "Invalid email or password" });
  const token = jwt.sign({ id: user.id, email: user.email }, SECRET, { expiresIn: "7d" });
  const { password: _, ...userSafe } = user;
  res.json({ token, user: userSafe });
});

app.get("/api/auth/me", auth, (req, res) => {
  const user = users.find((u) => u.id === req.user.id);
  if (!user) return res.status(404).json({ error: "User not found" });
  const { password: _, ...userSafe } = user;
  res.json(userSafe);
});

// FeedBack
app.post("/api/feedback", auth, (req, res) => {
  const { rating, comment, enjoy } = req.body;

  if (!rating) return res.status(400).json({ error: "Rating is required" });

  console.log("New feedback:", { userId: req.user.id, rating, comment, enjoy });

  res.json({ success: true, message: "Feedback sent successfully" });
});

// forgot-password

app.post("/api/auth/forgot-password", (req, res) => {
  const { email } = req.body;
  const user = users.find((u) => u.email === email);
  if (!user) return res.status(404).json({ error: "Email not found" });

  user.otp = "1234";
  console.log(`OTP for ${email}: ${user.otp}`);

  res.json({ success: true, message: "OTP sent to your email" });
});
// OTP
app.post("/api/auth/verify-otp", (req, res) => {
  const { email, otp } = req.body;

  const user = users.find((u) => u.email === email);
  if (!user) return res.status(404).json({ error: "User not found" });

  if (user.otp !== otp) return res.status(400).json({ error: "Invalid OTP code" });

  user.otp = null;

  res.json({ success: true, message: "OTP verified successfully" });
});

// register
app.post("/api/auth/register", (req, res) => {
  const { firstName, lastName, email, location, gender, password } = req.body;

  const existing = users.find((u) => u.email === email);
  if (existing) return res.status(400).json({ error: "Email already registered" });

  const newUser = {
    id: users.length + 1,
    name: `${firstName} ${lastName}`,
    email,
    password,
    location,
    gender,
    avatar: "",
    grade: "Grade 10",
  };

  users.push(newUser);

  const token = jwt.sign({ id: newUser.id, email: newUser.email }, SECRET, { expiresIn: "7d" });
  const { password: _, ...userSafe } = newUser;

  res.status(201).json({ token, user: userSafe });
});

// reset-password
app.post("/api/auth/reset-password", (req, res) => {
  const { email, new_password } = req.body;

  const user = users.find((u) => u.email === email);
  if (!user) return res.status(404).json({ error: "User not found" });

  user.password = new_password;
  user.otp = null;

  res.json({ success: true, message: "Password reset successfully" });
});


// ─── CHANGE PASSWORD ─────────────────────────────────────────────────────────
app.patch("/api/auth/change-password", auth, (req, res) => {
  const { email, old_password, new_password } = req.body;

  const user = users.find(
    (u) => u.id === req.user.id && u.email === email && u.password === old_password
  );

  if (!user) {
    return res.status(401).json({ error: "Invalid email or old password" });
  }

  user.password = new_password;

  res.json({ success: true, message: "Password updated successfully" });
});

// ─── BOOKS ───────────────────────────────────────────────────────────────────
app.get("/api/books", (req, res) => {
  const { grade, subject } = req.query;
  let result = books;
  if (grade) result = result.filter((b) => b.grade === grade);
  if (subject) result = result.filter((b) => b.subject === subject);
  res.json(result);
});

app.get("/api/books/:id", (req, res) => {
  const book = books.find((b) => b.id === parseInt(req.params.id));
  if (!book) return res.status(404).json({ error: "Book not found" });
  res.json(book);
});

// ─── LESSONS ─────────────────────────────────────────────────────────────────
app.get("/api/lessons", (req, res) => {
  const { bookId, subject, grade } = req.query;
  let result = lessons;
  if (bookId) result = result.filter((l) => l.bookId === parseInt(bookId));
  if (subject) result = result.filter((l) => l.subject === subject);
  if (grade) result = result.filter((l) => l.grade === grade);
  res.json(result);
});

app.get("/api/lessons/:id", (req, res) => {
  const lesson = lessons.find((l) => l.id === parseInt(req.params.id));
  if (!lesson) return res.status(404).json({ error: "Lesson not found" });
  res.json(lesson);
});

// ─── ASSIGNMENTS ─────────────────────────────────────────────────────────────
app.get("/api/assignments", auth, (req, res) => {
  const { subject, grade } = req.query;
  let result = assignments.filter((a) => a.userId === req.user.id);
  if (subject) result = result.filter((a) => a.subject === subject);
  if (grade) result = result.filter((a) => a.grade === grade);
  res.json(result);
});

app.patch("/api/assignments/:id/complete", auth, (req, res) => {
  const assignment = assignments.find(
    (a) => a.id === parseInt(req.params.id) && a.userId === req.user.id
  );
  if (!assignment) return res.status(404).json({ error: "Assignment not found" });
  assignment.completed = true;
  res.json(assignment);
});

// ─── NOTIFICATIONS ───────────────────────────────────────────────────────────
app.get("/api/notifications", auth, (req, res) => {
  const result = notifications.filter((n) => n.userId === req.user.id);
  res.json(result);
});

app.patch("/api/notifications/read-all", auth, (req, res) => {
  notifications.forEach((n) => {
    if (n.userId === req.user.id) n.read = true;
  });
  res.json({ success: true });
});

app.patch("/api/notifications/:id/read", auth, (req, res) => {
  const notif = notifications.find(
    (n) => n.id === parseInt(req.params.id) && n.userId === req.user.id
  );
  if (!notif) return res.status(404).json({ error: "Notification not found" });
  notif.read = true;
  res.json(notif);
});

// ─── MESSAGES ────────────────────────────────────────────────────────────────
app.get("/api/messages", auth, (req, res) => {
  const myChats = messages.filter((m) => m.participants.includes(req.user.id));
  const result = myChats.map((chat) => {
    const otherId = chat.participants.find((p) => p !== req.user.id);
    const otherUser = users.find((u) => u.id === otherId);
    const lastMsg = chat.messages[chat.messages.length - 1];
    return {
      chatId: chat.id,
      contact: { id: otherId, name: otherUser?.name, avatar: otherUser?.avatar },
      lastMessage: lastMsg?.text,
      lastTime: lastMsg?.time,
    };
  });
  res.json(result);
});

app.get("/api/messages/:chatId", auth, (req, res) => {
  const chat = messages.find((m) => m.id === parseInt(req.params.chatId));
  if (!chat || !chat.participants.includes(req.user.id))
    return res.status(404).json({ error: "Chat not found" });
  res.json(chat.messages);
});

app.post("/api/messages/:chatId", auth, (req, res) => {
  const chat = messages.find((m) => m.id === parseInt(req.params.chatId));
  if (!chat || !chat.participants.includes(req.user.id))
    return res.status(404).json({ error: "Chat not found" });
  const newMsg = {
    from: req.user.id,
    text: req.body.text,
    time: new Date().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" }),
    date: "Today",
  };
  chat.messages.push(newMsg);
  res.status(201).json(newMsg);
});

// ─── QUIZZES ─────────────────────────────────────────────────────────────────
app.get("/api/quizzes", (req, res) => {
  const { bookId, subject } = req.query;
  let result = quizzes;
  if (bookId) result = result.filter((q) => q.bookId === parseInt(bookId));
  if (subject) result = result.filter((q) => q.subject === subject);
  res.json(result);
});

app.get("/api/quizzes/:id", (req, res) => {
  const quiz = quizzes.find((q) => q.id === parseInt(req.params.id));
  if (!quiz) return res.status(404).json({ error: "Quiz not found" });
  res.json(quiz);
});

// ─── START ───────────────────────────────────────────────────────────────────
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`✅ LearnSmart API running on port ${PORT}`);
});
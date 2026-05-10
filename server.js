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
    avatar: "https://i.pravatar.cc/150?img=1",
    grade: "Grade 10",
  },
  {
    id: 2,
    name: "Ahmed Al-Najjar",
    email: "ahmed@learnsmart.com",
    password: "123456",
    avatar: "https://i.pravatar.cc/150?img=3",
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
    longDescription: "The tenth-grade physics textbook serves as a fundamental introduction to understanding the laws governing natural phenomena in our daily lives. It defines physics as the science that studies matter, energy, and the relationship between them. The book typically begins by exploring concepts of motion, such as distance, displacement, speed, and acceleration, explaining how to describe the movement of objects using laws and equations. It then moves on to the study of forces, explaining their types, such as gravity and friction, and Newton's three laws, which explain the effect of forces on the motion of objects and how a force can change an object's speed or direction. The book also covers work and energy, explaining the concept of work and its relationship to force and displacement, and the types of energy, such as kinetic and potential energy, along with the principle of conservation of energy and its transformations from one form to another. It also addresses power and how to measure it. Furthermore, the book explains some concepts related to heat, such as temperature, methods of heat transfer (conduction, convection, and radiation), and their effects on objects. Finally, the book includes the study of waves, such as sound and light, and their properties, such as frequency, wavelength, and speed of propagation, in addition to some related phenomena. Overall, the tenth-grade physics textbook aims to develop the student’s ability to understand the natural phenomena around him in a scientific way, to use laws and equations to explain them, and to link physical concepts to practical applications in daily life.",
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
    longDescription: "The Arabic language textbook for tenth grade aims to develop students' reading, writing, listening, and speaking skills, and to enhance their ability to understand and analyze texts and express their ideas clearly and effectively. The book includes a diverse collection of reading texts, such as literary, poetic, and prose texts, which address human, social, and national themes. It aims to cultivate students' literary appreciation and broaden their knowledge. The book focuses on reading comprehension skills by encouraging students to extract main and supporting ideas, analyze meanings and concepts, and interpret vocabulary within context. It also covers Arabic grammar rules gradually, including nominal and verbal sentences, types of predicates, subjects, verbs and their types, as well as various grammatical markers and their application in sentences. Furthermore, the book emphasizes writing skills such as paragraph writing, summarizing, creative expression, and letter writing, while training students to organize and logically sequence their ideas. Finally, it focuses on developing oral expression skills through dialogue, discussion, and expressing opinions.Overall, the Arabic language textbook for the tenth grade aims to strengthen the student’s language skills in all aspects, enabling him to use it correctly in his academic and daily life, and to develop his ability to think and express himself clearly and effectively.",
    gradeLabel: "First year of secondary school",
  },
  {
    id: 7,
    subject: "History",
    grade: "Grade 10",
    title: "History Book Grade 10",
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
    teacher: "Taught by teacher Lina Muhammad",
    longDescription: "The tenth-grade history textbook aims to introduce students to significant historical events that humanity has experienced, focusing on understanding the development of civilizations and the factors that influenced them. The book begins by studying ancient civilizations such as those of Mesopotamia and ancient Egypt, explaining their origins and their most important achievements in writing, architecture, and law. It then moves on to the study of Arab-Islamic civilization, outlining its stages of development and expansion, highlighting its most prominent scientific and cultural advancements, and its role in transmitting knowledge to the world. The book also covers later historical periods, such as the Middle Ages and the modern era, explaining the most important events and major transformations the world witnessed, such as geographical discoveries and various revolutions, and their impact on changing the political and economic landscape. It also focuses on the history of Palestine, in terms of its location and cultural significance, and the events it has undergone throughout the ages, emphasizing the resilience of the Palestinian people and their attachment to their land. The book is committed to developing students' historical thinking skills, such as analyzing events, connecting causes and effects, understanding chronology, and drawing lessons from the past. Overall, the tenth-grade history textbook aims to enhance the student's awareness of the history of his nation and the world, and to develop his ability to understand the present through the study of the past.",
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
    longDescription: "The Grade 11 English textbook is an advanced course designed to develop students' language skills more deeply and professionally. It focuses on strengthening the four skills: listening, speaking, reading, and writing, while expanding their vocabulary and grammar. The book includes diverse units covering current and important topics such as technology, education, the environment, health, and culture, helping students use the language in real-life situations and understand contemporary texts. It emphasizes analytical reading, teaching students to understand texts more deeply by identifying main ideas, analyzing details, and inferring implicit meanings. Listening skills are also developed through more complex texts and dialogues, improving auditory comprehension and pronunciation. Speaking skills are further developed through interactive activities that encourage students to express their opinions and discuss ideas confidently and fluently. In writing, students practice writing more structured and detailed texts such as essays, reports, and formal and informal letters, focusing on coherence and the correct use of conjunctions. The book also covers advanced grammar rules such as different tenses in detail, conditional sentences, the passive voice, modal verbs, and complex constructions. It also focuses on vocabulary development by introducing new words and expressions in each unit, along with exercises to help students use them in various contexts. Overall, the Grade 11 English textbook aims to enable students to use the language fluently and confidently, preparing them for effective communication in their studies and daily lives, as well as equipping them for higher levels of education that require advanced language skills.",
    gradeLabel: "Second year of secondary school (Literary)",
  },
  {
    id: 10,
    subject: "Arabic Book",
    grade: "Grade 11",
    title: "Arabic Book Grade 11",
    description: "Develop reading, writing, and grammar skills in Arabic.",
    cover: "https://i.ibb.co/Zz9VZBtN/Rectangle-156.png",
    teacher: "Taught by teacher Ali Mahmoud",
    longDescription: "The Arabic language textbook for the eleventh grade is an advanced level textbook designed to develop students' linguistic and literary skills more deeply and precisely. It focuses on enhancing their ability to comprehend, analyze, and express themselves. The book includes a diverse collection of literary and prose texts, such as poetry, stories, and articles, which address humanistic, national, and cultural themes. This helps cultivate students' literary taste and strengthens their ability to analyze texts, extract main and supporting ideas, and understand rhetorical devices and various linguistic styles. The book also places great emphasis on Arabic grammar (syntax and morphology), covering advanced topics such as derivatives, sentence types, different linguistic structures, and the rules of inflection in greater detail. It trains students to apply these rules correctly in writing and expression. Furthermore, it addresses rhetoric, including simile, metaphor, and metonymy, and their role in improving style and enriching meaning. In the area of ​​writing, the book focuses on developing written expression skills, such as writing articles, reports, summaries, and letters, emphasizing the organization and logical flow of ideas and the use of clear and correct language. It also enhances oral expression skills through dialogue, discussion, and expressing opinions in a convincing manner. Overall, the eleventh-grade Arabic language textbook aims to enable the student to use the Arabic language fluently and accurately, and to develop his ability to analyze literature and think critically, which helps him in his studies and in expressing his thoughts and feelings in a distinctive way.",
    gradeLabel: "Second year of secondary school (Literary)",
  },
  {
    id: 11,
    subject: "History Book ",
    grade: "Grade 11",
    title: "History Book  Grade 11",
    description: "Discover important historical events and civilizations from the past",
    cover: "https://i.ibb.co/CswhMPSX/Rectangle-154.png",
    teacher: "Taught by teacher Lina Muhammad",
    longDescription: "The eleventh-grade history textbook is an advanced stage designed to deepen students' understanding of historical events and analyze them more broadly and coherently. It focuses on the study of the development of societies and civilizations throughout history, paying attention to causes, effects, and their impact on the present. The book begins by examining important historical periods, such as the Middle Ages and the modern era, explaining the political, economic, and social transformations the world witnessed, such as the rise of states, the evolution of systems of government, and the emergence of intellectual movements. It also addresses pivotal events such as geographical discoveries and global revolutions, including the Industrial Revolution and political revolutions, explaining their impact on changing the world in terms of the economy, technology, and lifestyle. It also focuses more deeply on Arab and Islamic history, explaining the development of Islamic states, their most important achievements, and the challenges they faced. The book pays particular attention to the history of Palestine, highlighting its strategic location, religious and historical significance, and the events it has witnessed throughout the ages, especially in the modern era, while emphasizing the Palestinian people's struggle and their steadfastness on their land. The book also aims to develop students' historical thinking skills, such as analyzing events, connecting causes and effects, understanding chronology, comparing historical periods, and drawing lessons and conclusions. Overall, this eleventh-grade history textbook helps students understand the past more deeply, connect it to the present, and cultivate their historical and cultural awareness.",
    gradeLabel: "Second year of secondary school (Literary)",
  },
  {
    id: 12,
    subject: "Geography Book ",
    grade: "Grade 11",
    title: "Geography Book  Grade 11",
    description: "Learn about countries, climates, and the Earth's natural features",
    cover: "https://i.ibb.co/Rk1P1mPR/Rectangle-152.png",
    teacher: "Taught by teacher Hoda Mahmoud",
    longDescription: "The eleventh-grade geography textbook is an advanced level textbook designed to deepen students' understanding of natural and human geographical phenomena, with a focus on the reciprocal relationship between humans and the environment. It begins with a more detailed study of physical geography, covering the Earth's surface formation and the factors influencing it, such as tectonic movements, volcanoes, and earthquakes. It also examines climate, its various components and the factors affecting it, as well as the world's climatic regions. The textbook explains water sources and their distribution, and their importance to human life and economic activities. It then moves to human geography, studying the distribution of the world's population and the factors that influence it, such as natural resources and climate. It also examines migration, its types, causes, and consequences. The textbook further explores economic activities, such as agriculture, industry, and trade, and the factors affecting each activity, with an emphasis on the sustainable use of natural resources. It also highlights contemporary environmental problems, such as pollution, desertification, and global warming, and their impact on humans and other living organisms, emphasizing the importance of environmental conservation and achieving sustainable development. Finally, it incorporates advanced geographical skills, such as map reading and analysis, and the use of graphs and data to understand geographical phenomena.",
    gradeLabel: "Second year of secondary school (Literary)",
  },
  {
    id: 13,
    subject: "Mathematics Book ",
    grade: "Grade 11",
    title: "Mathematics Book  Grade 11",
    description: "Learn algebra, equations, and basic geometry concepts",
    cover: "https://i.ibb.co/MkC2x0Dm/Rectangle-170.png",
    teacher: "Taught by teacher Rana Youssef",
    longDescription: "The eleventh-grade mathematics textbook is an advanced level designed to deepen mathematical understanding and develop analytical and problem-solving skills. It builds upon what students have learned in previous grades, presenting it in a more organized and detailed manner. The book begins with an extensive study of algebra, addressing equations and inequalities at more complex levels, including quadratic equations and their solutions. It also covers polynomials and their analysis, as well as working with algebraic fractions. Furthermore, it focuses on functions in greater depth, such as linear, quadratic, exponential, and logarithmic functions, examining their properties, graphing, and behavior. The book also includes geometry, exploring the relationships between geometric shapes in greater detail, such as triangles and circles, applying important theorems and laws, and expanding on the calculation of areas and volumes. Trigonometry is also covered, teaching students trigonometric ratios (sine, cosine, tangent) and their application in problem-solving, as well as angles and their relationships. Finally, the book includes the topic of sequences and series, studying arithmetic and geometric sequences, their laws, and how to find their terms and sums. It also delves deeper into statistics and probability, such as methods of organizing and analyzing data, calculating measures of central tendency and dispersion, and studying probability in more systematic ways. Overall, the eleventh-grade mathematics textbook aims to build a strong foundation of advanced mathematical concepts, develop logical thinking and problem-solving accuracy, and prepare students for higher levels of study, while connecting mathematics to its applications in daily life and various sciences.",
    gradeLabel: "Second year of secondary school (Scientific)",
  },
  {
    id: 14,
    subject: "Physics Book ",
    grade: "Grade 11",
    title: "Physics Book  Grade 11",
    description: "Understand motion, forces, and the laws of physics.",
    cover: "https://i.ibb.co/KjTLvN8G/Rectangle-168.png",
    teacher: "Taught by teacher Kareem Adel",
    longDescription: "The eleventh-grade physics textbook represents an advanced stage in physics studies, aiming to deepen students' understanding of the laws that explain natural phenomena in a more precise and analytical way. The book begins with an extensive study of motion, covering physical quantities such as displacement, velocity, and acceleration, with a focus on the graphical representation and analysis of motion. It then moves on to a detailed study of Newton's three laws of motion, applying them to various problems involving different forces such as friction, tension, and normal force, thus helping students understand how forces affect the motion of objects. The book also delves into work, energy, and power, explaining the relationship between force and displacement, and types of energy such as kinetic and potential energy, while applying the principle of conservation of energy to problem-solving. It also addresses momentum (quantity of motion) and its conservation law, as well as collisions between objects. The book includes a study of circular motion and centripetal force, in addition to some concepts related to gravity and its laws. It also covers the topic of vibrations and waves, explaining simple harmonic motion and wave properties such as wavelength, frequency, and speed of propagation, with applications to sound. In some sections, the book also touches on introductory concepts in electricity, such as electric charge, Coulomb's law, electric current, and simple circuits. Overall, the eleventh-grade physics textbook aims to develop students' analytical and problem-solving skills, enabling them to use physical laws to explain various phenomena and connect these to practical applications in everyday life.",
    gradeLabel: "Second year of secondary school (Scientific)",
  },
  {
    id: 15,
    subject: "Chemistry Book ",
    grade: "Grade 11",
    title: "Chemistry Book  Grade 11",
    description: "Learn about elements, reactions, and chemical experiments.",
    cover: "https://i.ibb.co/gFPZhk3K/Rectangle-166.png",
    teacher: "Taught by teacher Nour Hassan",
    longDescription: "The eleventh-grade chemistry textbook represents an advanced stage in the study of chemistry, aiming to deepen students' understanding of the structure of matter and chemical reactions in greater precision and detail. The book begins with an extensive study of the atom, covering atomic models, electron distribution in energy levels, and quantum numbers, which helps in understanding the behavior of chemical elements. It also focuses on the periodic table in greater depth, explaining periodic trends such as atomic radius, ionization energy, and electronegativity, and how these properties influence the reactions of elements. The book addresses chemical bonds in more detail, such as ionic, covalent, and polar covalent bonds, as well as the forces of attraction between molecules, explaining the properties of materials based on the type of bond. It also explains the shapes of molecules using the theory of valence electron pair repulsion (VSEPR), which helps in understanding the geometric structure of molecules. Furthermore, the book focuses on stoichiometry, where students learn how to perform calculations related to chemical reactions, such as calculating the number of moles, mass, and volume, using balanced chemical equations. It also covers gases and their laws, such as Boyle's and Charles' laws, and the relationship between pressure, volume, and temperature. The book includes a broader study of solutions, such as methods of expressing concentration, factors affecting solubility, as well as acids, bases, pH, their properties, and reactions. Overall, the eleventh-grade chemistry textbook aims to develop students' scientific thinking and analytical skills, enabling them to understand chemical reactions and apply them more deeply and accurately in practical and environmental situations.",
    gradeLabel: "Second year of secondary school (Scientific)",
  },
  {
    id: 16,
    subject: "Biology Book ",
    grade: "Grade 11",
    title: "Biology Book  Grade 11",
    description: "Explore scientific concepts about nature, energy, and living things",
    cover: "https://i.ibb.co/d4NgLwzY/Rectangle-164.png",
    teacher: "Taught by teacher Youssef Al-Kilani",
    longDescription: "The eleventh-grade biology textbook represents an advanced stage in the study of biology, focusing on deepening the student's understanding of the structure of living organisms and their vital functions at the cellular and overall body levels. The book begins with a more detailed study of the cell, addressing its intricate structure and the functions of its various organelles, as well as the vital processes that occur within it, such as transmembrane transport and the two types of cell division (mitosis and meiosis), and their importance in growth and reproduction. The book also covers genetics, explaining how traits are passed from parents to offspring through genes, Mendel's laws, chromosomes, DNA, its replication mechanism, and gene expression. It highlights the role of heredity in determining the different traits of living organisms, while also touching upon some modern applications in genetic engineering. Furthermore, the book expands on the study of the human body systems, such as the digestive, respiratory, circulatory, and nervous systems, explaining the functions of each system and its organs, and how these systems work together to sustain human life. It also explains the body's regulatory mechanisms, such as hormones and the nervous system, and how the body responds to internal and external stimuli. The book further addresses biodiversity and classification, where living organisms are categorized into groups based on shared characteristics, providing a deeper understanding of microorganisms, plants, and animals. It also sheds light on the environment and ecological relationships in greater detail, such as food chains and the cycles of matter in nature.",
    gradeLabel: "Second year of secondary school (Scientific)",
  },
  {
    id: 17,
    subject: "English Book ",
    grade: "Grade 12",
    title: "English Book  Grade 12",
    description: "Improve reading, writing, and grammar skills in English",
    cover: "https://i.ibb.co/7dvLffkT/Rectangle-182.png",
    teacher: "Taught by teacher Mustafa Saleh",
    longDescription: "The Grade 12 English textbook is an advanced course designed to help students reach a higher level of language proficiency by comprehensively developing their essential listening, speaking, reading, and writing skills. It includes diverse units covering modern and contemporary topics such as technology, globalization, higher education, environmental issues, health, and future careers, enabling students to use English in real-world and academic contexts. The book emphasizes analytical and critical reading, teaching students to understand long and complex texts, extract main and sub-themes, infer implicit meanings, and analyze the author's style. It also enhances listening comprehension through advanced texts and dialogues that improve auditory understanding and accuracy. In speaking, the book encourages students to express their opinions fluently and discuss various issues using clear and organized language. Finally, in writing, students practice writing academic essays, reports, and formal and informal letters, focusing on logical paragraph construction and the use of linking words and advanced grammatical structures. The book also includes advanced grammar rules such as different tenses, conditional sentences, passive voice, and complex conjunctions, thus enhancing the accuracy of language use. It aims to expand students' vocabulary through new words and expressions related to real-life and academic topics. Overall, the Year 12 English textbook seeks to prepare students for an advanced level of English that will enable them to use the language confidently in university studies, professional life, and international communication.",
    gradeLabel: "Third year of secondary school (Literary)",
  },
   {
    id: 18,
    subject: "Arabic Book  ",
    grade: "Grade 12",
    title: "Arabic Book Grade 12",
    description: "Develop reading, writing, and grammar skills in Arabic.",
    cover: "https://i.ibb.co/39RHxjZQ/Rectangle-180.png",
    teacher: "Taught by teacher Ali Mahmoud",
    longDescription: "The Arabic language textbook for the twelfth grade is considered an advanced curriculum designed to deeply develop students' linguistic and literary skills, with a focus on comprehension, analysis, critical thinking, and refined expression. The book includes a selection of literary, poetic, and prose texts that address intellectual, national, and humanitarian issues, helping students cultivate their literary taste and understanding of profound meanings and various rhetorical devices, such as simile, metaphor, metonymy, and figures of speech. The book also covers advanced Arabic grammar, including syntax and morphology topics such as derivatives, detailed parsing, and sentence types and structures, while training students in the correct application of rules in writing and expression. It also focuses on developing linguistic analysis skills by extracting ideas, interpreting meanings, and studying linguistic and rhetorical styles. In terms of expression, the book emphasizes writing literary and intellectual essays, reports, and letters, training students to organize and sequence ideas and use strong, clear, and impactful language. It also enhances dialogue, discussion, and expressing opinions logically and convincingly. Overall, the Arabic language textbook for the twelfth grade aims to enable the student to master the Arabic language in use and analysis, and to develop his abilities in critical thinking and refined literary expression, thus qualifying him for university studies and dealing with texts in a more profound and conscious manner.",
    gradeLabel: "Third year of secondary school (Literary)",
  },
  {
    id: 19,
    subject: "History Book ",
    grade: "Grade 12",
    title: "History Book  Grade 12",
    description: "Discover important historical events and civilizations from the past",
    cover: "https://i.ibb.co/kVdszFLQ/Rectangle-178.png",
    teacher: "Taught by teacher Lina Muhammad",
    longDescription: "The twelfth-grade history textbook is considered an advanced course designed to deepen students' understanding of global and Arab historical events, allowing them to analyze these events more broadly and connect them to the present. The book begins by examining major transformations in modern and contemporary history, such as political and intellectual revolutions, the Industrial Revolution, and the resulting significant economic and social changes that impacted the development of the modern world. It also covers the First and Second World Wars, explaining their causes, consequences, and impact on the world map and the rise of major powers. Furthermore, the book explores the post-war period, the establishment of international organizations, and their role in maintaining peace. It also focuses on modern Arab history, including the development of Arab states, colonialism, and liberation and independence movements. The history of Palestine receives particular attention, explaining the most significant events in the Palestinian cause, from the occupation to the ongoing struggle of the Palestinian people for freedom and independence, while highlighting the historical and political dimensions of the issue. The book also aims to develop students' advanced historical thinking skills, such as analyzing events, connecting causes and effects, comparing historical periods, understanding the chronology of events, and drawing lessons from history. Overall, this twelfth-grade history textbook helps students gain a deeper understanding of world and Arab history and develop a historical and political awareness that enables them to analyze the present reality based on past experiences.",
    gradeLabel: "Third year of secondary school (Literary)",
  },
  {
    id: 20,
    subject: "Geography Book  ",
    grade: "Grade 12",
    title: "Geography Book   Grade 12",
    description: "Learn about countries, climates, and the Earth's natural features",
    cover: "https://i.ibb.co/zTsgZpH6/Rectangle-176.png",
    teacher: "Taught by teacher Hoda Mahmoud",
    longDescription: "The twelfth-grade geography textbook is an advanced resource designed to deepen students' understanding of the world around them through a comprehensive and analytical study of the relationship between humans and the environment. It begins with advanced physical geography, covering natural phenomena such as climate and climate change, topography, and the geological factors that shape the Earth's surface. It also examines natural resources like water, soil, and minerals, and their importance to human life and economic development. The book further focuses on human geography, explaining the distribution of the world's population and the factors influencing it, such as migration, population growth, and population density. It also explores advanced economic activities like industry, agriculture, trade, and services, and how to utilize resources sustainably to achieve development. Finally, the textbook addresses contemporary geographical issues such as climate change, desertification, environmental pollution, and resource scarcity, explaining their impact on people and societies, while emphasizing the importance of environmental solutions and sustainable development for maintaining ecological balance. It also includes advanced geography skills such as map analysis, and the use of data, statistics, and graphs to understand geographical phenomena more accurately. Overall, the twelfth-grade geography textbook aims to prepare the student for a deeper understanding of the geographical world, develop their ability to analyze and think critically, and connect natural and human phenomena with each other, which helps them understand global issues and take conscious stances towards the environment and society.",
    gradeLabel: "Third year of secondary school (Literary)",
  },
  {
    id: 21,
    subject: "Mathematics Book ",
    grade: "Grade 12",
    title: "Mathematics Book   Grade 12",
    description: "Learn algebra, equations, and basic geometry concepts",
    cover: "https://i.ibb.co/Xxr7wbfh/Rectangle-194.png",
    teacher: "Taught by teacher Rana Youssef",
    longDescription: "The twelfth-grade mathematics textbook is considered one of the most important advanced courses, aiming to foster deep mathematical thinking and develop analytical, deductive, and problem-solving skills. The book is based on a comprehensive knowledge framework encompassing multiple branches of mathematics, building upon what students have learned in previous grades with a higher level of precision and complexity. It typically begins with calculus, where students learn the concept of limits, derivatives, their rules, and applications such as finding slopes and rates of change. The text then moves on to integration and its use in calculating areas under curves and solving various applied problems. It also focuses on different types of functions, such as exponential, logarithmic, and trigonometric functions, studying their properties, graphical representation, and behavioral analysis. Furthermore, the book delves into analytic geometry more broadly, examining the equations of lines, circles, and conic sections, and how to analyze them graphically and algebraically, in addition to understanding geometric relationships using coordinates. It also includes topics in sequences and series, such as arithmetic and geometric sequences, and finding their terms and sums. The book also covers advanced statistics and probability, where students learn data analysis, calculating measures of dispersion and central tendency, and studying probability laws and different distributions. Overall, the twelfth-grade mathematics textbook aims to prepare students for university studies by developing logical and precise thinking skills and connecting mathematical concepts to scientific, engineering, and practical applications in everyday life.",
    gradeLabel: "Third year of secondary school (Scientific)",
  },
  {
    id: 22,
    subject: "Physics Book  ",
    grade: "Grade 12",
    title: "Physics Book   Grade 12",
    description: "Understand motion, forces, and the laws of physics.",
    cover: "https://i.ibb.co/ZzGj99J3/Rectangle-192.png",
    teacher: "Taught by teacher Kareem Adel",
    longDescription: "The twelfth-grade physics textbook is considered an advanced course designed to deepen students' understanding of physical laws and their practical applications. It combines theoretical concepts with rigorous mathematical analysis. The book typically begins with the study of static electricity, covering the concept of electric charge, Coulomb's law, the electric field, potential difference, and how these affect the movement of charges. It then moves on to electric current and electrical circuits, explaining Ohm's and Kirchhoff's laws and how to analyze simple and complex electrical circuits. The book also covers magnetism and electromagnetic induction, explaining the relationship between electricity and magnetism, the laws of induction such as Faraday's and Lenz's laws, and their applications in generators and electric motors. It also delves deeper into waves and light, explaining wave properties, interference, and refraction, as well as light phenomena such as reflection, refraction, diffraction, and interference, with applications to lenses and mirrors. In some curricula, the book also includes modern physics, such as the theory of relativity and an introduction to atomic and nuclear physics, where students learn about the structure of the atom, nuclear radiation, and the energy it produces. Overall, the twelfth-grade physics textbook aims to develop students' analytical thinking and problem-solving skills, and to connect physical laws with modern technological applications, thus preparing them for a deeper understanding of the world around them and equipping them for university studies in scientific and engineering disciplines.",
    gradeLabel: "Third year of secondary school (Scientific)",
  },
  {
    id: 23,
    subject: "Chemistry Book  ",
    grade: "Grade 12",
    title: "Chemistry Book   Grade 12",
    description: "Learn about elements, reactions, and chemical experiments.",
    cover: "https://i.ibb.co/QvVq1xJk/Rectangle-190.png",
    teacher: "Taught by teacher Nour Hassan",
    longDescription: "The 12th-grade chemistry textbook is considered one of the most important courses, focusing on deepening a scientific understanding of chemistry at an advanced level. It combines theoretical concepts with practical applications. The book begins with the study of chemical equilibrium, explaining its concept and the factors affecting it, such as concentration, temperature, and pressure, according to Le Chatelier's principle, and how reactions proceed in both the forward and reverse directions. It also covers acids and bases extensively, explaining their various theories, such as the Arrhenius and Brønsted-Lowry theories, as well as pH, the strength of acids and bases, and the reactions associated with them. The book also focuses on electrochemistry, studying galvanic cells and electrolysis, and how chemical energy is converted into electrical energy and vice versa, with practical applications in everyday life, such as batteries. It also addresses the rate of chemical reactions (chemical kinetics), explaining the factors that affect reaction rate, such as temperature, concentration, and catalysts. In some curricula, the book includes an introduction to organic chemistry, defining organic compounds such as hydrocarbons, their types, properties, and basic reactions. It also addresses environmental chemistry, explaining the impact of chemicals on the environment, such as pollution, and ways to reduce it. Overall, the twelfth-grade chemistry textbook aims to develop students' scientific thinking and analytical skills, enabling them to understand chemical reactions more deeply and link them to practical, industrial, and environmental applications, thus preparing them for university studies.",
    gradeLabel: "Third year of secondary school (Scientific)",
  },
  
  {
    id: 24,
    subject: "Biology Book ",
    grade: "Grade 12",
    title: "Biology Book  Grade 12",
    description: "Explore scientific concepts about nature, energy, and living things",
    cover: "https://i.ibb.co/bgnCHyMx/Rectangle-188.png",
    teacher: "Taught by teacher Youssef Al-Kilani",
    longDescription: "The twelfth-grade biology textbook represents an advanced and comprehensive stage in the study of biology, focusing on deepening the student's understanding of vital processes at the molecular, cellular, and organismal levels. The book begins with molecular biology, covering the structure and functions of DNA, its replication mechanism, the transmission of genetic information, protein synthesis, and the role of genes in determining traits. It also explains advanced concepts in genetics, such as mutations, sex-linked inheritance, and modern techniques in genetic engineering. The book then delves into the systems of the human body in detail, including the nervous and endocrine systems, explaining how bodily functions are regulated and coordinated. It also explains the immune system and the body's defense mechanisms against disease. Furthermore, it presents important vital processes such as cellular respiration and photosynthesis in greater depth, with a focus on biochemical reactions within cells. Finally, the book addresses reproduction in both humans and other organisms, explaining the stages of growth and development. It also includes a study of biodiversity and evolution, explaining evolutionary theories and evidence of its occurrence, and classifying living organisms according to modern scientific principles. The book also pays attention to the environment, studying ecosystems and material cycles such as the carbon and nitrogen cycles, the impact of humans on the environment, contemporary environmental problems, and ways to maintain ecological balance.",
    gradeLabel: "Third year of secondary school (Scientific)",
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
  },
];

const assignments = [
  {
    id: 1,
    bookId: 6,
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
    bookId: 2,
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
    avatar: "https://i.pravatar.cc/150?img=1",
    message: "Login successful. Welcome back!",
    time: "35 min ago",
    read: true,
  },
  {
    id: 2,
    userId: 1,
    from: "Ahmed Al-Najjar",
    avatar: "https://i.pravatar.cc/150?img=3",
    message: "A new lesson has been added to your course.",
    time: "1 day ago",
    read: true,
  },
  {
    id: 3,
    userId: 1,
    from: "Youssef Al-Kilani",
    avatar: "https://i.pravatar.cc/150?img=5",
    message: "Don't forget to complete your pending lessons",
    time: "5 day ago",
    read: false,
  },
  {
    id: 4,
    userId: 1,
    from: "Miriana Muhammad",
    avatar: null,
    message: "Network error. Check your internet connection",
    time: "1 week ago",
    read: false,
  },
  {
    id: 5,
    userId: 1,
    from: "Dima Mahmoud",
    avatar: null,
    message: "Reminder: Your exam is scheduled for tomorrow.",
    time: "2 week ago",
    read: true,
  },
  {
    id: 6,
    userId: 1,
    from: "Fares Hamdan",
    avatar: null,
    message: "Your account has been created successfully",
    time: "1 month ago",
    read: false,
  },
  {
    id: 7,
    userId: 1,
    from: "Omar Al-Shami",
    avatar: null,
    message: "Your message has been sent successfully",
    time: "3 month ago",
    read: true,
  },
  {
    id: 8,
    userId: 1,
    from: "Yara Hassan",
    avatar: null,
    message: "Your assignment has been graded. Check your results",
    time: "5 month ago",
    read: false,
  },
  {
    id: 9,
    userId: 1,
    from: "Amira Malik",
    avatar: null,
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

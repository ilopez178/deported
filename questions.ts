// src/data/questions.ts

import { Question, QuestionCategory } from '@types'

export const QUESTIONS: Question[] = [
  {
    id: 1,
    q: "What is the supreme law of the land?",
    correct: "The Constitution",
    options: ["The Constitution", "The Bill of Rights", "The Declaration of Independence", "The Magna Carta"],
    category: QuestionCategory.Government
  },
  {
    id: 2,
    q: "What does the Constitution do?",
    correct: "Sets up the government; defines the government; protects basic rights",
    options: ["Sets up the government; defines the government; protects basic rights", "Declares independence", "Establishes trade rules", "Creates the military"],
    category: QuestionCategory.Government
  },
  {
    id: 3,
    q: "The first three words of the Constitution are...?",
    correct: "We the People",
    options: ["We the People", "In God We Trust", "Life, Liberty, and", "Four Score and Seven"],
    category: QuestionCategory.Government
  },
  {
    id: 4,
    q: "What is an amendment?",
    correct: "A change to the Constitution",
    options: ["A change to the Constitution", "A law passed by Congress", "A state regulation", "A court decision"],
    category: QuestionCategory.Government
  },
  {
    id: 5,
    q: "What are the first ten amendments called?",
    correct: "The Bill of Rights",
    options: ["The Bill of Rights", "The Declaration of Rights", "The Freedom Act", "The Constitutional Amendments"],
    category: QuestionCategory.Government
  },
  {
    id: 6,
    q: "Which is a right from the First Amendment?",
    correct: "Freedom of speech",
    options: ["Freedom of speech", "Freedom to work", "Right to healthcare", "Right to education"],
    category: QuestionCategory.HistoryRights
  },
  {
    id: 7,
    q: "How many U.S. Senators are there?",
    correct: "100",
    options: ["100", "50", "435", "270"],
    category: QuestionCategory.Government
  },
  {
    id: 8,
    q: "U.S. Senators are elected for how many years?",
    correct: "Six years",
    options: ["Six years", "Two years", "Four years", "Eight years"],
    category: QuestionCategory.Government
  },
  {
    id: 9,
    q: "How many voting members in the House of Representatives?",
    correct: "435",
    options: ["435", "100", "50", "538"],
    category: QuestionCategory.Government
  },
  {
    id: 10,
    q: "U.S. Representatives are elected for how many years?",
    correct: "Two years",
    options: ["Two years", "Four years", "Six years", "Eight years"],
    category: QuestionCategory.Government
  },
  {
    id: 11,
    q: "How many times can a President be elected?",
    correct: "Two times",
    options: ["Two times", "One time", "Three times", "Unlimited"],
    category: QuestionCategory.Government
  },
  {
    id: 12,
    q: "We elect a President in which month?",
    correct: "November",
    options: ["November", "October", "December", "January"],
    category: QuestionCategory.Government
  },
  {
    id: 13,
    q: "Who is the current President?",
    correct: "Donald Trump",
    options: ["Donald Trump", "Joe Biden", "Barack Obama", "George W. Bush"],
    category: QuestionCategory.Government
  },
  {
    id: 14,
    q: "Who is the current Vice President?",
    correct: "JD Vance",
    options: ["JD Vance", "Kamala Harris", "Mike Pence", "Al Gore"],
    category: QuestionCategory.Government
  },
  {
    id: 15,
    q: "If the President dies, who becomes President?",
    correct: "The Vice President",
    options: ["The Vice President", "The Speaker", "The Senator", "The Judge"],
    category: QuestionCategory.Government
  },
  {
    id: 16,
    q: "Who signs bills to become laws?",
    correct: "The President",
    options: ["The President", "Congress", "The Supreme Court", "The States"],
    category: QuestionCategory.Government
  },
  {
    id: 17,
    q: "Who vetoes bills?",
    correct: "The President",
    options: ["The President", "Congress", "The Senate", "The House"],
    category: QuestionCategory.Government
  },
  {
    id: 18,
    q: "Who advises the President?",
    correct: "The President's cabinet",
    options: ["The President's cabinet", "Congress", "The Supreme Court", "The military"],
    category: QuestionCategory.Government
  },
  {
    id: 19,
    q: "What are the two parts of Congress?",
    correct: "Senate and House of Representatives",
    options: ["Senate and House of Representatives", "Democrats and Republicans", "Federal and State", "North and South"],
    category: QuestionCategory.Government
  },
  {
    id: 20,
    q: "How many amendments does the Constitution have?",
    correct: "27",
    options: ["27", "10", "13", "21"],
    category: QuestionCategory.Government
  },
  {
    id: 21,
    q: "What did the 13th Amendment do?",
    correct: "Abolished slavery",
    options: ["Abolished slavery", "Gave women voting rights", "Freed the slaves", "Established voting rights"],
    category: QuestionCategory.HistoryRights
  },
  {
    id: 22,
    q: "What did the 14th Amendment guarantee?",
    correct: "Citizenship rights and equal protection",
    options: ["Citizenship rights and equal protection", "Women's voting rights", "Freedom of speech", "State representation"],
    category: QuestionCategory.HistoryRights
  },
  {
    id: 23,
    q: "What did the 15th Amendment guarantee?",
    correct: "Voting rights regardless of race",
    options: ["Voting rights regardless of race", "Women's voting rights", "Citizenship", "Freedom of speech"],
    category: QuestionCategory.HistoryRights
  },
  {
    id: 24,
    q: "What did the 19th Amendment guarantee?",
    correct: "Women's voting rights",
    options: ["Women's voting rights", "Civil rights", "Citizenship", "Free speech"],
    category: QuestionCategory.HistoryRights
  },
  {
    id: 25,
    q: "What is one responsibility only for U.S. citizens?",
    correct: "Serve on a jury or vote",
    options: ["Serve on a jury or vote", "Pay taxes", "Obey laws", "Learn English"],
    category: QuestionCategory.HistoryRights
  },
  {
    id: 26,
    q: "For how long must you live in the U.S. to become a citizen?",
    correct: "Five years",
    options: ["Five years", "Three years", "Seven years", "Ten years"],
    category: QuestionCategory.Government
  },
  {
    id: 27,
    q: "What checks the power of the President?",
    correct: "Congress",
    options: ["Congress", "The Supreme Court", "The states", "The military"],
    category: QuestionCategory.Government
  },
  {
    id: 28,
    q: "What checks the power of Congress?",
    correct: "The President and courts",
    options: ["The President and courts", "The states", "The voters", "The media"],
    category: QuestionCategory.Government
  },
  {
    id: 29,
    q: "What are the three branches of government?",
    correct: "Legislative, Executive, Judicial",
    options: ["Legislative, Executive, Judicial", "Federal, State, Local", "Senate, House, Courts", "President, Congress, States"],
    category: QuestionCategory.Government
  },
  {
    id: 30,
    q: "Who makes federal laws?",
    correct: "Congress",
    options: ["Congress", "The President", "The courts", "The states"],
    category: QuestionCategory.Government
  },
  {
    id: 31,
    q: "What is the highest court in the U.S.?",
    correct: "The Supreme Court",
    options: ["The Supreme Court", "The Circuit Court", "The District Court", "The Appeals Court"],
    category: QuestionCategory.Government
  },
  {
    id: 32,
    q: "How many Justices are on the Supreme Court?",
    correct: "Nine",
    options: ["Nine", "Seven", "Eleven", "Thirteen"],
    category: QuestionCategory.Government
  },
  {
    id: 33,
    q: "Who is the Chief Justice now?",
    correct: "John G. Roberts, Jr.",
    options: ["John G. Roberts, Jr.", "Clarence Thomas", "Samuel Alito", "Sonia Sotomayor"],
    category: QuestionCategory.Government
  },
  {
    id: 34,
    q: "What does the judicial branch do?",
    correct: "Reviews and interprets laws",
    options: ["Reviews and interprets laws", "Makes laws", "Enforces laws", "Approves budgets"],
    category: QuestionCategory.Government
  },
  {
    id: 35,
    q: "In what year was the Constitution written?",
    correct: "1787",
    options: ["1787", "1776", "1791", "1803"],
    category: QuestionCategory.Founding
  },
  {
    id: 36,
    q: "What is the 'rule of law'?",
    correct: "Everyone must follow the law",
    options: ["Everyone must follow the law", "Laws are made by the people", "The President decides laws", "Courts are not bound by law"],
    category: QuestionCategory.Civics
  },
  {
    id: 37,
    q: "What is the capital of the United States?",
    correct: "Washington, D.C.",
    options: ["Washington, D.C.", "New York", "Boston", "Philadelphia"],
    category: QuestionCategory.Civics
  },
  {
    id: 38,
    q: "Where is the Statue of Liberty?",
    correct: "New York Harbor",
    options: ["New York Harbor", "Washington D.C.", "Boston Harbor", "San Francisco"],
    category: QuestionCategory.Civics
  },
  {
    id: 39,
    q: "Why does the flag have 13 stripes?",
    correct: "13 original colonies",
    options: ["13 original colonies", "13 current states", "13 signers", "13 amendments"],
    category: QuestionCategory.Civics
  },
  {
    id: 40,
    q: "Why does the flag have 50 stars?",
    correct: "50 states",
    options: ["50 states", "50 signers", "50 laws", "50 landmarks"],
    category: QuestionCategory.Civics
  },
  {
    id: 41,
    q: "What is the national anthem?",
    correct: "The Star-Spangled Banner",
    options: ["The Star-Spangled Banner", "God Bless America", "America the Beautiful", "The Battle Hymn"],
    category: QuestionCategory.Civics
  },
  {
    id: 42,
    q: "When is Independence Day?",
    correct: "July 4",
    options: ["July 4", "July 1", "June 4", "August 4"],
    category: QuestionCategory.Civics
  },
  {
    id: 43,
    q: "Name one national U.S. holiday.",
    correct: "Independence Day",
    options: ["Independence Day", "Halloween", "Valentine's Day", "Graduation Day"],
    category: QuestionCategory.Civics
  },
  {
    id: 44,
    q: "What is one reason colonists came to America?",
    correct: "Freedom and religious liberty",
    options: ["Freedom and religious liberty", "To conquer natives", "To find gold", "To establish slavery"],
    category: QuestionCategory.Founding
  },
  {
    id: 45,
    q: "Who lived in America before Europeans arrived?",
    correct: "American Indians/Native Americans",
    options: ["American Indians/Native Americans", "Spanish settlers", "English colonists", "French explorers"],
    category: QuestionCategory.Founding
  },
  {
    id: 46,
    q: "What group was taken to America and sold as slaves?",
    correct: "Africans",
    options: ["Africans", "Native Americans", "Europeans", "Asians"],
    category: QuestionCategory.Founding
  },
  {
    id: 47,
    q: "Why did colonists fight the British?",
    correct: "High taxes and lack of representation",
    options: ["High taxes and lack of representation", "For territory", "To expand slavery", "For wealth"],
    category: QuestionCategory.Founding
  },
  {
    id: 48,
    q: "Who wrote the Declaration of Independence?",
    correct: "Thomas Jefferson",
    options: ["Thomas Jefferson", "George Washington", "Benjamin Franklin", "John Adams"],
    category: QuestionCategory.Founding
  },
  {
    id: 49,
    q: "When was the Declaration of Independence adopted?",
    correct: "July 4, 1776",
    options: ["July 4, 1776", "July 4, 1781", "June 4, 1776", "August 4, 1776"],
    category: QuestionCategory.Founding
  },
  {
    id: 50,
    q: "Who is the 'Father of His Country'?",
    correct: "George Washington",
    options: ["George Washington", "Benjamin Franklin", "Thomas Jefferson", "John Adams"],
    category: QuestionCategory.Founding
  },
  {
    id: 51,
    q: "Who was the first President?",
    correct: "George Washington",
    options: ["George Washington", "John Adams", "Thomas Jefferson", "James Madison"],
    category: QuestionCategory.Founding
  },
  {
    id: 52,
    q: "Who wrote the Constitution?",
    correct: "The Founding Fathers",
    options: ["The Founding Fathers", "George Washington", "Thomas Jefferson", "Benjamin Franklin"],
    category: QuestionCategory.Founding
  },
  {
    id: 53,
    q: "What did the Emancipation Proclamation do?",
    correct: "Freed slaves in Confederate states",
    options: ["Freed slaves in Confederate states", "Ended the Civil War", "Gave women voting rights", "Abolished slavery everywhere"],
    category: QuestionCategory.HistoryRights
  },
  {
    id: 54,
    q: "Who freed the slaves?",
    correct: "Abraham Lincoln",
    options: ["Abraham Lincoln", "Thomas Jefferson", "Ulysses S. Grant", "Frederick Douglass"],
    category: QuestionCategory.HistoryRights
  },
  {
    id: 55,
    q: "Who was President during the Civil War?",
    correct: "Abraham Lincoln",
    options: ["Abraham Lincoln", "Andrew Johnson", "Jefferson Davis", "Robert E. Lee"],
    category: QuestionCategory.HistoryRights
  },
  {
    id: 56,
    q: "Who was Susan B. Anthony?",
    correct: "Fought for women's voting rights",
    options: ["Fought for women's voting rights", "Led the Civil War", "Founded the NAACP", "Wrote the Constitution"],
    category: QuestionCategory.HistoryRights
  },
  {
    id: 57,
    q: "What war did the U.S. fight in the 1900s?",
    correct: "World War I or World War II",
    options: ["World War I or World War II", "The Spanish-American War", "The War of 1812", "The French and Indian War"],
    category: QuestionCategory.HistoryRights
  },
  {
    id: 58,
    q: "Who was President during the Great Depression?",
    correct: "Franklin D. Roosevelt",
    options: ["Franklin D. Roosevelt", "Theodore Roosevelt", "Harry Truman", "Dwight Eisenhower"],
    category: QuestionCategory.HistoryRights
  },
  {
    id: 59,
    q: "What was one concern during the Cold War?",
    correct: "Communism",
    options: ["Communism", "Slavery", "Colonialism", "Economic depression"],
    category: QuestionCategory.HistoryRights
  },
  {
    id: 60,
    q: "What movement fought racial discrimination?",
    correct: "The Civil Rights Movement",
    options: ["The Civil Rights Movement", "The Women's Movement", "The Labor Movement", "The Progressive Movement"],
    category: QuestionCategory.HistoryRights
  },
  {
    id: 61,
    q: "What did the 13th Amendment abolish?",
    correct: "Slavery",
    options: ["Slavery", "Poll taxes", "Segregation", "Child labor"],
    category: QuestionCategory.HistoryRights
  },
  {
    id: 62,
    q: "What are the 'rights of Americans'?",
    correct: "Protected by the Constitution",
    options: ["Protected by the Constitution", "Decided by Congress", "Voted on annually", "Determined by states"],
    category: QuestionCategory.HistoryRights
  },
  {
    id: 63,
    q: "What is 'separation of powers'?",
    correct: "Division of government into three branches",
    options: ["Division of government into three branches", "Separation of states", "Separation of church and state", "Division of labor"],
    category: QuestionCategory.Government
  },
  {
    id: 64,
    q: "Why is separation of powers important?",
    correct: "Prevents any one branch from having too much power",
    options: ["Prevents any one branch from having too much power", "Makes government faster", "Reduces costs", "Increases military power"],
    category: QuestionCategory.Government
  },
  {
    id: 65,
    q: "What is 'checks and balances'?",
    correct: "System where branches limit each other's power",
    options: ["System where branches limit each other's power", "Economic system", "State representation", "Fair taxation"],
    category: QuestionCategory.Government
  },
  {
    id: 66,
    q: "Who is in charge of the executive branch?",
    correct: "The President",
    options: ["The President", "Congress", "The courts", "The military"],
    category: QuestionCategory.Government
  },
  {
    id: 67,
    q: "What is the legislative branch?",
    correct: "Congress (Senate and House)",
    options: ["Congress (Senate and House)", "The President", "The courts", "The military"],
    category: QuestionCategory.Government
  },
  {
    id: 68,
    q: "What can Congress do?",
    correct: "Make federal laws",
    options: ["Make federal laws", "Veto bills", "Interpret laws", "Appoint judges"],
    category: QuestionCategory.Government
  },
  {
    id: 69,
    q: "How many Senators per state?",
    correct: "Two",
    options: ["Two", "One", "Based on population", "Varies"],
    category: QuestionCategory.Government
  },
  {
    id: 70,
    q: "How many Representatives per state depends on...?",
    correct: "Population",
    options: ["Population", "Geography", "Age", "Wealth"],
    category: QuestionCategory.Government
  },
  {
    id: 71,
    q: "What does the President's cabinet do?",
    correct: "Advises the President",
    options: ["Advises the President", "Makes laws", "Judges cases", "Commands military"],
    category: QuestionCategory.Government
  },
  {
    id: 72,
    q: "Who can veto a bill?",
    correct: "The President",
    options: ["The President", "Congress", "The Supreme Court", "The States"],
    category: QuestionCategory.Government
  },
  {
    id: 73,
    q: "What can override a Presidential veto?",
    correct: "Congress with 2/3 majority",
    options: ["Congress with 2/3 majority", "Supreme Court", "The states", "Public vote"],
    category: QuestionCategory.Government
  },
  {
    id: 74,
    q: "How long is a Presidential term?",
    correct: "Four years",
    options: ["Four years", "Two years", "Six years", "Eight years"],
    category: QuestionCategory.Government
  },
  {
    id: 75,
    q: "When is a new President inaugurated?",
    correct: "January",
    options: ["January", "March", "April", "November"],
    category: QuestionCategory.Government
  },
  {
    id: 76,
    q: "What did the Federalist Papers support?",
    correct: "Passage of the Constitution",
    options: ["Passage of the Constitution", "The Declaration of Independence", "The Bill of Rights", "The Articles of Confederation"],
    category: QuestionCategory.Founding
  },
  {
    id: 77,
    q: "What did the Articles of Confederation do?",
    correct: "Set up the first government",
    options: ["Set up the first government", "Declared independence", "Ended the Civil War", "Created the presidency"],
    category: QuestionCategory.Founding
  },
  {
    id: 78,
    q: "What is one weakness of the Articles?",
    correct: "Congress couldn't enforce laws or tax",
    options: ["Congress couldn't enforce laws or tax", "Too powerful presidency", "Too much state power", "Too many courts"],
    category: QuestionCategory.Founding
  },
  {
    id: 79,
    q: "What year was the Constitution written?",
    correct: "1787",
    options: ["1787", "1776", "1791", "1803"],
    category: QuestionCategory.Founding
  },
  {
    id: 80,
    q: "What is naturalization?",
    correct: "Becoming a U.S. citizen",
    options: ["Becoming a U.S. citizen", "Natural resources", "State borders", "Federal land"],
    category: QuestionCategory.Civics
  },
  {
    id: 81,
    q: "What is one responsibility of citizens?",
    correct: "Vote or serve on jury",
    options: ["Vote or serve on jury", "Pay taxes", "Follow laws", "Own property"],
    category: QuestionCategory.Civics
  },
  {
    id: 82,
    q: "Name one right of citizens.",
    correct: "Vote or run for office",
    options: ["Vote or run for office", "Work anywhere", "Own property", "Travel freely"],
    category: QuestionCategory.Civics
  },
  {
    id: 83,
    q: "How old to vote for President?",
    correct: "18 years old",
    options: ["18 years old", "16 years old", "21 years old", "25 years old"],
    category: QuestionCategory.Civics
  },
  {
    id: 84,
    q: "How can Americans participate in democracy?",
    correct: "Vote, serve on jury, or petition",
    options: ["Vote, serve on jury, or petition", "Pay taxes", "Own property", "Work for government"],
    category: QuestionCategory.Civics
  },
  {
    id: 85,
    q: "What is the 'Pledge of Allegiance'?",
    correct: "Oath of loyalty to the U.S.",
    options: ["Oath of loyalty to the U.S.", "A military command", "A law", "A treaty"],
    category: QuestionCategory.Civics
  },
  {
    id: 86,
    q: "Who must follow the Constitution?",
    correct: "Everyone including government",
    options: ["Everyone including government", "Only Congress", "Only the President", "Only citizens"],
    category: QuestionCategory.Government
  },
  {
    id: 87,
    q: "Can the Constitution be changed?",
    correct: "Yes, through amendments",
    options: ["Yes, through amendments", "No, it's permanent", "Only by President", "Only by Congress"],
    category: QuestionCategory.Government
  },
  {
    id: 88,
    q: "Who has power to declare war?",
    correct: "Congress",
    options: ["Congress", "The President", "The Supreme Court", "The military"],
    category: QuestionCategory.Government
  },
  {
    id: 89,
    q: "What is the highest law in America?",
    correct: "The Constitution",
    options: ["The Constitution", "Federal laws", "State laws", "International treaties"],
    category: QuestionCategory.Government
  },
  {
    id: 90,
    q: "What does the Constitution protect?",
    correct: "Rights of Americans",
    options: ["Rights of Americans", "Power of monarchy", "Foreign interests", "Corporate profits"],
    category: QuestionCategory.Government
  },
  {
    id: 91,
    q: "Name one thing Benjamin Franklin did.",
    correct: "U.S. diplomat or scientist",
    options: ["U.S. diplomat or scientist", "Led the Civil War", "Wrote Constitution", "First President"],
    category: QuestionCategory.Founding
  },
  {
    id: 92,
    q: "What is one thing George Washington did?",
    correct: "First President or military leader",
    options: ["First President or military leader", "Wrote Declaration", "Freed slaves", "Fought in Civil War"],
    category: QuestionCategory.Founding
  },
  {
    id: 93,
    q: "What territory did U.S. buy from France in 1803?",
    correct: "Louisiana Territory",
    options: ["Louisiana Territory", "Texas", "Florida", "California"],
    category: QuestionCategory.HistoryRights
  },
  {
    id: 94,
    q: "What was Martin Luther King Jr. known for?",
    correct: "Civil Rights Movement leadership",
    options: ["Civil Rights Movement leadership", "Presidency", "Military service", "Scientific discovery"],
    category: QuestionCategory.HistoryRights
  },
  {
    id: 95,
    q: "How many original states?",
    correct: "13",
    options: ["13", "10", "50", "25"],
    category: QuestionCategory.Founding
  },
  {
    id: 96,
    q: "What is democracy?",
    correct: "Government by the people",
    options: ["Government by the people", "Rule by kings", "Military rule", "Corporate rule"],
    category: QuestionCategory.Civics
  },
  {
    id: 97,
    q: "Why do we have amendments?",
    correct: "To change the Constitution",
    options: ["To change the Constitution", "To make laws", "To override courts", "To increase taxes"],
    category: QuestionCategory.Government
  },
  {
    id: 98,
    q: "What are civil rights?",
    correct: "Rights protected by government",
    options: ["Rights protected by government", "Military rights", "Corporate rights", "State rights only"],
    category: QuestionCategory.HistoryRights
  },
  {
    id: 99,
    q: "What is freedom of speech?",
    correct: "Right to express opinions",
    options: ["Right to express opinions", "Right to yell anywhere", "Right to lie", "Right to no consequences"],
    category: QuestionCategory.HistoryRights
  },
  {
    id: 100,
    q: "Who wrote the Declaration of Independence?",
    correct: "Thomas Jefferson",
    options: ["Thomas Jefferson", "George Washington", "Benjamin Franklin", "John Adams"],
    category: QuestionCategory.Founding
  }
]

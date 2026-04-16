// src/data/questions.ts

import { Question, QuestionCategory } from '@types'

export const QUESTIONS: Question[] = [
  {
    id: 1,
    q: "What is the supreme law of the land?",
    correct: "The Constitution",
    options: ["The Constitution", "The Bill of Rights", "The Articles of Confederation", "The Federalist Papers"],
    category: QuestionCategory.Government
  },
  {
    id: 2,
    q: "What does the Constitution do?",
    correct: "Sets up the government; defines the government; protects basic rights",
    options: ["Sets up the government; defines the government; protects basic rights", "Defines the rights of all people living in the U.S.", "Establishes duties of every American citizen", "Creates the three branches and sets term limits"],
    category: QuestionCategory.Government
  },
  {
    id: 3,
    q: "The first three words of the Constitution are...?",
    correct: "We the People",
    options: ["We the People", "In Congress Assembled", "To Establish Justice", "We the Citizens"],
    category: QuestionCategory.Government
  },
  {
    id: 4,
    q: "What is an amendment?",
    correct: "A change to the Constitution",
    options: ["A change to the Constitution", "A formal addition to federal law", "A revision approved by the President", "A ruling issued by the Supreme Court"],
    category: QuestionCategory.Government
  },
  {
    id: 5,
    q: "What are the first ten amendments called?",
    correct: "The Bill of Rights",
    options: ["The Bill of Rights", "The Charter of Liberties", "The Articles of Amendment", "The Declaration of Rights"],
    category: QuestionCategory.Government
  },
  {
    id: 6,
    q: "Which is a right from the First Amendment?",
    correct: "Freedom of speech",
    options: ["Freedom of speech", "Right to bear arms", "Freedom from unreasonable search", "Right to a speedy trial"],
    category: QuestionCategory.HistoryRights
  },
  {
    id: 7,
    q: "How many U.S. Senators are there?",
    correct: "100",
    options: ["100", "98", "104", "50"],
    category: QuestionCategory.Government
  },
  {
    id: 8,
    q: "U.S. Senators are elected for how many years?",
    correct: "Six years",
    options: ["Six years", "Four years", "Five years", "Eight years"],
    category: QuestionCategory.Government
  },
  {
    id: 9,
    q: "How many voting members in the House of Representatives?",
    correct: "435",
    options: ["435", "441", "425", "538"],
    category: QuestionCategory.Government
  },
  {
    id: 10,
    q: "U.S. Representatives are elected for how many years?",
    correct: "Two years",
    options: ["Two years", "One year", "Three years", "Four years"],
    category: QuestionCategory.Government
  },
  {
    id: 11,
    q: "How many times can a President be elected?",
    correct: "Two times",
    options: ["Two times", "Three times", "Unlimited", "Once"],
    category: QuestionCategory.Government
  },
  {
    id: 12,
    q: "We elect a President in which month?",
    correct: "November",
    options: ["November", "October", "September", "March"],
    category: QuestionCategory.Government
  },
  {
    id: 13,
    q: "Who is the current President?",
    correct: "Donald Trump",
    options: ["Donald Trump", "Joe Biden", "Kamala Harris", "Ron DeSantis"],
    category: QuestionCategory.Government
  },
  {
    id: 14,
    q: "Who is the current Vice President?",
    correct: "JD Vance",
    options: ["JD Vance", "Kamala Harris", "Mike Pence", "Marco Rubio"],
    category: QuestionCategory.Government
  },
  {
    id: 15,
    q: "If the President dies, who becomes President?",
    correct: "The Vice President",
    options: ["The Vice President", "The Speaker of the House", "The Secretary of State", "The Senate Majority Leader"],
    category: QuestionCategory.Government
  },
  {
    id: 16,
    q: "Who signs bills to become laws?",
    correct: "The President",
    options: ["The President", "The Speaker of the House", "The Senate Majority Leader", "The Vice President"],
    category: QuestionCategory.Government
  },
  {
    id: 17,
    q: "Who vetoes bills?",
    correct: "The President",
    options: ["The President", "The Senate", "The Vice President", "The Supreme Court"],
    category: QuestionCategory.Government
  },
  {
    id: 18,
    q: "Who advises the President?",
    correct: "The President's cabinet",
    options: ["The President's cabinet", "The National Security Council", "The Joint Chiefs of Staff", "The Congressional leadership"],
    category: QuestionCategory.Government
  },
  {
    id: 19,
    q: "What are the two parts of Congress?",
    correct: "Senate and House of Representatives",
    options: ["Senate and House of Representatives", "Senate and the Judiciary", "House and the Executive Office", "House and the President"],
    category: QuestionCategory.Government
  },
  {
    id: 20,
    q: "How many amendments does the Constitution have?",
    correct: "27",
    options: ["27", "25", "26", "33"],
    category: QuestionCategory.Government
  },
  {
    id: 21,
    q: "What did the 13th Amendment do?",
    correct: "Abolished slavery",
    options: ["Abolished slavery", "Granted citizenship to formerly enslaved people", "Gave Black Americans the right to vote", "Ended indentured servitude"],
    category: QuestionCategory.HistoryRights
  },
  {
    id: 22,
    q: "What did the 14th Amendment guarantee?",
    correct: "Citizenship rights and equal protection",
    options: ["Citizenship rights and equal protection", "Voting rights regardless of race", "Abolished slavery throughout the nation", "Equal pay for equal work"],
    category: QuestionCategory.HistoryRights
  },
  {
    id: 23,
    q: "What did the 15th Amendment guarantee?",
    correct: "Voting rights regardless of race",
    options: ["Voting rights regardless of race", "Women's voting rights", "Citizenship for all born in the U.S.", "Equal protection under law"],
    category: QuestionCategory.HistoryRights
  },
  {
    id: 24,
    q: "What did the 19th Amendment guarantee?",
    correct: "Women's voting rights",
    options: ["Women's voting rights", "Equal rights for all citizens", "End of segregation", "Equal pay regardless of gender"],
    category: QuestionCategory.HistoryRights
  },
  {
    id: 25,
    q: "What is one responsibility that is only for U.S. citizens?",
    correct: "Serve on a jury or vote",
    options: ["Serve on a jury or vote", "Register for Selective Service", "Pay federal income taxes", "Obtain a driver's license"],
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
    options: ["Congress", "The Supreme Court", "State Governors", "The Joint Chiefs of Staff"],
    category: QuestionCategory.Government
  },
  {
    id: 28,
    q: "What checks the power of Congress?",
    correct: "The President and courts",
    options: ["The President and courts", "State legislatures", "The voters alone", "The Senate filibuster"],
    category: QuestionCategory.Government
  },
  {
    id: 29,
    q: "What are the three branches of government?",
    correct: "Legislative, Executive, Judicial",
    options: ["Legislative, Executive, Judicial", "Federal, State, Territorial", "Congress, Cabinet, Judiciary", "Senate, Presidency, Courts"],
    category: QuestionCategory.Government
  },
  {
    id: 30,
    q: "Who makes federal laws?",
    correct: "Congress",
    options: ["Congress", "The President via executive order", "The Supreme Court", "State legislatures"],
    category: QuestionCategory.Government
  },
  {
    id: 31,
    q: "What is the highest court in the U.S.?",
    correct: "The Supreme Court",
    options: ["The Supreme Court", "The D.C. Circuit Court", "The Federal Court of Appeals", "The Constitutional Court"],
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
    options: ["John G. Roberts, Jr.", "Clarence Thomas", "Samuel Alito", "Elena Kagan"],
    category: QuestionCategory.Government
  },
  {
    id: 34,
    q: "What does the judicial branch do?",
    correct: "Reviews and interprets laws",
    options: ["Reviews and interprets laws", "Makes and enforces laws", "Approves the federal budget", "Confirms Presidential appointments"],
    category: QuestionCategory.Government
  },
  {
    id: 35,
    q: "In what year was the Constitution written?",
    correct: "1787",
    options: ["1787", "1776", "1789", "1791"],
    category: QuestionCategory.Founding
  },
  {
    id: 36,
    q: "What is the 'rule of law'?",
    correct: "Everyone must follow the law",
    options: ["Everyone must follow the law", "Leaders are above the law during wartime", "Citizens may reject unjust laws", "Courts decide who must follow the law"],
    category: QuestionCategory.Civics
  },
  {
    id: 37,
    q: "What is the capital of the United States?",
    correct: "Washington, D.C.",
    options: ["Washington, D.C.", "Philadelphia", "New York City", "Annapolis"],
    category: QuestionCategory.Civics
  },
  {
    id: 38,
    q: "Where is the Statue of Liberty?",
    correct: "New York Harbor",
    options: ["New York Harbor", "Ellis Island", "Liberty Island", "Manhattan Island"],
    category: QuestionCategory.Civics
  },
  {
    id: 39,
    q: "Why does the flag have 13 stripes?",
    correct: "13 original colonies",
    options: ["13 original colonies", "13 states at ratification", "13 signers of the Declaration", "13 Articles of Confederation"],
    category: QuestionCategory.Civics
  },
  {
    id: 40,
    q: "Why does the flag have 50 stars?",
    correct: "50 states",
    options: ["50 states", "50 years of the union", "50 original signers", "50 territories"],
    category: QuestionCategory.Civics
  },
  {
    id: 41,
    q: "What is the national anthem?",
    correct: "The Star-Spangled Banner",
    options: ["The Star-Spangled Banner", "America the Beautiful", "God Bless America", "My Country, 'Tis of Thee"],
    category: QuestionCategory.Civics
  },
  {
    id: 42,
    q: "When is Independence Day?",
    correct: "July 4",
    options: ["July 4", "July 2", "June 4", "July 14"],
    category: QuestionCategory.Civics
  },
  {
    id: 43,
    q: "Name one national U.S. holiday.",
    correct: "Independence Day",
    options: ["Independence Day", "Flag Day", "Constitution Day", "Tax Day"],
    category: QuestionCategory.Civics
  },
  {
    id: 44,
    q: "What is one reason colonists came to America?",
    correct: "Freedom and religious liberty",
    options: ["Freedom and religious liberty", "To establish trade routes with Asia", "To escape widespread European famine", "To claim land for European monarchies"],
    category: QuestionCategory.Founding
  },
  {
    id: 45,
    q: "Who lived in America before Europeans arrived?",
    correct: "American Indians/Native Americans",
    options: ["American Indians/Native Americans", "Norse settlers", "Pacific Islanders", "Ancient Chinese explorers"],
    category: QuestionCategory.Founding
  },
  {
    id: 46,
    q: "What group was taken to America and sold as slaves?",
    correct: "Africans",
    options: ["Africans", "Irish indentured servants", "Native Americans", "Pacific Islanders"],
    category: QuestionCategory.Founding
  },
  {
    id: 47,
    q: "Why did colonists fight the British?",
    correct: "High taxes and lack of representation",
    options: ["High taxes and lack of representation", "Religious persecution by the Crown", "To expand territory westward", "To control Atlantic trade routes"],
    category: QuestionCategory.Founding
  },
  {
    id: 48,
    q: "Who wrote the Declaration of Independence?",
    correct: "Thomas Jefferson",
    options: ["Thomas Jefferson", "Benjamin Franklin", "John Adams", "James Madison"],
    category: QuestionCategory.Founding
  },
  {
    id: 49,
    q: "When was the Declaration of Independence adopted?",
    correct: "July 4, 1776",
    options: ["July 4, 1776", "July 2, 1776", "September 17, 1787", "June 11, 1776"],
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
    options: ["George Washington", "John Adams", "Thomas Jefferson", "Benjamin Franklin"],
    category: QuestionCategory.Founding
  },
  {
    id: 52,
    q: "Who wrote the Constitution?",
    correct: "The Founding Fathers",
    options: ["The Founding Fathers", "James Madison alone", "Alexander Hamilton", "Thomas Jefferson"],
    category: QuestionCategory.Founding
  },
  {
    id: 53,
    q: "What did the Emancipation Proclamation do?",
    correct: "Freed slaves in Confederate states",
    options: ["Freed slaves in Confederate states", "Abolished slavery throughout the entire nation", "Granted citizenship to formerly enslaved people", "Ended the Civil War"],
    category: QuestionCategory.HistoryRights
  },
  {
    id: 54,
    q: "Who freed the slaves?",
    correct: "Abraham Lincoln",
    options: ["Abraham Lincoln", "Ulysses S. Grant", "Frederick Douglass", "Andrew Johnson"],
    category: QuestionCategory.HistoryRights
  },
  {
    id: 55,
    q: "Who was President during the Civil War?",
    correct: "Abraham Lincoln",
    options: ["Abraham Lincoln", "Jefferson Davis", "Andrew Johnson", "Ulysses S. Grant"],
    category: QuestionCategory.HistoryRights
  },
  {
    id: 56,
    q: "Who was Susan B. Anthony?",
    correct: "Fought for women's voting rights",
    options: ["Fought for women's voting rights", "Led the abolition movement", "Founded the NAACP", "Wrote the 15th Amendment"],
    category: QuestionCategory.HistoryRights
  },
  {
    id: 57,
    q: "What major war did the U.S. fight in the first half of the 1900s?",
    correct: "World War I or World War II",
    options: ["World War I or World War II", "The Spanish-American War", "The War of 1812", "The Mexican-American War"],
    category: QuestionCategory.HistoryRights
  },
  {
    id: 58,
    q: "Who was President during the Great Depression?",
    correct: "Franklin D. Roosevelt",
    options: ["Franklin D. Roosevelt", "Herbert Hoover", "Theodore Roosevelt", "Harry Truman"],
    category: QuestionCategory.HistoryRights
  },
  {
    id: 59,
    q: "What was one main concern during the Cold War?",
    correct: "Communism",
    options: ["Communism", "Fascism", "Nuclear proliferation", "Economic collapse"],
    category: QuestionCategory.HistoryRights
  },
  {
    id: 60,
    q: "What movement fought racial discrimination in the 1950s and 60s?",
    correct: "The Civil Rights Movement",
    options: ["The Civil Rights Movement", "The Women's Suffrage Movement", "The Labor Movement", "The Progressive Movement"],
    category: QuestionCategory.HistoryRights
  },
  {
    id: 61,
    q: "What did the 13th Amendment abolish?",
    correct: "Slavery",
    options: ["Slavery", "Poll taxes", "Racial segregation", "Voting restrictions"],
    category: QuestionCategory.HistoryRights
  },
  {
    id: 62,
    q: "What protects the rights of Americans?",
    correct: "The Constitution",
    options: ["The Constitution", "Congressional majority vote", "Supreme Court rulings alone", "State laws"],
    category: QuestionCategory.HistoryRights
  },
  {
    id: 63,
    q: "What is 'separation of powers'?",
    correct: "Division of government into three branches",
    options: ["Division of government into three branches", "Separation of church and state", "Division of state and federal authority", "Separation of military and civilian rule"],
    category: QuestionCategory.Government
  },
  {
    id: 64,
    q: "Why is separation of powers important?",
    correct: "Prevents any one branch from having too much power",
    options: ["Prevents any one branch from having too much power", "Speeds up the legislative process", "Reduces government operating costs", "Ensures equal representation by population"],
    category: QuestionCategory.Government
  },
  {
    id: 65,
    q: "What is 'checks and balances'?",
    correct: "System where branches limit each other's power",
    options: ["System where branches limit each other's power", "The federal budgeting process", "Equal representation across states", "The process of confirming judges"],
    category: QuestionCategory.Government
  },
  {
    id: 66,
    q: "Who is in charge of the executive branch?",
    correct: "The President",
    options: ["The President", "The Vice President", "The Secretary of State", "The National Security Advisor"],
    category: QuestionCategory.Government
  },
  {
    id: 67,
    q: "What is the legislative branch?",
    correct: "Congress (Senate and House)",
    options: ["Congress (Senate and House)", "The President and Cabinet", "The federal court system", "State legislatures"],
    category: QuestionCategory.Government
  },
  {
    id: 68,
    q: "What can Congress do?",
    correct: "Make federal laws",
    options: ["Make federal laws", "Veto Presidential actions", "Interpret the Constitution", "Appoint federal judges unilaterally"],
    category: QuestionCategory.Government
  },
  {
    id: 69,
    q: "How many Senators does each state have?",
    correct: "Two",
    options: ["Two", "Based on population", "Three", "One"],
    category: QuestionCategory.Government
  },
  {
    id: 70,
    q: "How many Representatives per state depends on...?",
    correct: "Population",
    options: ["Population", "Geographic size", "Statehood date", "Economic output"],
    category: QuestionCategory.Government
  },
  {
    id: 71,
    q: "What does the President's cabinet do?",
    correct: "Advises the President",
    options: ["Advises the President", "Passes legislation", "Rules on constitutional cases", "Commands the armed forces"],
    category: QuestionCategory.Government
  },
  {
    id: 72,
    q: "Who can veto a bill?",
    correct: "The President",
    options: ["The President", "The Speaker of the House", "The Senate Majority Leader", "The Chief Justice"],
    category: QuestionCategory.Government
  },
  {
    id: 73,
    q: "What can override a Presidential veto?",
    correct: "Congress with 2/3 majority",
    options: ["Congress with 2/3 majority", "A unanimous Supreme Court ruling", "Ratification by 3/4 of states", "A Senate supermajority alone"],
    category: QuestionCategory.Government
  },
  {
    id: 74,
    q: "How long is a Presidential term?",
    correct: "Four years",
    options: ["Four years", "Two years", "Five years", "Six years"],
    category: QuestionCategory.Government
  },
  {
    id: 75,
    q: "When is a new President inaugurated?",
    correct: "January",
    options: ["January", "February", "March", "December"],
    category: QuestionCategory.Government
  },
  {
    id: 76,
    q: "What did the Federalist Papers support?",
    correct: "Passage of the Constitution",
    options: ["Passage of the Constitution", "The Declaration of Independence", "The Articles of Confederation", "The Bill of Rights"],
    category: QuestionCategory.Founding
  },
  {
    id: 77,
    q: "What did the Articles of Confederation do?",
    correct: "Set up the first government",
    options: ["Set up the first government", "Declared independence from Britain", "Created the office of President", "Established the Supreme Court"],
    category: QuestionCategory.Founding
  },
  {
    id: 78,
    q: "What is one weakness of the Articles of Confederation?",
    correct: "Congress couldn't enforce laws or tax",
    options: ["Congress couldn't enforce laws or tax", "The President had too much power", "The Supreme Court overruled Congress too often", "States had too little autonomy"],
    category: QuestionCategory.Founding
  },
  {
    id: 79,
    q: "What year did delegates sign the Constitution?",
    correct: "1787",
    options: ["1787", "1776", "1791", "1789"],
    category: QuestionCategory.Founding
  },
  {
    id: 80,
    q: "What is naturalization?",
    correct: "Becoming a U.S. citizen",
    options: ["Becoming a U.S. citizen", "Gaining permanent resident status", "Applying for a work visa", "Registering as a legal immigrant"],
    category: QuestionCategory.Civics
  },
  {
    id: 81,
    q: "What is one responsibility of citizens?",
    correct: "Vote or serve on jury",
    options: ["Vote or serve on jury", "Pay taxes (citizens only)", "Follow all federal laws", "Register for Selective Service"],
    category: QuestionCategory.Civics
  },
  {
    id: 82,
    q: "Name one right exclusive to U.S. citizens.",
    correct: "Vote or run for federal office",
    options: ["Vote or run for federal office", "Work in the private sector", "Own property anywhere in the U.S.", "Travel internationally with a U.S. passport"],
    category: QuestionCategory.Civics
  },
  {
    id: 83,
    q: "How old must you be to vote for President?",
    correct: "18 years old",
    options: ["18 years old", "16 years old", "21 years old", "25 years old"],
    category: QuestionCategory.Civics
  },
  {
    id: 84,
    q: "How can Americans participate in democracy?",
    correct: "Vote, serve on jury, or petition",
    options: ["Vote, serve on jury, or petition", "Pay taxes and follow laws", "Donate to political campaigns", "Attend public school"],
    category: QuestionCategory.Civics
  },
  {
    id: 85,
    q: "What is the 'Pledge of Allegiance'?",
    correct: "Oath of loyalty to the U.S.",
    options: ["Oath of loyalty to the U.S.", "The official military oath", "The Presidential oath of office", "The naturalization oath"],
    category: QuestionCategory.Civics
  },
  {
    id: 86,
    q: "Who must follow the Constitution?",
    correct: "Everyone including government",
    options: ["Everyone including government", "Only elected officials", "Only federal courts", "Only U.S. citizens"],
    category: QuestionCategory.Government
  },
  {
    id: 87,
    q: "Can the Constitution be changed?",
    correct: "Yes, through the amendment process",
    options: ["Yes, through the amendment process", "Only with unanimous approval of all states", "Only by the Supreme Court", "No, it is permanent"],
    category: QuestionCategory.Government
  },
  {
    id: 88,
    q: "Who has power to declare war?",
    correct: "Congress",
    options: ["Congress", "The President", "The Secretary of Defense", "The National Security Council"],
    category: QuestionCategory.Government
  },
  {
    id: 89,
    q: "What is the highest law in America?",
    correct: "The Constitution",
    options: ["The Constitution", "Acts of Congress", "Presidential executive orders", "Supreme Court decisions"],
    category: QuestionCategory.Government
  },
  {
    id: 90,
    q: "What does the Constitution protect?",
    correct: "Rights of Americans",
    options: ["Rights of Americans", "Powers of the federal government", "National security interests", "Authority of state governments"],
    category: QuestionCategory.Government
  },
  {
    id: 91,
    q: "Name one thing Benjamin Franklin is famous for.",
    correct: "U.S. diplomat and scientist",
    options: ["U.S. diplomat and scientist", "First U.S. President", "Sole author of the Constitution", "Commander of the Continental Army"],
    category: QuestionCategory.Founding
  },
  {
    id: 92,
    q: "What is one thing George Washington did?",
    correct: "First President and military leader",
    options: ["First President and military leader", "Wrote the Declaration of Independence", "Wrote the Emancipation Proclamation", "Established the Supreme Court single-handedly"],
    category: QuestionCategory.Founding
  },
  {
    id: 93,
    q: "What territory did the U.S. buy from France in 1803?",
    correct: "Louisiana Territory",
    options: ["Louisiana Territory", "Texas", "Florida", "Alaska"],
    category: QuestionCategory.HistoryRights
  },
  {
    id: 94,
    q: "What was Martin Luther King Jr. known for?",
    correct: "Civil Rights Movement leadership",
    options: ["Civil Rights Movement leadership", "Writing the Civil Rights Act of 1964", "Serving as a U.S. Senator", "Founding the NAACP"],
    category: QuestionCategory.HistoryRights
  },
  {
    id: 95,
    q: "How many original states were there?",
    correct: "13",
    options: ["13", "12", "15", "16"],
    category: QuestionCategory.Founding
  },
  {
    id: 96,
    q: "What is democracy?",
    correct: "Government by the people",
    options: ["Government by the people", "Rule by elected representatives with unchecked power", "A constitutional monarchy with elected parliament", "Majority rule without individual rights"],
    category: QuestionCategory.Civics
  },
  {
    id: 97,
    q: "Why do we have amendments?",
    correct: "To update and change the Constitution",
    options: ["To update and change the Constitution", "To create new criminal laws", "To override Supreme Court rulings", "To adjust federal tax rates"],
    category: QuestionCategory.Government
  },
  {
    id: 98,
    q: "What are civil rights?",
    correct: "Rights guaranteed by government to protect individuals",
    options: ["Rights guaranteed by government to protect individuals", "Rights earned through military service", "Rights that apply only in criminal proceedings", "Rights that states may grant or revoke"],
    category: QuestionCategory.HistoryRights
  },
  {
    id: 99,
    q: "What is freedom of speech?",
    correct: "The right to express your opinions without government censorship",
    options: ["The right to express your opinions without government censorship", "The unlimited right to say anything with no legal consequences", "The right to make any claim without being held liable", "The right to speak without registering with authorities"],
    category: QuestionCategory.HistoryRights
  },
  {
    id: 100,
    q: "The Declaration of Independence was primarily written by whom?",
    correct: "Thomas Jefferson",
    options: ["Thomas Jefferson", "John Adams", "Benjamin Franklin", "George Washington"],
    category: QuestionCategory.Founding
  }
]

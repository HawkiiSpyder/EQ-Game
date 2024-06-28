// File: data/questions.js
export const questions = [
  {
    question: "Your friend seems upset. What's the best response?",
    emotion: "Concern and empathy",
    options: [
      { text: "Ignore it, they'll get over it", correct: false, category: "Social Skills" },
      { text: "Ask if they want to talk about it", correct: true, category: "Empathy" },
      { text: "Tell them to cheer up", correct: false, category: "Empathy" },
    ],
    lesson: "Empathy is crucial in supporting friends. Offering a listening ear shows you care and helps strengthen relationships.",
    golemanInsight: "Empathy is the fundamental people skill; the ability to read emotions in others affects many aspects of life, from sales and management to romance and parenting.",
  },
  {
    question: "You receive criticism at work. How do you react?",
    emotion: "Disappointment and frustration",
    options: [
      { text: "Get defensive and argue", correct: false, category: "Self-Regulation" },
      { text: "Ignore the feedback", correct: false, category: "Self-Awareness" },
      { text: "Listen and ask for specific examples", correct: true, category: "Self-Awareness" },
    ],
    lesson: "Constructive criticism is an opportunity for growth. Responding with openness and a willingness to improve demonstrates emotional intelligence.",
    golemanInsight: "If your emotional abilities aren't in hand, if you don't have self-awareness, if you are not able to manage your distressing emotions, if you can't have empathy and have effective relationships, then no matter how smart you are, you are not going to get very far.",
  },
  {
    question: "A colleague takes credit for your work. What's the most constructive approach?",
    emotion: "Anger and frustration",
    options: [
      { text: "Confront them aggressively", correct: false, category: "Self-Regulation" },
      { text: "Discuss it privately with them", correct: true, category: "Social Skills" },
      { text: "Complain to other colleagues", correct: false, category: "Self-Regulation" },
    ],
    lesson: "Handling workplace conflicts professionally is key to maintaining good relationships and a positive environment.",
    golemanInsight: "The ability to manage your own and others' emotions, to pick up on emotional cues, and to interact smoothly is at the heart of social intelligence.",
  },
  {
    question: "You notice a new team member struggling with their tasks. What's your response?",
    emotion: "Concern and support",
    options: [
      { text: "Ignore it, they need to figure it out on their own", correct: false, category: "Empathy" },
      { text: "Offer to help them and share your knowledge", correct: true, category: "Social Skills" },
      { text: "Tell them they should work harder", correct: false, category: "Self-Regulation" },
    ],
    lesson: "Supporting colleagues fosters a collaborative and productive work environment.",
    golemanInsight: "Building rapport and trust with colleagues by offering support is a cornerstone of effective teamwork.",
  },
  {
    question: "During a heated meeting, you feel yourself getting very angry. What do you do?",
    emotion: "Anger and frustration",
    options: [
      { text: "Yell to make your point", correct: false, category: "Self-Regulation" },
      { text: "Take a deep breath and calmly express your viewpoint", correct: true, category: "Self-Regulation" },
      { text: "Leave the meeting abruptly", correct: false, category: "Self-Awareness" },
    ],
    lesson: "Managing your emotions in high-stress situations demonstrates strong self-regulation.",
    golemanInsight: "The ability to stay calm under pressure is crucial for effective leadership and decision-making.",
  },
  {
    question: "Your project deadline is approaching, and a team member is missing. What's the best approach?",
    emotion: "Stress and urgency",
    options: [
      { text: "Finish their tasks without informing them", correct: false, category: "Social Skills" },
      { text: "Communicate with them to understand their situation", correct: true, category: "Social Skills" },
      { text: "Complain to your supervisor immediately", correct: false, category: "Self-Regulation" },
    ],
    lesson: "Effective communication is key to resolving team issues and meeting deadlines.",
    golemanInsight: "Clear communication and understanding of team dynamics are vital for project success.",
  },
];

export const emotionalIntelligenceComponents = [
  {
    name: "Self-Awareness",
    description: "The ability to recognize and understand your own emotions, strengths, weaknesses, values, and motivations.",
    tip: "Practice mindfulness and regularly reflect on your emotional reactions to situations.",
  },
  {
    name: "Self-Regulation",
    description: "The ability to control or redirect disruptive emotions and impulses, and adapt to changing circumstances.",
    tip: "When feeling strong emotions, pause and count to ten before responding.",
  },
  {
    name: "Motivation",
    description: "The drive to achieve beyond expectations, essentially for the sake of achievement itself.",
    tip: "Set clear, challenging but achievable goals for yourself and track your progress.",
  },
  {
    name: "Empathy",
    description: "The ability to understand the emotional makeup of other people and skill in treating people according to their emotional reactions.",
    tip: "Practice active listening and try to put yourself in others' shoes.",
  },
  {
    name: "Social Skills",
    description: "Proficiency in managing relationships and building networks, and ability to find common ground and build rapport.",
    tip: "Work on your communication skills and practice networking in both professional and personal settings.",
  },
  {
    name: "Adaptability",
    description: "The ability to adjust to new conditions and effectively handle change.",
    tip: "Embrace change as an opportunity to grow and learn new skills.",
  },
  {
    name: "Stress Management",
    description: "The ability to manage stress in a healthy way to maintain well-being and performance.",
    tip: "Incorporate relaxation techniques such as deep breathing, meditation, or physical exercise into your routine.",
  },
];

export const golemanQuotes = [
  "The range of what we think and do is limited by what we fail to notice. And because we fail to notice that we fail to notice, there is little we can do to change; until we notice how failing to notice shapes our thoughts and deeds.",
  "If your emotional abilities aren't in hand, if you don't have self-awareness, if you are not able to manage your distressing emotions, if you can't have empathy and have effective relationships, then no matter how smart you are, you are not going to get very far.",
  "We need to rethink our view of intelligence in terms of its emotional, social and practical dimensions.",
  "The emotions are important. Emotional intelligence has a value that's being increasingly recognized in organizations.",
  "People with well-developed emotional skills are also more likely to be content and effective in their lives, mastering the habits of mind that foster their own productivity.",
  "Emotional intelligence is the ability to sense, understand, and effectively apply the power of emotions to inspire higher levels of productivity and creativity.",
  "The key to achieving a high level of success is emotional intelligence. When EQ skills are developed, they can help you build stronger relationships, succeed at work, and achieve your career and personal goals.",
  "Emotional intelligence isn't just about being nice. It's about managing emotions to achieve positive outcomes and being aware of how emotions drive behavior and impact others.",
];

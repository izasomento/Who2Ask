/**
 * Letters for Minerva Questionnaire Data
 * Each question has a unique ID, text, and an array of options.
 * Each option has a text value and a score impact.
 */
const questions = [
  {
    id: 1,
    text: "Who is this person?",
    type: "choice",
    options: [
      { text: "Teacher", score: 0 },
      { text: "Counselor", score: 0 },
      { text: "Mentor / Supervisor", score: 0 },
      { text: "Other", score: 0 }
    ],
    context: true // Used for personalization but doesn't affect score
  },
  {
    id: 2,
    text: "How well do they know you?",
    type: "choice",
    options: [
      { text: "Very well", score: 3 },
      { text: "Somewhat well", score: 1 },
      { text: "Not very well", score: 0 }
    ]
  },
  {
    id: 3,
    text: "In what context do they know you?",
    type: "choice",
    options: [
      { text: "Academic performance", score: 1 },
      { text: "Extracurricular / Community", score: 1 },
      { text: "Work / Internship", score: 1 },
      { text: "Multiple contexts", score: 2 },
      { text: "Not sure / limited context", score: 0 }
    ]
  },
  {
    id: 4,
    text: "Have they seen your effort or growth over time?",
    type: "choice",
    options: [
      { text: "Yes, over a long period", score: 2 },
      { text: "Somewhat", score: 1 },
      { text: "No, it was a brief interaction", score: 0 }
    ]
  },
  {
    id: 5,
    text: "Can they speak specifically about your strengths?",
    type: "choice",
    options: [
      { text: "Yes, they can provide specific examples", score: 3 },
      { text: "Maybe, but they might need reminding", score: 1 },
      { text: "No, they only know my basic info", score: 0 }
    ]
  },
  {
    id: 6,
    text: "Have you interacted with them recently?",
    type: "choice",
    options: [
      { text: "Yes, currently or within the last year", score: 1 },
      { text: "Somewhat, 1-2 years ago", score: 0 },
      { text: "No, it's been several years", score: -1 }
    ]
  },
  {
    id: 7,
    text: "Do they seem supportive and likely to write a thoughtful letter?",
    type: "choice",
    options: [
      { text: "Yes, definitely", score: 2 },
      { text: "Unsure", score: 0 },
      { text: "No, they seem too busy or unenthusiastic", score: -3, isRedFlag: true }
    ]
  },
  {
    id: 8,
    text: "How soon is your deadline?",
    type: "choice",
    options: [
      { text: "Urgent (less than 2 weeks)", score: -2 },
      { text: "Soon (about 1 month)", score: 0 },
      { text: "Flexible (2+ months)", score: 1 }
    ]
  }
];

const resultCategories = {
  STRONG: {
    label: "Strong Choice",
    minScore: 10,
    meaning: "Excellent candidate! They have the depth of knowledge to speak to your fit for Minerva effectively.",
    nextSteps: [
      "Ask them as soon as possible!",
      "Send a polite email requesting a meeting to discuss your goals for Minerva.",
      "Explain why you think they are best positioned to speak to your fit for this unique model."
    ],
    checklist: [
      "Updated resume or brag sheet",
      "Brief overview of why you are applying to Minerva",
      "Specific qualities (e.g. self-management, curiosity) you'd like them to highlight",
      "Clear deadline dates and submission instructions"
    ]
  },
  COULD_WORK: {
    label: "Could Work",
    minScore: 5,
    meaning: "This person is a reasonable option who likely wants to support you, but they'll need more context about Minerva's unique application process.",
    nextSteps: [
      "Schedule a conversation to discuss your interest in Minerva and your shared history.",
      "If they agree, provide very specific anecdotes that demonstrate maturity or independence.",
      "Offer to walk them through your 'brag sheet' in person or on a call."
    ],
    checklist: [
      "Detailed brag sheet highlighting accomplishments with Minerva-specific context",
      "A summary of why Minerva is the right fit for your goals",
      "Clear deadline dates"
    ],
    extraGuidance: {
      title: "How to strengthen this relationship before asking",
      steps: [
        "Schedule a brief 15-minute conversation to discuss your academic interests and why you're drawn to Minerva.",
        "Follow up on a specific piece of feedback they gave you to show you are listening and growing.",
        "Prepare a 'memory sheet' with 2-3 specific moments where you learned or showed effort in their context.",
        "Share your 'Why'—explain the deeper motivation behind the global path you are pursuing."
      ]
    }
  },
  NOT_BEST_FIT: {
    label: "Not the Best Fit",
    minScore: -Infinity,
    meaning: "Proceed with caution. This person might not have enough specific, recent context to help you stand out in the Minerva process.",
    nextSteps: [
      "Consider reaching out to other potential recommenders first.",
      "If you have no other options, provide an extremely detailed 'brag sheet' focused on Minerva's values.",
      "Ask them if they feel they can write a *strong* letter, and give them an easy 'out' if they are too busy."
    ],
    checklist: [
      "Comprehensive brag sheet emphasizing maturity, independence, and global mindset",
      "A draft or outline of specific strengths you hope they can connect to your Minerva application",
      "Very clear deadlines (the easier you make it, the better)"
    ],
    extraGuidance: {
      title: "If you don’t have a strong recommender yet",
      steps: [
        "Attend office hours or stay after meetings to ask a thoughtful question about the material or a project.",
        "Be consistent in your effort and presence; reliability is often as important as performance.",
        "Briefly share your goals or interest in Minerva after a session to help them see you as an independent person.",
        "Follow through on suggestions they make—this shows you value their expertise and are coachable.",
        "Remember that strong relationships are built over time through small, consistent interactions."
      ]
    }
  }
};

export enum ExampleType {
  Checkbox = "Checkbox",
  Input = "Input",
  Radio = "Radio",
  Select = "Select",
  Slider = "Slider"
}

export const data = {
  choices: {
    "1": {
      id: "1",
      title: "less than 6 weeks"
    },
    "2": {
      id: "2",
      title: "more than 6 weeks but less than 12 weeks"
    },
    "3": {
      id: "3",
      title: "more than 12 weeks"
    },
    "4": {
      id: "4",
      title: "yes"
    },
    "5": {
      id: "5",
      title: "no"
    },
    "6": {
      id: "6",
      title: "none"
    },
    "7": {
      id: "7",
      title: "mild"
    },
    "8": {
      id: "8",
      title: "moderate"
    },
    "9": {
      id: "9",
      title: "severe"
    },
    "10": {
      id: "10",
      title: "very severe"
    },
    "11": {
      id: "11",
      title: "worst possible"
    },
    "12": {
      id: "12",
      title: "always"
    },
    "13": {
      id: "13",
      title: "daily"
    },
    "14": {
      id: "14",
      title: "weekly"
    },
    "15": {
      id: "15",
      title: "monthly"
    },
    "16": {
      id: "16",
      title: "never"
    },
    "17": {
      id: "17",
      title: "several days"
    },
    "18": {
      id: "18",
      title: "more than half the days"
    },
    "19": {
      id: "19",
      title: "nearly every day"
    },
    "20": {
      id: "20",
      title: "female"
    },
    "21": {
      id: "21",
      title: "male"
    },
    "22": {
      id: "22",
      title: "prefer not to answer"
    },
    "23": {
      id: "23",
      title: "sms"
    },
    "24": {
      id: "24",
      title: "call"
    },
    "25": {
      id: "25",
      title: "email"
    },
    "26": {
      id: "26",
      title:
        "Little or no exercise. Pick this option if you do not currently exercise or you exercise at low intensity (no sweating)"
    },
    "27": {
      id: "27",
      title:
        "Medium amount of exercise. Pick this option if you do LESS than 150 minutes of moderate (or 75 minutes of vigorous) activity per week"
    },
    "28": {
      id: "28",
      title:
        "High amount of exercise. Pick this option if you do MORE than 150 minutes of moderate (or 75 minutes of vigorous) activity per week"
    }
  },
  headers: {
    "1": {
      id: "1",
      title:
        "What amount of knee pain have you experienced in the last week during the following activities?"
    },
    "2": {
      id: "2",
      title:
        "What degree of difficulty you have experienced in the last week due to your knee problem?"
    },
    "3": {
      id: "3",
      title:
        "Everything in this questionnaire will be confidential between you and your Hinge Health coach. No information will be shared with your insurer or employer."
    },
    "4": {
      id: "4",
      title:
        "Over the last 2 weeks, how often have you been bothered by the following problems?"
    }
  },
  questionnaires: {
    "1": {
      id: "1",
      questions: [
        "1",
        "2",
        "3",
        "4",
        "5",
        "6",
        "7",
        "8",
        "9",
        "10",
        "11",
        "12",
        "13",
        "14",
        "15",
        "16",
        "17",
        "18",
        "19",
        "20",
        "21",
        "22",
        "23",
        "24",
        "25",
        "26",
        "27",
        "28",
        "29",
        "30",
        "31",
        "32",
        "33",
        "34",
        "35",
        "36",
        "37",
        "38",
        "39",
        "40",
        "41",
        "42",
        "43",
        "44",
        "45",
        "46",
        "47",
        "48",
        "49",
        "50",
        "51",
        "52",
        "53",
        "54",
        "55",
        "56",
        "57",
        "58",
        "59",
        "60",
        "61"
      ],
      title: "knee"
    }
  },
  questions: {
    "1": {
      choices: ["1", "2", "3"],
      id: "1",
      title: "How long have you been living with knee pain?"
    },
    "2": {
      choices: ["4", "5"],
      id: "2",
      title: "Have you had surgery on your knee within the past 6 months?"
    },
    "3": {
      choices: ["4", "5"],
      id: "3",
      title: "Have you had surgery on your knee within the past 6 months?"
    },
    "4": {
      id: "4",
      subtitle:
        "Including what you think may be causing it, any triggers, how it impacts your daily life, and anything else you think we should know",
      title: "In your own words, please describe your knee pain to us.",
      type: "input"
    },
    "5": {
      choices: ["0", "10"],
      id: "5",
      title: "Over the past 24 hours, how bad was your knee pain?",
      type: "slider"
    },
    "6": {
      choices: ["0", "10"],
      id: "6",
      title: "Over the past 7 days, how bad was your knee pain?",
      type: "slider"
    },
    "7": {
      choices: ["12", "13", "14", "15", "16"],
      id: "7",
      title: "How often do you experience knee pain?"
    },
    "8": {
      choices: ["6", "7", "8", "9", "10", "11"],
      header: "1",
      id: "8",
      title: "Twisting/pivoting on your knee"
    },
    "9": {
      choices: ["6", "7", "8", "9", "10", "11"],
      header: "1",
      id: "9",
      title: "Straightening knee fully"
    },
    "10": {
      choices: ["6", "7", "8", "9", "10", "11"],
      header: "1",
      id: "10",
      title: "Bending knee fully"
    },
    "11": {
      choices: ["6", "7", "8", "9", "10", "11"],
      header: "1",
      id: "11",
      title: "Walking on flat surface"
    },
    "12": {
      choices: ["6", "7", "8", "9", "10", "11"],
      header: "1",
      id: "12",
      title: "Going up or down stairs"
    },
    "13": {
      choices: ["6", "7", "8", "9", "10", "11"],
      header: "1",
      id: "13",
      title: "At night while in bed"
    },
    "14": {
      choices: ["6", "7", "8", "9", "10", "11"],
      header: "1",
      id: "14",
      title: "Sitting or lying"
    },
    "15": {
      choices: ["6", "7", "8", "9", "10", "11"],
      header: "1",
      id: "15",
      title: "Standing upright"
    },
    "16": {
      choices: ["6", "7", "8", "9", "10", "11"],
      header: "2",
      id: "16",
      title: "Rising from bed"
    },
    "17": {
      choices: ["6", "7", "8", "9", "10", "11"],
      header: "2",
      id: "17",
      title: "Putting on socks/stockings"
    },
    "18": {
      choices: ["6", "7", "8", "9", "10", "11"],
      header: "2",
      id: "18",
      title: "Rising from sitting"
    },
    "19": {
      choices: ["6", "7", "8", "9", "10", "11"],
      header: "2",
      id: "19",
      title: "Bending to floor"
    },
    "20": {
      choices: ["6", "7", "8", "9", "10", "11"],
      header: "2",
      id: "20",
      title: "Twisting/pivoting on your injured knee"
    },
    "21": {
      choices: ["6", "7", "8", "9", "10", "11"],
      header: "2",
      id: "21",
      title: "Kneeling"
    },
    "22": {
      choices: ["6", "7", "8", "9", "10", "11"],
      header: "2",
      id: "22",
      title: "Squatting"
    },
    "23": {
      choices: ["4", "5"],
      id: "23",
      title:
        "Has your doctor or physical therapist advised you to avoid any specific exercises or movements?"
    },
    "24": {
      choices: ["1", "100"],
      header: "3",
      id: "24",
      subtitle:
        "Include hours you missed on sick days, times you went in late, left early, etc., because of your knee pain. Do not include time you missed to participate in this program.",
      title:
        "During the past seven days, how many hours did you miss from work because of problems associated with your knee pain?",
      type: "dropdown"
    },
    "25": {
      choices: ["1", "100"],
      header: "3",
      id: "25",
      title:
        "During the past seven days, how many hours did you actually work?",
      type: "dropdown"
    },
    "26": {
      choices: ["6", "7", "8", "9", "10", "11"],
      header: "3",
      id: "26",
      subtitle:
        "Think about days you were limited in the amount or kind of work you could do, days you accomplished less than you would like, or days you could not do your work as carefully as usual.",
      title:
        "During the past seven days, how much did your knee pain affect your productivity while you were working?",
      type: "dropdown"
    },
    "27": {
      choices: ["4ft", "8ft"],
      id: "27",
      title: "height?",
      type: "dropdown"
    },
    "28": {
      choices: ["50", "1000"],
      id: "28",
      title: "weight?",
      type: "dropdown"
    },
    "29": {
      choices: ["0", "100"],
      id: "29",
      title:
        "What do you think are the chances you'll have knee surgery in the next year, in %?",
      type: "slider"
    },
    "30": {
      choices: ["0", "100"],
      id: "30",
      title:
        "What do you think are the chances you'll have knee surgery in the next 5 years, in %?",
      type: "slider"
    },
    "31": {
      choices: ["4", "5"],
      id: "31",
      title:
        "Do you have any upcoming surgeries or procedures scheduled for your knee?"
    },
    "32": {
      choices: ["4", "5"],
      id: "32",
      title: "Do you think you might need knee surgery in the future?"
    },
    "33": {
      choices: ["4", "5"],
      id: "33",
      title:
        "Do you believe that without Hinge Health you currently have the knowledge and tools to manage your knee pain without surgery for at least the next 5 years?"
    },
    "34": {
      choices: ["6", "17", "18", "19"],
      header: "4",
      id: "34",
      title: "Feeling nervous, anxious, or on edge"
    },
    "35": {
      choices: ["6", "17", "18", "19"],
      header: "4",
      id: "35",
      title: "Not being able to stop or control worrying"
    },
    "36": {
      choices: ["6", "17", "18", "19"],
      header: "4",
      id: "36",
      title: "Worrying too much about different things"
    },
    "37": {
      choices: ["6", "17", "18", "19"],
      header: "4",
      id: "37",
      title: "Trouble relaxing"
    },
    "38": {
      choices: ["6", "17", "18", "19"],
      header: "4",
      id: "38",
      title: "Being so restless that it is hard to sit still"
    },
    "39": {
      choices: ["6", "17", "18", "19"],
      header: "4",
      id: "39",
      title: "Becoming easily annoyed or irritable"
    },
    "40": {
      choices: ["6", "17", "18", "19"],
      header: "4",
      id: "40",
      title: "Feeling afraid as if something awful might happen"
    },
    "41": {
      choices: ["6", "17", "18", "19"],
      header: "4",
      id: "41",
      title: "Little interest or pleasure in doing things"
    },
    "42": {
      choices: ["6", "17", "18", "19"],
      header: "4",
      id: "42",
      title: "Feeling down, depressed or hopeless"
    },
    "43": {
      choices: ["6", "17", "18", "19"],
      header: "4",
      id: "43",
      title: "Trouble falling or staying asleep, or sleeping too much"
    },
    "44": {
      choices: ["6", "17", "18", "19"],
      header: "4",
      id: "44",
      title: "Feeling tired or having little energy"
    },
    "45": {
      choices: ["6", "17", "18", "19"],
      header: "4",
      id: "45",
      title: "Poor appetite or overeating"
    },
    "46": {
      choices: ["6", "17", "18", "19"],
      header: "4",
      id: "46",
      title:
        "Feeling bad about yourself - or that you are a failure or have let yourself or your family down"
    },
    "47": {
      choices: ["6", "17", "18", "19"],
      header: "4",
      id: "47",
      title:
        "Trouble concentrating on things, such as reading the newspaper or watching television"
    },
    "48": {
      choices: ["6", "17", "18", "19"],
      header: "4",
      id: "48",
      title:
        "Moving or speaking so slowly that other people could have noticed? Or the opposite - being so fidgety or restless that you have been moving around a lot more than usual"
    },
    "49": {
      choices: ["6", "17", "18", "1"],
      header: "4",
      id: "49",
      title:
        "Thoughts that you would be better off dead or of hurting yourself in some way"
    },
    "50": {
      choices: ["20", "21", "22"],
      id: "50",
      title: "Gender"
    },
    "51": {
      choices: ["26", "27", "28"],
      id: "51",
      title: "How much exercise do you usually get in a typical week?"
    },
    "52": {
      choices: [],
      id: "52",
      title: "Job title",
      type: "Input"
    },
    "53": {
      choices: [],
      id: "53",
      title: "Who are you? What are your hobbies, likes, and dislikes?",
      type: "Input"
    },
    "54": {
      choices: [],
      id: "54",
      title:
        "What are the key reasons for you to make changes with regard to your health now? In other words, why start a program like this now?",
      type: "Input"
    },
    "55": {
      choices: [],
      id: "55",
      title:
        "Take a moment to imagine your life free from knee pain. How would your life be different than it is now? Please describe what would be possible for you.",
      type: "Input"
    },
    "56": {
      choices: [],
      id: "56",
      title:
        "Do you foresee any barriers or challenges that might hold you back from being successful in this program?",
      type: "Input"
    },
    "57": {
      choices: ["23", "24", "25"],
      id: "57",
      title: "How would you prefer your health coach to contact you?",
      type: "checkbox"
    },
    "58": {
      choice: [],
      id: "58",
      title: "address",
      type: "input"
    },
    "59": {
      choice: [],
      id: "59",
      title: "city",
      type: "input"
    },
    "60": {
      choice: [],
      id: "60",
      title: "state",
      type: "dropdown"
    },
    "61": {
      choice: [],
      id: "61",
      title: "zip code",
      type: "input"
    }
  }
};

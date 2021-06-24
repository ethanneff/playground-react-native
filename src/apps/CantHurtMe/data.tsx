interface App {
  goals: Goals;
  users: Users;
}

interface Goals {
  byId: {[id: string]: Goal};
  orderById: string[];
}

interface Users {
  byId: {[id: string]: User};
}

interface User {
  id: string;
  email: string;
  createdAt: number;
}

interface Goal {
  id: string;
  challenge: string;
  task: string;
  mission: string;
}

export const app: App = {
  goals: {
    byId: {
      '17ac2a5c-bbb3-4a5b-b8d9-89c9c883f178': {
        challenge: 'Step Outside Your Comfort Zone',
        id: '17ac2a5c-bbb3-4a5b-b8d9-89c9c883f178',
        mission:
          'Do something that sucks every day, slowly creating a more productive, can-do mentality when encountering stressful situations. This is how you callous your mind.',
        task: 'Write in your journal all of the things you don’t like to do and the things that make you feel uncomfortable. Do one of them every day.',
      },
      '201b9c25-525d-4e9c-a7f3-25343fe07908': {
        challenge: 'Scheduling',
        id: '201b9c25-525d-4e9c-a7f3-25343fe07908',
        mission:
          'Stop wasting time. Maximize your effort in what you do every day without sacrificing sleep.',
        task: '3 Week challenge. Week 1: Take notes on your daily routines and habits. How often are you on your phone or watching TV? How long do you take to eat and commute to work? Week 2: Build a schedule to optimize your time. Use 15–30 minute block intervals. When you work, only focus on one thing at a time. Week 3: Your schedule should be optimized!',
      },
      '20b0d913-3395-49d7-a271-75427c5195f2': {
        challenge: 'Visualize Your Goals',
        id: '20b0d913-3395-49d7-a271-75427c5195f2',
        mission:
          'Accomplish something you previously thought was impossible, and understand why you are pushing yourself towards certain goals.',
        task: 'Choose any challenge, or set a new goal, and visualize achieving it. Imagine what this success will look and feel like. Also, visualize the obstacles you will encounter along the way. Incorporate visualization into your daily encounter with your accountability mirror.',
      },
      '25800acd-4a54-45e9-a25d-b1afc67597ad': {
        challenge: 'Inventory of Excuses',
        id: '25800acd-4a54-45e9-a25d-b1afc67597ad',
        mission: 'This list of excuses will fuel your future success.',
        task: 'Write out a list of what is challenging you today. What problems and limitations do you encounter? What excuses are you making? Don’t hold back. Don’t be nice to yourself.          ',
      },
      '553c1ff9-c2ef-4ef9-9d6f-2c74c432594e': {
        challenge: ' Accountability Mirror',
        id: '553c1ff9-c2ef-4ef9-9d6f-2c74c432594e',
        mission:
          'If you are trying to lose weight, your first Post-It may be to lose two pounds in the first week.Once that goal is achieved, remove the note and post the next goal of two to five pounds until your ultimate goal is realized.',
        task: 'Write all your insecurities, dreams, and goals on Post-Its and put them on the mirror you look at every morning. You will use this accountability mirror to remind yourself of your mission each morning.',
      },
      '5fb41268-b76b-4b19-9f98-1dc933480c57': {
        challenge: 'Taking Souls',
        id: '5fb41268-b76b-4b19-9f98-1dc933480c57',
        mission:
          'Have your doubters watch you achieve something they could have never even done themselves. Have them see how INCREDIBLE you are.',
        task: 'Identify a competitive situation. Who are you competing against? Earn their respect with excellence. Work harder than you’ve ever worked before. Crush their standards. Take their negativity and use it dominate their task with everything you’ve got.',
      },
      'bebed7b8-138b-46b8-b4e6-51ef14fc774d': {
        challenge: 'Remove the Governor',
        id: 'bebed7b8-138b-46b8-b4e6-51ef14fc774d',
        mission:
          'By continually pushing yourself past your perceived limits, you will develop a new inner dialogue and confidence when encountering difficult physical challenges, allowing you to go beyond what you thought was previously possible.',
        task: 'Gradually increase your physical and/or mental exercise sets. You should push yourself slightly past your perceived maximum ability in order to slowly break through your self-imposed ceilings.',
      },
      'f634e684-798a-4191-9596-fa21b98ccb48': {
        challenge: 'After Action Reports',
        id: 'f634e684-798a-4191-9596-fa21b98ccb48',
        mission:
          'Change your mindset about failure. When you fail at something, file an AAR. The AAR will help you dissect what you did right and wrong in order to figure out how you’ll do it properly the next time!',
        task: 'Write out all of your failures. Note everything positive that came from your failures. Describe how you handled your failures. Go back through and make a list of the things you can fix. This is your After Action Report (AAR). Go to your calendar and schedule in time to give it another attempt, ASAP.',
      },
      'f6c5d1e9-2e3c-41a3-811a-385b644f8e10': {
        challenge: 'The Cookie Jar',
        id: 'f6c5d1e9-2e3c-41a3-811a-385b644f8e10',
        mission:
          'The point is to remember what you were once capable of doing and channeling that energy to succeed again!',
        task: 'Write down all of your life obstacles, including minor failures, that you turned into successes. Feel what it was like to overcome those struggles, those opponents, and win. Then get to work!',
      },
      'f78e1fe7-d1d3-4402-8722-b1b37aa5a8bb': {
        challenge: 'Be Uncommon Amongst Uncommon',
        id: 'f78e1fe7-d1d3-4402-8722-b1b37aa5a8bb',
        mission: ' Sustain greatness for a long period of time.',
        task: 'Do whatever you have to do to stand out amongst the people around you. If the people around you are already the cream of the crop, do what you have to do to be #1.',
      },
    },
    orderById: [
      '25800acd-4a54-45e9-a25d-b1afc67597ad',
      '553c1ff9-c2ef-4ef9-9d6f-2c74c432594e',
      '17ac2a5c-bbb3-4a5b-b8d9-89c9c883f178',
      '5fb41268-b76b-4b19-9f98-1dc933480c57',
      '20b0d913-3395-49d7-a271-75427c5195f2',
      'f6c5d1e9-2e3c-41a3-811a-385b644f8e10',
      'bebed7b8-138b-46b8-b4e6-51ef14fc774d',
      '201b9c25-525d-4e9c-a7f3-25343fe07908',
      'f78e1fe7-d1d3-4402-8722-b1b37aa5a8bb',
      'f634e684-798a-4191-9596-fa21b98ccb48',
    ],
  },
  users: {
    byId: {},
  },
};

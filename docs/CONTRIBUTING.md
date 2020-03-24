# Contributing

## Code guidelines

Focus on clean code. [Please watch this video](https://www.youtube.com/watch?v=UjhX2sVf0eg)

1. Focus on readability. The ratio of time spent reading code versus writing is over 10 to 1.
1. Take responsibility. You are responsible for the quality of your code.
1. Use meaningful names. Clean code should read like a well-written prose.
1. Write code that expresses intent. Comments are often lies waiting to happen.
1. Leave the code better than you found it.
1. Use the single responsibility principle. A method does one thing, does it well, does it only.
1. Write tests.
1. Work in short cycles. Incremental and iterative.
1. Use independent architecture. Code should work outside of frameworks.
1. Practice, practice, practice.

## Code reviewing

Focus on improving the system health. [Please read this guide](https://google.github.io/eng-practices/review/reviewer/)

Overall, Reviewers should favor approving a PR once it is in a state where it definitely improves the overall code health of the system being worked on, even if the PR isn’t perfect.

1. The code is well-designed.
1. The functionality is good for the users of the code.
1. Any UI changes are sensible and look good.
1. The code isn’t more complex than it needs to be.
1. The developer isn’t implementing things they might need in the future but don’t know they need now.
1. Code has appropriate unit tests.
1. Tests are well-designed.
1. The developer used clear names for everything.
1. Code is written clearly so comments are not needed.
1. The code conforms to our style guides.

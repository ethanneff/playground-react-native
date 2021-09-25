import React, { memo } from 'react';
import { useRootSelector } from '../../redux';
import { Landing, Main } from './navigation';

export default memo(function Complete() {
  const user = useRootSelector((s) => s.completeUser);
  const App = user ? Main : Landing;
  return <App />;
});

/*

# Data

- user
-> collections [projects, lists]
-> boards [home, work, town] | [meeting notes, book summaries, checklists]
-> lists [backlog, todo, in progress, done] | [draft, final]
-> item [find comb, clear emails, daily standup]

# Screens

## Plan

### Inbox (list -> item -> details)
- "add grey list" -> @app
- "find comb" -> @home
- "clear emails" -> @work
- "put $20 in phone" -> @town
- "drink water" -> @after-waking-up
- "intensity + implement = deep work" -> book summaries

## Organize

### Projects (item -> lists -> item -> details )
- @home -> (backlog, todo, in progress, done xx, done xx)
- @town
- @work
- @gym
- @app

### Lists (item -> list -> item -> detail)
- meeting notes
 - one-on-one
 - daily standup
- book summaries
 - the one thing
 - getting things done
 - eat that frog
- gift ideas
 - mom
 - dad
 - girlfriend
- checklists
 - after waking up
 - after entering bathroom

## Reflect

### Purpose

### Goals

### Review (Progress)

### Reflect (Journal)

## Account

### Profile

### Notifications

### Payment
*/

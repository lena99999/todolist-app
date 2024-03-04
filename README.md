# Todo List App Coding Challenge

## Project setup

- Vue 3 & Ionic with TS, composition api, VueRouter
- build tool: Vite
- http client: axios
- state management: pinia
- VueUse composable collection

## Task

The task involves building a small responsive website with HTML, CSS and JavaScript. Use Vue.js for the implementation. Optionally, you can use the component library Ionic.
If you have any questions about this task, do not hesitate to contact us and ask for clarification.

The app that should be implemented is a simple ToDo application. The initial data of the tasks list should be fetched by the JSON Placeholder API.
You can find the documentation here: http://jsonplaceholder.typicode.com/
At the end of this document, you will find a few mockups for the application. The mockups are just for reference purposes, the final app does not have to look exactly like the draft. Feel free to use different colors, fonts and icons.
The goal is for the final application to fulfill the following list of requirements.

## Requirements

- The user can navigate between two pages: "My Tasks" for all open tasks and "Archive" for finished tasks
- The name of the active page is highlighted in the navigation bar
- When the user scrolls, the navigation bar should still be visible at the top of the page
- A dummy username is displayed at the top-right corner of the application. On small devices (width <640px), the username should be shortened to initials

### My tasks page

- Adding a task
- The headline above the task items contains the number of visible open tasks
- The user can type in a search value which filters the list of open tasks
- The user sees all open tasks in cards
- Instead of an empty tasks list, the text "No tasks available" appears when all tasks are done
- When a user activates a checkbox, the task should immediately be removed from the open
  tasks list and should be visible on the Archive page when the user navigates there
- The list of open tasks is initialized by the JSON Placeholder API’s "/todo" endpoint for a
  single user

### Archive page

- The headline above the task items contains the number of visible completed tasks
- The same search functionality should be provided as in the first page
- The user sees all finished tasks in cards with the same layout as in the first page
- When a user deselects a checkbox, the task should immediately be removed from the
  closed tasks list and should be visible on the first page when the user navigates there
- The list of closed tasks is initialized by the JSON Placeholder API’s "/todo" endpoint for a
  single user

### Mobile behaviour

On small devices (width <640px), all inputs, buttons and task-cards should be stretched to full width while respecting page boundaries.

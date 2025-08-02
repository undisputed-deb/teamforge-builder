# Web Development Project 7 - *Crewmate Creator*

Submitted by: **Debashrestha Nandi**

This web app: **An Among Us-themed Crewmate Creator that allows users to build and manage their own space crew with customizable attributes, categories, and advanced analytics.**

Time spent: **27** hours spent in total

## Required Features

The following **required** functionality is completed:

- [x] **The web app contains a page that features a create form to add a new crewmate**
  - Users can name the crewmate
  - Users can set the crewmate's attributes by clicking on one of several values
- [x] **The web app includes a summary page of all the user's added crewmates**
  - The web app contains a summary page dedicated to displaying all the crewmates the user has made so far
  - The summary page is sorted by creation date such that the most recently created crewmates appear at the top
- [x] **A previously created crewmate can be updated from the list of crewmates in the summary page**
  - Each crewmate has an edit button that will take users to an update form for the relevant crewmate
  - Users can see the current attributes of their crewmate on the update form
  - After editing the crewmate's attribute values using the form, the user can immediately see those changes reflected in the update form and on the summary page 
- [x] **A previously created crewmate can be deleted from the crewmate list**
  - Using the edit form detailed in the previous _crewmates can be updated_ feature, there is a button that allows users to delete that crewmate
  - After deleting a crewmate, the crewmate should no longer be visible in the summary page
- [x] **Each crewmate has a direct, unique URL link to an info page about them**
  - Clicking on a crewmate in the summary page navigates to a detail page for that crewmate
  - The detail page contains extra information about the crewmate not included in the summary page
  - Users can navigate to the edit form from the detail page

The following **optional** features are implemented:

- [x] A crewmate can be given a category upon creation which restricts their attribute value options
  - e.g., Engineers can only have certain colors and speed ranges
  - User can choose a `category` option to describe their crewmate before any attributes are specified
  - Based on the category value, users are allowed to access only a subset of the possible attributes
- [x] A section of the summary page displays summary statistics about a user's crew on their crew page
  - Shows total crewmates, average speed, most popular color, and category distribution
- [x] The summary page displays a custom "success" metric about a user's crew which changes the look of the crewmate list
  - Success score based on speed, engineer count, total crewmates, and impostor penalties
  - Different crew levels: Rookie, Capable, Elite, and Legendary

The following **additional** features are implemented:

* [x] Beautiful Among Us space theme with animated crewmates and cosmic gradients
* [x] Category-based role descriptions and specialized abilities
* [x] Advanced crew analytics with mission statistics
* [x] Responsive design with hover effects and animations
* [x] Real-time form validation and preview
* [x] Toast notifications for user feedback
* [x] Comprehensive navigation with breadcrumbs

## Video Walkthrough

Here's a walkthrough of implemented user stories:

<img src='http://i.imgur.com/link/to/your/gif/file.gif' title='Video Walkthrough' width='' alt='Video Walkthrough' />

## Notes

Built a comprehensive Crewmate Creator with all required and stretch features. The app uses Supabase for data persistence and features a beautiful space-themed design with smooth animations. The category system provides balanced gameplay mechanics while the analytics dashboard gives users meaningful insights into their crew composition and success metrics.

## License

    Copyright 2024 Debashrestha Nandi

    Licensed under the Apache License, Version 2.0 (the "License");
    you may not use this file except in compliance with the License.
    You may obtain a copy of the License at

        http://www.apache.org/licenses/LICENSE-2.0

    Unless required by applicable law or agreed to in writing, software
    distributed under the License is distributed on an "AS IS" BASIS,
    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
    See the License for the specific language governing permissions and
    limitations under the License.
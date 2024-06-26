TODO:
FieldHome.jsx
    [] Add color border (green, yellow, blue, red) based on current status
        - Requires new status field be added to the property model
        - When a record is created or modified, the property status needs to be changed too
        - Add field to test data on Postman

FieldOptions.jsx
    [] Resume services dropdown fetches and displays all services with the following parameters:
        - For the specific property
        - Created by the employee/user
        - Status of "In-progress"
    [] Add confirmation popup when "Replenished" or "Addressed" buttons are clicked.

FieldCleaning.jsx
    [] If "Yes" radio is selected for items missing or damages, turn the box red instead of green.
    [] Add PhotoUpload component

FieldInventory.jsx
    [] Add PhotoUpload component
    [] Create logic for cancel button.
    [] Create logic for submit button.
        - Needs to change status to "Completed"
        - Logic for submissionTime
        - Needs to include checklistData, 


PhotoUpload.jsx
    [] Create component to be used by other components
        Add functionality to uploading photos:
        - Take photo launches camera
        - Upload photo allows user to select images from gallery
        - Allows multiple (limit 10) images to be uploaded

AdminDashboard.jsx
    [] Allow admin to delete records.


Authentication/Authorization - implement on backend and frontend using Passport.js


Problems:
    - Recording billableHours data, which list(s) require this field? Should this be input manually? Should there be a service for tasks requiring billableHours?
    - For the inventory options, does "Delivered" need to be part of the selection series?
    - A report or record needs to be created for billable items and hours for each property.
    - Is it redundant for the record model to have date, startTime, and submissionTime?
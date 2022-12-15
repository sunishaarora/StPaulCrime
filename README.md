# St. Paul Crime Incidents Web App
<!-- A Restful API working with St.Paul Crime Data -->

The app uses the public dataset from [St. Paul Crime Incident Report](https://information.stpaul.gov/datasets/stpaul::crime-incident-report/about). The app requests incidents data from our RESTful server, dynamically displays crime data with location markers on an interactive map ([Leaflet API](https://leafletjs.com/) and [Nominatim API](https://nominatim.org/release-docs/develop/api/Overview/)), allows users to filter through the incidents data based on incident types, neighborhood names, start time and end time of the day, or within a specifc date range, and let users submit new incident. 

This full stack web app uses Node.js, Express.js, and sqlite3 for building the backend server and Vue.js framework to build the frontend UI/UX. The Vue.js frontend app is built in a different Github repository [StPaulCrimeVue](https://github.com/AashishBharath/StPaulCrimeVue) and is brought over to this project after running `npm run build` command. The project were completed in four weeks. The first two weeks were to build the RESTful server and API endpoints, and the last two weeks were to build the frontend of the app. 

To run the app locally: 
- Make sure you have Node.js and the npm command-line interface installed
- In your terminal, clone the repository to your desired directory `git clone https://github.com/AashishBharath/StPaulCrimeData.git`
- Move into project directory `cd StPaulCrimeData`
- `npm install`
- `node server.js`
- Visit the app at http://localhost:8000

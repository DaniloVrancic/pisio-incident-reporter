# Incident Reporter System

A full-stack web application for **anonymous incident reporting** and **moderation**.  
Built with **Spring Boot (Java)**, **Angular**, and **MySQL**, this project demonstrates microservice architecture, authentication, NLP, and geolocation features — all while keeping things smooth for both users and moderators.

---

## ✨ Features

### User Side

- Report incidents **anonymously**:
  - Pick a location on the map.
  - Choose an **incident type** and a **subtype**.
  - Add an optional description and relevant image.
- Browse approved incidents on a map with filters:
  - By type/subtype.
  - By date (last 24h, 7 days, 31 days, or all time).
  - By location.
  - By range from selection marker.

### Moderator Side

- Review **pending incidents** before they go public.
- Approve or permanently reject reports.
- Option to manage incidents with or without a map interface.

- User authentication via:
  - Local database login, or
  - University domain accounts (`*.etf.unibl.org`) with **OAuth2**.
- Microservices for:
  - Reporting & visualization of incident stats.
  - Detecting clusters of frequent incidents.
  - NLP service to group similar text reports.

---

## Tech Stack

- **Backend:** Spring Boot (Java 17), Spring Security, Spring Data JPA  
- **Frontend:** Angular (Material Design, Google Maps API)  
- **Database:** MySQL  
- **Other tools:** OAuth2, NLP (Stanford CoreNLP), REST API  

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18+) and npm
- [Angular CLI](https://angular.io/cli)
- [Java JDK 17+](https://www.oracle.com/java/technologies/javase/jdk17-archive-downloads.html)
- [Maven](https://maven.apache.org/)
- [MySQL Server](https://dev.mysql.com/downloads/)

---

# Installation:

### Database Installation

You have two options to set up the database:

### Option 1: Using the `.mwb` MySQL Workbench model

1. Open the `incident_reporter.mwb` file in MySQL Workbench.
2. Use **Forward Engineer**:
   - Go to `Database → Forward Engineer`.
   - Follow the wizard to generate and execute the schema in your MySQL server.
3. Verify that all tables and relationships have been created successfully.

### Option 2: Using the provided `dll.sql` file

1. Open MySQL Workbench or any MySQL client.
2. Run the SQL script:

   ```sql
   SOURCE ./database/dll.sql;
   ```

3. Confirm that the database incident_reporter and all tables are created.

    Make sure the credentials match those in application.properties (backend configuration).

---

## Backend Setup (Spring Boot REST API)

This section guides you through installing Java, Maven, configuring the backend, and running the Spring Boot REST API.

---

### Step 1: Install Java (JDK 17+)

1. Download and install **Java 17** or higher from [Oracle](https://www.oracle.com/java/technologies/javase/jdk17-archive-downloads.html).
2. Verify the installation in your terminal or command prompt:

```bash
java -version
javac -version
```

_You should see the installed Java version listed._

---

### Step 2: Install Maven

1. Install Maven: [Apache Maven](https://maven.apache.org/)
2. Verify:

```bash
mvn -version
```

---

### Step 3: Configure Spring Boot

- Open `incident-reporter-backend-app/src/main/resources/application.properties.`
- Set your MySQL credentials:

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/incident_reporter
spring.datasource.username={your_database_username}
spring.datasource.password={your_database_password}
spring.jpa.hibernate.ddl-auto=update
```

---

### Step 4: Build and Run the Backend

Option 1: Using Maven

```bash
cd incident-reporter-backend-app
mvn clean install
mvn spring-boot:run
```

Option 2: Using the Packaged JAR

```bash
cd incident-reporter-backend-app/target
java -jar incident-reporter-backend-app-0.0.1-SNAPSHOT.jar
```

_The REST API will start (by default) at: <http://localhost:8443>_

## Frontend Setup (Angular)

This section explains how to install dependencies, run the Angular frontend, and connect it to the backend.

---

### Step 1: Install Node.js and Angular CLI

1. Download and install [Node.js](https://nodejs.org/) (v18+ recommended).
2. Verify Node.js and npm:

```bash
node -v
npm -v
```

3. Install Angular CLI globally:

```bash
npm install -g @angular/cli
```

### Step 2: Install Project Dependencies

1. Navigate to the frontend project directory:

```bash
cd incident-reporter-frontend-app
```

2. Install all dependencies:

```bash
npm install
```

### Step 3: Configure Backend API Endpoint

Ensure the backend REST API is running at http://localhost:8443
.

Update environment file if needed (src/environments/environment.ts):

```typescript
export const environment = {
    apiPort: '8443',
    apiBaseUrl: 'http://localhost:8443',
    incidentUrl: 'http://localhost:8443' + '/incident',
    incidentSubtypeUrl: 'http://localhost:8443' + '/incident_subtype',
    incidentTypeUrl: 'http://localhost:8443' + '/incident_type',
    analysisUrl: 'http://localhost:8443' + '/analysis',
    statisticsUrl: 'http://localhost:8443' + '/statistics',
    nlpUrl: 'http://localhost:8443' + '/nlp'
}
```

### Step 4: Run the Frontend

```bash
ng serve
```

---

### 📸 Screenshots & GIFs

Below are some screenshots showcasing key features of the application:

#### 🗺️ Admin Map View

- ![Admin Map View](./screenshots/admin-map-view.png)
- _A map interface for administrators to monitor incidents._

#### 🗺️ Incident Detail View

- ![Incident Detail View](./screenshots/admin-incident-detail.png)
- _Shows detailed information about a specific incident selected on the map._

#### 🧠 NLP Analysis Screen

- ![NLP Analysis](./screenshots/nlp-analysis.png)
- _Displays the results of Natural Language Processing (NLP) analysis for reported incidents._

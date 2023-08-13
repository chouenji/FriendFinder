<h1 align="center">
  Friend Finder
</h1>

<p align="center">
  <img width=200px src="https://github.com/chouenji/FriendFinder/assets/28991125/5a08e852-3d2d-4b69-b137-86c7e7419ace" alt="Friend Finder Logo">
</p>


<p align="center">
  <em>Connect with new friends based on mutual interests!</em>
</p>

<p align="center">
  <a href="#introduction">Introduction</a> •
  <a href="#project-overview">Project Overview</a> •
  <a href="#installation">Installation</a> •
  <a href="#running-the-project">Running the Project</a> •
  <a href="#features">Features</a> •
  <a href="#future-additions">Future Additions</a> •
  <a href="#database-configuration">Database Configuration</a> •
  <a href="#contributing">Contributing</a> •
</p>

---

## Introduction

Welcome to the Friend Finder project! This repository contains the source code for a friend-finding application where users can like each other and get matched. The application's core functionality is to facilitate finding new friends based on mutual interests and preferences.

## Project Overview

The Friend Finder project aims to create a user-friendly and efficient platform for making new connections and building meaningful friendships. Users can view other profiles, like or dislike them, and get matched with users who have reciprocated interest.

## Installation

To install the project and its dependencies, follow these steps:

1. Clone the repository to your local machine:

2. Change into the project's directory:

3. Install the dependencies for both the client and server:

## Running the Project

To run the project locally, follow these steps:

1. Start the client and server concurrently:

2. Open your web browser and navigate to `http://localhost:5173` to access the Friend Finder application.

## Features

The current version of the Friend Finder application includes the following features:

- User registration and authentication
- Liking and matching with other users
- Real-time chat
- User Profile Customization Options

![1](https://github.com/chouenji/FriendFinder/assets/28991125/7f83d3ba-3b96-4d16-b270-904799472c7b)
![2](https://github.com/chouenji/FriendFinder/assets/28991125/054c1d69-53f8-4b06-9cf4-12eeae2a377b)
![3](https://github.com/chouenji/FriendFinder/assets/28991125/82fe1237-711a-4fa7-befb-269d5e9c4a77)
![4](https://github.com/chouenji/FriendFinder/assets/28991125/46e8249c-c1fb-4c85-994b-ba8855150de5)
![5](https://github.com/chouenji/FriendFinder/assets/28991125/90eb13ef-a183-4e51-bb10-a79c8455dc8c)


  
  
## Future Additions

In the future, I plan to add the following exciting features:

- Enhanced User Interface and Design
- Advanced Filters for searching and matching users based on preferences
- Basic user search functionality

## Database Configuration

The Friend Finder application uses a database to store user information and match data. To configure your own database settings, please follow these steps:

1. Install [Prisma](https://www.prisma.io/) in the server's folder:

2. Navigate to the `server` directory and configure your database in the `.env` file. Replace the placeholders with your actual database connection URL and credentials:

3. Set up the database and generate the Prisma client:

4. Optionally, you can use Prisma Studio to explore your database:

## Contributing

Contributions to the Friend Finder project are welcome! If you have any ideas, bug fixes, or feature requests, please create a pull request. For major changes, please open an issue first to discuss your proposal.

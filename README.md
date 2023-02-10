<p align="center">
  <img src="https://avatars2.githubusercontent.com/u/45050444?v=4" width="100" />
  <h1 align="center">TimeAway - A Leave Management Application</h1>
</p>

_This project was created as part of a bachelor degree program **Web application development using the RedwoodJS framework** at the Faculty of Electrical Engineering, Banja Luka, B&H. The goal of TimeAway is to provide an easy-to-use solution for leave management in companies, streamlining the process for both employees and managers._

TimeAway is a modern and user-friendly application designed to help companies manage employee leave requests and absences. Built using [RedwoodJS](https://redwoodjs.com/), TimeAway provides a simple and intuitive interface for employees, managers, and HR teams.


## Features

- Personalized calendar view for every employee
- Team view to see all team members' absences
- Ability to request leaves with different absence reasons
- Approval/rejection of leave requests by managers or HR
- Automated notifications for leave requests and approvals/rejections
- Easy tracking of leave balance for every employee
- Managing company wide schedule, public holidays...


<table>
  <tr>
    <td valign="top"><img src="https://user-images.githubusercontent.com/45545657/218160491-7520027c-eecf-4389-ad62-fe48a3103e50.png" height="250" /></td>
    <td valign="top"><img src="https://user-images.githubusercontent.com/45545657/218161275-f1d43d1d-99d1-42ab-98f7-93a3dab561d9.png" height="250" /></td>
  </tr>
</table>

## Getting started

1. Clone this repository 
`git clone https://github.com/rahmo-hus/Time-Away.git`

2. Change into the TimeAway directory `cd Time-Away`
3. Run `docker-compose up`
4. Install required dependencies `yarn install`
5. Start the development server `yarn redwood dev`
6. Open your browser and navigate to [http://localhost:8910](http://localhost:8910)

## Technologies

Redwood applications are obsessed with developer experience and eliminating as much boilerplate as
possible. Where existing libraries elegantly solve our problems, we use them;
where they don't, we write our own solutions. The end result is a JavaScript
development experience you can fall in love with!

Here's a quick taste of the technologies our application uses:

- [React](https://reactjs.org/)
- [GraphQL](https://graphql.org/) ([GraphQL Yoga](https://www.graphql-yoga.com) + [Envelop](https://www.envelop.dev) + [Apollo Client](https://www.apollographql.com/docs/react))
- [Prisma](https://www.prisma.io/)
- [Jest](https://jestjs.io/)
- [Storybook](https://storybook.js.org/)
- [Babel](https://babeljs.io/)
- [Webpack](https://webpack.js.org/)


## How it works

TimeAway application is split into two parts: a frontend and a backend. This is
represented as two JS/TS projects within a single monorepo. We use
[Yarn](https://yarnpkg.com/) to make it easy to operate across both projects
while keeping them in a single Git repository.

The frontend project is called `web` and the backend project is called `api`.
For clarity, we will refer to these in prose as "sides", i.e. the "web side" and
the "api side". They are separate projects because code on the web side will end
up running in the user's browser while code on the api side will run on a server
somewhere. It is important that you keep this distinction clear in your mind as
you develop your application. The two separate projects are intended to make
this obvious. In addition, separate projects allow for different dependencies
and build processes for each project.

The api side is an implementation of a GraphQL API. Your business logic is
organized into "services" that represent their own internal API and can be
called both from external GraphQL requests and other internal services. Redwood
can automatically connect your internal services with Apollo, reducing the
amount of boilerplate you have to write. Your services can interact with a
database via Prisma's ORM, and Prisma's migration tooling provides first-class
migrations that take the pain out of evolving your database schema.

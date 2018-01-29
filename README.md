# Creciendo juntos

## Project

This project is made with the intention of manage the participants of a diabetic camp, specially children and younger people, to have a control and management of every kid by dividing then in groups and allow to modify when needed

## Stack

The stack used to develop the webapp is the following

### Front

- Angular 5
- Sass
- Progressive web app

### Back

- Firestore

### server / cdn

firebase

## Coding

The code is linted with tslinter, so the most recommended action is to add tslint to the ide that is being used for code

## Initialization

there must exist a file in the directory `src/environments/firestore.ts` in the format:

```ts
const firebase = {
  apiKey: '<api key>',
  authDomain: '<auth firebase domain>',
  databaseURL: '<database firebase url>',
  projectId: '<id of the project>',
  storageBucket: '<bucket where we will store the assets>',
  messagingSenderId: '<message sender id>'
};

export default firebase;

```

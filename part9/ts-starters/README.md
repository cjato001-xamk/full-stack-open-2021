# FSO First Steps with TypeScript

## BMI

Sample CLI input

```
npm run calculateBmi 180 91
```

Sample HTTP GET endpoint

```
http://localhost:3002/bmi?height=180&weight=72
```

## Exercise calculator

Sample CLI input

```
npm run calculateExercises 2 1 0 2 4.5 0 3 1 0 4
```

Note that the _first_ argument is the target value.

Sample HTTP POST request

```
POST http://localhost:3002/exercises
Content-Type: application/json

{
  "daily_exercises": [1, 0, 2, 0, 3, 0, 2.5],
  "target": 2.5
}
```

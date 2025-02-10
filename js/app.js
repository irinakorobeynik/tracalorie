class CalorieTracker{
    constructor() {
        this._calorieLimit = 3000;
        this._totalCalories = 0;
        this._meals = [];
        this._workouts = [];
        this._displayCaloriesTotal();
        this._displayCaloriesLimit();
        this._displayCaloriesConsumed();
        this._displayCaloriesBurned();
        this._displayCaloriesRemaining();
    }
    addMeal(meal) {
        this._meals.push(meal);
        this._totalCalories += meal.carolies;
        this._render();
    }
    
    addWorkout(workout) {
        this._workouts.push(workout);
        this._totalCalories -= workout.carolies;
        this._render();
    }
    
    _displayCaloriesTotal() {
        const totalCaloriesEl = document.getElementById('calories-total');
        totalCaloriesEl.innerText = this._totalCalories;
    }

    _displayCaloriesLimit() {
        const totalCaloriesLimitEl = document.getElementById('calories-limit');
        totalCaloriesLimitEl.innerText = this._calorieLimit;
    }

    _displayCaloriesConsumed() {
        const caloriesConsumed = document.getElementById('calories-consumed');
        const consume = this._meals.reduce((total, meal) => total + meal.carolies, 0);
        caloriesConsumed.innerText = consume;
    }

    
    _displayCaloriesBurned() {
        const caloriesBurned = document.getElementById('calories-burned');
        const burn = this._workouts.reduce((total, workout) => total + workout.carolies, 0);
        caloriesBurned.innerText = burn;
    }

    _displayCaloriesRemaining() {
        const caloriesRemaining = document.getElementById('calories-remaining');
        const remaining = this._calorieLimit - this._totalCalories;
        caloriesRemaining.innerText = remaining;
    }
    

    
    

    _render() {
        this._displayCaloriesTotal();
        this._displayCaloriesConsumed();
        this._displayCaloriesBurned();
        this._displayCaloriesRemaining();

    }
}

class Meal{
    constructor(name, carolies) {
        this.id = Math.random().toString(16).slice(2);
        this.name = name;
        this.carolies = carolies;
    }
}

class Workout{
    constructor(name, carolies) {
        this.id = Math.random().toString(16).slice(2);
        this.name = name;
        this.carolies = carolies;
    }
}

const tracker = new CalorieTracker();
const breakfast = new Meal('Breakfast', 400);
tracker.addMeal(breakfast);
const lunch = new Meal('Lunch', 100);
tracker.addMeal(lunch);
const morningRun = new Workout('Morning Run', 150);
tracker.addWorkout(morningRun);

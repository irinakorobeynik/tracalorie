class CalorieTracker{
    constructor() {
        this._calorieLimit = 2000;
        this._totalCalories = 0;
        this._meals = [];
        this._workouts = [];
        this._displayCaloriesTotal();
        this._displayCaloriesLimit();
        this._displayCaloriesConsumed();
        this._displayCaloriesBurned();
        this._displayCaloriesRemaining();
        this._displayCalorieProgress();
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
        const progressEl = document.getElementById('calorie-progress');
        const caloriesRemaining = document.getElementById('calories-remaining');
        const remaining = this._calorieLimit - this._totalCalories;
        caloriesRemaining.innerText = remaining;
        if (remaining <= 0) {
            caloriesRemaining.parentElement.parentElement.classList.remove('bg-light');
            caloriesRemaining.parentElement.parentElement.classList.add('bg-danger');
            progressEl.classList.remove('bg-success');
            progressEl.classList.add('bg-danger');
        } else {
            caloriesRemaining.parentElement.parentElement.classList.remove('bg-danger');
            caloriesRemaining.parentElement.parentElement.classList.add('bg-light'); 
            progressEl.classList.remove('bg-danger');
            progressEl.classList.add('bg-success');
        }
    }
    

    _displayCalorieProgress() {
        const progressEl = document.getElementById('calorie-progress');
        const percentage = (this._totalCalories / this._calorieLimit) * 100;
        const width = Math.min(percentage, 100);
        progressEl.style.width = `${width}%`;

    }
    

    _render() {
        this._displayCaloriesTotal();
        this._displayCaloriesConsumed();
        this._displayCaloriesBurned();
        this._displayCaloriesRemaining();
        this._displayCalorieProgress();

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

class App {
    constructor() {
        this._tracker = new CalorieTracker();
        document.getElementById('meal-form').addEventListener('submit', this._newItem.bind(this,'meal'));
        document.getElementById('workout-form').addEventListener('submit', this._newItem.bind(this, 'workout'));
    }

    _newItem(type, e) {
        e.preventDefault();
        const name = document.getElementById(`${type}-name`);
        const calories = document.getElementById(`${type}-calories`);

        if (name.value ==='' || calories.value ==='') {
            alert('Please, fill in all fields');
            return;
        }

        if (type === 'meal') {
        const meal = new Meal(name.value, +calories.value);
        this._tracker.addMeal(meal);
        } else {
        const workout = new Workout(name.value, +calories.value);
        this._tracker.addWorkout(workout);
        }
        name.value = '';
        calories.value = '';
        const collapseItem = document.getElementById(`collapse-${type}`);
        const bsCollapse = new bootstrap.Collapse(collapseItem, { togle: true });
    }
        
}

const app = new App();

// Car classs: Represents a class
class Car{
    constructor(make,model,price){
        this.make=make;
        this.model=model;
        this.price=price;
    }
}

//UI class: Handles UI Task
class UI{
    static displayCars(){
        const cars= Store.getCars();
        cars.forEach((Car)=> UI.addCarToList(Car));
    }

    static addCarToList(car){
        const list=document.getElementById('car-list');
        const row=document.createElement('tr');

        row.innerHTML=`
        <td>${car.make}</td>
        <td>${car.model}</td>
        <td>${car.price}</td>
        <td><a href="#" class="btn btn-primary btn-sm delete">X</a></td>
        `;

        list.appendChild(row);

    }
    static deleteCar(el){
        if(el.classList.contains('delete')){
            el.parentElement.parentElement.remove();
        }
    }

    static showAlert(msg, className){
        const div = document.createElement('div');
        div.className=`alert alert-${className}`;
        div.appendChild(document.createTextNode(msg));
        const container=document.getElementsByClassName('container');
        const form=document.getElementById('car-form');
        container[0].insertBefore(div, form);
        //vanish in 3 sec
        setTimeout(() => document.querySelector('.alert').remove(),3000);
    }

    static clrFields(){
        document.getElementById('make').value='';
        document.getElementById('model').value='';
        document.getElementById('price').value='';
    }


}

//Store Class: Handles Storage
class Store{
    static getCars(){
        let carss;
        if(localStorage.getItem('carss') === null){
            carss=[];
        }else{
            carss=JSON.parse(localStorage.getItem('carss')); 
        }
        return carss;

    }
    static addCars(car){
        const cars= Store.getCars();
        cars.push(car);
        localStorage.setItem('cars', JSON.stringify(cars));
    }
    static removeCars(price){
        const cars= Store.getCars();
        cars.forEach((car, index) =>{
            if(car.price === price){
                cars.splice(index,1);
            }
        });
        localStorage.setItem('cars', JSON.stringify(cars));
    }
}

//Event : Display book
document.addEventListener('DOMContentLoaded',UI.displayCars);

//Event : add Book
document.getElementById('car-form').addEventListener('submit', (e)=> {
    //prevent actual submit
    e.preventDefault();


    //get form values
    const make= document.getElementById('make').value;
    const model= document.getElementById('model').value;
    const price= document.getElementById('price').value;

    //validate
    if(make=== '' || model==='' || price===''){
        UI.showAlert('please fill all thr details mf','danger');
    }else{
        //instantite book
    const car = new Car(make,model,price);
    
    //add car to UI
    UI.addCarToList(car);

    //Add car to storage
    Store.addCars(car);

    //show success message
    UI.showAlert('Car added','success');

    //clear fields
    UI.clrFields();  


    }
    
    
    
});

//Event: Remove book

document.getElementById('car-list').addEventListener('click', (e)=> {
    UI.deleteCar(e.target);

    //show success message
    UI.showAlert('Car removed','success');

});
import Route from '@ember/routing/route';

// import RSVP from 'rsvp';
import {Promise, resolve, allSettled, hashSettled, hash} from 'rsvp';

let id = 1;

function customPromise() {
    return new Promise(function (resolve, reject) {
        let num = Math.random();
        if (num > 0.5) {
            resolve(num);
        } else {
            reject(`${num} is less than 0.5`);
        }
    });
}

customPromise()
    .then(function (value) {
        console.log('first then', value);
        return customPromise();
    })
    .then(function (value) {
        var value1 = value * 5;
        console.log('second then', value, value1);
    })
    .catch(function (error) {
        console.log(error);
    })
    . finally(function () {
        console.log('finally');
    })

function customPromise2(id, shouldResolve) {
    return new Promise(function (resolve, reject) {
        return shouldResolve ? resolve(id) : reject(`Rejected ${id}`);
    });
}

hashSettled({
    first : customPromise2(4, true),
    sesond : customPromise2(2, false),
    third : customPromise2(3, true)
}).then(function(result){
    console.log('allPromis Resolved', result);
}).catch(function(reason){
    console.log('allPromis Rejected', reason);
});

function customPromise3(){
    this.age = Promise.resolve(25);
    this.name = Promise.resolve('GGGEEE');
}
customPromise3.prototype = {
    homePlanet: Promise.resolve('Earth')
};

let someCustomPromise3 = new customPromise3();

hashSettled(someCustomPromise3).then(function(result){
    console.log('someCustomPromise3', result)
})




export default Route.extend({
    // beforeModel() {
        
    //         console.log('beforeModel');
    //         return Promise.resolve(100500)
    //         .then(m => { console.log('beforeModel then 1.1', m); return 1.1; })
    //         .then(m => { 
    //             console.log('beforeModel finally 1.2', m); return 1.2;
    //         })
    //         .finally(m => { 
    //                 console.log('beforeModel finally 1.3', m); return 1.3;
                
    //         });
        
       
    // },
    // model() {
    //     setTimeout(function(){
    //     console.log('model');
    //     return Promise.resolve()
    //     .then(m => { console.log('model then 2.1', m); return 2.1; })
    //     .then(m => { console.log('model then 2.2', m); return 2.2; })
    //     .finally(m => { console.log('model finally 2.3', m); return 2.3; });
    //     },5000)
    // },
    // afterModel(m) {
    //     console.log('afterModel');
    //     return Promise.resolve(m)
    //     .then(m => { console.log('afterModel then 3.1', m); return 3.1; })
    //     .then(m => { console.log('afterModel then 3.2', m); return 3.2; })
    //     .finally(m => { console.log('afterModel finally 3.3', m); return 3.3; }); 
    // },
    model() {
        return new Promise(function (resolve) {
            return setTimeout(function () {
                console.log('loading is end');
                resolve(100500);
            }, 1000);
        });
    },
    actions: {
        loading(transition, originRoute) {
            transition.promise.finally(function (){
                console.log('Transition is over', transition);
                console.log('originRoute is over', originRoute);
            });
        },
        // loading() {
        //     //console.log(id, this.get('controller'), this.get('controller.model.id'));
        //     console.log('loading');
        // }
    }
});

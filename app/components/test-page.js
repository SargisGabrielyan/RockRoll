import Component from '@ember/component';
import EmberObject from '@ember/object';
import {A} from "@ember/array"
import { computed } from '@ember/object';
//import Ember from 'ember';
import { observer } from '@ember/object';
import { once } from '@ember/runloop';



const Terran = EmberObject.extend({
    firstname: '',
    lastName: '',
    fullName: computed('firstName', 'lastName', function(){
        return this.get('firstName') + ' ' + this.get('lastName');
    })
})

let someOne = Terran.create({firstName: 'Jim', lastName: 'Raynor'})

console.log(someOne.get('fullName'));



let  someTest =  EmberObject.extend({
    factions: null,
    init() {
        this.set('factions', [
            {name: 'Terran Confederacy', status: 'Defunct'},
            {name: 'Kel-Morian Combine', status: 'Active'},
            {name: 'Umojan Protectorate', status: 'Active'}
        ]);
        return this._super(...arguments)
    },

    factionsExist: computed('factions.[]', function () {
        return this.get('factions.length') > 0;
    }),
    allFactionsAreActive: computed('factions.@each.status', function () {
        return this.get('factions').filterBy('status', 'Active');
    })
});


let testTest = someTest.create();
console.log('log value of foo:', testTest.factionsExist);

console.log(testTest.allFactionsAreActive);


const Terran1 = EmberObject.extend({
    firstName: '',
    lastName: '',
    fullName : computed('firstName', 'lastName', function(){
        return `${this.get('firstName')} ${this.get('lastName')}`;
    }),
    nameIsChanged: observer('firstName', 'lastName', function(self, key){
        console.log(`${key} is changed`);
    })
})
const someObj = {
    limit: 2
};
console.log('filter_0', [2, 3, 4].reject(item => item > 2));

console.log('filter_1', [2, 3, 4].filter(function (item) {return item > this.limit;}, someObj));
let items = [
    {limit: 2},
    {limit: 2},
    {limit: 3}
];
console.log('filter_22', items.rejectBy('limit', 3));


const TerranInfrastructure = EmberObject.extend({
    bases: null,
    scvCounts: computed.mapBy('bases', 'scvCount'),
    maxScvCount: computed.max('scvCounts')
});

let infrastructure = TerranInfrastructure.create({
    bases: [
        {scvCount: 8},
        {scvCount: 22},
        {scvCount: 16}
    ]
});

infrastructure.get('maxScvCount'); // 22
infrastructure.set('bases', []);
infrastructure.get('maxScvCount'); // -Infinity
let re = A([1,50,10]);
console.log('filter_33', infrastructure.get('scvCounts'));
console.log('filter_33.1.1', infrastructure.get('maxScvCount'));
// console.log('filter_33.1', max(re));



let someOne1 = Terran1.create({firstName: 'Jim', lastName: 'Reynor'});
someOne1.set('firstName', 'Tychus');
someOne1.set('lastName', 'Findlay');

const Terrans = EmberObject.extend({
    factions: null,
    init(){
        this.set('factions', [
            EmberObject.create({
                name: 'Terran Confedercy',
                status: 'Active'
            }),
            EmberObject.create({
                name: 'Kel-Morian Combine',
                status: 'Active'
            }),
            EmberObject.create({
                name: 'Umojan Protectorate',
                status: 'Active'
            }),
        ])
        return this._super(...arguments)
    },
    factionStatusChanged: observer('factions.@each.status', function(){
        once(this, 'proceedChanges');
        
        
    }),
    proceedChanges: function(){
        console.log('observer fired')
    }

})

Terrans.create().get('factions').forEach(faction => faction.set('status', 'Defunct'));



const DefaultComponent = EmberObject.extend({
    a: null,
    obs: observer('a', function(){
        console.log('parent obs');
    })
})
const CostomComponent = DefaultComponent.extend({
    b: null,
    obs: observer('b', function(){
        this._super(...arguments)
        console.log('child obs');
    })
})

let dCostom = DefaultComponent.create();
let cCostom = CostomComponent.create();



cCostom.set('b', 'hgjghj');
cCostom.set('b', 'hjkhjk');
dCostom.set('a', 'fghfhg');



export default Component.extend({
    acsses2: " name",
    
    acsses3: someOne.get('fullName'),
    acsses5: testTest.get('factionsExist'),
    
    acsses4: testTest.allFactionsAreActive,
    actions:{
        alertingHello : function(){
            var acss = window.confirm("hello");
            this.set('acsses2',  acss);
            console.log(this.acsses2)         
        }
    }
});



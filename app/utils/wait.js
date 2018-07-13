import { Promise } from 'rsvp';
import { resolve } from 'rsvp';



export default function wait(value, delay) {
    var promise = value.then && typeof value.then === 'function' ?
    value : resolve(value);
    return new Promise(function(resolve) {
        setTimeout(function() {
            promise.then(function(result) {
                resolve(result);
            });
        }, delay);
    });
}
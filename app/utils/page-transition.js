import { fadeIn, fadeOut } from 'ember-animated/motions/opacity';
import { wait } from 'ember-animated';

export default function *transition(received) {
  const {insertedSprites, removedSprites, receivedSprites, sentSprites, duration} = received;

  console.log("received: ", received);

  // fade in and fade out --> wait half the time, take half the time
  const targetDuration = duration / 3;

  const rejectedSprites = [ ...removedSprites, ...sentSprites ];

  for( const sprite of rejectedSprites ) {
    fadeOut( sprite, targetDuration );
  }

  // wait before inserting sprites
  yield wait(duration / 3);

  const acceptedSprites = [ ...insertedSprites, ...receivedSprites ];

  const animationDuration =  2 * duration / 3;
  const waitDuration = targetDuration / (3 * acceptedSprites.length);

  for( const sprite of acceptedSprites ) {
    fadeIn( sprite, { duration: animationDuration } );
    yield wait( waitDuration );
  }
}

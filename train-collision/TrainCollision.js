/**
 * Train class
 */
class Train {
  constructor(options) {
    this.people = options.people;
    this.currentPoint = options.currentPoint;
    this.track = options.track;
    this.name = options.name;
  }

  /**
   * Checks if train is already at last station and if it not at last station then updates the currentPoint
   */
  runToNextStation() {
    let currentIndex = this.track.indexOf(this.currentPoint);
    if(currentIndex < (this.track.length -1)) {
      currentIndex++;
      this.currentPoint = this.track[currentIndex];
      console.log(`${this.name} Reached Platform: ${this.currentPoint}`);
    } else {
        console.log(`${this.name} Reached Final Destination`);
    }
  }
}

/**
 * Checks for collision between trains by checking there next stations.
 * In case of collision call checkPriorityAndAddDelay which will delay the train according to priority criteria
 */
const runTrainsToNextPlatform = () => {
  // Get current platform index
  const currentPlatformIndexTrainA = trainA.track.indexOf(trainA.currentPoint);
  const currentPlatformIndexTrainB = trainB.track.indexOf(trainB.currentPoint);
  const currentPlatformIndexTrainC = trainC.track.indexOf(trainC.currentPoint);

  // Get the next platform for each train
  const nextPlatformTrainA = trainA.track[currentPlatformIndexTrainA + 1];
  const nextPlatformTrainB = trainB.track[currentPlatformIndexTrainB + 1];
  const nextPlatformTrainC = trainC.track[currentPlatformIndexTrainC + 1];

  if(nextPlatformTrainA !== nextPlatformTrainB && nextPlatformTrainA !== nextPlatformTrainC && nextPlatformTrainB !== nextPlatformTrainC) {
    // No collision found
    // All trains cam run to next station
    trainA.runToNextStation();
    trainB.runToNextStation();
    trainC.runToNextStation();
  } else if(nextPlatformTrainA === nextPlatformTrainB && nextPlatformTrainA !== nextPlatformTrainC && nextPlatformTrainB !== nextPlatformTrainC) {
    // Collision found for Train A - Train B
    checkPriorityAndAddDelay(trainA, trainB, trainC);
  } else if(nextPlatformTrainA !== nextPlatformTrainB && nextPlatformTrainA === nextPlatformTrainC && nextPlatformTrainB !== nextPlatformTrainC) {
    // Collision found for Train A - Train C
    checkPriorityAndAddDelay(trainA, trainC, trainB);
  } else if(nextPlatformTrainA !== nextPlatformTrainB && nextPlatformTrainA !== nextPlatformTrainC && nextPlatformTrainB === nextPlatformTrainC) {
    // Collision found for Train B - Train C
    checkPriorityAndAddDelay(trainB, trainC, trainA);
  } else if(nextPlatformTrainA === nextPlatformTrainB && nextPlatformTrainA === nextPlatformTrainC) {
    // All three trains might collide at next platform
    if(trainA.people >= trainB.people && trainA.people >= trainC.people) {
      // TrainA has more number of people so allow train A and delay other 2 trains
      trainA.runToNextStation();
      console.log(`${trainB.name} delayed to avoid collision with ${trainA.name}`);
      trainB.runToNextStation();
      console.log(`${trainC.name} delayed to avoid collision with ${trainA.name}`);
      trainC.runToNextStation();
    } else if(trainB.people >= trainA.people && trainB.people >= trainC.people) {
      // TrainB has more number of people so allow train A and delay other 2 trains
      trainB.runToNextStation();
      console.log(`${trainA.name} delayed to avoid collision with ${trainB.name}`);
      trainA.runToNextStation();
      console.log(`${trainC.name} delayed to avoid collision with ${trainB.name}`);
      trainC.runToNextStation();
    } else if(trainC.people >= trainA.people && trainC.people >= trainB.people) {
      // TrainC has more number of people so allow train A and delay other 2 trains
      trainC.runToNextStation();
      console.log(`${trainA.name} delayed to avoid collision with ${trainC.name}`);
      trainA.runToNextStation();
      console.log(`${trainB.name} delayed to avoid collision with ${trainC.name}`);
      trainB.runToNextStation();
    }
  }
};

/**
 * Checks for the priority rule (number of people) and delays train with less number of people to avoid collision
 * @param train1 {object} - First train object which will be colliding with train2
 * @param train2 {object} - Second train object which will be colliding with train1
 * @param train3 {object} - Train having no collision
 */
const checkPriorityAndAddDelay = (train1, train2, train3) => {
  // Train 1- Train 2 collsion
  if(train1.people > train2.people) {
    train1.runToNextStation();
    train3.runToNextStation();
    console.log(`${train2.name} delayed to avoid collision with ${train1.name}`);
    train2.runToNextStation();
  } else {
    train2.runToNextStation();
    train3.runToNextStation();
    // Add delay
    console.log(`${train1.name} delayed to avoid collision with ${train2.name}`);
    train1.runToNextStation();
  }
};

/**
 * Runs train till they reach last platform
 */
const runTrains = () => {
  const trainAlastPlatform = trainA.track[trainA.track.length - 1];
  const trainBlastPlatform = trainB.track[trainB.track.length - 1];
  const trainClastPlatform = trainC.track[trainC.track.length - 1];
  // Check that at a time 2 trains should be running otherwise abort the loop as we have to check the collision
  while(((trainA.currentPoint !== trainAlastPlatform) && (trainB.currentPoint !== trainBlastPlatform)) || ((trainA.currentPoint !== trainAlastPlatform) && (trainC.currentPoint !== trainClastPlatform)) || ((trainC.currentPoint !== trainClastPlatform) && (trainB.currentPoint !== trainBlastPlatform))) {
    runTrainsToNextPlatform();
    console.log('-----------------------------------------------------------------');
  }
};

const trainA = new Train({
  people: 250,
  currentPoint: 2,
  track: [1,2,3,4,5,6,7],
  name: 'trainA'
});
const trainB = new Train({
  people: 200,
  currentPoint: 8,
  track: [8,9,10,5,11,12],
  name: 'trainB'
});
const trainC = new Train({
  people: 100,
  currentPoint: 14,
  track: [13,14,3,10,15,16],
  name: 'trainC'
});

// Run trains on there tracks
runTrains();

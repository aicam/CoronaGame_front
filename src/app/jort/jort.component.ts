import {Component, Input, OnInit} from '@angular/core';
import {delay} from 'rxjs/operators';





@Component({
  selector: 'app-jort',
  templateUrl: './jort.component.html',
  styleUrls: ['./jort.component.css']
})
export class JortComponent implements OnInit {
  truth = 0;
  dare = 0;
  @Input()  clicked = 0;
  @Input()  haghighat = 0;
  @Input()  jorat = 0;
  @Input() myflag = 2;
  @Input () truthArr = ['What is your deepest darkest fear?',
    'What is your biggest regret?',
    'What are you most self-conscious about?',
    'What is the biggest lie you have ever told?',
    'What is the naughtiest thing you’ve done in public?',
    'What do most people think is true about you, but isn’t?',
    'What is the biggest thing you’ve gotten away with?',
    'What is the most expensive thing you have stolen?',
    'What is the most childish thing you still do?',
    'Have you ever let someone take the blame for something you did?',
    'What do most of your friends think about you that is totally untrue?',
    'What lie have you told that hurt someone?',
    'What is the meanest you have been to someone that didn’t deserve it?',
    'What is something that people think you would never do but you have?',
    'What was the worst encounter you had with a police officer?',
    'What is the silliest thing you have an emotional attachment to?',
    'What is the most embarrassing thing your parents have caught you doing?',
    'What secret about yourself did you tell someone in confidence and then they told a lot of other people?',
    'What secret about yourself did you tell someone in confidence and then they told a lot of other people?',
    'What is the scariest dream you have ever had?',
    'What is the most embarrassing thing in your room?',
    'What is the stupidest thing you have ever done?',
    'What terrible thing have you done that you lied to cover up?', 'What is something that you have never told anyone?',
    'What is the most disgusting habit you have?',
    'What was the cruelest joke you played on someone?',
    'What is the most embarrassing thing you have put up on social media?',
    'What bad thing have you done that no one else found out about?',
    'What is the most embarrassing nickname you have ever had?',
    'What do you really hope your parents never find out about?',
    'Tell me something you don’t want me to know.',
    'What have you done that people here would judge you most for doing?',
    'Have you ever cheated on a test?',
    'If you could create your own job title, what would it be?',
    'What is your excuse to get out of exercising?',
    'What was the one thing you could never learn how to do no matter how hard you tried?',
    'What was your favorite childhood television show?',
    'Did you ever sneak into an adult movie when you were underage?',
    'If you had a remote control that would operate anything, what would you control?',
    'Have you ever complained about something at a restaurant just to get out of paying?',
    'What is one thing you did as a child that you still enjoy?', 'Do you prefer the big city or country life?',
    'Where is your favorite vacation spot?', 'What is your favorite thing to do with your leisure time?',
    'If you were to bury a time capsule, what is one thing you would put in it?', 'If you were granted three wishes, what would they be?',
    'If you could live anywhere in the world, where would it be?', 'Have you ever forgotten a special person’s birthday?',
    'On a scale from 1-10, where does your patience fall?', 'If animals could talk, which one would you have a conversation with?',
    'What is your favorite restaurant?', 'Who was worst teacher in your school?',
    'Are you always on time, or are you always late?', 'Do you sing in the shower?which songs do you?',
    'what is your favorite food?', 'What is the best gift you ever received?',
    'If you were given a million dollars, what would you do with it?', 'what is your favorite sport?',
    'Do you prefer the beach or the mountains?', 'What makes you happy?',
    'What is name of the person who you told many things of your life to him/her?',
    'If there was one thing you could change about yourself, what would it be?',
    'What is your favorite music genre?', 'What do you like to do when you are alone?',
    'What do you like to do when you are with your friends?', 'What is the best time of day for you?',
    'What is your least favorite time of the day?', 'If you didn’t have to work, what would you do with all your time?',
    'What was the best day you ever had?', 'What is your biggest fear in life?',
    'If you only had two minutes to get out of your house, what would you grab?', 'What is your favorite month and why?',
    'Have you ever met a celebrity, if so, who?', 'Have you ever cheated to win a game?',
    'What food do you absolutely despise?', 'Who is the person you are the most jealous of and why?',
    'How many different languages can you speak and what are they?', 'Do you have any tattoos and if so, where?',
    'Do you prefer talking or texting?', 'What was the last thing you ate?'];

  @Input ()dareArr = ['Serenade the person to your right', 'Attempt to do a magic trick.',
    'Let someone shave part of your body', 'Eat five spoonfuls of pepper',
    'Let the group give you a new hairstyle.', 'Do your best impression of a baby being born.',
    'For a guy, put on makeup. For a girl, wash off your make up.',
    'Give someone your phone and let them send one text to anyone in your contacts',
    'Drink a small cup of a concoction that the group makes.' +
    '(Don’t make anything that might cause bodily harm. No visits to the emergency room.)!',
    'Write something embarrassing somewhere on your body (that can be hidden with clothing) with a pen',
    'Make every person in the group smile, keep going until everyone has cracked a smiled.',
    'Do push ups until you can’t do any more, wait 5 seconds, and then do one more.',
    'Sell a piece trash to someone in the group. Use your best salesmanship', 'Let the group look through your phone for 2 minutes.',
    'Imitate a celebrity every time you talk for three minutes',
    'Try to juggle 2 or 3 items of the group’s choosing.',
    'Gargle something that shouldn’t be gargled, but won’t hurt you.',
    'Make a funny face and keep making it for 2 minutes while the game continues.',
    'Imagine something in your room. Now spell it with your nose and keep spelling ' +
    'it with your nose until someone from the group guesses what you are trying spell.'
    , 'Open a bag of snacks or candy using only your mouth, no hands or feet.',
    'Make a tea out of something that isn’t tea (but isn’t dangerous / toxic) and drink it.',
    'Act like whatever animal someone yells out for the next 1 minute.',
    'Eat one teaspoon of the spiciest thing that you have.',
    'Call to one of contact in your phone and sing them 30 seconds of a song that the group chooses.',
    'No talking. Pretend to be a food. Don’t pretend to eat the food,' +
    'pretend to be the food. Keep pretending until someone in the group guesses the food you are.',
    'Find the person whose first name has the same letter as your first name or whoever’s first name’s first letter ' +
    'is closest to yours. Now say hi to them.',
    'Sing a praise song about a person of the groups choosing.'];
  constructor() {}
  @Input() choosed = 0 ;
  randomjeneration() {
 this.dareArr = this.shuffle(this.dareArr);
 this.truthArr = this.shuffle(this.truthArr);
  }
    choosejorat() {
      if (this.clicked === 0 ) {
        this.randomjeneration();
        this.dare = 1;
        this.choosed = 2;
        this.myflag = 1;
        this.jorat = this.jorat + 1;
        console.log(this.jorat);
        this.clicked = 1;
      }
    }
    choosehaghighat() {
      if (this.clicked === 0) {
        this.clicked = 1 ;
        this.truth = 1;
        this.myflag = 0;
        this.haghighat = this.haghighat + 1;
      }
    }
    myclick() {
      this.clicked = 0;
      this.truth = 0;
      this.dare = 0;
      this.myflag = 2;
    }
    myreturnt() {
      return this.haghighat;
    }
  myreturnd() {
    console.log(this.jorat);
    return this.jorat;
  }
  shuffle(array) {
    // tslint:disable-next-line:one-variable-per-declaration
    let currentIndex = array.length, temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }

    return array;
  }
  ngOnInit() {
    this.randomjeneration();
  }

}

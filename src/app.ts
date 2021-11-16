import { App } from "jovo-framework";
import { Alexa } from "jovo-platform-alexa";
import { JovoDebugger } from "jovo-plugin-debugger";
import { FileDb } from "jovo-db-filedb";
import { GoogleAssistant } from "jovo-platform-googleassistant";
import { Dialogflow, FacebookMessenger, Slack } from "jovo-platform-dialogflow";

// ------------------------------------------------------------------
// APP INITIALIZATION
// ------------------------------------------------------------------

const app = new App();

app.use(
  new Alexa(),
  new GoogleAssistant(),
  new JovoDebugger(),
  new FileDb(),
  new Dialogflow()
);

// ------------------------------------------------------------------
// APP LOGIC
// ------------------------------------------------------------------

const coffee: any = [];

app.setHandler({
  LAUNCH() {
    const speech = "Hi, I'm coffee bot, would you like to order a coffee?";
    const reprompt = "Would you like to order a coffee?";
    this.followUpState("CoffeeOrNotState").ask(speech, reprompt);
  },
  CoffeeOrNotState: {
    YesIntent() {
      const speech = "Great, what sort of coffee would you like?";
      const reprompt = "Please tell me what sort of coffee you would like";
      this.followUpState("CoffeeTypeState").ask(speech, reprompt);
    },

    NoIntent() {
      const speech = "No worries, have a nice day!";
      this.tell(speech);
    },
    Unhandled() {
      return this.toIntent("LAUNCH");
    },
  },
  CoffeeTypeState: {
    CoffeeTypeIntent() {
      const input = this.$inputs.coffeetype.value;
      // console.log(this.$inputs)
      coffee.push(input);
      switch (input) {
        case "latte":
          this.followUpState("CoffeeSizeState").ask(
            "You have ordered a latte, what size would you like?"
          );
          break;
        case "cappuccino":
          this.followUpState("CoffeeSizeState").ask(
            "You have ordered a cappuccino, what size would you like?"
          );
          break;
        case "flat white":
          this.followUpState("CoffeeSizeState").ask(
            "You have ordered a flat white, what size would you like?"
          );
          break;
        case "long macchiato":
          this.followUpState("AnythingElseState").ask(
            "You have ordered a long macchiato. Is there anything else?"
          );
          break;
        case "babyccino":
          this.followUpState("AnythingElseState").ask(
            "You have ordered a babyccino. Is there anything else?"
          );
          break;
        case "mochaccino":
          this.followUpState("CoffeeSizeState").ask(
            "You have ordered a mochaccino, what size would you like?"
          );
          break;
        case "long black":
          this.followUpState("CoffeeSizeState").ask(
            "You have ordered a long black, what size would you like?"
          );

          break;
        default:
          break;
      }
    },
    Unhandled() {
      this.followUpState("CoffeeOrNotState");
    },
  },
  CoffeeSizeState: {
    CoffeeSizeIntent() {
      const input = this.$inputs.coffeesize.value;
      const coffeeType = coffee[0];
      console.log(coffee)
      coffee[0] = input + " " + coffee[0];
      switch (input) {
        case "regular":
          this.followUpState("MilkTypeState")
            .ask(`You have ordered a regular ${coffeeType}. What type of milk would you like?
    `);
          break;
        case "large":
          this.followUpState("MilkTypeState")
            .ask(`You have ordered a large ${coffeeType}. What type of milk would you like?
    `);
          break;
        default:
          break;
      }
    },
    Unhandled() {
      return this.toIntent("LAUNCH");
    },
  },
  MilkTypeState: {
    CoffeeMilkIntent() {
      console.log(this.$inputs);
      const input = this.$inputs.coffeemilk.value;
      console.log(coffee);
      const finalCoffee = coffee[0];
      switch (input) {
        case "oat":
          this.followUpState("AnythingElseState").ask(
            `You have ordered a ${finalCoffee} with ${input} milk. Is there anything else?`
          );
          break;
        case "lactose free":
          this.followUpState("AnythingElseState").ask(
            `You have ordered a ${finalCoffee} with ${input} milk. Is there anything else?`
          );
          break;
        case "soy":
          this.followUpState("AnythingElseState").ask(
            `You have ordered a ${finalCoffee} with ${input} milk. Is there anything else?`
          );
          break;
        case "regular":
          this.followUpState("AnythingElseState").ask(
            `You have ordered a ${finalCoffee} with ${input} milk. Is there anything else?`
          );
          break;
        case "coconut":
          this.followUpState("AnythingElseState").ask(
            `You have ordered a ${finalCoffee} with ${input} milk. Is there anything else?`
          );
          break;
        case "almond":
          this.followUpState("AnythingElseState").ask(
            `You have ordered a ${finalCoffee} with ${input} milk. Is there anything else?`
          );
          break;

        default:
          break;
      }
    },
    Unhandled() {
      return this.toIntent("LAUNCH");
    },
  },
  AnythingElseState: {
    YesIntent() {
      const coffee = []
      const speech = "What type of coffee would you like?";
      this.followUpState("CoffeeTypeState").ask(speech);
    },
    NoIntent() {
      this.tell("Thanks for ordering!");
    },
    Unhandled() {
      return this.toIntent("LAUNCH");
    },
  },

  Unhandled() {
    this.toIntent("LAUNCH");
  },
  END() {
    const speech = "No worries, have a nice day!!!";
    this.tell(speech);
  },
});
export { app };

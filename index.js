var readlineSync = require('readline-sync');
const readline = require('readline');
var seed = require('seed-random');
var sleep = require('system-sleep');
const cliCursor = require('cli-cursor');

var nouns = ["Apple","Air","Conditioner","Airport","Ambulance","Aircraft","Apartment","Arrow","Antlers","Apro","Alligator","Architect","Ankle","Armchair","Aunt","Ball","Bermudas","Beans","Balloon","Bear","Blouse","Bed","Bow","Bread","Black","Board","Bones","Bill","Bitterness","Boxers","Belt","Brain","Buffalo","Bird","Baby","Book","Back","Butter","Bulb","Buckles","Bat","Bank","Bag","Bra","Boots","Blazer","Bikini","Bookcase","Bookstore","Bus stop","Brass","Brother","Boy","Blender","Bucket","Bakery","Bow","Bridge","Boat","Car","Cow","Cap","Cooker","Cheeks","Cheese","Credenza","Carpet","Crow","Crest","Chest","Chair","Candy","Cabinet","Cat","Coffee","Children","Cookware","Chaise longue","Chicken","Casino","Cabin","Castle","Church","Cafe","Cinema","Choker","Cravat","Cane","Costume","Cardigan","Chocolate","Crib","Couch","Cello","Cashier","Composer","Cave","Country","Computer","Canoe","Clock","Dog","Deer","Donkey","Desk","Desktop","Dress","Dolphin","Doctor","Dentist","Drum","Dresser","Designer","Detective","Daughter","Egg","Elephant","Earrings","Ears","Eyes","Estate","Finger","Fox","Frock","Frog","Fan","Freezer","Fish","Film","Foot","Flag","Factory","Father","Farm","Forest","Flower","Fruit","Fork","Grapes","Goat","Gown","Garlic","Ginger","Giraffe","Gauva","Grains","Gas station","Garage","Gloves","Glasses","Gift","Galaxy","Guitar","Grandmother","Grandfather","Governor","Girl","Guest","Hamburger","Hand","Head","Hair","Heart","House","Horse","Hen","Horn","Hat","Hammer","Hostel","Hospital","Hotel","Heels","Herbs","Host","Jacket","Jersey","Jewelry","Jaw","Jumper","Judge","Juicer","Keyboard","Kid","Kangaroo","Koala","Knife","Lemon","Lion","Leggings","Leg","Laptop","Library","Lamb","London","Lips","Lung","Lighter","Luggage","Lamp","Lawyer","Mouse","Monkey","Mouth","Mango","Mobile","Milk","Music","Mirror","Musician","Mother","Man","Model","Mall","Museum","Market","Moonlight","Medicine","Microscope","Newspaper","Nose","Notebook","Neck","Noodles","Nurse","Necklace","Noise","Ocean","Ostrich","Oil","Orange","Onion","Oven","Owl","Paper","Panda","Pants","Palm","Pasta","Pumpkin","Pharmacist","Potato","Parfume","Panther","Pad","Pencil","Pipe","Police","Pen","Pharmacy","Petrol station","Police station","Parrot","Plane","Pigeon","Phone","Peacock","Pencil","Pig","Pouch","Pagoda","Pyramid","Purse","Pancake","Popcorn","Piano","Physician","Photographer","Professor","Painter","Park","Plant","Parfume","Radio","Razor","Ribs","Rainbow","Ring","Rabbit","Rice","Refrigerator","Remote","Restaurant","Road","Surgeon","Scale","Shampoo","Sink","Salt","Shark","Sandals","Shoulder","Spoon","Soap","Sand","Sheep","Sari","Stomach","Stairs","Soup","Shoes","Scissors","Sparrow","Shirt","Suitcase","Stove","Stairs","Snowman","Shower","Swan","Suit","Sweater","Smoke","Skirt","Sofa","Socks","Stadium","Skyscraper","School","Sunglasses","Sandals","Slippers","Shorts","Sandwich","Strawberry","Spaghetti","Shrimp","Saxophone","Sister","Son","Singer","Senator","Street","Supermarket","Swimming pool","Star","Sky","Sun","Spoon","Ship","Smile","Table","Turkey","Tie","Toes","Truck","Train","Taxi","Tiger","Trousers","Tongue","Television","Teacher","Turtle","Tablet","Train station","Toothpaste","Tail","Theater","Trench coat","Tea","Tomato","Teen","Tunnel","Temple","Town","Toothbrush","Tree","Toy","Tissue","Telephone","Underwear","Uncle","Umbrella","Vest","Voice","Veterinarian","Villa","Violin","Village","Vehicle","Vase","Wallet","Wolf","Waist","Wrist","Water melon","Whale","Water","Wings","Whisker","Watch","Woman","Washing machine","Wheelchair","Waiter","Wound","Xylophone","Zebra","Zoo"];

var adjectives = ["Adamant", "Adroit", "Amatory", "Animistic", "Antic", "Arcadian", "Baleful", "Bellicose", "Bilious", "Boorish", "Calamitous", "Caustic", "Cerulean", "Comely", "Concomitant", "Contumacious", "Corpulent", "Defamatory", "Didactic", "Dilatory", "Dowdy", "Efficacious", "Effulgent", "Egregious", "Endemic", "Equanimous", "Execrable", "Fastidious", "Feckless", "Fecund", "Friable", "Fulsome", "Garrulous", "Guileless", "Gustatory", "Heuristic", "Histrionic", "Hubristic", "Incendiary", "Insidious", "Insolent", "Intransigent", "Inveterate", "Invidious", "Irksome", "Jejune", "Jocular", "Judicious", "Lachrymose", "Limpid", "Loquacious", "Luminous", "Mannered", "Mendacious", "Meretricious", "Minatory", "Mordant", "Munificent", "Nefarious", "Noxious", "Obtuse", "Parsimonious", "Pendulous", "Pernicious", "Pervasive", "Petulant", "Platitudinous", "Precipitate", "Propitious", "Puckish", "Querulous", "Quiescent", "Rebarbative", "Recalcitrant", "Redolent", "Rhadamanthine", "Risible", "Ruminative", "Sagacious", "Salubrious", "Sartorial", "Sclerotic", "Serpentine", "Spasmodic", "Strident", "Taciturn", "Tenacious", "Tremulous", "Trenchant", "Turbulent", "Turgid", "Ubiquitous", "Uxorious", "Verdant", "Voluble", "Voracious", "Wheedling", "Withering", "Zealous"];

var base=10;
var bank=10;
var mps=0;
var level=0;
var bought=[]

function randomRange(seedint,min,max) {
  var rng = seed(seedint)
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(rng() * (max - min + 1)) + min;
}
function itemCost(i) {
  tempcost=base;
  x=i-1;
  while (x!=0) {
    tempcost*=2.5;
    x--;
  }
  return Math.floor(tempcost);
}
function itemMps(i) {
  tempmps=1;
  x=i-1;
  while (x!=0) {
    tempmps*=1.3;
    x--;
  }
  tempmps*=10
  tempmps-=8
  
  return Math.floor(tempmps);
}
function genCharArray(charA, charZ) {
    var a = [], i = charA.charCodeAt(0), j = charZ.charCodeAt(0);
    for (; i <= j; ++i) {
        a.push(String.fromCharCode(i));
    }
    return a;
}

function itemName(i) {
  var tempname=adjectives[randomRange(i^2,0,adjectives.length)]+" "+nouns[randomRange(i,0,nouns.length)];
  return tempname;
}
function shopdisplay(x) {
  for (i=1;i<=x;i++) {
    if (bought.includes(i.toString())) {
      x+=1
    } else {
      console.log(i+": "+itemName(i)+": "+itemCost(i)+": "+itemMps(i))
    }
  }
}
var state="main";
function shop() {
  cliCursor.show();
  console.clear();
  console.log();
  console.log("\033[1mShop\033[0m (Press enter to return)");
  console.log();
  var shopcount=readlineSync.question('View? ');
  if (shopcount=="exit") {
    return;
  }
  shopdisplay(parseInt(shopcount));
  console.log();
  while (1==1) {
    var purchaseitem=readlineSync.question('($'+Math.floor(bank)+')Buy? ');
    if (new RegExp(genCharArray('a', 'z').join("|")).test(purchaseitem)||purchaseitem=="") {
      return;
    }
    if (parseInt(purchaseitem)!=parseInt("")) {
      if(!bought.includes(purchaseitem)) {
        if (bank>=itemCost(parseInt(purchaseitem))) {
          bank-=itemCost(parseInt(purchaseitem));
          mps+=itemMps(parseInt(purchaseitem));
          level+=1;
          bought.push(purchaseitem);
          console.log("Success");
        } else {
          console.log("Insufficient funds");
        }
      } else {
        console.log("Out of stock");
      }
    }
  }
}
function cycleBank() {
  bank+=mps/20;
}
setInterval(cycleBank, 50);
function main() {
  console.clear();
  cliCursor.hide();
  var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });
  repeat=1
  var breakloop=0
  while(1==1) {
    if (repeat==1) {
      rl.on('line', function (cmd) {
        breakloop=1;
        rl.close();
      });
      repeat=0;
    }
    if (breakloop==1) {
      return
    }
    console.log("\033[0;0H")
    console.log();
    console.log("\033[1mCurrent Money\033[0m:                      \033[1mLevel\033[0m: "+level+"\n$"+Math.floor(bank));
    console.log("\033[1mMoney Per Second\033[0m: \n$"+mps);
    console.log();
    console.log("          (Press enter to use shop)");
    sleep(50);
  }
}
while(1==1) {
  main();
  shop();
}
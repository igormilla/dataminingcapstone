var a = [{
    care: 0.11535,
    dr: 0.10860,
    staff: 0.083822,
    vet: 0.05747,
    dog: 0.053299,
    anim: 0.052295,
    love: 0.040398,
    pet: 0.039534,
    friend: 0.039027,
    hospit: 0.034510
  },

  {
    board: 0.086154,
    groom: 0.04556,
    dog: 0.037952,
    nail: 0.030427,
    servic: 0.029615,
    great: 0.029001
  },

  {
    told: 0.06817,
    back: 0.057678,
    call: 0.054445,
    vet: 0.050510,
    ask: 0.043148,
    dog: 0.039861,
    wait: 0.038194,
    time: 0.037065,
    go: 0.028900
  },

  {
    time: 0.064322,
    made: 0.058691,
    put: 0.055893,
    decis: 0.054751,
    year: 0.040374,
    end: 0.037234,
    famili: 0.033925,
    life: 0.03273,
    sleep: 0.032629,
    card: 0.02996
  },

  {
    banfield: 0.097707,
    vet: 0.071344,
    test: 0.071315,
    medic: 0.05112,
    plan: 0.043390,
    prescript: 0.038446,
    money: 0.038110,
    food: 0.033503,
    treatment: 0.031912,
    tri: 0.029567
  },

  {
    hospit: 0.080848,
    emerg: 0.079733,
    call: 0.074430,
    night: 0.065245,
    hour: 0.055037,
    vista: 0.0538,
    morn: 0.048594,
    alta: 0.039541,
    care: 0.03788,
    anim: 0.034374
  },

  {
    vet: 0.086624,
    shot: 0.056069,
    price: 0.051206,
    puppi: 0.041640,
    time: 0.038078,
    offic: 0.037123,
    visit: 0.035479,
    appoint: 0.035371,
    staff: 0.03182,
    great: 0.031357
  },

  {
    dr: 0.27512,
    vet: 0.05614,
    surgeri: 0.045183,
    great: 0.036913,
    love: 0.028356,
    year: 0.02095,
    henderson: 0.020912,
    west: 0.018691,
    trust: 0.016769,
    ray: 0.015702
  },

  {
    adopt: 0.21592,
    shelter: 0.11609,
    anim: 0.09636,
    dog: 0.060846,
    societi: 0.053986,
    volunt: 0.050537,
    human: 0.049740,
    home: 0.035899,
    look: 0.028724
  },

  {
    teeth: 0.10925,
    remov: 0.066217,
    clean: 0.066030,
    surgeri: 0.066004,
    ear: 0.058740,
    infect: 0.044092,
    back: 0.043528,
    procedur: 0.03817,
    gland: 0.036124,
    pay: 0.03302
  }
];

var res = {};
res.name = "topics";
res.children = [];

for (var t = 0; t < a.length; t++) {
  var topic = {};
  topic.name = "topic " + (t + 1);
  topic.children = [];
  var current = a[t];
  var keys = Object.keys(current);

  for (var i = 0; i < keys.length; i++) {
    topic.children.push({
      name: keys[i],
      size: current[keys[i]]
    });
  }
  res.children.push(topic);
}



console.log(JSON.stringify(res));

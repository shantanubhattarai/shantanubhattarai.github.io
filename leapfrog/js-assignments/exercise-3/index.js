var personalInfo = {
  'name': 'Anukul Parajuli',
  'address': '28 kilo',
  'emails': ['anukulp@testmail.com', 'anukulprock@email.com'],
  'interests':[''],
  'education': [
    {
      'name': 'SEBS',
      'enrolledDate': '2010'
    },
    {
      'name': 'School 2',
      'enrolledDate': '2015'
    }
  ]
}

console.log('--- using for loop ---');
for(var i = 0; i < personalInfo.education.length; i++){
  console.log('Name:' + personalInfo.education[i].name + ', Date:' + personalInfo.education[i].enrolledDate);
}

console.log('--- using foreach ---');
personalInfo.education.forEach(function(value) {
  console.log('Name:' + value.name + ', Date:' + value.enrolledDate);
});

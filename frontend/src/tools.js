
export function familyMemberReformat(inputObject) {
  const output = [];
  let person = {};
  const keys = Object.keys(inputObject);

  for (let i = 0; i < keys.length; i += 1) {
    const key = keys[i];
    person = {
      id: inputObject[key].toString(),
      type: 'blood'
    }
    output.push(person);
  }
  return output;
}

export function spouseReformat(inputObject) {
  const output = [];
  let person = {};
  const keys = Object.keys(inputObject);

  for (let i = 0; i < keys.length; i += 1) {
    const key = keys[i];
    person = {
      id: inputObject[key].toString(),
      type: 'married'
    }
    output.push(person);
  }
  return output;
}

export function objectReformat(inputObject) {
  const output = [];
  let person = {};
  const keys = Object.keys(inputObject);

  for (let i = 0; i < keys.length; i += 1) {
    const key = keys[i];
    person = {
      id: inputObject[key].id.toString(),
      gender: inputObject[key].gender,
      firstName: inputObject[key].firstName,
      lastName: inputObject[key].lastName,
      bio: inputObject[key].bio,
      birthDate: inputObject[key].birthDate,
      birthPlace: inputObject[key].birthPlace,
      image: inputObject[key].image,
      spouses: spouseReformat(inputObject[key].spouses),
      children: familyMemberReformat(inputObject[key].children),
      parents: familyMemberReformat(inputObject[key].parents),
      siblings: familyMemberReformat(inputObject[key].siblings),
    }
    output.push(person);
  }
  return output;
}

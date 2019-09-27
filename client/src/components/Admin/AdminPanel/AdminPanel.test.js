test('User should be object', () => {
  expect(functions.newUser()).toEqual({
    firstName: String,
    lastName: String,
  });
});


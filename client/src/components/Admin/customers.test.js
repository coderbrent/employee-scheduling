import admin_panel from './admin_panel';

test('User should be object', () => {
  expect(functions.newUser()).toEqual({
    firstName: 'Brent',
    lastName: 'Abruzese'
  });
});
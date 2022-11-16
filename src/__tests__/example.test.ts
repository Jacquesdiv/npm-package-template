import { application } from '..';

test('Example Text', async () => {
  try {
    await application.performAction({});
  } catch (err) {
    expect(err.message).toBe('Please initialize first');
  }
});

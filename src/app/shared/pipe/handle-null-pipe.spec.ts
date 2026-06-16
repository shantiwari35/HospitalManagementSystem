import { HandleNullPipe } from './handle-null-pipe';

describe('HandleNullPipe', () => {
  it('create an instance', () => {
    const pipe = new HandleNullPipe();
    expect(pipe).toBeTruthy();
  });
});

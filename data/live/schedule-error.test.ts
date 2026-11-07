import { scheduleError } from './schedule-error';

describe('scheduleError', () => {
  it('uses an Error message', () => {
    expect(scheduleError(new Error('network'))).toEqual({
      status: 'error',
      message: 'network',
    });
  });

  it('uses a string message', () => {
    expect(scheduleError('Invalid schedule payload')).toEqual({
      status: 'error',
      message: 'Invalid schedule payload',
    });
  });

  it('falls back when the failure has no message', () => {
    expect(scheduleError(null)).toEqual({
      status: 'error',
      message: 'Failed to load schedule',
    });
  });

  it('falls back when the message is blank', () => {
    expect(scheduleError(new Error('  '))).toEqual({
      status: 'error',
      message: 'Failed to load schedule',
    });
  });
});

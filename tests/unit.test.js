const AppError = require('../utils/appError');
const asyncHandler = require('../utils/asyncHandler');

describe('Unit Tests - Utils', () => {

  test('AppError should correctly set statusCode and status', () => {
    const error = new AppError('Resource not found', 404);

    expect(error.message).toBe('Resource not found');
    expect(error.statusCode).toBe(404);
    expect(error.status).toBe('fail');
    expect(error.isOperational).toBe(true);
  });


  test('asyncHandler should catch async errors and pass to next', async () => {
    const req = {};
    const res = {};
    const next = jest.fn();

    const asyncFn = asyncHandler(async (req, res, next) => {
      throw new Error('Async Failure');
    });

    await asyncFn(req, res, next);

    expect(next).toHaveBeenCalledTimes(1);
    expect(next).toHaveBeenCalledWith(expect.any(Error));
  });
});
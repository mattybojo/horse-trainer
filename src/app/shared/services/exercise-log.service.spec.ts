import { TestBed } from '@angular/core/testing';

import { ExerciseLogService } from './exercise-log.service';

describe('ExerciseLogService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ExerciseLogService = TestBed.get(ExerciseLogService);
    expect(service).toBeTruthy();
  });
});

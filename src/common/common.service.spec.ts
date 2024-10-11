import { Test, TestingModule } from '@nestjs/testing';
import { CommonService } from './common.service';

describe('CommonService', () => {
  let commonService: CommonService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CommonService],
    }).compile();   


    commonService = module.get<CommonService>(CommonService);
  });

  it('should parse seconds correctly', () => {
    const result = commonService.parseDurationToMilliseconds('5s');
    expect(result).toBe(5000);
  });

  it('should parse minutes correctly', () => {
    const result = commonService.parseDurationToMilliseconds('10m');
    expect(result).toBe(600000);
  });

  it('should parse hours correctly', () => {
    const result = commonService.parseDurationToMilliseconds('2h');
    expect(result).toBe(7200000);
  });

  it('should parse days correctly', () => {
    const result = commonService.parseDurationToMilliseconds('3d');
    expect(result).toBe(259200000);
  });

  it('should parse weeks correctly', () => {
    const result = commonService.parseDurationToMilliseconds('4w');
    expect(result).toBe(2419200000);
  });

  it('should parse months correctly (approximation)', () => {
    const result = commonService.parseDurationToMilliseconds('5M');
    expect(result).toBe(12960000000);
  });


  it('should throw an error for missing units', () => {
    expect(() => commonService.parseDurationToMilliseconds('10')).toThrow();
  });

  it('should throw an error for unsupported units', () => {
    expect(() => commonService.parseDurationToMilliseconds('10z')).toThrow();
  });
});
import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { ActivityTypeEnum } from '../../contentLessons/enums/activity-type.enum';

/**
 * Validates that a value is a valid typeCounts map:
 * - null is accepted (unset configuration)
 * - empty object {} is accepted (unset configuration)
 * - must be an object (not an array, not a primitive)
 * - all keys must be valid ActivityTypeEnum keys (numeric enum values 1..10)
 * - all values must be non-negative integers (>= 0)
 */
export function isValidTypeCounts(value: unknown): boolean {
  if (value === null) {
    return true;
  }

  if (typeof value !== 'object' || Array.isArray(value)) {
    return false;
  }

  const entries = Object.entries(value);
  if (entries.length === 0) {
    return true;
  }

  for (const [key, count] of entries) {
    const typeNum = Number(key);
    if (
      !Number.isInteger(typeNum) ||
      String(typeNum) !== key.trim() ||
      typeof ActivityTypeEnum[typeNum] !== 'string'
    ) {
      return false;
    }

    if (typeof count !== 'number' || !Number.isInteger(count) || count < 0) {
      return false;
    }
  }

  return true;
}

@ValidatorConstraint({ name: 'isValidTypeCounts', async: false })
export class IsValidTypeCountsConstraint implements ValidatorConstraintInterface {
  validate(value: unknown): boolean {
    return isValidTypeCounts(value);
  }

  defaultMessage(args?: ValidationArguments): string {
    const property = args?.property || 'typeCounts';
    return `${property} must be an object with valid ActivityTypeEnum keys and non-negative integer values, or null/empty`;
  }
}

export function IsValidTypeCounts(validationOptions?: ValidationOptions): PropertyDecorator {
  return function (object: object, propertyName: string | symbol): void {
    registerDecorator({
      name: 'isValidTypeCounts',
      target: object.constructor,
      propertyName: propertyName as string,
      options: validationOptions,
      constraints: [],
      validator: IsValidTypeCountsConstraint,
    });
  };
}
